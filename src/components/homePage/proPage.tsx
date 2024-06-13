// "use client"
// import React, { useState } from 'react'
// import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdSearch, MdStar } from 'react-icons/md';
// import sneaker1 from '../../public/images/sneaker1.svg'
// import sneaker2 from '../../public/images/sneaker2.svg'
// import sneaker3 from '../../public/images/sneaker3.svg'
// import sneaker4 from '../../public/images/sneaker4.svg'
// import sneaker5 from '../../public/images/sneaker5.svg'
// import sneaker6 from '../../public/images/sneaker6.svg'
// import sneaker7 from '../../public/images/sneaker7.svg'
// import sneaker8 from '../../public/images/sneaker8.svg'
// import sneaker9 from '../../public/images/sneaker9.svg'
// import sneaker10 from '../../public/images/sneaker1.svg'
// import sneaker11 from '../../public/images/sneaker6.svg'
// import sneaker12 from '../../public/images/sneaker7.svg'
// import avatar from '../../public/images/avatar (1).svg'
// import Image from 'next/image';
// import fav from '../../public/images/Group 9 (2).svg'

// interface ProType {
//     id: number,
//     name: string

// }

// interface SneakerType {
//     id: number,
//     name: string,
//     price: number,
//     image: any,
//     venName: string,
//     position: string,
//     rating: number,
//     disCount: number,
//     showDiscount: boolean,
// }

// const ProPage = () => {
//     const Pro: ProType[] = [
//         {
//             id: 1,
//             name: "Sneakers"
//         },
//         {
//             id: 2,
//             name: "Shoes"
//         },
//         {
//             id: 3,
//             name: "Boots"
//         },
//         {
//             id: 4,
//             name: "Sandals"
//         },
//         {
//             id: 5,
//             name: "Slippers"
//         },
//         {
//             id: 6,
//             name: "Flip-flops"
//         },
//     ]

//     const Sneakers: SneakerType[] = [
//         {
//             id: 1,
//             name: "Norway Chase Low Black Natural",
//             price: 39000,
//             image: sneaker1,
//             venName: 'Ayotunde Ojay',
//             position: 'Vendor',
//             rating: 4.5,
//             disCount: 30,
//             showDiscount: true,
//         },
//         {
//             id: 2,
//             name: "Norway Chase Low Black Natural",
//             price: 39000,
//             image: sneaker2,
//             venName: 'Ayotunde Ojay',
//             position: 'Vendor',
//             rating: 4.5,
//             disCount: 30,
//             showDiscount: false,
//         },
//         {
//             id: 3,
//             name: "Norway Chase Low Black Natural",
//             price: 39000,
//             image: sneaker3,
//             venName: 'Ayotunde Ojay',
//             position: 'Vendor',
//             rating: 4.5,
//             disCount: 30,
//             showDiscount: false

