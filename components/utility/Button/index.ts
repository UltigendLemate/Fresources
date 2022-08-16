import React from 'react'
import Dropdown from './Dropdown'
import Glass, { GlassPropsType } from './Glass'

type ButtonComposition = {
  Glass: React.FC<GlassPropsType>
  Dropdown: React.FC<any>
}

const Button: ButtonComposition = {
  Glass,
  Dropdown,
}

export default Button
