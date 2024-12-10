/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
    },
  },
  server: {
    proxy: {
      '/get-orders': {
        target: 'https://ecommercebackend-8gx8.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [],
}