import React from 'react'
import Layout from 'components/utility/Layout'
import Image from 'next/image'
import { Founders } from '../dataset'
import About from '../components/utility/About'
// import About from 'components/utility/About'

const aboutUs = () => {

  const founders = Founders.map((Founder)=> {
    <div key={Founder.name} className="" >
      <Image src={`/image/${Founder.photo}`} width="30px" height="30px" alt=""/>
       <h1>{Founder.name}</h1>
       <h1></h1>
    </div>
})

  return (
    <div>
        <Layout className='text-white w-screen py-8 flex flex-col gap-10 md:gap-16 items-center overflow-x-hidden'>
      <h1>About Us </h1>
      <div className='w-1/3 md:w-full md:p-8 grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-10 text-center'>
          {founders}
        </div>
       <About/>
    
      


      </Layout>
       
    </div>
  )
}

export default aboutUs
