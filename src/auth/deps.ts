import { User } from './types'

/* eslint-disable no-unused-vars */
export const COOKIE_KEY = 'fresources-jwt'

export enum USER_TYPE {
  UNAUTHORIZED = 0,
  LEADER = 1,
  ADMIN = 2,
}

export const getUser = (type: USER_TYPE): User => {
  return {
    email: 'example@field.com',
    name: 'origami',
    type,
  }
}
