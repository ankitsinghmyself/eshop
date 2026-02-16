import React from 'react';
import { Grid, Box, Typography, Container } from '@mui/material';
import { Product } from '@/types/types';
import ProductCard from '../cards/ProductCard';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/redux/store';
import { useState } from 'react';
import toast from 'react-hot-toast';

import SignInModal from '@/components/auth/SignInModal';

interface ProductsListProps {
  products: Product[];
  title?: string;
}

const ProductsList: React.FC<ProductsListProps> = ({ products, title = "Featured Products" }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openSignIn, setOpenSignIn] = useState(false);

  const handleAddToCart = async (product: Product) => {
    try {
      const response = await fetch('/api/cart/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      if (response.ok) {
        alert(`${product.name} added to cart!`);
      } else {
        const confirm = window.confirm('Please login to add items to cart. Login now?');
        if (confirm) {
          setOpenSignIn(true);
        }
      }
    } catch (error) {
      const confirm = window.confirm('Please login to add items to cart. Go to login page?');
      if (confirm) {
        window.location.href = '/signin';
      }
    }
  };

  const handleToggleFavorite = (productId: string) => {
    // TODO: Implement favorites functionality
    toast.success('Favorites feature coming soon!');
  };

  if (!products || products.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" align="center" color="text.secondary">
          No products available
        </Typography>
      </Container>
    );
  }

  return (
    <Box id="products" className="page-shell" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 900 }}>
        Featured Products
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Handpicked products with modern style and best value.
      </Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        {products.map((product) => (
          <Grid item xs={4} sm={4} md={3} key={product.id}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductsList;
