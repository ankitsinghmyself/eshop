"use client";

import { useCallback } from "react";
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
  const theme = useTheme();
  const { products, loading, error } = useFetchProducts();
  const handleShopNow = useCallback(() => {
    const section = document.getElementById("products");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

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
      <Section title="No products available" subtitle="Check back soon for new arrivals!" py={8}>
        <Box />
      </Section>
    );
  }

  return (
    <>
      <ShopIntroBanner onShopNowClick={handleShopNow} />
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
