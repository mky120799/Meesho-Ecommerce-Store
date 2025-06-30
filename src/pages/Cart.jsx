import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const email = useSelector((state) => state.auth.user?.email);

  console.log("🛒 Cart items in Redux:", cartItems);
  console.log("📧 Current user email:", email);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const handleRemove = (id) => {
    console.log("❌ Removing item from cart:", id);
    dispatch(removeFromCart({ id, email }));
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>
      <Link
        to="/products"
        className="mt-4 bg-white border border-purple-600 text-purple-600 hover:bg-purple-100 py-2 px-4 rounded"
      >
        ← Back to Products
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 border p-4 rounded-lg shadow-sm"
              >
                <img
                  src={item.thumbnail || item.image || item.images?.[0]}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="text-sm text-gray-600">₹ {item.price}</p>
                  <div className="mt-1 text-sm text-gray-500">
                    Quantity:{" "}
                    <select
                      value={item.quantity || 1}
                      onChange={(e) => {
                        console.log("🔄 Updating quantity:", {
                          id: item.id,
                          newQuantity: Number(e.target.value),
                          email,
                        });
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: Number(e.target.value),
                            email,
                          })
                        );
                      }}
                      className="border rounded px-2 py-1 text-sm ml-2"
                    >
                      {[...Array(10).keys()].map((q) => (
                        <option key={q + 1} value={q + 1}>
                          {q + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Right: Summary */}
        <div className="border rounded-lg p-6 shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <p className="mb-2">Total Items: {cartItems.length}</p>
          <p className="mb-4">Total Price: ₹ {totalPrice.toFixed(2)}</p>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-purple-600 text-white w-full py-2 rounded hover:bg-purple-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
};

export default CartPage;