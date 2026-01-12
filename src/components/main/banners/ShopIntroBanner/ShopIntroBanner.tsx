import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ShoppingBag, ArrowForward } from "@mui/icons-material";
import Link from "next/link";

type ShopIntroBannerProps = {
  onShopNowClick?: () => void;
};

const ShopIntroBanner: React.FC<ShopIntroBannerProps> = ({ onShopNowClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.primary.main}10 0%, ${theme.palette.secondary.main}10 100%)`,
        py: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("/images/banner-pattern.svg") no-repeat center center',
          backgroundSize: 'cover',
          opacity: 0.05,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  mb: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1,
                }}
              >
                Welcome to ShopMate
              </Typography>
              
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{
                  mb: 3,
                  fontWeight: 400,
                  lineHeight: 1.4,
                }}
              >
                Discover quality products that fit your lifestyle.
              </Typography>
              
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 4,
                  fontSize: '1.1rem',
                  maxWidth: '500px',
                  mx: { xs: 'auto', md: 0 },
                }}
              >
                Shop smart, live better. Find everything you need with our curated selection of premium products at unbeatable prices.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingBag />}
                  endIcon={<ArrowForward />}
                  onClick={onShopNowClick}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    textTransform: 'none',
                    boxShadow: theme.shadows[4],
                    '&:hover': {
                      boxShadow: theme.shadows[8],
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Shop Now
                </Button>
                
                <Link href="/about" passHref>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: 3,
                      textTransform: 'none',
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Learn More
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
                alt="Shopping Experience"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: theme.shadows[12],
                  transform: { md: 'rotate(2deg)' },
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: { md: 'rotate(0deg) scale(1.02)' },
                  },
                }}
              />
              
              {/* Decorative elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  right: -20,
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: `linear-gradient(45deg, ${theme.palette.secondary.main}20, ${theme.palette.primary.main}20)`,
                  zIndex: -1,
                  display: { xs: 'none', md: 'block' },
                }}
              />
              
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -30,
                  left: -30,
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}15, ${theme.palette.secondary.main}15)`,
                  zIndex: -1,
                  display: { xs: 'none', md: 'block' },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ShopIntroBanner;
