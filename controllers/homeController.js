const {getAllMessages} = require('../db/queries/messages')
/* Show home page */
async function home_page_get(req, res, next) {

  try {
    const messages = await getAllMessages()

    res.render('pages/home', { title: 'Home', messages })
  } catch (err) {
    return next(err)
  }
}

module.exports = home_page_get
