"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/redux/store";
import toast from "react-hot-toast";
import { saveOrder } from "@/utils/redux/order/orderThunks";
import { clearCart } from "@/utils/redux/cart/cartSlice";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";

// Assuming UserAddress is an object with fields like street, city, etc.
interface UserAddress {
  street: string;
  city: string;
  pinCode: string;
}

export default function Checkout() {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);
  const { address } = useSelector((state: RootState) => state.user);

  // Assuming `address` could be a string or a `UserAddress` object
  const initialAddress = typeof address === 'string' 
    ? address 
    : address ? `${address.street}, ${address.city}, ${address.pinCode}` : "";

  const [newAddress, setNewAddress] = useState<string>(initialAddress);
  const [city, setCity] = useState<string>("");
  const [pinCode, setPinCode] = useState<string>("");

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAddress(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handlePinCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPinCode(e.target.value);
  };

  const handleCheckout = async () => {
    try {
      // Combine address details into a single string
      const fullAddress = `${newAddress}, ${city}, ${pinCode}`;

      // Save order details
      await dispatch(saveOrder({ items, address: fullAddress })).unwrap();
      
      // Handle success
      toast.success("Checkout successful!");
      // Clear cart
      dispatch(clearCart());
      
      // Redirect to order confirmation page or show a success message
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Error during checkout.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCheckout();
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="address"
              label="Address"
              variant="outlined"
              fullWidth
              value={newAddress}
              onChange={handleAddressChange}
              placeholder="Enter your address"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="city"
              label="City"
              variant="outlined"
              fullWidth
              value={city}
              onChange={handleCityChange}
              placeholder="Enter your city"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="pinCode"
              label="Pin Code"
              variant="outlined"
              fullWidth
              value={pinCode}
              onChange={handlePinCodeChange}
              placeholder="Enter your pin code"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Complete Checkout
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* Add payment gateway integration */}
      {/* Add shipping options */}
    </Container>
  );
}
