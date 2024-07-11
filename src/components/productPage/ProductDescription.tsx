import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/homePage/header';
import Footer from '@/components/productPage/Footer';
import { MdArrowBack } from "react-icons/md";
import Image from 'next/image';
import increasecart from '@/images/increasecart.svg';
import decreasecart from '@/images/descrcart.svg';
import Button from '@/components/homePage/button';
import ratingFull from '@/images/Star 4.svg';
import ratingHalf from '@/images/Star 4.svg';
import unifacebook from '@/images/unifacebook.svg';
import unitwitter from '@/images/unitwitter.svg';
import uniinsta from '@/images/uniinsta.svg';
import FeaturedPro from '@/components/homePage/featuredPro';

interface Vendor {
    businessName: string;
    rating: number;
    businessDescription: string;
}

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    image: string | string[];
    colours: string[];
    rating: number;
    reviews: {
        id: number;
        profileImage: string;
        review: string;
        rating: number;
        date: string;
    }[];
    stockNumber: number;
    category: string;
    company: string;
    additionalInfo: string[];
    vendor: Vendor;
    refund: boolean;
    deliveryTime: string;
}

interface ProductDescriptionProps {
    product: Product;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
    const router = useRouter();
    const { productId } = router.query;
    const initialImage = Array.isArray(product.image) ? product.image[0] : product.image;
    const [mainImage, setMainImage] = useState<string>(initialImage);
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        if (productId) {
            fetchProductData(productId as string);
        }
    }, [productId]);

    const fetchProductData = async (id: string) => {
        try {
            const response = await fetch(`https://unibackend.onrender.com/api/v1/products/product/${id}`);
            const data = await response.json();
            console.log(data.vendor);
            setMainImage(Array.isArray(data.product.image) ? data.product.image[0] : data.product.image);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

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

    if (!product) {
        return <div>Loading...</div>;
    }

    const handleAddToCart = async () => {
        try {
            const cartId = localStorage.getItem('cartId');
            const response = await fetch('https://unibackend.onrender.com/api/v1/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartId,
                    productId: product._id,
                    quantity,
                    image: mainImage,
                    name: product.name,
                    price: product.price,
                    deliveryTime: product.deliveryTime,
                }),
            });

            if (response.ok) {
                const cartId = await response.json();
                localStorage.setItem('cartId', cartId);
                setIsAdded(true);
            } else {
                console.error('Failed to add product to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <section>
            <Header />
            <div className='flex flex-col w-full sm:px-4 px-[.5rem] md:px-[2rem] bg-gray-50'>
                <div className='flex gap-2 items-center cursor-pointer' onClick={() => router.back()}>
                    <MdArrowBack color='#590209' size={16} />
                    <p className='text-[16px] font-[700] text-[#590209]'>Back</p>
                </div>
                <div className='flex flex-col lg:flex-row mt-5'>
                    <div className='w-full lg:w-1/2 grid grid-cols-1 gap-4'>
                        <div className='w-full'>
                            <Image src={mainImage} alt="Main Product Image" width={500} height={500} className='w-full h-auto md:h-full lg:h-auto' />
                        </div>

                        <div className='grid grid-cols-3 gap-2'>
                            {Array.isArray(product.image) ? (
                                product.image.map((img, index) => (
                                    <Image
                                        key={index}
                                        src={img}
                                        alt={`Product Image ${index + 1}`}
                                        width={100}
                                        height={100}
                                        className={`cursor-pointer ${mainImage === img ? 'p-1 bg-white rounded-md transform duration-200 hover:scale-100' : ''}`}
                                        onClick={() => setMainImage(img)}
                                    />
                                ))
                            ) : (
                                <Image
                                    src={product.image}
                                    alt="Product Image"
                                    width={100}
                                    height={100}
                                    className="cursor-pointer p-1 bg-white rounded-md transform duration-200 hover:scale-100"
                                    onClick={() => setMainImage(product.image as string)}
                                />
                            )}
                        </div>
                    </div>
                    <div className='w-full lg:w-1/2 flex flex-col justify-between gap-[3rem] mt-4 lg:mt-0 lg:pl-5'>
                        <div className='flex flex-col h-full justify-between'>
                            <div className='p-5 flex-1 bg-white rounded-md mb-4'>
                                <h1 className='lg:text-[24px] text-[21px] font-[600] text-[#0D0D0D] mb-[.5rem]'>{product.name}</h1>
                                <h3 className='lg:text-[15px] md:text-[14px] text-[12px] font-[400] text-[#3E3E3E] text-start mb-[1rem]'>{product.description}</h3>
                                <div className='flex lg:gap-4 gap-2 flex-wrap items-center mb-[.5rem]'>
                                    <p className='lg:text-[36px] text-[30px] font-[700] text-[#000000]'>₦ {product.price.toFixed(2)}</p>
                                    {product.discountPrice && (
                                        <>
                                            <s className='text-[#000000] lg:text-[16px] text-[12px] font-[400]'>₦ {product.discountPrice.toFixed(2)}</s>
                                            <h1 className='p-2 bg-[#F6EEE1] text-[#8C3926] lg:text-[16px] text-[13px]'>
                                                -{Math.round((1 - product.price / product.discountPrice) * 100)}%
                                            </h1>
                                        </>
                                    )}
                                </div>
                                {/* <div className='flex-start flex gap-3 items-center mb-[1rem]'>
                                    <Image src={increasecart} alt='' width={35} height={35} className='cursor-pointer' />
                                    <span className='text-[#000000] lg:text-[16px] text-[14px] font-[400]'>1</span>
                                    <Image src={decreasecart} alt='' width={35} height={35} className='cursor-pointer' />
                                    <p className='text-[#000000] lg:text-[12px] text-[10px] font-[400] pl-4'>{product.stockNumber} Units left</p>
                                </div> */}


                                 {/* Quantity selector */}
                                 <div className='flex-start flex gap-3 items-center mb-[1rem]'>
                                    <Image src={increasecart} alt='' width={35} height={35} className='cursor-pointer' onClick={() => setQuantity(prev => prev + 1)} />
                                    <span className='text-[#000000] lg:text-[16px] text-[14px] font-[400]'>{quantity}</span>
                                    <Image src={decreasecart} alt='' width={35} height={35} className='cursor-pointer' onClick={() => setQuantity(prev => Math.max(1, prev - 1))} />
                                    <p className='text-[#000000] lg:text-[12px] text-[10px] font-[400] pl-4'>{product.stockNumber} Units left</p>
                                </div>
                                {/* Colors */}
                                <div className='mb-[1rem]'>
                                    <p className='text-[#000000] lg:text-[16px] text-[14px] font-[600] mb-2'>Colors:</p>
                                    <div className='flex gap-2'>
                                        {product.colours.map((color, index) => (
                                            <div key={index} className='w-6 h-6 rounded-full' style={{backgroundColor: color}}></div>
                                        ))}
                                    </div>
                                </div>
                                {/* Refund policy */}
                                <p className='text-[#000000] lg:text-[14px] text-[12px] font-[400] mb-[1rem]'>
                                    Refund: {product.refund ? 'Yes' : 'No'}
                                </p>
                                {/* Buttons */}
                                <div className='flex gap-[2rem] mt-[1.5rem] justify-between w-full'>
                                    <Button text='Buy Now' styles='bg-[#590209] lg:text-[18px] text-[16px] text-white w-1/2' />
                                    <Button text={isAdded ? 'Added to Cart' : 'Add to Cart'} styles='bg-white border-[1.2px] border-[#590209] w-1/2' onClick={handleAddToCart} />
                                </div>
                            </div>
                            {/* Vendor info */}
                            <div className='p-5 flex-1 flex flex-start flex-col gap-[.6rem] bg-white rounded-md mb-4'>
                                <h1 className='text-start lg:text-[24px] text-[20px] font-[600] text-red'>{product.vendor.businessName}</h1>
                                <h1 className='text-start lg:text-[24px] text-[20px] font-[600] text-red'>{product.vendor.businessDescription}</h1>
                                <div className='flex gap-[.2rem]'>
                                    <h1 className='text-start lg:text-[24px] text-[20px] font-[600] text-red-900'>Vendor Ratings: </h1>
                                    {renderRatingStars(5)}
                                    <p className='pl-3 lg:text-[16px] text-[14px] font-[400]'>{product.vendor.rating}/5</p>
                                </div>
                            </div>
                                
                                {/* <div className='flex gap-[2rem] mt-[1.5rem] justify-between w-full'>
                                    <Button text='Buy Now' styles='bg-[#590209] lg:text-[18px] text-[16px] text-white w-1/2' />
                                    <Button text='Add to Cart' styles='bg-white border-[1.2px] border-[#590209] w-1/2' />
                                </div>
                            </div>
                            <div className='p-5 flex-1 flex flex-start flex-col gap-[.6rem] bg-white rounded-md mb-4'>
                                <h1 className='text-start lg:text-[24px] text-[20px] font-[600] text-black'>{product.company}</h1>
                                <div className='flex gap-[.2rem]'>
                                    {renderRatingStars(product.rating)}
                                    <p className='pl-3 lg:text-[16px] text-[14px] font-[400]'>{product.rating}/5</p>
                                </div>
                                <p className='lg:text-[16px] text-[14px] font-[400] text-[#3E3E3E]'>With a discerning eye for quality and a passion for designer fashion, we source and sell exceptional pre-loved pieces, ensuring authenticity and timeless style.</p>
                            </div> */}
                            {/* <div className='p-5 flex-1 flex items-center gap-[1rem] bg-white rounded-md'>
                                <h1 className='text-[24px] text-[#0D0D0D] font-[600]'>Share this product</h1>
                                <Image src={unifacebook} alt='' width={30} height={30} className='cursor-pointer' />
                                <Image src={unitwitter} alt='' width={30} height={30} className='cursor-pointer' />
                                <Image src={uniinsta} alt='' width={30} height={30} className='cursor-pointer' />
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-[3rem]'>

                    <div className='p-5 flex flex-start flex-col h-fit gap-[.6rem] bg-white rounded-md mb-4'>
                        {/* <h1 className='text-start lg:text-[24px] text-[20px] font-[600] text-black'>Product Reviews</h1>
                        {product.reviews.map(review => (
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
                        ))} */}
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