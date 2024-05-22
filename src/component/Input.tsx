import React from 'react'

interface InputProps {
  placeholder: string;
  style?: React.CSSProperties; 
  type: string;
}

const Input: React.FC<InputProps> = ({placeholder, type, style}) => {
  return (
    <input placeholder={placeholder} type={type} className='border-color1 input cursor-pointer' style={style} />
  )
}

export default Input
