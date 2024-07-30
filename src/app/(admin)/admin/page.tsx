"use client";
import React, { useState } from 'react';
import { Box, Toolbar } from '@mui/material';
import AdminDashboard from '@/components/admin/adminDashboard/AdminDashboard';
import Sidebar from '@/components/admin/adminSidebar/Sidebar';
import ManageProduct from '@/components/admin/manageProduct/ManageProduct';
import ManageUsers from '@/components/admin/manageUsers/ManageUsers';

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
