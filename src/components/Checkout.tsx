import React, { useState } from 'react';
// import { AddressStep, DeliveryStep, PaymentStep } from './steps';



const AddressStep = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      street: '28 Gbemidebe Ave',
      city: 'Ibadan',
      state: 'Nigeria',
      zip: '112201',
      phone: '080 8937 6769',
      type: 'HOME',
    },
    {
      id: 2,
      street: '2 Gbolahan Street',
      city: 'Ibadan',
      state: 'Nigeria',
      zip: '112203',
      phone: '091 7138 9069',
      type: 'OFFICE',
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    type: 'HOME',
  });

  const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      { ...newAddress, id: addresses.length + 1 },
    ]);
    setNewAddress({
      street: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      type: 'HOME',
    });
  };

  const handleEditAddress = (id: number) => {
    const addressToEdit = addresses.find((address) => address.id === id);
    if (addressToEdit) {
      setNewAddress(addressToEdit);
    }
  };

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
      {addresses.map((address) => (
        <div key={address.id} className="address-container mb-4 border bg-gray-100 border-gray-300 rounded sm:p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <input
                type="radio"
                name="address"
                value={address.id}
                className="w-4 h-4 text-red-900 bg-red-900 border-gray-300 focus:ring-red-900"
              />
              <span className="text-red-900 ml-2">{address.street}</span>
            </div>
            <small className=" text-red-900 border bg-red-900 border-gray-300 rounded sm:p-4 text-white sm:px-4 sm:py-2 mr-2">{address.type}</small>
            <div>
            <button onClick={() => handleEditAddress(address.id)} className="text-red-900 hover:text-gray-700">
            <img src="/images/Edit.png" alt="edit" className="h-4 mr-2 sm:h-8" />
            </button>
            <button onClick={() => handleDeleteAddress(address.id)} className="text-red-900 hover:text-gray-700">
            <img src="/images/Close.png" alt="delete" className="h-4 mr-2 sm:h-8" />
            </button>
            </div>
          </div>
          <p className="text-gray-600">
            {address.city}, {address.state} <br />
            {address.zip}
          </p>
          <p className="text-gray-600">{address.phone}</p>
        </div>
      ))}
      <div className="border border-gray-300 rounded p-4">
        <h3 className="text-lg font-semibold mb-2">Add New Address</h3>
        <div className="mb-2">
          <label htmlFor="street" className="text-gray-700">
            Street Address
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={newAddress.street}
            onChange={handleNewAddressChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="city" className="text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={newAddress.city}
            onChange={handleNewAddressChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="state" className="text-gray-700">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={newAddress.state}
            onChange={handleNewAddressChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="zip" className="text-gray-700">
            ZIP Code
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={newAddress.zip}
            onChange={handleNewAddressChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="phone" className="text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={newAddress.phone}
            onChange={handleNewAddressChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="type" className="text-gray-700">
            Address Type
          </label>
          <select
            id="type"
            name="type"
            value={newAddress.type}
            onChange={handleNewAddressChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="HOME">Home</option>
            <option value="OFFICE">Office</option>
          </select>
        </div>
        <button
          onClick={handleAddAddress}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Add Address
        </button>
      </div>
    </div>
  );
};




type DeliveryOption = 'free' | 'express' | 'schedule';

const DeliveryStep = () => {
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption>('free');
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDeliveryChange = (delivery: DeliveryOption) => {
    setSelectedDelivery(delivery);
    if (delivery !== 'schedule') {
      setSelectedDate('');
    }
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Delivery Method</h2>
      <div className="mb-4 border border-gray-300 rounded p-4">
        <label className="flex items-center">
          <div
            className={`w-4 h-4 rounded-full border-2 border-gray-400 mr-2 ${selectedDelivery === 'free' ? 'bg-red-600' : 'bg-white'
              }`}
            onClick={() => handleDeliveryChange('free')}
          ></div>
          <span className="deliverytext text-gray-700">Free Regular shipment</span>
          <span className="deliverytext text-gray-500 ml-auto">25 Oct, 2024</span>
        </label>
      </div>
      <div className="mb-4 border border-gray-300 rounded p-4">
        <label className="flex items-center">
          <div
            className={`w-4 h-4 rounded-full border-2 border-gray-400 mr-2 ${selectedDelivery === 'express' ? 'bg-red-600' : 'bg-white'
              }`}
            onClick={() => handleDeliveryChange('express')}
          ></div>
          <span className="deliverytext text-gray-700">#2,000 Get your delivery as soon as possible</span>
          <span className="deliverytext  text-gray-500 ml-auto">19 May, 2024</span>
        </label>
      </div>
      <div className="mb-4 border border-gray-300 rounded p-4">
        <label className="flex items-center">
          <div
            className={`w-4 h-4 rounded-full border-2 border-gray-400 mr-2 ${selectedDelivery === 'schedule' ? 'bg-red-600' : 'bg-white'
              }`}
            onClick={() => handleDeliveryChange('schedule')}
          ></div>
          <span className="deliverytext  text-gray-700">Schedule</span>
          <select
            className="ml-auto text-gray-500"
            value={selectedDate}
            onChange={handleDateChange}
            disabled={selectedDelivery !== 'schedule'}
          >
            <option value="" className='deliverytext '>Select Date</option>
            <option value="2024-05-25">25 May, 2024</option>
            <option value="2024-05-26">26 May, 2024</option>
            <option value="2024-05-27">27 May, 2024</option>
            {/* Add more options as needed */}
          </select>
        </label>
      </div>
      {/* <div className="flex justify-between mt-8">
        <button className="bg-white text-gray-700 px-4 py-2 rounded">Back</button>
        <button className="bg-red-600 text-white px-4 py-2 rounded">Next</button>
      </div> */}
    </div>
  );
};



const PaymentStep = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Payment Method</h2>
      {/* Replace this with your payment form implementation */}
      <div className="mb-4">
        <label htmlFor="cardNumber" className="text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="expiryDate" className="text-gray-700">
          Expiry Date
        </label>
        <input
          type="text"
          id="expiryDate"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cvv" className="text-gray-700">
          CVV
        </label>
        <input
          type="text"
          id="cvv"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cardHolder" className="text-gray-700">
          Card Holder
        </label>
        <input
          type="text"
          id="cardHolder"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
    </div>
  );
};


const Checkout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState('address');




  const renderStep = () => {
    switch (currentStep) {
      case 'address':
        return <AddressStep />;
      case 'delivery':
        return <DeliveryStep />;
      case 'payment':
        return <PaymentStep />;
      default:
        return null;
    }
  };

  const handleNextStep = () => {
    switch (currentStep) {
      case 'address':
        setCurrentStep('delivery');
        break;
      case 'delivery':
        setCurrentStep('payment');
        break;
      // Handle payment step or any other logic
      default:
        break;
    }
  };

  const handleBackStep = () => {
    switch (currentStep) {
      case 'delivery':
        setCurrentStep('address');
        break;
      case 'payment':
        setCurrentStep('delivery');
        break;
      default:
        break;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="container">
      <div className="bg-white rounded-lg shadow-md p-6">


        <header className="flex justify-between items-center bg-white py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <img src="/images/logo1.png" alt="Uniclique" className="h-6 mr-2 sm:h-8" />
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
                src="/images/avatar.png"
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="grid">
                <span className="text-gray-700">Ayotunde Ojay</span>
                <span className="text-gray-700">ayojay@gmail.com</span>
              </div>
            </div>
            <button className="bg-red-900 hover:bg-red-600 text-white rounded ml-2 sm:ml-4 px-2 py-2 sm:px-4 sm:py-2 hidden sm:inline-block">
              Continue Shopping
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
                  href="#"
                  className="bg-red-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          )}
        </header>




        <nav className="steps flex justify-between sm:items-center bg-white ml-0 py-4 sm:px-20 sm:ml-20 sm:px-6 lg:px-8">
          <div className="flex">
            <button
              className={`mr-4 ${currentStep === 'address' ? 'text-red-600 font-bold' : 'text-gray-400'}`}
              onClick={() => setCurrentStep('address')}
            >
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mt-2"
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
                <div className="grid sm:mr-40 mr-5">
                  <small className='step-content'>Step 1</small>
                  <span className="step-content ml-4 font-semibold style={{fontSize: '0.45rem'}} ">Address</span>
                </div>
              </div>
            </button>
            <button
              className={`mr-4 ${currentStep === 'delivery' ? 'text-red-600 font-bold' : 'text-gray-400'}`}
              onClick={() => setCurrentStep('delivery')}
              disabled={currentStep !== 'address'}
            >
              <div className="flex sm:ml-40 ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mt-2"
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
                <div className="grid sm:mr-40 mr-2">
                  <small className='step-content'>Step 2</small>
                  <span className="ml-4 step-content font-semibold style={{fontSize: '0.45rem'}}">Delivery</span>
                </div>
              </div>
            </button>
            <button
              className={`mr-4 ${currentStep === 'payment' ? 'text-red-600 font-bold' : 'text-gray-400'}`}
              onClick={() => setCurrentStep('payment')}
              disabled={currentStep !== 'delivery'}
            >
              <div className="flex sm:ml-40 ml-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mt-2"
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
                <div className="grid sm:mr-40 mr-0">
                  <small className='step-content font-sm'>Step 3</small>
                  <span className="step-content ml-4 font-semibold style={{fontSize: '0.45rem'}} ">Payment</span>
                </div>
              </div>
            </button>
          </div>
        </nav>



        <div className="bg-white rounded-lg shadow-md sm:p-6">
          {/* Header with step links */}
          <header>
            {/* Links to navigate between steps */}
          </header>

          {/* Render the current step component */}
          {renderStep()}

          {/* Next button to navigate to the next step */}
          <div className="flex justify-between mt-8 mb-5">
            <button className="bg-red-900 text-white px-4 py-2 rounded" onClick={handleBackStep} disabled={currentStep === 'address'}>Back</button>
            <button className="bg-red-900 text-white px-4 py-2 rounded" onClick={handleNextStep}>Next</button>
          </div>
        </div>



        <footer className="bg-red-900 text-white py-8 px-0 mt-0">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center">
                  <img src="/images/logo3.png" alt="Uniclique" className="h-8 mr-2" />
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
                  <li>+234-9265356777</li>
                  <li>info@uniclique.com</li>
                </ul>
              </div>
            </div>
            <p className="mt-8 text-center">© 2023. All rights reserved. Uniclique</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Checkout;