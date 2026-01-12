"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AppBar, Box, Button, Toolbar, Typography, Container, Paper } from '@mui/material';
import AdminDashboard from '@/components/admin/adminDashboard/AdminDashboard';
import Sidebar from '@/components/admin/adminSidebar/Sidebar';
import Link from 'next/link';
import { useLogout } from '@/hooks/useLogout';
import { Home, ExitToApp } from '@mui/icons-material';

// Dynamically import components
const ManageProduct = dynamic(() => import('@/components/admin/manageProduct/ManageProduct'));
const ManageUsers = dynamic(() => import('@/components/admin/manageUsers/ManageUsers'));
const OrdersManagement = dynamic(() => import('@/components/admin/orders/OrdersManagement'));
const AnalyticsComponent = dynamic(() => import('@/components/admin/analytics/AnalyticsComponent'));

// Create placeholder components for remaining features
const CategoriesComponent = () => (
  <Container>
    <Typography variant="h4" gutterBottom>Categories Management</Typography>
    <Paper sx={{ p: 3, textAlign: 'center' }}>
      <Typography>Categories management feature coming soon...</Typography>
    </Paper>
  </Container>
);

const SettingsComponent = () => (
  <Container>
    <Typography variant="h4" gutterBottom>Settings</Typography>
    <Paper sx={{ p: 3, textAlign: 'center' }}>
      <Typography>System settings coming soon...</Typography>
    </Paper>
  </Container>
);

export default function AdminPage() {
  const [selectedItem, setSelectedItem] = useState<string>('Dashboard');
  const { handleLogout, loading } = useLogout();

  useEffect(() => {
    const savedItem = localStorage.getItem('selectedAdminPage');
    if (savedItem) {
      setSelectedItem(savedItem);
    }
  }, []);

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    localStorage.setItem('selectedAdminPage', item);
  };

  const renderContent = () => {
    switch (selectedItem) {
      case 'Dashboard':
        return <AdminDashboard />;
      case 'Users':
        return <ManageUsers />;
      case 'ManageProducts':
        return <ManageProduct />;
      case 'Orders':
        return <OrdersManagement />;
      case 'Analytics':
        return <AnalyticsComponent />;
      case 'Categories':
        return <CategoriesComponent />;
      case 'Settings':
        return <SettingsComponent />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f5f5f5' }}>
      <Sidebar onSelect={handleSelectItem} />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Top AppBar */}
        <AppBar 
          position="static" 
          color="default" 
          elevation={1}
          sx={{ 
            bgcolor: 'white',
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {selectedItem === 'ManageProducts' ? 'Manage Products' : selectedItem}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Link href={'/'} style={{ textDecoration: 'none' }}>
                <Button 
                  variant="outlined" 
                  startIcon={<Home />}
                  size="small"
                >
                  Home
                </Button>
              </Link>
              <Button
                variant="contained"
                color="error"
                startIcon={<ExitToApp />}
                onClick={handleLogout}
                disabled={loading}
                size="small"
              >
                {loading ? "Logging out..." : "Logout"}
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        
        {/* Main Content */}
        <Box 
          sx={{ 
            flex: 1, 
            overflow: 'auto',
            bgcolor: '#f8f9fa'
          }}
        >
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
}
