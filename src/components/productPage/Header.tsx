import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}


interface NotificationProps {
  message: string;
  isVisible: boolean;
}

const Notification: React.FC<NotificationProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="bg-blue-500 text-white mt-8 px-4 py-2 rounded shadow-lg transition-opacity duration-300">
      {message}
    </div>
  );
};


const Header: React.FC<HeaderProps> = ({
  logo,
  cart,
  user,
  searchIcon,
  headerimg,
  searchValue,
  setSearchValue,
}) => {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
      }, 30000);
    }
  }, []);

  const handleSignup = () => {
    router.push('/signup');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <header className="header">
        <div className="headerbar flex justify-between items-center bg-white py-4 px-4 sm:px-6 lg:px-8">
          <div className="logo">
            <a href='/' className="logo">
              <img src={logo.src} alt="Uniclique" className="w-10" width={logo.width} height={logo.height} />
            </a>
          </div>
          <div className="search rounded-10 relative mr-2 sm:mr-4 sm:flex w-60">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-200 text-gray-700 rounded-10 px-4 py-2"
              value={searchValue}
              onChange={handleSearchChange}
            />
            <div className="searchIcon">
              <img src={searchIcon.src} alt="searchIcon" className="absolute h-5 border-transparent justify-self-end right-0 top-0 mt-3 mr-5 sm:mr-10" width={searchIcon.width} height={searchIcon.height} />
            </div>
          </div>
          <div className="icons flex justify-between items-center">
            <button className="bg-transparent border-none cursor-pointer mr-4">
              <a href='/cartPage'><img src={cart.src} alt="Cart" className="w-6" width={cart.width} height={cart.height} /></a>
            </button>
            <button className="bg-transparent border-none cursor-pointer">
              <a href='/signup'><img src={user.src} alt="User" className="w-6" width={user.width} height={user.height} /></a>
            </button>
          </div>
        </div>
        <div className="headericon">
          <div className={styles.headerTextWrapper}>
            {isNotificationVisible && (
              <button
                className="bg-red-900 hover:bg-blue-700 mt-5 text-white font-bold py-2 px-4 rounded"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            )}
            {/* <h2 className={styles.headerText}><span>SHOP NOW</span></h2> */}
            {/* <h2 className={styles.headerText}><span>FREE DELIVERY TO ALL HOSTELS</span></h2> */}
          </div>
          <img src={headerimg.src} alt="Header" className={styles.headerimg} width={headerimg.width} height={headerimg.height} />
        </div>
      </header>


      {/* <div className='flex'>
<Notification 
        message="Create an account or login"
        isVisible={isNotificationVisible}
      />
      {isNotificationVisible && (
        <button 
          className="fixed bottom-4 right-4 bg-red-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      )}
</div> */}
    </>
  );
};

export default Header;