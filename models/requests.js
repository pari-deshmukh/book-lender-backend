const db = require('../helpers/database');

//list all the requests in the database
exports.getAll = async function getAll () {
  const query = "SELECT * FROM requests;";
  const data = await db.run_query(query);
  return data;
}

//get a single request by its id  
exports.getById = async function getById (id) {
  const query = "SELECT * FROM requests WHERE ID = ?;";
  const data = await db.run_query(query, [id]);
  return data;
}

//get all requests by a book id  
exports.getById = async function getByBookId (id) {
  const query = "SELECT * FROM requests WHERE bookID = ?;";
  const data = await db.run_query(query, [id]);
  return data;
}

//create a new request in the database
exports.add = async function add (request) {
  const query = "INSERT INTO requests SET ?;";
  const data = await db.run_query(query, request);
  return data;
}

// update a request in the database
exports.update = async function add (request) {
  const query = "UPDATE requests SET ? WHERE ID=?;";
  const data = await db.run_query(query, [request, request.ID]);
  return data;
}

//delete a request by its id
exports.delById = async function delById (id) {
  const query = "DELETE FROM requests WHERE ID = ?;";
  const data = await db.run_query(query, [id]);
  return data;
}
