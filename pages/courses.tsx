import Layout from 'components/utility/Layout'
import type { NextPage } from 'next'
import Button from '../components/utility/Button'
import { branch } from '../dataset'

type Props = {
  children: React.ReactNode
}

const Courses: NextPage<Props> = (props: Props) => {
  const branchButtons = branch.map((course) => {
    return <Button.Glass value={course} key={course} />
  })

  return (
    <Layout className=' w-screen h-screen pt-8 flex flex-col gap-16 items-center overflow-x-hidden'>
      <div className='w-full lg:w-2/3 flex flex-col items-center gap-10 sm:gap-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <div className='text-5xl md:text-8xl font-bold'>
          <h1 className='text-white fresources'>DTU</h1>
        </div>

        <div>
          <div className='w-3/4 md:w-full md:p-8 grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-10 text-center text-white'>
            {branchButtons}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Courses
