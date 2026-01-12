import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  Chip,
  Rating,
  useTheme,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  FavoriteBorder as FavoriteIcon,
  Favorite as FavoriteFilledIcon,
} from '@mui/icons-material';
import { Product } from '@/types/types';
import { formatPrice } from '@/utils/priceUtils';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
}) => {
  const theme = useTheme();
  
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(product.id);
  };

  return (
    <Link href={`/product/${product.id}`} passHref>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: theme.shadows[8],
          },
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {discountPercentage > 0 && (
          <Chip
            label={`-${discountPercentage}%`}
            color="secondary"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              zIndex: 1,
              fontWeight: 600,
              fontSize: '12px',
            }}
          />
        )}

        <IconButton
          onClick={handleToggleFavorite}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
            },
          }}
          size="small"
        >
          {isFavorite ? (
            <FavoriteFilledIcon color="error" fontSize="small" />
          ) : (
            <FavoriteIcon fontSize="small" />
          )}
        </IconButton>

        <CardMedia
          component="img"
          height="200"
          image={product.img || '/images/placeholder-product.jpg'}
          alt={product.name}
          sx={{
            objectFit: 'cover',
            backgroundColor: theme.palette.grey[100],
          }}
        />

        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}
          >
            {product.code || 'N/A'}
          </Typography>

          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              fontSize: '1rem',
              lineHeight: 1.3,
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.6em',
            }}
          >
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating
              value={product.rating || 0}
              readOnly
              size="small"
              precision={0.1}
            />
            <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
              ({product.reviewCount || 0})
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography
              variant="h6"
              component="span"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
              }}
            >
              {formatPrice(product.price)}
            </Typography>
            {product.originalPrice && product.originalPrice > product.price && (
              <Typography
                variant="body2"
                component="span"
                sx={{
                  textDecoration: 'line-through',
                  color: theme.palette.text.secondary,
                }}
              >
                {formatPrice(product.originalPrice)}
              </Typography>
            )}
          </Box>

          <Button
            variant="contained"
            fullWidth
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              py: 1,
            }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;