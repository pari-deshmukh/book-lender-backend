const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const auth = require('../controllers/auth');
const can = require('../permissions/books');

const books = require('../models/books');
const requests = require('../models/requests');
const bookGenres = require('../models/bookGenres');

const {validateBook, validateRequest} = require('../controllers/validation');

const prefix = '/api/v1/books';
const router = Router({prefix: prefix});

// book routes
router.get('/', getAll);
router.post('/', auth, bodyParser(), validateBook, createBook);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateBook, updateBook);
router.del('/:id([0-9]{1,})', auth, deleteBook);
router.get('/search', bookSearch);

// genres routes
router.get('/:id([0-9]{1,})/genres', getAllGenres);
router.post('/:id([0-9]{1,})/genres/:cid([0-9]{1,})', auth, addGenre);
router.del('/:id([0-9]{1,})/genres/:cid([0-9]{1,})', auth, removeGenre);

// requests routes
router.get('/:id([0-9]{1,})/requests', getAllBookRequests);
router.post('/:id([0-9]{1,})/requests', auth, bodyParser(), createRequestIds, validateRequest, createRequest);

async function bookSearch(ctx, next) {
  // TODO: this implementation is basic
  // you could add pagination, partial response, etc.

    let q = ctx.request.query.term;
    
    if (q && q.length < 3) {
      ctx.status = 400;
      ctx.body = {message: "Search string length must be 3 or more."}
      return next();
    }

    let result = await books.bookSearch(q);
    if (result.length) {
      ctx.body = result;
    }    
}

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

  const result = await books.getAll(page, limit, order, direction);
  if (result.length) {
    const body = result.map(book => {
      // extract the book fields we want to send back (summary details)
      const {ID, title, author, isbn, availabilityStatus, summary, frontCoverImageURL, rearCoverImageURL, ownerID} = book;
      // add links to the book summaries for HATEOAS compliance
      // clients can follow these to find related resources
      const links = {
        requests: `${ctx.protocol}://${ctx.host}${prefix}/${book.ID}/requests`,
        self: `${ctx.protocol}://${ctx.host}${prefix}/${book.ID}`
      }
      return {ID, title, author, isbn, availabilityStatus, summary, frontCoverImageURL, rearCoverImageURL, ownerID, links};
    });
    ctx.body = body;
  }
  else ctx.body = result;
}

async function getById(ctx) {
  const id = ctx.params.id;
  const result = await books.getById(id);
  if (result.length) {
    const book = result[0];
    ctx.body = book;
  }
}

async function createBook(ctx) {
  const body = ctx.request.body;
  const result = await books.add(body);
  if (result.affectedRows) {
    const id = result.insertId;
    ctx.status = 201;
    ctx.body = {ID: id, created: true, link: `${ctx.request.path}/${id}`};
  }
}

async function updateBook(ctx) {
  const id = ctx.params.id;
  let result = await books.getById(id);  // check it exists
  if (result.length) {
    let book = result[0];
    const permission = can.update(ctx.state.user, book);
    if (!permission.granted) {
      ctx.status = 403;
    } else {
      // exclude fields that should not be updated
      const {ID, dateCreated, dateModified, authorID, ...body} = ctx.request.body;
      // overwrite updatable fields with remaining body data
      Object.assign(book, body);
      result = await books.update(book);
      if (result.affectedRows) {
        ctx.body = {ID: id, updated: true, link: ctx.request.path};
      }
    }
  }
}

async function deleteBook(ctx) {
  const permission = can.delete(ctx.state.user);
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    const id = ctx.params.id;
    const result = await books.delById(id);
    if (result.affectedRows) {
      ctx.body = {ID: id, deleted: true}
    }
  }
}

async function createRequest(ctx) {
  const body = ctx.request.body;
  const result = await requests.add(body);
  if (result.affectedRows) {
    const id = result.insertId;
    ctx.status = 201;
    ctx.body = {ID: id, created: true, link: `${ctx.request.path}/${id}`};
  }
}

function createRequestIds(ctx, next) {
  // every request needs an book ID and a user ID
  const id = parseInt(ctx.params.id);
  const uid = ctx.state.user.ID;
  Object.assign(ctx.request.body, {bookID: id, authorID: uid})
  return next();
}

async function getAllBookRequests(ctx) {
  const id = ctx.params.id;
  const result = await requests.getByBookId(id);
  if (result.length) {
    ctx.body = {bookID: id, requests: result[0].requests};
  }
}

async function addGenre(ctx) {
  const bookID = ctx.params.id;
  const genreID = ctx.params.cid;
  const result = await bookGenres.add(bookID, genreID);
  if (result.affectedRows) {
    ctx.status = 201;
    ctx.body = {added: true};
  }
}

async function removeGenre(ctx) {
  const bookID = ctx.params.id;
  const genreID = ctx.params.cid;
  const result = await bookGenres.delete(bookID, genreID);
  if (result.affectedRows) {
    ctx.body = {deleted: true};
  }
}

async function getAllGenres(ctx) {
  const id = ctx.params.id;
  const result = await bookGenres.getAll(id);
  if (result.length) {
    ctx.body = result;
  }
}

module.exports = router;
