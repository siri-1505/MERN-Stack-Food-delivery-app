import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.total_price += newItem.total_price;
      } else {
        state.items.push(newItem);
      }
    },
    removeItem(state, action) {
      const removeItem = action.payload;
      const existingItem = state.items.find(item => item.name === removeItem.name);
      if (existingItem) {
        if (existingItem.quantity <= 1) {
          state.items = state.items.filter(item => item.name !== removeItem.name);
        } else {
          existingItem.quantity--;
          existingItem.total_price -= removeItem.price;
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
  }
});

export const { addToCart, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
