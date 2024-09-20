import React from "react";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addItem } from "@/utils/redux/cart/cartSlice";
import { saveCartItems } from "@/utils/redux/cart/cartThunks";
import { AppDispatch } from "@/utils/redux/store";
import { AddToCartProps } from "@/types/types";
import useAuthCheck from "@/hooks/useAuthCheck";

const AddToCart: React.FC<AddToCartProps> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>(); // Ensure dispatch is typed correctly
  const { isAuthenticated, userData } = useAuthCheck();
  const addItemToCart = () => {
    const newItem = {
      id: data.id.toString(),
      name: data.name,
      price: data.price,
      img: data.img,
      quantity: data.quantity,
    };
    // Add item to local cart state
    dispatch(addItem(newItem));
    if (isAuthenticated) {
      dispatch(saveCartItems([newItem])).unwrap();
    }
  };

  return (
    <IconButton
      sx={{ color: "var(--secondary-color)" }}
      onClick={addItemToCart}
      aria-label="add to cart"
      size="large"
    >
      <AddShoppingCartIcon />
    </IconButton>
  );
};

export default AddToCart;
