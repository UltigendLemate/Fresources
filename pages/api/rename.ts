import assert from 'assert'
import { getCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { COOKIE_KEY, USER_TYPE } from '~/auth/deps'
import { validatePasswordHash } from '~/auth/validate'
import { prisma } from '~/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const passwordHash = getCookie(COOKIE_KEY, { req, res }) as string

    assert(passwordHash, 'Authenticated')
    assert(
      validatePasswordHash(passwordHash) >= USER_TYPE.LEADER,
      'Not enough privilege'
    )

    const request_data = JSON.parse(req.body)

    await prisma.resource.update({
      where: {
        id: request_data.id,
      },
      data: {
        name: request_data.name,
      },
    })
    res.status(200).send('File renamed')
  } catch (e) {
    res.status(500).send((e as Error).message)
  }
}
