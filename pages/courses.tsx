import Button from '../components/utility/Button'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import GlassSearch from '../components/utility/GlassSearch'
import { branch } from '../dataset'
import { year} from '../dataset'
import Link from 'next/link'
import React, { useState } from 'react'

const courses: NextPage = () => {

  //function to summon Branch named buttons
    const branchButtons = branch.map((course) => {

      //function to bring Sublist{1st, 2nd, 3rd year} on click  
      function Branchname(props) {
        const [open, setOpen] = useState(false);
   
        return(
         
         <div onClick={() => setOpen(!open)}>
        <Button.Glass value={course} key={course} className="" /> 
    {open && props.children}
   </div>
        );
     }


     

        return <>
        <div>
        
        
        
         
        <Branchname>

        <Link href="#"><button className='w-full px-8 py-4 md:py-4 md:px-6 rounded-xl font-bold text-2xl 
      glass shadow-[rgba(255,255,255,0.50)] duration-300 transition border-2 border-transparent 
      hover:border-[#f5a607] ' >1st year </button>
     
      </Link>
      <Link href="#"><button className='w-full px-8 py-4 md:py-4 md:px-6 rounded-xl font-bold text-2xl 
      glass shadow-[rgba(255,255,255,0.50)] duration-300 transition border-2 border-transparent 
      hover:border-[#f5a607] '>2nd year</button></Link>


      <Link href="#"><button className='w-full px-8 py-4 md:py-4 md:px-6 rounded-xl font-bold text-2xl 
      glass shadow-[rgba(255,255,255,0.50)] duration-300 transition border-2 border-transparent 
      hover:border-[#f5a607] '>3rd year  </button ></Link>
        
        </Branchname>
        </div>


        </>
  })
   
  


  return (
    <div className=' w-screen h-screen pt-8 flex flex-col gap-16 items-center overflow-x-hidden'>
    
    {/* <div className='w-full md:w-2/3 px-8'>
        <GlassSearch />
      </div> */}
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
      <div className='absolute top-0 h-screen w-screen overflow-hidden bg-gradient-to-b  glass-gradient -z-10'>
        <div className='ball bg-primary-red -left-20 bottom-4 opacity-30' />
        <div className='ball bg-primary-green right-8 -bottom-10 opacity-60' />
        <div className='ball bg-primary-violet right-10 top-0 opacity-30' />
      </div>

      </div>
  )
}

export default courses
