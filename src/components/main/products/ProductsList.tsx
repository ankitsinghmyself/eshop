import React from 'react';
import { Grid, Container, Typography, Box } from '@mui/material';
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            fontWeight: 700, 
            mb: 1,
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          Discover our curated selection of quality products
        </Typography>
      </Box>
      
      <Grid
        container
        spacing={3}
        sx={{
          '& .MuiGrid-item': {
            display: 'flex',
          }
        }}
      >
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard 
              product={product}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          </Grid>
        ))}
      </Grid>
      <SignInModal open={openSignIn} onClose={() => setOpenSignIn(false)} />
    </Container>
  );
};

export default ProductsList;
