import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { resetCart } from "../redux/cartSlice";
import { setSearchQuery } from "../redux/productSlice";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaUserCircle,
  FaShoppingCart,
} from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // cart items add and remove count logic
  const cartItems = useSelector((state) => state.cart.items);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    dispatch(resetCart()); // clears Redux cart (badge)
    dispatch(logoutUser()); // don't clear localStorage for cart
    navigate("/login"); // or home
  };

   const handleCartClick = () => {
    if (isAuthenticated) {
      navigate("/cart");
    } else {
      alert("Please log in to view your cart.");
      navigate("/login");
    }
  };

  return (
    <nav className="bg-purple-600 text-white px-4 py-3 flex flex-wrap items-center justify-between">
      {/* Left - Logo */}
   

      {/* Mobile menu toggle button */}
      <div className="sm:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex flex-1 justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const keyword = e.target.search.value.trim();
            if (keyword) {
              dispatch(setSearchQuery(keyword));
              navigate("/products");
            }
          }}
          className="flex w-full max-w-md"
        >
          <input
            type="text"
            name="search"
            placeholder="Search for products..."
            className="w-full px-3 py-2 rounded-l-md bg-white text-black border border-gray-300 shadow-sm placeholder-gray-500"
          />
          <button
            type="submit"
            className="bg-white text-purple-700 px-4 py-2 rounded-r-md font-semibold"
          >
            <FaSearch />
          </button>
        </form>
      </div>

      <div className="hidden sm:flex items-center justify-end gap-6 ml-6 text-sm">
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
              <FaShoppingCart className="text-purple-600" />
            </div>
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                {totalCount}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <>
              <span className="flex items-center gap-2">
                <FaUserCircle className="text-purple-600" />
                {user?.displayName || user?.email}
              </span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="w-full sm:hidden mt-4 flex flex-col items-center gap-4 bg-white text-black p-4 rounded-md shadow-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const keyword = e.target.search.value.trim();
              if (keyword) {
                dispatch(setSearchQuery(keyword));
                navigate("/products");
              }
            }}
            className="flex w-full max-w-xs"
          >
            <input
              type="text"
              name="search"
              placeholder="Search for products..."
              className="w-full px-3 py-2 rounded-l-md bg-white text-black border border-gray-300 shadow-sm placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-white text-purple-700 px-4 py-2 rounded-r-md font-semibold"
            >
              <FaSearch className="text-purple-600" />
            </button>
          </form>

          <Link to="/cart" className="relative">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow">
              <FaShoppingCart className="text-purple-600" />
            </div>
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                {totalCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <>
              <span className="flex items-center gap-2">
                <FaUserCircle className="text-purple-600" />
                {user?.displayName || user?.email}
              </span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;