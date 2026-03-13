/* Imports */
const {
  body,
} = require('express-validator')

/* Error messages */
const emptyErr = 'is required.'


/* Validate user data */
const validateLogIn = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage(`Username ${emptyErr}`),
  body('password')
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}`)
]

/* Show log in page */
async function log_in_get(req, res) {
  res.render('pages/logIn', {
    title: 'Log In',
  })
}

module.exports = { log_in_get }
