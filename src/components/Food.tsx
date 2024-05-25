import React, { useEffect, useState } from 'react';
import styles from '@/styles/MainContent.module.css';
// import star from '/assets/Star 1.png';

interface Product {
  _id: string;
  image: string;
  name: string;
  price: number;
  rating: number;
  deliveryTime: string;
  deliveryNote: string;
  category: string;
}

interface ProductCardProps extends Product {}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  name,
  price,
  rating,
  deliveryTime,
  deliveryNote,
}) => {
  return (
    <div className={styles.productCard}>
      <a href="/">
        <div className={styles.product}>
          <img src={image} alt={`${name} image`} className={styles.productImage} />
          <div className={styles.productContent}>
            <p className={styles.productName}>
              <b>{name}</b>
            </p>
            <p>₦{price}</p>
            <p>{deliveryTime}</p>
            <div className={styles.deliveryData}>
              <p>{deliveryNote}</p>
              <div className={styles.rating}>
                <p>{rating}</p>
                {/* <img src={star} className={styles.star} /> */}
              </div>
            </div>
          </div>
        </div>
      </a>
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
      {Array.from(new Set(products.map((product) => product.category))).map((category) => (
        <div className={styles.productListContainer} key={category}>
          <div className={styles.productHeaderContainer}>
            <h2>{category}</h2>
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
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
