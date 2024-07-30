"use client";
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
import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalItems, setCart } from "@/utils/redux/cart/cartSlice";
import { Badge } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { AppDispatch } from "@/utils/redux/store";

const pages = [
  { name: "Home", href: "/" },
  // { name: "Products", href: "/products" },
  // { name: "About", href: "/about" },
  // { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const totalItems = useSelector(selectTotalItems);
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  useEffect(() => {
    const fetchCart = async () => {
      if (session?.user) {
        try {
          const response = await fetch("/api/cart/get");
          const data = await response.json();
          dispatch(setCart(data.items)); // Update Redux store with fetched items
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
    };

    fetchCart();
  }, [session?.user, dispatch]);
  return (
    <AppBar position="fixed">
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
              eShop
            </Typography>
          </Link>
          <Link href="/cart" passHref>
            <IconButton size="large" aria-label="cart" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
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
              eShop
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
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
            {
              !session?.user && (
                <Link href="/signin">
              <IconButton size="small" aria-label="login" color="inherit">
                <LoginIcon />Sign In
              </IconButton>
            </Link>
              )
            }
            {
              session?.user && (
                <Button
                  onClick={() => signOut()}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Sign Out
                </Button>
              )
            }
            
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
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
