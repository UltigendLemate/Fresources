import Dropdown from 'components/utility/Dropdown'
import Layout from 'components/utility/Layout'
import { year } from 'dataset'
import { useState } from 'react'


function Branch() {
  const yearArray = year
  const [isActive, setIsActive] = useState('1st Year')

  const yearButtons = yearArray.map((year, index) => {
    return (
      <div key={index}>
        <button
          onClick={() => setIsActive(year)}
          className={`font-bold md:text-2xl text-md shadow-[rgba(255,255,255,0.50)] rounded-xl duration-300 transition border-transparent hover:border-[#f5a607] px-6 py-3 ${isActive === year ? 'glass bg-[#ffffff17]' : ''
            }`}
        >
          {year}
        </button>
      </div>
    )
  })

  // const collegeBranchButtons = DTU.map((branch, index) => {
  //   return <Button.Glass value={branch} key={index} css={'font-medium'} />
  // })

  return (
    <Layout className='w-screen'>
      <p className='text-4xl text-center py-8 font-bold text-white'>
        Year and Branch
      </p>

      <div className='mx-auto text-center hidden sm:block'>
        <div className='justify-center text-white grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-3 xl:gap-4 xl:px-20 mx-auto text-center  pb-5'>
          {yearButtons}
        </div>
      </div>

      <div className='w-full px-4 sm:hidden'>
        <Dropdown
          isActive={isActive}
          setIsActive={setIsActive}
          options={yearArray}
        />
      </div>
      <div className='w-full max-w-[1080px] px-4 justify-center mx-auto text-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 my-4'>
        {/* {collegeBranchButtons} */}
      </div>
    </Layout>
  )
}

export default Branch
