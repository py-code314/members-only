const AuthenticationError = require("../errors/authenticationError")

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
    req.session.messages = ['You must be an operative to join the club.']
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
