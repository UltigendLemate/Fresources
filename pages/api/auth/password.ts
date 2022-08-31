import assert from 'assert'
import { setCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '~/auth/types'
import { ADMIN_PASSWORD, validatePassword } from '~/auth/validate'

type ReqData = {
  password: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | undefined>
) {
  try {
    const request_data: ReqData = JSON.parse(req.body)
    assert(request_data?.password, 'password is required')
    if (validatePassword(request_data.password)) {
      setCookie('fresources-jwt', ADMIN_PASSWORD, {
        req,
        res,
        maxAge: 60 * 60 * 24,
      })
      res.status(200).json({ name: 'John Doe', email: '', password: '' })
    } else throw new Error('Invalid password')
  } catch (e) {
    res.status(500).end()
  }
}
