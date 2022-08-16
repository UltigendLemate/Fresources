import Link from 'next/link'
import React, { useState } from 'react'
import Dropdown from './Dropdown'

export type GlassPropsType = {
  value: string
  css?: string
  href?: string
}

const Glass: React.FC<GlassPropsType> = (
  props: GlassPropsType
): JSX.Element => {
  const [showDropdown, setShowDropdown] = useState(false)

  const styles = {
    dropdownTrue: `w-full px-8 py-4 md:py-4 md:px-6 rounded-xl font-bold text-2xl glass shadow-[rgba(255,255,255,0.50)] duration-300 transition border-2 border-transparent hover:border-[#f5a607] relative opacity-50`,
    dropdownFalse: `w-full px-8 py-4 md:py-4 md:px-6 rounded-xl font-bold text-2xl glass shadow-[rgba(255,255,255,0.50)] duration-300 transition border-2 border-transparent hover:border-[#f5a607] relative`,
  }

  const showDropdownHandler = (): void => {
    setShowDropdown(!showDropdown)
  }

  return (
    <Link href={props.href ? props.href : ''}>
      <button
        className={showDropdown ? styles.dropdownTrue : styles.dropdownFalse}
        onClick={showDropdownHandler}
      >
        {props.value}
        {showDropdown && <Dropdown />}
      </button>
    </Link>
  )
}

export default Glass
