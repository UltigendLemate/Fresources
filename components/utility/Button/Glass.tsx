import React, { useEffect, useState } from 'react'
import ReactTooltip from 'react-tooltip'

export type GlassPropsType = {
  value: string
  css?: string
  tooltip?: Boolean
  titlecase?: Boolean
}

export const toTitleCase = (str: string, titlecase: Boolean) => {
  return titlecase
    ? str.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())
    : str
}

export const Abbreviate = (str: string, titlecase: Boolean) => {
  return str.length > 16
    ? str.match(/[A-Z0-9_.-]/g)?.join('')
    : toTitleCase(str, titlecase)
}

const Glass: React.FC<GlassPropsType> = ({
  value,
  css,
  tooltip = true,
  titlecase = true,
}: GlassPropsType): JSX.Element => {



  const [isHover, setIsHover] = useState(false)
  const [toolShow, setToolShow] = useState(true)
  const tool = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth > 640) {
        setToolShow(true)
      } else {
        setToolShow(false)
      }
    }
  }
  useEffect(() => {
    tool()
  }, [])

  return (
    <div>
      <button
        data-tip
        data-for={value}
        className={`w-full px-8 py-4 md:px-6 rounded-xl sm:font-bold text-2xl glass shadow-[rgba(255,255,255,0.50)] duration-300 transition border-2 border-transparent hover:border-[#f5a607] ${css && css
          }`}
        onMouseEnter={() => setIsHover(toolShow)}
        onMouseLeave={() => setIsHover(false)}
      >
        {titlecase ? Abbreviate(value, titlecase) : value}
      </button>
      <div
        className={`${(!isHover ||
          !tooltip ||
          toTitleCase(value, titlecase) === Abbreviate(value, titlecase)) &&
          'hidden'
          } bg-[#000000a3]`}
      >
        <ReactTooltip
          id={value}
          place='top'
          effect='solid'
          className='invisible md:visible'
        >
          <span className='text-xl'>{toTitleCase(value, titlecase)}</span>
        </ReactTooltip>
      </div>
    </div >
  )
}

export default Glass
