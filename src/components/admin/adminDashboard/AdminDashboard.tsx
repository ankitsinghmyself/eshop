import React, { useEffect, useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
  Inventory,
  Assessment,
  Refresh
} from '@mui/icons-material';
import CircularChart from '@/components/common/charts/CircularChart';
import { getActiveProducts, getTotalProducts } from '@/lib/productService';
import { getUsers } from '@/lib/userService';

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalUsers: number;
  totalRevenue: number;
  lowStockProducts: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    activeProducts: 0,
    totalUsers: 0,
    totalRevenue: 0,
    lowStockProducts: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [totalProducts, activeProducts, users] = await Promise.all([
        getTotalProducts(),
        getActiveProducts(),
        getUsers()
      ]);
      
      setStats({
        totalProducts,
        activeProducts,
        totalUsers: users.length,
        totalRevenue: 25000, // Mock data
        lowStockProducts: Math.floor(totalProducts * 0.1) // Mock: 10% low stock
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const StatCard = ({ title, value, icon, color, subtitle }: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    subtitle?: string;
  }) => (
    <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="h2" fontWeight="bold">
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  const productActiveRate = stats.totalProducts > 0 ? (stats.activeProducts / stats.totalProducts) * 100 : 0;

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Admin Dashboard
        </Typography>
        <Tooltip title="Refresh Data">
          <IconButton onClick={fetchDashboardData} disabled={loading}>
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={<Inventory />}
            color="#1976d2"
            subtitle={`${stats.activeProducts} active`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<People />}
            color="#388e3c"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            icon={<AttachMoney />}
            color="#f57c00"
            subtitle="This month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Low Stock"
            value={stats.lowStockProducts}
            icon={<TrendingUp />}
            color="#d32f2f"
            subtitle="Items need restock"
          />
        </Grid>
      </Grid>

      {/* Charts and Analytics */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Product Status Overview
            </Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularChart activeProducts={stats.activeProducts} totalProducts={stats.totalProducts} />
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Quick Stats
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Box mb={3}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Product Active Rate</Typography>
                  <Typography variant="body2">{productActiveRate.toFixed(1)}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={productActiveRate} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              
              <Box mb={3}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">Inventory Health</Typography>
                  <Typography variant="body2">85%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={85} 
                  color="success"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              
              <Box mb={3}>
                <Typography variant="body2" gutterBottom>
                  System Status
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  <Chip label="Database: Online" color="success" size="small" />
                  <Chip label="API: Healthy" color="success" size="small" />
                  <Chip label="Cache: Active" color="info" size="small" />
                </Box>
              </Box>
              
              <Box>
                <Typography variant="body2" gutterBottom>
                  Recent Activity
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  • 5 new products added today<br/>
                  • 12 orders processed<br/>
                  • 3 users registered
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
