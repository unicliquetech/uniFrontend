import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/homePage/header';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  name: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
    {
        name: "Customer Questions",
        items: [
          { question: "How do I create a buyer account?", answer: "You can create a buyer account on our website at uniclique.com.ng/signup" },
          { question: "Is it free to join as a buyer?", answer: "Yes, it's free to join as a buyer." },
          { question: "How do I search for products?", answer: "You can use the search bar on our website to find products." },
          { question: "What payment methods are accepted?", answer: "We currently accept Bank Transfer." },
          { question: "Can I track my order?", answer: "Yes, you can track your order through our uniclique agent" },
          { question: "What is your return policy?", answer: "Our return policy allows returns based on the specifics of the product by the vendor." },
          { question: "How do I contact a seller?", answer: "You can contact sellers through our messaging system on the platform." },
          { question: "Can I buy from multiple vendors in one transaction?", answer: "Yes, you can purchase from multiple vendors in a single transaction." },
        ]
      },
  {
    name: "Vendor Questions",
    items: [
      { question: "How do I sign up as a vendor?", answer: "You can sign up as a vendor at uniclique.com.ng/vendorSignup" },
      { question: "What are the fees for selling on Uniclique?", answer: "The current fee is free" },
      { question: "How do I list my products?", answer: "You can list your products via your personalized vendor dashboard." },
      { question: "Is there a limit to how many items I can list?", answer: "For now, there is a limit of 10 products." },
      { question: "How do I manage my inventory?", answer: "You can manage your inventory from the vendor dashboard." },
      { question: "Can I offer discounts or promotions?", answer: "Yes, you can offer discounts and promotions." },
      { question: "How do I handle shipping?", answer: "You can handle deliveries yourself or outsource it to us." },
      { question: "What payment methods can I accept?", answer: "Currently, we accept Bank Transfer. We also accept cash if you will be delivering yourself." },
    ]
  },
  {
    name: "General Questions",
    items: [
      { question: "What makes Uniclique different from other marketplaces?", answer: "Uniclique is specifically designed for university students and alumni, creating a unique community-driven marketplace." },
      { question: "Is Uniclique only for students?", answer: "While primarily for students, alumni can also use Uniclique." },
      { question: "Do you have a mobile app?", answer: "We are currently developing a mobile app. For now, our website is mobile-friendly." },
      { question: "How do you protect user data and privacy?", answer: "We use industry-standard encryption and security measures to protect user data." },
      { question: "Can alumni use Uniclique?", answer: "Yes, alumni are welcome to use Uniclique." },
      { question: "How do you verify that users are actually students?", answer: "We verify student status through university email addresses and student ID verification." },
      { question: "Can local businesses (non-students) sell on Uniclique?", answer: "Currently, Uniclique is focused on student entrepreneurs." },
      { question: "How can I contact Uniclique customer support?", answer: "You can reach our customer support through the 'Contact Us' page on our website or via an email to unicliquetech@gmail.com" },
    ]
  },
];

const FAQItem: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium">{item.question}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-gray-600"
          >
            {item.answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQComponent: React.FC = () => {
  return (
    <div className="">
        <Header />
      <h1 className="lg:text-4xl text-3xl text-red-900 font-bold text-center mb-12 mt-4">Frequently Asked Questions</h1>
      
      {faqData.map((category, index) => (
        <div key={index} className="mb-12 lg:ml-12 sm:p-6 items-center">
          <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
          <div className="bg-white rounded-lg shadow-md pl-6 pr-6">
            {category.items.map((item, itemIndex) => (
              <FAQItem key={itemIndex} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQComponent;