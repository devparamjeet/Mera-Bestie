import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import Navbar from '../../components/user/navbar/navbar';
import { Helmet } from "react-helmet";    

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });
  const [saveAddress, setSaveAddress] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
      return;
    }

    try {
      const cartResponse = await fetch(`https://ecommercebackend-8gx8.onrender.com/cart/${userId}`);
      const cartData = await cartResponse.json();

      if (!cartData.success) {
        setLoading(false);
        return;
      }

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

      const productPromises = Object.values(groupedItems).map(async (item) => {
        const productResponse = await fetch(`https://ecommercebackend-8gx8.onrender.com/product/${item.productId}`);
        const productData = await productResponse.json();
        
        if (productData.success) {
          return {
            ...productData.product,
            quantity: item.productQty
          };
        }
        return null;
      });

      const products = await Promise.all(productPromises);
      setCartItems(products.filter(product => product !== null));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching cart items:', err);
      setLoading(false);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const isAddressValid = () => {
    return Object.values(address).every(value => value.trim() !== '');
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity);
    }, 0).toFixed(2);
  };

  const handlePlaceOrder = async () => {
    const userId = sessionStorage.getItem('userId');

    if (saveAddress) {
      try {
        await fetch('https://ecommercebackend-8gx8.onrender.com/update-address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId,
            address: Object.values(address).join(', ')
          })
        });
      } catch (err) {
        console.error('Error saving address:', err);
      }
    }

    // Get current date and time
    const now = new Date();
    const date = now.toLocaleDateString('en-GB'); // dd-mm-yyyy format
    const time = now.toLocaleTimeString('en-GB'); // 24hr format

    // Prepare products ordered array
    const productsOrdered = cartItems.map(item => ({
      productId: item._id,
      productQty: item.quantity
    }));

    try {
      const response = await fetch('https://ecommercebackend-8gx8.onrender.com/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          date,
          time,
          address: Object.values(address).join(', '),
          price: calculateTotal(),
          productsOrdered
        })
      });

      const data = await response.json();
      
      if (data.message === 'Order placed successfully') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        setShowSuccess(true);
        setTimeout(() => {
          navigate('/cart');
        }, 5000);
      }
    } catch (err) {
      console.error('Error placing order:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-pink-600"></div>
      </div>
    );
  }

  return (      
    <>
    <Helmet>
      <title>Checkout | Mera Bestie</title>
    </Helmet>
    <Navbar/>
    <div className="container mx-auto p-4 flex flex-col md:flex-row gap-6">
      {/* Address Form Section */}
      <div className="md:w-[60%] bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Street Address</label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleAddressChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">State</label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleAddressChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={address.pincode}
              onChange={handleAddressChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={address.phone}
              onChange={handleAddressChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="saveAddress"
              checked={saveAddress}
              onChange={(e) => setSaveAddress(e.target.checked)}
            />
            <label htmlFor="saveAddress">Save this for future preference</label>
          </div>
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="md:w-[40%] bg-white p-6 rounded-lg shadow h-fit">
        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item._id} className="flex justify-between items-center border-b pb-4">
              <div className="flex items-center gap-4">
                <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
              <p className="font-medium">Rs. {(parseFloat(item.price.replace(/[^\d.]/g, '')) * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>Rs. {calculateTotal()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Rs. 0.00</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>Rs. {calculateTotal()}</span>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={!isAddressValid()}
            className={`w-full py-3 rounded ${
              isAddressValid() 
                ? 'bg-black text-white hover:bg-gray-800' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Success Dialog */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h3 className="text-2xl font-semibold mb-4">Order Placed Successfully!</h3>
            <p className="text-gray-600">Check your email for tracking details</p>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Checkout;
