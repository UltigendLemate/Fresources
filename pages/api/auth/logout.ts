import { deleteCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { COOKIE_KEY } from '~/auth/deps'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  deleteCookie(COOKIE_KEY, { req, res })
  res.status(204).send('Successfully logged out!')
}
