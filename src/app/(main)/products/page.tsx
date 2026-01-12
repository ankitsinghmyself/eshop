"use client";

import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import useFetchProducts from '@/hooks/useFetchProducts';
import LoadingSpinner from '@/components/common/loaders/LoadingSpinner';
import ProductsList from '@/components/main/products/ProductsList';

export default function Products() {
  const { products, loading, error } = useFetchProducts();

  if (loading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h4" color="error" sx={{ mb: 2 }}>
          Error loading products
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
          All Products
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Discover our complete collection of quality products
        </Typography>
      </Box>
      
      <ProductsList products={products} title="" />
    </Container>
  );
}