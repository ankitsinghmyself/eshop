import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/utils/redux/cart/cartSlice";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { AddToCartProps } from "@/types";
// Removed: import { saveCartItems } from "@/utils/redux/cart/cartThunks";
// Removed: import { AppDispatch } from "@/utils/redux/store";

const AddToCart: React.FC<AddToCartProps> = ({ data }) => {
  const dispatch = useDispatch();

  const addItemToCart = () => {
    const newItem = {
      id: data.id,
      name: data.name,
      price: data.price,
      quantity: data.quantity,
    };

    // Add item to local cart state
    dispatch(addItem(newItem));

    // If you need to handle saving cart items to the server, you can add that logic here
    // For example, you can use an effect or a separate function to handle server communication
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
