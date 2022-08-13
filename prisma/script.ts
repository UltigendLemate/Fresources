import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const dropDatabase = async () => {
  await prisma.branch.deleteMany()
  await prisma.college.deleteMany()
  await prisma.year.deleteMany()
  await prisma.course.deleteMany()
  await prisma.resource.deleteMany()
}

async function main() {
  await prisma.$connect()

  await dropDatabase()

  await prisma.college.create({
    data: {
      name: 'NSUT',
      branches: {
        create: {
          name: 'CSIOT',
          courses: {
            create: {
              years: { create: { year: 1 } },
              description: 'Physics',
              resources: {
                create: {
                  name: 'David J Morrin Waves',
                  type: 'Book',
                  url: 'https://www.prisma.io',
                },
              },
            },
          },
        },
      },
    },
  })

  const allCollages = prisma.college.findMany()
  console.log(allCollages)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
