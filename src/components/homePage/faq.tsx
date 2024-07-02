import React, { useState } from 'react';
import faqImg from '../../images/faq.svg'
import Image from 'next/image';
import minus from '../../images/minusfaq.svg'

const faqData = [
  {
    question: "What is Uniclique about",
    answer: "We offer a variety of services including branding, marketing, order management, and online store creation to boost your business."
  },
  {
    question: "How does Uniclique work?",
    answer: "You can get started by clicking the 'Get Started' button on our homepage and following the registration process."
  },
  {
    question: "How do i get started as a seller on Uniclique?",
    answer: "Our pricing model is flexible and based on the services you choose. Contact our sales team for a detailed quote."
  },
  {
    question: "What kind of business can join Uniclique?",
    answer: "Yes, we offer 24/7 customer support to assist you with any issues or questions you may have."
  },
  {
    question: "How do i promote my business on Uniclique?",
    answer: "We have got you covered in the promotion department! Uniclique offers marketing tools and tips to help your business shine brightly through social media marketing bringing the face of your product to the world."
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
