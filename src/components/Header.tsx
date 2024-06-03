import React from 'react';
import styles from '@/styles/Header.module.css'

interface ImageProps {
  src: string;
  width: number;
  height: number;
}

interface HeaderProps {
  logo: ImageProps;
  cart: ImageProps;
  user: ImageProps;
  searchIcon: ImageProps;
  headerimg: ImageProps;
}

const Header: React.FC<HeaderProps> = ({
  logo,
  cart,
  user,
  searchIcon,
  headerimg
}) => {
  return (
    <header className="header">
      <div className="headerbar flex justify-between items-center bg-white py-4 px-4 sm:px-6 lg:px-8">
        <div className="logo">
          <div className="logo">
            <img src={logo.src} alt="Uniclique" className="w-10" width={logo.width} height={logo.height} />
          </div>
        </div>
        <div className="search relative mr-2 sm:mr-4 sm:flex w-60">
          <input type="text" placeholder="Search" className="bg-gray-200 text-gray-700 rounded-10 px-4 py-2" />
          <div className="searchIcon">
            <img src={searchIcon.src} alt="searchIcon" className="absolute h-5 border-transparent justify-self-end right-0 top-0 mt-3 mr-5 sm:mr-10" width={searchIcon.width} height={searchIcon.height} />
          </div>
        </div>
        <div className="icons flex justify-between items-center">
          <button className="bg-transparent border-none cursor-pointer mr-4">
            <a href='/'><img src={cart.src} alt="Cart" className="w-6" width={cart.width} height={cart.height}/></a>
          </button>
          <button className="bg-transparent border-none cursor-pointer">
            <img src={user.src} alt="User" className="w-6" width={user.width} height={user.height}/>
          </button>
        </div>
      </div>
      <div className="headericon">
        <div className={styles.headerTextWrapper}>
          <h2 className={styles.headerText}><span>SHOP NOW</span></h2>
        </div>
        <img src={headerimg.src} alt="Header" className={styles.headerimg} width={headerimg.width} height={headerimg.height}/>
      </div>
    </header>
  );
};

export default Header;