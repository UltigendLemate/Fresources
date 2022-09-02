import assert from 'assert'
import { getCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { COOKIE_KEY, getUser, USER_TYPE } from '~/auth/deps'
import { User } from '~/auth/types'

import { validatePasswordHash } from '~/auth/validate'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | undefined>
) {
  try {
    const passwordHash = getCookie(COOKIE_KEY, { req, res }) as string
    assert(passwordHash, 'Not authenticated')
    switch (validatePasswordHash(passwordHash)) {
      case USER_TYPE.ADMIN: {
        res.status(200).json(getUser(USER_TYPE.ADMIN))
        break
      }
      case USER_TYPE.LEADER: {
        res.status(200).json(getUser(USER_TYPE.LEADER))
        break
      }
      case USER_TYPE.UNAUTHORIZED: {
        throw new Error('Invalid password')
      }
    }
  } catch (e) {
    res.status(500).end()
  }
}
