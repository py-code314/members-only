const express = require('express')
const signUpRouter = express.Router()
const { sign_up_get, sign_up_post } = require('../controllers/signUpController')

// Sign up routes
signUpRouter.get('/', sign_up_get)

module.exports = signUpRouter






