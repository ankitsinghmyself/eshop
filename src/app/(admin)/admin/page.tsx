"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import AdminDashboard from '@/components/admin/adminDashboard/AdminDashboard';
import Sidebar from '@/components/admin/adminSidebar/Sidebar';
import Link from 'next/link';
import { useLogout } from '@/hooks/useLogout';

// Dynamically import the components for better performance
const ManageProduct = dynamic(() => import('@/components/admin/manageProduct/ManageProduct'));
const ManageUsers = dynamic(() => import('@/components/admin/manageUsers/ManageUsers'));

export default function AdminPage() {
  const [selectedItem, setSelectedItem] = useState<string>('Dashboard');
  const { handleLogout, loading } = useLogout();
  // Persist the selected item in localStorage
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
      default:
        return <AdminDashboard />;
    }
  };


  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar for Navigation */}
      <Sidebar onSelect={handleSelectItem} />
      
      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 2,
          overflowY: 'auto',
        }}
      >
        <AppBar position="static" color="default" sx={{ padding: '10px', flexDirection: 'row', justifyContent: 'end' }}>
          <Link href={'/'} style={{marginRight:'5px'}}>
            <Button variant='contained' >
              Home
            </Button>
          </Link>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
          >
            {loading ? "Logging out..." : "Logout"}
          </Button>
        </AppBar>
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
}
