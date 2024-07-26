// redux/orderThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CartItem } from '@/types';
import { RootState } from '@/utils/redux/store';

interface OrderPayload {
  items: CartItem[];
  address: string | null;
}

export const saveOrder = createAsyncThunk<void, OrderPayload, { rejectValue: string }>(
  'order/saveOrder',
  async ({ items, address }: OrderPayload, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items, address }),
      });

      if (!response.ok) {
        throw new Error('Failed to save order');
      }

      // Optionally handle response if needed
    } catch (error) {
      return rejectWithValue('Error saving order');
    }
  }
);
