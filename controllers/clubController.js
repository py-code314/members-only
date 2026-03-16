/* Imports */
const { body, validationResult, matchedData } = require('express-validator')
const PassphraseMismatchError = require('../errors/passphraseMismatchError')
require('dotenv').config()
const { updateMemberStatus } = require('../db/queries/users')

/* Error messages */
const emptyErr = 'can not be empty.'

/* Validate passphrase */
const validatePassphrase = [
  body('passphrase').trim().notEmpty().withMessage(`Passphrase ${emptyErr}`),
]

/* Show join club form */
async function club_get(req, res) {
  res.render('pages/club', {
    title: 'The Inner Circle',
  })
}

/* Validate and add as a member */
const club_post = [
  validatePassphrase,

  async (req, res, next) => {

    // Validate request
    const errors = validationResult(req)

    // Show errors if validation fails
    if (!errors.isEmpty()) {
      return res.status(400).render('pages/club', {
        title: 'The Inner Circle',
        errors: errors.array(),
      })
    }

    try {
      // Get validated form data
      const { passphrase } = matchedData(req)
      const userId = req.user.id

      if (passphrase !== process.env.SECRET_PASSPHRASE) {
        throw new PassphraseMismatchError()
      }

      await updateMemberStatus(userId)

      res.redirect('/home')
    } catch (err) {
      return next(err)
    }
  },
]

module.exports = { club_get, club_post }
