const express = require('express')
const messagesRouter = express.Router()
const {
  message_get,
  message_post,
  messages_get,
} = require('../controllers/messagesController')
const { isAuth } = require('../routes/auth')

// Messages route
messagesRouter.get('/', messages_get)

// New message routes
messagesRouter.get('/new', isAuth, message_get) // protected route
messagesRouter.post('/new',isAuth, message_post)

module.exports = messagesRouter
