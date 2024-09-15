"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";
import { Box, TextField, Button, Typography } from "@mui/material";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const items = useSelector((state: RootState) => state.cart.items);
  console.log(JSON.stringify({ items }));
  const handleSaveCart = async () => {
    if (items.length > 0) {
      try {
        await fetch("/api/cart/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        });
        toast.success("Cart items saved successfully!");
      } catch (error) {
        console.error("Error saving cart items:", error);
        toast.error("Error saving cart items.");
      }
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      
      if (response.ok) {
        toast.success(data.message);
        await handleSaveCart();
        window.location.href = "/dashboard"; 
      } else {
        toast.error(
          data.message || "Sign in failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      toast.error("Sign in failed.");
    }
  };
  

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign In
        </Typography>
        <Box
          component="form"
          onSubmit={handleLoginSubmit}
          sx={{ width: "100%", maxWidth: 400 }}
        >
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </Box>
        <Typography sx={{ mt: 2 }}>
          Don&apos;t have an account? <Link href="/signup">Sign up here</Link>
        </Typography>
      </Box>
    </>
  );
}
