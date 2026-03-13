/* Show home page */
async function home_page_get(req, res) {
  // console.log('user:', req.user)
  res.render('pages/home', {
    title: 'Home',
    user: req.user
  })
}

module.exports = home_page_get
