import Image from 'next/image';
import React from 'react'
import { MdSearch, MdMessage, MdDoorbell } from "react-icons/md";
import ava from '@/Images/avatar.svg'
import bell from '@/Images/bell (1).svg'
import message from '@/Images/Vector (40).svg'


const Nav = () => {
    return (
        <section className='flex z-10 justify-center w-[100%] p-4 items-center mx-auto bg-white shadow-xl '>
            <div className='flex justify-between items-center w-full'>
                <div className='flex flex-col justify-start gap-1'>
                    <p className='md:text-[17px] text-[15px] font-bold'>Dashboard</p>
                    <p className='md:text-[12.5px] text-[12px] '>11 May 2024, Saturday</p>
                </div>
                <div className='border-2 border-[#8B8A8] rounded-md justify-start w-fit gap-[5rem] flex p-2  mt-2 lg:mt-0'>
                    <input type='text' className='focus:outline-none bg-[#8B8A8] placeholder:text-[13px]' placeholder='search orders' />
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
                    <p className='md:text-[15px] text-[14px] ml-3 mr-2'>Need Help?</p>
                    <p className='h-5'>|</p>
                    <div className='flex justify-center gap-2 items-center'>
                        <Image src={ava} alt='' width={40} height={40} />
                        <div className='flex flex-col  '>
                            <h1 className='md:text-[15px] text-[14px] font-bold'>Ayotunde Ojay</h1>
                            <h2 className='md:text-[13px] text-[12px]'>aojay866@gmail.com</h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Nav