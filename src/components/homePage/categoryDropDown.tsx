import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button 
          onClick={toggleDropdown}
          className="inline-flex items-center md:text-[15px] text-[14px] font-bold px-[1rem] py-[.5rem] bg-red-9000 text-white rounded-md"
        >
          Category
          <MdKeyboardArrowDown size={20} className="ml-1" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-red-900 ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="/category-products?category=fastfood" className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900" role="menuitem">Food</a>
            <a href="/category-products?category=clothes" className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900" role="menuitem">Clothes</a>
            <a href="/category-products?category=bags" className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900" role="menuitem">Bags</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;