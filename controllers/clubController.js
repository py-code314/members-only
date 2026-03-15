/* Show join club form */
async function club_get(req, res) {
  res.render('pages/club', {
    title: 'The Inner Circle',
  })
}

module.exports = {club_get}
