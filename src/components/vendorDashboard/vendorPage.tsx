// pages/vendor/[vendorName].tsx
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import styles from '@/styles/Vendor.module.css';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';

interface Product {
  name: string;
  price: number;
  description: string;
}

interface Review {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    email: string;
  };
}

interface VendorData {
  vendorName: string;
  description: string;
  products: Product[];
  rating: number;
  numReviews: number;
  reviews: Review[];
}

interface VendorPageProps {
  vendor: VendorData;
  totalPages: number;
  currentPage: number;
  token: string | null;
  userEmail: string | null;
}

const VendorPage: React.FC<VendorPageProps> = ({
  vendor,
  totalPages,
  currentPage,
  token,
  userEmail,
}) => {
  const { vendorName, description, products, rating, numReviews, reviews } =
    vendor;
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [editReview, setEditReview] = useState<Review | null>(null);
  const router = useRouter();

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      console.error('User must be logged in to submit a review.');
      return;
    }

    try {
      const res = await fetch(`/api/v1/vendorPage/${vendorName}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newReview),
      });

      if (res.ok) {
        // Reset the form
        setNewReview({ rating: 0, comment: '' });
        // Fetch the updated vendor data
        router.replace(router.asPath);
      } else {
        console.error('Failed to submit review');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReviewUpdate = async (reviewId: string) => {
    if (!token) {
      console.error('User must be logged in to update a review.');
      return;
    }

    try {
      const res = await fetch(
        `/api/v1/vendorPage/${vendorName}/reviews/${reviewId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editReview),
        }
      );

      if (res.ok) {
        setEditReview(null);
        router.replace(router.asPath);
      } else {
        console.error('Failed to update review');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReviewDelete = async (reviewId: string) => {
    if (!token) {
      console.error('User must be logged in to delete a review.');
      return;
    }

    try {
      const res = await fetch(
        `/api/v1/vendorPage/${vendorName}/reviews/${reviewId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        router.replace(router.asPath);
      } else {
        console.error('Failed to delete review');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePaginationClick = (page: number) => {
    router.push(
      {
        pathname: `/vendor/${vendorName}`,
        query: { page: page.toString() },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className={styles.container}>
      <h1>{vendorName}</h1>
      <div className={styles.vendorInfo}>
        <p className={styles.vendorDescription}>{description}</p>
        <div className={styles.rating}>
          {rating.toFixed(1)} ★
        </div>
        <p>Based on {numReviews} reviews</p>
      </div>

      <div className={styles.productList}>
        {products.map((product) => (
          <div key={product.name} className={styles.productCard}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p className={styles.price}>${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className={styles.reviewSection}>
        <h2>Reviews</h2>
        {token ? (
          <>
            <h3>Leave a Review</h3>
            <form onSubmit={handleReviewSubmit}>
              <div>
                <label htmlFor="rating">Rating:</label>
                <select
                  id="rating"
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({ ...newReview, rating: parseInt(e.target.value) })
                  }
                >
                  <option value={0}>Select a rating</option>
                  <option value={1}>1 ★</option>
                  <option value={2}>2 ★</option>
                  <option value={3}>3 ★</option>
                  <option value={4}>4 ★</option>
                  <option value={5}>5 ★</option>
                </select>
              </div>
              <div>
                <label htmlFor="comment">Comment:</label>
                <textarea
                  id="comment"
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                />
              </div>
              <button type="submit">Submit Review</button>
            </form>
          </>
        ) : (
          <p>Please log in to leave a review.</p>
        )}
        {reviews.map((review) => (
          <div key={review._id} className={styles.review}>
            <div className={styles.reviewHeader}>
              <div>
                <span className={styles.reviewRating}>
                  {review.rating.toFixed(1)} ★
                </span>
                <span> by {review.user.email}</span>
              </div>
              <div>
                {userEmail === review.user.email && (
                  <>
                    <button
                      onClick={() => setEditReview(review)}
                      className={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleReviewDelete(review._id)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
            {editReview?._id === review._id ? (
              <div className={styles.editReviewForm}>
                <label htmlFor="editRating">Rating:</label>
                <select
                  id="editRating"
                  value={editReview.rating}
                  onChange={(e) =>
                    setEditReview({
                      ...editReview,
                      rating: parseInt(e.target.value),
                    })
                  }
                >
                  <option value={1}>1 ★</option>
                  <option value={2}>2 ★</option>
                  <option value={3}>3 ★</option>
                  <option value={4}>4 ★</option>
<option value={5}>5 ★</option>
</select>
<label htmlFor="editComment">Comment:</label>
<textarea
  id="editComment"
  value={editReview.comment}
  onChange={(e) =>
    setEditReview({
      ...editReview,
      comment: e.target.value,
    })
  }
/>
<button
  onClick={() => handleReviewUpdate(editReview._id)}
  className={styles.updateButton}
>
  Update Review
</button>
<button
  onClick={() => setEditReview(null)}
  className={styles.cancelButton}
>
  Cancel
</button>
</div>
) : (
<p className={styles.reviewComment}>{review.comment}</p>
)}
<p className={styles.reviewDate}>
  {new Date(review.createdAt).toLocaleDateString()}
</p>
</div>
))}
<div className={styles.pagination}>
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
    <button
      key={page}
      onClick={() => handlePaginationClick(page)}
      className={page === currentPage ? styles.activePage : ''}
    >
      {page}
    </button>
  ))}
</div>
</div>
</div>
);
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

export default VendorPage;