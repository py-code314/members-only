/* Imports */
const { body, validationResult, matchedData } = require('express-validator')

/* Error messages */
const emptyErr = 'is required.'

/* Validate log in data */
const validateLogIn = [
  body('username').trim().notEmpty().withMessage(`Username ${emptyErr}`),
  body('password').trim().notEmpty().withMessage(`Password ${emptyErr}`),
]

/* Show log in page */
async function log_in_get(req, res) {
  // User is already logged in
  if (req.user) {
    return res.redirect('/')
  }

  // User not logged in
  const messages = req.session.messages || []
  // Get messages from session
  const successUser = messages.filter((message) => message.includes('established'))
  const errors = messages
    .filter((message) => !message.includes('established'))
    .map((message) => ({ msg: message }))

  // Clear messages
  req.session.messages = []

  res.render('pages/logIn', {
    title: 'Log In',
    successUser,
    errors,
  })
}

/* Validate log in data */
const log_in_post = [
  validateLogIn,
  async (req, res, next) => {
    // Validate request
    const errors = validationResult(req)

    // Show errors if validation fails
    if (!errors.isEmpty()) {
      return res.status(400).render('pages/logIn', {
        title: 'Log In',
        user: { username: req.body.username },
        errors: errors.array(),
      })
    }

    next()
  },
]

module.exports = { log_in_get, log_in_post }
