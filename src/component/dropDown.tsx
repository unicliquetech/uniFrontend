import React from 'react'

interface DropDownProps {
    texts: string[]
    style?: React.CSSProperties
}

const DropDown: React.FC<DropDownProps> = ({ texts, style }) => {
    return (
        <div className='w-full h-fit p-2 flex justify-center items-center'>
            <div>
                <input type='text' className='border-2 border-color1 rounded-lg p-1 mb-2 w-full' />
                {texts.map((text, index) => (
                    <div key={index} className='hover:bg-gray-700 p-2 rounded-lg hover'>
                        <p className='text-[15px]' style={style}>{text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DropDown
