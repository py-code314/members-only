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
  const messages = req.session.messages || []
  const errors = messages.map(message => ({msg: message}))
  req.session.messages = []

  res.render('pages/logIn', {
    title: 'Log In',
    errors
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
        user: {username: req.body.username},
        errors: errors.array(),
      })
    }

    next()
  }
]





module.exports = { log_in_get, log_in_post,  }
