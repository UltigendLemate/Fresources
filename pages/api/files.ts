import assert from 'assert'
import { getCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { COOKIE_KEY } from '~/auth/deps'
import { validatePasswordHash } from '~/auth/validate'
import { prisma } from '~/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const passwordHash = getCookie(COOKIE_KEY, { req, res }) as string

    assert(
      passwordHash && validatePasswordHash(passwordHash),
      'Not authenticated'
    )

    prisma.college
      .findMany({
        include: {
          branches: {
            include: {
              courses: {
                include: {
                  resources: true,
                },
              },
            },
          },
        },
      })
      .then((data) => {
        res.status(200).send(data)
      })
      .catch((err) => {
        res.status(500).send(err)
      })
  } catch (e) {
    res.status(500).send((e as Error).message)
  }
}
