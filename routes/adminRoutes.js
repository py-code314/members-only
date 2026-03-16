const express = require('express')
const adminRouter = express.Router()
const { admin_get, admin_post } = require('../controllers/adminController')
const { authenticated } = require('../routes/auth')

// Admin routes
adminRouter.get('/', authenticated, admin_get) 
adminRouter.post('/', authenticated, admin_post)

module.exports = adminRouter
