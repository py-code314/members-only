const express = require('express')
const path = require('node:path')
const session = require('express-session')
const passport = require('passport')
const pool = require('./db/pool')
const pgStore = require('connect-pg-simple')(session)
const signUpRouter = require('./routes/signUpRoutes')
const logInRouter = require('./routes/logInRoutes')
const homeRouter = require('./routes/homeRoutes')
const logOutRouter = require('./routes/logOutRoutes')
const messagesRouter = require('./routes/messagesRoutes')
const clubRouter = require('./routes/clubRoutes')
const adminRouter = require('./routes/adminRoutes')

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
app.use(passport.session())

/**
 * -------------- ROUTES ----------------
 */

app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})

app.use('/signUp', signUpRouter)
app.use('/logIn', logInRouter)
app.use('/', homeRouter)
app.use('/logOut', logOutRouter)
app.use('/messages', messagesRouter)
app.use('/club', clubRouter)
app.use('/admin', adminRouter)

/**
 * -------------- ERROR HANDLER MIDDLEWARE ----------------
 */

app.use((err, req, res, next) => {
  console.error(err)

  // Error data
  const statusCode = err.statusCode || 500

  let errorTitle = 'Connection Terminated'
  let errorMessage =
    'The requested operation could not be completed. The signal has been purged.'

  if (err.title && statusCode !== 500) {
    errorTitle = err.title
    errorMessage = err.message
  }

  res.status(statusCode).render('pages/error', {
    title: 'Error',
    errorCode: statusCode,
    errorTitle,
    errorMessage,
  })
})

/**
 * -------------- SERVER ----------------
 */

// Port to listen on
const PORT = process.env.PORT || 3000
app.listen(PORT, (error) => {
  if (error) {
    throw error
  }
  console.log(`App Members Only - listening on port ${PORT}!`)
})
