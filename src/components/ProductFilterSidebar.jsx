// Importing necessary hooks and actions
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, setSelectedCategories } from "../redux/productSlice";

const ProductFilterSidebar = () => {
  const dispatch = useDispatch();

  // Accessing selected categories from Redux store
  const selectedCategories = useSelector(
    (state) => state.products.selectedCategories
  );

  // Accessing categories list from Redux store
  const { categories } = useSelector((state) => state.products);
  console.log("categories in productList", categories);

  // On component mount, dispatch action to fetch category list
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Handle checkbox toggle: add/remove selected category
  const handleCategoryChange = (category) => {
    const categoryLower = category.toLowerCase();

    let updated;

    const lowerSelected = selectedCategories.map((c) => c.toLowerCase());

    if (lowerSelected.includes(categoryLower)) {
      // 🧹 If already selected, remove it
      updated = selectedCategories.filter(
        (c) => c.toLowerCase() !== categoryLower
      );
    } else {
      // ➕ If not selected, add it
      updated = [...selectedCategories, category];
    }
    // Dispatch updated category list
    dispatch(setSelectedCategories(updated));
  };

  // Log selected categories when updated
  useEffect(() => {
    console.log(" Selected Categories:", selectedCategories);
  }, [selectedCategories]);

  return (
    <aside className="w-full mx-auto p-4 bg-white rounded-lg shadow-sm md:w-64 flex-shrink-0 border-gray-200
      border-r md:text-left text-center flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      {/* Conditionally render Search heading if categories exist */}
      {categories && categories.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium mb-2">Search Products</h4>
        </div>
      )}

      {/* Render category filter list */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Category</h4>
        {categories && categories.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {categories.map((cat, i) => (
              <li key={i}>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-purple-600"
                    checked={selectedCategories
                      .map((c) => c.toLowerCase())
                      .includes((cat.name || cat).toLowerCase())}
                    onChange={() => handleCategoryChange(cat.name || cat)}
                  />
                  <span className="capitalize">{cat.name || cat}</span>
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">Loading categories...</p>
        )}
      </div>
    </aside>
  );
};

export default ProductFilterSidebar;
