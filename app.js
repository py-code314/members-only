const express = require('express')
const path = require('node:path')
const session = require('express-session')
const passport = require('passport')
const pool = require('./db/pool') 
const pgStore = require('connect-pg-simple')(session)
const indexRouter = require('./routes/indexRoutes')
const signUpRouter = require('./routes/signUpRoutes')

/**
 * -------------- GENERAL SETUP ----------------
 */

// Import dotenv
require('dotenv').config()

// Create express app
const app = express()

// EJS setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Setup for static files
const assetsPath = path.join(__dirname, 'public')
app.use(express.static(assetsPath))

// Middleware to process request body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * -------------- SESSION SETUP ----------------
 */

// Create session store
const sessionStore = new pgStore({
  pool: pool, // Connection pool
  tableName: 'sessions',
  createTableIfMissing: true,
})

// Create session object
app.use(
  session({
    store: sessionStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  }),
)

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

require('./config/passport')
// app.use(passport.initialize());
app.use(passport.session())

/**
 * -------------- ROUTES ----------------
 */

app.use('/', indexRouter)
app.use('/signUp', signUpRouter)

/**
 * -------------- SERVER ----------------
 */

// Port to listen on
const PORT = process.env.PORT || 3000
app.listen(PORT, (error) => {
  if (error) {
    throw error
  }
  console.log(`App Inventory Application - listening on port ${PORT}!`)
})
