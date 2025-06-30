import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchAllProducts } from "../redux/productSlice";
import ProductCard from "./ProductCard";
import ProductFilterSidebar from "./ProductFilterSidebar";

const ProductsForYou = () => {
  const dispatch = useDispatch();

  // Accessing required state from Redux store
  // Extracting necessary state from Redux store
  const {
    items : paginatedItems, // all fetched products with pagination of 10 items
    loading, // loading state for infinite scroll
    hasMore, // flag to indicate if more products can be loaded
    page, // current page number for pagination
    searchQuery, // (currently unused here) user-entered search query
    selectedCategories, // selected filters (like ['Beauty', 'Fragrances'])
    priceRange, // (currently unused) min and max price filter
    categories,
    allProducts,
  } = useSelector((state) => state.products);
   
  // Debug: Log fetched category list
  console.log("categories in products for you", categories);
  // Debug: Log paginated product items
  console.log("printing items in products for you", paginatedItems); // logs entire products array
  // Debug: Log user-selected filter categories
  console.log("selectedCategories in product for you page", selectedCategories)

  // Convert selectedCategories (names) to corresponding slugs using categories array
  const normalizedCategories = selectedCategories
    .map(name =>
      categories.find(cat => cat.name.toLowerCase() === name.toLowerCase())?.slug
    )
    .filter(Boolean);

  // Debug: Log normalized selected categories
  console.log('value of normalizedCategories before the filter',normalizedCategories)

  console.log(" allProducts length:", allProducts);
  console.log(" items (paginated) length:", paginatedItems.length);

  console.log("selectedCategories (lowercased):", normalizedCategories);
  console.log("allProducts available for filtering:", allProducts.length);

  // Normalize search query for comparison
  console.log('search query',searchQuery)
  const normalizedSearch = searchQuery?.toLowerCase().trim();
  console.log("normalised search ",normalizedSearch)

  // Determine which products to display based on selected filters and search query
  let filteredProducts = [];

  if (normalizedCategories.length > 0 || normalizedSearch) {
    filteredProducts = allProducts.filter((product) => {
      const productCategory = product.category?.toLowerCase();
      const matchesCategory = normalizedCategories.length === 0
        || normalizedCategories.includes(productCategory);

      const matchesSearch = !normalizedSearch
        || product.title?.toLowerCase().includes(normalizedSearch)
        || product.description?.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  } else {
    filteredProducts = paginatedItems;
  }

  // Debug: Log the final list of products to display after filtering
  console.log(" Filtered Products in products for you after the category is applied:", filteredProducts); // logs only matching products

  // Infinite scroll setup: Load more products when last visible item is intersecting, only if no filters are active
  // IntersectionObserver ref for infinite scroll
  const observer = useRef();

  // Hook to detect when last product in list is visible (for loading next page)
  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && normalizedCategories.length === 0 && !normalizedSearch) {
          dispatch(fetchProducts(page));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page, dispatch, normalizedCategories.length, normalizedSearch]
  );

  // On initial mount: fetch both paginated and complete product list
  // Load first page of products on initial render if none exist
  useEffect(() => {
    const fetchAll = async () => {
      await Promise.all([
        dispatch(fetchAllProducts()),
        dispatch(fetchProducts())
      ]);
    };
    fetchAll();
  }, [dispatch]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">🛍️ Products For You</h2>

      <div className="flex flex-col sm:flex-row gap-6">
        {/* Sidebar for category filters */}
        <div className="w-full sm:w-64 flex justify-center sm:block lg:w-1/4">
          <ProductFilterSidebar />
        </div>

        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product, i) => {
            // Attach observer to the last item for infinite scrolling
            // console.log('product rendering',product)
            if (i === filteredProducts.length - 1) {
              return (
                <div ref={lastProductRef} key={product.id}>
                  <ProductCard product={product} />
                </div>
              );
            }
            return <ProductCard key={product.id} product={product} />;
          })}

          {/* Show message if no products match */}
          {filteredProducts.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">
              No products match your selected filters.
            </p>
          )}
        </div>
      </div>

      {/* Loading indicator */}
      {loading && <p className="text-center mt-4 text-sm">Loading more...</p>}
    </section>
  );
};

export default ProductsForYou;
