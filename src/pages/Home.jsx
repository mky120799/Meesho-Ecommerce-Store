import React from "react";
import HeroSection from "../components/HeroSection";
import CategoryIcons from "../components/CategoryIcons";

import Navbar from "../components/Navbar";
import FeatureHighlights from "../components/FeatureHighlights";
import DynamicCategoryNavBar from "../components/DynamicCategoryNavBar";
import ProductsForYou from "../components/ProductsForYou";
import BrandCarousel from "../components/BrandCarousel";
import TrendzBanner from "../components/TrendzBanner";





const Home = () => {
  return (
    <div>
      
      <DynamicCategoryNavBar />
      <HeroSection />
      <FeatureHighlights/>
      <CategoryIcons/>
      <BrandCarousel/>
      <TrendzBanner/>
     <ProductsForYou />
    </div>
  );
};

export default Home;