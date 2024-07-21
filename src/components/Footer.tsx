import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
      color={(theme) => (theme.palette.mode === 'light' ? 'black' : 'white')}
    >
      <Typography variant="body1" align="center">
        © {new Date().getFullYear()} eshop. All rights reserved.
      </Typography>
      <Box sx={{ textAlign: 'center', mt: 1 }}>
        <Link href="/privacy-policy" color="inherit" sx={{ mx: 1 }}>
          Privacy Policy
        </Link>
        <Link href="/terms-of-service" color="inherit" sx={{ mx: 1 }}>
          Terms of Service
        </Link>
        <Link href="/contact" color="inherit" sx={{ mx: 1 }}>
          Contact
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
