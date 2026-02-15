import React, { useCallback, useMemo, useState, useTransition } from "react";
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
  Box,
  LinearProgress,
  Divider,
  Paper,
  Stack,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Image from "next/image";
import { removeCartItem, saveCartItems } from "@/utils/redux/cart/cartThunks";
import toast from "react-hot-toast";
import useAuthCheck from "@/hooks/useAuthCheck";
import Link from "next/link";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";

const Cart: React.FC = () => {
  const items = useSelector((state: RootState) => state.cart.items || []);
  const totalItems = useSelector(selectTotalItems);
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useAuthCheck();
  const [loadingItems, setLoadingItems] = useState<{ [key: string]: boolean }>({});
  const [isPending, startTransition] = useTransition();

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  const handleClearCart = async () => {
    startTransition(async () => {
      dispatch(clearCart());
      try {
        await fetch("/api/cart/clear", { method: "POST" });
        toast.success("Cart cleared successfully.");
      } catch (error) {
        console.error("Error clearing cart:", error);
        toast.error("Failed to clear cart.");
      }
    });
  };

  const decrementItem = useCallback(
    async (item: (typeof items)[number]) => {
      if (loadingItems[item.id]) return;
      setLoadingItems((prev) => ({ ...prev, [item.id]: true }));

      startTransition(async () => {
        dispatch(removeOrDecrementItem(item.id));

        if (item.quantity <= 1) {
          await dispatch(removeCartItem(item.id));
        } else if (isAuthenticated) {
          await dispatch(saveCartItems([{ ...item, quantity: -1 }])).unwrap();
        }

        setLoadingItems((prev) => ({ ...prev, [item.id]: false }));
      });
    },
    [dispatch, isAuthenticated, loadingItems]
  );

  const incrementItem = useCallback(
    async (item: (typeof items)[number]) => {
      if (loadingItems[item.id]) return;
      setLoadingItems((prev) => ({ ...prev, [item.id]: true }));

      startTransition(async () => {
        const newItem = { ...item, quantity: 1 };
        dispatch(addItem(newItem));
        if (isAuthenticated) {
          await dispatch(saveCartItems([newItem])).unwrap();
        }
        setLoadingItems((prev) => ({ ...prev, [item.id]: false }));
      });
    },
    [dispatch, isAuthenticated, loadingItems]
  );

  return (
    <Container className="page-shell" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
        Shopping Cart ({totalItems})
      </Typography>

      {items.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Your cart is empty.
          </Typography>
          <PrimaryButton component={Link} href="/">
            Continue Shopping
          </PrimaryButton>
        </Paper>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            gap: 2,
          }}
        >
          <Paper sx={{ p: 2 }}>
            <Stack divider={<Divider />} spacing={1}>
              {items.map((item) => (
                <Box key={item.id} sx={{ py: 1.5 }}>
                  {loadingItems[item.id] && <LinearProgress sx={{ mb: 1 }} />}
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Image src={item.img} width={90} height={90} alt={item.name} />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ fontWeight: 700 }}>{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₹{item.price.toFixed(2)} each
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <IconButton
                        onClick={() => decrementItem(item)}
                        disabled={loadingItems[item.id] || isPending}
                        size="small"
                        color="secondary"
                      >
                        {item.quantity <= 1 ? <DeleteOutlineIcon /> : <RemoveIcon />}
                      </IconButton>
                      <Typography sx={{ minWidth: 24, textAlign: "center" }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        onClick={() => incrementItem(item)}
                        disabled={loadingItems[item.id] || isPending}
                        size="small"
                        color="secondary"
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>

          <Paper sx={{ p: 2, height: "fit-content" }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
              Order Summary
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography color="text.secondary">Items</Typography>
              <Typography>{totalItems}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography color="text.secondary">Subtotal</Typography>
              <Typography sx={{ fontWeight: 700 }}>₹{subtotal.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <PrimaryButton component={Link} href="/checkout" fullWidth sx={{ mb: 1.5 }}>
              Checkout
            </PrimaryButton>
            <Button variant="outlined" color="secondary" fullWidth onClick={handleClearCart}>
              Clear Cart
            </Button>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default Cart;
