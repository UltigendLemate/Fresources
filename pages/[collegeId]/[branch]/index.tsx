import { Branch, Course } from '@prisma/client'
import Button from 'components/utility/Button'
import GlassSearch from 'components/utility/GlassSearch'
import Layout from 'components/utility/Layout'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import { prisma } from '~/prisma'

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

const Index = (props: Props) => {
  const { asPath } = useRouter()
  const CourseBtns = props.data?.courses.map((course) => {
    return (
      <Link
        href={`${asPath}/${course.description}`}
        key={course.description}
        passHref
      >
        <a>
          <Button.Glass value={course.description} css='font-medium' />
        </a>
      </Link>
    )
  })
  return (
    <div className='overflow-x-hidden'>
      <Layout className='w-screen my-5'>
        <div className='w-full md:w-2/3 px-8 mx-auto text-white'>
          <GlassSearch />
        </div>
        <p className='text-4xl text-center py-8 font-bold text-white'>
          {props.data?.name}
        </p>
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

export const getStaticProps: GetStaticProps = async (context) => {
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
