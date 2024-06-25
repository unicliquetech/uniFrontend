import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/Vendor.module.css';
import HeroSection from './HeroSection';
import Footer from '@/components/productPage/Footer';
import logo from '@/images/logo.svg';

interface Product {
  name: string;
  price: number;
  image: string;
  description: string;
}

interface Review {
  userName: string;
  rating: number;
  comment: string;
}

interface VendorData {
  name: string;
  image: string;
  rating: number;
  products: Product[];
  reviews: Review[];
  description: string;
  address: string;
  contact: string;
}

interface VendorPageProps {
  vendor: VendorData;
}

const VendorPage: React.FC<VendorPageProps> = ({ vendor }) => {
  const router = useRouter();
  const [fullImage, setFullImage] = useState<string | null>(null);
  const [newReview, setNewReview] = useState<Review>({
    userName: '',
    rating: 0,
    comment: '',
  });

  const handleImageClick = (imageUrl: string) => {
    setFullImage(imageUrl);
  };


  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const businessName = router.query.businessName as string;
      const { rating, comment } = newReview;
      console.log(newReview.rating);

      // Check if the token is available and not expired
      const email = localStorage.getItem('email');
      if (!email) {
        alert('Please login to submit a review');
        router.push('/login');
      }

      // Send a request to verify the token
      const response = await fetch('https://unibackend.onrender.com/api/v1/vendorProfile/vendorPage/${businessName}/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const { userId } = await response.json();

        // Submit the review with the userId
        const reviewResponse = await fetch(`https://unibackend.onrender.com/api/v1/vendorProfile/vendorPage/${businessName}/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rating, comment, userId }),
        });

        if (reviewResponse.ok) {
          console.log('Review submitted successfully');
          setNewReview({ userName: '', rating: 0, comment: '' });
        } else {
          console.error('Failed to submit review');
        }
      } else {
        alert('Your session has expired. Please login to submit a review');
        router.push('/login');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  if (!vendor) {
    return <div className={styles.container}>Loading...</div>;
  }

  const { name, rating, products, reviews, image, description, address, contact } = vendor;

  return (
    <div className='w-full mt-4 '>
      <div className={styles.header}>
        <div>
          <Image src={logo} alt={name} className={styles.logo} />
        </div>
        <a href='/vendorSignup'> <b>Sell with Uniclique </b> </a>
      </div>
      <HeroSection name={name} description={description} rating={rating} />

      <div className={styles.products}>
        <h2 className={styles.sectionTitle}>Products</h2>
        <div className={styles.productList}>
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            products.map((product) => (
              <div key={product.name} className={styles.productCard}>
                <img
                  className={styles.productImage}
                  src={product.image}
                  alt={product.name}
                  onClick={() => handleImageClick(product.image)}
                />
                <div className={styles.productDetails}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDescription}>
                    {product.description}
                  </p>
                  <p className={styles.productPrice}>
                    ₦{product.price}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>


      <div className={styles.reviewSection}>
        <div className={styles.reviews}>
          <h2 className={styles.sectionTitle}>Reviews</h2>
          <div className={styles.reviewList}>
            {reviews.length === 0 ? (
              <p>No reviews available</p>
            ) : (
              (() => {
                const uniqueReviews = new Set();
                return reviews.filter(review => {
                  const reviewKey = `${review.userName}-${review.rating}-${review.comment}`;
                  if (!uniqueReviews.has(reviewKey)) {
                    uniqueReviews.add(reviewKey);
                    return true;
                  }
                  return false;
                }).map((review, index) => (
                  <div key={index} className={styles.review}>
                    <div className={styles.reviewHeader}>
                      <span className={styles.reviewName}>{review.userName}</span>
                      <span className={styles.reviewRating}>
                        {Array(5)
                          .fill(null)
                          .map((_, i) =>
                            i < review.rating ? (
                              <span key={i}>&#9733;</span>
                            ) : (
                              <span key={i}>&#9734;</span>
                            )
                          )}
                      </span>
                    </div>
                    <p className={styles.reviewComment}>{review.comment}</p>
                  </div>
                ))
              })()
            )}
          </div>



          <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
            <h3 className={styles.formTitle}>Add a Review</h3>
            <div className={styles.formGroup}>
              <label htmlFor="userName" className={styles.formLabel}>
                Name:
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={newReview.userName}
                onChange={handleReviewChange}
                className={styles.formInput}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="rating" className={styles.formLabel}>
                Rating:
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={newReview.rating}
                onChange={handleReviewChange}
                min="1"
                max="5"
                className={styles.formInput}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="comment" className={styles.formLabel}>
                Comment:
              </label>
              <textarea
                id="comment"
                name="comment"
                value={newReview.comment}
                onChange={handleReviewChange}
                className={styles.formTextarea}
                required
              ></textarea>
            </div>
            <button type="submit" className={styles.reviewButton}>
              Submit Review
            </button>
          </form>
        </div>
      </div>

      <footer className='footer bg-red-900'>
        <Footer />
      </footer>

      {fullImage && (
        <div className={styles.fullImageOverlay} onClick={() => setFullImage(null)}>
          <img src={fullImage} alt="Full size image" className={styles.fullImage} />
        </div>
      )}
    </div>
  );
};

export default VendorPage;