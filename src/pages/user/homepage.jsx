import React, { useEffect, useState } from "react";
import Footer from "../../components/user/footer/footer";
import { Link } from "react-router-dom";
import Navbar from "../../components/user/navbar/navbar";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS styles
import { Helmet } from "react-helmet";

// Scroll Progress Bar Component
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((currentScroll / scrollHeight) * 100);
    };

    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <motion.div
      style={{ scaleX: scrollProgress / 100 }}
      className="fixed top-0 left-0 h-2 bg-blue-500 origin-left z-50"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: scrollProgress / 100 }}
      transition={{ duration: 0.2 }}
    />
  );
};

const HomePage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration in milliseconds
      easing: "ease-in-out", // Animation easing
      once: true, // Whether animation should run only once
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Home | Mera Bestie</title>
      </Helmet>
      <div className="w-full">
        <ScrollProgress />
        <Navbar />

        {/* Hero Section - Updated */}
        <section className="relative min-h-screen lg:min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <motion.img
              src="https://cdn.wallpapersafari.com/89/8/lybQgH.jpg"
              alt="Background"
              className="w-full h-full object-cover brightness-75"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>

          <motion.div
            className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-white/95 dark:bg-gray-800/95 p-6 sm:p-8 md:p-12 rounded-xl shadow-2xl backdrop-blur-sm max-w-3xl mx-auto">
              <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl font-serif text-center leading-tight">
                Revolutionizing Gift Giving
              </h1>
              <p className="mb-8 text-gray-600 dark:text-gray-300 text-center text-lg max-w-2xl mx-auto">
                A world of unique gifts for every moment and milestone
              </p>
              <div className="text-center">
                <Link to="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-300 shadow-md"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Products Section - Updated */}
        <section className="px-4 py-20 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Products</h2>
              <div className="w-24 h-1 bg-pink-500 mx-auto mb-8"></div>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Discover our diverse range of products crafted for all occasions.
              </p>
            </motion.div>

            <motion.div
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { delayChildren: 0.2, staggerChildren: 0.2 },
                },
              }}
            >
              {[
                {
                  img: "https://i.pinimg.com/originals/96/24/6e/96246e3c133e6cb5ae4c7843f9e45b22.jpg",
                  title: "Stationery Items",
                },
                {
                  img: "https://tse1.mm.bing.net/th?id=OIP.EYAqW5p_HzCoXKq1dXvGyQHaFj&pid=Api&P=0&h=180",
                  title: "Gift Items",
                },
                {
                  img: "https://tse3.mm.bing.net/th?id=OIP.90zsFkK9l2Nttf3fQu12ZwHaE8&pid=Api&P=0&h=180",
                  title: "Decor Items",
                },
              ].map((product, index) => (
                <motion.div
                  key={index}
                  className="overflow-hidden rounded-xl shadow-lg group hover:shadow-2xl transition-shadow duration-300"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={product.img}
                      alt={`Product: ${product.title}`}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-semibold mb-3">{product.title}</h3>
                    <p className="text-gray-600">
                      Discover high-quality and creative gift ideas.
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Vision Section - Updated */}
        <section className="relative min-h-screen lg:min-h-[80vh] overflow-hidden" data-aos="zoom-in">
          <div className="absolute inset-0 z-0">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.RNJBshhRJcxPoSt2Slj5bAHaEK&pid=Api&P=0&h=180"
              alt="Vision background"
              className="w-full h-full object-cover brightness-75"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30"></div>
          </div>

          <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              className="max-w-2xl"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="bg-white/95 dark:bg-gray-800/95 p-8 md:p-12 rounded-xl shadow-2xl backdrop-blur-sm">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Vision</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                  Penatibus sem vitae mollis luctus mi tellus. Maximus eu eleifend
                  aptent dapibus metus maecenas consequat. Elementum interdum a
                  semper.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors duration-300 shadow-md"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;