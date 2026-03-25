/* Throw error if passcode doesn't match */
class PasscodeMismatchError extends Error {
  constructor(
    message = 'The provided passcode does not match our records. Access to this sector is restricted to verified operatives only.',
    title = 'Protocol Violation',
  ) {
    super(message)
    this.statusCode = 403
    this.name = 'PasscodeMismatchError'
    this.title = title
  }
}

module.exports = PasscodeMismatchError
