import React, { useState } from 'react';
import Header from '@/components/homePage/header';
import Footer from '@/components/productPage/Footer';
import { MdArrowBack } from "react-icons/md";
import Image from 'next/image';
import can1 from '@/images/can1.svg';
import can2 from '@/images/can2.svg';
import can3 from '@/images/can3.svg';
import increasecart from '@/images/increasecart.svg';
import decreasecart from '@/images/descrcart.svg';
import Button from '@/components/homePage/button';
import ratingFull from '@/images/Star 4.svg';
import ratingHalf from '@/images/Star 4.svg';
import unifacebook from '@/images/unifacebook.svg';
import unitwitter from '@/images/unitwitter.svg';
import uniinsta from '@/images/uniinsta.svg';
import profile1 from '@/images/profile1.svg'
import profile2 from '@/images/profile2.svg'
import profile3 from '@/images/profile3.svg'
import profile4 from '@/images/profile4.svg'
import FeaturedPro from '@/components/homePage/featuredPro';

const ProductDescription = () => {
    const [mainImage, setMainImage] = useState(can1);

    // Sample reviews data
    const reviews = [
        {
            id: 1,
            profileImage: profile1,
            review: 'Great product! Really satisfied with the quality.',
            rating: 5,
            date: "23/04/24 by Chinoso"
        },
        {
            id: 2,
            profileImage: profile2,
            review: 'Nice shoes, but a bit pricey for my taste.',
            rating: 4,
            date: "23/04/24 by Chinoso"
        },
        {
            id: 3,
            profileImage: profile3,
            review: 'Not bad, but could be better.',
            rating: 3,
            date: "23/04/24 by Chinos"
        },
        {
            id: 4,
            profileImage: profile4,
            review: 'Poor quality, would not recommend.',
            rating: 5,
            date: "23/04/24 by Chinos"
        },
        {
            id: 5,
            profileImage: profile1,
            review: 'Terrible product, would not buy again.',
            rating: 5,
            date: "23/04/24 by Chinos"
        }
    ];

    const renderRatingStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;

        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<Image key={i} src={ratingFull} alt="Full Star" width={15} height={15} />);
        }
        if (hasHalfStar) {
            stars.push(<Image key={stars.length} src={ratingHalf} alt="Half Star" width={15} height={15} />);
        }
        return stars;
    };

    return (
        <section>
            <Header />
            <div className='flex flex-col w-full sm:px-4 px-[.5rem] md:px-[2rem] bg-gray-50'>
                <div className='flex gap-2 items-center cursor-pointer'>
                    <MdArrowBack color='#590209' size={16} />
                    <p className='text-[16px] font-[700] text-[#590209]'>Back Home</p>
                </div>
                <div className='flex flex-col lg:flex-row mt-5'>
                    <div className='w-full lg:w-1/2 grid grid-cols-1 gap-4'>
                        <div className='w-full'>
                            <Image src={mainImage} alt="Main Product Image" className='w-full h-auto md:h-full lg:h-auto' />
                        </div>
                        <div className='grid grid-cols-3 gap-2'>
                            <Image src={can1} alt="Product Image 1" className={`cursor-pointer ${mainImage === can1 ? 'p-1 bg-white rounded-md transform duration-200 hover:scale-100' : ''}`} onClick={() => setMainImage(can1)} />
                            <Image src={can2} alt="Product Image 2" className={`cursor-pointer ${mainImage === can2 ? 'p-1 bg-white rounded-md transform duration-200 hover:scale-100' : ''}`} onClick={() => setMainImage(can2)} />
                            <Image src={can3} alt="Product Image 3" className={`cursor-pointer ${mainImage === can3 ? 'p-1 bg-white rounded-md transform duration-200 hover:scale-100' : ''}`} onClick={() => setMainImage(can3)} />
                        </div>
                    </div>
                    <div className='w-full lg:w-1/2 flex flex-col justify-between gap-[3rem] mt-4 lg:mt-0 lg:pl-5'>
                        <div className='flex flex-col h-full justify-between'>
                            <div className='p-5 flex-1 bg-white rounded-md mb-4'>
                                <h1 className='lg:text-[24px] text-[21px] font-[600] text-[#0D0D0D] mb-[.5rem]'>Preloved LV Premium White Shoe</h1>
                                <h3 className='lg:text-[15px] md:text-[14px] text-[12px] font-[400] text-[#3E3E3E] text-start mb-[1rem]'>This is a pre-owned Louis Vuitton shoe in a classic white color, perfect for adding a touch of luxury to any outfit. Made with genuine leather and boasting timeless design.</h3>
                                <div className='flex lg:gap-4 gap-2 flex-wrap items-center mb-[.5rem]'>
                                    <p className='lg:text-[36px] text-[30px] font-[700] text-[#000000]'>₦ 99,999.99</p>
                                    <s className='text-[#000000] lg:text-[16px] text-[12px] font-[400]'>₦ 199,999.99</s>
                                    <h1 className='p-2 bg-[#F6EEE1] text-[#8C3926] lg:text-[16px] text-[13px]'>-70%</h1>
                                </div>
                                <div className='flex-start flex gap-3 items-center mb-[1rem]'>
                                    <Image src={increasecart} alt='' width={35} height={35} className='cursor-pointer' />
                                    <span className='text-[#000000] lg:text-[16px] text-[14px] font-[400]'>1</span>
                                    <Image src={decreasecart} alt='' width={35} height={35} className='cursor-pointer' />
                                    <p className='text-[#000000] lg:text-[12px] text-[10px] font-[400] pl-4'>3 Units left</p>
                                </div>
                                <div className='flex gap-[2rem] mt-[1.5rem] justify-between w-full'>
                                    <Button text='Buy Now' styles='bg-[#590209] lg:text-[18px] text-[16px] text-white w-1/2' />
                                    <Button text='Add to Cart' styles='bg-white border-[1.2px] border-[#590209] w-1/2' />
                                </div>
                            </div>
                            <div className='p-5 flex-1 flex flex-start flex-col gap-[.6rem] bg-white rounded-md mb-4'>
                                <h1 className='text-start lg:text-[24px] text-[20px] font-[600] text-black'>Arike Pre-order</h1>
                                <div className='flex gap-[.2rem]'>
                                    {renderRatingStars(5)}
                                    <p className='pl-3 lg:text-[16px] text-[14px] font-[400]'>5/5</p>
                                </div>
                                <p className='lg:text-[16px] text-[14px] font-[400] text-[#3E3E3E]'>With a discerning eye for quality and a passion for designer fashion, I source and sell exceptional pre-loved pieces, ensuring authenticity and timeless style.</p>
                            </div>
                            <div className='p-5 flex-1 flex items-center gap-[1rem] bg-white rounded-md'>
                                <h1 className='text-[24px] text-[#0D0D0D] font-[600]'>Share this product</h1>
                                <Image src={unifacebook} alt='' width={30} height={30} className='cursor-pointer' />
                                <Image src={unitwitter} alt='' width={30} height={30} className='cursor-pointer' />
                                <Image src={uniinsta} alt='' width={30} height={30} className='cursor-pointer' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-[3rem]'>
                    <div className='w-full p-5 bg-white rounded-md mb-4'>
                        <h3 className='text-start lg:text-[18px] text-[16px] font-[600] text-black'>Description</h3>
                        <ul className='list-disc list-inside text-[#3E3E3E] lg:text-[16px] text-[14px] font-[400]'>
                            <li className=''>Genuine Louis Vuitton, ensuring unparalleled quality and craftsmanship.</li>
                            <li className=''>Premium white exterior, perfect for adding a touch of elegance to any outfit.</li>
                            <li className=''>A timeless design that will never go out of style.</li>
                            <li className=''>Perfect for elevating your everyday look or adding a touch of luxury to a special occasion.</li>
                        </ul>
                        <h3 className='lg:text-[18px] text-[15px] font-[600] text-black mt-4'>Additional Information:</h3>
                        <ul className='list-disc list-inside text-[#3E3E3E] lg:text-[16px] text-[14px] font-[400]' >
                            <li>Include size and fit details (US, EU, etc.)</li>
                            <li>Mention the original retail price (if known) to highlight the value proposition of the preloved option.</li>
                            <li>Note the material composition (leather, canvas, etc.) for care instructions.</li>
                            <li>(Optional) If available, include the shoe's specific Louis Vuitton model name or reference number. This allows potential buyers to research further.</li>
                        </ul>
                        <h3 className='lg:text-[18px] font-[600] text-black mt-4 '>Photos:</h3>
                        <ul className='list-disc list-inside text-[#3E3E3E] lg:text-[16px] text-[14px] font-[400]'>
                            <li>Include high-quality photos from multiple angles showcasing the shoe's overall condition, any details, and designer logos. </li>
                            <li>Well-lit photos will be essential, especially for capturing the white color accurately.</li>
                        </ul>
                        <h3 className='lg:text-[18px] font-[600] text-black mt-4'>Overall Tone:</h3>
                        <ul className='list-disc list-inside text-[#3E3E3E] lg:text-[16px] text-[14px] font-[400]'>
                            <li>The description should be informative yet aspirational. Highlight the shoe's luxury heritage and timeless design.</li>
                        </ul>
                    </div>
                    <div className='p-5 flex flex-start flex-col h-fit gap-[.6rem] bg-white rounded-md mb-4'>
                        <h1 className='text-start lg:text-[24px] text-[20px] font-[600] text-black'>Product Reviews</h1>
                        {reviews.map(review => (
                            <div key={review.id} className='flex items-start gap-[.5rem] mb-[.5rem]'>
                                <Image src={review.profileImage} alt='Profile Image' width={50} height={50} className='rounded-full' />
                                <div className='flex flex-col w-full'>
                                    <p className='lg:text-[16px] text-[14px] font-[400] text-[#3E3E3E] mb-[.5rem]'>{review.review}</p>
                                    <div className='flex justify-between items-center'>
                                        <div className='flex items-center'>
                                            {renderRatingStars(review.rating)}
                                            <p className='pl-3 lg:text-[16px] text-[14px] font-[400]'>{review.rating}/5</p>
                                        </div>
                                        <p className='lg:text-[14px] text-[12px] font-[400] text-[#8C8C8C]'>{review.date}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <div>
            <FeaturedPro />

            </div>
            <Footer />
        </section>
    );
}

export default ProductDescription;
