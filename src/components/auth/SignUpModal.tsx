"use client";

import { useState } from "react";
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
    Grid,
} from "@mui/material";
import { Close, PersonAdd, Login, Storefront } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/redux/store";

interface SignUpModalProps {
    open: boolean;
    onClose: () => void;
    switchToSignIn: () => void;
}

export default function SignUpModal({ open, onClose, switchToSignIn }: SignUpModalProps) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const items = useSelector((state: RootState) => state.cart.items);
    const theme = useTheme();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveCart = async () => {
        if (items.length > 0) {
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

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                await handleSaveCart();
                window.location.href = "/dashboard";
            } else {
                setError(data.message || "Sign up failed");
            }
        } catch (error) {
            setError("Sign up failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    overflow: "hidden",
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
                        Create Account
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Join ShopMate and start shopping
                    </Typography>
                </Box>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSignUp}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </Grid>
                    </Grid>

                    <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                        disabled={loading}
                    />
                    
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        margin="normal"
                        required
                        disabled={loading}
                    />

                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        margin="normal"
                        required
                        disabled={loading}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={loading}
                        startIcon={<PersonAdd />}
                        sx={{ mt: 3, mb: 2, py: 1.5 }}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                </Box>
                
                <Divider sx={{ my: 3 }} />
                
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Already have an account?
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={switchToSignIn}
                        startIcon={<Login />}
                        sx={{ textTransform: 'none' }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Dialog>
    );
}