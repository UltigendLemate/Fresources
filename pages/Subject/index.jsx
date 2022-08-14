import { useState } from 'react'
import { topicsJSON } from '../../dataset'
// import './styles.css';

function Subject(props) {
  const [isActive, setIsActive] = useState('Notes')

  const buttons = Object.keys(topicsJSON).map((subject, index) => {
    return (
      <>
        <button
          onClick={() => setIsActive(subject)}
          className='w-[90%] md:[80%] px-3 py-2 my-1  md:my-2  mx-auto md:py-4 md:px-6 lg:px-8   rounded-xl font-bold md:text-xl lg:text-2xl text-md 
                glass shadow-[rgba(255,255,255,0.50)]
                 duration-300 transition border-2 border-transparent hover:border-[#f5a607]
                 '
        >
          {subject}
        </button>
        {/* <div onClick={() => setIsActive(subject)} >
                    <Button.Glass key={subject} value={subject} />
                </div> */}
      </>
    )
  })

  return (
    <>
      <div
        style={{
          width: props.shift,
          marginLeft: props.margin,
          transition: 'all 0.5s ease',
        }}
        className='min-h-screen max-h-auto items-center'
      >
        <div className='mx-auto text-center pt-4 mb-2 sm:pt-[2%] md:pt-[3%] sm:mb-5 '>
          <p className='text-4xl pb-3 md:pb-7 font-bold text-white'>Subject</p>
          <div className='flex justify-center text-white grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-6 2xl:max-w-[90%] mx-auto text-center md:max-w-screen-md'>
            {buttons}
          </div>
        </div>
        <div className='h-[62vh] mt-[3vh] md:max-h-[60vh] 2xl:max-h-[80vh] overflow-y-scroll  w-[90%] md:max-w-screen-sm justify-center mx-auto shadow-2xl'>
          {topicsJSON[isActive].map((note, index) => {
            return (
              <div
                className='py-3 my-3 lg:py-5 rounded-lg w-[90%] hover:glass-gradient border-transparent text-white border-2 
                                drop-shadow-lg mx-auto md:max-w-screen-sm text-center text-md md:text-lg lg:text-2xl  glass shadow-2xl
                                bg-babla hover:border-[#f5a607] cursor-pointer '
                key={note}
              >
                {note}
                {/* <button className=' self-center ml-2 '><svg width="24" height="24"  ><path d="M12 4 3 15h6v5h6v-5h6z" className="icon_svg-stroke icon_svg-fill" stroke-width="1.5" stroke="#666" fill="none" stroke-linejoin="round"></path></svg></button> */}
              </div>
            )
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
