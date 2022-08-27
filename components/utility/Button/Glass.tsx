import React, { useState } from 'react'
import ReactTooltip from 'react-tooltip'

export type GlassPropsType = {
  value: string
  css?: string
}

const Abbreviate = (str: string) => {
  const number_of_spaces = str.split(' ').length - 1
  return number_of_spaces >= 2 ? str.match(/\b([A-Z])/g)!.join('') : str
}

const Glass: React.FC<GlassPropsType> = (
  props: GlassPropsType
): JSX.Element => {
  const [isHover, setIsHover] = useState(false)

  return (
    <div>
      <button
        data-tip
        data-for={props.value}
        className={`w-full px-8 py-4 md:px-6 truncate rounded-xl sm:font-bold text-2xl glass shadow-[rgba(255,255,255,0.50)] duration-300 transition border-2 border-transparent hover:border-[#f5a607] ${
          props.css && props.css
        }`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {Abbreviate(props.value)}
      </button>
      <div className={`${!isHover && 'hidden'} bg-[#000000a3]`}>
        <ReactTooltip id={props.value} place='top' effect='solid'>
          <span className='text-2xl tracking-wide'>{props.value} </span>
        </ReactTooltip>
      </div>
    </div>
  )
}

export default Glass
