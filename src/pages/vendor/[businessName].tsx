import React from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import VendorPage from '@/components/vendorDashboard/vendorPage';

interface VendorPageProps {
  vendor: any; // Replace with the actual Vendor interface
  totalPages: number;
  currentPage: number;
  token: string | null;
  userEmail: string | null;
}

const VendorBusinessPage: React.FC<VendorPageProps> = (props) => {
  return <VendorPage {...props} />;
};

export const getServerSideProps: GetServerSideProps<VendorPageProps> = async (
  context
) => {
  const businessName = context.params?.businessName as string;
  const page = parseInt(context.query.page as string) || 1;
  const limit = 5; // Number of reviews per page
  const skip = (page - 1) * limit;

  const res = await fetch(
    `http://localhost:3000/api/v1/vendorPage/${businessName}?page=${page}&limit=${limit}`
  );
  const vendor = await res.json();

  const cookies = parseCookies(context);
  const token = cookies.token || null;
  const userEmail = cookies.userEmail || null;

  const totalReviews = vendor.reviews.length;
  const totalPages = Math.ceil(totalReviews / limit);

  return {
    props: {
      vendor,
      totalPages,
      currentPage: page,
      token,
      userEmail,
    },
  };
};

export default VendorBusinessPage;