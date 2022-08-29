import React, { useState } from 'react'
import ReactTooltip from 'react-tooltip'

export type GlassPropsType = {
  value: string
  css?: string
  tooltip?: boolean
}

export const toTitleCase = (str: string, titlecase: Boolean) => {
  return titlecase
    ? str.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())
    : str
}

const Glass: React.FC<GlassPropsType> = ({
  value,
  css,
  tooltip = true,
}: GlassPropsType): JSX.Element => {
  const [isHover, setIsHover] = useState(false)

  return (
    <div>
      <button
        data-tip
        data-for={value}
        className={`w-full px-8 py-4 md:px-6 truncate rounded-xl sm:font-bold text-2xl glass shadow-[rgba(255,255,255,0.50)] duration-300 transition border-2 border-transparent hover:border-[#f5a607] ${
          css && css
        }`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {Abbreviate(value)}
      </button>
      <div className={`${(!isHover || !tooltip) && 'hidden'} bg-[#000000a3]`}>
        <ReactTooltip id={value} place='top' effect='solid'>
          <span className='text-xl'>{value} </span>
        </ReactTooltip>
      </div>
    </div>
  )
}

export default Glass
