import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalItems, setCart } from "@/utils/redux/cart/cartSlice";
import { Badge, Menu, MenuItem } from "@mui/material";
import useAuthCheck from "@/hooks/useAuthCheck";
import toast from "react-hot-toast";
import Image from "next/image";
import logo from "../../../../public/logo.webp";
import { removeCartItem } from "@/utils/redux/cart/cartThunks";
import { AppDispatch } from "@/utils/redux/store";
import { useLogout } from "@/hooks/useLogout";

const pages = [{ name: "Home", href: "/" }];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const totalItems = useSelector(selectTotalItems);
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, userData } = useAuthCheck();
  const { handleLogout, loading } = useLogout();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleMenuOpen = (event) => {
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

  
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "var(--primary-gradient)",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <IconButton
            size="large"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Link href="/" passHref>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              <Image src={logo} alt="Logo" width={56} height={56} />
            </Typography>
          </Link>
          <Link href="/cart" passHref>
            <IconButton size="large" aria-label="cart" color="inherit">
              <Badge
                badgeContent={totalItems}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "var(--secondary-color)",
                    color: "white",
                  },
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link href="/">
            <Typography variant="h6" noWrap component="div">
              <Image src={logo} alt="Logo" width={56} height={56} />
            </Typography>
          </Link>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                href={page.href}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.name}
              </Button>
            ))}
            <Link href="/cart" passHref>
              <IconButton size="large" aria-label="cart" color="inherit">
                <Badge
                  badgeContent={totalItems}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "var(--secondary-color)",
                      color: "white",
                    },
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>

            {isAuthenticated ? (
              <Box sx={{ ml: 2 }}>
                <Button onMouseEnter={handleMenuOpen} sx={{ color: "white" }}>
                  {userData.firstName}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  MenuListProps={{
                    onMouseLeave: handleMenuClose,
                  }}
                >
                  <MenuItem onClick={handleMenuClose}>
                    <Link href="/dashboard">Dashboard</Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>{loading ? "Logging out..." : "Logout"}
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Link href="/signin" passHref>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Sign In
                </Button>
              </Link>
            )}
          </Box>
        </Box>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerClose}
          PaperProps={{
            sx: {
              width: "80%",
            },
          }}
        >
          <Box
            role="presentation"
            onClick={handleDrawerClose}
            onKeyDown={handleDrawerClose}
          >
            <List>
              {pages.map((page) => (
                <Link href={page.href} key={page.name}>
                  <ListItem button>
                    <ListItemText primary={page.name} />
                  </ListItem>
                </Link>
              ))}
            </List>
            {isAuthenticated ? (
              <List>
                <Link href="/dashboard">
                  <ListItem button>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                </Link>
                <ListItem button onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            ) : (
              <List>
                <Link href="/signin">
                  <ListItem button>
                    <ListItemText primary="Sign In" />
                  </ListItem>
                </Link>
              </List>
            )}
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
