const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const model = require('../models/roles');
const auth = require('../controllers/auth');
const {validateRole} = require('../controllers/validation');

const router = Router({prefix: '/api/v1/roles'});

router.get('/', getAll);
router.post('/', auth, bodyParser(), validateRole, createRole);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateRole, updateRole);
router.del('/:id([0-9]{1,})', auth, deleteRole);

// TODO: validation
// TODO: error handling

async function getAll(ctx) {
  const result = await model.getAll();
  ctx.body = result;
}

async function getById(ctx) {
  const id = ctx.params.id;
  const result = await model.getById(id);
  const role = result[0];
  ctx.body = role;
}

async function createRole(ctx) {
  const body = ctx.request.body;
  const result = await model.add(body);
  const id = result.insertId;
  ctx.status = 201;
  ctx.body = {ID: id, created: true, link: `${ctx.request.path}/${id}`};
}

async function updateRole(ctx) {
  const id = ctx.params.id;
  let result = await model.getById(id);  // get existing record
  let role = result[0];
  // exclude id field that should not be updated
  const {ID, ...body} = ctx.request.body;
  // overwrite other fields with remaining body data
  Object.assign(role, body);
  await model.update(role);
  ctx.body = {ID: id, updated: true, link: ctx.request.path};
}

async function deleteRole(ctx) {
  const id = ctx.params.id;
  await model.delById(id);
  ctx.body = {ID: id, deleted: true}
}

module.exports = router;
