import React from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  useTheme 
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Image from 'next/image';

interface Category {
  title: string;
  imgSrc: string;
  count?: number;
}

const categories: Category[] = [
  { title: 'Electronics', imgSrc: '/images/category-thumb-1.jpg', count: 245 },
  { title: 'Fashion', imgSrc: '/images/category-thumb-2.jpg', count: 189 },
  { title: 'Home & Garden', imgSrc: '/images/category-thumb-3.jpg', count: 156 },
  { title: 'Sports', imgSrc: '/images/category-thumb-4.jpg', count: 98 },
  { title: 'Books', imgSrc: '/images/category-thumb-5.jpg', count: 234 },
  { title: 'Beauty', imgSrc: '/images/category-thumb-6.jpg', count: 167 },
];

const CategorySection: React.FC = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3" component="h2" sx={{ fontWeight: 700 }}>
          Shop by Category
        </Typography>
        <Button 
          variant="outlined" 
          endIcon={<ArrowForward />}
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          View All Categories
        </Button>
      </Box>

      <Grid container spacing={3}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Card
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.shadows[8],
                },
                textAlign: 'center',
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <CardMedia sx={{ position: 'relative', height: 120, overflow: 'hidden' }}>
                <Image
                  src={category.imgSrc}
                  alt={category.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </CardMedia>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {category.title}
                </Typography>
                {category.count && (
                  <Typography variant="body2" color="text.secondary">
                    {category.count} items
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategorySection;