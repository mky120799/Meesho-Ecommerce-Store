import React from "react";
import trendzBanner from "../assets/Trenzbanner.webp";
import baggyJeans from '../assets/baggyJeans.webp'
import earring from '../assets/earring.webp'
import summerDress from '../assets/summer_dress.webp'
import chicflats from '../assets/chicflats.webp'
const categories = [
  {
    label: "Summer Dresses",
    image: chicflats,
  },
  {
    label: "Baggy Jeans",
    image: baggyJeans,
  },
  {
    label: "Earrings",
    image: earring,
  },
  {
    label: "Chic Flats",
    image: chicflats,
  },
];

const TrendzBanner = () => {
  return (
    <section className="hidden md:block relative bg-gradient-to-r from-purple-900 to-purple-800 py-20 px-4">
      <img
        src={trendzBanner}
        alt="Trendz Banner"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Left Content */}
        <div className="text-white flex flex-col gap-6">
          <button className="bg-white text-purple-700 cursor-pointer font-semibold mt-15 px-6 py-2 rounded-md w-fit shadow-md">
            Shop Now
          </button>
        </div>

        {/* Right Horizontal Cards */}
        <div className="flex gap-6 justify-center flex-wrap lg:flex-nowrap">
          {categories.map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-b from-yellow-200 to-orange-200 rounded-xl p-4 shadow-lg text-center w-48 h-64 flex flex-col justify-between items-center"
            >
              <img
                src={item.image}
                alt={item.label}
                className="h-40 w-40 object-cover rounded-lg"
              />
              <p className="text-sm font-medium bg-white text-purple-800 px-3 py-1 rounded-full shadow-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendzBanner;