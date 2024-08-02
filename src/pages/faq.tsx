import React from 'react';
import Head from 'next/head';
import FAQComponent from '@/components/productPage/Faq';

const FAQPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Uniclique FAQ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <FAQComponent />
      </main>
    </div>
  );
};

export default FAQPage;