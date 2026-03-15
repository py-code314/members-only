class SecretMismatchError extends Error {
  constructor(
    message = 'The code provided was not recognized. Access to the vault remains encrypted.',
    title = 'Invalid Cypher',
  ) {
    super(message)
    this.statusCode = 403
    this.name = 'SecretMismatchError'
    this.title = title
  }
}

module.exports = SecretMismatchError
