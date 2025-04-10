"use client";
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Chart from '@/components/vendorDashboard/chart'
import Nav from '@/components/vendorDashboard/nav';
import Aside from '@/components/vendorDashboard/Aside';
import Button from './Button';
import all from '@/images/Shopping Cart.svg';
import pending from '@/images/Sand Watch.svg';
import completed from '@/images/Task Completed.svg';
import newOrder from '@/images/New.svg';
import { MdCancel, MdOutlineChevronRight, MdOutlineChevronLeft } from "react-icons/md";
import Image from 'next/image';
import cancel from '@/images/bx-x-circle.svg'
import total from '@/images/productT.svg'
import cat from '@/images/category.svg'

const Homepage = () => {
    const router = useRouter();
    const [isMobileVisible, setIsMobileVisible] = useState<boolean>(false);
    const [productCount, setProductCount] = useState(0);
    const [vendor, setVendor] = useState({ ownerName: '', email: '' });

    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const vendorEmail = localStorage.getItem('vendorEmail');
                if (vendorEmail) {
                    const response = await fetch(`https://unibackend-4ebp.onrender.com/api/v1/vendorProfile`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ vendorEmail }),
                    });
                    const data = await response.json();
                    setVendor(data.vendor);
                }
            } catch (error) {
                console.error('Error fetching vendor data:', error);
            }
        };

        fetchVendorData();
    }, []);

    const toggleMobileVisibility = () => {
        setIsMobileVisible(!isMobileVisible);
    };

    useEffect(() => {
        const vendorEmail = localStorage.getItem('vendorEmail');
        if (!vendorEmail) {
            router.push('/loginVendor');
        } else {
            fetchProductCount(vendorEmail);
        }
    }, [router]);

    const fetchProductCount = async (vendorEmail: string) => {
        try {
            const response = await axios.get(`https://unibackend-4ebp.onrender.com/api/v1/products/${vendorEmail}`);
            setProductCount(response.data.count);
        } catch (error) {
            console.error('Error fetching product count:', error);
        }
    };

    const orders = [
        {
            id: 1,
            name: "All Orders",
            Value: 1200,
            image01: all,
            percentage: "20%"
        },
        {
            id: 2,
            name: "New",
            Value: 890,
            image01: newOrder,
            percentage: "29%"
        },
        {
            id: 3,
            name: "Pending",
            Value: 120,
            image01: pending,
            percentage: "55%"
        },
        {
            id: 4,
            name: "Completed",
            Value: 113,
            image01: completed,
            percentage: "20%"
        },
        {
            id: 5,
            name: "Cancelled",
            Value: 12,
            image01: cancel,
            percentage: "20%"
        }
    ];

    const containerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                setShowLeftArrow(containerRef.current.scrollLeft > 0);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        const vendorEmail = localStorage.getItem('vendorEmail');
        if (!vendorEmail) {
            router.push('/loginVendor');
        }
    }, [router]);

    return (
        <main className='sm: w-[100%] w-[100%] flex flex-col'>
            <Nav toggleMobileVisibility={toggleMobileVisibility} />
            <Aside isMobileVisible={isMobileVisible} />
            <div className='mt-[5rem] flex flex-col'>
                <div className='flex justify-between p-4 items-center w-full'>
                    <p className='md:text-[18px] text-[17px] font-bold'>Welcome {vendor.ownerName}!</p>
                    <Button text='My Product' styles='border-2 border-[#BEBDBD] rounded-md' />
                </div>
            </div>
            <div className="relative flex justify-center items-center p-4">
                {showLeftArrow && (
                    <button onClick={scrollLeft} className="absolute left-[10px] p-2 bg-white shadow-xl rounded-full"><MdOutlineChevronLeft size={30} color='#AAA6A6' /></button>
                )}
                <div ref={containerRef} className="flex gap-4 overflow-x-auto hide-scrollbar max-w-[100%] p-4">
                    {
                        orders.map(order => (
                            <div key={order.id} className='min-w-[240px] p-3 border-[1px] shadow-md bg-white rounded-md flex justify-center items-center'>
                                <div className='grid grid-cols-3 gap-5 mx-auto place-items-center'>
                                    <Image src={order.image01} alt='' width={40} height={40} className='p-2 bg-[#FEF0F1] rounded-md text-center h-fit flex justify-center items-center w-full' />
                                    <div className='flex flex-col gap-1'>
                                        <p className='md:text-[17px] text-[16px] font-[600] w-full'>{order.name}</p>
                                        <h1 className='md:text-[20px] text-[17px] font-bold'>{order.Value}</h1>
                                    </div>
                                    <p className='text-[12px] text-confirmed flex justify-end items-end text-end'>+{order.percentage}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <button onClick={scrollRight} className="absolute right-[10px] p-2 bg-white shadow-xl rounded-full"><MdOutlineChevronRight size={30} color='#AAA6A6' /></button>
            </div>
            <div className='flex flex-col md:flex-row p-4 gap-4 items-center mt-[2rem] justify-between w-full'>
                <div className='w-full md:w-3/4'>
                    <Chart />
                </div>
                <div className='flex flex-col gap-10 w-full md:w-1/4 justify-between'>
                    <div className='flex items-center p-7 rounded-md bg-[#8C3926] gap-4'>
                        <Image src={total} alt='' width={50} height={50} className='p-3 bg-white shadow-xl rounded-full' />
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-white text-[22px]'>{productCount}</h1>
                            <p className='text-white text-[17px]'>Total Product</p>
                            <select name="date" id="date" className='p-1 border-[1px] border-gray-400 focus:outline-none bg-[#8C3926] text-white'>
                                <option>May 2024</option>
                                <option>June 2024</option>
                                <option>July 2024</option>
                                <option>August 2024</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex items-center p-7 rounded-md bg-[#8C3926] gap-4'>
                        <Image src={cat} alt='' width={50} height={50} className='p-3 bg-white shadow-xl rounded-full' />
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-white text-[20px]'></h1>
                            <p className='text-white text-[20px]'>Product Category</p>
                            <select name="date" id="date" className='p-1 border-[1px] border-gray-400 focus:outline-none bg-[#8C3926] text-white'>
                            <option value="gadgets">Gadgets</option>
                    <option value="footwear">Footwear</option>
                    <option value="clothes">Clothes</option>
                    <option value="cakes">Cakes</option>
                    <option value="fan">Fan</option>
                    <option value="raw materials">Raw materials </option>
                    <option value="skincare">Skincare</option>
                    <option value="soap">Soap</option>
                    <option value="perfume">Perfume</option>
                    <option value="drinks">Drinks</option>
                    <option value="home accessories">Home accessories</option>
                    <option value="stationery">Stationery</option>
                    <option value="snacks">Snacks</option>
                    <option value="cakes">Cakes</option>
                    <option value="fastfood">Fastfood</option>
                    <option value="haircare">Haircare</option>
                    <option value="books">Books</option>
                    <option value="barbing">Barbing</option>
                    <option value="hair Styling">Hairstyling</option>
                    <option value="graphics">Graphics</option>
                    <option value="delivery">Delivery</option>
                    <option value="massage">Massage</option>
                    <option value="fashion design">Fashion design</option>
                    <option value="photography">Photography</option>
                    <option value="videography/animations">Videography/Animations</option>
                    <option value="laundry">Laundry</option>
                    <option value="surprise packages">Surprise packages</option>
                    <option value="hardware repairs">Hardware Repairs</option>
                    <option value="printing">Printing</option>
                    <option value="writing">Writing</option>
                    <option value="content creation">Content creation</option>
                    <option value="artwork">Artwork</option>
                    <option value="lingerie">Lingerie</option>
                    <option value="tutorials">Tutorials</option>
                    <option value="housing">Housing</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}

export default Homepage;
