import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/productSlice"; // 
import { addToCart } from "../redux/cartSlice";
import Navbar from "../components/Navbar";

const ProductDetails = () => {
const { id } = useParams();
const dispatch = useDispatch();
const navigate = useNavigate();
const product = useSelector((state) => state.products.selectedProduct);
const user = useSelector((state) => state.auth.user);

useEffect(() => {
  dispatch(fetchProductById(id));
}, [id, dispatch]);
   console.log('productDetailes',product)
  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>   
      <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-auto object-contain rounded-xl border max-h-[500px]"
        />

        <div className="space-y-5">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-xl font-semibold text-green-700">₹ {product.price}</p>
          {product.rating ? (
            <p className="text-yellow-500">
              ⭐ {product.rating} ({product.reviews?.length || 0} reviews)
            </p>
          ) : (
            <p className="text-gray-400">No ratings available</p>
          )}

          <button
           onClick={() => {
             console.log("🛒 Adding to cart:", product, "for", user?.email);
             dispatch(addToCart({ ...product, quantity: 1, email: user?.email }));
             navigate("/cart");
           }}
           className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
           >
           Add to Cart
           </button>
          {product.reviews && product.reviews.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
              <ul className="space-y-4">
                {product.reviews.map((review, index) => (
                  <li key={index} className="bg-gray-100 p-4 rounded-md shadow-sm">
                    <p className="text-sm text-gray-800">"{review.comment || 'No comment'}"</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Rating: ⭐ {review.rating || 'N/A'} — by {review.user || 'Anonymous'}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
    </>

  );
};

export default ProductDetails;