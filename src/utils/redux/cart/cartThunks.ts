// utils/redux/cart/cartThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCart } from './cartSlice';
import { CartItem } from '@/types/types';

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
      return rejectWithValue('Error saving cartThunks items');
    }
  }
);
export const removeCartItem = createAsyncThunk<
  void, // Return type of the thunk
  string, // Argument type: the ID of the item to remove
  { rejectValue: string } // ThunkAPI configuration
>(
  'cart/removeCartItem',
  async (itemId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(`/api/cart/remove?itemId=${itemId}`, {
        method: 'DELETE', // Assuming your API supports DELETE method
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to remove cart item');
      }

      const cart = await response.json();
      dispatch(setCart(cart.items)); // Update Redux store with the updated cart items
    } catch (error) {
      return rejectWithValue('Error removing cart item');
    }
  }
);