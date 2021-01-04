const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const auth = require('../controllers/auth');
const can = require('../permissions/requests');

const requests = require('../models/requests');
const comments = require('../models/comments');

const {validateRequest, validateComment} = require('../controllers/validation');

const prefix = '/api/v1/requests';
const router = Router({prefix: '/api/v1/requests'});

// request routes
router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateRequest, updateRequest);
router.del('/:id([0-9]{1,})', auth, deleteRequest);

// comments routes
router.get('/:id([0-9]{1,})/comments', getAllComments);
router.post('/:id([0-9]{1,})/comments', auth, bodyParser(), addCommentIds, validateComment, addComment);


async function getAll(ctx) {
  let {page=1, limit=10, order='dateCreated', direction='DESC'} = ctx.request.query;

  // ensure params are integers
  limit = parseInt(limit);
  page = parseInt(page);
  
  // validate pagination values to ensure they are sensible
  limit = limit > 100 ? 100 : limit;
  limit = limit < 1 ? 10 : limit;
  page = page < 1 ? 1 : page;

  // ensure order and direction make sense
  order = ['dateCreated', 'dateModified'].includes(order) ? order : 'dateCreated';
  direction = ['ASC', 'DESC'].includes(direction) ? direction : 'ASC';

  const result = await requests.getAll(page, limit, order, direction);
  if (result.length) {
    const body = result.map(bookRequest => {
      // extract the book request fields we want to send back (summary details)
      const {ID, title, summary, imageURL, authorID} = bookRequest;
      // add links to the book request summaries for HATEOAS compliance
      // clients can follow these to find related resources
      const links = {
        comments: `${ctx.protocol}://${ctx.host}${prefix}/${bookRequest.ID}/comments`,
        self: `${ctx.protocol}://${ctx.host}${prefix}/${bookRequest.ID}`
      }
      return {ID, title, summary, imageURL, authorID, links};
    });
    ctx.body = body;
  }
  else ctx.body = result;
}

async function getById(ctx) {
  const id = ctx.params.id;
  const result = await requests.getById(id);
  if (result.length) {
    const request = result[0];
    ctx.body = request;
  }
}

async function updateRequest(ctx) {
  const id = ctx.params.id;
  let result = await requests.getById(id);  // check it exists
  if (result.length) {
    let request = result[0];
    const permission = can.update(ctx.state.user, request);
    if (!permission.granted) {
      ctx.status = 403;
    } else {
      // exclude fields that should not be updated
      const {ID, dateCreated, dateModified, authorID, bookID, ...body} = ctx.request.body;
      // overwrite updatable fields with remaining body data
      Object.assign(request, body);
      result = await requests.update(request);
      if (result.affectedRows) {
        ctx.body = {ID: id, updated: true, link: ctx.request.path};
      }
    }
  }
}

async function deleteRequest(ctx) {
  const permission = can.delete(ctx.state.user);
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    const id = ctx.params.id;
    const result = await requests.delById(id);
    if (result.affectedRows) {
      ctx.body = {ID: id, deleted: true}
    }
  }
}

async function getAllComments(ctx) {
  const id = ctx.params.id;
  const result = await comments.getAll(id);
  if (result.length) {
    ctx.body = result;
  }
}

async function addComment(ctx) {
  const comment = ctx.request.body;
  const result = await comments.add(comment);
  if (result.affectedRows) {
    const id = result.insertId;
    ctx.status = 201;
    ctx.body = {ID: id, created: true};
  }
}

function addCommentIds(ctx, next) {
  // every comment needs an request ID and a user ID
  const id = parseInt(ctx.params.id);
  const uid = ctx.state.user.ID;
  Object.assign(ctx.request.body, {requestID: id, authorID: uid})
  return next();
}

module.exports = router;
