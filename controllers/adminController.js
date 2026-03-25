/* Imports */
const { body, validationResult, matchedData } = require('express-validator')
const PasscodeMismatchError = require('../errors/passcodeMismatchError')
require('dotenv').config()
const { updateAdminStatus } = require('../db/queries/users')

/* Error messages */
const emptyErr = 'can not be empty.'

/* Validate passcode */
const validatePasscode = [
  body('passcode').trim().notEmpty().withMessage(`Passcode ${emptyErr}`),
]
/* Show admin form */
async function admin_get(req, res) {
  if (req.user.is_admin) {
    req.session.messages = [
      'Your Level Alpha clearance is already active. The mainframe remains under your control.',
    ]
    return res.redirect('/')
  }

  res.render('pages/admin', {
    title: 'Root Access Protocol',
  })
}

/* Validate and add as admin */
const admin_post = [
  validatePasscode,

  async (req, res, next) => {
    // Validate request
    const errors = validationResult(req)

    // Show errors if validation fails
    if (!errors.isEmpty()) {
      return res.status(400).render('pages/admin', {
        title: 'Root Access Protocol',
        errors: errors.array(),
      })
    }

    try {
      // Get validated form data
      const { passcode } = matchedData(req)
      const userId = req.user.id

      if (passcode !== process.env.SECRET_PASSCODE) {
        throw new PasscodeMismatchError()
      }

      await updateAdminStatus(userId)
      req.session.messages = [
        'Administrative clearance established. You have been granted oversight of the network.',
      ]

      res.redirect('/')
    } catch (err) {
      console.error(err)
      return next(err)
    }
  },
]

module.exports = { admin_get, admin_post }
