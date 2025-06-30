import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { Link } from "react-router-dom";

//  Secondary Banner Section (add image here later)
const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Show only 4 featured items
  const featured = items.slice(0, 4);

  return (
    <>
      <div className="w-full my-6">
        {/* TODO: Insert promotional banner image here */}
        <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 text-lg">
          Promotional Banner Placeholder
        </div>
      </div>

      <div className="px-6 my-8 max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Products For You</h2>

        {loading && <p>Loading featured products...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {featured.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded shadow">
              {/* 🖼️ Product image (replace with custom image logic if needed) */}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-32 object-contain mb-2"
              />
              <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>
              <p className="text-purple-700 font-bold">₹{product.price}</p>
              <p className="text-green-600 text-xs">Free Delivery</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link to="/products" className="text-purple-600 underline font-semibold">
            View All Products →
          </Link>
        </div>
      </div>
    </>
  );
};

export default FeaturedProducts;