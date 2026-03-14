const pool = require('../pool')

/* Add new message to messages table */
async function addMessage(title, content, userId) {
  await pool.query(
    'INSERT INTO messages (title, content, authorId) VALUES ($1, $2, $3)',
    [title, content, userId],
  )
}

module.exports = addMessage