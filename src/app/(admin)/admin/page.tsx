"use client";

import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import {
  AppBar,
  Box,
  Button,
  Chip,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import AdminDashboard from "@/components/admin/adminDashboard/AdminDashboard";
import Sidebar from "@/components/admin/adminSidebar/Sidebar";
import Link from "next/link";
import { useLogout } from "@/hooks/useLogout";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const ManageProduct = dynamic(
  () => import("@/components/admin/manageProduct/ManageProduct")
);
const ManageUsers = dynamic(
  () => import("@/components/admin/manageUsers/ManageUsers")
);

type AdminSection = "Dashboard" | "Users" | "ManageProducts";

export default function AdminPage() {
  const [selectedItem, setSelectedItem] = useState<AdminSection>("Dashboard");
  const { handleLogout, loading } = useLogout();


  useEffect(() => {
    const savedItem = localStorage.getItem("selectedAdminPage") as AdminSection | null;
    if (savedItem && ["Dashboard", "Users", "ManageProducts"].includes(savedItem)) {
      setSelectedItem(savedItem);
    }
  }, []);

  const handleSelectItem = (item: AdminSection) => {
    setSelectedItem(item);
    localStorage.setItem("selectedAdminPage", item);
  };

  const pageTitle = useMemo(() => {
    if (selectedItem === "ManageProducts") return "Products";
    return selectedItem;
  }, [selectedItem]);

  const renderContent = () => {
    switch (selectedItem) {
      case "Users":
        return <ManageUsers />;
      case "ManageProducts":
        return <ManageProduct />;
      case "Dashboard":
      default:
        return <AdminDashboard onSelect={handleSelectItem} />;
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f8f2" }}>
      <Sidebar selectedItem={selectedItem} onSelect={handleSelectItem} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 3 },
          overflowY: "auto",
        }}
      >
        <AppBar
          position="sticky"
          color="inherit"
          elevation={0}
          sx={{
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(8px)",
            mb: 2,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between", gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                {pageTitle}
              </Typography>
              <Chip size="small" label="Admin" color="secondary" />
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                color="secondary"
                component={Link}
                href="/"
                startIcon={<HomeRoundedIcon />}
              >
                Home
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
                startIcon={<LogoutRoundedIcon />}
              >
                {loading ? "Logging out..." : "Logout"}
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Paper
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "#fff",
          }}
        >
          {renderContent()}
        </Paper>
      </Box>
    </Box>
  );
}
