"use client";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
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

const ResponsiveNavbar: React.FC<Props> = ({ darkMode, setDarkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const { isAuthenticated, userData } = useAuthCheck();
  const { handleLogout } = useLogout();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isAdmin = Boolean(userData?.isAdmin);

  const pages = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard", authOnly: true },
    { name: "Cart", href: "/cart" },
    ...(isAdmin ? [{ name: "Admin", href: "/admin", authOnly: true }] : []),
  ].filter((page) => !page.authOnly || isAuthenticated);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = async (query: string) => {
    if (query.length > 2) {
      try {
        const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setSearchResults(data.products || []);
        setShowSearchResults(true);
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchCart = async () => {
        try {
          const response = await fetch("/api/cart/get");
          if (!response.ok) return;
          const data = await response.json();
          dispatch(setCart(data.items));
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      };
      fetchCart();
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  const handleDrawerAuthAction = () => {
    setDrawerOpen(false);
    if (isAuthenticated) {
      handleLogout();
      return;
    }
    setOpenSignIn(true);
  };

  const drawerList = (
    <Box
      sx={{
        width: { xs: "84vw", sm: 320 },
        maxWidth: 340,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.paper,
      }}
      role="presentation"
    >
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 900, color: "primary.main" }}>
          eShop
        </Typography>
        <IconButton aria-label="close menu" onClick={() => setDrawerOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />

      <List sx={{ py: 1 }}>
        {pages.map((page) => (
          <ListItem disablePadding key={page.name}>
            <ListItemButton
              component={Link}
              href={page.href}
              selected={pathname === page.href}
              onClick={() => setDrawerOpen(false)}
              sx={{ mx: 1, borderRadius: 2 }}
            >
              <ListItemText
                primary={page.name}
                primaryTypographyProps={{ fontWeight: pathname === page.href ? 800 : 600 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: "auto", p: 2 }}>
        <Button
          fullWidth
          variant={isAuthenticated ? "outlined" : "contained"}
          color="primary"
          onClick={handleDrawerAuthAction}
        >
          {isAuthenticated ? "Logout" : "Login / Register"}
        </Button>
      </Box>
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
            ? "rgba(15,23,16,0.88)"
            : "rgba(255,255,255,0.92)",
          color: theme.palette.text.primary,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            minHeight: { xs: 64, md: 72 },
            px: { xs: 1.5, sm: 2.5 },
            gap: 2,
          }}
        >
          <Link href="/" passHref>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 900,
                cursor: "pointer",
                color: "primary.main",
                letterSpacing: 0.3,
              }}
            >
              eShop
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" }, justifyContent: "center" }}>
            <Box sx={{ display: "flex", gap: 1, p: 0.5, borderRadius: 999, bgcolor: "action.hover" }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={Link}
                  href={page.href}
                  color={pathname === page.href ? "primary" : "inherit"}
                  variant={pathname === page.href ? "contained" : "text"}
                  sx={{
                    fontWeight: 700,
                    minWidth: 88,
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              color="inherit"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="toggle theme"
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <IconButton
              color="inherit"
              component={Link}
              href="/cart"
              aria-label="cart"
            >
              <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {!isMobile && (
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                aria-label="account menu"
              >
                <AccountCircleIcon />
              </IconButton>
            )}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {isAuthenticated ? (
                <>
                  <MenuItem disabled>Hi, {userData?.name || "User"}</MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      handleLogout();
                    }}
                  >
                    Logout
                  </MenuItem>
                </>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    setOpenSignIn(true);
                  }}
                >
                  Login / Register
                </MenuItem>
              )}

            {isMobile && (
              <IconButton
                color="inherit"
                onClick={() => setDrawerOpen(true)}
                aria-label="open menu"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerList}
      </Drawer>
      <SignInModal open={openSignIn} onClose={() => setOpenSignIn(false)} />
    </>
  );
};

export default ResponsiveNavbar;
