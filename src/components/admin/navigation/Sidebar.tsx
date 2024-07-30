"use client";
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer, Toolbar } from '@mui/material';
import { Home, People, Settings } from '@mui/icons-material';
import ShoppingCart from '@mui/icons-material/ShoppingCart';

const drawerWidth = 240;

interface SidebarProps {
  onSelect: (item: string) => void;
}

export default function Sidebar({ onSelect }: SidebarProps) {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
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
          <ListItemIcon><ShoppingCart  /></ListItemIcon>
          <ListItemText primary="Manage Products" />
        </ListItem>
      </List>
    </Drawer>
  );
}
