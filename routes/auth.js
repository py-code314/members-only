const AuthenticationError = require('../errors/authenticationError')
const AuthorizationError = require('../errors/authorizationError')

/* Check for valid user credentials */
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    throw new AuthenticationError()
  }
}

/* Check for valid user before showing member form */
const authenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    req.session.messages = [
      'Unverified signal detected. Please authenticate your operative status to join the inner circle.',
    ]
    res.redirect('/logIn')
  }
}

/* Check for user's admin status */
const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.is_admin) {
    next()
  } else {
    throw new AuthorizationError()
  }
}

module.exports = { isAuth, authenticated, isAdmin }
