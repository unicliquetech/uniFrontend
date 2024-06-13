import React from 'react'
import accesssIcon from '@/images/accessIcon.svg'
import support from '@/images/supportIcon.svg'
import div from '@/images/servicesIcon.svg'
import Image from 'next/image'

const Why = () => {
    return (
        <section className='mx-auto mt-[5rem] lg:px-10 px-2 mb-8'>
            <div className='flex justify-center items-center gap-[2rem] flex-col'>
                <div className='flex flex-col items-center justify-center gap-3'>
                    <p className='md:text-[2rem] text-[1.7rem] text-black poppins-bold text-center w-full'>Why customers choose Uniclique</p>
                    <h2 className='md:text-[15px] text-[14px] text-black poppins-medium md:w-[65%] w-full text-center'>We at Uniclique are always ready to help and serve you better by providing the best service for you</h2>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-10 justify-center place-items-center w-full md:w-fit items-center mx-auto'>
                    <div className='border-[1px] border-[#6A6D70] rounded-md flex flex-col gap-3 p-2 items-center bg-[#dcdcdc]'>
                       <Image src={accesssIcon} alt='' width={70} height={70} className='p-2 rounded-full bg-white shadow-2xl mt-[-2rem]'/>
                        <p className='w-[60%] md:text-[19px] text-[17px] text-center poppins-bold'>Convenience and Accessibility</p>
                        <h2 className='text-[#6A6D70] md:text-[14px] text-[13px] text-center lg:w-[80%] md:w-[70%] w-full poppins-medium'>As a one-stop shop for campus-related needs, Uniclique offers the convenience of finding and booking services from fellow students in a single, user-friendly platform accessible via a web application</h2>
                    </div>
                    <div className='border-[1px] border-[#6A6D70] bg-[#d3d1d1] rounded-md flex flex-col gap-3 p-2 items-center'>
                       <Image src={support} alt='' width={70} height={70} className='p-2 rounded-full bg-white shadow-2xl mt-[-2rem]'/>
                        <p className='md:w-[80%] md:text-[19px] text-[17px] text-center poppins-bold'>Support for Scaling</p>
                        <h2 className='text-[#6A6D70] md:text-[14px] text-[13px] text-center md:w-[80%] flex-grow poppins-medium'>Uniclique truly cares about nurturing student entrepreneurs and supporting their growth. The platform provides tools, resources and a supportive community to help ambitious student service providers scale their businesses and reach their full potential</h2>
                    </div>
                    <div className='border-[1px] border-[#6A6D70] rounded-md flex flex-col bg-[#d3d1d1] gap-3 p-2 items-center'>
                       <Image src={div} alt='' width={70} height={70} className='p-2 rounded-full bg-white shadow-2xl mt-[-2rem]'/>
                        <p className='md:w-[80%] md:text-[19px] text-[17px] text-center poppins-bold'>Diverse Range of Services</p>
                        <h2 className='text-[#6A6D70] md:text-[14px] text-[13px] text-center md:w-[80%] w-full poppins-medium'>Whether you need academic tutoring, creative services like graphic design, event planning assistance, or even instrument lessons, Uniclique’s platform brings together a wide array of services offered by talented students within your university community</h2>
                    </div>
                    
                    
                </div>
                
            </div>
        </section>
    )
}

export default Why