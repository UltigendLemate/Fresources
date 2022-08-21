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
        create: [
          {
            name: 'CSIOT',
            courses: {
              create: [
                {
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
                {
                  years: { create: { year: 1 } },
                  description: 'Basics of Mechanical Engineering',
                },
              ],
            },
          },
          {
            name: 'BIOTECH',
            courses: {
              create: {
                years: { create: { year: 1 } },
                description: 'Physics for BT',
              },
            },
          },
        ],
      },
    },
  })

  await prisma.college.create({
    data: {
      name: 'DTU',
      branches: {
        create: [
          {
            name: 'BT',
            courses: {
              create: [
                {
                  years: { create: { year: 1 } },
                  description: 'Biology',
                },
              ],
            },
          },
          {
            name: 'CE',
          },
          {
            name: 'CO',
          },
          {
            name: 'EE',
          },
          {
            name: 'EC',
          },
          {
            name: 'EN',
          },
          {
            name: 'EP',
          },
          {
            name: 'IT',
          },
          {
            name: 'ME',
          },
          {
            name: 'AE',
          },
          {
            name: 'MC',
          },
          {
            name: 'PE',
          },
          {
            name: 'CH',
          },
          {
            name: 'SEs',
          },
        ],
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async () => {
    await prisma.$disconnect()
    process.exit(1)
  })
