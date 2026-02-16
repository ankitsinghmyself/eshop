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
import { Close, Login, PersonAdd, Storefront } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";
import SignUpModal from "./SignUpModal";
import PrimaryButton from "../common/buttons/PrimaryButton";
import {
  authDialogPaperSx,
  authFieldSx,
  authFormSx,
  authHeaderSx,
} from "./authModalStyles";

interface SignInModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SignInModal({ open, onClose }: SignInModalProps) {
  const demoEmail = process.env.NEXT_PUBLIC_DEMO_EMAIL || "demo@eshop.com";
  const demoPassword = process.env.NEXT_PUBLIC_DEMO_PASSWORD || "demo12345";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
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
        toast.success(data.message || "Signed in successfully.");
        await handleSaveCart();
        window.location.href = "/dashboard";
      } else {
        toast.error(data.message || "Sign in failed.");
      }
    } catch {
      toast.error("Sign in failed.");
    }
  };

  return (
    <>
      <Dialog
        open={open && !showSignUp}
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
              Sign In
            </Typography>
            <IconButton onClick={onClose} size="small" sx={{ color: "#fff" }}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Box component="form" onSubmit={handleLoginSubmit} noValidate sx={authFormSx}>
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
              autoFocus
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
            <Box
              sx={{
                mt: 1.5,
                p: 1.25,
                borderRadius: 2,
                background: "#f2f8ef",
                border: "1px dashed #b9d2ad",
              }}
            >
              <Typography variant="caption" color="text.secondary" display="block">
                Demo Login
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Email: {demoEmail}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                Password: {demoPassword}
              </Typography>
              <PrimaryButton
                type="button"
                size="small"
                sx={{ mt: 1, py: 0.5, px: 1.5 }}
                onClick={() => {
                  setEmail(demoEmail);
                  setPassword(demoPassword);
                }}
              >
                Use Demo Credentials
              </PrimaryButton>
            </Box>
            <PrimaryButton type="submit" fullWidth sx={{ mt: 2 }}>
              Sign In
            </PrimaryButton>
          </Box>

          <Typography sx={{ mt: 2, textAlign: "center" }} variant="body2">
            Don&apos;t have an account?{" "}
            <Typography
              component="button"
              onClick={() => setShowSignUp(true)}
              sx={{
                color: "secondary.main",
                fontWeight: 700,
                textDecoration: "underline",
                background: "transparent",
                border: 0,
                cursor: "pointer",
              }}
            >
              Sign up
            </Typography>
          </Typography>
        </DialogContent>
      </Dialog>

      <SignUpModal
        open={showSignUp}
        onClose={() => {
          setShowSignUp(false);
          onClose();
        }}
        switchToSignIn={() => setShowSignUp(false)}
      />
    </>
  );
}
