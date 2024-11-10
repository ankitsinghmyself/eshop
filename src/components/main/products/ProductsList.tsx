import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from '../main/cards/ProductCard';
import { Product } from '@/types/types';

interface ProductsListProps {
  products: Product[]; 
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      direction="row"
      justifyContent="start"
      alignItems="center"
    >
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={3} key={product.id}>
          <ProductCard {...product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductsList;
