import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import  Home  from "./pages/Home"
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/CheckOut";
import OrderConfirmation from "./pages/OrderConfirmation";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";



const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <MainLayout>
              <Login />
            </MainLayout>
          }
        />
        <Route
          path="/register"
          element={
            <MainLayout>
              <Register />
            </MainLayout>
          }
        />
        <Route
          path="/products"
          element={
            <MainLayout>
              <Products />
            </MainLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <MainLayout>
              <ProductDetails />
            </MainLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CartPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <MainLayout>
                <CheckoutPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <ProtectedRoute>
              <MainLayout>
                <OrderConfirmation />
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;