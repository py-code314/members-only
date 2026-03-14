const express = require('express')
const messagesRouter = express.Router()
const { message_get, message_post } = require('../controllers/messagesController')

// New message routes
messagesRouter.get('/new', message_get)
messagesRouter.post('/new', message_post)

module.exports = messagesRouter
