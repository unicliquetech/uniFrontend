import React from 'react';
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
     <Header /> 
     <Category />
     <Hero />
     <Product />
     {/* <Stat /> */}
     <Why />
     {/* <ProPage /> */}
     <Footer />
    </div>
  );
}

export default HomePage;