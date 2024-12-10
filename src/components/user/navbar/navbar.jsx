import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaChevronDown, FaTimes, FaBars, FaUser, FaHeart, FaShoppingCart, FaGift, FaPhone, FaHome, FaStore, FaEnvelope } from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    const fetchUserName = async () => {
      const userId = sessionStorage.getItem("userId");
      if (userId) {
        try {
          const response = await fetch(`https://ecommercebackend-8gx8.onrender.com/auth/user/${userId}`);
          const data = await response.json();
          setUserName(data.name);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserName();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    window.location.reload();
  };

  const userId = sessionStorage.getItem("userId");

  return (
    <nav className="bg-white text-black sticky top-0 z-50 shadow-sm">
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white py-2 text-center">
        <div className="max-w-[1200px] mx-auto px-4">
          <span className="inline-flex items-center justify-center flex-wrap gap-1">
            <FaGift className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-[10px] xs:text-xs sm:text-sm">
              <span className="hidden sm:inline">USE CODE </span>
              <span className="font-semibold">OFF10</span>
              <span className="hidden xs:inline"> TO GET FLAT 10% OFF</span>
              <span className="xs:hidden"> | 10% OFF</span>
              <span> ON ORDERS ABOVE ₹499</span>
              <span className="hidden xs:inline"> | FREE SHIPPING | COD AVAILABLE</span>
            </span>
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="h-16 sm:h-[70px] flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-black hover:text-pink-500 transition-colors"
            >
              <FaBars className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link to="/HomePage" className="text-2xl flex items-center transform hover:scale-105 transition-transform">
              <span className="font-['Bodoni_MT'] font-bold text-lg sm:text-2xl">GCMera Bestie</span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:block max-w-xl w-full mx-8">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search Gifts for your loved ones...."
                  className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
                />
                <FaSearch className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 group-hover:text-pink-500 transition-colors" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 sm:space-x-6">
              <button 
                aria-label="Search" 
                className="md:hidden hover:text-pink-500 transition-colors"
                onClick={toggleSearch}
              >
                <FaSearch className="w-5 h-5" />
              </button>
              
              <Link to="/cart" className="hover:text-pink-500 transition-colors flex items-center relative"> 
                <FaShoppingCart className="w-5 h-5" />
                <span className="ml-2 hidden md:inline">Cart</span>
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
              </Link>
              
              <button aria-label="Wishlist" className="hover:text-pink-500 transition-colors hidden md:block relative">
                <FaHeart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
              </button>

              {/* Profile Button - Updated styling */}
              <div className="relative">
                <button
                  aria-label="Profile"
                  onClick={toggleProfileMenu}
                  className="hover:text-pink-500 transition-colors flex items-center space-x-2"
                >
                  <FaUser className="w-5 h-5" />
                  <span className="hidden md:inline text-sm">
                    {userId ? `Hi, ${userName}` : 'Hi, Profile'}
                  </span>
                  <FaChevronDown className="w-3 h-3 hidden md:block" />
                </button>

                {/* Profile Dropdown - Updated styling */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-20 transform origin-top-right transition-all">
                    {userId ? (
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-pink-50 hover:text-pink-500 transition-colors rounded-lg"
                      >
                        Logout
                      </button>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm hover:bg-pink-50 hover:text-pink-500 transition-colors"
                        >
                          Login
                        </Link>
                        <Link
                          to="/Signup"
                          className="block px-4 py-2 text-sm hover:bg-pink-50 hover:text-pink-500 transition-colors"
                        >
                          Signup
                        </Link>
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm hover:bg-pink-50 hover:text-pink-500 transition-colors"
                        >
                          Admin
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-500 text-white">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="h-12 flex items-center justify-between">
            {/* Menu Items */}
            <div className="hidden lg:flex items-center space-x-8 text-sm font-medium">
              <Link to="/HomePage" className={`hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all ${isActive('/HomePage') ? 'after:w-full' : ''}`}>
                HOME
              </Link>
              <Link to="/shop" className={`hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all ${isActive('/shop') ? 'after:w-full' : ''}`}>
                SHOP
              </Link>
              <Link to="/contact" className={`hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all ${isActive('/contact') ? 'after:w-full' : ''}`}>
                CONTACT
              </Link>
              <Link to="/OccasionsPage" className={`hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all ${isActive('/OccasionsPage') ? 'after:w-full' : ''}`}>
            OCCASIONS
          </Link>
          <Link to="/about" className={`hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white hover:after:w-full after:transition-all ${isActive('/about') ? 'after:w-full' : ''}`}>
            ABOUT
          </Link>
          
            </div>

            {/* Phone Number */}
            <div className="hidden lg:flex items-center text-sm font-medium hover:text-white transition-colors">
              <FaPhone className="w-4 h-4 mr-2 animate-bounce" />
              <span><a href="tel:6294097292">6294097292</a></span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay - Updated styling */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white p-4 shadow-lg z-50 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Gifts for your loved ones...."
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
            />
            <FaSearch className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>
      )}

      {/* Mobile Navigation Sidebar - Updated styling */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={toggleMenu}></div>
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl z-50 overflow-y-auto transform transition-transform">
            <div className="p-6">
              <button onClick={toggleMenu} className="absolute top-5 right-5">
                <FaTimes className="w-6 h-6" />
              </button>
              <div className="mt-8">
                <Link to="/HomePage" className="block py-2.5 text-lg font-medium hover:text-pink-500" onClick={toggleMenu}>
                  <FaHome className="inline-block mr-2" /> Home
                </Link>
                <Link to="/shop" className="block py-2.5 text-lg font-medium hover:text-pink-500" onClick={toggleMenu}>
                  <FaStore className="inline-block mr-2" /> Shop
                </Link>
                <Link to="/contact" className="block py-2.5 text-lg font-medium hover:text-pink-500" onClick={toggleMenu}>
                  <FaEnvelope className="inline-block mr-2" /> Contact
                </Link>
                <hr className="my-4" />
                <Link to="/OccasionsPage" className="block py-2.5 text-lg font-medium hover:text-pink-500" onClick={toggleMenu}>
                  Occasions
                </Link>
                <Link to="/about" className="block py-2.5 text-lg font-medium hover:text-pink-500" onClick={toggleMenu}>
                  About
                </Link>
                <div className="mt-4 flex items-center">
                  <FaPhone className="w-4 h-4 mr-2" />
                  <span><a href="tel:6294097292">6294097292</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
