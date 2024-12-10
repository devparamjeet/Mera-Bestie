import React from "react";
import img1 from '../../Images/img1.jpg';
import img2 from '../../Images/img2.jpg';
import img3 from '../../Images/img3.jpg';
import img4 from '../../Images/img4.jpg';

const RecentlyViewed = () => {
  const products = [
    { id: 1, name: "Customized Journal", price: 199, image: img1 },
    { id: 2, name: "Floral Greeting Card Set", price: 289, image: img2 },
    { id: 3, name: "Premium Leather Diary", price: 289, image: img3 },
    { id: 4, name: "Eco-Friendly Pen Pack", price: 289, image: img4 },
  ];

  return (
    <div className="bg-pink-100 p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-semibold mb-4">
        Recently Viewed Products
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 shadow-sm rounded-md flex flex-col items-center"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-300 rounded-md mb-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <h4 className="font-medium text-sm md:text-base">
              {product.name}
            </h4>
            <p className="text-gray-500 text-xs md:text-sm">
            ₹̶𝟺̶𝟶̶𝟶̶  Rs. {product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;
