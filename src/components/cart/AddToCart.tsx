// components/AddToCart.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "@/utils/redux/cartSlice";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

interface AddToCartProps {
  data: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  };
}

const AddToCart: React.FC<AddToCartProps> = ({ data }) => {
  const dispatch = useDispatch();

  const addItemToCart = () => {
    const newItem = {
      id: data.id, 
      name: data.name,
      price: data.price,
      quantity: data.quantity,
    };
    dispatch(addItem(newItem));
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
