"use client";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/redux/store";
import toast from "react-hot-toast";
import { saveOrder } from "@/utils/redux/order/orderThunks";
import { clearCart } from "@/utils/redux/cart/cartSlice";
import {
  TextField,
  Container,
  Typography,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";

export default function Checkout() {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);
  const { address } = useSelector((state: RootState) => state.user);

  const initialAddress =
    typeof address === "string"
      ? address
      : address
      ? `${address.street}, ${address.city}, ${address.pinCode}`
      : "";

  const [streetAddress, setStreetAddress] = useState<string>(initialAddress);
  const [city, setCity] = useState<string>("");
  const [pinCode, setPinCode] = useState<string>("");

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const handleCheckout = async () => {
    try {
      const fullAddress = `${streetAddress}, ${city}, ${pinCode}`;
      await dispatch(saveOrder({ items, address: fullAddress })).unwrap();
      toast.success("Checkout successful!");
      dispatch(clearCart());
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Error during checkout.");
    }
  };

  return (
    <Container className="page-shell" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
        Checkout
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Shipping Address
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleCheckout();
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Address"
                    variant="outlined"
                    fullWidth
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="Enter your address"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    variant="outlined"
                    fullWidth
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter your city"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Pin Code"
                    variant="outlined"
                    fullWidth
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="Enter your pin code"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <PrimaryButton type="submit">Complete Checkout</PrimaryButton>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
              Summary
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography color="text.secondary">Items</Typography>
              <Typography>{items.length}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color="text.secondary">Total</Typography>
              <Typography sx={{ fontWeight: 800 }}>₹{total.toFixed(2)}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
