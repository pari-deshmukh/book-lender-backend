const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/genres');
const auth = require('../controllers/auth');
const {validateGenre} = require('../controllers/validation');

const router = Router({prefix: '/api/v1/genres'});

router.get('/', getAll);
router.post('/', auth, bodyParser(), validateGenre, createGenre);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateGenre, updateGenre);
router.del('/:id([0-9]{1,})', auth, deleteGenre);

// TODO: validation
// TODO: error handling

async function getAll(ctx) {
  const result = await model.getAll();
  ctx.body = result;
}

async function getById(ctx) {
  const id = ctx.params.id;
  const result = await model.getById(id);
  const genre = result[0];
  ctx.body = genre;
}

async function createGenre(ctx) {
  const body = ctx.request.body;
  const result = await model.add(body);
  const id = result.insertId;
  ctx.status = 201;
  ctx.body = {ID: id, created: true, link: `${ctx.request.path}/${id}`};
}

async function updateGenre(ctx) {
  const id = ctx.params.id;
  let result = await model.getById(id);  // get existing record
  let genre = result[0];
  // exclude id field that should not be updated
  const {ID, ...body} = ctx.request.body;
  // overwrite other fields with remaining body data
  Object.assign(genre, body);
  await model.update(genre);
  ctx.body = {ID: id, updated: true, link: ctx.request.path};
}

async function deleteGenre(ctx) {
  const id = ctx.params.id;
  await model.delById(id);
  ctx.body = {ID: id, deleted: true}
}

module.exports = router;
