import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="p-6 grid grid-cols-12 gap-6">
      {/* Sidebar - Filters (UI only for now) */}
      <aside className="col-span-12 md:col-span-3 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2">FILTERS</h2>
        <div className="text-sm text-gray-600">Category</div>
        <ul className="mt-2">
          <li><input type="checkbox" className="mr-2" /> Women T-shirts</li>
          <li><input type="checkbox" className="mr-2" /> Sarees</li>
          <li><input type="checkbox" className="mr-2" /> Electronics</li>
          <li><input type="checkbox" className="mr-2" /> Home Decor</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="col-span-12 md:col-span-9">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Products For You</h2>
          <select className="border p-2 rounded text-sm">
            <option>Sort by: Relevance</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((product) => (
            <div key={product.id} className="bg-white rounded shadow p-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain mb-2"
              />
              <h3 className="text-sm font-semibold line-clamp-2">{product.title}</h3>
              <p className="font-bold mt-1">₹{product.price}</p>
              <p className="text-green-600 text-xs">Free Delivery</p>
              <p className="text-yellow-500 text-sm">⭐ 4.2</p>
              <button className="mt-2 w-full bg-purple-600 text-white py-1 rounded text-sm">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductList;