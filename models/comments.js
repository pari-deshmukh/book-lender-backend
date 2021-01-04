const db = require('../helpers/database');

//get all comments on a given request
exports.getAll = async function getAll (requestID) {
  const query = "SELECT * FROM comments WHERE requestID = ?;";
  const data = await db.run_query(query, [requestID]);
  return data;
}

//create a new comment (must contain requestID in comment)
exports.add = async function add (comment) {
  const query = "INSERT INTO comments SET ?";
  const data = await db.run_query(query, comment);
  return data;
}

//delete a specific comment
exports.deleteById = async function deleteById (id) {
  const query = "DELETE FROM comments WHERE ID = ?;";
  const data = await db.run_query(query, [id]);
  return data;
}

//get an individual comment
exports.getById = async function getById (id) {
  const query = "SELECT * FROM comments WHERE ID = ?;";
  const data = await db.run_query(query, [id]);
  return data;
}
