const AuthenticationError = require('../errors/authenticationError')
const AuthorizationError = require('../errors/authorizationError')

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    throw new AuthenticationError()
  }
}

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

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.is_admin) {
    next()
  } else {
    throw new AuthorizationError()
  }
}

module.exports = { isAuth, authenticated, isAdmin }
