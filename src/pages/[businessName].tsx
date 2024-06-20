import { GetServerSideProps } from 'next';
import VendorPage from '@/components/vendorDashboard/vendorPage';
import image1 from '@/images/LaptopImg.svg'

interface Product {
  name: string;
  image: string;
  price: number;
  description: string;
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
  products: Product[];
  reviews: Review[];
}

interface VendorPageProps {
  vendor: VendorData;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const businessName = context.params?.businessName as string;
  try {
    const response = await fetch(`https://unibackend.onrender.com/api/v1/vendorProfile/vendorPage/${encodeURIComponent(businessName)}`);
    const vendorData = await response.json();

    const vendor: VendorData = {
      name: vendorData.vendor.businessName || '',
      rating: vendorData.vendor.rating || 0,
      description: vendorData.vendor.businessDescription || '',
      products: (vendorData.products || []).map((product: any) => ({
        name: product.name || '',
        image: product.image || '',
        price: product.price || 0,
        description: product.description || '',
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
    return {
      props: {
        vendor: {
          name: '',
          rating: 0,
          products: [],
          reviews: [],
        },
      },
    };
  }
};

export default VendorPage;