import React, { useState, useEffect, useCallback } from 'react';
import * as gtag from '../../../lib/gtag';
import { useRouter } from 'next/router';
import Header from '@/components/homePage/header';
import Footer from '@/components/productPage/Footer';
import { MdArrowBack } from "react-icons/md";
import Image from 'next/image';
import styles from '@/styles/Vendor.module.css';
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
    phoneNumber: string;
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
    productId: string;
    company: string;
    additionalInfo: string[];
    vendor: Vendor;
    refund: boolean;
    deliveryTime: string;
    businessName: string;
    businessDescription: string;
    phoneNumber: string;
}

interface ProductDescriptionProps {
    product: Product;
}

function formatNumberWithCommas(number: number): string {
    return number.toLocaleString('en-US');
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ product }) => {
    const router = useRouter();
    const { productId } = router.query;
    const initialImage = Array.isArray(product.image) ? product.image[0] : product.image;
    const [mainImage, setMainImage] = useState<string>(initialImage);
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [showWhatsAppIcon, setShowWhatsAppIcon] = useState(true);
    const [showCopiedMessage, setShowCopiedMessage] = useState(false);

    useEffect(() => {
        if (productId) {
            fetchProductData(productId as string);
        }
    }, [productId]);

    const fetchProductData = async (id: string) => {
        try {
            const response = await fetch(`https://unibackend.onrender.com/api/v1/products/product/${id}`);
            const data = await response.json();
            console.log(data);
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
                    productId: product.productId,
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
                gtag.event({
                    action: 'add_to_cart',
                    category: 'Ecommerce',
                    label: product.name,
                    value: product.price * quantity
                });
                setIsAdded(true);
                alert('Added To Cart');
            } else {
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Failed to add product to cart:', response.status, errorText);
                    alert('Failed to add product to cart. Please try again.');
                    return;
                }
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowWhatsAppIcon(true);
            } else {
                setShowWhatsAppIcon(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleWhatsAppClick = () => {
        const whatsappUrl = `https://wa.me/${product.vendor.phoneNumber}`;
        window.open(whatsappUrl, '_blank');
    };


    const shareProduct = useCallback(async (platform: string) => {
        const shareUrl = window.location.href;
        const shareText = `Check out this product: ${product.name}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: shareText,
                    url: shareUrl,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback for browsers that don't support Web Share API
            let url = '';
            switch (platform) {
                case 'facebook':
                    url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                    break;
                case 'twitter':
                    url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
                    break;
                case 'instagram':
                    await navigator.clipboard.writeText(shareUrl);
                    setShowCopiedMessage(true);
                    setTimeout(() => setShowCopiedMessage(false), 2000);
                    return;
                default:
                    return;
            }
            window.open(url, '_blank');
        }
    }, [product.name]);

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
                                    <p className='lg:text-[36px] text-[30px] font-[700] text-[#000000]'>
                                        ₦ {formatNumberWithCommas(product.discountPrice || product.price)}
                                    </p>
                                    {product.discountPrice && (
                                        <>
                                            <s className='text-[#000000] lg:text-[16px] text-[12px] font-[400]'>
                                                ₦ {formatNumberWithCommas(product.price)}
                                            </s>
                                            <h1 className='p-2 bg-[#F6EEE1] text-[#8C3926] lg:text-[16px] text-[13px]'>
                                                -{Math.round((1 - product.discountPrice / product.price) * 100)}%
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
                                            <div key={index} className='w-6 h-6 rounded-full' style={{ backgroundColor: color }}></div>
                                        ))}
                                    </div>
                                </div>
                                {/* Refund policy */}
                                <p className='text-[#000000] lg:text-[14px] text-[12px] font-[400] mb-[1rem]'>
                                    Refund: {product.refund ? 'Yes' : 'No'}
                                </p>
                                {/* Buttons */}
                                <div className='flex gap-[2rem] mt-[1.5rem] justify-between w-full'>
                                    <button
                                        className='bg-[#590209] lg:text-[18px] text-[16px] text-white w-1/2'
                                        onClick={() => {
                                            gtag.event({
                                                action: 'buy_now',
                                                category: 'Ecommerce',
                                                label: product.name,
                                                value: product.price * quantity
                                            });
                                            handleAddToCart();
                                            // Redirect to cart page
                                            window.location.href = '/cartPage';
                                        }}
                                        disabled={isAdded}
                                    >
                                        Buy Now
                                    </button>
                                    <button className='bg-white border-[1.2px] border-[#590209] w-1/2' onClick={handleAddToCart} disabled={isAdded}> {isAdded ? 'Added to Cart' : 'Add to Cart'} </button>
                                </div>
                            </div>
                            {/* Vendor info */}
                            <div className='p-5 flex-1 flex flex-start flex-col gap-[.6rem] text-red-900 bg-white rounded-md mb-4'>
                                <h1 className='text-start lg:text-[24px] text-[22px] font-[600] text-red-900'>{product.vendor.businessName}</h1>
                                <div className='flex gap-[.2rem]'>
                                    {renderRatingStars(5)}
                                    {/* <p className='pl-3 lg:text-[16px] text-[14px] font-[400]'>{product.vendor.rating}/5</p> */}
                                </div>
                                <h1 className='text-start lg:text-[20px] text-[18px] font-[600] text-red-900'>{product.vendor.businessDescription}</h1>
                                <h1 className='flex text-start lg:text-[24px] text-[22px] font-[600] text-red-900'>Message Vendor Here:
                                    {showWhatsAppIcon && (
                                        <div
                                            className='ml-8'
                                            onClick={handleWhatsAppClick}
                                        >
                                            <img
                                                src="https://res.cloudinary.com/daqlpvggg/image/upload/v1720351514/1200px-WhatsApp.svg_xaqyay.png"
                                                alt="WhatsApp"
                                                width={40}
                                                height={40}
                                            />
                                        </div>
                                    )}
                                </h1>


                                <div className='pt-1 flex-1 flex items-center gap-[1rem] bg-white rounded-md'>
                                    <h1 className='text-[24px] text-[#0D0D0D] font-[600]'>Share this product</h1>
                                    <Image
                                        src={unifacebook}
                                        alt='Share on Facebook'
                                        width={30}
                                        height={30}
                                        className='cursor-pointer'
                                        onClick={() => shareProduct('facebook')}
                                    />
                                    <Image
                                        src={unitwitter}
                                        alt='Share on Twitter'
                                        width={30}
                                        height={30}
                                        className='cursor-pointer'
                                        onClick={() => shareProduct('twitter')}
                                    />
                                    <Image
                                        src={uniinsta}
                                        alt='Share on Instagram'
                                        width={30}
                                        height={30}
                                        className='cursor-pointer'
                                        onClick={() => shareProduct('instagram')}
                                    />
                                    {showCopiedMessage && (
                                        <span className="text-green-500 ml-2">URL copied!</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Component */}
                {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-[3rem]'>

                    <div className='p-5 flex flex-start flex-col h-fit gap-[.6rem] bg-white rounded-md mb-4'>
                        <h1 className='text-start lg:text-[24px] text-[20px] font-[600] text-black'>Product Reviews</h1>
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
                        ))}
                    </div>
                </div> */}
            </div>
            <div>
                <FeaturedPro />
            </div>
            <Footer />
        </section>
    );
}

export default ProductDescription;