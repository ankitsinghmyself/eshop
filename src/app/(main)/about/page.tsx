import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import { Store, LocalShipping, Security, Support } from '@mui/icons-material';

const features = [
  {
    icon: <Store />,
    title: 'Quality Products',
    description: 'We source only the best products from trusted suppliers worldwide.'
  },
  {
    icon: <LocalShipping />,
    title: 'Fast Delivery',
    description: 'Quick and reliable shipping to get your orders to you on time.'
  },
  {
    icon: <Security />,
    title: 'Secure Shopping',
    description: 'Your personal and payment information is always protected.'
  },
  {
    icon: <Support />,
    title: '24/7 Support',
    description: 'Our customer service team is here to help you anytime.'
  }
];

export default function About() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          About ShopMate
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Your trusted e-commerce platform for quality products at great prices
        </Typography>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
          At ShopMate, we believe shopping should be simple, secure, and enjoyable. 
          Founded with the mission to connect customers with quality products from around the world, 
          we've built a platform that prioritizes your satisfaction and convenience.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
              <CardContent>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {React.cloneElement(feature.icon, { sx: { fontSize: 48 } })}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}