import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderConfirmation = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),0);

  return (
    <div className="max-w-3xl mx-auto text-center py-20 px-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Confirmed!</h1>
      <p className="text-lg text-gray-700 mb-6">Thank you for your purchase.</p>

      <div className="bg-white rounded-lg shadow p-6 mb-6 text-left">
        <p><strong>Total Items:</strong> {cartItems.length}</p>
        <p><strong>Total Price:</strong> ₹ {totalPrice.toFixed(2)}</p>
      </div>

      <Link
        to="/"
        className="inline-block mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default OrderConfirmation;