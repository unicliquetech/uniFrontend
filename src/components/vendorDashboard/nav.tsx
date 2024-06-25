import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { MdSearch, MdMessage, MdDoorbell, MdMenu } from "react-icons/md";
import logo from '@/images/logo.svg';
import ava from '@/images/avatar.svg';
import bell from '@/images/bell (1).svg';
import message from '@/images/Vector (40).svg';
import Aside from '@/components/vendorDashboard/Aside';

interface NavProps {
    toggleMobileVisibility: () => void;
}

interface VendorProfile {
        businessName: string;
        email: string;
    // Add other properties as needed
}

const Nav: React.FC<NavProps> = ({ toggleMobileVisibility }) => {
    const [isAsideOpen, setIsAsideOpen] = useState(false);
    const [vendor, setVendor] = useState({ businessName: '', email: '' });

    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const vendorEmail = localStorage.getItem('vendorEmail');
                if (vendorEmail) {
                    const response = await fetch(`https://unibackend.onrender.com/api/v1/vendorProfile`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ vendorEmail }),
                    });
                    const data = await response.json();
                    console.log('vendor data:', data.vendor.businessName);
                    setVendor(data.vendor);
                }
            } catch (error) {
                console.error('Error fetching vendor data:', error);
            }
        };

        fetchVendorData();
    }, []);

    return (
        <div className="relative">
            <section className='flex justify-between items-center w-full px-4 py-2 bg-white shadow-xl'>
                <div className='flex items-center'>
                    <MdMenu size={24} onClick={toggleMobileVisibility} className="cursor-pointer" />
                </div>
                <div className='flex flex-col justify-start gap-1 lg:flex'>
                    <p className='md:text-[17px] text-[15px] font-bold'>Dashboard</p>
                    <p className='md:text-[12.5px] text-[12px]'>11 May 2024, Saturday</p>
                </div>
                <div className='max-w-3xl w-full lg:w-fit border-2 border-[#8B8A8] rounded-md justify-start gap-[5rem] flex p-2 mt-2 lg:mt-0 hidden lg:flex'>
                    <input type='text' className='focus:outline-none bg-[#8B8A8] placeholder:text-[13px] w-full' placeholder='search orders' />
                    <MdSearch size={22} color='#3E3E3E' />
                </div>
                <div className='flex justify-center items-center gap-3'>
                    <div className='flex items-center gap-4'>
                        <div className='relative'>
                            <Image src={message} alt='' width={20} height={20} />
                            <p className='h-3 w-3 right-[-50%] text-[12px] text-center flex items-center justify-center rounded-full bg-color1 text-white absolute top-[-10%]'>3</p>
                        </div>
                        <div className='relative'>
                            <Image src={bell} alt='' width={20} height={20} />
                            <p className='h-3 w-3 right-[-40%] text-[12px] text-center flex items-center justify-center rounded-full bg-color1 text-white absolute top-0'>2</p>
                        </div>
                    </div>
                    <p className='md:text-[15px] text-[14px] ml-3 mr-2 hidden lg:block'>Need Help?</p>
                    <p className='h-5 hidden lg:block'>|</p>
                    <div className='flex justify-center gap-2 items-center'>
                        <Image src={logo} alt='' width={40} height={40} />
                            <div className='flex flex-col hidden lg:flex mt-4'>
                            <h1 className='text-[12px] text-red-900'>{vendor?.businessName || ''}</h1>
                            <h2 className='md:text-[13px] text-[12px]'>{vendor?.email?.split('@')[0] || ''}</h2>
                            </div>
                    </div>
                </div>
            </section>
            {/* {isAsideOpen && (
        <div className="fixed bg-red-900 text-white top-0 left-0 h-screen w-[75vw]">
          <Aside />
        </div>
      )} */}
        </div>
    );
};

export default Nav;