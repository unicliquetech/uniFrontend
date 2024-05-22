import React from 'react'

interface ButtonProps {
    text: string;
    style?: React.CSSProperties;
    onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ text, style, onClick }) => {
    return (
        <button className='p-2 bg-color1 ' style={style} onClick={onClick}>{text}</button>
    )
}

export default Button
