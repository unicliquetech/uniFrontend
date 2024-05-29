"use client"
import React, { useState, useEffect } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios, { AxiosResponse } from 'axios';
import jwt, { JwtPayload } from 'jsonwebtoken';




interface Address {
  _id: string;
  id: number;
  location: string;
  university: string;
  city: string;
  country: string;
  phone: string;
  type: 'HOSTEL' | 'DEPARTMENT';
}




const AddressStep = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newAddress, setNewAddress] = useState<Address>({
    _id: '',
    id: 1, // You may want to initialize this with a reasonable value or remove it
    location: '',
    university: '',
    city: '',
    country: '',
    phone: '',
    type: 'HOSTEL',
  });

  interface DecodedToken {
    userId: string;
    // Add any other properties present in the decoded token
  }

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    const decodedToken = jwt.decode(token) as DecodedToken | null;
    const userId = decodedToken?.userId;

    if (!userId) {
      throw new Error('Invalid token');
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Id': userId,
      },
    };
  };

  useEffect(() => {
    // Fetch addresses from the API
    const fetchAddresses = async () => {
      try {
        const response: AxiosResponse<Address[]> = await axios.get(
          'https://unibackend.onrender.com/api/v1/address',
          getAuthHeaders()
        );
        setAddresses(response.data);
      } catch (error: unknown) {
        console.error('Error fetching addresses:', error);
      }
    };
    fetchAddresses();
  });

  const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleAddAddress = async () => {
    try {
      const response: AxiosResponse<Address> = await axios.post(
        'https://unibackend.onrender.com/api/v1/address',
        newAddress,
        getAuthHeaders()
      );
      const newAddressWithId = response.data;
      setAddresses([...addresses, newAddressWithId]);
      setNewAddress({
        _id: '',
        id: 0,
        location: '',
        university: '',
        city: '',
        country: '',
        phone: '',
        type: 'DEPARTMENT',
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.error(error)
      } else {
        console.error('Error adding address:', error);
      }
    }
  };

  const handleEditAddress = (_id: string) => {
    const addressToEdit = addresses.find((address) => address._id === _id);
    if (addressToEdit) {
      setNewAddress(addressToEdit);
    }
  };

  const handleUpdateAddress = async (_id: string) => {
    try {
      const response: AxiosResponse<Address> = await axios.put(
        `https://unibackend.onrender.com/api/v1/address/${_id}`,
        newAddress,
        getAuthHeaders()
      );
      setAddresses(addresses.map((address) => (address._id === _id ? response.data : address)));
      setNewAddress({ _id: '', id: 0, location: '', university: '', city: '', country: '', phone: '', type: 'DEPARTMENT' });
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const handleDeleteAddress = async (_id: string) => {
    try {
      await axios.delete(`https://unibackend.onrender.com/api/v1/address/${_id}`, getAuthHeaders());
      setAddresses(addresses.filter((address) => address._id !== _id));
    } catch (error) {
      console.error('Error deleting address:', error);
    }
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
              <span className="text-red-900 ml-2">{address.location}</span>
            </div>
            <small className=" text-red-900 border bg-red-900 border-gray-300 rounded sm:p-4 text-white sm:px-4 sm:py-2 mr-2">{address.type}</small>
            <div>
              <button onClick={() => handleEditAddress(address._id)} className="text-red-900 hover:text-gray-700">
                <img src="/images/Edit.svg" alt="edit" className="h-4 mr-2 sm:h-8" />
              </button>
              <button onClick={() => handleDeleteAddress(address._id)} className="text-red-900 hover:text-gray-700">
                <img src="/images/Close.svg" alt="delete" className="h-4 mr-2 sm:h-8" />
              </button>
            </div>
          </div>
          <p className="text-gray-600">
            {address.university}, {address.city} <br />
            {address.country}
          </p>
          <p className="text-gray-600">{address.phone}</p>
        </div>
      ))}
      <div className="border border-gray-300 rounded p-4">
        <h3 className="text-lg font-semibold mb-2">Add New Address</h3>
        <div className="mb-2">
          <label htmlFor="street" className="text-gray-700">
            Location/Room Number
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={newAddress.location}
            onChange={handleNewAddressChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="city" className="text-gray-700">
            University
          </label>
          <input
            type="text"
            id="university"
            name="university"
            value={newAddress.university}
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
          <label htmlFor="country" className="text-gray-700">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={newAddress.country}
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
            <option value="HOSTEL">Hostel</option>
            <option value="DEPARTMENT">Department</option>
            <option value="GIFT">Gift</option>
          </select>
        </div>
        <div>
          <button
            onClick={handleAddAddress}
            className="bg-red-900 text-white px-4 mt-3 py-2 rounded"
          >
            Add Address
          </button>
          {/* <LoginPopup isOpen={showLoginPopup} onClose={handleCloseLoginPopup} /> */}
        </div>
      </div>
    </div>
  );
};



