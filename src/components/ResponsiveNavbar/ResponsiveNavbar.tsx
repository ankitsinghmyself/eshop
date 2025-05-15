"use client";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  InputBase,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import useAuthCheck from "@/hooks/useAuthCheck";
import { useLogout } from "@/hooks/useLogout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/redux/store";
import { setCart } from "@/utils/redux/cart/cartSlice";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SignInModal from "../auth/SignInModal";

type Props = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

const pages = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

const ResponsiveNavbar: React.FC<Props> = ({ darkMode, setDarkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  const { isAuthenticated, userData } = useAuthCheck();
  const { handleLogout } = useLogout();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchCart = async () => {
        try {
          const response = await fetch("/api/cart/get");
          const data = await response.json();
          dispatch(setCart(data.items));
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };
      fetchCart();
    }
  }, [dispatch, isAuthenticated]);

  const drawerList = (
    <Box
      sx={{
        width: 250,
        backgroundColor: theme.palette.background.default,
        height: "100%",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {pages.map((text) => (
          <Link key={text.name} href={text.href} passHref>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={6}
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor: darkMode
            ? "rgba(30,30,30,0.8)"
            : "rgba(255,255,255,0.8)",
          color: darkMode ? "#fff" : "#000",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Link href={"/"} passHref>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontWeight: "bold", cursor: "pointer" }}
            >
              🛍️ ShopMate
            </Typography>
          </Link>

          {/* Mobile Nav */}
          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2 }}>
              {pages.map((page) => (
                <Link key={page.name} href={page.href} passHref>
                  <Button
                    color="inherit"
                    sx={{
                      textTransform: "none",
                      fontWeight: pathname === page.href ? 700 : 500,
                      borderBottom:
                        pathname === page.href ? "2px solid" : "none",
                    }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
            </Box>
          )}

          {/* Right Controls */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Search (desktop only) */}
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "8px",
                  backgroundColor: theme.palette.action.hover,
                }}
              >
                <SearchIcon fontSize="small" />
                <InputBase placeholder="Search…" sx={{ ml: 1 }} />
              </Box>
            )}

            {/* Theme Toggle */}
            <IconButton color="inherit" onClick={toggleTheme}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            {/* Cart */}
            <Link href="/cart" passHref>
              <IconButton color="inherit">
                <Badge badgeContent={cartItems.length} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>

            {/* Profile/Login Dropdown */}
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {isAuthenticated ? (
                <>
                  <MenuItem disabled>Hi, {userData?.name || "User"}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => setOpenSignIn(true)}>Login/Register</MenuItem>
                </>
              )}
            </Menu>

            {/* Hamburger */}
            {isMobile && (
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>

        {/* Drawer for mobile */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          {drawerList}
        </Drawer>
      </AppBar>
      <SignInModal open={openSignIn} onClose={() => setOpenSignIn(false)} />
    </>
  );
};

export default ResponsiveNavbar;
