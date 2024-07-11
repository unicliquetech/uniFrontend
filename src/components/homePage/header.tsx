"use client";
import React, { useState } from 'react';
import Logo from "@/images/logo.svg";
import profile from '@/images/profile.svg.svg';
import saved from '@/images/saved.svg.svg';
import cart from '@/images/cart.svg.svg';
import Image from "next/image";
import { MdKeyboardArrowDown, MdMenu, MdClose } from "react-icons/md";

const Header = () => {
    const [navbarOpen, setNavbarOpen] = useState(false);

    const handleOpen = () => {
        setNavbarOpen(!navbarOpen);
    };

    return (
        <main className="flex justify-center items-center flex-col mx-auto">
            <section className="w-full bg-[#590209] h-[76px] flex justify-center items-center sm:px-10 px-5">
                <div className="max-w-7xl w-full flex items-center justify-between">
                    <p className="text-[#F29F05] poppins-semibold md:text-[12px] text-[10px] cursor-pointer hover:text-[#fff]">
                        Eng
                    </p>
                    <div className="flex columnGap justify-between">
                        <p className="text-[#fff] poppins-semibold md:text-[12px] text-[10px] cursor-pointer hover:text-[#F29F05]">
                            Discounts
                        </p>
                        <p className="text-[#fff] poppins-semibold md:text-[12px] text-[10px] cursor-pointer hover:text-[#F29F05]">
                            Delivery
                        </p>
                        <p className="text-[#fff] poppins-semibold md:text-[12px] text-[10px] cursor-pointer hover:text-[#F29F05]">
                            About us
                        </p>
                        <p className="text-[#fff] poppins-semibold md:text-[12px] text-[10px] cursor-pointer hover:text-[#F29F05]">
                            Support
                        </p>
                    </div>
                </div>
            </section>

            <div className={`w-full mt-[.7rem] transitionStyle bg-[#fff] left-0 right-0 ease-in-out duration-300 p-3 h-[100px] sm:px-8  flex flex-col items-center`}>
                <div className="max-w-7xl w-full flex items-center justify-between lg:px-12 px-2">
                    <Image src={Logo} alt="Uniclique logo" className="cursor-pointer" />

                    <div className="justify-between items-center bg-[#FBF5EF] rounded-lg p-3 columnGap2 hidden md:flex">
                        <p className="text-[#590209] poppins-semibold text-[18px] cursor-pointer hover:text-[#590209]">
                            Home
                        </p>
                        <div className="flex items-center cursor-pointer ml-3">
                            <a href='/product' className="text-[#0D0D0D] poppins-regular text-[18px] hover:text-[#590209]">
                                Products
                            </a>
                            {/* <MdKeyboardArrowDown size={20} color="#0D0D0D" className="ml-1" /> */}
                        </div>
                        <div className="flex items-center cursor-pointer ml-3">
                            <a href='product' className="text-[#0D0D0D] poppins-regular text-[18px] hover:text-[#590209]">
                                Services
                            </a>
                            {/* <MdKeyboardArrowDown size={20} color="#0D0D0D" className="ml-1" /> */}
                        </div>
                        <p className="text-[#0D0D0D] poppins-regular text-[18px] cursor-pointer hover:text-[#590209] ml-3">
                            Pricing
                        </p>
                    </div>

                    <div className="justify-center gap-5 md:flex hidden items-center">
                        <div className="flex justify-center gap-2">
                            <Image src={profile} alt="" width={15} height={15} />
                            <p className="md:text-[18px] text-[16px] text-bold">Profile</p>
                        </div>
                        <div className="flex justify-center gap-2">
                            <Image src={saved} alt="" width={15} height={15} />
                            <p className="md:text-[18px] text-[16px] text-bold">Saved</p>
                        </div>
                        <div className="flex justify-center gap-2">
                            <Image src={cart} alt="" width={15} height={15} />
                            <a href='/cartPage' className="md:text-[18px] text-[16px] text-bold">Cart</a>
                        </div>
                    </div>

                    <MdMenu size={35} color="#0D0D0D" className="ml-1 cursor-pointer md:hidden block" onClick={handleOpen} />
                </div>
            </div>

            <div className={`hamburger-menu fixed top-0 right-0 h-full w-full z-40 bg-white transform transition-transform ease-in-out duration-300 justify-center ${navbarOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="close-button p-4 cursor-pointer absolute top-0 right-0">
                    <MdClose size={100} color="white" className="p-2 rounded-full w-10 bg-[#590209] h-10 flex items-center justify-center" onClick={handleOpen} />
                </div>
                <div className="menu flex flex-col gap-[20px] items-center justify-center p-6 h-[100vh] ">
                    <ul className="text-[20px] text-start mt-10">
                        <a href="/">
                            <li className="text-main-color-gray cursor-pointer hover:scale-105 mt-10">Home</li>
                        </a>
                        <a href="/product">
                            <li className="text-main-color-gray cursor-pointer hover:scale-105 mt-10">Products & Services </li>
                        </a>
                        <a href="/cartPage">
                            <li className="text-main-color-gray cursor-pointer hover:scale-105 mt-10">Cart</li>
                        </a>
                        <a href="#portfolio">
                            <li className="text-main-color-gray cursor-pointer hover:scale-105 mt-10">Gallery</li>
                        </a>
                        <a href="#contact">
                            <li className="text-main-color-gray cursor-pointer hover:scale-105 mt-10">Contact Us</li>
                        </a>
                    </ul>
                </div>
            </div>
        </main>
    );
};

export default Header;
