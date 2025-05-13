// components/auth/SignInModal.tsx
"use client";

import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Dialog,
    DialogContent,
    IconButton,
    DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";
import SignUpModal from "./SignUpModal";

interface SignInModalProps {
    open: boolean;
    onClose: () => void;
    switchToSignUp?: () => void; // Make optional if not always needed
}

export default function SignInModal({ open, onClose }: SignInModalProps) {
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
                toast.success("Cart items saved successfully!");
            } catch (error) {
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
                toast.error(data.message || "Sign in failed.");
            }
        } catch (error) {
            toast.error("Sign in failed.");
        }
    };

    // Handle closing both modals
    const handleCloseAll = () => {
        setShowSignUp(false);
        onClose();
    };

    // Switch to SignUp modal
    const handleSwitchToSignUp = () => {
        setShowSignUp(true);
    };

    // Switch back to SignIn modal from SignUp
    const handleSwitchToSignIn = () => {
        setShowSignUp(false);
    };

    return (
        <>
            <Dialog
                open={open && !showSignUp}
                onClose={onClose}
                fullWidth
                maxWidth="xs"
                PaperProps={{
                    sx: {
                        borderRadius: 5,
                        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
                        boxShadow: "0 8px 32px 0 rgba(25, 118, 210, 0.25)",
                        border: "1.5px solid var(--secondary-color)",
                        overflow: "hidden",
                    },
                }}
            >
                <DialogTitle sx={{ p: 0 }}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        px={4}
                        pt={3}
                        pb={1}
                        sx={{
                            background: "linear-gradient(90deg, var(--secondary-color) 60%, var(--primary-color) 100%)",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontWeight={800}
                            sx={{
                                color: "#fff",
                                letterSpacing: 1.5,
                                textShadow: "0 2px 8pxrgba(96, 106, 117, 0.6)",
                            }}
                        >
                            Sign In
                        </Typography>
                        <IconButton onClick={onClose} size="large" sx={{ color: "#fff" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ p: 4, pt: 4 }}>
                    <Box
                        component="form"
                        onSubmit={handleLoginSubmit}
                        noValidate
                        sx={{
                            background: "#fff",
                            borderRadius: 4,
                            boxShadow: "0 2px 16px 0 #1976d21a",
                            p: 3,
                            border: "1px solid #e3eafc",
                            mt: 3,
                            mb: 2,
                            zIndex: 1,
                            position: "relative",
                        }}
                    >
                        <TextField
                            type="email"
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                            autoFocus
                            InputProps={{
                                sx: {
                                    borderRadius: 2.5,
                                    background: "#f0f4ff",
                                    fontSize: "1.05rem",
                                    boxShadow: "0 1px 4px 0 #1976d211",
                                    px: 1,
                                },
                            }}
                            InputLabelProps={{
                                sx: {
                                    color: "var(--secondary-color)",
                                    fontWeight: 600,
                                    letterSpacing: 0.5,
                                    "&.Mui-focused": {
                                        color: "var(--secondary-color)",
                                    },
                                },
                            }}
                        />
                        <TextField
                            type="password"
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                            required
                            InputProps={{
                                sx: {
                                    borderRadius: 2.5,
                                    background: "#f0f4ff",
                                    fontSize: "1.05rem",
                                    boxShadow: "0 1px 4px 0 #1976d211",
                                    px: 1,
                                },
                            }}
                            InputLabelProps={{
                                sx: {
                                    color: "var(--secondary-color)",
                                    fontWeight: 600,
                                    letterSpacing: 0.5,
                                    "&.Mui-focused": {
                                        color: "var(--secondary-color)",
                                    },
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                mt: 3,
                                py: 1.7,
                                borderRadius: 3,
                                fontWeight: 800,
                                fontSize: "1.08rem",
                                textTransform: "none",
                                background: "linear-gradient(90deg, var(--secondary-color) 60%, var(--primary-color) 100%)",
                                boxShadow: "0 4px 24px 0 #1976d233",
                                letterSpacing: 0.5,
                                transition: "background 0.3s",
                                "&:hover": {
                                    background: "linear-gradient(90deg, var(--primary-color) 60%, var(--secondary-color) 100%)",
                                    boxShadow: "0 6px 32px 0 #1976d244",
                                },
                            }}
                        >
                            Sign In
                        </Button>
                    </Box>
                    <Typography
                        sx={{
                            mt: 3,
                            textAlign: "center",
                            color: "#444",
                            fontWeight: 600,
                            letterSpacing: 0.3,
                            fontSize: "1.02rem",
                            textShadow: "0 1px 4px #1976d211",
                        }}
                        variant="body2"
                    >
                        Don&apos;t have an account?{" "}
                        <Button
                            onClick={handleSwitchToSignUp}
                            sx={{
                                color: "#444",
                                fontWeight: 700,
                                textDecoration: "underline",
                                letterSpacing: 0.5,
                                background: "none",
                                boxShadow: "none",
                                p: 0,
                                minWidth: "unset",
                                fontSize: "inherit",
                                "&:hover": {
                                    background: "none",
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            Sign up here
                        </Button>
                    </Typography>
                </DialogContent>
            </Dialog>
            <SignUpModal
                open={showSignUp}
                onClose={handleCloseAll}
                switchToSignIn={handleSwitchToSignIn}
            />
        </>
    );
}
