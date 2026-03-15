/* Imports */
const { body, validationResult, matchedData } = require('express-validator')
const addMessage = require('../db/queries/messages')

/* Error messages */
const emptyErr = 'can not be empty.'

/* Validate login data */
const validateMessage = [
  body('title').trim().notEmpty().withMessage(`Title ${emptyErr}`),
  body('content').trim().notEmpty().withMessage(`Message ${emptyErr}`),
]

/* Show new message page */
async function message_get(req, res) {
  res.render('pages/message', {
    title: 'New Message',
    // user: req.user
  })
}

/* Validate and add new message */
const message_post = [
  validateMessage,

  async (req, res, next) => {
    // Get form data except password
    const { title, content } = req.body
    const msgData = {
      title: title,
      content: content,
    }

    // Validate request
    const errors = validationResult(req)

    // Show errors if validation fails
    if (!errors.isEmpty()) {
      return res.status(400).render('pages/message', {
        title: 'New Message',
        message: msgData,
        errors: errors.array(),
        // user: req.user
      })
    }

    try {
      // Get validated form data
      const { title, content } = matchedData(req)
      const userId = req.user.id
      console.log("🚀 ~ userId:", userId)

      await addMessage(title, content, userId)

      res.redirect('/home')
    } catch (err) {
      return next(err)
    }
  },
]

module.exports = {message_get, message_post}
