/* Show index page */
async function index_page_get(req, res) {
  res.render('pages/index', {
    title: 'Index',
  })
}

module.exports = index_page_get 
