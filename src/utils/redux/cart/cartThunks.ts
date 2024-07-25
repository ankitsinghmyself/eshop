// utils/redux/cart/cartThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CartItem } from '@/types';
import { setCart } from './cartSlice';

export const saveCartItems = createAsyncThunk<
  void, // Return type of the thunk
  CartItem[], // Argument type of the thunk
  { rejectValue: string } // ThunkAPI configuration
>(
  'cart/saveCartItems',
  async (items: CartItem[], { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch('/api/cart/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error('Failed to save cart items');
      }

      const cart = await response.json();
      dispatch(setCart(cart.items)); // Update Redux store with the saved items
    } catch (error) {
      return rejectWithValue('Error saving cart items');
    }
  }
);
