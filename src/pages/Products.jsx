import React from "react";
import ProductsForYou from "../components/ProductsForYou";
import Navbar from "../components/Navbar";
const Products = () => {
  return (
    <>
      <main className="min-h-screen bg-gray-50 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Products</h1>
      <ProductsForYou />
    </main>
    </>
  );
};

export default Products;