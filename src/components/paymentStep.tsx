import React, { useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

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

interface PaymentStepProps {
  cartItems: CartItem[];
  selectedAddress: Address | null;
  selectedDeliveryMethod: DeliveryOption;
  selectedDate: Date | null;
  serviceCharge: number;
  deliveryFee: number;
}

interface DecodedToken {
  userId: string;
}

const PaymentStep: React.FC<PaymentStepProps> = ({
  cartItems,
  selectedAddress,
  selectedDeliveryMethod,
  selectedDate,
  serviceCharge,
  deliveryFee,
}) => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [orderId, setOrderId] = useState<string>("");

  // Calculate total cost
  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    return subtotal + serviceCharge + deliveryFee;
  };

  // Helper to show custom alert
  const showCustomAlert = (message: string, isError = false) => {
    setStatus({
      success: !isError,
      message
    });
  };

  // Get auth headers with userId from JWT token
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    const decodedToken = jwt.decode(token) as DecodedToken | null;
    if (!decodedToken) {
      showCustomAlert("Please proceed to re-login, as your session has expired.", true);
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      throw new Error('Invalid token');
    }
    
    const userId = decodedToken?.userId;
    if (!userId) {
      showCustomAlert("Please proceed to re-login, as your session has expired.", true);
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
      throw new Error('Invalid token');
    }
    
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Id': userId,
      },
    };
  };

  // Send WhatsApp notification to vendor
  const sendWhatsAppNotification = (vendorWhatsappNumber: string, notificationMessage: string) => {
    const encodedMessage = encodeURIComponent(notificationMessage);
    const whatsappUrl = `https://wa.me/${vendorWhatsappNumber}?text=${encodedMessage}`;

    try {
      window.open(whatsappUrl, '_blank', "noopener noreferrer");
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      // Fallback to SMS if WhatsApp fails
      const smsUrl = `sms://${vendorWhatsappNumber}?body=${encodedMessage}`;
      window.open(smsUrl, '_blank');
    }
  };

  // Send payment notification via WhatsApp
  const sendPaymentNotification = () => {
    const total = calculateTotal();
    const orderItems = cartItems.map(item => item.name).join(", ");
    const message = `I have sent the sum of ₦${total}, for ${orderItems}${orderId ? ` (Order ID: ${orderId})` : ''}`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/09125740495?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank', "noopener noreferrer");
  };

  // Handle checkout completion
  const handleCompleteCheckout = async () => {
    // Validate required data
    if (!selectedAddress) {
      showCustomAlert("Please select a delivery address to continue.", true);
      return;
    }

    if (cartItems.length === 0) {
      showCustomAlert("Your cart is empty. Please add items to continue.", true);
      return;
    }

    setIsProcessing(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      
      const decodedToken = jwt.decode(token) as DecodedToken | null;
      if (!decodedToken) {
        showCustomAlert("Please proceed to re-login, as your session has expired.", true);
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        throw new Error('Invalid token');
      }
      
      const userId = decodedToken?.userId;

      // Prepare order data
      const orderData = {
        userId,
        items: cartItems,
        selectedAddress,
        selectedDeliveryMethod,
        selectedDate,
        serviceCharge,
        deliveryFee,
      };

      // Send order to backend
      const response = await axios.post(
        'https://unibackend-4ebp.onrender.com/api/v1/order/',
        orderData,
        getAuthHeaders()
      );

      if (response.status === 201) {
        // Order created successfully
        const responseOrderId = response.data.order.orderId || 'Not provided';
        setOrderId(responseOrderId);
        
        showCustomAlert("Your order has been placed successfully! Please make payment and notify the vendor.");
        
        // Use vendor's WhatsApp number from response if available, otherwise use default
        const vendorWhatsappNumber = response.data.vendorWhatsAppNumber || '09125740495';

        // Create a formatted item list
        const itemList = cartItems.map(item => 
          `${item.name} (${item.quantity}x at ₦${item.price} each)`
        ).join('\n- ');

        // Format delivery address
        const formattedAddress = `${selectedAddress.location}, ${selectedAddress.university}, ${selectedAddress.city}, ${selectedAddress.country}`;
        
        // Format delivery information
        let deliveryInfo = `Method: ${selectedDeliveryMethod.charAt(0).toUpperCase() + selectedDeliveryMethod.slice(1)}`;
        if (selectedDate) {
          deliveryInfo += `, Date: ${selectedDate.toLocaleDateString()}`;
        }

        // Add payment details to notification message
        const notificationMessage = 
`Hello,

I would like to place an order for:
- ${itemList}

*Total Cost:* ₦${calculateTotal()}
*Delivery Address:* ${formattedAddress}
*Phone:* ${selectedAddress.phone}
*Delivery Details:* ${deliveryInfo}
*Order ID:* ${responseOrderId}

I will make payment to the provided account details.

Thank you!`;

        // Send WhatsApp notification after a short delay
        setTimeout(() => {
          sendWhatsAppNotification(vendorWhatsappNumber, notificationMessage);
        }, 1500);
      } else {
        console.error('Failed to create order:', response.data);
        showCustomAlert(response.data.message || "Failed to complete checkout. Please check your details and try again.", true);
      }
    } catch (error) {
      console.error('Error processing order:', error);
      
      if (axios.isAxiosError(error) && error.response) {
        showCustomAlert(error.response.data.message || "An error occurred during checkout. Please try again.", true);
      } else {
        showCustomAlert("An unexpected error occurred. Please check your network connection and try again.", true);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm mb-6">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-red-900 mb-2">Complete Your Order</h2>
          <p className="text-gray-600">One final step to confirm your order</p>
        </div>

        {/* Order Summary */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cartItems.length} items):</span>
                <span className="font-medium">
                  ₦{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service Fee:</span>
                <span className="font-medium">₦{serviceCharge}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee:</span>
                <span className="font-medium">₦{deliveryFee}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-red-900">₦{calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 bg-red-900 rounded-full flex items-center justify-center text-white mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold">Payment Information</h4>
            </div>
            
            <div className="pl-11">
              <p className="mb-3 text-gray-700">
                Please make payment to the following bank account:
              </p>
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">Account Name:</div>
                  <div className="font-medium">Oyindamola Adewole</div>
                  
                  <div className="text-gray-600">Account Number:</div>
                  <div className="font-medium">2395661181</div>
                  
                  <div className="text-gray-600">Bank Name:</div>
                  <div className="font-medium">Zenith Bank</div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                <span className="font-medium">Important:</span> After making payment, please notify us using the WhatsApp button below. If you don't notify us about your payment, your order processing may be delayed.
              </p>
              <button 
                onClick={sendPaymentNotification}
                className="flex items-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.72.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
                </svg>
                Notify Us About Your Payment
              </button>
            </div>
          </div>

          {/* Order Confirmation */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-red-900 mb-2">Order Confirmation</h4>
            <p className="text-gray-700 mb-3">
              We're thrilled to confirm that your order has been received. After completing checkout,
              you'll be connected with a student vendor to finalize your purchase.
            </p>
            <p className="text-gray-700 mb-3">
              <strong>Please make payment to the bank account details provided above and notify the Uniclique team using the WhatsApp button.</strong>
            </p>
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md mb-3">
              <p className="text-yellow-800 font-medium">
                ⚠️ Important: Orders without payment notification may experience processing delays. Please ensure you notify us after making your payment.
              </p>
            </div>
            <p className="text-gray-700">
              By shopping from a student vendor, you're supporting young entrepreneurs in their academic journey.
              Thank you for your support!
            </p>
          </div>

          {/* Status message */}
          {status && (
            <div className={`p-4 rounded-lg mb-6 ${status.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {status.message}
            </div>
          )}

          {/* Checkout Button */}
          <button
            className={`w-full bg-red-900 hover:bg-red-800 text-white font-medium py-3 rounded-lg transition duration-200 ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
            onClick={handleCompleteCheckout}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Order...
              </span>
            ) : (
              'Complete Checkout & Connect with Vendor'
            )}
          </button>
        </div>
      </div>

      {/* Student Vendor Support Info */}
      <div className="text-center text-gray-600 text-sm p-4">
        <p className="mb-2 font-medium">Supporting Student Entrepreneurs</p>
        <p>Your purchase directly supports students building businesses while studying.</p>
        <p>Thank you for making a difference in their entrepreneurial journey!</p>
      </div>
    </div>
  );
};

export default PaymentStep;