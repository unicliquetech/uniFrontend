import React from 'react';
import LazyLoad from 'react-lazy-load';
import Header from '@/components/homePage/header'
import Category from '@/components/homePage/category'
import Hero from '@/components/homePage/hero';
// import Stat from '@/components/homePage/stat';
import Why from '@/components/homePage/why';
import Product from '@/components/homePage/product'
// import ProPage from '@/components/homePage/proPage'
import Footer from '@/components/productPage/Footer';
const HomePage = () => {
  return (
    <div>
      <LazyLoad>
     <Header /> 
     </LazyLoad>
     <LazyLoad>
     <Category />
     </LazyLoad>
     <LazyLoad>
     <Hero />
     </LazyLoad>
     <LazyLoad>
     <Product />
     </LazyLoad>
     {/* <Stat /> */}
     <LazyLoad>
     <Why />
     </LazyLoad>
     {/* <ProPage /> */}
     <LazyLoad>
     <Footer />
     </LazyLoad>
    </div>
  );
}

export default HomePage;