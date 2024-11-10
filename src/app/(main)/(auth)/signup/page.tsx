"use client";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import toast from "react-hot-toast";
import Image from "next/image";
import logo from "../../../../public/logo.webp";
import styles from "@/styles/auth/LoginPage.module.scss";
export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Clear previous error message
    setError("");

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      toast.success("Sign up successful");
      window.location.href = "/signin";
    } else {
      // Handle error
      const errorData = await response.json();
      toast.error(errorData.message || "Sign up failed");
      setError(errorData.message || "Sign up failed");
    }
  };

  return (
    <Grid container justifyContent="center" className={styles.container}>
      <Grid
        item
        xs={12}
        sm={8}
        md={8}
        lg={8}
        sx={{ textAlign: "center", display: { xs: "none", sm: "block" } }}
        className={styles.imgContainer}
      >
        <Image
          className={styles.img}
          src={logo}
          alt="Login Screen img"
          width={400}
          height={400}
          priority
        />
        <div className={styles.animatedHr}>
          <hr />
          <h4>Welcome to the SignUp Screen </h4>
        </div>
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Image src={logo} alt="Logo" width={100} height={100} />
          <Typography variant="h6">Welcome to the EShop</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: "100%", maxWidth: 400 }}
          >
            <TextField
              type="text"
              label="Name"
              fullWidth
              margin="normal"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              type="text"
              label="Last Name"
              fullWidth
              margin="normal"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
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
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>
          </Box>
          <Typography sx={{ mt: 2 }}>
            Already have an account? <Link href="/signin">Sign In</Link>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
