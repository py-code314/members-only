const { getAllMessages } = require('../db/queries/messages')
/* Show home page */
async function home_page_get(req, res, next) {
  try {
    const sessionMsgs = req.session.messages || []
    const successMember = sessionMsgs.filter((message) =>
      message.includes('member'),
    )

    const successAdmin = sessionMsgs.filter((message) =>
      message.includes('oversight'),
    )

    req.session.messages = []

    const messages = await getAllMessages()

    res.render('pages/home', {
      title: 'Home',
      messages,
      successMember,
      successAdmin,
    })
  } catch (err) {
    return next(err)
  }
}

module.exports = home_page_get
