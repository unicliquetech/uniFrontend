import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProductDescription from '@/components/productPage/ProductDescription';

interface Vendor {
  businessName: string;
  rating: number;
  businessDescription: string;
  phoneNumber: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string[];
  colours: string[];
  rating: number;
  reviews: {
      id: number;
      profileImage: string;
      review: string;
      rating: number;
      date: string;
  }[];
  stockNumber: number;
  productId: string;
  category: string;
  company: string;
  additionalInfo: string[];
  vendor: Vendor;
  refund: boolean;
  deliveryTime: string;
  businessName: string;
  businessDescription: string;
  phoneNumber: string;
}

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      fetchProductData(id as string);
    }
  }, [id]);

  const fetchProductData = async (productId: string) => {
    try {
      const response = await fetch(`https://unibackend.onrender.com/api/v1/products/product/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
      const data = await response.json();
      setProduct(data.product);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return <ProductDescription product={product} />;
};

export default ProductPage;