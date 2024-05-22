import React from 'react'

interface InputPassProps {
  placeholder: string;
  style?: React.CSSProperties; 
  type: string;
}

const InputPass: React.FC<InputPassProps> = ({placeholder, type, style}) => {
  return (
    <input placeholder={placeholder} type={type} className='border-color1 cursor-pointer border-2 input2' style={style} />
  )
}

export default InputPass
