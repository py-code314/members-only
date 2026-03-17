class PasscodeMismatchError extends Error {
  constructor(
    message = 'Passcode does not match. You need to get a proper security clearance.',
    title = 'Access Denied',
  ) {
    super(message)
    this.statusCode = 403
    this.name = 'PasscodeMismatchError'
    this.title = title
  }
}

module.exports = PasscodeMismatchError
