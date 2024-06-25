"use client"
import React, { useState } from 'react'
import Services from '@/data/service'
import Image from 'next/image'
import Button from './button'

const Service = () => {
    const [activeService, setActiveService] = useState<number>(0)
    return (
        <section className="flex flex-col gap-2 mt-[5rem] sm:px-10 px-5">
            <div className='flex flex-col gap-2 justify-start items-start'>
                <p className='md:text-[1.7rem] font-[600] text-[#0D0D0D]'>
                    Service we offer on Uniclique
                </p>
                <div className='flex justify-between md:gap-[3rem] gap-[6rem] w-full relative overflow-auto hide-scrollbar mt-[2rem]'>
                  {
                    Services.map((service, i) => (
                        <div
                            key={i}
                            onClick={() => setActiveService(i)}
                            className={`flex justify-between items-center flex-col gap-2 cursor-pointer ${activeService === i ? 'text-[#590209]' : 'text-gray-500'}`}
                        >
                            <p className='md:text-[16px] text-[15px] w-[100%]'>{service.productName}</p>
                            <p className={`w-[3.5rem] h-2 rounded-md ${activeService === i ? 'bg-[#590209]' : 'hidden bg-gray-300'}`}></p>
                        </div>
                    ))
                  }  
                </div>


                {Services.filter((_, i) => i === activeService).map((service, i) => (
                    <div key={i} className='grid mx-auto md:grid-cols-2 grid-cols-1 gap-0 mt-[2rem] mb-[1rem]'>
                        <div>
                            <Image src={service.image01} alt={service.productName} className=''/>
                        </div>
                        <div className='lg:p-[3rem] p-[.9rem] flex justify-center md:items-start items-center flex-col gap-4 bg-[#590209]'>
                            <h1 className='md:text-start text-center lg:text-[1.8rem] md:text-[1.3rem] text-[.7rem] text-[600] md:mt-[0px] mt-[10px] text-white'>{service.description}</h1>
                            <h3 className='md:text-start text-center md:text-[1.1rem] text-[0.8rem]  text-[400] text-white'>{service.desctwo}</h3>
                            <div className='flex md:justify-start gap-10 justify-center mb-[.9rem]'>
                                <a href="/product">
                                    <Button text='Find vendors' styles='bg-[#fff] text-[#590209] rounded-md md:text-[15px] text-[14px] w-full' />
                                </a>
                                <a href="/vendorSignup">
                                    <Button text='Offer a service' styles="border-[1.3px] border-[#fff] hover:transform md:text-[15px] text-[#ffffff] text-[14px] w-full" />
                                </a>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    )
}

export default Service
