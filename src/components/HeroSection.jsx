import React from "react";
import { Link } from "react-router-dom";
import heroBanner from "../assets/imgi_2_1746425994914.webp";
import { Navigate } from "react-router-dom";

const HeroSection = () => {
  return (
    <>
      <div className="block md:hidden bg-gradient-to-r from-purple-600 to-pink-500 text-white py-10 px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Welcome to Meesho Clone
        </h1>
        <p className="text-sm md:text-base mb-4">
          Buy trendy clothes, accessories, and home essentials at wholesale
          prices
        </p>
        <Link
          to="/products"
          className="bg-white text-purple-600 font-semibold px-4 py-2 rounded"
        >
          Browse Products
        </Link>
      </div>

      {/*render for from small screen to large 👇*/}

      <div className="hidden md:block relative w-full">
        {/* Hero Banner Image */}
        <img
          src={heroBanner}
          alt="hero banner"
          className="w-full h-auto w-[]object-cover"
        />

        {/* Overlay Text */}
        <div className="absolute inset-0 flex items-center justify-end pr-20 mr-20">
        <h1 className="text-2xl md:text-4xl font-bold text-white bg-opacity-50 p-4 rounded break-words max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-right">
         Smart Shopping <br />
        Trusted by Millions <br />
        <Link to="/products">
         <button className="bg-amber-50 py-2 my-2 mr-10 p-8 cursor-pointer font-light text-4xl text-[#580A46] rounded-lg">
         Shop Now
        </button>
        </Link>
        </h1>
        </div>
      </div>
    </>
  );
};

export default HeroSection;