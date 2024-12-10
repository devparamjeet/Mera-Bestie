import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, MessageSquare, Users, Calendar, LayoutDashboard } from 'lucide-react';

const Sidebar = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        img: '',
        category: '',
        rating: 0,
        productId: '',
        inStockValue: 0,
        soldStockValue: 0
    });
    const location = useLocation();

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard />, path: '/admin' },
        { name: 'Products', icon: <Package />, path: '/admin/products' },
        { name: 'Orders', icon: <ShoppingBag />, path: '/admin/orders' },
        { name: 'Complaints', icon: <MessageSquare />, path: '/admin/complaints' },
        { name: 'Customers', icon: <Users />, path: '/admin/customers' },
        { name: 'Calendar', icon: <Calendar />, path: '/admin/calendar' },
    ];

    const generateProductId = () => {
        const randomId = Math.floor(100000 + Math.random() * 900000).toString();
        setProductData({...productData, productId: randomId});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData({...productData, [name]: value});
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('https://ecommercebackend-8gx8.onrender.com/create-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });
            
            if(response.ok) {
                setShowDialog(false);
                setProductData({
                    name: '',
                    price: '',
                    img: '',
                    category: '',
                    rating: 0,
                    productId: '',
                    inStockValue: 0,
                    soldStockValue: 0
                });
            }
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <>
            {/* Dialog Overlay - Enhanced styling */}
            {showDialog && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl transform transition-all">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={productData.name}
                            onChange={handleInputChange}
                            className="w-full mb-4 p-3 border border-gray-200 rounded-lg focus:ring-2 
                            focus:ring-pink-300 focus:border-transparent outline-none transition-all"
                        />
                        <input
                            type="text"
                            name="price"
                            placeholder="Price"
                            value={productData.price}
                            onChange={handleInputChange}
                            className="w-full mb-4 p-3 border border-gray-200 rounded-lg focus:ring-2 
                            focus:ring-pink-300 focus:border-transparent outline-none transition-all"
                        />
                        <input
                            type="text"
                            name="img"
                            placeholder="Image URL"
                            value={productData.img}
                            onChange={handleInputChange}
                            className="w-full mb-4 p-3 border border-gray-200 rounded-lg focus:ring-2 
                            focus:ring-pink-300 focus:border-transparent outline-none transition-all"
                        />
                        <input
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={productData.category}
                            onChange={handleInputChange}
                            className="w-full mb-4 p-3 border border-gray-200 rounded-lg focus:ring-2 
                            focus:ring-pink-300 focus:border-transparent outline-none transition-all"
                        />
                        <input
                            type="number"
                            name="rating"
                            placeholder="Rating"
                            value={productData.rating}
                            onChange={handleInputChange}
                            className="w-full mb-4 p-3 border border-gray-200 rounded-lg focus:ring-2 
                            focus:ring-pink-300 focus:border-transparent outline-none transition-all"
                        />
                        <div className="flex mb-3">
                            <input
                                type="text"
                                name="productId"
                                placeholder="Product ID"
                                value={productData.productId}
                                readOnly
                                className="w-2/3 p-2 border rounded-l"
                            />
                            <button
                                onClick={generateProductId}
                                className="w-1/3 bg-pink-500 text-white p-2 rounded-r"
                            >
                                Generate
                            </button>
                        </div>
                        <input
                            type="number"
                            name="inStockValue"
                            placeholder="In Stock"
                            value={productData.inStockValue}
                            onChange={handleInputChange}
                            className="w-full mb-4 p-3 border border-gray-200 rounded-lg focus:ring-2 
                            focus:ring-pink-300 focus:border-transparent outline-none transition-all"
                        />
                        <input
                            type="number"
                            name="soldStockValue"
                            placeholder="Sold Stock"
                            value={productData.soldStockValue}
                            onChange={handleInputChange}
                            className="w-full mb-4 p-3 border border-gray-200 rounded-lg focus:ring-2 
                            focus:ring-pink-300 focus:border-transparent outline-none transition-all"
                        />
                        <div className="flex justify-end gap-4 mt-8">
                            <button
                                onClick={() => setShowDialog(false)}
                                className="px-6 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl 
                                transition-all duration-300 font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-2.5 bg-pink-500 hover:bg-pink-600 text-white rounded-xl 
                                transition-all duration-300 font-medium shadow-lg shadow-pink-500/30"
                            >
                                Save Product
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Simplified Sidebar - No toggle functionality */}
            <div className="fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-40
                flex flex-col border-r border-gray-100"
            >
                <div className="flex items-center p-6 border-b border-gray-100">
                    <div className="text-2xl font-bold text-pink-600">
                        Mera Bestie
                    </div>
                </div>

                {/* Menu Items - Simplified */}
                <div className="flex-grow overflow-y-auto scrollbar-hide">
                    <ul className="space-y-2 p-4">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center p-3 rounded-xl transition-all duration-300
                                        justify-start space-x-4
                                        ${location.pathname === item.path 
                                            ? 'bg-pink-50 text-pink-600 font-medium shadow-sm' 
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-pink-600'}`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Footer - Simplified */}
                <div className="border-t border-gray-100 p-4">
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                            Manage your products easily
                        </p>
                        <button 
                            onClick={() => setShowDialog(true)}
                            className="w-full bg-pink-500 text-white py-3 px-4 rounded-xl hover:bg-pink-600 
                            transition-all duration-300 font-medium shadow-lg shadow-pink-500/30"
                        >
                            + Add Product
                        </button>
                        <footer className="text-center text-gray-400 text-sm pt-4">
                            Mera Bestie Admin © 2023
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
