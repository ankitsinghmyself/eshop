import React from 'react';
import { Box, Typography, Container, useTheme } from '@mui/material';
import { Product } from '@/types/types';
import ProductCard from '@/components/main/cards/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface ProductsSliderProps {
  products: Product[];
}

const ProductsSlider: React.FC<ProductsSliderProps> = ({ products }) => {
  const theme = useTheme();

  const handleAddToCart = async (product: Product) => {
    try {
      const response = await fetch('/api/cart/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      if (!response.ok) throw new Error('Failed to add to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <Box sx={{ py: 6, backgroundColor: theme.palette.background.paper }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 4,
            fontWeight: 700,
            color: theme.palette.text.primary,
          }}
        >
          Featured Products
        </Typography>
        
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          style={{
            paddingBottom: '40px',
          }}
        >
          {products.slice(0, 8).map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default ProductsSlider;