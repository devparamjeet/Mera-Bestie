import React, { useState, useEffect } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import emptyCart from '../../Images/empty_cart.webp';
import { Link } from 'react-router-dom';

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voucher, setVoucher] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      const userId = sessionStorage.getItem('userId');
      if (!userId) {
        setError('Please login to view cart');
        setLoading(false);
        return;
      }

      try {
        const cartResponse = await fetch(`https://ecommercebackend-8gx8.onrender.com/cart/${userId}`);
        const cartData = await cartResponse.json();

        if (!cartData.success) {
          setError(cartData.message || 'Failed to fetch cart');
          setLoading(false);
          return;
        }

        // Group items by productId and sum quantities
        const groupedItems = cartData.cart.reduce((acc, item) => {
          if (!acc[item.productId]) {
            acc[item.productId] = {
              productId: item.productId,
              productQty: item.productQty
            };
          } else {
            acc[item.productId].productQty += item.productQty;
          }
          return acc;
        }, {});

        // Fetch product details for each unique product
        const productPromises = Object.values(groupedItems).map(async (item) => {
          const productResponse = await fetch(`https://ecommercebackend-8gx8.onrender.com/product/${item.productId}`);
          const productData = await productResponse.json();
          
          if (productData.success) {
            return {
              ...productData.product,
              quantity: item.productQty,
              cartItemId: item._id
            };
          }
          return null;
        });

        const products = await Promise.all(productPromises);
        setCartItems(products.filter(product => product !== null));
        setLoading(false);

      } catch (err) {
        setError('Error fetching cart items');
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = async (itemId, change) => {
    const item = cartItems.find(item => item._id === itemId);
    const newQuantity = item.quantity + change;
    
    if (newQuantity >= 1) {
      try {
        const userId = sessionStorage.getItem('userId');
        const response = await fetch('https://ecommercebackend-8gx8.onrender.com/update-quantity', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId,
            productId: itemId,
            productQty: newQuantity
          })
        });

        const data = await response.json();
        if (data.success) {
          const updatedItems = cartItems.map(item => {
            if (item._id === itemId) {
              return { ...item, quantity: newQuantity };
            }
            return item;
          });
          setCartItems(updatedItems);
        }
      } catch (err) {
        console.error('Error updating quantity:', err);
      }
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const userId = sessionStorage.getItem('userId');
      const response = await fetch('https://ecommercebackend-8gx8.onrender.com/delete-items', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          productId: itemId
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setCartItems(cartItems.filter(item => item._id !== itemId));
      }
    } catch (err) {
      console.error('Error removing item:', err);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity);
    }, 0).toFixed(2);
  };

  if (loading) {
    return (
      <div className="bg-pink-100 p-4 md:p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-pink-600"></div>
      </div>
    );
  }

  if (error || cartItems.length === 0) {
    return (
      <div className="bg-pink-100 p-4 md:p-6 flex flex-col items-center justify-center h-96">
        <img src={emptyCart} alt="Empty Cart" className="w-48 h-48 mb-4" />
        <p className="text-lg text-gray-600">{error || 'Your cart is empty'}</p>
      </div>
    );
  }

  return (
    <>
        <div className="space-y-4">
      <div className="bg-pink-100 p-4 md:p-6 space-y-4">
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex flex-col md:flex-row items-center justify-between bg-white p-4 shadow-sm rounded-md space-y-4 md:space-y-0"
          >
            {/* Product Info Section */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-300 rounded-md flex-shrink-0">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base">
                  {item.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-500">{item.description}</p>
              </div>
            </div>

            {/* Price and Quantity Section */}
            <div className="flex items-center space-x-4 md:space-x-6">
              <span className="font-medium text-sm md:text-base">
                Rs. {item.price}
              </span>
              <div className="flex items-center border px-2 py-1 rounded-md">
                <button 
                  onClick={() => handleQuantityChange(item._id, -1)}
                  className="px-2 text-sm md:text-lg font-semibold"
                >
                  -
                </button>
                <input
                  type="text"
                  value={item.quantity}
                  readOnly
                  className="w-8 text-center text-xs md:text-sm border-none outline-none"
                />
                <button 
                  onClick={() => handleQuantityChange(item._id, 1)}
                  className="px-2 text-sm md:text-lg font-semibold"
                >
                  +
                </button>
              </div>
              <span className="font-medium text-sm md:text-base">
                Rs. {(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)}
              </span>
              <button 
                onClick={() => handleRemoveItem(item._id)}
                className="text-red-500"
              >
                <FontAwesomeIcon icon={faTrash} className="hover:bg-red-300" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-pink-100 p-4 md:p-6 shadow-md rounded-md">
        <h3 className="text-base md:text-lg font-semibold mb-2">
          Do you have a voucher?
        </h3>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
          <input
            type="text"
            placeholder="Enter the code"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
            className="flex-grow border p-2 rounded-md outline-none text-sm md:text-base"
          />
          <button className="bg-black text-white px-4 py-2 rounded-md text-sm md:text-base hover:bg-gray-500">
            Redeem
          </button>
        </div>
        <div className="text-gray-600 space-y-2 text-sm md:text-base">
          <p>Subtotal: Rs. {calculateTotal()}</p>
          <p>Shipping: Rs. 0.00</p>
          <h4 className="text-base md:text-lg font-semibold">Total: Rs. {calculateTotal()}</h4>
        </div>
        <Link to="/checkout" className="block">
          <button className="bg-black text-white w-full py-2 rounded-md mt-4 text-sm md:text-base hover:bg-gray-500">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default CartItems;
