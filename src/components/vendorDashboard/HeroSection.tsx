import React from 'react';
import styles from '@/styles/HeroSection.module.css';

interface HeroSectionProps {
  name: string;
  description: string;
  rating: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ name, description, rating }) => {
  return (
    <section className={styles.hero_section}>
      <div className={styles.hero_container}>
        <h1 className={styles.vendor_name}>{name}</h1>
        <p className={styles.vendor_description}>{description}</p>
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