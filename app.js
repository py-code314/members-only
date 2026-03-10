// Import dotenv
require('dotenv').config()

// Create express app
const express = require('express')
const app = express()
const path = require('node:path')

// EJS setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Setup for static files
const assetsPath = path.join(__dirname, 'public')
app.use(express.static(assetsPath))

// Middleware to process request body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Port to listen on
const PORT = process.env.PORT || 3000
app.listen(PORT, (error) => {
  if (error) {
    throw error
  }
  console.log(`App Inventory Application - listening on port ${PORT}!`)
})