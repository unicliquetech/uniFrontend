"use client"
import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import styles from '@/styles/Product.module.css';
import router from 'next/navigation';
import { useRouter } from 'next/router';

interface Product {
    _id: string;
    image: string | string[];
    name: string;
    price: number;
    discountPrice?: number;
    rating: number;
    deliveryTime: string;
    deliveryNote: string;
    category: string;
    productId: string;
    company: string;
    vendorLocation: string;
}

interface ProductCardProps extends Product { }

function formatDeliveryTime(minutes: number): string {
    if (minutes >= 2880) {
        const days = Math.floor(minutes / 1440);
        return `${days} day${days > 1 ? 's' : ''}`;
    } else if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
        return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
}

function truncateName(name: string, maxWords = 3, maxChars = 25) {
    const words = name.split(' ');
    let result = '';
    let wordCount = 0;

    for (let word of words) {
        if (wordCount >= maxWords || (result + word).length > maxChars) {
            break;
        }
        result += (wordCount > 0 ? ' ' : '') + word;
        wordCount++;
    }

    return result.trim() + (result.length < name.length ? '...' : '');
}

function formatNumberWithCommas(number: number): string {
    return number.toLocaleString('en-US');
}

const ProductCard: React.FC<ProductCardProps> = ({
    _id,
    image,
    name,
    price,
    discountPrice,
    rating,
    deliveryTime,
    deliveryNote,
    productId,
    company,
    vendorLocation,
}) => {
    const [isAdded, setIsAdded] = useState(false);
    const [showFullImage, setShowFullImage] = useState(false);
    const displayPrice = discountPrice || price;
    const discountPercentage = discountPrice
        ? Number(((price - discountPrice) / price * 100).toFixed(1))
        : 0;


    const getImageUrl = (image: string | string[]): string => {
        if (Array.isArray(image)) {
            return image[0] || '';
        }
        return image || '';
    };

    const imageUrl = getImageUrl(image);

    const formattedDeliveryTime = formatDeliveryTime(parseInt(deliveryTime));

    const handleAddToCart = async () => {
        try {
            const cartId = localStorage.getItem('cartId');
            const response = await fetch('https://unibackend-4ebp.onrender.com/api/v1/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartId,
                    productId,
                    quantity: 1,
                    image: imageUrl, 
                    name,
                    price: displayPrice,
                    deliveryTime,
                }),
            });

            if (response.ok) {
                const cartId = await response.json();
                console.log("Cart:", cartId);
                localStorage.setItem('cartId', cartId);
                setIsAdded(true);
                
            } else {
                console.error('Failed to add product to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const handleImageClick = () => {
        setShowFullImage(true);
    };

    const router = useRouter();

    const handleProductClick = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push(`/product/${_id}`);
    };

    return (
        <LazyLoad>
            <div className={styles.productCard}>
                <div className={styles.productCard} >
                    {discountPercentage > 0 && (
                        <div className={styles.discountBadge}>
                            {discountPercentage}% OFF
                        </div>
                    )}
                    <div>
                        <div className={styles.product}>
                            <img 
                                src={imageUrl} 
                                alt={name} 
                                className={styles.productImage} 
                                onClick={handleProductClick}
                                // onClick={handleImageClick}
                            />
                            <div className={styles.productContent}>
                                <div className={styles.productSubheader}>
                                    <p className={styles.productName}>
                                        <b>{truncateName(name)}</b>
                                    </p>
                                    <p className={styles.price}>
                                        ₦{formatNumberWithCommas(displayPrice)}
                                        {discountPercentage > 0 && (
                                            <span className={styles.originalPrice}>₦{formatNumberWithCommas(price)}</span>
                                        )}
                                    </p>
                                </div>
                                <div className={styles.deliveryData}>
                                <p>{formattedDeliveryTime}</p>
                                <p className={styles.vendorLocation}>{vendorLocation}</p>
                                </div>
                                <div className={styles.deliveryData}>
                                    <p>{deliveryNote}</p>
                                    <div className={styles.rating}>
                                        <p>{rating}</p>
                                        <img 
                                            src="https://res.cloudinary.com/da1l4j12k/image/upload/v1716642067/Star_1_ahpoz0.png" 
                                            className={styles.star} 
                                            alt="Rating" 
                                        />
                                    </div>
                                </div>
                                <button 
                                    className={styles.addToCartButton} 
                                    onClick={handleAddToCart} 
                                    disabled={isAdded}
                                >
                                    {isAdded ? 'Added to Cart' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {showFullImage && (
                    <div className={styles.fullImageOverlay} onClick={() => setShowFullImage(false)}>
                        <img src={imageUrl} alt={`${name} full image`} className={styles.fullImage} />
                    </div>
                )}

            </div>
        </LazyLoad>
    );
};

export default ProductCard;