import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, TextField, Button } from '@mui/material';
import { Email, Phone, LocationOn, AccessTime } from '@mui/icons-material';

const contactInfo = [
  {
    icon: <Email />,
    title: 'Email',
    details: 'support@shopmate.com',
    subtitle: 'Send us an email anytime'
  },
  {
    icon: <Phone />,
    title: 'Phone',
    details: '+1 (555) 123-4567',
    subtitle: 'Mon-Fri from 8am to 5pm'
  },
  {
    icon: <LocationOn />,
    title: 'Address',
    details: '123 Commerce Street, Business District',
    subtitle: 'New York, NY 10001'
  },
  {
    icon: <AccessTime />,
    title: 'Business Hours',
    details: 'Monday - Friday: 9am - 6pm',
    subtitle: 'Saturday: 10am - 4pm'
  }
];

export default function Contact() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          Contact Us
        </Typography>
        <Typography variant="h6" color="text.secondary">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Send us a message
            </Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="First Name" required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Last Name" required />
                </Grid>
              </Grid>
              <TextField fullWidth label="Email" type="email" required />
              <TextField fullWidth label="Subject" required />
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={4}
                required
              />
              <Button variant="contained" size="large" sx={{ alignSelf: 'flex-start' }}>
                Send Message
              </Button>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {contactInfo.map((info, index) => (
              <Card key={index} sx={{ p: 2 }}>
                <CardContent sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box sx={{ color: 'primary.main', mt: 0.5 }}>
                    {info.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {info.title}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {info.details}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {info.subtitle}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}