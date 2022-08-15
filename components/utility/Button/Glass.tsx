import Link from 'next/link'
import React from 'react'

export type GlassPropsType = {
  value: string
  css?: string
  href?: string
}

const Glass: React.FC<GlassPropsType> = (
  props: GlassPropsType
): JSX.Element => {
  return (
    <Link href={props.href ? props.href:""} >
     
      <button
        className={`w-full px-8 py-4 md:py-4 md:px-6 rounded-xl font-bold text-2xl glass shadow-[rgba(255,255,255,0.50)] duration-300 transition border-2 border-transparent hover:border-[#f5a607] ${
          props.css && props.css
        }`}
      >
        {props.value}
      </button>
    </Link>
  )
}

export default Glass
