const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();

app.use(cors());

const users = require('./routes/users.js');

app.use(users.routes());

module.exports = app;
