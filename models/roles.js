const db = require('../helpers/database');

//list all the roles in the database
exports.getAll = async function getAll () {
  const query = "SELECT * FROM roles;";
  const data = await db.run_query(query);
  return data;
}

//get a single role by its id  
exports.getById = async function getById (id) {
  const query = "SELECT * FROM roles WHERE ID = ?;";
  const data = await db.run_query(query, [id]);
  return data;
}

//create a new role in the database
exports.add = async function add (role) {
  const query = "INSERT INTO roles SET ?;";
  const data = await db.run_query(query, role);
  return data;
}

// update a role in the database
exports.update = async function add (role) {
  const query = "UPDATE roles SET ? WHERE ID=?;";
  const data = await db.run_query(query, [role, role.ID]);
  return data;
}

//delete a role by its id
exports.delById = async function delById (id) {
  const query = "DELETE FROM roles WHERE ID = ?;";
  const data = await db.run_query(query, [id]);
  return data;
}
