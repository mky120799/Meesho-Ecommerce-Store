import React from "react";
import ethnic from "../assets/ethnic.webp"
import groceries from "../assets/groceries.webp"
import western from '../assets/western.webp'
import tshirts from '../assets/tshirts.webp'
import shoes from '../assets/shoes.webp'
import bags from '../assets/bags.webp'

const categories = [
  { icon: ethnic, label: "Ethnic Wear" },
  { icon: western, label: "Western Dresses" },
  { icon: tshirts, label: "Menswear" },
  { icon: groceries, label: "Groceries" },
  { icon: bags, label: "Hand Bags" },
  { icon: shoes, label: "Shoes" },
];

const CategoryIcons = () => {
  return (
    <div className="bg-white py-12 px-4 flex md:px-8 max-w-6xl mx-auto">
      <div className="flex space-x-6 p-4 sm:p-6 md:p-8 text-center overflow-x-auto scrollbar-hide">
        {categories.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-50 h-50 rounded-full bg-purple-100 text-3xl flex items-center justify-center shadow-sm transition-transform duration-300 transform hover:scale-105 hover:-translate-y-1">
              <img
                src={item.icon}
                alt={item.label}
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain"
              />
            </div>
            <p className="mt-2 text-sm font-medium text-gray-700">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryIcons;