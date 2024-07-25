// components/Cart.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/utils/redux/store";
import {
  removeItem,
  clearCart,
  selectTotalItems,
} from "@/utils/redux/cart/cartSlice";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSession } from "next-auth/react";
import { saveCartItems } from "@/utils/redux/cart/cartThunks"; // Import saveCartItems if needed

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const totalItems = useSelector(selectTotalItems);
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();


  const handleRemoveItem = (itemId: number) => {
    dispatch(removeItem(itemId));
    if (session?.user) {
      dispatch(saveCartItems(items.filter((item) => item.id !== itemId)));
    }
  };

  const handleClearCart = async () => {
    dispatch(clearCart());
    if (session?.user) {
      try {
        await fetch("/api/cart/clear", {
          method: "POST",
        });
        dispatch(saveCartItems([]));
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }
  };


  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart ({totalItems})
      </Typography>
      <List>
        {items.length > 0 ? (
          items.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemText
                  primary={`${item.name} - $${item.price}`}
                  secondary={`Quantity: ${item.quantity}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Your cart is empty.
          </Typography>
        )}
      </List>
      {items.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClearCart}
          >
            Clear Cart
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Cart;
