import React, { useState } from 'react';
import faqImg from '../../images/faq.svg'
import Image from 'next/image';
import minus from '../../images/minusfaq.svg'

const faqData = [
  {
    question: "What is Uniclique about",
    answer: "Unicliche is an amazing ecommerce hosting platform tailor-made for innovative student entrepreneurs. We provide a dynamic space where students can effortlessly showcase and sell their businesses to the university community. We offer a variety of services including branding, marketing, order management, and online store creation to boost your business."
  },
  {
    question: "How does Uniclique work?",
    answer: "Uniclique works to help reduce stress and help buyers make informed purchasing decisions. Once you add a product to your cart and checkout your cart, your order will be sent to the vendor who will confirm your order and deliver your products to you."
  },
  {
    question: "How do i get started as a seller on Uniclique?",
    answer: "First, head over to our website and find the 'Get Started' button. Fill out the sign-up form with your passion for business, and we'll guide you through the rest. Once you've completed the verification process and added your products, voilà! Your business gets a front-row seat in our vibrant marketplace, and you're officially part of the Unicliche family"
  },
  {
    question: "What kind of business can join Uniclique?",
    answer: "We welcome all sorts of creative businesses with open arms. Whether you're into fashion, tech, handmade crafts, delicious treats, or any other entrepreneurial pursuit, Unicliche is your stage. Our diverse community loves to explore unique products and experiences, so let your imagination run wild"
  },
  {
    question: "How do i promote my business on Uniclique?",
    answer: "We have got you covered in the promotion department. Uniclique offers marketing tools and tips to help your business shine brightly through social media marketing bringing the face of your product to the world."
  },
];

const FaqPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="p-8 bg-[#590209] mt-[5rem]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-[#590209] flex flex-col justify-between items-start shadow-md">
                <div className='flex justify-between w-full items-center p-[.5rem]'>
                    <h3 className="md:text-[1.4rem] text-[1rem] text-white font-[700]">{faq.question}</h3>
                    <Image src={openFaq=== index ? minus: faqImg} alt=" " className="w-[40px] h-[40px]" onClick={() => toggleFaq(index)}/>
                    
                </div>
                {openFaq === index && (
                <p className="mt-2 text-white p-[.5rem] md:text-[1rem] text-[.7rem] w-[70%]">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqPage;
