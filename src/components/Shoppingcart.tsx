"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DeliveryDatePickerProps extends Omit<ReactDatePickerProps, 'onChange' | 'value'> {
  value?: Date | null;
  onChange?: (date: Date | null, event?: React.SyntheticEvent<any, Event> | undefined) => void;
}

const DeliveryDatePicker: React.FC<DeliveryDatePickerProps> = ({
  value,
  onChange,
  ...props
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );

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
        {...props}
      />
    </div>
  );
};

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState({
    name: '',
    price: 0, 
    _id: '',
    image: '',
    productId: '',
    colors: [],
    quantity: 0,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [deliveryPrice, setDeliveryPrice] = useState(400);

  const handleExpressDelivery = () => {
    setSelectedDeliveryMethod('express');
    setDeliveryPrice(800);
    setSelectedDate(null);
  };

  const handleRegularDelivery = () => {
    setSelectedDeliveryMethod('regular');
    setDeliveryPrice(400);
    setSelectedDate(null);
  };

  const handleScheduleDelivery = () => {
    setSelectedDeliveryMethod('schedule');
    setDeliveryPrice(500);
    setSelectedDate(null);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        let cartId = localStorage.getItem('cartId') ?? 'default-cart-id';

        if (!cartId) {
          const response = await axios.post('https://unibackend.onrender.com/api/v1/cart/items', {});
          cartId = response.data.cartId;
          localStorage.setItem('cartId', cartId);
        }

        const response = await axios.post('https://unibackend.onrender.com/api/v1/cart/items', { cartId });
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

  const itemTotal = cartItems.price * (cartItems.quantity || 0);
  const subtotal = itemTotal;
  const serviceFee = 50;
  const Total = subtotal + deliveryPrice + serviceFee;

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    try {
      const response = await axios.put(`https://unibackend.onrender.com/api/v1/cart/${productId}`, { quantity: newQuantity });
      const updatedCartItems = { ...cartItems, quantity: response.data.quantity };
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const handleRemoveFromCart = async (productId: string) => {
    try {
      await axios.delete(`https://unibackend.onrender.com/api/v1/cart/${productId}`);
      setCartItems({
        name: '',
        price: 0,
        _id: '',
        image: '',
        productId: '',
        colors: [],
        quantity: 0,
      });
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      const response = await axios.post('https://unibackend.onrender.com/api/v1/cart', { productId });
      const newItem = response.data;
      setCartItems(newItem);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  console.log('cartItems before rendering:', cartItems);

  return (
    <div>
      {/* Header and other components */}

      <h2 className="text-2xl font-bold mb-6 text-center font-poppins">My Cart</h2>
      <table className="carttable w-full">
        <thead className='cartTableHead'>
          <tr className=" tableheaddiv bg-white-200 border-b border-red-800 py-2 px-4">
            <th className="tablehead px-4 py-6 text-left">PRODUCT</th>
            <th className="tablehead px-4 py-2 text-left">PRICE</th>
            <th className="tablehead px-4 py-2 text-left">QTY</th>
            <th className="tablehead px-4 py-2 text-left">TOTAL</th>
          </tr>
        </thead>
        <tbody className='cartBody'>
          {Object.keys(cartItems).length > 0 ? (
            <tr key={cartItems._id} className="tableheaddiv border-b border-red-800">
              <td className="tablecontent px-4 py-2 flex items-center">
                <img
                  src={cartItems.image}
                  alt={cartItems.name}
                  className="w-16 h-16 object-contain mr-4"
                />
                <div>
                  <p className="font-semibold productName">{cartItems.name}</p>
                  {cartItems.productId && (
                    <p className="text-gray-500 font-100 productId">#{cartItems.productId}</p>
                  )}
                  {cartItems.colors && (
                    <p className="text-gray-500 productColor">Color: {cartItems.colors.join(', ')}</p>
                  )}
                </div>
              </td>
              <td className=" px-4 py-2 pricediv">₦{cartItems.price.toLocaleString()}</td>
              <td className="hidden sm:table-cell">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-red-800 font-bold py-1 px-2 rounded-l"
                  onClick={() => handleQuantityChange(cartItems.productId, cartItems.quantity - 1)}
                  disabled={cartItems.quantity === 1}
                >
                  -
                </button>
                <span className="mx-1">{cartItems.quantity}</span>
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-red-800 font-bold py-1 px-2 rounded-r"
                  onClick={() => handleQuantityChange(cartItems.productId, cartItems.quantity + 1)}
                >
                  +
                </button>
              </td>
              <td className="tablecontent relative">
                <div className="mobilediv flex">
                  <p className='mobiledivTotal'>₦{itemTotal.toLocaleString()}</p>
                  <div className="sm:hidden ml-10 hiddenqtybtn">
                    <button
                      className=" py-1 px-2 rounded-l qtybtn"
                      onClick={() => handleQuantityChange(cartItems.productId, cartItems.quantity - 1)}
                      disabled={cartItems.quantity === 1}
                    >
                      -
                    </button>
                    <span className="mx-1">{cartItems.quantity}</span>
                    <button
                      className=" py-1 px-2 rounded-r qtybtn"
                      onClick={() => handleQuantityChange(cartItems.productId, cartItems.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="absolute right-0 text-red-800 hover:text-red-600 xmark"
                    onClick={() => handleRemoveFromCart(cartItems.productId)}
                  >
                    &times;
                  </button>
                </div>
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan={4} className="grid sm:ml-[80%] ml-[20%] sm:w-[40%] w-[60%] text-center py-4">
                Your cart is empty
                <button className="bg-red-900 mt-6 text-white px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300">
                  <a href='/product'>Shop for Products here</a>
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4 bg-pink-100 p-4 rounded-lg">
        <p className="text-lg font-semibold">Choose Delivery Method:</p>
        <div className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="delivery"
              value="homeDelivery"
              className="form-radio"
              checked={selectedDeliveryMethod === 'express'}
              onChange={handleExpressDelivery}
            />
            <span className="ml-2">Express (In 1 hour) • ₦800</span>
          </label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="delivery"
                value="storePickup"
                className="form-radio"
                checked={selectedDeliveryMethod === 'regular'}
                onChange={handleRegularDelivery}
              />
              <span className="ml-2">Regular Delivery (In 6 hours) • ₦400</span>
            </label>
          </div>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="delivery"
                value="schedule"
                className="form-radio"
                checked={selectedDeliveryMethod === 'schedule'}
                onChange={handleScheduleDelivery}
              />
              <span className="ml-2">
                Schedule (In 2-4 days) • ₦500{' '}
                {selectedDeliveryMethod === 'schedule' && (
                  <DeliveryDatePicker value={selectedDate} onChange={handleDateChange} />
                )}
              </span>
            </label>
          </div>
        </div>
        <div className="mt-4 text-right">
          <p className="text-sm">SUB TOTAL: ₦{subtotal.toLocaleString()}</p>
          <p className="text-sm">SHIPPING: ₦{deliveryPrice.toLocaleString()}</p>
          <p className="text-sm">SERVICE FEE: ₦{serviceFee.toLocaleString()}</p>
          <p className="text-lg font-semibold mt-2">TOTAL: ₦{Total.toLocaleString()}</p>
          <button className="bg-red-900 hover:bg-red-600 text-white py-2 px-4 rounded mt-4 checkout-btn">
            <a href='/checkout' > CHECKOUT ₦{Total.toLocaleString()} </a>
          </button>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default ShoppingCart;