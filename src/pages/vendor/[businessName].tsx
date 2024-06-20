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
  author: string;
  rating: number;
  comment: string;
}

interface VendorData {
  name: string;
  rating: number;
  products: Product[];
  reviews: Review[];
}

interface VendorPageProps {
  vendor: VendorData;
}

export const getServerSideProps: GetServerSideProps<VendorPageProps> = async (context) => {
  const businessName = context.params?.businessName as string;

  try {
    // Make an API call to fetch the vendor data
    const response = await fetch(`https://unibackend.onrender.com/api/v1/vendorProfile/vendorPage/${businessName}`);
    const vendorData = await response.json();

    // Extract the necessary data from the API response
    const vendor: VendorData = {
      name: vendorData.vendor.businessName,
      rating: vendorData.vendor.rating,
      products: vendorData.products.map((product: any) => ({
        name: product.name,
        image: product.image,
        price: product.price,
        description: product.description,
      })),
      reviews: vendorData.vendor.reviews.map((review: any) => ({
        author: review.user.email,
        rating: review.rating,
        comment: review.comment,
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