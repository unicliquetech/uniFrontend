"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/homePage/button';
import Prod from '@/data/product';

const Product = () => {
    const [activeProduct, setActiveProduct] = useState<number>(0);

    return (
        <section className='flex mt-[6rem] mx-auto'>
            <div className='flex justify-center items-center flex-col w-full sm:px-10 p-2 gap-5'>
                <div className='flex flex-col justify-start w-full'>
                    <p className='text-[19px] poppins-bold'>Products we offer on Uniclique</p>
                </div>

                <div className='flex justify-between gap-[3rem] w-full relative overflow-auto hide-scrollbar '>
                    {Prod.map((pro, i) => (
                        <div
                            key={i}
                            onClick={() => setActiveProduct(i)}
                            className={`flex justify-between items-center flex-col gap-2 cursor-pointer ${activeProduct === i ? 'text-[#590209]' : 'text-gray-500'}`}
                        >
                            <p className='md:text-[16px] text-[15px]'>{pro.productName}</p>
                            <p className={`w-[3rem] h-2 rounded-md ${activeProduct === i ? 'bg-[#590209]' : 'hidden bg-gray-300'}`}></p>
                        </div>
                    ))}
                    <p className='w-full h-[0.1rem] bg-gray-300 absolute top-[2.2rem] z-[-1000] lg:flex hidden'></p>
                </div>

                {Prod.filter((_, i) => i === activeProduct).map((pro, i) => (
                    <div className='grid mx-auto lg:grid-cols-2 grid-cols-1 gap-4 justify-between md:place-items-center  bg-[#FAF3ED] sm:px-[5rem] px-2 p-8 mt-[4rem]' key={i}>
                        <Image src={pro.image01} alt={pro.productName} className='h-fit md:order-1 order-1 md:w-[80%] w-full' />
                        <div className='flex flex-col gap-5 md:order-2 order-2'>
                            <p className='poppins-bold md:text-[15px] text-[14px] md:w-[95%] w-full md:text-start text-center'>{pro.description}</p>
                            <p className='poppins-regular md:text-[13px] text-[12px] md:w-[85%] w-full md:text-start text-center'>{pro.desctwo}</p>
                            <div className='flex md:justify-start gap-10 justify-center'>
                                <a href="/product">
                                    <Button text='Buy Products' styles='bg-[#590209] text-white rounded-md md:text-[15px] text-[14px] w-full' />
                                </a>

                                <a href="/vendorSignup">
                                    <Button text='Become a vendor' styles="border-[1.3px] border-[#590209] hover:transform md:text-[15px] text-[14px] w-full" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Product;
