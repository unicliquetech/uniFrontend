import React from 'react';

interface InputTypes {
  labeltext: string;
  type: string;
  style?: React.CSSProperties;
  options?: string[]; // Add options for select input
  onClick?: () => void
}

const Form: React.FC<InputTypes> = ({ labeltext, type, style, options, onClick }) => {
  return (
    <form className='flex flex-col gap-1' onClick={onClick}>
      <label htmlFor="input" className='text-[0.4rem] text-color1 font-[700]'>{labeltext}</label>
      {type === 'textarea' ? (
        <textarea
          className="p-[2rem] border-color1 border-2"
          style={style}
        ></textarea>
      ) : (
        <input
          type={type}
          className="p-[2rem] border-color1 border-2"
          style={style}
        />
      )}
    </form>
  );
};

export default Form;
