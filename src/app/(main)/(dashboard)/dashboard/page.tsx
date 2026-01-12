"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Person,
  AdminPanelSettings,
  ShoppingCart,
  Favorite,
  History,
  Settings,
  Notifications,
  Edit,
  Visibility
} from '@mui/icons-material';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Dashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data.');
        router.push('/signin');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Welcome back, {userData?.firstName}!
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage your account and explore our products
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '2rem'
                }}
              >
                {userData?.firstName?.charAt(0)?.toUpperCase()}
              </Avatar>
              <Typography variant="h6" gutterBottom>
                {userData?.firstName} {userData?.lastName || ''}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {userData?.email}
              </Typography>
              <Box sx={{ mt: 2, mb: 2 }}>
                <Chip
                  label={userData?.isAdmin ? 'Administrator' : 'Customer'}
                  color={userData?.isAdmin ? 'primary' : 'default'}
                  icon={userData?.isAdmin ? <AdminPanelSettings /> : <Person />}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                <Tooltip title="View Profile">
                  <IconButton color="primary" size="small">
                    <Visibility />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit Profile">
                  <IconButton color="primary" size="small">
                    <Edit />
                  </IconButton>
                </Tooltip>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ShoppingCart />}
                    onClick={() => router.push('/products')}
                    sx={{ py: 1.5 }}
                  >
                    Browse Products
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ShoppingCart />}
                    onClick={() => router.push('/cart')}
                    sx={{ py: 1.5 }}
                  >
                    View Cart
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<History />}
                    sx={{ py: 1.5 }}
                  >
                    Order History
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Favorite />}
                    sx={{ py: 1.5 }}
                  >
                    Wishlist
                  </Button>
                </Grid>
                {userData?.isAdmin && (
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<AdminPanelSettings />}
                      onClick={() => router.push('/admin')}
                      sx={{ py: 1.5 }}
                    >
                      Admin Dashboard
                    </Button>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <ShoppingCart color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Product viewed"
                  secondary="Wireless Headphones - 2 hours ago"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Favorite color="error" />
                </ListItemIcon>
                <ListItemText
                  primary="Added to wishlist"
                  secondary="Smart Watch - 1 day ago"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Person color="info" />
                </ListItemIcon>
                <ListItemText
                  primary="Profile updated"
                  secondary="Contact information - 3 days ago"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Account Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Account Settings
            </Typography>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Personal Information" />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <Notifications />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Privacy & Security" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
