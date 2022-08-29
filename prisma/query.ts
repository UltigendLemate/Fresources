/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function helper(connect: string) {
  const data = await prisma.course.findMany({
    where: {
      description: connect,
    },
    include: {
      resources: true,
      branches: true,
    },
  })

  const primary = data[0]
  const secondary = data.splice(1)

  for (const course of secondary) {
    await prisma.course.delete({
      where: {
        id: course.id,
      },
    })
  }

  for (const course of secondary) {
    for (const branch of course.branches) {
      await prisma.branch.update({
        where: {
          id: branch.id,
        },
        data: {
          courses: {
            connect: {
              id: primary.id,
            },
          },
        },
      })
    }
    for (const resource of course.resources) {
      await prisma.course.update({
        where: {
          id: primary.id,
        },
        data: {
          resources: {
            create: {
              name: resource.name,
              url: resource.url,
              type: resource.type,
              courseIds: [primary.id],
              upvotes: resource.upvotes,
            },
          },
        },
      })
    }
  }
}

async function main() {
  await prisma.$connect()
  helper('Algorithm Design and Analysis')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async () => {
    await prisma.$disconnect()
    process.exit(1)
  })
