"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import SummaryStep from './summaryStep';
import PaymentStep from './paymentStep';
import AddressStep, { Address } from './addressStep';

// Remove the Address interface definition from Checkout.tsx

type DeliveryOption = 'express' | 'regular' | 'schedule';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

// interface Address {
//   _id: string;
//   id: number;
//   location: string;
//   university: string;
//   city: string;
//   country: string;
//   phone: string;
//   type: 'HOSTEL' | 'DEPARTMENT' | 'GIFT';
// }

// interface Address {
//   _id: string;
//   id: number;
//   location: string;
//   university: string;
//   city: string;
//   country: string;
//   phone: string;
//   type: 'HOSTEL' | 'DEPARTMENT' | 'GIFT';
// }


                ///////////////////////////////////////////////////////////
                //////////////////////////////////////////////////////////
                ////////        CHECKOUT COMPONENT          /////////////
                ////////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////


const Checkout: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'address' | 'summary' | 'payment'>('address');
  
  // User authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<{ name?: string, email?: string } | null>(null);
  
  // Order data state
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<DeliveryOption>('regular');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [serviceCharge, setServiceCharge] = useState<number>(50);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  
  // Mobile navigation
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Check authentication on mount
  useEffect(() => {
    const checkAuthentication = () => {
      setIsCheckingAuth(true);
      
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setIsCheckingAuth(false);
        return;
      }
      
      try {
        // Verify token expiration
        const decodedToken = jwt.decode(token) as { exp?: number, userId?: string, name?: string, email?: string } | null;
        
        if (!decodedToken || !decodedToken.userId) {
          handleLogout();
          return;
        }
        
        // Check if token is expired
        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
          handleLogout("Your session has expired. Please log in again.");
          return;
        }
        
        // Set user profile if available
        if (decodedToken.name || decodedToken.email) {
          setUserProfile({
            name: decodedToken.name,
            email: decodedToken.email
          });
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error validating authentication:", error);
        handleLogout();
      } finally {
        setIsCheckingAuth(false);
      }
    };
    
    checkAuthentication();
  }, []);

  const handleLogout = (message?: string) => {
    localStorage.removeItem("token");
    localStorage.removeItem("lastLoginTime");
    setIsAuthenticated(false);
    
    if (message) {
      alert(message);
    }
  };

  // Fixed this function to accept Address | null to match the expected prop type
  const handleAddressSelect = (address: Address | null) => {
    setSelectedAddress(address);
  };

  const handleServiceChargeChange = (charge: number) => {
    setServiceCharge(charge);
  };

  const handleDeliveryFeeChange = (fee: number) => {
    setDeliveryFee(fee);
  };

  const handleNextStep = () => {
    // Validate before proceeding to the next step
    if (currentStep === 'address') {
      if (!selectedAddress) {
        alert("Please select a delivery address to continue.");
        return;
      }
      setCurrentStep('summary');
    } else if (currentStep === 'summary') {
      if (!cartItems || cartItems.length === 0) {
        alert("Your cart is empty. Please add items before proceeding.");
        return;
      }
      setCurrentStep('payment');
    }
  };

  const handleBackStep = () => {
    if (currentStep === 'summary') {
      setCurrentStep('address');
    } else if (currentStep === 'payment') {
      setCurrentStep('summary');
    } else if (currentStep === 'address') {
      window.location.href = '/cartPage';
    }
  };

  const handleContinueShopping = () => {
    window.location.href = '/product';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Render loading state
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  // Render login message if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">
            Please log in to your account to continue with the checkout process.
          </p>
          <a 
            href="/login" 
            className="inline-block bg-red-900 hover:bg-red-800 text-white font-medium py-3 px-8 rounded-lg transition duration-200"
          >
            Log In
          </a>
          <p className="mt-6 text-gray-500 text-sm">
            Don't have an account? <a href="/signup" className="text-red-900 hover:underline">Register here</a>
          </p>
        </div>
      </div>
    );
  }

  // Function to render the current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 'address':
        return (
          <AddressStep
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            onAddressSelect={handleAddressSelect}
          />
        );
      
      case 'summary':
        return (
          <SummaryStep
            cartItems={cartItems}
            setCartItems={setCartItems}
            selectedAddress={selectedAddress}
            selectedDeliveryMethod={selectedDeliveryMethod}
            setSelectedDeliveryMethod={setSelectedDeliveryMethod}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            onServiceChargeChange={handleServiceChargeChange}
            onDeliveryFeeChange={handleDeliveryFeeChange}
          />
        );
      
      case 'payment':
        return (
          <PaymentStep
            cartItems={cartItems}
            selectedAddress={selectedAddress}
            selectedDeliveryMethod={selectedDeliveryMethod}
            selectedDate={selectedDate}
            serviceCharge={serviceCharge}
            deliveryFee={deliveryFee}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="checkout-container">
      {isAuthenticated ? (
        null
      ) : <div>
        <a href='/login' className='text-white border bg-red-900 border-gray-300 rounded p-1.5 sm:p-4 text-white sm:px-4 sm:py-2'>Login</a>
      </div>}

      {isAuthenticated ? (
        <div className="container-div">


          <header className="flex justify-between items-center bg-white py-4 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <a href='/'><img src="/images/logo1.png" alt="Uniclique" className="h-6 mr-2 sm:h-8" /></a>
              <h1 className="text-xl mr-6  font-bold text-red-900 sm:text-2xl">Uniclique</h1>
            </div>
            <div className="flex items-center">
              <div className=" hidden relative mr-2 sm:mr-4 sm:flex">
                <input
                  type="text"
                  placeholder="Search orders"
                  className="bg-gray-200 text-gray-700 rounded-l px-4 py-2"
                />
                <button className="bg-gray-200 hover:bg-red-600 text-red-900 hover:text-white rounded-r px-4 py-2 absolute right-0 top-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center ml-6 sm:ml-4">
                <button className="hover:bg-gray-600 text-gray-700 rounded-l px-2 py-2 sm:px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
                <button className="hover:bg-gray-600 text-gray-700 rounded-r px-2 py-2 sm:px-4 ml-0 sm:ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
              </div>
              <span className="text-gray-500 ml-2 sm:ml-4 mr-2 sm:mr-4 hidden sm:inline">
                Need Help?
              </span>
              <div className="hidden sm:flex items-center">
                <img
                  src="https://res.cloudinary.com/daqlpvggg/image/upload/v1717040743/avatar_jznivx.png"
                  alt="Profile"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="grid">
                  <span className="text-gray-700">Ayotunde Ojay</span>
                  <span className="text-gray-700">ayojay@gmail.com</span>
                </div>
              </div>
              <button className="bg-red-900 hover:bg-red-600 text-white rounded ml-2 sm:ml-4 px-2 py-2 sm:px-4 sm:py-2 hidden sm:inline-block">
                <a href='/product'>Continue Shopping</a>
              </button>
            </div>


            {/* Hamburger menu */}
            <div className="sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            {/* Mobile menu */}
            {isMobileMenuOpen && (
              <div className="sm:hidden" id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <a
                    href="#"
                    className="bg-gray-200 text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Profile
                  </a>
                  <a
                    href="/product"
                    className="bg-red-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Continue Shopping
                  </a>
                </div>
              </div>
            )}
          </header>



          {/* Checkout progress steps */}
      <div className="bg-white shadow-sm mb-6">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex w-full justify-between">
              <button
                className={`flex flex-col items-center ${currentStep === 'address' ? 'text-red-900' : 'text-gray-400'}`}
                onClick={() => setCurrentStep('address')}
              >
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep === 'address' ? 'bg-red-900 text-white' : 'bg-gray-200'} mb-1`}>
                  1
                </div>
                <span className="text-sm font-medium">Address</span>
              </button>
              
              <div className={`flex-1 h-0.5 self-center mx-2 ${currentStep === 'address' ? 'bg-gray-300' : 'bg-red-900'}`} />
              
              <button
                className={`flex flex-col items-center ${currentStep === 'summary' ? 'text-red-900' : currentStep === 'payment' ? 'text-red-900' : 'text-gray-400'}`}
                onClick={() => selectedAddress && setCurrentStep('summary')}
              >
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep === 'summary' ? 'bg-red-900 text-white' : currentStep === 'payment' ? 'bg-red-900 text-white' : 'bg-gray-200'} mb-1`}>
                  2
                </div>
                <span className="text-sm font-medium">Summary</span>
              </button>
              
              <div className={`flex-1 h-0.5 self-center mx-2 ${currentStep === 'payment' ? 'bg-red-900' : 'bg-gray-300'}`} />
              
              <button
                className={`flex flex-col items-center ${currentStep === 'payment' ? 'text-red-900' : 'text-gray-400'}`}
                onClick={() => cartItems.length > 0 && selectedAddress && setCurrentStep('payment')}
              >
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep === 'payment' ? 'bg-red-900 text-white' : 'bg-gray-200'} mb-1`}>
                  3
                </div>
                <span className="text-sm font-medium">Payment</span>
              </button>
            </div>
          </div>
        </div>
      </div>

          <div className="bg-white rounded-lg shadow-md sm:p-6">

          {renderStepContent()}

            <div className="flex justify-between mt-8 mb-5">
              <button className="bg-red-900 text-white px-4 py-2 rounded" onClick={handleBackStep}>Back</button>
              {currentStep === 'payment' ? (
                <button className="bg-red-900 text-white px-4 py-2 rounded" onClick={handleContinueShopping}>Continue Shopping</button>
              ) : (
                <button className="bg-red-900 text-white px-4 py-2 rounded" onClick={handleNextStep}>Next</button>
              )}
            </div>
          </div>

          <footer className="bg-red-900 text-white py-8 px-0 mt-0">
            <div className="container px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center">
                    <a href='/'><img src="https://res.cloudinary.com/daqlpvggg/image/upload/v1717040777/logo3_zd01wc.png" alt="Uniclique" className="h-16 mr-2" /></a>
                  </div>
                  <span className="text-white mt-4 mb-2">
                    Join our newsletters to stay up to date on features and releases
                  </span>
                  <div className=" grid items-center mb-10 mt-10">
                    <input
                      type="text"
                      placeholder="Enter your email"
                      className="bg-gray-200 text-gray-700 rounded-l px-4 py-2 mr-2"
                    />
                    <span className="text-white mt-4 mr-2">Subscribe</span>
                  </div>
                  <span
                    className="text-white"
                    style={{
                      overflowWrap: 'break-word',
                      maxWidth: '150px',
                      fontSize: '0.65rem',
                    }}
                  >
                    By subscribing, you agree to our privacy policy and provide consent to
                    receive updates from our company.
                  </span>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold mb-4">Products</h3>
                  <ul>
                    <li>Shoes</li>
                    <li>Jewelries</li>
                    <li>Gadgets</li>
                    <li>Wellness Products</li>
                    <li>Food</li>
                    <li>Clothes</li>
                    <li>Books</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Services</h3>
                  <ul>
                    <li>Photography</li>
                    <li>Barter</li>
                    <li>Make-up artist</li>
                    <li>Fashion Designing</li>
                    <li>Tour Wine</li>
                    <li>Delivery service</li>
                    <li>Laundry service</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Pricing | Career</h3>
                  <ul>
                    <li>Contacts</li>
                    <li>+234-9125740495</li>
                    <li>unicliquetech@gmail.com</li>
                  </ul>
                </div>
              </div>
              <p className="mt-8 text-center">© 2025. All rights reserved. Uniclique</p>
            </div>
          </footer>
        </div>
      ) : (
        <div><p>Please login to checkout products</p></div>
      )}
    </div>
  );
};

export default Checkout;