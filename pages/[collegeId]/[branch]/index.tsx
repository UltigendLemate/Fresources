import { Branch, Course } from '@prisma/client'
import Button from 'components/utility/Button'
import GlassSearch from 'components/utility/GlassSearch'
import Layout from 'components/utility/Layout'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { prisma } from '~/prisma'
import { useSearch } from '~/utils/search'

type Props = {
  data:
    | (Branch & {
        courses: Course[]
      })
    | null
}

interface IParams extends ParsedUrlQuery {
  collegeId: string
  branch: string
}

const Abbreviate = (str: string) => {
  const number_of_spaces = str.split(' ').length - 1
  return number_of_spaces >= 2 ? str.match(/\b([A-Z])/g)!.join('') : str
}

const Index: NextPage<Props> = (props) => {
  const { asPath } = useRouter()

  const data = props.data ? props.data.courses : []
  const [courses, filterCourses] = useSearch(data, ['description'])

  const CourseBtns = courses.map((course) => {
    return (
      <Link
        href={`${asPath}/${course.description}`}
        key={course.description}
        passHref
      >
        <a>
          <Button.Glass
            value={Abbreviate(course.description)}
            css='sm:font-normal'
          />
        </a>
      </Link>
    )
  })

  return (
    <div className='overflow-x-hidden'>
      <Layout className='w-screen my-5'>
        <div className='w-full md:w-2/3 px-8 mx-auto text-white'>
          <GlassSearch filterResults={filterCourses} />
        </div>
        <h1 className='text-6xl text-center mt-8 mb-16 font-bold text-white fresources'>
          {props.data?.name}
        </h1>
        <div className='mx-auto text-center block'>
          <div className='w-[60%] mx-auto justify-center items-center text-white grid grid-cols-2 pb-5 gap-5 md:grid-cols-3'>
            {CourseBtns}
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Index

export const getStaticPaths = async () => {
  const branches = await prisma.branch.findMany({
    include: { college: true },
  })
  const paths = branches.map((branch) => {
    return {
      params: {
        collegeId: branch.college.name.toLowerCase(),
        branch: branch.name.toLowerCase(),
      },
    }
  })

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { branch, collegeId } = context.params as IParams
  const data = await prisma.branch.findFirst({
    where: {
      name: branch.toUpperCase(),
      college: { name: collegeId.toUpperCase() },
    },
    include: { courses: true },
  })

  return { props: { data } }
}
