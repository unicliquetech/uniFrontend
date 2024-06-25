"use client"
import React, { useEffect, useState } from 'react'
import activeVen from '@/images/shopLocationIcon.svg'
import Image from 'next/image'
import product from '@/images/getCashIcon.svg'
import ecommerce from '@/images/businessIcon.svg'
import review from '@/images/popularIcon.svg'

const Stat = () => {
    const [active, setActive] = useState(0)
    const [pro, setPro] = useState(0)
    const [ecom, setEcom] = useState(0)
    const [rev, setRev] = useState(0)


    useEffect(() => {
        let timer: any
        if (ecom >= 0 && ecom < 240) {
            timer = setTimeout(() => {
                setEcom((prevEcom) => prevEcom + 1);
            }, 100)
        }

        return () => clearTimeout(timer)
    }, [ecom])
    useEffect(() => {
        let timer: any;
        if (active >= 0 && active < 120) {
            timer = setTimeout(() => {
                setActive((prevActive) => prevActive + 1);
            },100);
        }

        // Cleanup function to clear the timeout
        return () => clearTimeout(timer);
    }, [active]);

    useEffect(() => {
        let timer: any;
        if (pro >= 0 && pro < 1200) {
            timer = setTimeout(() => {
                setPro((prevpro) => prevpro + 1);
            }, 10);
        }
        return () => clearTimeout(timer);
    }, [pro]);


    useEffect(() => {
        let timer: any
        if (rev >= 0 && rev < 1393) {
            timer = setTimeout(() => {
                setRev((prevrev) => prevrev + 1)
            }, 10)
        }
    }, [rev])



    return (
        <section className='bg-[#590209] justify-center flex items-center mx-auto py-[20px] mt-[5rem]'>
            <div className='grid md:grid-cols-4 grid-cols-2 justify-evenly w-full items-center p-2 gap-[3rem]'>
                <div className='flex flex-col items-center '>
                    <Image src={activeVen} alt='active vendors' width={50} height={50} />
                    <span className='text-white md:text-[2.2rem] text-[1.5rem]'>{active}</span>
                    <p className='text-white md:text-[16px] text-[15px] text-center poppins-bold'>Active Vendors</p>
                    <p className='text-white md:text-[14px] text-[13px] text-center poppins-medium'>service Provider</p>
                </div>
                <div className='flex flex-col items-center ap-4'>
                    <Image src={product} alt='active vendors' width={50} height={50} />
                    <span className='text-white md:text-[2.2rem] text-[1.5rem]'>{pro}</span>
                    <p className='text-white md:text-[16px] text-[15px] text-center poppins-bold'>Product Buyers</p>
                    <p className='text-white md:text-[14px] text-[13px] text-center poppins-medium '>happy Customers</p>
                </div>
                <div className='flex flex-col items-center ap-4'>
                    <Image src={ecommerce} alt='active vendors' width={50} height={50} />
                    <span className='text-white md:text-[2.2rem] text-[1.5rem]'>{ecom}</span>
                    <p className='text-white md:text-[16px] text-[15px] text-center poppins-bold'>Ecommerce businesses</p>
                    <p className='text-white md:text-[14px] text-[13px]  text-center poppins-medium '>Goods & Services</p>
                </div>
                <div className='flex flex-col items-center ap-4'>
                    <Image src={review} alt='active vendors' width={50} height={50} />
                    <span className='text-white md:text-[2.2rem] text-[1.5rem]'>{rev}</span>
                    <p className='text-white md:text-[16px] text-[15px] text-center poppins-bold'>Reviewed Products
                    </p>
                    <p className='text-white md:text-[14px] text-[13px] text-center poppins-medium '>Users&apos; Satisfaction</p>
                </div>
            </div>
        </section>
    )
}

export default Stat
