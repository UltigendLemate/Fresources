import assert from 'assert'
import { getCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { COOKIE_KEY } from '~/auth/deps'
import { User } from '~/auth/types'

import { validatePasswordHash } from '~/auth/validate'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | undefined>
) {
  try {
    const passwordHash = getCookie(COOKIE_KEY, { req, res }) as string
    assert(passwordHash, 'Not authenticated')
    if (validatePasswordHash(passwordHash))
      res.status(200).json({ name: 'John Doe', email: '', password: '' })
    else throw new Error('Invalid password')
  } catch (e) {
    res.status(500).end()
  }
}
