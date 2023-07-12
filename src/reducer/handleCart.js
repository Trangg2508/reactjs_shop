
import { createSlice } from "@reduxjs/toolkit";

const CART_LOCAL_STORAGE_KEY = 'cartKey';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY)) || [],
    token: localStorage.getItem('token') || '',
  },
  reducers: {
    addToCart: (state, action) => {
      const { token } = state;
      const newItem = { ...action.payload, quantity: 1, token };
      const existingItemIndex = state.cartItems.findIndex(item => item.token === token && item.id === newItem.productId);
      if (existingItemIndex !== -1) {
        // Item already exists in the cart, update its quantity
        const existingItem = state.cartItems[existingItemIndex];
        const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex] = updatedItem;
        localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(updatedCartItems));
        return { ...state, cartItems: updatedCartItems };
      } else {
        // Item doesn't exist in the cart, add it as a new item
        const updatedCartItems = [...state.cartItems, newItem];
        localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(updatedCartItems));
        return { ...state, cartItems: updatedCartItems };
      }
    },

    removeFromCart: (state, action) => {
      const { token } = state;
      const productId = action.payload;
      const updatedCartItems = state.cartItems.filter(item => item.token === token && item.id !== productId);
      localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(updatedCartItems));
      return { ...state, cartItems: updatedCartItems };
    },

    decreaseQuantity: (state, action) => {
      const { token } = state;
      const productId = action.payload;
      const updatedCartItems = state.cartItems.map(item => {
        if (item.token === token && item.id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(updatedCartItems));
      return { ...state, cartItems: updatedCartItems };
    },

    increaseQuantity: (state, action) => {
      const { token } = state;
      const productId = action.payload;
      const updatedCartItems = state.cartItems.map(item => {
        if (item.token === token && item.id === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(updatedCartItems));
      return { ...state, cartItems: updatedCartItems };
    },

    clearCart: (state) => {
      localStorage.removeItem(CART_LOCAL_STORAGE_KEY);
      return { ...state, cartItems: [] };
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
