/* Show log in page */
async function log_in_get(req, res) {
  res.render('pages/logIn', {
    title: 'Log In',
  })
}

module.exports = {log_in_get}
