import React from 'react';
import styles from '../styles/Header.module.css';

// Import the image types
import { StaticImageData } from 'next/image';

interface HeaderProps {
  logo: StaticImageData;
  cart: StaticImageData;
  user: StaticImageData;
  headerimg: StaticImageData;
  searchIcon: StaticImageData;
}

const Header: React.FC<HeaderProps> = ({
  logo,
  cart,
  user,
  headerimg,
  searchIcon,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerbar}>
        <div className={styles.logo}>
          {/* Use the next/image component for static images */}
          {/* <img src={logo.src} alt="Uniclique" /> */}
        </div>
        <div className={styles.search}>
          <input type="text" placeholder="Search" />
          {/* <img src={searchIcon.src} className={styles.searchIcon} alt="Search Icon" /> */}
        </div>
        <div className={styles.icons}>
          <button className={styles.cartIcon}>
            {/* <img src={cart.src} alt="Cart" /> */}
          </button>
          <button className={styles.userIcon}>
            {/* <img src={user.src} alt="User" /> */}
          </button>
        </div>
      </div>
      <div className={styles.headericon}>
        <div className={styles.headerTextWrapper}>
          <h2 className={styles.headerText}>GET YOUR PRODUCTS ON UNICLIQUE</h2>
        </div>
        {/* <img src={headerimg.src} alt="Header" className={styles.headerImage} /> */}
      </div>
    </header>
  );
};

export default Header;