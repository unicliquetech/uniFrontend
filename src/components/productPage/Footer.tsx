import React from "react"
import logo from '../../images/logo.svg'
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-white text-[#590209] mt-[2rem] py-8 px-4">
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
            <li>FAQs</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="flex flex-col md:items-start">
          <h4 className="font-bold mb-2">Account</h4>
          <ul className="space-y-2">
            <li><a href="/loginVendor">Seller Login</a></li>
            <li><a href="/vendorSignup">Sign Up</a></li>
            <li><a href="/cartPage">My Orders</a></li>
          </ul>
        </div>
        <div className="flex flex-col md:items-start">
          <h4 className="font-bold mb-2">Products</h4>
          <ul className="space-y-2">
            <li>Shoes</li>
            <li>Jewelries</li>
            <li>Gadgets</li>
            <li>Fitness Products</li>
            <li>Food</li>
            <li>Clothes</li>
            <li>Books</li>
          </ul>
        </div>
        <div className="flex flex-col md:items-start">
          <h4 className="font-bold mb-2">Services</h4>
          <ul className="space-y-2">
            <li>Photography</li>
            <li>Make-up artist</li>
            <li>Fashion Designing</li>
            <li>Delivery service</li>
            <li>Laundry service</li>
          </ul>
        </div>
        <div className="flex flex-col md:items-start">
          <h4 className="font-bold mb-2">Social</h4>
          <ul className="space-y-2">
            <li>Instagram</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
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