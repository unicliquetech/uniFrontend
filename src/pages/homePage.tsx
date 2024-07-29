import React from 'react';
import Header from '@/components/homePage/header'
import Category from '@/components/homePage/category'
import Hero from '@/components/homePage/hero';
// import Stat from '@/components/homePage/stat';
import Why from '@/components/homePage/why';
import Product from '@/components/homePage/product'
// import ProPage from '@/components/homePage/proPage'
import Footer from '@/components/productPage/Footer';
import Service from '@/components/homePage/service';
import FeaturedPro from '@/components/homePage/featuredPro';
import Offer from '@/components/homePage/offer';
import Faq from '@/components/homePage/faq';
import About from '../components/homePage/aboutUs';
// import ProReav from '@/components/homePage/proReav';
// import { motion, useViewportScroll, useTransform } from "framer-motion";
const HomePage = () => {
  return (
    <div>
     <Header /> 
     <Category />
     <Hero />
     <About />
     <Product />
     {/* <Stat /> */}
     <Why />
     {/* <ProPage /> */}
     <Service />
     <FeaturedPro />
     <Offer />
     <Faq />
     {/* <ProReav /> */}
     <Footer />

    </div>
  );
}

export default HomePage;