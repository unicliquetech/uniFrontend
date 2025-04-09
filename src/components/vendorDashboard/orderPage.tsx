"use client"
import React, { useState, useEffect } from 'react'
import LazyLoad from 'react-lazy-load';
import Nav from '@/components/vendorDashboard/nav'
import Aside from '@/components/vendorDashboard/Aside';
import Image from 'next/image'
// import Orders from '@/data/order'
// import prev from "../images/";
import next from "@/images/Vector (21).svg";
import { useRouter } from 'next/navigation';


interface OrderStatusDropdownProps {
  currentStatus: string;
  onStatusChange: (orderId: string, newStatus: string) => void;
  orderId: string;
}

const statusOptions = ['pending', 'paid', 'delivered', 'failed', 'canceled'];

const OrderStatusDropdown: React.FC<OrderStatusDropdownProps> = ({
  currentStatus,
  onStatusChange,
  orderId,
}) => {
  const [status, setStatus] = useState(currentStatus);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    onStatusChange(orderId, newStatus);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-pending text-[12px] py-1 bg-pending-bg rounded-full';
      case 'paid':
        return 'text-paid text-[12px] py-1 bg-paid-bg rounded-full';
      case 'delivered':
        return 'text-delivered text-[12px] py-1 bg-delivered-bg rounded-full';
      case 'failed':
        return 'text-failed text-[12px] py-1 bg-failed-bg rounded-full';
      case 'canceled':
        return 'text-canceled text-[12px] py-1 bg-canceled-bg rounded-full';
      default:
        return '';
    }
  };

  return (
    <div className="w-[100%] relative">
      <select
        value={status}
        onChange={(e) => handleStatusChange(e.target.value)}
        className={`${getStatusStyle(status)} appearance-none px-3 py-1 rounded-full cursor-pointer`}
      >
        {statusOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12l-5-5 1.41-1.41L10 9.17l3.59-3.58L15 7l-5 5z" />
        </svg>
      </div>
    </div>
  );
};


interface Order {
    orderId: string;
    email: string;
    userId: string;
    location: string;
    orderDate: string;
    orderType: string;
    time: string;
    price: string;
    orderStatus: string;
    deliveryAddress: string;
    createdAt: Date;
    orderItems: any;
  }


const Order = () => {
    const router = useRouter()
    const [activeNumber, setActiveNumber] = useState(1);
    const [activeTab, setActiveTab] = useState('All');
    const [isMobileVisible, setIsMobileVisible] = useState<boolean>(false);
    const [order, setOrder] = useState<Order[]>([]);

    interface OrderItem {
        name: string;
        image: string;
        price: number;
        quantity: number;
    }

    useEffect(() => {
        const fetchVendorOrder = async () => {
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
                    setOrder(data.orders);
                }
            } catch (error) {
                console.error('Error fetching vendor data:', error);
            }
        };

        fetchVendorOrder();
    }, []);

    const toggleMobileVisibility = () => {
        setIsMobileVisible(!isMobileVisible);
    };

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
        if (!order || !Array.isArray(order)) return [];

        switch (activeTab) {
            case 'All':
                return order;
            case 'Completed':
                return order.filter(order => order.orderStatus === 'delivered');
            case 'Pending':
                return order.filter(order => order.orderStatus === 'pending');
            case 'Cancel':
                return order.filter(order => order.orderStatus === 'canceled');
            default:
                return order;
        }
    };

    const getUnderlineStyle = (tab: any) => {
        return activeTab === tab ? 'border-b-2 border-color1 pb-2 transition duration-300 ease-in-out' : '';
    };


  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      // Make an API call to update the order status
      const response = await fetch(`https://unibackend-4ebp.onrender.com/api/v1/order/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderStatus: newStatus }),
      });

      if (response.ok) {
        // Update the order status in the local state
        const updatedOrders = order.map((o) => {
          if (o.orderId === orderId) {
            return { ...o, orderStatus: newStatus };
          }
          return o;
        });
        setOrder(updatedOrders);
      } else {
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };










    return (
      <LazyLoad>
        <main className='w-[100%] flex flex-col'>
            <Nav toggleMobileVisibility={toggleMobileVisibility} />
            <Aside isMobileVisible={isMobileVisible} />
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
                    <div className='overflow-x-auto md:overflow-x-visible'>
                        <table className='min-w-full md:min-w-0 bg-white border border-gray-200'>
                            <thead>
                                <tr className='bg-color1 text-red-900'>
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
                                {filteredOrders().map((order, index) => (
                                    <tr key={index} className='border-b border-gray-200 text-base'>
                                        <td className='px-6 py-4'>
                                            <div className='flex items-center'>
                                                <div className='mr-2 text-[15px] w-full'>
                                                    {order.userId}
                                                </div>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4 text-[15px]'>{order.deliveryAddress}</td>
                                        <td className='px-6 py-4'>
                                            <p className='text-[12px] '>{order.orderId}</p>
                                            <div className='flex flex-col gap-2'>
                                                {order.orderItems.map((item: OrderItem, itemIndex: number) => (
                                                    <div key={itemIndex} className='flex items-center'>
                                                        <Image src={item.image} alt={item.name} width={40} height={40} />
                                                        <div className='flex flex-col items-start justify-start ml-2'>
                                                            <span className='text-[14px] font-bold'>{item.name}</span>
                                                            <span className='text-[14px]'>&#8358;{item.price}</span>
                                                            <span className='text-[14px]'>Quantity: {item.quantity}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td className='px-6 py-4 text-[15px]'>{order.orderType}</td>
                                        <div className='w-full flex justify-center items-center h-full md:mt-[2.6rem] mt-[2rem]'>
                                            <td className="px-6 py-4">
                                                <OrderStatusDropdown
                                                    currentStatus={order.orderStatus}
                                                    onStatusChange={handleStatusChange}
                                                    orderId={order.orderId}
                                                />
                                            </td>
                                        </div>
                                        <td className='px-6 py-4 text-[15px]'>{new Date(order.createdAt).toLocaleString()}</td>
                                        <td className='px-6 py-4'>
                                            {/* Render any additional order information if needed */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bottom-3 absolute flex flex-col items-end right-2 gap-4">
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
        </LazyLoad>
    )
}

export default Order
