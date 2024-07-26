// redux/user/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAddress } from '@/types'; // Define this type

interface UserState {
  address: UserAddress | null;
}

const initialState: UserState = {
  address: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAddress(state, action: PayloadAction<UserAddress>) {
      state.address = action.payload;
    },
  },
});

export const { setUserAddress } = userSlice.actions;
export default userSlice.reducer;
