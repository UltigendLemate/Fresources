import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
}
