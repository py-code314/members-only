/* Throw error if passphrase doesn't match */
class PassphraseMismatchError extends Error {
  constructor(
    message = 'The passphrase provided was not recognized. Access to the vault remains encrypted.',
    title = 'Invalid Cypher',
  ) {
    super(message)
    this.statusCode = 403
    this.name = 'PassphraseMismatchError'
    this.title = title
  }
}

module.exports = PassphraseMismatchError
