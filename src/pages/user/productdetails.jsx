import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/user/navbar/navbar';
import { Helmet } from "react-helmet";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showAddAnimation, setShowAddAnimation] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://ecommercebackend-8gx8.onrender.com/product/${productId}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.product);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    const userId = sessionStorage.getItem('userId');
    
    if (!userId) {
      setShowLoginDialog(true);
      return;
    }

    try {
      const response = await fetch('https://ecommercebackend-8gx8.onrender.com/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productId,
          quantity
        }),
      });
      
      const data = await response.json();
      
      if (data.success && data.message === 'Product added to cart successfully') {
        setShowAddAnimation(true);
        setTimeout(() => {
          setShowAddAnimation(false);
          toast(
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/cart')}>
              Go to Cart →
            </div>,
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            }
          );
        }, 1500);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <>
    <Helmet>
      <title>Product Details | Mera Bestie</title>
    </Helmet>
      <Navbar />
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12">
        <AnimatePresence>
          {showLoginDialog && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Oops! You're not logged in</h2>
                <p className="mb-6">Please login to add products to your cart</p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowLoginDialog(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                  >
                    Login
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAddAnimation && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg z-50"
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ y: [0, 20, 0], rotate: [0, 360] }}
                  transition={{ duration: 1, repeat: 1 }}
                  className="w-8 h-8 bg-pink-600 rounded-full"
                />
                <span className="font-medium">Item added to cart!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image Section */}
              <div className="p-8 flex items-center justify-center bg-gray-50">
                <div className="w-full h-[500px] relative">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-contain rounded-lg"
                  />
                </div>
              </div>

              {/* Product Info Section */}
              <div className="p-8 space-y-6">
                <div className="border-b pb-6">
                  <h1 className="text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>
                  <p className="text-3xl font-semibold text-pink-600">{product.price}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                    <span className="text-yellow-400 mr-1 text-xl">★</span>
                    <span className="font-medium">{product.rating}</span>
                  </div>
                  <div className="bg-pink-50 px-4 py-1 rounded-full">
                    <span className="text-pink-600 font-medium">
                      Category: {product.category}
                    </span>
                  </div>
                </div>

                <div className="border-t border-b py-6">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description || 'No description available'}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Quantity Selector */}
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-700 font-medium">Quantity:</span>
                    <div className="flex items-center">
                      <button 
                        className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-l-lg transition"
                        onClick={() => handleQuantityChange(-1)}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        className="border-y border-gray-200 text-center w-16 py-2"
                        readOnly
                      />
                      <button 
                        className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-r-lg transition"
                        onClick={() => handleQuantityChange(1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition transform hover:scale-105 duration-200 font-semibold"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>

                {/* Reviews Section */}
                <div className="pt-6 border-t">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Customer Reviews</h2>
                    <button className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition transform hover:scale-105 duration-200">
                      Write a Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;