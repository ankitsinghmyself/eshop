"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Typography, 
  Container, 
  Button, 
  Grid, 
  Box, 
  Card, 
  CardMedia, 
  Rating,
  Chip,
  Divider
} from "@mui/material";
import { ArrowBack, ShoppingCart } from "@mui/icons-material";
import useProductDetails from "@/hooks/useProductDetails";
import LoadingSpinner from "@/components/common/loaders/LoadingSpinner";
import { formatPrice } from "@/utils/priceUtils";

const ProductPage: React.FC = () => {
  const { productId } = useParams();
  const router = useRouter();
  const { product, loading, error } = useProductDetails(productId as string);

  const handleAddToCart = async () => {
    try {
      const response = await fetch('/api/cart/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product?.id, quantity: 1 }),
      });
      
      if (response.ok) {
        alert('Product added to cart!');
      } else {
        const confirm = window.confirm('Please login to add items to cart. Go to login page?');
        if (confirm) {
          window.location.href = '/signin';
        }
      }
    } catch (error) {
      const confirm = window.confirm('Please login to add items to cart. Go to login page?');
      if (confirm) {
        window.location.href = '/signin';
      }
    }
  };

  if (loading) return <LoadingSpinner message="Loading product details..." />;

  if (error || !product) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: "center" }}>
        <Typography variant="h4" color="error" sx={{ mb: 2 }}>
          {error || "Product not found"}
        </Typography>
        <Button
          onClick={() => router.push("/")}
          variant="contained"
          startIcon={<ArrowBack />}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        onClick={() => router.back()}
        startIcon={<ArrowBack />}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ position: 'relative' }}>
            {discountPercentage > 0 && (
              <Chip
                label={`-${discountPercentage}%`}
                color="secondary"
                sx={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  zIndex: 1,
                  fontWeight: 600,
                }}
              />
            )}
            <CardMedia
              component="img"
              height="400"
              image={product.img}
              alt={product.name}
              sx={{ objectFit: 'cover' }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating value={product.rating || 0} readOnly precision={0.1} />
              <Typography variant="body2" color="text.secondary">
                ({product.reviewCount || 0} reviews)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
                {formatPrice(product.price)}
              </Typography>
              {product.originalPrice && product.originalPrice > product.price && (
                <Typography
                  variant="h6"
                  sx={{
                    textDecoration: 'line-through',
                    color: 'text.secondary',
                  }}
                >
                  {formatPrice(product.originalPrice)}
                </Typography>
              )}
            </Box>

            {product.details && (
              <>
                <Divider />
                <Typography variant="body1" color="text.secondary">
                  {product.details}
                </Typography>
              </>
            )}

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                sx={{ flex: 1 }}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;