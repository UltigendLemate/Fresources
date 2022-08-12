import React from 'react'
import Glass, { GlassPropsType } from './Glass'

type ButtonComposition = {
  Glass: React.FC<GlassPropsType>
}

const Button: ButtonComposition = {
  Glass,
}

export default Button
