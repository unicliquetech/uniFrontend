import React from 'react';
import styles from '@/styles/HeroSection.module.css';

interface HeroSectionProps {
  name: string;
  description: string;
  rating: number;
  location: string;
  phoneNumber: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ name, description, rating, phoneNumber, location }) => {
  return (
    <section className={styles.hero_section}>
      <div className={styles.hero_container}>
        <h1 className={styles.vendor_name}>{name}</h1>
        <p className={styles.vendor_description}>{description}</p>
        <div className={styles.contact}>
        <p>{phoneNumber}</p>
        <p>{location}</p>
        </div>
        <div className={styles.rating}>
          <span className={styles.rating_value}>{rating.toFixed(1)}</span>
          <span className={styles.stars}>
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <span key={index}>
                  {index < Math.floor(rating) ? '★' : '☆'}
                </span>
              ))}
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;