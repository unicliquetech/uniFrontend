import React from 'react'

const Button = ({ text, styles }: any) => {
    return (
        <button className={`p-[8px] rounded-md ${styles}`} >
            {text}
        </button>
    )
}

export default Button