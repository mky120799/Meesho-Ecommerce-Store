import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(signupUser(formData));

    if (signupUser.fulfilled.match(result)) {
      navigate("/"); // redirect to homepage or login after signup
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
                />
                
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;