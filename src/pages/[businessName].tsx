import { GetServerSideProps } from 'next';
import { notFound } from 'next/navigation';
import VendorPage from '@/components/vendorDashboard/vendorPage';
import image1 from '@/images/LaptopImg.svg'

interface Product {
  name: string;
  image: string;
  price: number;
  description: string;
  productId: string;
  deliveryTime: number;
}

interface Review {
  userName: string;
  rating: Number;
  comment: string;
}

interface VendorData {
  name: string;
  description: string;
  rating: number;
  location: string;
  phoneNumber: string;
  products: Product[];
  reviews: Review[];
}

interface VendorPageProps {
  vendor: VendorData;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const businessName = context.params?.businessName as string;
  try {
    const response = await fetch(`https://unibackend-4ebp.onrender.com/api/v1/vendorProfile/vendorPage/${encodeURIComponent(businessName)}`);
    const vendorData = await response.json();

    const vendor: VendorData = {
      name: vendorData.vendor.businessName || '',
      rating: vendorData.vendor.rating || 0,
      description: vendorData.vendor.businessDescription || '',
      location: vendorData.vendor.location || '',
      phoneNumber: vendorData.vendor.phoneNumber || '',
      products: (vendorData.products || []).map((product: any) => ({
        name: product.name || '',
        image: product.image || '',
        price: product.price || 0,
        description: product.description || '',
        productId: product.productId || '',
        deliveryTime: product.deliveryTime || '',
      })),
      reviews: (vendorData.vendor.reviews || []).map((review: any) => ({
        userName: review.userName || null,
        rating: review.rating || 0,
        comment: review.comment || '',
      })),
    };


    return {
      props: {
        vendor,
      },
    };
  } catch (error) {
    console.error('Error fetching vendor data:', error);
    notFound();
  }
};

export default VendorPage;