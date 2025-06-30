import { createSlice } from '@reduxjs/toolkit';
import {
  loadCartFromLocalStorage,
  saveCartToLocalStorage,
} from "../utils/cartStorage";

const user = JSON.parse(localStorage.getItem("authUser"));

const initialState = {
  items: loadCartFromLocalStorage(user?.email),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateQuantity: (state, action) => {
      const { id, quantity, email } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      console.log("🔄 Updating quantity in localStorage for:", email);
      saveCartToLocalStorage(email, state.items);
    },

    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }

      const email = action.meta?.email || action.payload.email; // <-- ensure this is passed
      if (email) {
        console.log("📦 Saving cart to localStorage for:", email);
        console.log("📦 Cart contents:", state.items);
        saveCartToLocalStorage(email, state.items); //  very important
      }
    },

    removeFromCart: (state, action) => {
      const { id, email } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      console.log("❌ Removing item from cart for:", email);
      saveCartToLocalStorage(email, state.items);
    },

    clearCart: (state, action) => {
      state.items = [];
      const email = action.payload;
      saveCartToLocalStorage(email, []);
    },
    // reset the cart on login
    resetCart: (state) => {
      state.items = [];
    },
    // sets the cart on login
    setCart: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { updateQuantity, addToCart, removeFromCart, clearCart,  resetCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;