import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Modal from 'react-modal';
import Nav from '@/components/vendorDashboard/nav'
import Aside from '@/components/vendorDashboard/Aside';
import flutterwwave from '@/images/flutterwave-3.svg';
import paystack from '@/images/paystack-2.svg';
import paymentImage from '@/images/paymentImage.svg';

Modal.setAppElement('#__next');

interface ProductType {
  _id: string;
  name: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedProduct?: ProductType | null;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onRequestClose, selectedProduct }) => {
  const [step, setStep] = useState(1);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState<{ src: string } | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<File | null>(null);
  const [productVisibility, setProductVisibility] = useState<'visible' | 'hidden'>('visible');
  const [productCategory, setProductCategory] = useState('');
  const [productBrand, setProductBrand] = useState('');
  const [productGender, setProductGender] = useState<'male' | 'female' | 'unisex'>('unisex');
  const [productStock, setProductStock] = useState(1);
  const [deliveryTime, setDeliveryTime] = useState(30);
  const [deliveryNote, setDeliveryNote] = useState('');
  const [refund, setRefund] = useState<boolean>(false);
  const [colors, setColors] = useState<string[]>(['Red', 'Black']);
  const [sponsorProduct, setSponsorProduct] = useState<boolean>(false);
  const [discountType, setDiscountType] = useState<'noDiscount' | 'percentageDiscount'>('percentageDiscount');
  const [basePrice, setBasePrice] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [isMobileVisible, setIsMobileVisible] = useState<boolean>(false);
  

  const toggleMobileVisibility = () => {
    setIsMobileVisible(!isMobileVisible);
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     if (event.target.files && event.target.files.length > 0) {
  //         setProductImage(event.target.files[0]);
  //     }
  // };

  const handleProductImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      try {
        const file = event.target.files[0];
        console.log('Selected file:', file); // Debug: Log the selected file

        const formData = new FormData();
        formData.append('image', file);

        console.log('Sending request to server'); // Debug: Log before sending the request

        const response = await axios.post('https://unibackend.onrender.com/api/v1/products/uploadImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Server response:', response.data.image); // Debug: Log the server response

        // const productImage = (response.data.image); 
        const imageUrl = response.data.image;
        setProductImage(imageUrl); // Update the state with the image URL

        console.log('Product url Image:', imageUrl);


        console.log('Product Image:', productImage);
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle error

      }
    }
  };

  // useEffect(() => {
  //   console.log('Product Image:', productImage.src);
  // }, [productImage]);

  const handleAddColor = (color: string) => {
    if (color && !colors.includes(color)) {
      setColors([...colors, color]);
    }
  };

  const handleRemoveColor = (color: string) => {
    setColors(colors.filter((c) => c !== color));
  };

  const handleSponsorshipChange = (value: boolean) => {
    setSponsorProduct(value);
  };

  const handleDiscountTypeChange = (type: 'noDiscount' | 'percentageDiscount') => {
    setDiscountType(type);
  };

  const handleBasePriceChange = (price: number) => {
    setBasePrice(price);
  };

  const handleDiscountPriceChange = (price: number) => {
    setDiscountPrice(price);
  };

  const handleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const vendorEmail = localStorage.getItem('vendorEmail');

    console.log('Product Image Form:', productImage);

    try {
      const formData = new FormData();
      formData.append('vendorEmail', vendorEmail ? vendorEmail : '');
      formData.append('name', productName);
      formData.append('description', productDescription);
      formData.append('image', productImage?.src || '');
      formData.append('category', productCategory);
      formData.append('brand', productBrand);
      formData.append('gender', productGender);
      formData.append('colours', JSON.stringify(colors));
      formData.append('sponsored', sponsorProduct.toString());
      formData.append('shipping', 'regular');
      formData.append('rating', '4.5');
      formData.append('numOfReviews', '0');
      formData.append('price', basePrice.toString());
      formData.append('discountPrice', discountPrice.toString());
      formData.append('deliveryTime', deliveryTime.toString());
      formData.append('deliveryNote', deliveryNote);
      formData.append('refund', refund.toString());
      formData.append('stockNumber', productStock.toString());

      if (selectedProduct) {
        // Update existing product
        const response = await axios.put(
          `https://unibackend.onrender.com/api/v1/products/${selectedProduct._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        console.log('Product updated:', response.data);
      } else {
        // Create new product
        const response = await axios.post('https://unibackend.onrender.com/api/v1/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Product created:', response.data);
      }

      onRequestClose();
    } catch (error) {
      console.error('Error creating/updating product:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Product Modal"
      className="fixed bg-white inset-0 z-50 max-w-[100vw] overflow-auto" // Add max-w-[90vw] max-h-[90vh] overflow-auto
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <Nav toggleMobileVisibility={toggleMobileVisibility} />

      <div className='flex'>
        <Aside isMobileVisible={isMobileVisible} />
        <div className="bg-white rounded-lg shadow-md p-6 mx-auto w-full h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add New Product</h2>
            <div>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2">Delete</button>
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">+ Add Product</button>
            </div>
          </div>
          <div className="mb-4">
            <button
              className={`inline-flex items-center px-4 py-2 rounded-l ${step === 1 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Product Details
            </button>
            <button
              className={`inline-flex items-center px-4 py-2 rounded-r ${step === 2 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Advanced
            </button>
          </div>
          <div>
            {step === 1 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">General Information</h3>
                <div className="mb-4">
                  <label htmlFor="productName" className="block font-semibold mb-1">Product Name</label>
                  <input
                    type="text"
                    id="productName"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="MACBOOK PRO 16-INCH, APPLE M3"
                  />
                  <p className="text-sm text-gray-500">A product name is required for your product</p>
                </div>
                <div className="mb-4">
                  <label htmlFor="productId" className="block font-semibold mb-1">Product ID</label>
                  <input
                    type="text"
                    id="productId"
                    value="#290888890"
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                  />
                  <p className="text-sm text-gray-500">Code will be generated automatically</p>
                </div>
                <div className="mb-4">
                  <label htmlFor="productDescription" className="block font-semibold mb-1">Description (Specifications)</label>
                  <textarea
                    id="productDescription"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Add a clear and concise description of your product"
                    rows={5}
                  />

                  <div className="mb-4">
                    <label htmlFor="productImage" className="block font-semibold mb-1">
                      Product Image
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="productImageUpload"
                        className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-md cursor-pointer"
                      >
                        {productImage ? (
                          <Image
                            src='productImage.src'
                            alt="Product Preview"
                            className="max-h-32 max-w-full object-contain"
                          />
                        ) : (
                          <div className="text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <p className="mt-1 text-sm text-gray-600">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PNG, JPG or JPEG up to 5MB</p>
                          </div>
                        )}
                      </label>
                      <input
                        id="productImageUpload"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleProductImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="productCategory" className="block font-semibold mb-1">
                    Product Category
                  </label>
                  <select
                    id="productCategory"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="">Select Category</option>
                    <option value="foodstuffs">Foodstuffs</option>
                    <option value="provisions">Provisions</option>
                    <option value="fruits">Fruits</option>
                    <option value="jewelry & accessories">Jewelry & Accessories</option>
                    <option value="gadgets">Gadgets</option>
                    <option value="footwear">Footwear</option>
                    <option value="bags">Bags</option>
                    <option value="clothes">Clothes</option>
                    <option value="cakes">Cakes</option>
                    <option value="fan">Fan</option>
                    <option value="raw materials">Raw materials </option>
                    <option value="skincare">Skincare</option>
                    <option value="soap">Soap</option>
                    <option value="perfume">Perfume</option>
                    <option value="drinks">Drinks</option>
                    <option value="home accessories">Home accessories</option>
                    <option value="stationery">Stationery</option>
                    <option value="snacks">Snacks</option>
                    <option value="cakes">Cakes</option>
                    <option value="fastfood">Fastfood</option>
                    <option value="haircare">Haircare</option>
                    <option value="books">Books</option>
                    <option value="barbing">Barbing</option>
                    <option value="hair Styling">Hairstyling</option>
                    <option value="graphics">Graphics</option>
                    <option value="delivery">Delivery</option>
                    <option value="massage">Massage</option>
                    <option value="fashion design">Fashion design</option>
                    <option value="photography">Photography</option>
                    <option value="videography/animations">Videography/Animations</option>
                    <option value="laundry">Laundry</option>
                    <option value="surprise packages">Surprise packages</option>
                    <option value="hardware repairs">Hardware Repairs</option>
                    <option value="printing">Printing</option>
                    <option value="writing">Writing</option>
                    <option value="content creation">Content creation</option>
                    <option value="artwork">Artwork</option>
                    <option value="lingerie">Lingerie</option>
                    <option value="tutorials">Tutorials</option>
                    <option value="housing">Housing</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="productBrand" className="block font-semibold mb-1">
                    Product Brand
                  </label>
                  <input
                    id="productBrand"
                    value={productBrand}
                    onChange={(e) => setProductBrand(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="productGender" className="block font-semibold mb-1">
                    Gender
                  </label>
                  <div className="flex items-center">
                    <div className="mr-4">
                      <label htmlFor="male" className="inline-flex items-center">
                        <input
                          id="male"
                          type="radio"
                          value="male"
                          checked={productGender === 'male'}
                          onChange={() => setProductGender('male')}
                          className="form-radio h-5 w-5 text-red-500"
                        />
                        <span className="ml-2">Male</span>
                      </label>
                    </div>
                    <div className="mr-4">
                      <label htmlFor="female" className="inline-flex items-center">
                        <input
                          id="female"
                          type="radio"
                          value="female"
                          checked={productGender === 'female'}
                          onChange={() => setProductGender('female')}
                          className="form-radio h-5 w-5 text-red-500"
                        />
                        <span className="ml-2">Female</span>
                      </label>
                    </div>
                    <div>
                      <label htmlFor="unisex" className="inline-flex items-center">
                        <input
                          id="unisex"
                          type="radio"
                          value="unisex"
                          checked={productGender === 'unisex'}
                          onChange={() => setProductGender('unisex')}
                          className="form-radio h-5 w-5 text-red-500"
                        />
                        <span className="ml-2">Unisex</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="productStock" className="block font-semibold mb-1">
                    Stock Availability
                  </label>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setProductStock(productStock - 1)}
                      disabled={productStock === 1}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-l-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <input
                      id="productStock"
                      type="text"
                      value={productStock}
                      readOnly
                      className="w-16 px-3 py-2 text-center border-t border-b border-gray-300 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setProductStock(productStock + 1)}
                      className="px-4 py-2 text-gray-700 bg-gray-200 rounded-r-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  {/* <label htmlFor="productVisibility" className="block font-semibold mb-1">
                                        Product Visibility
                                    </label> */}
                  {/* <div className="flex items-center">
                                        <div className="mr-4">
                                            <select
                                                id="schedule"
                                                // value={scheduledDate}
                                                // onChange={(e) => setScheduledDate(e.target.value)}
                                                className="form-select"
                                            >
                                                <option value="">Schedule</option>
                                                <option value="">Publish</option>
                                            </select>

                                        </div>
                                        <div>
                                            <label htmlFor="hideProduct" className="inline-flex items-center">
                                                <input
                                                    id="hideProduct"
                                                    type="checkbox"
                                                    //   checked={isHidden}
                                                    //   onChange={(e) => setIsHidden(e.target.checked)}
                                                    className="form-checkbox h-5 w-5 text-red-500"
                                                />
                                                <span className="ml-2">Hide this product</span>
                                            </label>
                                        </div>
                                    </div> */}
                </div>
                {/* Render category, brand, gender, and stock availability sections */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={onRequestClose}
                    className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Next
                  </button>
                </div>
              </div>

            )}


            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Advanced</h2>
                <form onSubmit={handleSubmit}>
                  {/* Product Pricing */}
                  <div className="mb-4">
                    <label htmlFor="productPricing" className="block font-semibold mb-1">
                      Product Pricing
                    </label>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <input
                          id="noDiscount"
                          type="radio"
                          value="noDiscount"
                          name="discountType"
                          checked={discountType === 'noDiscount'}
                          onChange={() => handleDiscountTypeChange('noDiscount')}
                          className="form-radio h-5 w-5 text-red-500"
                        />
                        <label htmlFor="noDiscount" className="ml-2">
                          No Discount
                        </label>
                      </div>
                      <div>
                        <input
                          id="percentageDiscount"
                          type="radio"
                          value="percentageDiscount"
                          name="discountType"
                          checked={discountType === 'percentageDiscount'}
                          onChange={() => handleDiscountTypeChange('percentageDiscount')}
                          className="form-radio h-5 w-5 text-red-500"
                        />
                        <label htmlFor="percentageDiscount" className="ml-2">
                          Percentage %
                        </label>
                      </div>
                    </div>
                    {discountType === 'noDiscount' ? (
                      <div className="mt-2">
                        <label htmlFor="basePrice" className="block font-semibold mb-1">
                          Base Price
                        </label>
                        <input
                          type="number"
                          id="basePrice"
                          value={basePrice}
                          onChange={(e) => handleBasePriceChange(parseInt(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    ) : (
                      <div className="mt-2 flex items-center">
                        <div className="mr-4">
                          <label htmlFor="basePrice" className="block font-semibold mb-1">
                            Base Price
                          </label>
                          <input
                            type="number"
                            id="basePrice"
                            value={basePrice}
                            onChange={(e) => handleBasePriceChange(parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="discountPrice" className="block font-semibold mb-1">
                            Discount Price
                          </label>
                          <input
                            type="number"
                            id="discountPrice"
                            value={discountPrice}
                            onChange={(e) => handleDiscountPriceChange(parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>


                  {/* Available Color */}
                  <div className="mb-4">
                    <label htmlFor="availableColors" className="block font-semibold mb-1">
                      Available Color
                    </label>
                    <div className="flex items-center">
                      {colors.map((color) => (
                        <div key={color} className="mr-4 flex items-center">
                          <div
                            className="h-8 w-8 rounded-full"
                            style={{ backgroundColor: color.toLowerCase() }}
                          />
                          <label className="ml-2">{color}</label>
                          <button
                            type="button"
                            onClick={() => handleRemoveColor(color)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={handleColorPicker}
                      className="mt-2 px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      + Add more color
                    </button>
                    {showColorPicker && (
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Select a color:</h3>
                        <div className="flex">
                          {['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'brown', 'gray', 'black', 'white', 'wine', 'gold', 'silver'].map(
                            (color) => (
                              <button
                                key={color}
                                type="button"
                                onClick={() => handleAddColor(color)}
                                className={`h-8 w-8 rounded-full mr-2 ${colors.includes(color) ? 'opacity-50 cursor-not-allowed' : ''
                                  }`}
                                style={{ backgroundColor: color }}
                              />
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Delivery Time */}
                  <div className="mb-4">
                    <label htmlFor="deliveryTime" className="block font-semibold mb-1">
                      Delivery Time (minutes)
                    </label>
                    <p className="text-gray-600 mt-1">How long will it take to package and prepare this product? (in minutes)</p>
                    <input
                      type="number"
                      id="deliveryTime"
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      min={1}
                      max={10080}
                    />
                  </div>

                  {/* Delivery Note */}
                  <div className="mb-4">
                    <label htmlFor="deliveryNote" className="block font-semibold mb-1">
                      Delivery Note
                    </label>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <input
                          id="freeDelivery"
                          type="radio"
                          value="Free delivery"
                          name="deliveryNote"
                          checked={deliveryNote === 'Free delivery'}
                          onChange={() => setDeliveryNote('Free delivery')}
                          className="form-radio h-5 w-5 text-red-500"
                        />
                        <label htmlFor="freeDelivery" className="ml-2">
                          Free delivery
                        </label>
                      </div>
                      <div>
                        <input
                          id="deliveryCharges"
                          type="radio"
                          value="Delivery Charges apply"
                          name="deliveryNote"
                          checked={deliveryNote === 'Delivery Charges apply'}
                          onChange={() => setDeliveryNote('Delivery Charges apply')}
                          className="form-radio h-5 w-5 text-red-500"
                        />
                        <label htmlFor="deliveryCharges" className="ml-2">
                          Delivery Charges apply
                        </label>
                      </div>
                    </div>
                  </div>


                  {/* Refund */}
                  <div className="mb-4">
                    <label htmlFor="refund" className="block font-semibold mb-1">
                      Refund
                    </label>
                    <p className="text-gray-600 mt-1">Do you offer a refund for this product?</p>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <input
                          id="refundTrue"
                          type="radio"
                          value="true"
                          name="refund"
                          checked={refund === true}
                          onChange={() => setRefund(true)}
                          className="form-radio h-5 w-5 text-red-500"
                        />
                        <label htmlFor="refundTrue" className="ml-2">
                          Yes
                        </label>
                      </div>
                      <div>
                        <input
                          id="refundFalse"
                          type="radio"
                          value="false"
                          name="refund"
                          checked={refund === false}
                          onChange={() => setRefund(false)}
                          className="form-radio h-5 w-5 text -red-500"
                        />
                        <label htmlFor="refundFalse" className="ml-2">
                          No
                        </label>
                      </div>
                    </div>
                    
                  </div>

                  {/* Product Sponsorship */}
                  <div className="mb-4">
                    <label htmlFor="productSponsorship" className="block font-semibold mb-1">
                      Would you like to sponsor your product?
                    </label>
                    <p className="text-gray-600 mb-2">
                      Sponsoring your product will significantly boost your sales and audience engagement
                    </p>
                    <p className="text-gray-600 mb-2">
                      Your product will be displayed live on our homepage when sponsored
                    </p>
                    <div className="flex items-center">
                      <div className="mr-4">
                        <input
                          id="sponsorProduct"
                          type="radio"
                          value="sponsor"
                          name="productSponsorship"
                          checked={sponsorProduct}
                          onChange={() => handleSponsorshipChange(true)}
                          className="form-radio h-5 w-5 text-red-500"
                        />
                        <label htmlFor="sponsorProduct" className="ml-2">
                          Yes, I do
                        </label>
                      </div>
                      <div>
                        <input
                          id="noSponsor"
                          type="radio"
                          value="noSponsor"
                          name="productSponsorship"
                          checked={!sponsorProduct}
                          onChange={() => handleSponsorshipChange(false)}
                          className="form-radio h-5 w-5 text-red-500"
                        />
                        <label htmlFor="noSponsor" className="ml-2">
                          No, I don't
                        </label>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2">Charges fee apply</p>
                  </div>

                  {sponsorProduct && (
                    <div className="mb-4">
                      <label htmlFor="paymentMethod" className="block font-semibold mb-1">
                        Payment Method
                      </label>
                      <p className="text-gray-600 mb-2">Manage payment and billing method</p>
                      {/* <div className="flex items-center mb-2">
                                                <div className="flex items-center mr-4">
                                                    <Image src={flutterwwave} alt="Flutterwave" className="h-8 w-8 mr-2" />
                                                    <input
                                                        id="paymentMethod1"
                                                        type="radio"
                                                        value="paymentMethod1"
                                                        name="paymentMethod"
                                                        className="form-radio h-5 w-5 text-red-500"
                                                    />
                                                    <label htmlFor="paymentMethod1" className="ml-2">
                                                        Flutterwave
                                                    </label>
                                                </div>
                                                <div className="flex items-center mr-4">
                                                    <Image src={paystack} alt="Paystack" className="h-8 w-8 mr-2" />
                                                    <input
                                                        id="paymentMethod2"
                                                        type="radio"
                                                        value="paymentMethod2"
                                                        name="paymentMethod"
                                                        className="form-radio h-5 w-5 text-red-500"
                                                    />
                                                    <label htmlFor="paymentMethod2" className="ml-2">
                                                        Paystack
                                                    </label>
                                                </div>
                                                <div className="flex items-center">
                                                    <Image src={flutterwwave} alt="OPay" className="h-8 w-8 mr-2" />
                                                    <input
                                                        id="paymentMethod3"
                                                        type="radio"
                                                        value="paymentMethod3"
                                                        name="paymentMethod"
                                                        className="form-radio h-5 w-5 text-red-500"
                                                    />
                                                    <label htmlFor="paymentMethod3" className="ml-2">
                                                        OPay
                                                    </label>
                                                </div>
                                            </div> */}
                      <div className="flex items-center">
                        <span className="text-gray-600 mr-2">Promotion fee*</span>
                        <span className="font-semibold">3,000 (NGN)</span>
                      </div>
                      <Image src={paymentImage} alt='' width={40} height={40} className='p-2 bg-[#FEF0F1] mt-2 rounded-md text-center h-[20%] flex justify-center items-center w-[40%]' />
                      <button
                        className="bg-red-900 text-white px-4 py-2 rounded mt-4"
                        onClick={() => {
                          // Send a WhatsApp message to 09159945550
                          window.open('https://wa.me/2349159945550?text=I%27ve%20sent%20the%20money%20for%20product%20sponsorship');
                          // Wait 2 hours before adding sponsored true to the product
                          setTimeout(() => {
                            setSponsorProduct(true);
                          }, 2 * 60 * 60 * 1000);
                        }}
                      >
                        I've sent the money
                      </button>
                    </div>
                  )}

                  {/* Previous and Submit buttons */}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-white bg-red-900 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddProductModal;