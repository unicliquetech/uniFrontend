import React, { useState, useEffect } from 'react';
import axios from 'axios';

type DeliveryOption = 'express' | 'regular' | 'schedule';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Address {
  _id: string;
  id: number;
  location: string;
  university: string;
  city: string;
  country: string;
  phone: string;
  type: 'HOSTEL' | 'DEPARTMENT' | 'GIFT';
}

interface SummaryStepProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  selectedAddress: Address | null;
  selectedDeliveryMethod: DeliveryOption;
  setSelectedDeliveryMethod: React.Dispatch<React.SetStateAction<DeliveryOption>>;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  onServiceChargeChange: (serviceCharge: number) => void;
  onDeliveryFeeChange: (deliveryFee: number) => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({
  cartItems,
  setCartItems,
  selectedAddress,
  selectedDeliveryMethod,
  setSelectedDeliveryMethod,
  selectedDate,
  setSelectedDate,
  onServiceChargeChange,
  onDeliveryFeeChange,
}) => {
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<string>('9:00');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Delivery time options from 8:00 to 20:00
  const deliveryTimes = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  
  // Delivery fee constants
  const EXPRESS_DELIVERY_FEE = 1000;
  const REGULAR_DELIVERY_FEE = 500;
  const SCHEDULED_DELIVERY_FEE = 0;

  // Fetch cart data when component mounts
  useEffect(() => {
    const fetchCartData = async () => {
      setIsLoading(true);
      try {
        const cartId = localStorage.getItem('cartId');
        if (!cartId) {
          console.error('No cart ID found');
          setCartItems([]);
          return;
        }

        const response = await axios.post('https://unibackend-4ebp.onrender.com/api/v1/cart/items', {
          cartId: cartId
        });

        if (response.data && Array.isArray(response.data.items)) {
          setCartItems(response.data.items);
        } else {
          console.error('Unexpected response format:', response.data);
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error fetching cart data:', error);
        setCartItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, [setCartItems]);

  // Handle delivery method change
  const handleDeliveryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDeliveryMethod = event.target.value as DeliveryOption;
    setSelectedDeliveryMethod(newDeliveryMethod);
    
    // Reset selected date if delivery method is not schedule
    if (newDeliveryMethod !== 'schedule') {
      setSelectedDate(null);
    }
  };

  // Handle delivery time change
  const handleDeliveryTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeliveryTime(event.target.value);
  };

  // Calculate total cost
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Updated delivery fee calculation based on the selected method
  const getDeliveryFee = (method: DeliveryOption): number => {
    switch (method) {
      case 'express': 
        return EXPRESS_DELIVERY_FEE;
      case 'regular': 
        return REGULAR_DELIVERY_FEE;
      case 'schedule': 
        return SCHEDULED_DELIVERY_FEE;
      default: 
        return 0;
    }
  };

  const deliveryFee = getDeliveryFee(selectedDeliveryMethod);
  const serviceFee = 100;
  const subtotal = calculateSubtotal();
  const totalCost = subtotal + deliveryFee + serviceFee;

  // Update parent component with fees
  useEffect(() => {
    onServiceChargeChange(serviceFee);
    onDeliveryFeeChange(deliveryFee);
  }, [serviceFee, deliveryFee, onServiceChargeChange, onDeliveryFeeChange]);

  if (isLoading) {
    return <div className="flex justify-center items-center py-8">Loading your order summary...</div>;
  }

  // Helper to get delivery method description with price
  const getDeliveryDescription = (method: DeliveryOption): string => {
    switch (method) {
      case 'express': 
        return `Express Delivery (₦${EXPRESS_DELIVERY_FEE})`;
      case 'regular': 
        return `Regular Delivery (₦${REGULAR_DELIVERY_FEE})`;
      case 'schedule': 
        return 'Scheduled Delivery (Free)';
      default: 
        return '';
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-red-900">Order Summary</h2>
      
      {/* Cart Items */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4 text-red-900">Items in Your Cart</h3>
        
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty. Please add some items before checkout.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-200">
                <div className="flex items-center">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-16 w-16 object-cover rounded mr-4" 
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium">₦{item.price * item.quantity}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Delivery Address */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4 text-red-900">Delivery Address</h3>
        {selectedAddress ? (
          <div className="p-3 border border-gray-200 rounded">
            <p className="font-medium">{selectedAddress.location}</p>
            <p>{selectedAddress.university}</p>
            <p>{selectedAddress.city}, {selectedAddress.country}</p>
            <p className="text-gray-600 mt-2">Phone: {selectedAddress.phone}</p>
            <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-red-900 rounded">
              {selectedAddress.type}
            </span>
          </div>
        ) : (
          <p className="text-red-500">Please select a delivery address</p>
        )}
      </div>
      
      {/* Delivery Method */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4 text-red-900">Delivery Options</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="deliveryMethod" className="block text-gray-700 mb-2">
              Delivery Method
            </label>
            <select
              id="deliveryMethod"
              value={selectedDeliveryMethod}
              onChange={handleDeliveryChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-900"
            >
              <option value="express">{getDeliveryDescription('express')}</option>
              <option value="regular">{getDeliveryDescription('regular')}</option>
              <option value="schedule">{getDeliveryDescription('schedule')}</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="deliveryTime" className="block text-gray-700 mb-2">
              Preferred Time
            </label>
            <select
              id="deliveryTime"
              value={selectedDeliveryTime}
              onChange={handleDeliveryTimeChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-900"
            >
              {deliveryTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {selectedDeliveryMethod === 'schedule' && (
          <div className="mt-4">
            <label htmlFor="deliveryDate" className="block text-gray-700 mb-2">
              Delivery Date
            </label>
            <input
              type="date"
              id="deliveryDate"
              value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-900"
              min={new Date().toISOString().split('T')[0]} // Can't select dates in the past
            />
          </div>
        )}
      </div>
      
      {/* Cost Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-red-900">Cost Breakdown</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₦{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Service Fee:</span>
            <span>₦{serviceFee}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee:</span>
            <span>₦{deliveryFee}</span>
          </div>
          <div className="border-t border-gray-300 pt-2 mt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₦{totalCost}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStep;