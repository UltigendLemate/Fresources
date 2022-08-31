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
            name: 'CH',
            courses: {
              create: [
                {
                  years: { create: { year: 1 } },
                  description: 'Engineering Materials and Metallurgy',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Chemical Engineering Process Calculations',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Transport Phenomena',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Chemical Engineering Thermodynamics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Engineering Design and Analysis',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Instrumentation and Process Control',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Fluid Mechanics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Chemical Reaction Engineering - 1',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Mechanical Operations',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Heat Transfer',
                },
              ],
            },
          },
          {
            name: 'BT',
            courses: {
              create: [
                {
                  years: { create: { year: 1 } },
                  description: 'Applied Mathematics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Introduction to Biotechnology',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Biochemistry',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Genetics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Fundamental of Computational Biology',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Data Structure and Algorithm',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Molecular Biology',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Drug Design and Delivery',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Microbiology',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Advances in Computational Biology',
                },
              ],
            },
          },
          {
            name: 'EP',
            courses: {
              create: [
                {
                  years: { create: { year: 1 } },
                  description: 'Engineering Mechanics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Introduction to Computing',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Mathematical  Physics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Classical and Quantum Mechanics',
                },
                {
                  years: { create: { year: 1 } },
                  description:
                    'Digital Electronics (Engineering  Analysis and  Design)',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Communication  System',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Condensed Matter Physics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Optics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Microprocessor and Interfacing',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Computational Methods',
                },
              ],
            },
          },
          {
            name: 'ME',
            courses: {
              create: [
                {
                  years: { create: { year: 1 } },
                  description: 'Engineering Materials & Metallurgy',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Mechanics of Solids',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Thermal Engineering - I',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Engineering Analysis and Design',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Manufacturing Machines',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Thermal Engineering - II',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Kinematics of Machines',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Manufacturing Technology - I',
                },
              ],
              connect: {
                description: 'Fluid Mechanics',
              },
            },
          },
          {
            name: 'IT',
            courses: {
              create: [
                {
                  years: { create: { year: 1 } },
                  description: 'Analog  Electronics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Data Structures',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Object Oriented Programming',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Discrete  Structures',
                },
                {
                  years: { create: { year: 1 } },
                  description:
                    'Engineering Analysis and Design (Modeling & Simulation)',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Digital Electronics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Database Management Systems',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Operating System Design',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Computer Organization and Architecture',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Algorithm Design and Analysis',
                },
              ],
            },
          },
          {
            name: 'ENE',
            courses: {
              create: [
                {
                  years: { create: { year: 1 } },
                  description: 'Building Material & Construction',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Strength of Materials',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Engineering & Environmental Surveying',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Environmental Chemistry & Microbiology',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Engineering Analysis & Design',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Structural Analysis',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Geotechnical Engineering',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Water Engineering: Design & Application',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Engineering Geology, GIS & Remote Sensing',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Fluid Mechanics & Hydraulic Machines',
                },
              ],
            },
          },
          {
            name: 'ECE',
            courses: {
              create: [
                {
                  years: { create: { year: 1 } },
                  description: 'Electronic Instrumentation and Measurements',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Analog Electronics - I',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Digital Design - I',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Signals & Systems',
                },
                {
                  years: { create: { year: 1 } },
                  description:
                    'Engineering Analysis & Design (Network Anatysis and Synthesis)',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Electromagnetics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Analog Electronics - II',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Digital Design - II',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Communication Systems',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Computer Architecture',
                },
              ],
              connect: {
                description: 'Communication System',
              },
            },
          },
          {
            name: 'EE',
            courses: {
              create: [
                {
                  years: { create: { year: 1 } },
                  description: 'Numerical and Engineering Optimization Methods',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Network Analysis & Synthesis',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Electronic Devices and Circuits',
                },
                {
                  years: { create: { year: 1 } },
                  description:
                    'Electromechanical Energy Conversion and Transformer',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Electromagnetic Field Theory',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Power Plant Engineering',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Linear Integrated Circuit',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Digital circuits and System',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Control Systems',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Asynchronous and Synchronous Machines',
                },
              ],
            },
          },
          {
            name: 'CO',
            courses: {
              create: [
                {
                  years: { create: { year: 1 } },
                  description: 'Analog Electronics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Data Structures',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Object Oriented Programming',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Discrete Structures',
                },
                {
                  years: { create: { year: 1 } },
                  description:
                    'Engineering Analysis and Design (Modelling and Simulation)',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Digital Electronics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Database Management Systems',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Operating Systems Design',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Computer Organization and Architecture',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Algorithm Design and Analysis',
                },
              ],
            },
          },
          {
            name: 'SE',
            courses: {
              create: [
                {
                  years: { create: { year: 1 } },
                  description: 'Digital Electronics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Data Structures',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Object Oriented Programming',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Operating System',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Engineering Analysis and Design',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Computer System Architecture',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Object Oriented Software Engineering',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Machine Learning',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Database Management Systems',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Algorithm Design & Analysis',
                },
              ],
            },
          },
          {
            name: 'PI',
            courses: {
              create: [
                {
                  years: { create: { year: 1 } },
                  description: 'Kinematic And Dynamic Of Machines',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Engineering Materials & Metallurgy',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Manufacturing Machines',
                },
                {
                  years: { create: { year: 1 } },
                  description:
                    'Engineering Analysis And Design (Modeling And Simulation)',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Machine Design',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Industrial Engineering & Operation Research',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Fluid Mechanics & Machinery',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Metal Cutting & Tool Design',
                },
              ],
              connect: [
                {
                  description: 'Thermal Engineering - I',
                },
                {
                  description: 'Thermal Engineering - II',
                },
              ],
            },
          },
          {
            name: 'MAM',
            courses: {
              create: [
                {
                  years: { create: { year: 1 } },
                  description: 'Quantitative Techniques',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Engineering Mechanics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Thermodynamics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Manufacturing Machines',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Engineering Analysis and Design',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Automotive Electrical and Electronics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Heat and Mass Transfer',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Theory of Machines',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Mechanics of Solids',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Material Engineering & Metallurgy',
                },
              ],
            },
          },
          {
            name: 'CE',
            courses: {
              create: [
                {
                  years: { create: { year: 1 } },
                  description: 'Basic Electronics & Instrumentation',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Civil Engineering Basics and Applications',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Engineering Mechanics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Engineering Analysis and Design',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Environmental Engineering',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Mechanics of solids',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Engineering Survey',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Soil Mechanics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Hydraulics & Hydraulic Machines',
                },
              ],
              connect: [
                {
                  description: 'Fluid Mechanics',
                },
                {
                  description: 'Engineering Mechanics',
                },
              ],
            },
          },
          {
            name: 'MC',
            courses: {
              create: [
                {
                  years: { create: { year: 1 } },
                  description: 'Data Structure',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Discrete Mathematics',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Mathematics - I',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Probability & Statistics',
                },
                {
                  years: { create: { year: 1 } },
                  description:
                    'Engineering Analysis and Design (Differential Equations and Appications)',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Algorithm Design & Analysis',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Real Analysis',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Scientific Computing',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Computer Organization & Architecture',
                },
                {
                  years: { create: { year: 1 } },
                  description: 'Linear Algebra',
                },
              ],
            },
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