//         },
//         {
//             id: 4,
//             name: "Norway Chase Low Black Natural",
//             price: 39000,
//             image: sneaker4,
//             venName: 'Ayotunde Ojay',
//             position: 'Vendor',
//             rating: 4.5,
//             disCount: 30,
//             showDiscount: false
//         },
//         {
//             id: 5,
//             name: "Norway Chase Low Black Natural",
//             price: 39000,
//             image: sneaker5,
//             venName: 'Ayotunde Ojay',
//             position: 'Vendor',
//             rating: 4.5,
//             disCount: 30,
//             showDiscount: true
//         },
//         {
//             id: 6,
//             name: "Norway Chase Low Black Natural",
//             price: 39000,
//             image: sneaker6,
//             venName: 'Ayotunde Ojay',
//             position: 'Vendor',
//             rating: 4.5,
//             disCount: 30,
//             showDiscount: false,
//         },
//         {
//             id: 7,
//             name: "Norway Chase Low Black Natural",
//             price: 39000,
//             image: sneaker7,
//             venName: 'Ayotunde Ojay',
//             position: 'Vendor',
//             rating: 4.5,
//             disCount: 30,
//             showDiscount: true,
//         },
//         {
//             id: 8,
//             name: "Norway Chase Low Black Natural",
//             price: 39000,
//             image: sneaker8,
//             venName: 'Ayotunde Ojay',
//             position: 'Vendor',
//             rating: 4.5,
//             disCount: 30,
//             showDiscount: false,
//         },
//         {
//             id: 9,
//             name: "Norway Chase Low Black Natural",
//             price: 39000,
//             image: sneaker9,
//             venName: 'Ayotunde Ojay',
//             position: 'Vendor',
//             rating: 4.5,
//             disCount: 30,
//             showDiscount: false
//         },
//         {
//             id: 10,
//             name: "Norway Chase Low Black Natural",
//             price: 39000,
//             image: sneaker1,
//             venName: 'Ayotunde Ojay',
//             position: 'Vendor',
//             rating: 4.5,
//             disCount: 30,
//             showDiscount: false
//         },
//         {
//             id: 11,
//             name: "Norway Chase Low Black Natural",
//             price: 39000,
//             image: sneaker10,
//             venName: 'Ayotunde Ojay',
//             position: 'Vendor',
//             rating: 4.5,
//             disCount: 30,
//             showDiscount: false
//         },


//     ]

//     const [activePro, setActivePro] = useState<number>(0)
//     const [visibleSneakers, setVisibleSneakers] = useState<number>(7) // Initial number of visible sneakers
//     const [showMore, setShowMore] = useState<boolean>(false)
//     const [show, setShow] = useState<boolean>(false)


//     const handleShowMore = () => {
//         console.log("Show more clicked")
//         if (showMore) {
//             setVisibleSneakers(window.innerWidth <= 768 ? 4 : 7)
//         } else {
//             setVisibleSneakers(Sneakers.length)
//         }
//         setShowMore(!showMore)
//     }

//     const showHover = () => {
//         setShow(!show)
//     }

//     return (
//         <section className='flex justify-center items-center sm:px-10 p-2 mt-[5rem] mx-auto'>
//             <div className='flex justify-start  w-full flex-col gap-2 '>
//                 <div className='flex justify-between w-full'>
//                     <div className='flex flex-col gap-2'>
//                         <p className='poppins-bold md:text-[19px] text-[17px]'>Footwear Collections for Men</p>
//                         <h1 className='poppins-regular md:text-[15px] text-[14px] md:w-[70%] w-[80%]'>Browse and purchase your footwear of choice from our male collection through any available vendor here online</h1>
//                     </div>
//                     <div className='flex gap-4 items-center'>
//                         <div className='flex gap-2 items-center'>
//                             <input type='radio' value=" For Men" className='cursor-pointer' />
//                             <label className='flex md:text-[13px] text-[12px]'>For Men</label>
//                         </div>
//                         <div className='flex gap-2 items-center'>
//                             <input type='radio' value='For Female' className='cursor-pointer' />
//                             <label className='flex md:text-[13px] text-[12px]'>For Women</label>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='flex lg:gap-2 gap-7 mt-[1rem] overflow-auto hide-scrollbar justify-between items-center'>

//                     {
//                         Pro.map((p, i) => (
//                             <div key={i} onClick={() => setActivePro(i)}>
//                                 <button className={`p-3 rounded-md md:text-[16px] text-[14px] w-[90px] md:w-[120px] ${activePro === i ? "bg-[#590209] text-[#FFFFFF]" : "bg-[#F8F8F8] text-[#3E3E3E]"}`}>{p.name}</button>
//                             </div>
//                         ))
//                     }
//                     <div className='flex justify-center'>
//                         <div className='border-2 border-[#8B8A8] bordertoo justify-between flex w-full md:w-fit p-[11px] mt-2 lg:mt-0 items-center md:ml-[7rem] ml-[4rem] relative'>
//                             <input type='text' className='focus:outline-none bg-[#fff] w-fit ' placeholder='search for item' />
//                             <MdSearch size={25} color='#8C3926' className='cursor-pointer ' />
//                         </div>
//                         <div className='flex items-center justify-center'>
//                             <select className='md:p-[10px] p-[9px] bg-[#3E3E3E] text-[#fff] border'>
//                                 <option>All</option>
//                                 <option>Price</option>
//                                 <option>Brand</option>
//                                 <option>Size</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>

