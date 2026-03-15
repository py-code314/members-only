const express = require('express')
const clubRouter = express.Router()
const {
  club_get,
  club_post,
} = require('../controllers/clubController')
const {  authenticated } = require('../routes/auth')

// New message routes
clubRouter.get('/', authenticated, club_get) // protected route
// clubRouter.post('/new', club_post)

module.exports = clubRouter
