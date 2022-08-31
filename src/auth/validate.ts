import crypto from 'crypto'

const SALT = process.env.SALT || 'salt'

export const COOKIE_KEY = 'fresources-jwt'

export function hashPassword(password: string) {
  const hash = crypto
    .pbkdf2Sync(password, SALT, 1000, 64, 'sha512')
    .toString('hex')
  return hash
}

export const ADMIN_PASSWORD = hashPassword(
  process.env.APP_PASSWORD || 'password'
)

export function validatePasswordHash(hash: string) {
  return hash === ADMIN_PASSWORD
}

export function validatePassword(password: string) {
  var hash = crypto
    .pbkdf2Sync(password, SALT, 1000, 64, 'sha512')
    .toString('hex')
  return validatePasswordHash(hash)
}
