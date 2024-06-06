"use client"
import React, { useState } from 'react'
import Nav from '@/components/vendorDashboard/nav'
import Image from 'next/image'
import Orders from '@/data/order'
// import prev from "../images/";
import next from "@/Images/Vector (21).svg";
import { useRouter } from 'next/navigation';


const Order = () => {
    const router = useRouter()
    const [activeNumber, setActiveNumber] = useState(1);
    const [activeTab, setActiveTab] = useState('All');

    const handleClick = (number: any, tab: any) => {
        setActiveNumber(number);
        setActiveTab(tab);
    };

    const getStatusStyle = (status: any) => {
        switch (status) {
            case 'Confirmed':
                return 'text-confirmed text-[12px] py-1 bg-confi-bg rounded-full';
            case 'Pending':
                return 'text-pending text-[12px] py-1 bg-pending-bg rounded-full';
            case 'Cancelled':
                return 'text-cancelled text-[12px] py-1 bg-cancelled-bg rounded-full';
            default:
                return '';
        }
    };

    const filteredOrders = () => {
        switch (activeTab) {
            case 'All':
                return Orders;
            case 'Completed':
                return Orders.filter(order => order.status === 'Confirmed');
            case 'Pending':
                return Orders.filter(order => order.status === 'Pending');
            case 'Cancel':
                return Orders.filter(order => order.status === 'Cancelled');
            default:
                return Orders;
        }
    };

    const getUnderlineStyle = (tab: any) => {
        return activeTab === tab ? 'border-b-2 border-color1 pb-2 transition duration-300 ease-in-out' : '';
    };

    return (
        <main className='w-[100%] flex flex-col'>
            <Nav />
        <section className='p-4 w-full flex flex-col gap-7 relative'>
            <h1 className='text-red-900 font-semibold md:text-2xl text-xl'>My Orders</h1>
            <div className='bg-white rounded-md shadow-sm mb-12'>
                <div className='flex justify-around items-center p-5'>
                    {['All', 'New', 'Completed', 'Pending', 'Cancel'].map((tab, index) => (
                        <h1
                            key={index}
                            onClick={() => handleClick(index + 1, tab)}
                            className={`cursor-pointer ${getUnderlineStyle(tab)} ${activeTab === tab ? 'active-tab text-red-900 md:text-lg text-sm font-semibold' : 'inactive-tab text-gray-500 md:text-lg text-sm'}`}
                        >
                            {tab}
                        </h1>
                    ))}
                </div>
                <hr className='bg-red-900 mt-1' />
                <div className='overflow-x-auto'>
                    <table className='min-w-full bg-white border border-gray-200'>
                        <thead>
                            <tr className='bg-color1 text-red-900 md:text-[13px] text-sm'>
                                <th className='py-4 px-6 text-left'>Customer</th>
                                <th className='py-4 px-6 text-left'>Location</th>
                                <th className='py-4 px-6 text-left'>Order Details</th>
                                <th className='py-4 px-6 text-left'>Order Type</th>
                                <th className='py-4 px-6 text-left'>Order Status</th>
                                <th className='py-4 px-6 text-left'>Time</th>
                                <th className='py-4 px-6 text-left'>Statement</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders().slice(0, 5).map((order) => (
                                <tr key={order.id} className='border-b border-gray-200 text-base'>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center'>
                                            <div className='mr-2 text-[15px] w-full'>
                                                {order.customer}
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 text-[15px]'>{order.location}</td>
                                    <td className='px-6 py-4'>
                                        <p className='text-[12px] '>{order.orderId}</p>
                                        <div className='flex items-center '>
                                            <Image src={order.image01} alt={order.productName} width={2} height={2} />
                                            <div className='flex flex-col items-start justify-start'>
                                                <td className='text-[14px] font-bold'>{order.productName}</td>
                                                <td className='px-6 text-[14px] flex text-start items-start justify-start'>&#8358;{order.price}</td>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 text-[15px]'>{order.orderType}</td>
                                    <div className='w-full flex justify-center items-center h-full md:mt-[2.6rem] mt-[2rem]'>
                                    <td className={`px-6 py-2 flex justify-center items-center w-[80%] ${getStatusStyle(order.status)}`}>{order.status}</td>
                                    </div>
                                    <td className='px-6 py-4 text-[15px]'>{order.time}</td>
                                    <td className='px-6 py-4'>
                                        <Image src={order.image02} alt={order.productName} width={10} height={10} className='flex justify-center ml-[20px]'/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bottom-3 absolute flex flex-col md:flex-row items-end right-2 gap-4 md:gap-10">
                <h1 className="text-sm font-medium text-color1">Showing 1 page of 5 entries</h1>
                <div className="flex gap-4">
                    <div className="flex items-center gap-3 cursor-pointer">
                        {/* <Image src={prev} alt="Previous" width={12} height={12} /> */}
                        <h1 className="text-sm font-bold text-color1">Previous</h1>
                    </div>
                    <div className="flex gap-2 text-sm font-bold">
                        {[1, 2, 3, 4, 5].map((number) => (
                            <h1
                                key={number}
                                className={`px-2 py-1 rounded-full cursor-pointer ${activeNumber === number ? 'bg-color1 text-white' : 'bg-color2 text-color1'}`}
                                onClick={() => handleClick(number, activeTab)}
                            >
                                {number}
                            </h1>
                        ))}
                    </div>
                    <div className="flex items-center gap-3 cursor-pointer">
                        <h1 className="text-sm font-bold text-color1" >Next</h1>
                        <Image src={next} alt="Next" width={12} height={12} />
                    </div>
                </div>
            </div>
        </section>
        </main>
    )
}

export default Order
