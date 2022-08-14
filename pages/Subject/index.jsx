import { useState } from 'react'
import Button from '../../components/utility/Button'
import { topicsJSON } from '../../dataset'
// import './styles.css';

function Subject() {
  const [isActive, setIsActive] = useState('Notes')

  const buttons = Object.keys(topicsJSON).map((subject, index) => {
    return (
      <>
        <button
          onClick={() => setIsActive(subject)}
          className={`w-[90%] md:[80%] px-3 py-2 my-1 md:my-2 mx-auto md:py-4 md:px-6 lg:px-8 font-bold md:text-xl lg:text-2xl text-md shadow-[rgba(255,255,255,0.50)] rounded-xl duration-300 transition border-transparent hover:border-[#f5a607] ${
            isActive === subject ? 'glass bg-[#ffffff17]' : ''
          }`}
        >
          {subject}
        </button>
      </>
    )
  })

  return (
    <>
      <div className='w-screen'>
        <div className='mx-auto text-center pt-4 mb-2 sm:pt-[2%] md:pt-[3%] sm:mb-5 '>
          <p className='text-4xl pb-3 md:pb-7 font-bold text-white'>Subject</p>
          <div className='justify-center text-white grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-6 2xl:max-w-[90%] mx-auto text-center md:max-w-screen-md'>
            {buttons}
          </div>
        </div>
        <div className='w-3/5 justify-center mx-auto text-white grid grid-cols-3 gap-5'>
          {topicsJSON[isActive].map((note, index) => {
            return <Button.Glass value={note} key={index} />
          })}
        </div>
      </div>
      <div className='absolute top-0 h-screen w-screen overflow-hidden bg-gradient-to-b  glass-gradient -z-10'>
        <div className='ball bg-primary-red -left-20 bottom-4 opacity-30' />
        <div className='ball bg-primary-green right-8 -bottom-10 opacity-60' />
        <div className='ball bg-primary-violet right-10 top-0 opacity-30' />
      </div>
    </>
  )
}

export default Subject
