const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const pool = require('../db/pool')
const bcrypt = require('bcryptjs')


/* Verify username and password before logging in */
const verifyCallback = async (username, password, done) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username],
    )
    const user = rows[0]

    if (!user) {
      return done(null, false, { message: 'Incorrect Username' })
    }

    const match = await bcrypt.compare(password, user.hash)
    if (!match) {
      // Passwords don't match
      return done(null, false, { message: 'Incorrect Password' })
    }
    // Username and password match
    return done(null, user)
  } catch (err) {
    return done(err)
  }
}

const strategy = new LocalStrategy(verifyCallback)

passport.use(strategy)

// Store session data in db
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// Retrieve user data from db
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    const user = rows[0]

    done(null, user)
  } catch (err) {
    done(err)
  }
})
