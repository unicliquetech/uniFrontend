"use client"
import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import styles from '@/styles/Product.module.css';

interface Product {
    _id: string;
    image: string;
    name: string;
    price: number;
    rating: number;
    deliveryTime: string;
    deliveryNote: string;
    category: string;
    productId: string;
    company: string;
  }
  
  interface ProductCardProps extends Product {}
  
  const ProductCard: React.FC<ProductCardProps> = ({
    image,
    name,
    price,
    rating,
    deliveryTime,
    deliveryNote,
    productId,
    company,
  }) => {
    const [isAdded, setIsAdded] = useState(false);
  
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
            price,
            deliveryTime,
          }),
        });
  
        if (response.ok) {
          const { cartId } = await response.json(); // Get the cartId from the response
  
        // Store the cartId in localStorage
        localStorage.setItem('cartId', cartId);
  
        setIsAdded(true);
          // You can also show a success message or update the cart count here
          
        } else {
          console.error('Failed to add product to cart');
        }
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    };
  
    return (
      <div>
        <div className={styles.productCard}>
          <div>
            <div className={styles.product}>
              <img src={image} alt={`${name} image`} className={styles.productImage} />
              <div className={styles.productContent}>
                <div className={styles.productSubheader}>
                  <p className={styles.productName}>
                    <b>{name}</b>
                  </p>
                  <p className={styles.price}>₦{price}</p>
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
      </div>
    );
  };

export default ProductCard