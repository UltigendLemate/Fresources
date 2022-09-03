import { Updates } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await prisma.updates.findMany({
    orderBy: { timeStamp: 'desc' },
    take: 10,
  })
  res.status(200).json(data)
}

export type UpdatesResponse = Updates[]
