import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/styles/Vendor.module.css';
import AddProductModal from '@/components/vendorDashboard/addProductModal';
import Nav from '@/components/vendorDashboard/nav';
import Aside from '@/components/vendorDashboard/Aside';


interface ProductCardProps {
    product: {
        _id: string;
        name: string;
        description: string;
        price: number;
        image: string;
        discount?: number;
        sponsored: boolean;
    };
    onImageClick: (imageUrl: string) => void;
}

// interface ErrorType {
//     message: string;
// }

const ProductCard: React.FC<ProductCardProps> = ({ product,  onImageClick }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fullImage, setFullImage] = useState<string | null>(null);
    const [error, setError] = useState<ErrorType | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<ProductCardProps['product'] | null>(null);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [deletionMessage, setDeletionMessage] = useState('');

    useEffect(() => {
        const vendorEmail = localStorage.getItem('vendorEmail');
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://unibackend.onrender.com/api/v1/products/${vendorEmail}`);
                setProducts(response.data.products);
            } catch (err) {
                setError(err as ErrorType);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    

    // const handleEditClick = (product: ProductCardProps['product']) => {
    //     setSelectedProduct(product);
    //     setIsModalOpen(true);
    //   };

    // const handleEditButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     event.preventDefault(); // Prevent default button behavior if needed
    //     onEdit(product);
    //   };


    const handleEdit = async () => {
        try {
          const response = await axios.patch(`https://unibackend.onrender.com/api/v1/products/${product._id}`, {
            name: product.name,
            price: product.price,
          });
    
          console.log('Product updated:', response.data.product);
        } catch (error) {
          console.error('Error updating product:', error);
        }
      };

      useEffect(() => {
        return () => {
          setDeletionMessage('');
        };
      }, []);
    
      const handleDelete = async () => {
        try {
          const response = await axios.delete(`https://unibackend.onrender.com/api/v1/products/${product._id}`);
          console.log('Product deleted:', response.data.msg);
          setTimeout(() => {
            setDeletionMessage('');
          }, 5000);
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      };

      const handleImageClick = (imageUrl: string) => {
        setFullImage(imageUrl);
      };

    return (
        <div className="bg-white rounded-lg shadow-md relative">
            {product.sponsored && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md">Sponsored</span>
            )}
            {deletionMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              {deletionMessage}
            </div>
          )}

                <img src={product.image} alt={product.name} className="w-full productImage h-48 object-cover rounded-t-lg"
                    onClick={() => onImageClick(product.image)} />

            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">
                    Price: <span className="text-red-500 font-bold">₦{product && product.price ? product.price.toLocaleString() : ''}</span>
                    <span className="line-through ml-2 text-gray-400">₦{product && product.discount ? product.discount.toLocaleString() : ''}</span>
                </p>
                {product.discount && <small className="bg-red-900 px-1 rounded-md text-white mb-4"> -{product.discount}%</small>}
                <div className="flex justify-between">
                    {/* <button
                            className="bg-red-900 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Edit
                        </button> */}
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300"
                        onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
      

interface ErrorType {
    message: string;
}

const VendorProducts: React.FC = () => {
    const [products, setProducts] = useState([]);
    const [showFullImage, setShowFullImage] = useState(false);
    const [fullImage, setFullImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ErrorType | null>(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobileVisible, setIsMobileVisible] = useState<boolean>(false);


    useEffect(() => {
        const vendorEmail = localStorage.getItem('vendorEmail');
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://unibackend.onrender.com/api/v1/products/${vendorEmail}`);
                setProducts(response.data.products);
            } catch (err) {
                setError(err as ErrorType);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const toggleMobileVisibility = () => {
        setIsMobileVisible(!isMobileVisible);
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <span
                    key={i}
                    className={`px-4 py-2 ${currentPage === i ? 'bg-white text-red-900' : 'bg-white text-gray-700'}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </span>
            );
        }
        return pageNumbers;
    };

    const handleImageClick = (imageUrl: string) => {
        setFullImage(imageUrl);
    };

    return (
        <main className='w-[100%] flex flex-col'>
            <div>
                <Nav toggleMobileVisibility={toggleMobileVisibility} />
                <Aside isMobileVisible={isMobileVisible} />
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">My Product Catalogue</h1>
                        <button
                            className="bg-red-900 text-white font-semibold px-4 py-2 rounded-md"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <b>+</b> Add Product
                        </button>
                        

                        <AddProductModal
                            isOpen={isModalOpen}
                            onRequestClose={() => {
                              setIsModalOpen(false);
                              setSelectedProduct(null);
                            }}
                            selectedProduct={selectedProduct}
                        />

                    </div>
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Product Category</h2>
                        <div className="mb-8">
                            <nav className="flex items-center">
                                <a href="/category/macbooks" className="text-gray-600 hover:text-red-500 mr-4">
                                    Macbooks
                                </a>
                                <span className="text-gray-400 mr-4">&gt;</span>
                                <a href="/category/laptops" className="text-gray-600 hover:text-red-500 mr-4">
                                    Laptops
                                </a>
                                <span className="text-gray-400 mr-4">&gt;</span>
                                <a href="/category/androids" className="text-gray-600 hover:text-red-500 mr-4">
                                    Androids
                                </a>
                                <span className="text-gray-400 mr-4">&gt;</span>
                                <a href="/category/iphones" className="text-gray-600 hover:text-red-500">
                                    Iphones
                                </a>
                            </nav>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Products</h2>
                        <div className="grid grid-cols-1 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {currentProducts.map((product, index) => (
                                <ProductCard key={index} product={product} onImageClick={handleImageClick} />
                            ))}
                        </div>
                        <div className="flex justify-center mt-8 mb-8">
                            <div className="bg-white rounded-md flex gap-2 shadow-md">
                                <button
                                    className="px-4 py-2 rounded-l-md bg-red-900 text-white"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                {renderPageNumbers()}
                                <button
                                    className="px-4 py-2 rounded-r-md bg-red-900 text-white"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                 </div>
                 {fullImage && (
                <div className={styles.fullImageOverlay} onClick={() => setFullImage(null)}>
                    <img src={fullImage} alt="Full size product" className={styles.fullImage} />
                </div>
            )}
        </main>
        
    );
};

export default VendorProducts;