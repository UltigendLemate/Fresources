import crypto from 'crypto'
import { USER_TYPE } from './deps'

const SALT = process.env.SALT || 'salt'

export const LEADER_PASSWORD = hashPassword(
  process.env.LEADER_PASSWORD || 'leader'
)
export const ADMIN_PASSWORD = hashPassword(
  process.env.APP_PASSWORD || 'password'
)

export function hashPassword(password: string) {
  const hash = crypto
    .pbkdf2Sync(password, SALT, 1000, 64, 'sha512')
    .toString('hex')
  return hash
}

export function validatePasswordHash(hash: string) {
  switch (hash) {
    case LEADER_PASSWORD:
      return USER_TYPE.LEADER
    case ADMIN_PASSWORD:
      return USER_TYPE.ADMIN
    default:
      return USER_TYPE.UNAUTHORIZED
  }
}

export function validatePassword(password: string) {
  var hash = crypto
    .pbkdf2Sync(password, SALT, 1000, 64, 'sha512')
    .toString('hex')
  return validatePasswordHash(hash)
}
