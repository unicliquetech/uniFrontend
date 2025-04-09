import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '@/styles/Vendor.module.css';
import AddProductModal from '@/components/vendorDashboard/addProductModal';
import Nav from '@/components/vendorDashboard/nav';
import Aside from '@/components/vendorDashboard/Aside';

interface ErrorType {
    message: string;
}

interface ProductType {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string | string[];
    discount?: number;
    sponsored: boolean;
    category?: string;
}

interface ProductCardProps {
    product: ProductType;
    onImageClick: (imageUrl: string | string[]) => void;
    onEdit: (product: ProductType) => void;
    onDelete: (productId: string) => void;
    refreshProducts: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onImageClick, onEdit, onDelete, refreshProducts }) => {
    const [deletionMessage, setDeletionMessage] = useState('');

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`https://unibackend.onrender.com/api/v1/products/${product._id}`);
            setDeletionMessage(response.data.msg || 'Product deleted successfully');
            setTimeout(() => {
                setDeletionMessage('');
                refreshProducts(); // Refresh products after deletion
            }, 3000);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const productImage = Array.isArray(product.image) ? product.image[0] : product.image;

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

            <img 
                src={productImage} 
                alt={product.name} 
                className="w-full productImage h-48 object-cover rounded-t-lg"
                onClick={() => onImageClick(product.image)} 
            />

            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">
                    Price: <span className="text-red-500 font-bold">₦{product?.price?.toLocaleString() || ''}</span>
                    <span className="line-through ml-2 text-gray-400">₦{product?.discount?.toLocaleString() || ''}</span>
                </p>
                {product.discount && <small className="bg-red-900 px-1 rounded-md text-white mb-4"> -{product.discount}%</small>}
                <div className="flex justify-between">
                    <button
                        className="bg-red-900 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                        onClick={() => onEdit(product)}
                    >
                        Edit
                    </button>
                    <button 
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

const VendorProducts: React.FC = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [productsByCategory, setProductsByCategory] = useState<{ [key: string]: ProductType[] }>({});
    const [categories, setCategories] = useState<string[]>([]);
    const [fullImage, setFullImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ErrorType | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobileVisible, setIsMobileVisible] = useState<boolean>(false);

    const productsPerPage = 6;
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const fetchProducts = async () => {
        const vendorEmail = localStorage.getItem('vendorEmail');
        try {
            setIsLoading(true);
            const response = await axios.get(`https://unibackend.onrender.com/api/v1/products/${vendorEmail}`);
            const fetchedProducts = response.data.products;

            // Group products by category
            const groupedProducts = fetchedProducts.reduce((acc: { [key: string]: ProductType[] }, product: ProductType) => {
                const category = product.category || 'Uncategorized';
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(product);
                return acc;
            }, {});

            setProducts(fetchedProducts);
            setProductsByCategory(groupedProducts);
            setCategories(Object.keys(groupedProducts));
        } catch (err) {
            setError(err as ErrorType);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
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
                    className={`px-4 py-2 cursor-pointer ${currentPage === i ? 'bg-white text-red-900' : 'bg-white text-gray-700'}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </span>
            );
        }
        return pageNumbers;
    };

    const handleImageClick = (imageUrl: string | string[]) => {
        setFullImage(Array.isArray(imageUrl) ? imageUrl[0] : imageUrl);
    };

    const handleEdit = (product: ProductType) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = (productId: string) => {
        // This function doesn't need implementation as deletion is handled within ProductCard
        // It's just here to satisfy the prop requirements
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
                            onClick={() => {
                                setSelectedProduct(null);
                                setIsModalOpen(true);
                            }}
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
                            onProductSaved={fetchProducts}
                        />
                    </div>

                    {isLoading ? (
                        <div className="text-center py-8">Loading products...</div>
                    ) : error ? (
                        <div className="text-center py-8 text-red-600">Error loading products: {error.message}</div>
                    ) : categories.length === 0 ? (
                        <div className="text-center py-8">No products found. Add your first product!</div>
                    ) : (
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Products</h2>

                            {categories.map((category) => (
                                <div key={category} className="mb-8">
                                    <h2 className="text-xl font-semibold mb-4">Product Category: {category.toUpperCase()}</h2>
                                    <div className="grid grid-cols-1 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {productsByCategory[category].map((product, index) => (
                                            <ProductCard 
                                                key={`${product._id}-${index}`} 
                                                product={product} 
                                                onImageClick={handleImageClick}
                                                onEdit={handleEdit}
                                                onDelete={handleDelete}
                                                refreshProducts={fetchProducts}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {totalPages > 1 && (
                                <div className="flex justify-center mt-8 mb-8">
                                    <div className="bg-white rounded-md flex gap-2 shadow-md">
                                        <button
                                            className="px-4 py-2 rounded-l-md bg-red-900 text-white disabled:bg-gray-400"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </button>
                                        {renderPageNumbers()}
                                        <button
                                            className="px-4 py-2 rounded-r-md bg-red-900 text-white disabled:bg-gray-400"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
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