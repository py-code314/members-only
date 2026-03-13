const express = require('express')
const messageRouter = express.Router()
const { message_get, message_post } = require('../controllers/messageController')

// New message routes
messageRouter.get('/', message_get)
messageRouter.post('/', message_post)

module.exports = messageRouter
