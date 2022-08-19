/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'

type Props = {
  isActive: string
  setIsActive: React.Dispatch<React.SetStateAction<string>>
  options: string[]
}

const Dropdown = (props: Props) => {
  const [openDropdown, setOpenDropdown] = useState(false)
  return (
    <div>
      <div
        className={`search-glass flex items-center justify-between text-white p-4 text-xl ${
          openDropdown ? 'rounded-t-lg' : 'rounded-lg'
        }`}
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <div>{props.isActive}</div>
        <img src='/down-arrow.png' alt='down-arrow' className='h-[10px]' />
      </div>
      <div
        className={`bg-[#ffffff11] rounded-b-lg ${!openDropdown && 'hidden'}`}
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
