import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Item {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  colors: string[];
  total: number;
  productId: string;
}

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.total, 0);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/v1/cart/${itemId}`, { quantity: newQuantity });
      const updatedCartItems = cartItems.map((item) =>
        item._id === itemId ? response.data : item
      );
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const handleRemoveFromCart = async (itemId: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/cart/${itemId}`);
      const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      const existingItem = cartItems.find((item) => item.productId === productId);
      if (existingItem) {
        const newQuantity = existingItem.quantity + 1;
        await handleQuantityChange(existingItem._id, newQuantity);
      } else {
        const response = await axios.post('http://localhost:5000/api/v1/cart', { productId });
        const newItem = response.data;
        setCartItems([...cartItems, newItem]);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
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

        <h2 className="text-2xl font-bold mb-6 text-center font-poppins">My Cart</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-white-200 border-b border-red-800 py-2 px-4">
              <th className="px-4 py-6 text-left">PRODUCT</th>
              <th className="px-4 py-2 text-left">PRICE</th>
              <th className="px-4 py-2 text-left">QTY</th>
              <th className="px-4 py-2 text-left">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index} className="border-b border-red-800">
                <td className="px-4 py-2 flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain mr-4"
                  />
                  <div>
                    <p className="font-semibold productName">{item.name}</p>
                    {item.productId && (
                      <p className="text-gray-500 font-100 productId">#{item.productId}</p>
                    )}
                    {item.colors && (
                      <p className="text-gray-500 productColor">Color: {item.colors.join(', ')}</p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-2 align-top productPrice">₦{item.price.toLocaleString()}</td>
                <td className="px-4 py-2 align-top quantitydiv">
                  <button
                    className="bg-gray-200 hover:bg-gray-300 text-red-800 font-bold py-1 px-2 rounded-l"
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className="mx-1">{item.quantity}</span>
                  <button
                    className="bg-gray-200 hover:bg-gray-300 text-red-800 font-bold py-1 px-2 rounded-r"
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </td>

                <td className="px-4 py-2 align-top relative">
                  <div className="mobilediv">
                    ₦{item.total.toLocaleString()}
                    <div className="px-4 py-2 align-top quantitybtn">
                      <button
                        className=" py-1 px-2 rounded-l qtybtn"
                        onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="mx-1">{item.quantity}</span>
                      <button
                        className=" py-1 px-2 rounded-r qtybtn"
                        onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="absolute top-0 right-0 text-red-800 hover:text-red-600 xmark"
                      onClick={() => handleRemoveFromCart(item._id)}
                    >
                      &times;
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 bg-pink-100 p-4 rounded-lg">
            <p className="text-lg font-semibold">Choose Delivery Method:</p>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input type="radio" name="delivery" defaultChecked className="form-radio" />
                <span className="ml-2">Store Pickup (In 30 min) • FREE</span>
              </label>
            </div>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input type="radio" name="delivery" className="form-radio" />
                <span className="ml-2">Delivery at home (Under 2 - 4 days) • ₦2,000</span>
              </label>
            </div>
            <div className="mt-4 text-right">
              <p className="text-sm">SUB TOTAL: ₦{subtotal.toLocaleString()}</p>
              <p className="text-sm">SHIPPING: Free</p>
              <p className="text-lg font-semibold mt-2">TOTAL: ₦{subtotal.toLocaleString()}</p>
              <button className="bg-red-900 hover:bg-red-600 text-white py-2 px-4 rounded mt-4 checkout-btn">
                CHECKOUT ₦{subtotal.toLocaleString()}
              </button>
            </div>
          </div>
  
          <footer className="bg-red-900 text-white py-8 mt-0">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

export default ShoppingCart;