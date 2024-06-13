import React from 'react'

const Button = ({ text, styles }: any) => {
    return (
        <button className={`p-[10.5px] rounded-md ${styles}`} >
            {text}
        </button>
    )
}

export default Button