import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const dropDatabase = async () => {
  await prisma.branch.deleteMany()
  await prisma.college.deleteMany()
  await prisma.year.deleteMany()
  await prisma.course.deleteMany()
  await prisma.resource.deleteMany()
}

const getCourse = (description: string, year = 2) => {
  return {
    years: { connect: { year } },
    description,
  }
}

const getCourses = (descriptions: string[], year = 2) => {
  return descriptions.map((description) => getCourse(description, year))
}

const createCourse = (name: string, descriptions: string[]) => {
  return { name, courses: { create: getCourses(descriptions) } }
}

async function main() {
  await prisma.$connect()

  await dropDatabase()

  await prisma.college.create({
    data: {
      name: 'IGDTUW',
    },
  })

  await prisma.college.create({
    data: {
      name: 'IIT',
    },
  })

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
                  years: { connect: { year: 1 } },
                  description: 'Basics of Mechanical Engineering',
                },
              ],
            },
          },
          {
            name: 'BIOTECH',
            courses: {
              create: {
                years: { connect: { year: 1 } },
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
                  years: {
                    connectOrCreate: {
                      create: { year: 2 },
                      where: { year: 2 },
                    },
                  },
                  description: 'Applied Mathematics',
                },
                ...getCourses([
                  'Introduction to Biotechnology',
                  'Biochemistry',
                  'Genetics',
                  'Fundamental of Computational Biology',
                  'Data Structure and Algorithm',
                  'Molecular Biology',
                  'Drug Design and Delivery',
                  'Microbiology',
                  'Advances in Computational Biology',
                ]),
              ],
            },
          },
          createCourse('CHE', [
            'Engineering Materials and Metallurgy',
            'Chemical Engineering Process Calculations',
            'Transport Phenomena',
            'Chemical Engineering Thermodynamics',
            'Engineering Design and Analysis',
            'Instrumentation and Process Control',
            'Fluid Mechanics',
            'Chemical Reaction Engineering - 1',
            'Mechanical Operations',
            'Heat Transfer',
          ]),

          createCourse('EP', [
            'Engineering Mechanics',
            'Introduction to Computing',
            'Mathematical  Physics',
            'Classical and Quantum Mechanics',
            'Digital Electronics',
            'Communication  System',
            'Condensed Matter Physics',
            'Optics',
            'Microprocessor and Interfacing',
            'Computational Methods',
          ]),

          createCourse('ME', [
            'Engineering Materials & Metallurgy',
            'Mechanics of Solids',
            'Thermal Engineering-I',
            'Machine Drawing and Solid Modelling',
            'Engineering Analysis and Design',
            'Manufacturing Machines',
            'Thermal Engineering-II',
            'Fluid Mechanics',
            'Kinematics of Machines',
            'Manufacturing Technology-I',
          ]),

          createCourse('IT', [
            'Analog  Electronics',
            'Data Structures',
            'Object Oriented Programming',
            'Discrete  Structures',
            'Digital Electronics',
            'Database Management Systems',
            'Operating System Design',
            'Computer Organization and Architecture',
            'Algorithm Design and Analycsis',
            'Engineering Analysis and Design',
          ]),
          createCourse('ENE', [
            'Building Material & Construction',
            'Strength of Materials',
            'Engineering & Environmental Surveying',
            'Environmental Chemistry & Microbiology',
            'Engineering Analysis & Design',
            'Structural Analysis',
            'Geotechnical Engineering',
            'Water Engineering: Design & Application',
            'Engineering Geology,GIS & Remote Sensing',
            'Fluid Mechanics & Hydraulic Machines',
          ]),

          createCourse('ECE', [
            'Electronic Instrumentation and Measurements',
            'Analog Electronics - I',
            'Digital Design- I',
            'Signals & Systems',
            'Engineering Analysis & Design(Network Anatysis and Synthesis)',
            'Electromagnetics',
            'Analog Electronics-II',
            'Digital Design - II',
            'Communication Systems',
            'Computer Architecture',
          ]),
          createCourse('EE', [
            'Numerical and Engineering Optimization Methods',
            'Network Analysis & Synthesis',
            'Electronic Devices and Circuits',
            'Electromechanical Energy Conversion and Transformer',
            'Electromagnetic Field Theory',
            'Power Plant Engineering',
            'Linear Integrated Circuit',
            'Digital circuits and System',
            'Control Systems',
            'Asynchronous and Synchronous Machines',
          ]),
          createCourse('COE', [
            'Analog Electronics',
            'Data Structures',
            'Object Oriented Programming',
            'Discrete Structures',
            'Engineering Analysis and Design (Modelling and Simulation)',
            'Digital Electronics',
            'Database Management Systems',
            'Operating Systems Design',
            'Computer Organization and Architecture',
            'Algorithm Design and Analysis',
          ]),
          createCourse('SE', [
            'Digital Electronics',
            'Data Structures',
            'Object Oriented Programming',
            'Operating System',
            'Engineering Analysis and Design',
            'Computer System Architecture',
            'Object Oriented Software Engineering',
            'Machine Learning',
            'Database Management Systems',
          ]),
          createCourse('PIE', [
            'Kinematic And Dynamic Of Machines',
            'Engineering Materials & Metallurgy',
            'Thermal Engineering-I',
            'Manufacturing Machines',
            'Engineering Analysis And Design(Modeling And Simulation)',
            'Machine Design',
            'Thermal Engineering-II',
            'Industrial Engineering & Operation Research',
            'Fluid Mechanics & Machinery',
            'Metal Cutting & Tool Design',
          ]),
          createCourse('MAM', [
            'Quantitative Techniques',
            'Engineering Mechanics',
            'Thermodynamics',
            'Manufacturing Machines',
            'Engineering Analysis and Design',
            'Automotive Electrical and Electronics',
            'Heat and Mass Transfer',
            'Theory of Machines',
            'Mechanics of Solids',
            'Material Engineering & Metallurgy',
          ]),
          createCourse('CE', [
            'Basic Electronics & Instrumentation',
            'Civil Engineering Basics and Applications',
            'Engineering Mechanics',
            'Fluid Mechanics',
            'Engineering Analysis And Design',
            'Environmental Engineering',
            'Mechanics of solids',
            'Engineering Survey',
            'Soil Mechanics',
            'Hydraulics & Hydraulic Machines',
          ]),
          createCourse('MCE', [
            'Discrete Mathematics',
            'Mathematics-III',
            'Probability & Statistics',
            'Engineering Analysis and Design (Differential Equations and Appications)',
            'Algorithm Design & Analysis',
            'Real Analysis',
            'Scientific Computing',
            'Computer Organization & Architecture ',
            'Linear Algebra',
            'Data Structures',
          ]),
        ],
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    await prisma.$disconnect()
    // eslint-disable-next-line no-console
    console.error(e)
    process.exit(1)
  })
