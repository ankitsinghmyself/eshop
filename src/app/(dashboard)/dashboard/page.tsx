"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Button } from '@mui/material';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add your token here if needed
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
        router.push('/signin'); // Redirect to sign-in if fetching user data fails
      }
    };

    fetchUserData();
  }, [router]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      {userData ? (
        <Box sx={{ width: '100%', maxWidth: 600 }}>
          <Typography variant="h6">Welcome, {userData.name}!</Typography>
          <Typography variant="body1">Email: {userData.email}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // Add functionality for any additional actions here
            }}
            sx={{ mt: 2 }}
          >
            Do Something
          </Button>
          {
            // if user is Admin
            userData.isAdmin === true && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  router.push('/admin');
                }}
                sx={{ mt: 2 }}
              >
                Admin Dashboard
              </Button>
            )
          }
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
}
