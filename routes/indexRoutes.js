const express = require('express')
const indexRouter = express.Router()
const index_page_get  = require('../controllers/indexController')

// Index page route
indexRouter.get('/', index_page_get)

module.exports = indexRouter
