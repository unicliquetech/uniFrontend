import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import shoppingbag from '@/images/shoppingbag.svg'
import fav from '@/images/favourite.svg'
import share from '@/images/share.svg'
import chat from '@/images/chat.svg'
import Button from './button'
import plus from '@/images/bx-plus.svg'

interface FeaturedProductProps {
    _id: string;
    name: string;
    price: number;
    discountPrice: number;
    description: string;
    image: string;
    category: string;
    sponsored: boolean;
    rating: number;
    brand: string;
    deliveryTime: string;
    deliveryNote: string;
    colours: string[];
}

const FeaturedPro: React.FC = () => {
    const [sponsoredProducts, setSponsoredProducts] = useState<FeaturedProductProps[]>([]);
    const [activeColors, setActiveColors] = useState<{[key: string]: number}>({});

    useEffect(() => {
        const fetchSponsoredProducts = async () => {
            try {
                const response = await fetch('https://unibackend.onrender.com/api/v1/products?sponsored=true');
                const data = await response.json();
                const sponsored = data.products.filter((product: FeaturedProductProps) => product.sponsored);
                if (sponsored.length > 0) {
                    setSponsoredProducts(shuffleArray(sponsored));
                }
            } catch (error) {
                console.error('Error fetching sponsored products:', error);
            }
        };

        fetchSponsoredProducts();
    }, []);

    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    if (sponsoredProducts.length === 0) {
        return null;
    }

    return (
        <section className='flex flex-col justify-start gap-3 mt-[5rem]'>
            <div className='flex flex-col gap-3'>
                <div className='sm:px-10 px-5'>
                    <h1 className='md:text-[1.5rem] font-[700]'>Featured Products</h1>
                </div>
                <div className='md:pl-[3rem] pl-[0rem] overflow-x-auto'>
                    <div className='flex gap-6 p-4'>
                        {sponsoredProducts.map((product, index) => (
                            <ProductCard 
                                key={product._id} 
                                product={product} 
                                activeColor={activeColors[product._id] || 0}
                                setActiveColor={(color) => setActiveColors(prev => ({...prev, [product._id]: color}))}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

const ProductCard: React.FC<{ product: FeaturedProductProps, activeColor: number, setActiveColor: (color: number) => void }> = ({ product, activeColor, setActiveColor }) => {
    const {
        _id,
        name,
        price,
        discountPrice,
        description,
        image,
        category,
        sponsored,
        rating,
        brand,
        deliveryTime,
        deliveryNote,
        colours = [],
    } = product;

    const displayPrice = discountPrice || price;
    const discountPercentage = discountPrice
        ? Number(((price - discountPrice) / price * 100).toFixed(1))
        : 0;

    return (
        <div className='flex-shrink-0 w-[300px] bg-[#F2F2F2] p-4 rounded-lg'>
            <Image src={image} alt={name} width={300} height={300} className='w-full h-[200px] object-cover mb-4' />
            <div className='flex flex-col gap-2'>
                <div className='flex justify-between items-center'>
                    {sponsored && <p className='p-1 bg-[#FFB800] font-[500] text-[12px] rounded-[30px]'>Sponsored</p>}
                    <div className='flex gap-2'>
                        <Image src={fav} alt='' width={15} height={15} />
                        <Image src={share} alt='' width={15} height={15} />
                    </div>
                </div>
                <p className='font-bold text-[1.2rem]'>{name}</p>
                <div className='flex gap-2 items-center'>
                    <p className='text-[1.5rem] text-[#8C3926]'>N {displayPrice}</p>
                    {discountPrice > 0 && <s className='text-[0.8rem] text-[#8B8A8A]'>N{price}</s>}
                </div>
                {discountPercentage > 0 && (
                    <p className='text-[#590209] font-bold text-[0.8rem]'>{discountPercentage}% OFF</p>
                )}
                <p className='text-[0.8rem]'>{description.slice(0, 50)}...</p>
                <div className='mt-2'>
                    <h1 className='text-[0.8rem] text-black'>Available Color</h1>
                    <div className='flex gap-1 flex-wrap'>
                        {colours && colours.length > 0 ? (
                            colours.map((col, i) => (
                                <div
                                    key={i}
                                    onClick={() => setActiveColor(i)}
                                    className={`p-1 mt-1 rounded-[5px] cursor-pointer border-[1px] outline-none text-[0.7rem] ${activeColor === i ? 'border-[#000000] text-[#000000]' : 'border-[#858585] text-[#858585]'}`}
                                >
                                    <p>{col}</p>
                                </div>
                            ))
                        ) : (
                            <p className='text-[0.7rem]'>No colors available</p>
                        )}
                    </div>
                </div>
                <div className='flex gap-2 mt-2'>
                    <Button text='Buy now' styles="bg-[#590209] text-white text-[12px] w-[50%]" />
                    <div className='flex gap-1 items-center border-2 border-[#590209] p-1 rounded-md'>
                        <Image src={plus} alt='' width={15} height={15} />
                        <p className='text-[0.7rem] text-[#590209] font-bold'>Add to cart</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeaturedPro