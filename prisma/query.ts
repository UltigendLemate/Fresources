/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.$connect()

  // console.log(
  //   await prisma.course.findFirst({
  //     include: { resources: true },
  //     where: {
  //       description: 'Computer Organization & Architecture',
  //       branches: { some: { name: 'MCE' } },
  //     },
  //   })
  // )

  // await prisma.course.update({
  //   where: { id: '63066b999cbab109372b82ee' },
  //   data: {
  //     description: 'Computer Organization & Architecture',
  //   },
  // })
  console.log(
    await prisma.resource.findMany({
      where: {
        name: 'aaaaaaaaaaaaaaaaaaaa.pdf',
      },
    })
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async () => {
    await prisma.$disconnect()
    process.exit(1)
  })
