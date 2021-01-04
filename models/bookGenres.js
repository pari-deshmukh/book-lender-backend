const db = require('../helpers/database');

//add a genre to an book
//do nothing if it is already added
exports.add = async function add (id, genreID) {
  let query = "INSERT INTO bookGenres SET bookID=?, genreID=?";
      query += " ON DUPLICATE KEY UPDATE bookID=bookID; ";
  const result = await db.run_query(query, [id, genreID]);
  return result;
}

//remove a genre from an book
//do nothing if it does not exist
exports.delete = async function delete_ (id, genreID) {
  let query = "DELETE FROM bookGenres WHERE bookID=? AND genreID=?;";
  const result = await db.run_query(query, [id, genreID]);
  return result;
}

//get the genres for a given book
exports.getAll = async function getAll (id) {
  let query = "SELECT g.ID, g.name FROM bookGenres as bg INNER JOIN genres AS g";
      query += " ON bg.genreID = g.ID WHERE bg.bookID = ?;";
  const result = await db.run_query(query, id);
  return result;
}
