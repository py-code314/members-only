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

/* Update user's member status */
async function updateMemberStatus(id) {
  await pool.query(
    "UPDATE users SET isMember = $1 WHERE id = $2", [true, id]
  )
}
module.exports = { findUserByUsername, addUser, updateMemberStatus }
