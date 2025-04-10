"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // Added for better notifications

// At the top of addressStep.tsx
export interface Address {
    _id: string;
    id: number;
    location: string;
    university: string;
    city: string;
    country: string;
    phone: string;
    type: 'HOSTEL' | 'DEPARTMENT' | 'GIFT';
  }
  
  // Then use this interface in your component props
  interface AddressStepProps {
    selectedAddress: Address | null;
    setSelectedAddress: (address: Address | null) => void;
    onAddressSelect: (address: Address | null) => void;
  }

// interface Address {
//   _id: string;
//   location: string;
//   university: string;
//   city: string;
//   country: string;
//   phone: string;
//   type: 'HOSTEL' | 'DEPARTMENT' | 'GIFT';
// }

// interface AddressStepProps {
//   selectedAddress: Address | null;
//   onAddressSelect: (address: Address | null) => void; // Changed to accept null
// }

const AddressStep: React.FC<AddressStepProps> = ({ selectedAddress, onAddressSelect }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Omit<Address, '_id'>>({
    id: 1,
    location: '',
    university: '',
    city: '',
    country: '',
    phone: '',
    type: 'HOSTEL',
  });

  // Get authorization headers for API requests
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("You need to log in first");
      setTimeout(() => window.location.href = '/login', 2000);
      throw new Error('Token not found');
    }

    try {
      // Simple validation instead of full jwt decoding
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (!payload.userId || new Date(payload.exp * 1000) < new Date()) {
        toast.error("Your session has expired. Please login again.");
        setTimeout(() => window.location.href = '/login', 2000);
        throw new Error('Invalid token');
      }
      
      return {
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Id': payload.userId,
        },
      };
    } catch (e) {
      toast.error("Authentication error. Please login again.");
      setTimeout(() => window.location.href = '/login', 2000);
      throw new Error('Token validation failed');
    }
  };

  // Fetch addresses on component mount
  useEffect(() => {
    const fetchAddresses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          'https://unibackend-4ebp.onrender.com/api/v1/address',
          getAuthHeaders()
        );
        setAddresses(response.data);
        
        // If there are addresses but none selected, select the first one
        if (response.data.length > 0 && !selectedAddress) {
          onAddressSelect(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching addresses:', error);
        setError('Could not load your saved addresses. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAddresses();
  }, [selectedAddress, onAddressSelect]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Start adding a new address
  const handleStartAddingAddress = () => {
    setIsAddingNewAddress(true);
    setIsEditingAddress(null);
    setFormData({
        id: 1,
      location: '',
      university: '',
      city: '',
      country: '',
      phone: '',
      type: 'HOSTEL',
    });
  };

  // Start editing an existing address
  const handleStartEditingAddress = (address: Address) => {
    setIsEditingAddress(address._id);
    setIsAddingNewAddress(false);
    const { _id, ...rest } = address;
    setFormData(rest);
  };

  // Cancel form editing
  const handleCancelForm = () => {
    setIsAddingNewAddress(false);
    setIsEditingAddress(null);
  };

  // Submit the address form (for both add and edit)
  const handleSubmitAddressForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditingAddress) {
        // Update existing address
        const response = await axios.put(
          `https://unibackend-4ebp.onrender.com/api/v1/address/${isEditingAddress}`,
          formData,
          getAuthHeaders()
        );
        
        setAddresses(addresses.map(addr => 
          addr._id === isEditingAddress ? response.data : addr
        ));
        
        toast.success('Address updated successfully');
        
        // If the edited address was selected, update selection
        if (selectedAddress && selectedAddress._id === isEditingAddress) {
          onAddressSelect(response.data);
        }
      } else {
        // Add new address
        const response = await axios.post(
          'https://unibackend-4ebp.onrender.com/api/v1/address',
          formData,
          getAuthHeaders()
        );
        
        const newAddress = response.data;
        setAddresses([...addresses, newAddress]);
        
        // Automatically select the new address
        onAddressSelect(newAddress);
        toast.success('New address added successfully');
      }
      
      // Reset form state
      setIsAddingNewAddress(false);
      setIsEditingAddress(null);
    } catch (error) {
      console.error('Error saving address:', error);
      toast.error('Could not save address. Please try again.');
    }
  };

  // Delete an address
  const handleDeleteAddress = async (addressId: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await axios.delete(
          `https://unibackend-4ebp.onrender.com/api/v1/address/${addressId}`, 
          getAuthHeaders()
        );
        
        const updatedAddresses = addresses.filter(addr => addr._id !== addressId);
        setAddresses(updatedAddresses);
        
        // If the deleted address was selected, select another one if available
        if (selectedAddress && selectedAddress._id === addressId) {
          if (updatedAddresses.length > 0) {
            onAddressSelect(updatedAddresses[0]);
          } else {
            onAddressSelect(null); // This line is fixed now to match the updated function signature
          }
        }
        
        toast.success('Address deleted successfully');
      } catch (error) {
        console.error('Error deleting address:', error);
        toast.error('Could not delete address. Please try again.');
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading your saved addresses...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-red-900 text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Delivery Address</h2>
        {!isAddingNewAddress && !isEditingAddress && (
          <button 
            onClick={handleStartAddingAddress}
            className="bg-red-900 text-white px-4 py-2 rounded flex items-center"
          >
            <span className="mr-1">+</span> Add New Address
          </button>
        )}
      </div>

      {/* Address Form (For Add/Edit) */}
      {(isAddingNewAddress || isEditingAddress) && (
        <form onSubmit={handleSubmitAddressForm} className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">
            {isEditingAddress ? 'Edit Address' : 'Add New Address'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="location" className="block text-gray-700 mb-1">
                Location/Room Number <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                placeholder="e.g., Room 204, Block A"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-900"
              />
            </div>
            
            <div>
              <label htmlFor="university" className="block text-gray-700 mb-1">
                University <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="university"
                name="university"
                value={formData.university}
                onChange={handleInputChange}
                required
                placeholder="e.g., University of Lagos"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-900"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="city" className="block text-gray-700 mb-1">
                City <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                placeholder="e.g., Lagos"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-900"
              />
            </div>
            
            <div>
              <label htmlFor="country" className="block text-gray-700 mb-1">
                Country <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                placeholder="e.g., Nigeria"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-900"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="phone" className="block text-gray-700 mb-1">
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="e.g., 08012345678"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-900"
              />
            </div>
            
            <div>
              <label htmlFor="type" className="block text-gray-700 mb-1">
                Address Type <span className="text-red-600">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-900"
              >
                <option value="HOSTEL">Hostel</option>
                <option value="DEPARTMENT">Department</option>
                <option value="GIFT">Gift (Delivery for someone else)</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={handleCancelForm}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-800"
            >
              {isEditingAddress ? 'Update Address' : 'Save Address'}
            </button>
          </div>
        </form>
      )}

      {/* Saved Addresses List */}
      {addresses.length > 0 ? (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div 
              key={address._id} 
              className={`border rounded-lg p-4 transition-all cursor-pointer ${
                selectedAddress && selectedAddress._id === address._id
                  ? 'border-red-900 bg-red-50'
                  : 'border-gray-200 hover:border-red-900 hover:bg-red-50'
              }`}
              onClick={() => onAddressSelect(address)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="selectedAddress"
                    checked={!!(selectedAddress && selectedAddress._id === address._id)} // Fixed issue with checked property
                    onChange={() => onAddressSelect(address)}
                    className="mt-1 w-4 h-4 text-red-900 focus:ring-red-900"
                  />
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{address.location}</h3>
                      <span className="bg-red-900 text-white text-xs px-2 py-1 rounded-full">
                        {address.type}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mt-1">
                      {address.university}, {address.city}<br />
                      {address.country}
                    </p>
                    
                    <p className="text-gray-600 mt-1">
                      {address.phone}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartEditingAddress(address);
                    }}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Edit address"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAddress(address._id);
                    }}
                    className="text-gray-500 hover:text-red-600"
                    aria-label="Delete address"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">You don't have any saved addresses yet.</p>
          {!isAddingNewAddress && (
            <button
              onClick={handleStartAddingAddress}
              className="bg-red-900 text-white px-4 py-2 rounded"
            >
              Add Your First Address
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressStep;