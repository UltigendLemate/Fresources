/* eslint-disable @next/next/no-img-element */
import Dropdown from 'components/utility/Dropdown'
import Layout from 'components/utility/Layout'
import { useState } from 'react'
import Button from '../../components/utility/Button'
import { topicsJSON } from '../../dataset'
// import './styles.css';

function Subject() {
  const [isActive, setIsActive] = useState('Notes')

  const buttons = Object.keys(topicsJSON).map((subject, index) => {
    return (
      <div key={index}>
        <button
          onClick={() => setIsActive(subject)}
          className={`font-bold md:text-2xl text-md shadow-[rgba(255,255,255,0.50)] rounded-xl duration-300 transition border-transparent hover:border-[#f5a607] px-6 py-3 ${
            isActive === subject ? 'glass bg-[#ffffff17]' : ''
          }`}
        >
          {subject}
        </button>
      </div>
    )
  })
  return (
    <Layout className='w-screen'>
      <p className='text-4xl text-center py-8 font-bold text-white'>Subject</p>

      <div className='mx-auto text-center hidden sm:block'>
        <div className='justify-center text-white grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 mx-auto text-center max-w-[1480px] pb-5'>
          {buttons}
        </div>
      </div>

      <div className='w-full px-4 sm:hidden'>
        <Dropdown
          isActive={isActive}
          setIsActive={setIsActive}
          options={Object.keys(topicsJSON)}
        />
      </div>
      <div className='w-full max-w-[1080px] px-4 justify-center mx-auto text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 my-4'>
        {topicsJSON[isActive].map((note, index) => {
          return <Button.Glass value={note} key={index} css={'font-medium'} />
        })}
      </div>
    </Layout>
  )
}

export default Subject
