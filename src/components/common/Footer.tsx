import React from "react";
import { Box, Typography, Link, Container, Grid, IconButton } from "@mui/material";
import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: 8,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              ShopMate
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your trusted e-commerce platform for quality products at great prices.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" color="primary">
                <GitHub fontSize="small" />
              </IconButton>
              <IconButton size="small" color="primary">
                <LinkedIn fontSize="small" />
              </IconButton>
              <IconButton size="small" color="primary">
                <Twitter fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Shop
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" color="text.secondary" underline="hover">
                Home
              </Link>
              <Link href="/products" color="text.secondary" underline="hover">
                Products
              </Link>
              <Link href="/categories" color="text.secondary" underline="hover">
                Categories
              </Link>
            </Box>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/contact" color="text.secondary" underline="hover">
                Contact
              </Link>
              <Link href="/help" color="text.secondary" underline="hover">
                Help Center
              </Link>
              <Link href="/returns" color="text.secondary" underline="hover">
                Returns
              </Link>
            </Box>
          </Grid>

          {/* Legal */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/privacy" color="text.secondary" underline="hover">
                Privacy Policy
              </Link>
              <Link href="/terms" color="text.secondary" underline="hover">
                Terms of Service
              </Link>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Stay Updated
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Subscribe to our newsletter for the latest deals and updates.
            </Typography>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} ShopMate. All rights reserved.
          </Typography>
          <Link
            href="https://ankitsinghmyself.vercel.app/"
            color="text.secondary"
            underline="hover"
            variant="body2"
          >
            Developed by Ankit Singh
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
