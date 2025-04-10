"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive';
import unilogo from '@/images/unilogo.svg'
import logo from '@/images/logo2.png';
import menu from '@/images/align-justify.svg'
import home from '@/images/home.svg'
import order from '@/images/mdi_cart-outline.svg'
import product from '@/images/file-text (1).svg'
import cust from '@/images/team-line.svg'
import ven from '@/images/group-3-line.svg'
import message from '@/images/mi_message.svg'
import rocket from '@/images/Rocket-color (1) 1 (1).svg'
import Button from './Button'
import bell from '@/images/bell.svg'
import set from '@/images/settings.svg'
import logout from '@/images/icon.svg'
import ava from '@/images/avatar.svg'
import li from '@/images/more-vertical.svg'
import { useRouter } from 'next/navigation'


interface AsideItemProps {
  id: number;
  image01: string;
  name: string;
  route: string;
}

interface AsideProps {
  isMobileVisible: boolean;
}

const Aside: React.FC<AsideProps> = ({ isMobileVisible }) => {
  const [active, setActive] = useState<number>(0)
  const [vendor, setVendor] = useState({ businessName: '', email: '' });
  const router = useRouter();

  const handleTabClick = (index: number, route: string) => {
    setActive(index);
    router.push(route);
  };

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

  const handleLogout = async () => {
    try {
      // Clear vendor email from local storage
      localStorage.removeItem('vendorEmail');

      // Redirect to login page or home page
      window.location.href = '/loginVendor';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const Pages: AsideItemProps[] = [
    {
      id: 1,
      name: 'Home',
      image01: home,
      route: '/vendorDashboard',
    },
    {
      id: 2,
      name: 'Order',
      image01: order,
      route: '/vendorOrderPage',
    },
    {
      id: 3,
      name: 'Product',
      image01: product,
      route: '/vendorProductsPage',
    },
    // {
    //   id: 4,
    //   name: 'Customers',
    //   image01: cust,
    //   route: '/customers', 
    // },
    {
      id: 5,
      name: 'Delivery',
      image01: ven,
      route: '/deliveryPersonnel',
    },
    {
      id: 6,
      name: 'Messages',
      image01: message,
      route: '/vendorDashboard',
    }
  ];
  return (
    <>
      {isMobileVisible && (
        <section
          className={`sm:w-[55%] w-[85%] bg-red-900 text-white h-[330vh] flex justify-start items-start relative `}
        >
          <div className='flex justify-start items-start bg-color1 h-[100%] w-full '>
            <div className='flex justify-start w-full flex-col'>
              <div className='flex justify-between items-center w-full mt-[.8rem] p-2'>
                <Image src={logo} alt='' width={100} height={140} />
                {/* <Image src={menu} alt='' width={20} height={20} /> */}
              </div>

              <p className='p-2 bg-color2 text-color3 md:text-[17px] text-[15px] mt-[1.5rem] text-center'>Vendor Dashboard</p>
              <div className='flex mt-[2rem] flex-col'>
                {
                  Pages.map((page, i) => (
                    <div
                      key={i}
                      className='flex justify-start items-center mt-[0.5rem] relative px-5 cursor-pointer hover:bg-gradim p-[0.35rem] rounded-[5px]'
                      onClick={() => handleTabClick(i, page.route)} // Use handleTabClick
                    >
                      <div className='flex gap-3 justify-start items-center w-full'>
                        <Image src={page.image01} alt='' width={20} height={20} />
                        <p className='text-color3 md:text-[18px] text-[15px]'>{page.name}</p>
                      </div>
                      <p className={`w-[0.3rem] h-5 rounded-2xl bg-color2 flex justify-end absolute right-0 ${active === i ? '' : 'hidden'}`}></p>
                    </div>
                  ))
                }
              </div>

              <div className='flex w-full justify-center'>
                <div className='p-3 flex gap-3 bg-red-300 text-red-900 font-semibold w-[90%] justify-items-center justify-center mt-[3rem] items-center rounded-md'>
                  <div className='flex justify-center items-center flex-col w-full'>
                    <p className='md:text-[17px] text-[15px]'>Upgrade your plan to serve you more</p>
                    <Image src={rocket} alt='' width={120} height={100} />
                    <button className='bg-red-900' style={{ padding: "12px", borderRadius: "10px", textAlign: "center", backgroundColor: "#590209", color: '#FFF4EA', fontSize: '15px', width: '100%' }}>
                      <p> Upgrade Plan</p>
                    </button>
                  </div>
                </div>
              </div>

              <div className='absolute bottom-3'>
                <div >
                  <div className='flex justify-between px-3 items-center hover:bg-gradim p-[0.35rem] rounded-[5px] cursor-pointer'>
                    <div className='flex gap-2 items-center'>
                      <Image src={bell} alt='' width={20} height={20} />
                      <p className='text-color3 md:text-[18px] text-[15px]'>Notification</p>
                    </div>
                    <p className=' w-5 h-5 text-center rounded-md bg-orange-400 text-color3 flex justify-center items-center'>2</p>
                  </div>
                </div>
                <div className='flex justify-between px-3 items-center mt-[1rem] hover:bg-gradim p-[0.35rem] rounded-[5px] cursor-pointer'>
                  <div className='flex gap-2 items-center'>
                    <Image src={set} alt='' width={20} height={20} />
                    <p className='text-color3 md:text-[18px] text-[15px]'>Setting</p>
                  </div>
                </div>
                <div className='flex justify-between px-3 items-center mt-[1rem] hover:bg-gradim p-[0.35rem] rounded-[5px] cursor-pointer'>
                  <div className='flex gap-2 items-center'>
                    <Image src={logout} alt='' width={20} height={20} />
                    {/* <button>
                    <a className='text-orange-400 md:text-[18px] text-[15px] '>Logout</a>
                    </button> */}

                    <button onClick={handleLogout} className="logout-button text-orange-400 md:text-[18px] text-[15px] ">
                      Logout
                    </button>
                  </div>
                </div>

                <div className='flex w-full justify-center'>
                  <div className='p-2 bg-black3 w-[90%] justify-center items-center gap-3 mt-[2rem] rounded-md'>
                    <div className='flex justify-between items-center'>
                      <Image src={logo} alt='' width={40} height={60} />
                      <div className='flex flex-col gap-1 mt-8'>
                        <h1 className='text-[12px] text-white'>{vendor?.businessName || ''}</h1>
                        {/* <Image src={li} alt='' width={20} height={20} /> */}
                        <h2 className='md:text-[13px] text-[12px]'>{vendor?.email?.split('@')[0] || ''}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Aside