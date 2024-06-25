"use client"
import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import styles from '@/styles/Product.module.css';

interface Product {
    _id: string;
    image: string;
    name: string;
    price: number;
    discountPrice?: number;
    rating: number;
    deliveryTime: string;
    deliveryNote: string;
    category: string;
    productId: string;
    company: string;
}

interface ProductCardProps extends Product { }

const ProductCard: React.FC<ProductCardProps> = ({
    image,
    name,
    price,
    discountPrice,
    rating,
    deliveryTime,
    deliveryNote,
    productId,
    company,
}) => {
    const [isAdded, setIsAdded] = useState(false);
    const [showFullImage, setShowFullImage] = useState(false);
    const displayPrice = discountPrice || price;
    const discountPercentage = discountPrice
        ? Number(((price - discountPrice) / price * 100).toFixed(1))
        : 0;


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


    const handleAddToCart = async () => {
        try {
            const response = await fetch('https://unibackend.onrender.com/api/v1/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId,
                    quantity: 1,
                    image,
                    name,
                    price: displayPrice,
                    deliveryTime,
                }),
            });

            if (response.ok) {
                const { cartId } = await response.json();
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

    return (
        <LazyLoad>
            <div>
                <div className={styles.productCard}>
                    {discountPercentage > 0 && (
                        <div className={styles.discountBadge}>
                            {discountPercentage}% OFF
                        </div>
                    )}
                    <div>
                        <div className={styles.product}>
                            <img
                                src={image}
                                alt={`${name} image`}
                                className={styles.productImage}
                                onClick={handleImageClick}
                            />
                            <div className={styles.productContent}>
                                <div className={styles.productSubheader}>
                                    <p className={styles.productName}>
                                        <b>{truncateName(name)}</b>
                                    </p>
                                    <p className={styles.price}>
                                        ₦{displayPrice}
                                        {discountPrice && (
                                            <span className={styles.originalPrice}>₦{price}</span>
                                        )}
                                    </p>
                                </div>
                                <p>{deliveryTime} minutes</p>
                                <div className={styles.deliveryData}>
                                    <p>{deliveryNote}</p>
                                    <div className={styles.rating}>
                                        <p>{rating}</p>
                                        <img src="https://res.cloudinary.com/da1l4j12k/image/upload/v1716642067/Star_1_ahpoz0.png" className={styles.star} alt="Rating" />
                                    </div>
                                </div>
                                <button className={styles.addToCartButton} onClick={handleAddToCart} disabled={isAdded}>
                                    {isAdded ? 'Added to Cart' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {showFullImage && (
                    <div className={styles.fullImageOverlay} onClick={() => setShowFullImage(false)}>
                        <img src={image} alt={`${name} full image`} className={styles.fullImage} />
                    </div>
                )}
            </div>
        </LazyLoad>
    );
};

export default ProductCard;