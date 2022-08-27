import React from 'react'
import Layout from 'components/utility/Layout'
import Image from 'next/image'
import { Members } from '../dataset'

const contributors = () => {
  const memberList = Members.map((member) => {
    return (
      <div
        key={member.name}
        className='grid-cols-5 glass shadow-[rgba(255,255,255,0.50)] rounded-xl  h-75 p-3'
      >
        <Image src={`${member.photo}`} width='30' height='30' alt='' />
        <h1 className='text-xl '>{member.name}</h1>
      </div>
    )
  })

  return (
    <div>
      <Layout className='text-white py-8 flex flex-col gap-10 md:gap-16 items-center overflow-x-hidden'>
        <h1 className='fresources text-5xl text-wide font-semibold'>
          Contributors{' '}
        </h1>

        <h1 className='text-xl text-wide text-center justify-center mx-6'>
          With immense support of our whole team, Fresources has been able to
          deliver you Quality content on-time, on-demand.
        </h1>
        <div className='grid grid-cols-6 md:w-full md:p-8 gap-4 md:gap-10 text-center px-auto justify-center align-center '>
          {memberList}
        </div>
      </Layout>
    </div>
  )
}

export default contributors
