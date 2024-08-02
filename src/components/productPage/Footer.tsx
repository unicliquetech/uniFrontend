import React from "react"
import logo from '../../images/logo.svg'
import Image from "next/image";
import { FaLinkedinIn, FaTiktok } from 'react-icons/fa';
import unifacebook from '@/images/unifacebook.svg';
import unitwitter from '@/images/unitwitter.svg';
import uniinsta from '@/images/uniinsta.svg';

const Footer = () => {
  return (
    <div className="bg-red-900 text-[#fff] mt-[2rem] py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div className="flex flex-col items-start md:items-start">
          <a href='/'><img
            src="https://res.cloudinary.com/daqlpvggg/image/upload/v1717040777/logo3_zd01wc.png"
            alt="Uniclique"
            width={50}
            height={30}
            className="mb-4"
          /></a>
          <ul className="space-y-2">
            <li>About Us</li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="https://wa.me/09159945550"></a>Contact Us</li>
          </ul>
        </div>
        <div className="flex flex-col md:items-start">
          <h4 className="font-bold mb-2">Account</h4>
          <ul className="space-y-2">
            <li><a href="/signup">Create An Account</a></li>
            <li><a href="/login">Buyer Login</a></li>
            <li><a href="/loginVendor">Vendor Login</a></li>
            <li><a href="/vendorSignup">Sign Up As A Vendor</a></li>
            <li><a href="/cartPage">My Orders</a></li>
          </ul>
        </div>
        <div className="flex flex-col md:items-start">
          <h4 className="font-bold mb-2">Products</h4>
          <ul className="space-y-2">
            <li><a href='/category-products?category=shoes'>Shoes</a></li>
            <li><a href='/category-products?category=jewelry'>Jewelries</a></li>
            <li><a href='/category-products?category=gadgets'>Gadgets</a></li>
            <li><a href='/category-products?category=sports/fitness'>Sports/Fitness Products</a></li>
            <li><a href='/category-products?category=snacks'>Food</a></li>
            <li><a href='/category-products?category=clothes'>Clothes</a></li>
            <li>Books</li>
          </ul>
        </div>
        <div className="flex flex-col md:items-start">
          <h4 className="font-bold mb-2">Services</h4>
          <ul className="space-y-2">
            <li><a href='/category-products?category=graphics'>Graphics Design</a></li>
            <li>Photography</li>
            <li>Make-up artist</li>
            <li>Fashion Designing</li>
            <li>Delivery service</li>
            <li>Laundry service</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h4 className="font-bold text-xl mb-4 text-gray-800">Connect With Us</h4>
          <ul className="space-y-4">
            <li>
              <a href='https://www.instagram.com/uniclique_shop?igsh=YTQwZjQ0NmI0OA=='
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 group hover:bg-gray-100 p-2 rounded-md transition duration-300">
                <Image src={uniinsta} alt="Instagram" width={24} height={24} className='group-hover:scale-110 transition duration-300' />
                <span className="text-gray-700 group-hover:text-gray-900">Instagram</span>
              </a>
            </li>
            <li>
              <a href='https://x.com/unicliquetech?t=lrPLRtOUT5iW3k1-bSIqkQ&s=09'
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 group hover:bg-gray-100 p-2 rounded-md transition duration-300">
                <Image src={unitwitter} alt="Twitter" width={24} height={24} className='group-hover:scale-110 transition duration-300' />
                <span className="text-gray-700 group-hover:text-gray-900">Twitter</span>
              </a>
            </li>
            <li>
              <a href='https://www.linkedin.com/company/uniclique/'
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 group hover:bg-gray-100 p-2 rounded-md transition duration-300">
                <FaLinkedinIn className="text-blue-600 text-xl group-hover:scale-110 transition duration-300" />
                <span className="text-gray-700 group-hover:text-gray-900">LinkedIn</span>
              </a>
            </li>
            <li>
              <a href='https://vm.tiktok.com/ZMraBJv41/'
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3 group hover:bg-gray-100 p-2 rounded-md transition duration-300">
                <FaTiktok className="text-black text-xl group-hover:scale-110 transition duration-300" />
                <span className="text-gray-700 group-hover:text-gray-900">TikTok</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center">
        &copy; 2024, All Rights Reserved Uniclique
      </div>
    </div>
  );
};

export default Footer;