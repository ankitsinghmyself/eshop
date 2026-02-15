import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import { Product } from '@/types/types';
import ProductCard from '../cards/ProductCard';

interface ProductsListProps {
  products: Product[]; 
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
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
