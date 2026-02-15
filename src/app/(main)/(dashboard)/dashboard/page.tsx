"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Paper, Grid, Avatar, Button, Chip } from "@mui/material";
import toast from "react-hot-toast";

type DashboardUser = {
  firstName?: string;
  lastName?: string;
  email?: string;
  isAdmin?: boolean;
};

export default function Dashboard() {
  const [userData, setUserData] = useState<DashboardUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/profile");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data.");
        router.push("/signin");
      }
    };

    fetchUserData();
  }, [router]);

  if (!userData) {
    return (
      <Box className="page-shell" sx={{ py: 6 }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  const fullName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim();

  return (
    <Box className="page-shell" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
        Dashboard
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Avatar sx={{ bgcolor: "secondary.main", width: 56, height: 56 }}>
                {(userData.firstName || "U").charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Welcome, {fullName || "User"}
                </Typography>
                <Typography color="text.secondary">{userData.email}</Typography>
              </Box>
            </Box>

            <Chip
              label={userData.isAdmin ? "Admin Account" : "Customer Account"}
              color="secondary"
              variant={userData.isAdmin ? "filled" : "outlined"}
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              <Button variant="contained" color="secondary" onClick={() => router.push("/cart")}>
                View Cart
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => router.push("/")}>
                Continue Shopping
              </Button>
              {userData.isAdmin && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => router.push("/admin")}
                >
                  Admin Dashboard
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
