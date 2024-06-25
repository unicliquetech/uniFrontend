import React, { useState } from 'react'
import Image from 'next/image'
import shoppingbag from '../../images/shoppingbag.svg'
import fav from '../../images/favourite.svg'
import share from '../../images/share.svg'
import chat from '../../images/chat.svg'
import Button from './button'
import plus from '../../images/bx-plus.svg'
// import { Md } from "react-icons/md";


const FeaturedPro = () => {
    const [activeColors, setActiveColors] = useState<number>(0)
    const colors = [
        {
            id: 1,
            color: "Teal"
        },
        {
            id: 2,
            color: "Navy Blue"
        },
        {
            id: 3,
            color: "White"
        },
        {
            id: 4,
            color: "Brown"
        },
    ]

    return (
        <section className='flex flex-col justify-start gap-3 mt-[5rem] '>
            <div className='flex flex-col gap-3'>
                <div className='sm:px-10 px-5'>
                    <h1 className='md:text-[1.5rem font-[700]'>Featured Products</h1>
                </div>
                <div className='md:pl-[3rem] pl-[0rem]'>
                    <div className='grid lg:grid-cols-2 grid-cols-1 mx-auto bg-[#F2F2F2] gap-3 w-full md:p-[3rem] p-[1rem]'>
                        <Image src={shoppingbag} alt='' className='flex justify-center items-center text-center w-full h-fit'/>
                        <div className='flex flex-col gap-[1.2rem] md:p-[2rem] p-[1rem] justify-center '>
                            <div className='flex justify-between w-full items-center'>
                                <p className='p-2 bg-[#FFB800] font-[500] text-[15px] rounded-[30px]'>Sponsored</p>
                                <div className='flex gap-4'>
                                    <Image src={fav} alt='' width={20} height={20} />
                                    <Image src={share} alt='' width={20} height={20} />
                                </div>
                            </div>
                            <p className='md:text-[2.4rem] font-bold text-[1.8rem]'>Vantela Designer Handbag</p>
                            <div className='flex gap-4 items-center'>
                                <p className='md:text-[3.2rem] text-[2.5rem] text-[#8C3926]'>N 8,500</p>
                                <s className='md:text-[1.2rem] text-[1rem] text-[#8B8A8A]'>N12,000</s>
                            </div>
                            <div className='mt-[1rem]'>
                                <h1 className='text-[1rem] text-black'>Available Color</h1>
                                <div className='flex gap-2'>
                                    {colors.map((col, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setActiveColors(i)}
                                            className={`p-2 mt-[.6rem] rounded-[5px] cursor-pointer border-[1.6px] outline-none ${activeColors === i ? 'border-[#000000] text-[#000000]' : 'border-[#858585] text-[#858585]'}`}
                                        >
                                            <p>{col.color}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='flex gap-4 mt-[1.5rem]'>
                                <Image src={chat} alt='' width={45} height={45} />
                                <Button text='Buy now' styles="bg-[#590209] text-white text-[16px] w-[30%]" />
                                <div className='flex gap-2 items-center border-2 border-[#590209] p-2 rounded-md'>
                                    <Image src={plus} alt='' width={25} height={25}/>
                                    <p className='text-[.9rem] text-[#590209] font-bold w-[90%] '>Add to cart</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedPro