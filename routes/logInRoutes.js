const express = require('express')
const logInRouter = express.Router()
const { log_in_get, log_in_post } = require('../controllers/logInController')

// Log in routes
logInRouter.get('/', log_in_get)
logInRouter.post('/', log_in_post)

module.exports = logInRouter
