/* Imports */
const { body, validationResult, matchedData } = require('express-validator')
const SecretMismatchError = require('../errors/secretMismatchError')
require('dotenv').config()
const { updateMemberStatus } = require('../db/queries/users')

/* Error messages */
const emptyErr = 'can not be empty.'

/* Validate secret */
const validateSecret = [
  body('secret').trim().notEmpty().withMessage(`Secret ${emptyErr}`),
]

/* Show join club form */
async function club_get(req, res) {
  res.render('pages/club', {
    title: 'The Inner Circle',
  })
}

/* Validate and add as a member */
const club_post = [
  validateSecret,

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
      const { secret } = matchedData(req)
      const userId = req.user.id
      console.log('secret:', process.env.SECRET_CODE)

      if (secret !== process.env.SECRET_CODE) {
        throw new SecretMismatchError()
      }

      await updateMemberStatus(userId)

      res.redirect('/home')
    } catch (err) {
      return next(err)
    }
  },
]

module.exports = { club_get, club_post }
