// import React, { useRef } from 'react';
// import sneakers from '@/images/sneakers.svg';
// import yellowbag from '@/images/yellowbag.svg';
// import gadget from '@/images/gadgets.svg';
// import laptop from '@/images/laptop.svg';
// import fav from '../../images/favourite.svg';
// import { MdStar } from 'react-icons/md';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import Image from 'next/image';

// const ProReav = () => {
//     const scrollContainerRef = useRef(null);

//     const proRv = [
//         {
//             id: 1,
//             image01: sneakers,
//             price: "N 39,000",
//             des: "Norway Chase Low Black Natural",
//             ratings: 4.5
//         },
//         {
//             id: 2,
//             image01: gadget,
//             price: "N 79,000",
//             des: "Huawei 16S Android Phone",
//             ratings: 4.5
//         },
//         {
//             id: 3,
//             image01: yellowbag,
//             price: "N 39,000",
//             des: "Bon JeanBanana Handbag",
//             ratings: 4.5
//         },
//         {
//             id: 4,
//             image01: laptop,
//             price: "N 339,000",
//             des: "MacBook Pro 16-Inch, Apple M3",
//             ratings: 4.5
//         },
//         {
//             id: 5,
//             image01: gadget,
//             price: "N 79,000",
//             des: "Huawei 16S Android Phone",
//             ratings: 4.5
//         },
//         {
//             id: 6,
//             image01: yellowbag,
//             price: "N 39,000",
//             des: "Bon JeanBanana Handbag",
//             ratings: 4.5
//         },
//         {
//             id: 7,
//             image01: laptop,
//             price: "N 339,000",
//             des: "MacBook Pro 16-Inch, Apple M3",
//             ratings: 4.5
//         },
//     ];

//     const scrollLeft = () => {
//         if (scrollContainerRef.current) {
//             (scrollContainerRef.current as HTMLElement).scrollBy({ left: -200, behavior: 'smooth' });
//         }
//     };
    
//     const scrollRight = () => {
//         if (scrollContainerRef.current) {
//             (scrollContainerRef.current as HTMLElement).scrollBy({ left: 200, behavior: 'smooth' });
//         }
//     };

//     return (
//         <section className='relative sm:px-10 px-5 bg-[#FFFFFF] mt-[5rem]'>
//             <button onClick={scrollLeft} className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#F9F8F8] p-4 rounded-full shadow-md '>
//                 <FaChevronLeft size={20} color='#AAA6A6'/>
//             </button>
//             <div ref={scrollContainerRef} className='flex md:gap-[4rem] gap-[2rem] overflow-auto hide-scrollbar'>
//                 {
//                     proRv.map((pro, i) => (
//                         <div key={i} className='border-2 border-[#8B8A8A/50%] p-[2rem] min-w-[200px]'>
//                             <Image src={pro.image01} alt={pro.des} />
//                             <p className='p-2 font-bold text-[#8C3926] bg-[#F6EEE1] text-[.7rem] text-center mt-[1.3rem]'>{pro.price}</p>
//                             <h1 className='md:text-[1rem] text-[1rem] mt-[1rem] text-center text-bold text-black '>{pro.des}</h1>
//                             <div className='flex items-center justify-center mt-[.5rem]'>
//                                 <MdStar color="#FFB800" size={15} />
//                                 <p className='text-[.8rem]'>{pro.ratings}/5</p>
//                             </div>
//                         </div>
//                     ))
//                 }
//             </div>
//             <button onClick={scrollRight} className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#F9F8F8] p-4 rounded-full shadow-md'>
//             <FaChevronRight size={20} color='#AAA6A6'/>
//             </button>
//         </section>
//     );
// }

// export default ProReav;
