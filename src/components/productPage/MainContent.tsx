import React from 'react';
import styles from '@/styles/MainContent.module.css';

interface ImageProps {
    src: string;
  }
  
  interface MainContentProps {
    foodIcon: ImageProps;
    clothesIcon: ImageProps;
    booksIcon: ImageProps;
    footwearIcon: ImageProps;
    skincareIcon: ImageProps;
    haircareIcon: ImageProps;
    gadgetsIcon: ImageProps;
    stationeriesIcon: ImageProps;

  }

  const MainContent: React.FC<MainContentProps> = ({
    foodIcon,
    clothesIcon,
    booksIcon,
    footwearIcon,
    skincareIcon,
    haircareIcon,
    gadgetsIcon,
    stationeriesIcon,
  }) => {
  return (
    <div className={styles.mainContent}>
      <div className={styles.categoryIcons}>
        <a href='/category-products?category=fastfood' className={`${styles.categoryIcon} ${styles.categoryIcon1}`}>
          <img src={foodIcon.src} alt="Food" />
          <h3>Food</h3>
        </a>
        <a href='/category-products?category=clothes' className={`${styles.categoryIcon} ${styles.categoryIcon3}`}>
          <img src={clothesIcon.src} alt="Clothes" />
          <h3>Clothes</h3>
        </a>
        <a href='/category-products?category=books' className={`${styles.categoryIcon} ${styles.categoryIcon4}`}>
          <img src={booksIcon.src} alt="Books" />
          <h3>Books</h3>
        </a>
        <a href='/category-products?category=footwear' className={`${styles.categoryIcon} ${styles.categoryIcon2}`}>
          <img src={footwearIcon.src} alt="Footwear" />
          <h3>Footwear</h3>
        </a>
        <a href='/category-products?category=skincare' className={`${styles.categoryIcon} ${styles.categoryIcon3}`}>
          <img src={skincareIcon.src} alt="Skincare" />
          <h3>Skincare</h3>
        </a>
        <a href='/category-products?category=haircare' className={`${styles.categoryIcon1} ${styles.categoryIcon}`}>
          <img src={haircareIcon.src} alt="Haircare" />
          <h3>Haircare</h3>
        </a>
        <a href='/category-products?category=gadgets' className={`${styles.categoryIcon} ${styles.categoryIcon4}`}>
          <img src={gadgetsIcon.src} alt="Gadgets" />
          <h3>Gadgets</h3>
        </a>
        <a href='/category-products?category=stationeries' className={`${styles.categoryIcon} ${styles.categoryIcon2}`}>
          <img src={stationeriesIcon.src} alt="Stationeries" />
          <h3>Stationeries</h3>
        </a>
      </div>
    </div>
  );
};

export default MainContent;
