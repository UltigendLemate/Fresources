import Image from 'next/image'
import { useState } from 'react'

const updates = [
  'Added notes for this subject',
  'Added Notes for this other subject',
  'Added ETE papers from 2019 for this another subject',
  'Added notes for that subject',
  'Added Notes for that other subject',
  'Added ETE papers from 2018 for that another subject',
  'Added notes for this subject',
  'Added Notes for this other subject',
  'Added ETE papers from 2019 for this another subject',
  'Added notes for that subject',
  'Added Notes for that other subject',
  'Added ETE papers from 2018 for that another subject',
]

const GlassSearch: React.FC<{ filterResults: ({}: string) => void }> = ({
  filterResults,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false)

  const [notifHover, setNotifHover] = useState(false)

  return (
    <div className='flex items-center gap-8 relative'>
      <div className='w-full block rounded-xl font-bold text-2xl search-glass shadow-[rgba(255,255,255,0.50)] z-10 relative '>
        <form>
          <label
            htmlFor='default-search'
            className='mb-2 text-sm font-medium sr-only'
          >
            Search
          </label>
          <div className='relative'>
            <div className='flex absolute inset-y-0 left-0 items-center pointer-events-none p-4 pl-6'>
              <svg
                aria-hidden='true'
                className='w-6 h-6 text-gray-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                ></path>
              </svg>
            </div>
            <input
              type='search'
              id='default-search'
              className='text-white h-16 w-full rounded-lg font-semibold text-lg md:font-bold md:text-2xl bg-transparent pl-20 pr-4 border-transparent focus:border-[#f5a607]
              border-2 focus:outline-none'
              placeholder='Search for a topic'
              onChange={(e) => filterResults(e.target.value)}
            />
          </div>
        </form>
      </div>
      <Image
        src='/static/images/notif.svg'
        alt=''
        height={35}
        width={35}
        onMouseEnter={() => setNotifHover(true)}
        onMouseLeave={() => setNotifHover(false)}
        onClick={() => setOpenDropdown(!openDropdown)}
        className={`${
          notifHover ? 'brightness-100' : 'brightness-75'
        } transition-all cursor-pointer`}
      />
      <div
        className={`bg-[#020317a4] rounded-b-lg absolute z-10 transition-all right-0 rounded-lg overflow-y-scroll top-24 divide-y-[0.5px] divide-slate-600 text-lg max-h-[300px] custom-scroll border-2 border-[#caacf489] ${
          !openDropdown && 'hidden'
        }`}
      >
        {updates.map((update, index) => {
          return (
            <div
              key={index}
              className='text-white p-4 cursor-pointer hover:bg-gray-600 transition-all'
              onClick={() => {
                setOpenDropdown(false)
              }}
            >
              {update}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GlassSearch
