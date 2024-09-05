"use client";
import { useEffect, useState } from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setUser(null);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" padding={4}>
      {user && (
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "#f0f0f0",
            padding: 3,
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome, {user.name}
          </Typography>
          <Box
            component="pre"
            sx={{
              textAlign: "left",
              backgroundColor: "#fff",
              padding: 2,
              borderRadius: 1,
              overflowX: "auto",
              mb: 3,
            }}
          >
            {JSON.stringify(user, null, 2)}
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{
              backgroundColor: "black",
              "&:hover": {
                backgroundColor: "gray",
              },
              color: "white",
              fontWeight: "bold",
              py: 1,
              px: 2,
              borderRadius: 1,
            }}
          >
            Logout
          </Button>
        </Box>
      )}
    </Grid>
  );
}