//                 <div className='grid lg:grid-cols-4 max-[440px]:grid-cols-1 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 mx-auto w-full gap-4 mt-[2rem] sm:px-10 px-2' >
//                     {activePro === 0 && Sneakers.slice(0, visibleSneakers).map((sneaker) => (
//                         <div key={sneaker.id} className={`border-[1px] border-[#EBE8E8] shadow-md p-2 flex w-full justify-center items-center flex-col gap-2 relative ${show ? '' : 'cursor-pointer hover:cursor-pointer hover:shadow-2xl'}`}>
//                             <div className='flex items-center justify-center'>
//                             <Image src={sneaker.image} alt={sneaker.name} className='flex justify-center items-center text-center'/>

//                             </div>
//                             <div className='flex justify-between w-full items-center p-2'>
//                                 <p className='md:text-[17px] lg:w-3/4 text-[18px] poppins-bold max-[420px]:text-[16px] max-[420px]:w-fit '>{sneaker.name}</p>
//                                 <div className='flex gap-0 items-center'>
//                                     <MdStar size={15} color='#FFB800' />
//                                     <p className='text-[13px] max-[420px]:text-[15px] '>{sneaker.rating}/5</p>
//                                 </div>
//                             </div>
//                             <div className='flex justify-between w-full items-center p-2'>
//                                 <p className='p-[0.4rem] text-[#8C3926] bg-[#F6EEE1] max-[420px]:text-[16px] font-[500] rounded-md text-[15px] md:text-[16px]'>₦{sneaker.price}</p>
//                                 <div className='flex gap-1 items-center' >
//                                     <Image src={avatar} alt='' width={25} height={25} />
//                                     <div className='flex flex-col'>
//                                         <p className='md:text-[15px] text-[15px] text-black max-[420px]:text-[16px]'>{sneaker.venName}</p>
//                                         <p className='text-[15px] text-[#8C3926] max-[420px]:text-[12px]'>{sneaker.position}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className='flex justify-between w-full items-center mt-[0.5rem] p-2'>
//                                 <button className={`p-2 bg-[#DDB5AB] text-[#fff] max-[420px]:text-[18px] rounded-md md:text-[16px] text-[14px] ${show ? '' : 'hover:bg-[#590209]'}`}>Shop Now</button>
//                                 <button className={`p-2 py-[10px] border-[1px] bordr-[#DDB5AB] rounded-md max-[420px]:text-[18px] md:text-[16px] text-[14px] text-[#8C3926] ${show ? '' : 'hover:bg-[#4e3f40] hover:text-[#fff]'}`}>Add to Cart</button>
//                             </div>
//                             {sneaker.showDiscount && (
//                                 <div className='flex justify-between w-full items-center mt-[0.1rem] absolute p-2 top-3'>
//                                     <Image src={fav} alt='' width={30} height={30} className='rounded-full bg-[#F4F2F2]' />
//                                     <p className='p-2 rounded-md text-black md:text-[12px] text-[11px] bg-[#FFB800] mr-2'>{sneaker.disCount}% Discount</p>
//                                 </div>
//                             )}

//                         </div>
//                     )
//                     )
//                     }
//                 </div>
//                 <div className='flex justify-center items-center mt-[2rem] '>
//                     <div className='flex justify-center items-center bg-[#590209] p-2 rounded-md cursor-pointer' onClick={handleShowMore}>
//                         <p className='flex text-center text-[#fff]'>{showMore ? 'See Less' : 'See More'}</p>
//                         {showMore ? <MdKeyboardArrowUp size={25} color='#fff' /> : <MdKeyboardArrowDown size={25} color='#fff' />}
//                     </div>

//                 </div>


//             </div>
//         </section>
//     )
// }

// export default ProPage
