"use client";

import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
} from "@mui/material";
import { Close, PersonAdd, Login, Storefront } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";
import PrimaryButton from "../common/buttons/PrimaryButton";
import {
  authDialogPaperSx,
  authFieldSx,
  authFormSx,
  authHeaderSx,
} from "./authModalStyles";

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
  switchToSignIn: () => void;
}

export default function SignUpModal({
  open,
  onClose,
  switchToSignIn,
}: SignUpModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const items = useSelector((state: RootState) => state.cart.items);

  const handleSaveCart = async () => {
    if (items.length > 0) {
      try {
        await fetch("/api/cart/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        });
      } catch {
        toast.error("Error saving cart items.");
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Sign up successful.");
        await handleSaveCart();
        window.location.href = "/dashboard";
      } else {
        toast.error(data.message || "Sign up failed.");
      }
    } catch {
      toast.error("Sign up failed.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{ sx: authDialogPaperSx }}
    >
      <DialogTitle sx={{ p: 0 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={authHeaderSx}
        >
          <Typography variant="h6" fontWeight={800}>
            Create Account
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: "#fff" }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSignUp} noValidate sx={authFormSx}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
            required
            sx={authFieldSx}
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            margin="normal"
            required
            sx={authFieldSx}
          />
          <TextField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            sx={authFieldSx}
          />
          <TextField
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            sx={authFieldSx}
          />
          <PrimaryButton type="submit" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </PrimaryButton>
        </Box>

        <Typography sx={{ mt: 2, textAlign: "center" }} variant="body2">
          Already have an account?{" "}
          <Typography
            component="button"
            onClick={switchToSignIn}
            sx={{
              color: "secondary.main",
              fontWeight: 700,
              textDecoration: "underline",
              background: "transparent",
              border: 0,
              cursor: "pointer",
            }}
          >
            Sign In
          </Typography>
        </Typography>
      </DialogContent>
    </Dialog>
  );
}