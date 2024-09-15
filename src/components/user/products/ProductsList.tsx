import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from '../cards/ProductCard';
import LoadingSpinner from '../../common/loaders/LoadingSpinner';
import useFetchProducts from '@/hooks/useFetchProducts';

const ProductsList: React.FC = () => {
  const { products, loading, error } = useFetchProducts();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div>No products available</div>;
  }

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
