// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    const pincodeRegex = /^\d{6}$/;
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full Name is required.";
    }

    if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian phone number.";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!pincodeRegex.test(form.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit Pin Code.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    alert("✅ Order placed successfully!");
    dispatch(clearCart(user.email));
    navigate("/order-confirmation");
  };

  return (
    <>
     
      <div className="max-w-4xl mx-auto p-6 mt-10">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Shipping Info */}
          <div>
            <h2 className="font-semibold mb-4">Shipping Details</h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full border px-4 py-2 rounded ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className={`w-full border px-4 py-2 rounded ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Full Address
                </label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  placeholder="Full Address"
                  value={form.address}
                  onChange={handleChange}
                  className={`w-full border px-4 py-2 rounded ${
                    errors.address ? "border-red-500" : ""
                  }`}
                />
                {errors.address && (
                  <p className="text-sm text-red-500">{errors.address}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="pincode"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Pin Code
                </label>
                <input
                  id="pincode"
                  type="text"
                  name="pincode"
                  placeholder="Pin Code"
                  value={form.pincode}
                  onChange={handleChange}
                  className={`w-full border px-4 py-2 rounded ${
                    errors.pincode ? "border-red-500" : ""
                  }`}
                />
                {errors.pincode && (
                  <p className="text-sm text-red-500">{errors.pincode}</p>
                )}
              </div>
            </form>
          </div>

          {/* Right: Summary */}
          <div>
            <h2 className="font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm border-b pb-2"
                >
                  <span>{item.title}</span>
                  <span>
                    ₹ {(item.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
              ))}
              <hr />
              <div className="flex justify-between font-semibold text-base mt-4">
                <span>Total</span>
                <span>₹ {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;