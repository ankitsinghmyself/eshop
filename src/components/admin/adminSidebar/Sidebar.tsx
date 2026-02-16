"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 270;

type NavItem = "Dashboard" | "Users" | "ManageProducts";

interface SidebarProps {
  selectedItem: NavItem;
  onSelect: (item: NavItem) => void;
}

export default function Sidebar({ selectedItem, onSelect }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navItems = useMemo(
    () => [
      { label: "Dashboard", icon: <DashboardRoundedIcon /> },
      { label: "Users", icon: <PeopleRoundedIcon /> },
      { label: "ManageProducts", icon: <Inventory2RoundedIcon /> },
    ],
    []
  );

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleSelect = (item: NavItem) => {
    onSelect(item);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawerContent = (
    <>
      <Toolbar sx={{ px: 2 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.2 }}>
            Admin Panel
          </Typography>
          <Typography variant="caption" color="text.secondary">
            eShop management
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List sx={{ p: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.label}
            selected={selectedItem === item.label}
            onClick={() => handleSelect(item.label as NavItem)}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&.Mui-selected": {
                background: "linear-gradient(120deg, #e4f1dd 0%, #d5e7cc 100%)",
                color: "#1c2b18",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label === "ManageProducts" ? "Products" : item.label}
            />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: "fixed",
            top: 12,
            left: 12,
            zIndex: 1301,
            backgroundColor: "#fff",
            border: "1px solid #d3e3cc",
            "&:hover": { backgroundColor: "#f3f9ef" },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #d3e3cc",
            background:
              "linear-gradient(180deg, rgba(244,248,242,1) 0%, rgba(234,243,229,1) 100%)",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
