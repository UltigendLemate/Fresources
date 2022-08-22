import Footer from 'components/utility/Footer'
import Layout from 'components/utility/Layout'
import type { NextPage } from 'next'
import Link from 'next/link'
import Button from '../components/utility/Button'
import GlassSearch from '../components/utility/GlassSearch'
import { colleges } from '../dataset'

const Home: NextPage = () => {
  const collegeButtons = colleges.map((college) => {
    return (
      <Link href={`/${college.toLowerCase()}`} key={college} passHref>
        <a>
          <Button.Glass value={college} />
        </a>
      </Link>
    )
  })
  return (
    <Layout className='text-white w-screen h-screen pt-8 flex flex-col gap-16 items-center overflow-x-hidden'>
      <div className='w-full md:w-2/3 px-8'>
        <GlassSearch />
      </div>
      <div className='w-full lg:w-2/3 flex flex-col items-center gap-10 sm:gap-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div className='text-5xl md:text-8xl font-bold'>
          <h1 className='text-white fresources'>FRESOURCES</h1>
        </div>
        <div className='w-3/4 md:w-full md:p-8 grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-10 text-center'>
          {collegeButtons}
        </div>
      </div>
      <div className='absolute block bottom-4 w-screen'>
        <Footer />
      </div>
    </Layout>
  )
}

export default Home
