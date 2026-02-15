"use client";
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
  Avatar,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  ShoppingCart,
  AttachMoney,
  Visibility,
  Refresh
} from '@mui/icons-material';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
  ArcElement
);

const AnalyticsComponent: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API calls
  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sales',
        data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const productCategoryData = {
    labels: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'],
    datasets: [
      {
        data: [35, 25, 15, 15, 10],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  const monthlyRevenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [15000, 18000, 22000, 25000, 28000, 32000],
        backgroundColor: 'rgba(76, 175, 80, 0.8)',
        borderColor: '#4caf50',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon, 
    color, 
    isPositive 
  }: {
    title: string;
    value: string;
    change: string;
    icon: React.ReactNode;
    color: string;
    isPositive: boolean;
  }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="textSecondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="h2" fontWeight="bold">
              {value}
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              {isPositive ? (
                <TrendingUp color="success" fontSize="small" />
              ) : (
                <TrendingDown color="error" fontSize="small" />
              )}
              <Typography 
                variant="body2" 
                color={isPositive ? 'success.main' : 'error.main'}
                sx={{ ml: 0.5 }}
              >
                {change}
              </Typography>
            </Box>
          </Box>
          <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
            {icon}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Analytics Dashboard
        </Typography>
        <Box display="flex" gap={2} alignItems="center">
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="7d">Last 7 days</MenuItem>
              <MenuItem value="30d">Last 30 days</MenuItem>
              <MenuItem value="90d">Last 3 months</MenuItem>
              <MenuItem value="1y">Last year</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="Refresh Data">
            <IconButton onClick={() => setLoading(!loading)} disabled={loading}>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Key Metrics */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value="$45,230"
            change="+12.5%"
            icon={<AttachMoney />}
            color="#4caf50"
            isPositive={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value="1,234"
            change="+8.2%"
            icon={<ShoppingCart />}
            color="#2196f3"
            isPositive={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="New Customers"
            value="89"
            change="-2.1%"
            icon={<People />}
            color="#ff9800"
            isPositive={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Page Views"
            value="12,543"
            change="+15.3%"
            icon={<Visibility />}
            color="#9c27b0"
            isPositive={true}
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Sales Trend */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Sales Trend
            </Typography>
            <Box sx={{ height: 300 }}>
              <Line data={salesData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        {/* Product Categories */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Product Categories
            </Typography>
            <Box sx={{ height: 300 }}>
              <Pie data={productCategoryData} options={pieOptions} />
            </Box>
          </Paper>
        </Grid>

        {/* Monthly Revenue */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Monthly Revenue
            </Typography>
            <Box sx={{ height: 300 }}>
              <Bar data={monthlyRevenueData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        {/* Top Performing Products */}
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Top Performing Products
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { name: 'Wireless Headphones', sales: 245, revenue: '$12,250' },
                { name: 'Smart Watch', sales: 189, revenue: '$9,450' },
                { name: 'Laptop Stand', sales: 156, revenue: '$7,800' },
                { name: 'USB-C Cable', sales: 134, revenue: '$2,680' },
                { name: 'Phone Case', sales: 98, revenue: '$1,960' },
              ].map((product, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  py={1}
                  borderBottom={index < 4 ? 1 : 0}
                  borderColor="divider"
                >
                  <Box>
                    <Typography variant="subtitle2">{product.name}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {product.sales} sales
                    </Typography>
                  </Box>
                  <Chip
                    label={product.revenue}
                    color="primary"
                    size="small"
                    variant="outlined"
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Box sx={{ mt: 2 }}>
              {[
                { action: 'New order placed', user: 'John Doe', time: '2 minutes ago', type: 'order' },
                { action: 'Product updated', user: 'Admin', time: '15 minutes ago', type: 'product' },
                { action: 'New user registered', user: 'Jane Smith', time: '1 hour ago', type: 'user' },
                { action: 'Payment received', user: 'Bob Johnson', time: '2 hours ago', type: 'payment' },
              ].map((activity, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  py={2}
                  borderBottom={index < 3 ? 1 : 0}
                  borderColor="divider"
                >
                  <Avatar
                    sx={{
                      bgcolor: activity.type === 'order' ? 'primary.main' :
                               activity.type === 'product' ? 'success.main' :
                               activity.type === 'user' ? 'info.main' : 'warning.main',
                      width: 40,
                      height: 40,
                      mr: 2
                    }}
                  >
                    {activity.type === 'order' ? <ShoppingCart /> :
                     activity.type === 'product' ? <Visibility /> :
                     activity.type === 'user' ? <People /> : <AttachMoney />}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="subtitle2">{activity.action}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      by {activity.user}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="textSecondary">
                    {activity.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AnalyticsComponent;