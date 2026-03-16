class AuthenticationError extends Error {
  constructor(
    message = 'System intercept: The provided credentials are not recognized. Please log-in to post a message.',
    title = 'Credentials Mismatch',
  ) {
    super(message)
    this.statusCode = 401
    this.name = 'AuthenticationError'
    this.title = title
  }
}

module.exports = AuthenticationError
