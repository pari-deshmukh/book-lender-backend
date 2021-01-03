const db = require('../helpers/database');
const bcrypt = require('bcrypt');

//search for users based on email pattern
exports.emailSearch = async function emailSearch (q) {
  const query = "SELECT * FROM users WHERE email LIKE ?;";
  const data = await db.run_query(query, '%'+q+'%');
  return data;
}

//get a single user by its id  
exports.getById = async function getById (id) {
  const query = "SELECT * FROM users WHERE ID = ?;";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}

//get a single user by the (unique) username
exports.findByUsername = async function getByUsername(username) {
  const query = "SELECT * FROM users WHERE username = ?;";
  const user = await db.run_query(query, username);
  return user;
}

//list all the users in the database
exports.getAll = async function getAll (limit=10, page=1) {
  const offset = (page - 1) * limit;
  const query = "SELECT * FROM users LIMIT ?,?;";
  const data = await db.run_query(query, [offset, limit]);
  return data;
}

//create a new user in the database
exports.add = async function add (user) {
  const query = "INSERT INTO users SET ?";
  const password = user.password;
  const hash = bcrypt.hashSync(password, 10);
  user.password = hash;
  const data = await db.run_query(query, user);
  return data;
}

//delete a user by its id
exports.delById = async function delById (id) {
  const query = "DELETE FROM users WHERE ID = ?;";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}

//update an existing user
exports.update = async function update (user) {
  const query = "UPDATE users SET ? WHERE ID = ?;";
  if (user.password) {
    const password = user.password;
    const hash = bcrypt.hashSync(password, 10);
    user.password = hash;  
  }
  const values = [user, user.ID];
  const data = await db.run_query(query, values);
  return data;
}