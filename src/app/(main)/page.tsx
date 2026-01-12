"use client";

import IntroBanner from "./banner/IntroBanner";
import useFetchProducts from "@/hooks/useFetchProducts";
import LoadingSpinner from "@/components/common/loaders/LoadingSpinner";
import CategorySection from "@/components/main/CategorySection/CategorySection";
import ProductsList from "@/components/main/products/ProductsList";
import ShopIntroBanner from "@/components/main/banners/ShopIntroBanner";
import Section from "@/components/ui/Section";
import { Box, Typography, Button, Grid, Card, CardContent, useTheme } from "@mui/material";
import { TrendingUp, LocalShipping, Security, Support } from "@mui/icons-material";

const features = [
  {
    icon: <TrendingUp />,
    title: "Trending Products",
    description: "Discover the latest trends and popular items"
  },
  {
    icon: <LocalShipping />,
    title: "Free Shipping",
    description: "Free delivery on orders over $50"
  },
  {
    icon: <Security />,
    title: "Secure Payment",
    description: "Your payment information is safe with us"
  },
  {
    icon: <Support />,
    title: "24/7 Support",
    description: "Get help whenever you need it"
  }
];

export default function Home() {
  const { products, loading, error } = useFetchProducts();
  const theme = useTheme();

  const handleShopNow = () => {
    const productsSection = document.getElementById('products-section');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return <LoadingSpinner message="Loading amazing products..." />;
  }

  if (error) {
    return (
      <Section title="Oops! Something went wrong" py={8}>
        <Typography variant="body1" color="error" align="center">
          {error}
        </Typography>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Box>
      </Section>
    );
  }

  if (products.length === 0) {
    return (
      <Section title="No products available" subtitle="Check back soon for new arrivals!" py={8} />
    );
  }

  return (
    <>
      {/* Hero Banner */}
      <ShopIntroBanner onShopNowClick={handleShopNow} />
      
      {/* Features Section */}
      <Section 
        title="Why Choose ShopMate?"
        subtitle="We're committed to providing you with the best shopping experience"
        backgroundColor={theme.palette.background.paper}
      >
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  textAlign: 'center',
                  p: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  '&:hover': {
                    boxShadow: theme.shadows[4],
                    transform: 'translateY(-4px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent>
                  <Box 
                    sx={{ 
                      color: theme.palette.primary.main, 
                      mb: 2,
                      '& svg': { fontSize: 40 }
                    }}
                  >
                    {feature.icon}
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
      </Section>

      {/* Intro Banner */}
      <IntroBanner products={products} />
      
      {/* Products Section */}
      <Box id="products-section">
        <ProductsList products={products} title="Featured Products" />
      </Box>
      
      {/* Categories Section */}
      <Section backgroundColor={theme.palette.background.paper}>
        <CategorySection />
      </Section>
    </>
  );
}
