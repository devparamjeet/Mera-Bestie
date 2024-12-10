import React, { useState, useEffect } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import Navbar from '../../components/user/navbar/navbar';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet";

const Shop = () => {
  const [viewMode, setViewMode] = useState('grid'); // State for toggling between grid and list views
  const [filteredProducts, setFilteredProducts] = useState([]); // State to hold filtered products
  const [sortedProducts, setSortedProducts] = useState([
    {
      _id: '1',
      name: 'Friendship Diary',
      price: '₹ 599',
      img: 'https://images.pexels.com/photos/733857/pexels-photo-733857.jpeg',
      category: 'Books',
      rating: 4.5,
      visibility: 'on'
    },
    {
      _id: '2',
      name: 'Best Friend Forever Gift Box',
      price: '₹ 999',
      img: 'https://images.pexels.com/photos/1666067/pexels-photo-1666067.jpeg',
      category: 'Gift Boxes',
      rating: 4.8,
      visibility: 'on'
    },
    {
      _id: '3',
      name: 'Premium Stationery Set',
      price: '₹ 799',
      img: 'https://images.pexels.com/photos/6446685/pexels-photo-6446685.jpeg',
      category: 'Stationery',
      rating: 4.2,
      visibility: 'on'
    },
    {
      _id: '4',
      name: 'Friendship Band Collection',
      price: '₹ 299',
      img: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg',
      category: 'Jewellery',
      rating: 4.6,
      visibility: 'on'
    },
    {
      _id: '5',
      name: 'Handcrafted Photo Album',
      price: '₹ 899',
      img: 'https://images.pexels.com/photos/3326362/pexels-photo-3326362.jpeg',
      category: 'Books',
      rating: 4.7,
      visibility: 'on'
    },
    {
      _id: '6',
      name: 'Deluxe Surprise Box',
      price: '₹ 1499',
      img: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg',
      category: 'Gift Boxes',
      rating: 4.9,
      visibility: 'on'
    },
    {
      _id: '7',
      name: 'Artistic Journal Set',
      price: '₹ 699',
      img: 'https://images.pexels.com/photos/6446709/pexels-photo-6446709.jpeg',
      category: 'Stationery',
      rating: 4.4,
      visibility: 'on'
    },
    {
      _id: '8',
      name: 'Friendship Necklace Set',
      price: '₹ 499',
      img: 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg',
      category: 'Jewellery',
      rating: 4.3,
      visibility: 'on'
    },
    {
      _id: '9',
      name: 'Memory Book Collection',
      price: '₹ 799',
      img: 'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg',
      category: 'Books',
      rating: 4.6,
      visibility: 'on'
    },
    {
      _id: '10',
      name: 'Premium Gift Hamper',
      price: '₹ 2499',
      img: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg',
      category: 'Gift Boxes',
      rating: 4.9,
      visibility: 'on'
    }
  ]); // State to hold sorted products
  const [loadMore, setLoadMore] = useState(6); // State for load more functionality
  const [products, setProducts] = useState([
    {
      _id: '1',
      name: 'Friendship Diary',
      price: '₹ 599',
      img: 'https://images.pexels.com/photos/733857/pexels-photo-733857.jpeg',
      category: 'Books',
      rating: 4.5,
      visibility: 'on'
    },
    {
      _id: '2',
      name: 'Best Friend Forever Gift Box',
      price: '₹ 999',
      img: 'https://images.pexels.com/photos/1666067/pexels-photo-1666067.jpeg',
      category: 'Gift Boxes',
      rating: 4.8,
      visibility: 'on'
    },
    {
      _id: '3',
      name: 'Premium Stationery Set',
      price: '₹ 799',
      img: 'https://images.pexels.com/photos/6446685/pexels-photo-6446685.jpeg',
      category: 'Stationery',
      rating: 4.2,
      visibility: 'on'
    },
    {
      _id: '4',
      name: 'Friendship Band Collection',
      price: '₹ 299',
      img: 'https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg',
      category: 'Jewellery',
      rating: 4.6,
      visibility: 'on'
    },
    {
      _id: '5',
      name: 'Handcrafted Photo Album',
      price: '₹ 899',
      img: 'https://images.pexels.com/photos/3326362/pexels-photo-3326362.jpeg',
      category: 'Books',
      rating: 4.7,
      visibility: 'on'
    },
    {
      _id: '6',
      name: 'Deluxe Surprise Box',
      price: '₹ 1499',
      img: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg',
      category: 'Gift Boxes',
      rating: 4.9,
      visibility: 'on'
    },
    {
      _id: '7',
      name: 'Artistic Journal Set',
      price: '₹ 699',
      img: 'https://images.pexels.com/photos/6446709/pexels-photo-6446709.jpeg',
      category: 'Stationery',
      rating: 4.4,
      visibility: 'on'
    },
    {
      _id: '8',
      name: 'Friendship Necklace Set',
      price: '₹ 499',
      img: 'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg',
      category: 'Jewellery',
      rating: 4.3,
      visibility: 'on'
    },
    {
      _id: '9',
      name: 'Memory Book Collection',
      price: '₹ 799',
      img: 'https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg',
      category: 'Books',
      rating: 4.6,
      visibility: 'on'
    },
    {
      _id: '10',
      name: 'Premium Gift Hamper',
      price: '₹ 2499',
      img: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg',
      category: 'Gift Boxes',
      rating: 4.9,
      visibility: 'on'
    }
  ]); // State to hold products from API
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const categories = [
    {
      name: 'Books',
      img: "https://tse2.mm.bing.net/th?id=OIP.uyi1Q5l2H8Zf9APJQplJfQHaEK&pid=Api&P=0&h=180",
    },
    {
      name: 'Gift Boxes',
      img: "http://images4.fanpop.com/image/photos/22200000/Christmas-gifts-christmas-gifts-22231235-2048-2048.jpg",
    },
    {
      name: 'Stationery',
      img: "https://tse1.mm.bing.net/th?id=OIP.UCpcTmMMOdXTF6WAhtD94QHaH0&pid=Api&P=0&h=180",
    },
    {
      name: 'Jewellery',
      img: "https://images.pexels.com/photos/248077/pexels-photo-248077.jpeg",
    }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://ecommercebackend-8gx8.onrender.com/get-product');
        const data = await response.json();
        if (data.success) {
          // Filter out products with empty/null values and hidden products
          const validProducts = data.products.filter(product =>
            product.name &&
            product.price &&
            product.img &&
            product.category &&
            product._id &&
            product.visibility === "on" // Only show products where visibility is "on"
          );
          setProducts(validProducts);
          setSortedProducts(validProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();

    // Mouse move event handler to track cursor position
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Function to filter products by category
  const filterProducts = (category) => {
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  // Function to sort products
  const sortProducts = (sortBy) => {
    let sorted = [...products]; // Create a copy to avoid mutating state directly
    switch (sortBy) {
      case 'price':
        sorted.sort((a, b) => {
          const priceA = parseFloat(a.price.split('₹')[2]?.trim() || 0);
          const priceB = parseFloat(b.price.split('₹')[2]?.trim() || 0);
          return priceA - priceB;
        });
        break;
      case 'popularity':
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }
    setSortedProducts(sorted);
  };

  // Function to load more products
  const handleLoadMore = () => {
    setLoadMore(prevLoadMore => prevLoadMore + 6);
  };

  // Function to show less products
  const handleShowLess = () => {
    setLoadMore(6);
  };

  return (
    <>
      <Helmet>
        <title>Shop | Mera Bestie</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100">
        {/* Navbar */}
        <div className="fixed top-0 left-0 w-full z-50 shadow-md">
          <Navbar />
        </div>

        {/* Hero Section - Updated */}
        <section
          className="relative bg-cover bg-center py-32 text-center mt-16"
          style={{
            backgroundImage: "url('src/assets/bg shop.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              SHOP BY CATEGORY
            </h2>
            <p className="text-white mt-6 text-lg md:text-xl max-w-2xl mx-auto px-4">
              Discover our exclusive collections tailored just for you.
            </p>
          </div>
        </section>

        {/* Categories Section - Updated */}
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <h3 className="text-3xl font-bold mb-6 text-gray-800 px-4">Categories</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => filterProducts(category.name)}
              >
                <div
                  className="h-56 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url('${category.img}')` }}
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-sm font-light mb-2 opacity-90">Explore Collection</p>
                  <h4 className="text-2xl font-bold">{category.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter and Sort Section - Updated */}
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 px-4">
            <span className="text-gray-600">
              Showing 1 - {Math.min(loadMore, sortedProducts.length)} of {sortedProducts.length} results
            </span>
            <div className="flex flex-wrap gap-4 items-center">
              <button
                className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-300"
                onClick={() => filterProducts('all')}
              >
                All Products
              </button>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-gray-700">Sort by</label>
                <select
                  id="sort"
                  className="border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  onChange={(e) => sortProducts(e.target.value)}
                >
                  <option value="price">Price</option>
                  <option value="popularity">Popularity</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 border rounded-lg transition-colors duration-300 ${viewMode === 'grid' ? 'bg-pink-500 text-white' : 'hover:bg-pink-100'
                    }`}
                >
                  ▤
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 border rounded-lg transition-colors duration-300 ${viewMode === 'list' ? 'bg-pink-500 text-white' : 'hover:bg-pink-100'
                    }`}
                >
                  ☰
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section - Updated */}
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <h3 className="text-3xl font-bold mb-6 text-gray-800 px-4">Products</h3>
          <div
            className={`grid ${viewMode === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'grid-cols-1 gap-6'
              } px-4`}
          >
            {(filteredProducts.length > 0 ? filteredProducts : sortedProducts)
              .slice(0, loadMore)
              .map((product) => (
                <motion.div
                  key={product._id}
                  className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''
                    }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link to={`/${product._id}`} className={`${viewMode === 'list' ? 'w-1/3' : ''} block overflow-hidden`}>
                    <div
                      className={`${viewMode === 'list' ? 'h-full' : 'h-48 md:h-56'
                        } bg-cover bg-center transform transition-transform duration-300 hover:scale-110`}
                      style={{ backgroundImage: `url('${product.img}')` }}
                    />
                  </Link>
                  <div className={`p-6 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                    <Link to={`/${product._id}`}>
                      <h4 className="font-bold text-xl text-gray-800 hover:text-pink-500 transition-colors duration-300">
                        {product.name}
                      </h4>
                    </Link>
                    <p className="text-pink-500 font-semibold mt-2">{product.price}</p>
                    <div className="mt-3">
                      <span className="text-yellow-400">{'★'.repeat(Math.floor(product.rating))}</span>
                      <span className="text-gray-300">{'★'.repeat(5 - Math.floor(product.rating))}</span>
                      <span className="text-gray-600 ml-2">({product.rating})</span>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Load More Button - Updated */}
          <div className="text-center mt-12">
            {loadMore < sortedProducts.length ? (
              <button
                className="bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 transition-colors duration-300 shadow-lg hover:shadow-xl"
                onClick={handleLoadMore}
              >
                Load More
              </button>
            ) : (
              <button
                className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors duration-300 shadow-lg hover:shadow-xl"
                onClick={handleShowLess}
              >
                Show Less
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
