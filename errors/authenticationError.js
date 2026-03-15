class AuthenticationError extends Error {
  constructor(
    message = 'System intercept: The provided signature is unrecognized. Please re-verify your operative credentials.',
    title = 'Credentials Mismatch',
  ) {
    super(message)
    this.statusCode = 401
    this.name = 'AuthenticationError'
    this.title = title
  }
}

module.exports = AuthenticationError
