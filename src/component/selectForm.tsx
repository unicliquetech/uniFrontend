import React from 'react';

interface InputTypes {
    labeltext: string;
    type: string;
    style?: React.CSSProperties;
    options?: string[]; // Add options for select input
    onClick?: () => void
}

const SelectForm: React.FC<InputTypes> = ({ labeltext, type, style, options, onClick }) => {
    return (
        <form className='flex flex-col gap-1' onClick={onClick}>
            <label htmlFor="input" className='text-[0.4rem] text-color1 font-[700]'>{labeltext}</label>
            <select className='py-2 border-2 border-color1 rounded-lg focus:outline-none focus:ring-2 focus:ring-color1 bg-white'>
                <option value="" disabled selected>Select an option</option>
                {options?.map((option, index) => (
                    <option key={index} value={option} className='bg-white text-color1 hover:bg-color1 hover:text-white'>
                        {option}
                    </option>
                ))}
            </select>
        </form>
    );
};

export default SelectForm;
