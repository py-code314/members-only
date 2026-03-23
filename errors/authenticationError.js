class AuthenticationError extends Error {
  constructor(
    message = 'Your signature was not detected. Please establish an active session to contribute to the discussion.',
    title = 'Identification Required',
  ) {
    super(message)
    this.statusCode = 401
    this.name = 'AuthenticationError'
    this.title = title
  }
}

module.exports = AuthenticationError
