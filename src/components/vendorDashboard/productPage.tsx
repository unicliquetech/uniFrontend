import React, { useState } from 'react';
import AddProductModal from '@/components/vendorDashboard/addProductModal';
import Nav from '@/components/vendorDashboard/nav';

interface ProductCardProps {
    product: {
        name: string;
        description: string;
        price: number;
        imageUrl: string;
        discount?: number;
        sponsored: boolean;
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md relative">
            {product.sponsored && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md">Sponsored</span>
            )}
            <a href={`/product/${product.name.replace(/\s/g, '-').toLowerCase()}`}>
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
            </a>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">
                    Price: <span className="text-red-500 font-bold">₦{product.price.toLocaleString()}</span>
                    <span className="line-through ml-2 text-gray-400">₦{(product.price * 1.1).toLocaleString()}</span>
                </p>
                {product.discount && <small className="bg-red-900 px-1 rounded-md text-white mb-4"> -{product.discount}%</small>}
                <div className="flex justify-between">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300">Edit</button>
                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300">Delete</button>
                </div>
            </div>
        </div>
    );
};


// Sample product data
const products = [
    {
        name: 'MACBOOK PRO 16-INCH, APPLE M3',
        description: 'This is a MACBOOK PRO 16-INCH, APPLE M3',
        price: 340000,
        imageUrl: 'https://via.placeholder.com/150',
        discount: 10,
        sponsored: false,
    },
    {
        name: 'MACBOOK PRO 16-INCH, APPLE M3',
        description: 'This is a MACBOOK PRO 16-INCH, APPLE M3',
        price: 340000,
        imageUrl: 'https://via.placeholder.com/150',
        discount: 10,
        sponsored: true,
    },
    {
        name: 'MACBOOK PRO 16-INCH, APPLE M3',
        description: 'This is a MACBOOK PRO 16-INCH, APPLE M3',
        price: 340000,
        imageUrl: 'https://via.placeholder.com/150',
        discount: 10,
        sponsored: false,
    },
    {
        name: 'MACBOOK PRO 16-INCH, APPLE M3',
        description: 'This is a MACBOOK PRO 16-INCH, APPLE M3',
        price: 340000,
        imageUrl: 'https://via.placeholder.com/150',
        discount: 10,
        sponsored: false,
    },
    {
        name: 'MACBOOK PRO 16-INCH, APPLE M3',
        description: 'This is a MACBOOK PRO 16-INCH, APPLE M3',
        price: 340000,
        imageUrl: 'https://via.placeholder.com/150',
        discount: 10,
        sponsored: false,
    },
    {
        name: 'MACBOOK PRO 16-INCH, APPLE M3',
        description: 'This is a MACBOOK PRO 16-INCH, APPLE M3',
        price: 340000,
        imageUrl: 'https://via.placeholder.com/150',
        discount: 10,
        sponsored: false,
    },
    {
        name: 'MACBOOK PRO 16-INCH, APPLE M3',
        description: 'This is a MACBOOK PRO 16-INCH, APPLE M3',
        price: 340000,
        imageUrl: 'https://via.placeholder.com/150',
        discount: 10,
        sponsored: false,
    },
];

const VendorProducts: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const [isModalOpen, setIsModalOpen] = useState(false);


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
                    className={`px-4 py-2 ${currentPage === i ? 'bg-red-500 text-white' : 'bg-white text-gray-700'}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </span>
            );
        }
        return pageNumbers;
    };

    return (
        <main className='w-[100%] flex flex-col'>
            <div>
                <Nav />
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">My Product Catalogue</h1>
                        <button
                            className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <b>+</b> Add Product
                        </button>

                        <AddProductModal
                            isOpen={isModalOpen}
                            onRequestClose={() => setIsModalOpen(false)}
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
                                <ProductCard key={index} product={product} />
                            ))}
                        </div>
                        <div className="flex justify-center mt-8">
                            <div className="bg-white rounded-md flex gap-2 shadow-md">
                                <button
                                    className="px-4 py-2 rounded-l-md bg-gray-200 text-gray-700"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                {renderPageNumbers()}
                                <button
                                    className="px-4 py-2 rounded-r-md bg-gray-200 text-gray-700"
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
        </main>
    );
};

export default VendorProducts;