import type { College } from '@prisma/client'
import Layout from 'components/utility/Layout'
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { prisma } from '~/prisma'
import { useSearch } from '~/utils/search'
import Button from '../components/utility/Button'
import GlassSearch from '../components/utility/GlassSearch'

interface Props {
  colleges: College[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const colleges = await prisma.college.findMany()
  return {
    props: { colleges },
  }
}

const Home: NextPage<Props> = (props) => {
  const [colleges, filterColleges] = useSearch(props.colleges, ['name'])

  const collegeButtons = colleges
    .sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
    .map((college) => {
      return (
        <Link href={`/${college.name.toLowerCase()}`} key={college.id} passHref>
          <a>
            <Button.Glass
              value={college.name}
              tooltip={false}
              titlecase={false}
            />
          </a>
        </Link>
      )
    })

  return (
    <Layout className='text-white w-screen h-screen flex flex-col gap-16 items-center overflow-x-hidden'>
      <div className='w-full md:w-4/5 lg:2/3 px-8'>
        <GlassSearch filterResults={filterColleges} />
      </div>
      <div className='w-full md:w-4/5  flex flex-col items-center gap-20 md:gap-16 sm:gap-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div className='text-5xl md:text-8xl font-bold'>
          <h1 className='text-white fresources'>FRESOURCES</h1>
        </div>
        <div className='w-3/4 md:w-full md:p-8 grid sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-10 text-center'>
          {collegeButtons}
        </div>
      </div>
    </Layout>
  )
}

export default Home
