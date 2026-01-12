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
  Container,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  ShoppingCart,
  AccountCircle,
  Search,
  Storefront,
  Close,
} from "@mui/icons-material";
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
];

const ResponsiveNavbar: React.FC<Props> = ({ darkMode, setDarkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
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
    <Box sx={{ width: 280, height: "100%" }}>
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Menu
          </Typography>
          <IconButton onClick={toggleDrawer(false)} size="small">
            <Close />
          </IconButton>
        </Box>
      </Box>
      
      <List sx={{ px: 1 }}>
        {pages.map((page) => (
          <Link key={page.name} href={page.href} passHref>
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={toggleDrawer(false)}
                sx={{
                  borderRadius: 2,
                  backgroundColor: pathname === page.href ? theme.palette.action.selected : 'transparent',
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  }
                }}
              >
                <ListItemText 
                  primary={page.name} 
                  primaryTypographyProps={{
                    fontWeight: pathname === page.href ? 600 : 400
                  }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <IconButton onClick={toggleTheme} size="small">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Typography variant="body2">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </Typography>
        </Box>
        
        <Link href="/cart">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Badge badgeContent={cartItems.length} color="secondary">
              <ShoppingCart />
            </Badge>
            <Typography variant="body2">Cart ({cartItems.length})</Typography>
          </Box>
        </Link>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}>
        <Container maxWidth="xl" sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Toolbar sx={{ justifyContent: "space-between", py: { xs: 0.5, md: 1 } }}>
            {/* Logo */}
            <Link href="/">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Storefront sx={{ fontSize: { xs: 24, md: 28 }, color: theme.palette.primary.main }} />
                <Typography
                  variant={isMobile ? "h6" : "h5"}
                  component="div"
                  sx={{ 
                    fontWeight: 700, 
                    cursor: "pointer",
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  ShopMate
                </Typography>
              </Box>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 0.5 }}>
                {pages.map((page) => (
                  <Link key={page.name} href={page.href}>
                    <Button
                      color="inherit"
                      sx={{
                        textTransform: "none",
                        fontWeight: pathname === page.href ? 600 : 500,
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        backgroundColor: pathname === page.href ? theme.palette.action.selected : 'transparent',
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        }
                      }}
                    >
                      {page.name}
                    </Button>
                  </Link>
                ))}
              </Box>
            )}

            {/* Right Controls */}
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, md: 1 } }}>
              {/* Search (desktop only) */}
              {!isMobile && (
                <Box sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      px: 2,
                      py: 0.75,
                      borderRadius: 2,
                      backgroundColor: theme.palette.action.hover,
                      border: `1px solid ${theme.palette.divider}`,
                      minWidth: 200,
                      maxWidth: 300,
                    }}
                  >
                    <Search fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />
                    <InputBase 
                      placeholder="Search products…" 
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        handleSearch(e.target.value);
                      }}
                      sx={{ 
                        flex: 1,
                        fontSize: '14px',
                        '& input::placeholder': {
                          color: theme.palette.text.secondary,
                          opacity: 1,
                        }
                      }} 
                    />
                  </Box>
                  
                  {showSearchResults && searchResults.length > 0 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                        mt: 1,
                        maxHeight: 300,
                        overflow: 'auto',
                        zIndex: 1000,
                        boxShadow: theme.shadows[4],
                      }}
                    >
                      {searchResults.slice(0, 5).map((product: any) => (
                        <Box
                          key={product.id}
                          onClick={() => {
                            window.location.href = `/product/${product.id}`;
                            setShowSearchResults(false);
                            setSearchQuery('');
                          }}
                          sx={{
                            p: 2,
                            cursor: 'pointer',
                            '&:hover': {
                              backgroundColor: theme.palette.action.hover,
                            },
                            borderBottom: `1px solid ${theme.palette.divider}`,
                          }}
                        >
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {product.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ${product.price}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              )}

              {/* Theme Toggle (desktop only) */}
              {!isMobile && (
                <IconButton 
                  color="inherit" 
                  onClick={toggleTheme}
                  sx={{
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    }
                  }}
                >
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              )}

              {/* Cart */}
              <Link href="/cart">
                <IconButton 
                  color="inherit"
                  onClick={(e) => {
                    e.preventDefault();
                    fetch('/api/check-auth')
                      .then(res => {
                        if (res.ok) {
                          window.location.href = '/cart';
                        } else {
                          const confirm = window.confirm('Please login to view cart. Go to login page?');
                          if (confirm) {
                            window.location.href = '/signin';
                          }
                        }
                      })
                      .catch(() => {
                        const confirm = window.confirm('Please login to view cart. Go to login page?');
                        if (confirm) {
                          window.location.href = '/signin';
                        }
                      });
                  }}
                  sx={{
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    }
                  }}
                >
                  <Badge 
                    badgeContent={cartItems.length} 
                    color="secondary"
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '11px',
                        minWidth: '18px',
                        height: '18px',
                      }
                    }}
                  >
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </Link>

              {/* Profile/Login (desktop only) */}
              {!isMobile && (
                <>
                  <IconButton 
                    color="inherit" 
                    onClick={handleMenuOpen}
                    sx={{
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      }
                    }}
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      sx: {
                        borderRadius: 2,
                        mt: 1,
                        minWidth: 180,
                      }
                    }}
                  >
                    {isAuthenticated ? (
                      <>
                        <MenuItem disabled sx={{ fontWeight: 500 }}>
                          Hi, {userData?.name || "User"}
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </>
                    ) : (
                      <MenuItem onClick={() => setOpenSignIn(true)}>Login</MenuItem>
                    )}
                  </Menu>
                </>
              )}

              {/* Mobile Menu */}
              {isMobile && (
                <IconButton 
                  color="inherit" 
                  onClick={toggleDrawer(true)}
                  sx={{
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    }
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>

        {/* Mobile Drawer */}
        <Drawer 
          anchor="right" 
          open={drawerOpen} 
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
            }
          }}
        >
          {drawerList}
        </Drawer>
      </AppBar>
      
      <SignInModal open={openSignIn} onClose={() => setOpenSignIn(false)} />
    </>
  );
};

export default ResponsiveNavbar;
