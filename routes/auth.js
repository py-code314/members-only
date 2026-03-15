const AuthenticationError = require("../errors/authenticationError")

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    throw new AuthenticationError()
  }
}

module.exports = {isAuth}
