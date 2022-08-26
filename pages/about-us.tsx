import React from 'react'
import Layout from 'components/utility/Layout'
import Image from 'next/image'
import { Founders } from '../dataset'
import { Developers } from '../dataset'
import { TeamLeaders } from '../dataset'
// import { Members } from '../dataset'
// import About from '../components/utility/About'
// import About from 'components/utility/About'

const aboutus = () => {
  const founders = Founders.map((Founder) => {
    return (
      <div
        key={Founder.name}
        className='glass shadow-[rgba(255,255,255,0.50)] rounded-xl w-72 h-96 p-3 align-center justify-center'
      >
        <img className="align-center" src={Founder.photo} alt='' />
        <h1 className='text-3xl tracking-wide  '>{Founder.name}</h1>
        <p className='text-center'>{Founder.description}</p>
      </div>
    )
  })

  const developers = Developers.map((Developer) => {
    return (
      <div
        key={Developer.name}
        className='glass shadow-[rgba(255,255,255,0.50)] rounded-xl w-56 h-75 p-3'
      >
        <Image
          src={`/image/${Developer.photo}`}
          width='30px'
          height='30px'
          alt=''
        />
        <h1 className='text-3xl tracking-wide  '>{Developer.name}</h1>
      </div>
    )
  })

  const teamLeaders = TeamLeaders.map((TeamLeader) => {
    return (
      <div
        key={TeamLeader.name}
        className='grid-cols-5 glass shadow-[rgba(255,255,255,0.50)] rounded-xl  h-75 p-3'
      >
        <Image
          src={`/image/${TeamLeader.photo}`}
          width='30px'
          height='30px'
          alt=''
        />
        <h1 className='text-3xl tracking-wide  '>{TeamLeader.name}</h1>
      </div>
    )
  })

  return (
    <div>
      <Layout className='text-white w-screen py-8 flex flex-col gap-10 md:gap-16 items-center overflow-x-hidden'>
        <h1 className='fresources text-5xl text-wide font-semibold'>
          About Us
        </h1>

        <h1 className='fresources text-4xl text-wide '>Leaders</h1>
        <div className='flex w-1/3 md:w-full md:p-8 gap-4 md:gap-10 text-center px-auto justify-center align-center '>
          {founders}
        </div>

        <h1 className='fresources text-4xl text-wide '>Developers </h1>
        <div className='flex w-1/4 md:w-full md:p-8 gap-4 md:gap-10 text-center px-auto justify-center align-center '>
          {developers}
        </div>

        <h1 className='fresources text-4xl text-wide '>Team Leaders</h1>
        <div className='grid justify-center grid-cols-5 w-1/4 md:w-full md:p-8 gap-4 md:gap-10 text-center px-auto'>
          {teamLeaders}
        </div>
      </Layout>
    </div>
  )
}

export default aboutus
