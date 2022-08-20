import { Branch, Course } from '@prisma/client'
import Button from 'components/utility/Button'
import GlassSearch from 'components/utility/GlassSearch'
import Layout from 'components/utility/Layout'
import { prisma } from '~/prisma'

type Props = {
  data:
    | (Branch & {
        courses: Course[]
      })
    | null
}

const Abbreviate = (str: string) => {
  const number_of_spaces = str.split(' ').length - 1
  return number_of_spaces >= 2 ? str.match(/\b([A-Z])/g)!.join('') : str
}

const Temp = (props: Props) => {
  const CourseBtns = props.data?.courses.map((course) => {
    return (
      <div key={course.description}>
        <Button.Glass
          value={Abbreviate(course.description)}
          css='font-medium'
        />
      </div>
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

export default Temp

export const getStaticProps = async () => {
  const data = await prisma.branch.findFirst({
    where: { name: 'CSIOT', college: { name: 'NSUT' } },
    include: { courses: true },
  })

  return { props: { data } }
}
