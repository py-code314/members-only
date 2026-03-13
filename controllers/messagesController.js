/* Show new message page */
async function message_get(req, res) {
  res.render('pages/message', {
    title: 'New Message',
    user: req.user
  })
}

module.exports = {message_get}
