// utils/redux/user/userThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { UserAddress } from '@/types/types'; // Define this type based on your schema
import { setUserAddress } from './userSlice';

export const updateAddress = createAsyncThunk<void, UserAddress, { rejectValue: string }>(
  'user/updateAddress',
  async (address: UserAddress, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch('/api/user/address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        throw new Error('Failed to update address');
      }

      dispatch(setUserAddress(address)); // Update Redux store with the new address
    } catch (error) {
      return rejectWithValue('Error updating address');
    }
  }
);
