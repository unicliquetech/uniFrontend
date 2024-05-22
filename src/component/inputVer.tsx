"use client"
import React, { useState, useRef, useEffect, forwardRef } from 'react';

interface InputVerProps {   
    onInputFilled?: (value: string) => void;
}

const InputVer: React.ForwardRefRenderFunction<HTMLInputElement, InputVerProps> = ({ onInputFilled }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false); 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^0-9]/g, ''); 
    if (newValue.length > 1) {
      return; 
    }
    setValue(newValue);

    if (newValue.length === 1 && onInputFilled) {
      onInputFilled(newValue); 
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    // Focus the input whenever focusedIndex changes
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(inputRef.current);
      } else {
        ref.current = inputRef.current;
      }
    }
  }, [ref]);


  return (
    <input
      ref={inputRef}
      type="text"
      maxLength={1}
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`inputVer rounded-lg border-2 border-color1 text-center ${
        value ? 'bg-color1 text-white' : ''
      }`}
    />
  );
};

export default forwardRef(InputVer);

