import type { College } from '@prisma/client'
import Layout from 'components/utility/Layout'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
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
  // absolute top-16
  return (
    <>
      <Head>
        <title>Fresources</title>
      </Head>
      <Layout className='text-white w-full py-8 flex flex-col gap-10 md:gap-16 items-center overflow-x-hidden'>
        <div className='w-full md:w-4/5 px-8 '>
          <GlassSearch filterResults={filterColleges} />
        </div>
        <div className='text-5xl md:text-8xl font-bold  text-center mt-8 mb-8  text-white fresources'>
          <h1 className='text-white fresources'>FRESOURCES</h1>
        </div>
        {/* <div className='w-full md:w-4/5 flex mt-8 flex-col items-center gap-20 md:gap-16 sm:gap-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'> */}
        <div className='w-full md:w-4/5 lg:2/3 px-4 sm:px-8  justify-center items-center text-white grid grid-cols-1 pb-5 gap-5 md:grid-cols-2 xl:grid-cols-4 mt-5'>
          {collegeButtons}
        </div>
        {/* </div> */}
      </Layout>
    </>
  )
}

export default Home
