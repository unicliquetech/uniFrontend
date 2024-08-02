import React from 'react';
import { Suspense, lazy } from 'react';

const Header = lazy(() => import('@/components/homePage/header'));
const Category = lazy(() => import('@/components/homePage/category'));
const Hero = lazy(() => import('@/components/homePage/hero'));
// const Stat = lazy(() => import('@/components/homePage/stat'));
const Product = lazy(() => import('@/components/homePage/product'));
const Why = lazy(() => import('@/components/homePage/why'));
// const ProPage = lazy(() => import('@/components/homePage/proPage'));
const Footer = lazy(() => import('@/components/productPage/Footer'));
const Service = lazy(() => import('@/components/homePage/service'));
const FeaturedPro = lazy(() => import('@/components/homePage/featuredPro'));
const Offer = lazy(() => import('@/components/homePage/offer'));
const Faq = lazy(() => import('@/components/homePage/faq'));
const About = lazy(() => import('@/components/homePage/aboutUs'));
// const ProReav = lazy(() => import('@/components/homePage/proReav'));

const HomePage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}> 
        <Header />
        <Category />
        <Hero />
        {/* <Stat /> */}
        <Product />
        <Why />
        {/* <ProPage /> */}
        <Service />
        <FeaturedPro />
        <Offer />
        <Faq />
        {/* <ProReav /> */}
        <About />
        <Footer />
      </Suspense>
    </div>
  );
};

export default HomePage;
