const express = require('express')
const messagesRouter = express.Router()
const {
  message_get,
  message_post,
  messages_get,
  message_delete_post,
} = require('../controllers/messagesController')
const { isAuth, isAdmin } = require('../routes/auth')

/* Messages routes */
// Messages route
messagesRouter.get('/', messages_get)

// New message routes
messagesRouter.get('/new', isAuth, message_get) // protected route
messagesRouter.post('/new', isAuth, message_post)

// Delete a message
messagesRouter.post('/:id/delete', isAdmin, message_delete_post)

module.exports = messagesRouter
