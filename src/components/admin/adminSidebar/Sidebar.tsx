"use client";
import React, { useState, useEffect } from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Toolbar,
  IconButton,
  Divider,
  useMediaQuery,
  Box,
  Typography,
  Avatar,
  Collapse,
  Badge
} from '@mui/material';
import {
  Home,
  People,
  ShoppingCart,
  Settings,
  Assessment,
  Inventory,
  LocalShipping,
  ExpandLess,
  ExpandMore,
  Notifications,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const drawerWidth = 260;

interface SidebarProps {
  onSelect: (item: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  children?: MenuItem[];
}

export default function Sidebar({ onSelect }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems: MenuItem[] = [
    {
      id: 'Dashboard',
      label: 'Dashboard',
      icon: <Home />
    },
    {
      id: 'Users',
      label: 'User Management',
      icon: <People />,
      badge: 3
    },
    {
      id: 'Products',
      label: 'Products',
      icon: <ShoppingCart />,
      children: [
        { id: 'ManageProducts', label: 'Manage Products', icon: <Inventory /> },
        { id: 'Categories', label: 'Categories', icon: <Assessment /> }
      ]
    },
    {
      id: 'Orders',
      label: 'Orders',
      icon: <LocalShipping />,
      badge: 5
    },
    {
      id: 'Analytics',
      label: 'Analytics',
      icon: <Assessment />
    },
    {
      id: 'Settings',
      label: 'Settings',
      icon: <Settings />
    }
  ];

  useEffect(() => {
    const savedItem = localStorage.getItem('selectedAdminPage');
    if (savedItem) {
      setSelectedItem(savedItem);
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.children) {
      const isExpanded = expandedItems.includes(item.id);
      setExpandedItems(prev => 
        isExpanded 
          ? prev.filter(id => id !== item.id)
          : [...prev, item.id]
      );
    } else {
      setSelectedItem(item.id);
      localStorage.setItem('selectedAdminPage', item.id);
      onSelect(item.id);
      if (isMobile) {
        setMobileOpen(false);
      }
    }
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const isSelected = selectedItem === item.id;
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <React.Fragment key={item.id}>
        <ListItemButton
          onClick={() => handleItemClick(item)}
          selected={isSelected}
          sx={{
            pl: 2 + depth * 2,
            borderRadius: 1,
            mx: 1,
            mb: 0.5,
            '&.Mui-selected': {
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
              '& .MuiListItemIcon-root': {
                color: 'white',
              }
            }
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            {item.badge ? (
              <Badge badgeContent={item.badge} color="error">
                {item.icon}
              </Badge>
            ) : (
              item.icon
            )}
          </ListItemIcon>
          <ListItemText 
            primary={item.label} 
            primaryTypographyProps={{
              fontSize: '0.9rem',
              fontWeight: isSelected ? 600 : 400
            }}
          />
          {hasChildren && (
            isExpanded ? <ExpandLess /> : <ExpandMore />
          )}
        </ListItemButton>
        
        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children!.map(child => renderMenuItem(child, depth + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar 
            sx={{ 
              bgcolor: theme.palette.primary.main,
              width: 40,
              height: 40
            }}
          >
            A
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              Admin Panel
            </Typography>
            <Typography variant="caption" color="textSecondary">
              eShop Management
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: 'auto', py: 1 }}>
        <List>
          {menuItems.map(item => renderMenuItem(item))}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box display="flex" alignItems="center" gap={1}>
          <Notifications fontSize="small" color="action" />
          <Typography variant="caption" color="textSecondary">
            System Status: Online
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ 
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: theme.zIndex.drawer + 1,
            bgcolor: 'background.paper',
            boxShadow: 2
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Drawer */}
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
            borderRight: 1,
            borderColor: 'divider'
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
