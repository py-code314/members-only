const pool = require('../pool')

/* Find user by username */
async function findUserByUsername(username) {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username],
  )
  return rows[0]
}

/* Add new user to db */
async function addUser(username, firstName, lastName, hashedPassword) {
  await pool.query(
    "INSERT INTO users (username, firstName, lastName, hash) VALUES ($1, $2, $3, $4)",
    [username, firstName, lastName, hashedPassword]
  )
}

module.exports = { findUserByUsername, addUser }
