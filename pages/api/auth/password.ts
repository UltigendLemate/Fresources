import assert from 'assert'
import { setCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { COOKIE_KEY, getUser, USER_TYPE } from '~/auth/deps'
import { User } from '~/auth/types'
import {
  ADMIN_PASSWORD,
  LEADER_PASSWORD,
  validatePassword,
} from '~/auth/validate'

type ReqData = { password: string }

const maxAge = 60 * 60 * 24

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | undefined>
) {
  try {
    const request_data: ReqData = JSON.parse(req.body)
    assert(request_data?.password, 'password is required')
    switch (validatePassword(request_data.password)) {
      case USER_TYPE.ADMIN: {
        setCookie(COOKIE_KEY, ADMIN_PASSWORD, { req, res, maxAge })
        res.status(200).json(getUser(USER_TYPE.ADMIN))
        break
      }
      case USER_TYPE.LEADER: {
        setCookie(COOKIE_KEY, LEADER_PASSWORD, { req, res, maxAge })
        res.status(200).json(getUser(USER_TYPE.LEADER))
        break
      }
      default:
        throw new Error('Invalid password')
    }
  } catch (e) {
    res.status(500).end()
  }
}
