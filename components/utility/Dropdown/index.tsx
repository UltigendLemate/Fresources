/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'

type Props<T extends string> = {
  isActive: T
  setIsActive: React.Dispatch<React.SetStateAction<T>>
  options: T[]
}

const Dropdown = <T extends string>(props: Props<T>) => {
  const [openDropdown, setOpenDropdown] = useState(false)
  return (
    <div className='relative'>
      <div
        className={`search-glass flex items-center justify-between transition-all text-white p-4 text-xl ${
          openDropdown ? 'rounded-t-lg' : 'rounded-lg'
        }`}
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <div>{props.isActive}</div>
        <img
          src='/down-arrow.png'
          alt='down-arrow'
          className={`h-[10px] transition-all ${openDropdown && 'rotate-180'}`}
        />
      </div>
      <div
        className={`bg-[#020317a4] rounded-b-lg absolute z-10 w-full transition-all ${
          !openDropdown && 'hidden'
        }`}
      >
        {props.options.map((subject, index) => {
          return (
            <div
              key={index}
              className='text-white p-4 text-xl cursor-pointer hover:bg-gray-600 transition-all'
              onClick={() => {
                props.setIsActive(subject)
                setOpenDropdown(false)
              }}
            >
              {subject}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Dropdown
