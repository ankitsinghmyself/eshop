// components/AddToCart.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/utils/redux/cart/cartSlice";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { AddToCartProps } from "@/types";
import { useSession } from "next-auth/react";
import { saveCartItems } from "@/utils/redux/cart/cartThunks";
import { AppDispatch } from "@/utils/redux/store";

const AddToCart: React.FC<AddToCartProps> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();

  const addItemToCart = () => {
    const newItem = {
      id: data.id,
      name: data.name,
      price: data.price,
      quantity: data.quantity,
    };

    // Add item to local cart state
    dispatch(addItem(newItem));

    // If user is authenticated, save the cart items to the server
    if (session?.user) {
      dispatch(saveCartItems([newItem]));
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
