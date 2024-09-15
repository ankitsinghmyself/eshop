import React from "react";
import { useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { AddToCartProps } from "@/types";
import { addItem } from "@/utils/redux/cart/cartSlice";
import { saveCartItems } from "@/utils/redux/cart/cartThunks";
import { AppDispatch } from "@/utils/redux/store";

const AddToCart: React.FC<AddToCartProps> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>(); // Ensure dispatch is typed correctly

  const addItemToCart = async () => {
    const newItem = {
      id: data.id.toString(),
      name: data.name,
      price: data.price,
      quantity: data.quantity,
    };

    // Add item to local cart state
    dispatch(addItem(newItem));

    try {
      // Handle saving cart items to the server
      await dispatch(saveCartItems([newItem])).unwrap();
      // Optionally, show success message or update UI
    } catch (error) {
      console.error("Failed to save cart items:", error);
      // Optionally, show error message or handle failure
    }
  };

  return (
    <IconButton
      color="primary"
      onClick={addItemToCart}
      aria-label="add to cart"
      size="large"
    >
      <AddShoppingCartIcon />
    </IconButton>
  );
};

export default AddToCart;
