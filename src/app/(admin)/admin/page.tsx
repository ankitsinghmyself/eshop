"use client";
import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import AdminDashboard from '@/components/admin/dashboard/AdminDashboard';
import ManageUsers from '@/components/admin/users/ManageUsers';
import Sidebar from '@/components/admin/navigation/Sidebar';
import ManageProduct from '@/components/admin/manageProduct/ManageProduct';

export default function AdminPage() {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  const renderContent = () => {
    switch (selectedItem) {
      case 'Dashboard':
        return <AdminDashboard />;
      case 'Users':
        return <ManageUsers />;
      case 'ManageProducts':
        return <ManageProduct />
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar onSelect={setSelectedItem} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
}
