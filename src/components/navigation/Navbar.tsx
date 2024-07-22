import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';

const pages = ['Home', 'About', 'Services', 'Contact'];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'space-between', width: '100%' }}>
          <IconButton
            size="large"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, textAlign: 'center' }}
          >
            LOGO
          </Typography>
          <IconButton
            size="large"
            aria-label="cart"
            color="inherit"
          >
            <ShoppingCartIcon />
          </IconButton>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            LOGO
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleDrawerClose}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            <IconButton
              size="large"
              aria-label="cart"
              color="inherit"
            >
              <ShoppingCartIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="login"
              color="inherit"
            >
              <LoginIcon />
            </IconButton>
          </Box>
        </Box>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerClose}
          PaperProps={{
            sx: {
              width: '80%',
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
                <ListItem button key={page}>
                  <ListItemText primary={page} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
