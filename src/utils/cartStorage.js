// src/utils/cartStorage.js

export const getUserCartKey = (email) => `cart_${email}`;

export const saveCartToLocalStorage = (email, cartItems) => {
  if (!email) return;
  localStorage.setItem(getUserCartKey(email), JSON.stringify(cartItems));
};

export const loadCartFromLocalStorage = (email) => {
  if (!email) return [];
  const saved = localStorage.getItem(getUserCartKey(email));
  return saved ? JSON.parse(saved) : [];
};