"use client";
import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Toolbar, IconButton, Divider, useMediaQuery } from '@mui/material';
import { Home, People } from '@mui/icons-material';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import Settings from '@mui/icons-material/Settings';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

interface SidebarProps {
  onSelect: (item: string) => void;
}

export default function Sidebar({ onSelect }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detects screen size

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button onClick={() => onSelect('Dashboard')}>
          <ListItemIcon><Home /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => onSelect('Users')}>
          <ListItemIcon><People /></ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button onClick={() => onSelect('ManageProducts')}>
          <ListItemIcon><ShoppingCart /></ListItemIcon>
          <ListItemText primary="Manage Products" />
        </ListItem>
        <ListItem button onClick={() => onSelect('Settings')}>
          <ListItemIcon><Settings /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </>
  );

  return (
    <>
      {/* Icon Button for Mobile */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ ml: 2 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Mobile Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
