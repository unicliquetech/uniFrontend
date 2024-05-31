"use client"
import React, { useEffect, useState } from 'react';
import styles from '../styles/Product.module.css';
import Header from '@/components/Header';

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
  console.log('Rendering ProductCard for:', name);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/cart', {
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
        }),
      });

      if (response.ok) {
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

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const productListRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  const handleScroll = (direction: 'left' | 'right', category: string) => {
    const containerWidth = productListRef.current?.offsetWidth || 0;
    const scrollAmount = direction === 'left' ? -containerWidth : containerWidth;
    const categoryRef = document.getElementById(`category-${category}`);
    categoryRef?.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const getProductsByCategory = (category: string) => {
    return products.filter((product) => product.category === category);
  };

  return (
    <div>
      <Header
        logo={{ src: "https://res.cloudinary.com/daqlpvggg/image/upload/v1717040777/Union_2_calbcm.svg", width: 100, height: 50,}}
        cart={{ src: "https://res.cloudinary.com/daqlpvggg/image/upload/v1717107545/Frame_13_mmlp5r.svg",
          width: 100, 
          height: 50,
        }}
        user={{
          src: "https://res.cloudinary.com/daqlpvggg/image/upload/v1717107544/Frame_12_gqu2ll.png",
          width: 100, 
          height: 50,
        }}
        searchIcon={{
          src: "https://res.cloudinary.com/daqlpvggg/image/upload/v1717107952/serachIcon_dpnikd.png",
          width: 20, 
          height: 10,
        }}
        headerimg={{
          src: "https://res.cloudinary.com/daqlpvggg/image/upload/b_rgb:590209/c_crop,w_764,h_430,ar_16:9/v1717130829/header_oqwik3.png",
          width: 2000, 
          height: 50,
        }}
      />
    <div>
      {Array.from(new Set(products.map((product) => product.category))).map((category) => (
        <div className={styles.productListContainer} key={category}>
          <div className={styles.productHeaderContainer}>
            <h2 className={styles.category}>{category}</h2>
            <a href="https://product-page-u6mz.vercel.app/" className={styles.viewMoreButton}>
              View More
            </a>
          </div>
          <div className={styles.scrollContainer}>
            <button
              className={`${styles.scrollButton} ${styles.leftButton}`}
              onClick={() => handleScroll('left', category)}
              aria-label={`Scroll Left for ${category}`}
            >
              &lt;
            </button>
            <button
              className={`${styles.scrollButton} ${styles.rightButton}`}
              onClick={() => handleScroll('right', category)}
              aria-label={`Scroll Right for ${category}`}
            >
              &gt;
            </button>
          </div>
          <div className={styles.productList} id={`category-${category}`} ref={productListRef}>
            {getProductsByCategory(category).map((product, index) => (
              <ProductCard
                key={index}
                _id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                deliveryTime={product.deliveryTime}
                deliveryNote={product.deliveryNote}
                category={product.category}
                productId={product.productId}
                company={product.company}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ProductList;



