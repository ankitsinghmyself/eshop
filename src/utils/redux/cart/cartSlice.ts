import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],  // Ensure initialState is set correctly
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      if (!Array.isArray(state.items)) {
        state.items = [];
      }
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeOrDecrementItem: (state, action: PayloadAction<string>) => {
      if (!Array.isArray(state.items)) {
        state.items = [];
      }
      const existingItem = state.items.find(item => item.id === action.payload);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];  // Ensure items is always an array
    },
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = Array.isArray(action.payload) ? action.payload : [];  // Ensure items is an array
    },
  },
});

export const selectTotalItems = createSelector(
  (state: RootState) => Array.isArray(state.cart.items) ? state.cart.items : [],  // Ensure items is an array
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const { addItem, removeOrDecrementItem, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
