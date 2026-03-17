class AuthorizationError extends Error {
  constructor(
    message = 'You are not authorized to do this.',
    title = 'Access Denied',
  ) {
    super(message)
    this.statusCode = 403
    this.name = 'AuthorizationError'
    this.title = title
  }
}

module.exports = AuthorizationError
