import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LazyLoad from 'react-lazy-load';
import Header from '@/components/productPage/Header';
import Footer from '@/components/productPage/Footer';
import ProductCard from './productCard';

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
  vendorLocation: string;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className='gridContainer grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6'>
      {products.map((product, index) => (
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
          vendorLocation={product.vendorLocation}
        />
      ))}
    </div>
  );
};

const CategoryProducts: React.FC = () => {
  const router = useRouter();
  const { category } = router.query;
  const [products, setProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch('https://unibackend-4ebp.onrender.com/api/v1/products');
        const data = await response.json();
        const filteredProducts = data.products.filter(
          (product: Product) => product.category.toLowerCase() === category?.toString().toLowerCase()
        );
        setProducts(filteredProducts);
        setFilteredProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    if (category) {
      fetchProductData();
    }
  }, [category]);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchValue, products]);

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

      <h1 className='text-red-900 uppercase sm:text-4xl text-3xl font-bold text-center text-red-900 my-8 uppercase tracking-wider'>{category}</h1>
      <ProductGrid products={filteredProducts} />

      <LazyLoad>
        <Footer />
      </LazyLoad>
    </div>
  );
};

export default CategoryProducts;