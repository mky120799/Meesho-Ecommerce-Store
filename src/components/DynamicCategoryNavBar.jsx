import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/productSlice";

const dummySubcategories = {
  smartphones: ["Android Phones", "iPhones", "5G Phones"],
  laptops: ["Gaming Laptops", "Business Laptops", "Macbooks"],
  fragrances: ["Perfumes for Men", "Perfumes for Women"],
  skincare: ["Moisturizers", "Cleansers", "Sunscreens"],
  groceries: ["Snacks", "Beverages", "Dry Fruits"],
  furniture: ["Sofas", "Chairs", "Tables"],
  tops: ["Blouses", "Shirts", "Crop Tops"],
  automotive: ["Car Accessories", "Motor Oils", "Tools"],
};

const DynamicCategoryNavBar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Log the categories structure before rendering
  console.log("Fetched categories:", categories);
  return (
    <div className="bg-white shadow-sm px-12 border-t border-b">
      <div className="flex justify-center gap-4 px-9 py-3 overflow-x-auto whitespace-nowrap text-sm font-medium no-scrollbar text-gray-700">
        {categories.map((cat, i) => {
          const key = cat.name?.toLowerCase?.() || cat.slug;
          return (
            <div key={i} className="relative group cursor-pointer capitalize hover:text-purple-700">
              <div className="py-1 px-2">{cat.name}</div>

              {dummySubcategories[key] && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white p-4 shadow-lg rounded z-50 hidden group-hover:flex flex-col min-w-[200px]">
                  <ul className="space-y-2 text-sm text-gray-700">
                    {dummySubcategories[key].map((sub, idx) => (
                      <li key={idx} className="hover:text-purple-600">{sub}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DynamicCategoryNavBar;