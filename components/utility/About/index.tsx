import Image from 'next/image'
import {Founders} from './aboutData';


const About = () => {
  return (
    <div
      className='text-white h-24 bg-transparent flex flex-col py-4 justify-around items-center gap-8 text-base md:text-xl mx-auto 
    px-auto rounded-xl font-bold border-2 border-transparent '
    >
      <div className="lg:w-1/3 sm:w-full flex "> 
      {Founders.map((Founder)=> (
        <div key={Founder.name} className="" >
          <Image src={`/image/${Founder.photo}`} width="30px" height="30px" alt=""/>

        </div>
      ))}
        {/* <div className="m-2">
          {/* <Image src="" alt="" /> */}
          {/* <h1 >Dhruv Bakshi </h1>
        </div> */}

        {/* <div className="m-2"> */}
          {/* <Image src="" alt="" /> */}
          {/* <h1>Chaitanya Anand</h1>
        </div> */}

        {/* <div className="m-2"> */}
          {/* <Image src="" alt="" /> */}
          {/* <h1>Ashish Chotani </h1>
        </div> */} 


      </div>
    </div>
  )
}

export default About
