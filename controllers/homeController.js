const { getAllMessages } = require('../db/queries/messages')

/* Show home page */
async function home_page_get(req, res, next) {
  try {
    const sessionMsgs = req.session.messages || []

    // Get messages from session
    const successMember = sessionMsgs.filter((message) =>
      message.includes('member'),
    )
    const successAdmin = sessionMsgs.filter((message) =>
      message.includes('oversight'),
    )
    const isMember = sessionMsgs.filter((message) =>
      message.includes('already'),
    )
    const isAdmin = sessionMsgs.filter((message) =>
      message.includes('Level Alpha'),
    )

    // Clear messages
    req.session.messages = []

    const messages = await getAllMessages()

    res.render('pages/home', {
      title: 'Home',
      messages,
      successMember,
      successAdmin,
      isMember,
      isAdmin,
    })
  } catch (err) {
    console.error(err)
    return next(err)
  }
}

module.exports = home_page_get
