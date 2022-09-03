import { Updates } from '@prisma/client'
import { assert } from 'console'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/prisma'
import { Metadata } from '../bakshi'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { metadata } = req.body as { metadata: Metadata }
    assert(metadata?.link, 'No link in metadata provided')

    const college = await prisma.college.findFirst({
      where: { id: metadata.collegeId },
    })

    const dbResourse = await prisma.resource.create({
      data: {
        url: metadata.link!,
        name: metadata.name,
        type: metadata.type,
        courseIds: metadata.courseIds,
      },
    })

    await prisma.course.updateMany({
      where: { id: { in: metadata.courseIds } },
      data: {
        resourceIds: { push: dbResourse.id },
      },
    })

    const courseData = await prisma.course.findFirst({
      where: { id: metadata.courseIds[0] },
      include: { branches: true },
    })

    if (metadata.message !== '') {
      await prisma.updates.create({
        data: {
          message: metadata.message,
          url: `${metadata.url}/${college?.name}/${courseData?.branches[0].name}/${courseData?.description}`,
          collegeId: metadata.collegeId,
        },
      })
    }

    res.status(201).send('playlist upload success')
  } catch (e) {
    res.status(500).end()
  }
}

export type UpdatesResponse = Updates[]
