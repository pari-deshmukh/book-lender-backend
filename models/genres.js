const db = require('../helpers/database');

//list all the genres in the database
exports.getAll = async function getAll () {
  const query = "SELECT * FROM genres;";
  const data = await db.run_query(query);
  return data;
}

//get a single genre by its id  
exports.getById = async function getById (id) {
  const query = "SELECT * FROM genres WHERE ID = ?;";
  const data = await db.run_query(query, [id]);
  return data;
}

//create a new genre in the database
exports.add = async function add (genre) {
  const query = "INSERT INTO genres SET ?;";
  const data = await db.run_query(query, genre);
  return data;
}

// update a genre in the database
exports.update = async function add (genre) {
  const query = "UPDATE genres SET ? WHERE ID=?;";
  const data = await db.run_query(query, [genre, genre.ID]);
  return data;
}

//delete a genre by its id
exports.delById = async function delById (id) {
  const query = "DELETE FROM genres WHERE ID = ?;";
  const data = await db.run_query(query, [id]);
  return data;
}
