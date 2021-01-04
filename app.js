const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();

app.use(cors());

const books = require('./routes/books.js');
const comments = require('./routes/comments.js');
const genres = require('./routes/genres.js');
const requests = require('./routes/requests.js');
const roles = require('./routes/roles.js');
const special = require('./routes/special.js');
const users = require('./routes/users.js');

app.use(books.routes());
app.use(comments.routes());
app.use(genres.routes());
app.use(requests.routes());
app.use(roles.routes());
app.use(special.routes());
app.use(users.routes());

module.exports = app;
