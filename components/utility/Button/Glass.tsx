import React from 'react'
import ReactTooltip from 'react-tooltip'

export type GlassPropsType = {
  value: string
  css?: string
}

const Glass: React.FC<GlassPropsType> = (
  props: GlassPropsType
): JSX.Element => {
  return (
    <div>
    <button data-tip data-for="tooltip"
      className={`w-full px-8 py-4 md:px-6 rounded-xl sm:font-bold text-2xl glass shadow-[rgba(255,255,255,0.50)] duration-300 transition border-2 border-transparent hover:border-[#f5a607] ${
        props.css && props.css
      }`} 
    >
      {props.value}
    </button>
     <ReactTooltip id="tooltip" place="top" effect="solid">
<span>This is a tooltip {props.value} </span>
    </ReactTooltip>

    </div>
  )
}

export default Glass
