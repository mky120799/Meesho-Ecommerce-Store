import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice"; // 
import searchReducer from "./searchSlice"; 
import cartReducer from './cartSlice'; 

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer, // 
    search: searchReducer,
    cart: cartReducer, 
  },
});

export default store;