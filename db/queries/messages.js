const pool = require('../pool')

/* Add new message to messages table */
async function addMessage(title, content, userId) {
  await pool.query(
    'INSERT INTO messages (title, content, author_id) VALUES ($1, $2, $3)',
    [title, content, userId],
  )
}

/* Retrieve all messages from messages table */
async function getAllMessages() {
  const text = `
    SELECT messages.id AS "msgId", title, content, username AS "author", date_added
    FROM messages JOIN users
    ON messages.author_id = users.id
    ORDER BY messages.id DESC
  `
  const { rows } = await pool.query(text)
  return rows
}

/* Delete message from table */
async function deleteMessage(id) {
  await pool.query('DELETE FROM messages WHERE id = $1', [id])
}

module.exports = { addMessage, getAllMessages, deleteMessage }