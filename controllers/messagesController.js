/* Imports */
const { body, validationResult, matchedData } = require('express-validator')

/* Error messages */
const emptyErr = 'can not be empty.'

/* Validate log in data */
const validateMessage = [
  body('title').trim().notEmpty().withMessage(`Title ${emptyErr}`),
  body('content').trim().notEmpty().withMessage(`Message ${emptyErr}`),
]

/* Show new message page */
async function message_get(req, res) {
  res.render('pages/message', {
    title: 'New Message',
    user: req.user
  })
}

module.exports = {message_get}
