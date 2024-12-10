import React, { useState } from "react";
import {
  FaGoogle,
  FaFacebook,
  FaTwitter,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useAuth } from '../../context/AuthContext';
import Navbar from "../../components/user/navbar/navbar";
import { Helmet } from "react-helmet";


const Login = () => {
  const { login } = useAuth();
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(emailOrMobile, password);
      if (response === 'Login successful') {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Mera Bestie</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 py-6 sm:py-12 px-4 sm:px-6 lg:px-8  lg:pt-28 flex flex-col animate-fade-in">
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>
        
        <div className="flex-grow flex items-center justify-center mt-20 sm:mt-16">
          <div className="w-full max-w-md space-y-8 bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl p-6 sm:p-8 animate-zoom-in mx-4 sm:mx-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 animate-text-focus-in">
              Welcome Back
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-base sm:text-lg font-medium text-gray-700">Email or Mobile</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                  value={emailOrMobile}
                  onChange={(e) => setEmailOrMobile(e.target.value)}
                  placeholder="Enter your email or mobile"
                />
              </div>
              
              <div className="animate-fade-in-right">
                <label className="block text-base sm:text-lg font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-pink-500 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-all duration-300 transform hover:scale-[1.02] animate-bounce-on-hover text-base sm:text-lg font-medium shadow-md hover:shadow-lg"
              >
                Sign In
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="flex justify-center space-x-6">
              <button className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 hover:rotate-12 animate-float shadow-md">
                <FaFacebook size={20} />
              </button>
              <button className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-110 hover:rotate-12 animate-float shadow-md">
                <FaGoogle size={20} />
              </button>
              <button className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-all duration-300 transform hover:scale-110 hover:rotate-12 animate-float shadow-md">
                <FaTwitter size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
