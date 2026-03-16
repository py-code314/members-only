const pool = require('../pool')

/* Add new message to messages table */
async function addMessage(title, content, userId) {
  await pool.query(
    'INSERT INTO messages (title, content, authorId) VALUES ($1, $2, $3)',
    [title, content, userId],
  )
}

/* Retrieve all messages from messages table */
async function getAllMessages() {
  const { rows } = await pool.query('SELECT * FROM messages ORDER BY id DESC')
  return rows
}

module.exports = { addMessage, getAllMessages }