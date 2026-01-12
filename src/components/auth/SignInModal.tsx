"use client";

import { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Dialog,
    IconButton,
    useTheme,
    Divider,
    Alert,
} from "@mui/material";
import { Close, Login, PersonAdd, Storefront } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";
import SignUpModal from "./SignUpModal";

interface SignInModalProps {
    open: boolean;
    onClose: () => void;
}

export default function SignInModal({ open, onClose }: SignInModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSignUp, setShowSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [mounted, setMounted] = useState(false);
    const items = useSelector((state: RootState) => state.cart.items);
    const theme = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSaveCart = async () => {
        if (mounted && items.length > 0) {
            try {
                await fetch("/api/cart/save", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ items }),
                });
            } catch (error) {
                console.error("Error saving cart items:", error);
            }
        }
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                await handleSaveCart();
                window.location.href = "/dashboard";
            } else {
                setError(data.message || "Sign in failed.");
            }
        } catch (error) {
            setError("Sign in failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleCloseAll = () => {
        setShowSignUp(false);
        onClose();
        setEmail("");
        setPassword("");
        setError("");
    };

    const handleSwitchToSignUp = () => {
        setShowSignUp(true);
    };

    const handleSwitchToSignIn = () => {
        setShowSignUp(false);
    };

    return (
        <>
            <Dialog
                open={open && !showSignUp}
                onClose={onClose}
                maxWidth="sm"
                fullWidth
                scroll="body"
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        maxHeight: '90vh',
                    },
                }}
            >
                <Box sx={{ position: 'relative', p: 4 }}>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            color: theme.palette.text.secondary,
                        }}
                    >
                        <Close />
                    </IconButton>

                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Storefront sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                            Welcome Back
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Sign in to your ShopMate account
                        </Typography>
                    </Box>

                    <Alert severity="info" sx={{ mb: 3 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                            Demo Credentials:
                        </Typography>
                        <Typography variant="body2">
                            Email: admin@admin.com
                        </Typography>
                        <Typography variant="body2">
                            Password: admin
                        </Typography>
                    </Alert>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleLoginSubmit}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            required
                            disabled={loading}
                        />
                        
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            required
                            disabled={loading}
                        />
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading || !email || !password}
                            startIcon={<Login />}
                            sx={{ mt: 3, mb: 2, py: 1.5 }}
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </Box>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Don't have an account?
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={handleSwitchToSignUp}
                            startIcon={<PersonAdd />}
                            sx={{ textTransform: 'none' }}
                        >
                            Create Account
                        </Button>
                    </Box>
                </Box>
            </Dialog>
            
            <SignUpModal
                open={showSignUp}
                onClose={handleCloseAll}
                switchToSignIn={handleSwitchToSignIn}
            />
        </>
    );
}