import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Image from 'next/image';
import styles from './CategorySection.module.css';
import PrimaryButton from '@/components/common/buttons/PrimaryButton';

// Define the category type
interface Category {
  title: string;
  imgSrc: string;
  count?: number;
}

const categories: Category[] = [
  { title: 'Fresh Fruits', imgSrc: '/images/category-thumb-1.jpg' },
  { title: 'Bakery', imgSrc: '/images/category-thumb-2.jpg' },
  { title: 'Seafood', imgSrc: '/images/category-thumb-3.jpg' },
  { title: 'Beverages', imgSrc: '/images/category-thumb-4.jpg' },
  { title: 'Meat', imgSrc: '/images/category-thumb-5.jpg' },
  { title: 'Dairy', imgSrc: '/images/category-thumb-6.jpg' },
  { title: 'Seasonal Picks', imgSrc: '/images/category-thumb-7.jpg' },
  { title: 'Snacks', imgSrc: '/images/category-thumb-8.jpg' },
];

const CategorySection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box py={5} className={styles.overflowHidden}>
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" component="h2">
            Categories
          </Typography>

          <Box display="flex" alignItems="center">
            <PrimaryButton sx={{ marginRight: 2 }}>
              View All
            </PrimaryButton>
            <Box>
              <Button className={styles.navButton}>&#x276E;</Button>
              <Button className={styles.navButton} sx={{ ml: 1 }}>&#x276F;</Button>
            </Box>
          </Box>
        </Box>

        <Box className={styles.scrollableCategories}>
          {categories.map((category, index) => (
            <Box key={index} className={styles.categoryItem}>
              <Image
                src={category.imgSrc}
                alt={`${category.title} Thumbnail`}
                width={150}
                height={150}
                className={styles.roundedImage}
              />
              <Typography variant="h6" component="h4" mt={3} className={styles.categoryTitle}>
                {category.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CategorySection;