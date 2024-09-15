import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/utils/redux/store";
import {
  clearCart,
  selectTotalItems,
  removeOrDecrementItem,
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
import toast from "react-hot-toast";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useAuthCheck from "@/hooks/useAuthCheck";

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items || []);
  const totalItems = useSelector(selectTotalItems);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useAuthCheck();

  const handleRemoveItem = async (itemId: any) => {
    dispatch(removeOrDecrementItem(itemId));
    try {
      const response = await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      });

      if (!response.ok) {
        throw new Error("Failed to update cart");
      }
      toast.success("Item updated successfully!");
    } catch (error) {
      toast.error("Error updating cart.");
    }
  };

  const handleClearCart = async () => {
    dispatch(clearCart());
    try {
      await fetch("/api/cart/clear", {
        method: "POST",
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const handleCheckoutCart = () => {
    window.location.href = "/checkout";
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart ({totalItems})
      </Typography>
      <List>
        {items.length > 0 ? (
          Object.keys(items).map((key) => {
            const item = items[key];
            return (
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
            );
          })
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
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
            startIcon={<AddShoppingCartIcon />}
            onClick={handleCheckoutCart}
          >
            Checkout
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Cart;
