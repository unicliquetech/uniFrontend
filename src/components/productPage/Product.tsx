"use client";
import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazy-load';
import styles from '@/styles/Product.module.css';
import Header from '@/components/productPage/Header';
import ProductCard from './productCard';
import MainContent from '@/components/productPage/MainContent';
import Footer from '@/components/productPage/Footer';

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

interface ProductWithCategory {
  name: string;
  category: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const productListRef = React.useRef<HTMLDivElement>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredCategories, setFilteredCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('https://unibackend.onrender.com/api/v1/products');
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  useEffect(() => {
    const filtered = filteredProducts.filter(({ name }) =>
      name.toLowerCase().includes(searchValue.toLowerCase())
    );
    const categories = Array.from(new Set(filtered.map(({ category }) => category)));
    setFilteredCategories(categories);
  }, [searchValue, filteredProducts]);

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
      <LazyLoad>
        <Header
          logo={{ src: "https://res.cloudinary.com/daqlpvggg/image/upload/v1717040777/Union_2_calbcm.svg", width: 100, height: 50 }}
          cart={{ src: "https://res.cloudinary.com/daqlpvggg/image/upload/v1717107545/Frame_13_mmlp5r.svg", width: 100, height: 50 }}
          user={{ src: "https://res.cloudinary.com/daqlpvggg/image/upload/v1717107544/Frame_12_gqu2ll.png", width: 100, height: 50 }}
          searchIcon={{ src: "https://res.cloudinary.com/daqlpvggg/image/upload/v1717107952/serachIcon_dpnikd.png", width: 20, height: 10 }}
          headerimg={{ src: "https://res.cloudinary.com/daqlpvggg/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,w_0.5,y_0.18/v1717130829/header_oqwik3.png", width: 1500, height: 10 }}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </LazyLoad>

      <MainContent
        foodIcon={{ src: "https://res.cloudinary.com/daqlpvggg/image/upload/v1717137301/food_owcpar.png" }}
        clothesIcon={{ src: "https://res.cloudinary.com/daqlpvggg/image/upload/v1717137517/plaintees_nyqg9u.png" }}
        booksIcon={{ src: "https://res.cloudinary.com/daqlpvggg/image/upload/v1717043246/fine-leather-journal-notebook-by-holtz-leather-co._1200x_ow6y71.jpg" }}
        footwearIcon={{ src: "https://res.cloudinary.com/daqlpvggg/image/upload/v1717137401/heels_fi1rzk.png" }}
        skincareIcon={{ src: "https://res.cloudinary.com/daqlpvggg/image/upload/b_rgb:590209/c_crop,w_764,h_430,ar_16:9/v1717130829/header_oqwik3.png" }}
        haircareIcon={{ src: "https://res.cloudinary.com/daqlpvggg/image/upload/v1717137427/hairdye_dz7mxh.png" }}
        gadgetsIcon={{ src: "https://res.cloudinary.com/daqlpvggg/image/upload/v1717137412/gadgets_lj1j1h.png" }}
        stationeriesIcon={{ src: "https://res.cloudinary.com/daqlpvggg/image/upload/v1717137288/stationeries_sltpst.png" }}
      />

      <div>
        {filteredCategories.map((category) => (
          <div className={styles.productListContainer} key={category}>
            <div className={styles.productHeaderContainer}>
              <h2 className={styles.category}>{category}</h2>
              <a href={`/category-products?category=${category.toLowerCase()}`} className={styles.viewMoreButton}>
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
                  discountPrice={product.discountPrice}
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

      <LazyLoad>
        <Footer />
      </LazyLoad>
    </div>
  );
};

export default ProductList;