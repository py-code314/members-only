const express = require('express')
const messagesRouter = express.Router()
const { message_get, message_post } = require('../controllers/messagesController')
const {isAuth} = require('../routes/auth')

// New message routes
messagesRouter.get('/new', isAuth, message_get) // protected route
messagesRouter.post('/new', message_post)

module.exports = messagesRouter
