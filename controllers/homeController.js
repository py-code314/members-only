/* Show home page */
async function home_page_get(req, res) {

  res.render('pages/home', {
    title: 'Home',
  })
}

module.exports = home_page_get
