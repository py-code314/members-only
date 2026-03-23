class AuthorizationError extends Error {
  constructor(
    message = 'Access denied. This action requires administrative oversight and higher-level responsibility.',
    title = 'Clearance Required',
  ) {
    super(message)
    this.statusCode = 403
    this.name = 'AuthorizationError'
    this.title = title
  }
}

module.exports = AuthorizationError
