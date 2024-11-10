import React, { Suspense, useCallback, useTransition, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/utils/redux/store";
import {
  clearCart,
  selectTotalItems,
  removeOrDecrementItem,
  addItem,
} from "@/utils/redux/cart/cartSlice";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemIcon,
  LinearProgress,
  Divider,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Image from "next/image";
import { removeCartItem, saveCartItems } from "@/utils/redux/cart/cartThunks";
import toast from "react-hot-toast";
import useAuthCheck from "@/hooks/useAuthCheck";
import Link from "next/link";
import PrimaryButton from "../common/buttons/PrimaryButton";

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items || []);
  const totalItems = useSelector(selectTotalItems);
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useAuthCheck();
  const [loadingItems, setLoadingItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isPending, startTransition] = useTransition();

  const handleClearCart = async () => {
    startTransition(async () => {
      dispatch(clearCart());
      try {
        await fetch("/api/cart/clear", { method: "POST" });
        toast.success("Cart cleared successfully!");
      } catch (error) {
        console.error("Error clearing cart:", error);
        toast.error("Failed to clear cart.");
      }
    });
  };

  const decrementItem = useCallback(
    async (item) => {
      if (loadingItems[item.id]) return; // Prevent further clicks if already loading

      setLoadingItems((prev) => ({ ...prev, [item.id]: true })); // Set loading state for this item
      startTransition(async () => {
        dispatch(removeOrDecrementItem(item.id));

        // If quantity is 1, remove the item entirely
        if (item.quantity <= 1) {
          await dispatch(removeCartItem(item.id));
        } else {
          const updatedItem = { ...item, quantity: -1 }; // Decrement by 1
          if (isAuthenticated) {
            await dispatch(saveCartItems([updatedItem])).unwrap();
          }
        }
        setLoadingItems((prev) => ({ ...prev, [item.id]: false })); // Reset loading state for this item
      });
    },
    [dispatch, isAuthenticated, loadingItems]
  );

  const incrementItem = useCallback(
    async (item) => {
      if (loadingItems[item.id]) return; // Prevent further clicks if already loading

      setLoadingItems((prev) => ({ ...prev, [item.id]: true })); // Set loading state for this item
      startTransition(async () => {
        const newItem = { ...item, quantity: 1 };
        dispatch(addItem(newItem));
        if (isAuthenticated) {
          await dispatch(saveCartItems([newItem])).unwrap();
        }
        setLoadingItems((prev) => ({ ...prev, [item.id]: false })); // Reset loading state for this item
      });
    },
    [dispatch, isAuthenticated, loadingItems]
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart ({totalItems})
      </Typography>
      <List>
        {items.length > 0 ? (
          items.map((item) => (
            <Suspense fallback={<LinearProgress />} key={item.id}>
              {item.quantity > 0 && (
                <ListItem>
                  <ListItemIcon>
                    <Image
                      src={item.img}
                      width={100}
                      height={100}
                      alt="Product"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${item.name} - $${item.price.toFixed(2)}`}
                    secondary={`Quantity: ${item.quantity}`}
                  />
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => decrementItem(item)}
                      disabled={loadingItems[item.id] || isPending} // Disable only for this item
                    >
                      -
                    </Button>
                    <Typography variant="body2" sx={{ mx: 1 }}>
                      {item.quantity}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => incrementItem(item)}
                      disabled={loadingItems[item.id] || isPending} // Disable only for this item
                    >
                      +
                    </Button>
                  </Box>
                </ListItem>
              )}
              <Divider />
            </Suspense>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Your cart is empty.
          </Typography>
        )}
      </List>
      {items.length === 0 ? (
        <>
          <PrimaryButton>
            <Link href="/">Continue Shopping</Link>
          </PrimaryButton>
        </>
      ) : (
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
            onClick={() => (window.location.href = "/checkout")}
          >
            Checkout
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Cart;