////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
///////               DELIVERY  STEP                    ////////////
////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

interface DeliveryDatePickerProps extends Omit<ReactDatePickerProps, 'onChange' | 'value'> {
  value?: Date;
  onChange?: (date: Date | null, event?: React.SyntheticEvent<any, Event> | undefined) => void;
}

const DeliveryDatePicker: React.FC<DeliveryDatePickerProps> = ({
  value,
  onChange,
  ...props
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null);

  const handleDateChange = (date: Date | null, event?: React.SyntheticEvent<any, Event> | undefined) => {
    setSelectedDate(date);
    if (onChange) {
      onChange(date, event);
    }
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select Date"
        minDate={new Date()}
        // value={string}
        {...props}
      />
    </div>
  );
};

type DeliveryOption = 'free' | 'express' | 'schedule';

const DeliveryStep: React.FC = () => {
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryOption>('free');
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDeliveryChange = (delivery: DeliveryOption) => {
    setSelectedDelivery(delivery);
    if (delivery !== 'schedule') {
      setSelectedDate('');
    }
  };

  const handleDateChange = (date: Date | null, event?: React.SyntheticEvent<any, Event> | undefined) => {
    if (date) {
      setSelectedDate(date.toISOString().split('T')[0]);
    } else {
      setSelectedDate('');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Delivery Method</h2>
      <div className="mb-4 border border-gray-300 rounded p-4">
        <label className="flex items-center">
          <div
            className={`w-4 h-4 rounded-full border-2 border-gray-400 mr-2 ${selectedDelivery === 'free' ? 'bg-red-600' : 'bg-white'}`}
            onClick={() => handleDeliveryChange('free')}
          ></div>
          <span className="deliverytext text-gray-700">Free Regular shipment</span>
          <span className="deliverytext text-gray-500 ml-auto">25 Oct, 2024</span>
        </label>
      </div>
      <div className="mb-4 border border-gray-300 rounded p-4">
        <label className="flex items-center">
          <div
            className={`w-4 h-4 rounded-full border-2 border-gray-400 mr-2 ${selectedDelivery === 'express' ? 'bg-red-600' : 'bg-white'}`}
            onClick={() => handleDeliveryChange('express')}
          ></div>
          <span className="deliverytext text-gray-700">#2,000 Get your delivery as soon as possible</span>
          <span className="deliverytext text-gray-500 ml-auto">19 May, 2024</span>
        </label>
      </div>
      <div className="mb-4 border border-gray-300 rounded py-4">
        <label className="flex items-center">
          <div
            className={`w-4 h-4 rounded-full border-2 border-gray-400 mr-2 ${selectedDelivery === 'schedule' ? 'bg-red-600' : 'bg-white'
              }`}
            onClick={() => handleDeliveryChange('schedule')}
          ></div>
          <span className="deliverytext text-gray-700">Schedule</span>
          <DeliveryDatePicker
            className="ml-4 text-red-900 w-15"
            value={selectedDate ? new Date(selectedDate) : undefined}
            onChange={handleDateChange}
            disabled={selectedDelivery !== 'schedule'}
          />
        </label>
      </div>
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

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
  }



  return (
    <div className="container">
      {isAuthenticated ? (
        null
      ) : <div>
        <a href='/login' className='text-white border bg-red-900 border-gray-300 rounded p-1.5 sm:p-4 text-white sm:px-4 sm:py-2 mr-2'>Login</a>
      </div>}

      {isAuthenticated ? (
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
                  src="/images/avatar.svg"
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
      ) : (
        <div><p>Please login to checkout products</p></div>
      )}
    </div>
  );
};

export default Checkout;