// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/utils/redux/cart/cartSlice";
import authReducer from "@/utils/redux/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
