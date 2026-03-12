/* Imports */
const bcrypt = require('bcryptjs')
const {
  body,
  query,
  validationResult,
  matchedData,
} = require('express-validator')
const { findUserByUsername } = require('../db/queries/users')

/* Error messages */
const emptyErr = 'can not be empty.'
const existsErr = 'already in use.'
const lengthErr = 'must be at least 8 characters long.'
const invalidErr =
  'must contain an uppercase letter, a number, and a special character.'
const alphaErr = 'must contain only letters.'

/* Validate user data */
const validateUser = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage(`Username ${emptyErr}`)
    .bail()
    .custom(async (username) => {
      const user = await findUserByUsername(username)
      console.log("🚀 ~ user:", user)
      if (user) {
        throw new Error(`Username ${existsErr}`)
      }
    }),
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage(`First Name ${emptyErr}`)
    .bail()
    .isAlpha('en-US', { ignore: '-' })
    .withMessage(`First Name ${alphaErr}`),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage(`Last Name ${emptyErr}`)
    .bail()
    .isAlpha('en-US', { ignore: '-' })
    .withMessage(`Last Name ${alphaErr}`),
  body('password')
    .trim()
    .notEmpty()
    .withMessage(`Password ${emptyErr}`)
    .bail()
    .isLength({ min: 8 })
    .withMessage(`Password ${lengthErr}`)
    .bail()
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/)
    .withMessage(`Password ${invalidErr}`),
  body('confirmPassword')
    .trim()
    .notEmpty()
    .withMessage(`Confirm Password ${emptyErr}`)
    .bail()
    .custom((password, { req }) => {
      return password === req.body.password
    })
    .withMessage('Passwords do not match.'),
]

/* Show sign up page */
async function sign_up_get(req, res) {
  res.render('pages/signUp', {
    title: 'Sign Up',
  })
}

/* Validate and add new user */
const sign_up_post = [
  validateUser,

  async (req, res, next) => {
    // Validate request
    const errors = validationResult(req)
    console.log("🚀 ~ errors:", errors)

    // Show errors if validation fails
    if (!errors.isEmpty()) {
      return res.status(400).render('pages/signUp', {
        title: 'Sign Up',
        user: req.body,
        errors: errors.array(),
      })
    }

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const {username, firstName, lastName, password} = req.body
      await addUser(username, hashedPassword, firstName, lastName, password)
      
      res.redirect('/logIn')
    } catch (err) {
      console.error(err)
      return next(err)
      
    }
  },
]

module.exports = { sign_up_get, sign_up_post }
