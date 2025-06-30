import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg p-3 flex flex-col justify-between h-[400px] max-w-xs mx-auto">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-48 object-contain mb-2 mx-auto"
        />
      </Link>
      <h3 className="text-sm font-medium mb-1">{product.title}</h3>
      <p className="text-purple-700 font-semibold mb-1">₹{product.price}</p>
      <p className="text-xs text-gray-500">⭐ {product.rating} / 5</p>
      <span className="text-green-600 text-xs mt-auto">Free Delivery</span>
    </div>
  );
};

export default ProductCard;