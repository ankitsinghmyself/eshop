import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Image from 'next/image'; // Import Next.js Image component
import styles from './CategorySection.module.css'; // CSS module for custom styling

// Define the category type
interface Category {
  title: string;
  imgSrc: string;
}

// Sample category data
const categories: Category[] = [
  { title: 'Fruits & Veges', imgSrc: '/images/category-thumb-1.jpg' },
  { title: 'Breads & Sweets', imgSrc: '/images/category-thumb-2.jpg' },
  { title: 'Beverages', imgSrc: '/images/category-thumb-4.jpg' },
  { title: 'Meat Products', imgSrc: '/images/category-thumb-5.jpg' },
  { title: 'Breads', imgSrc: '/images/category-thumb-6.jpg' },
  { title: 'Fruits & Veges', imgSrc: '/images/category-thumb-7.jpg' },
  { title: 'Breads & Sweets', imgSrc: '/images/category-thumb-8.jpg' },
  { title: 'Breads & Sweets', imgSrc: '/images/category-thumb-8.jpg' },
  { title: 'Breads & Sweets', imgSrc: '/images/category-thumb-8.jpg' },
  { title: 'Breads & Sweets', imgSrc: '/images/category-thumb-8.jpg' },
  { title: 'Breads & Sweets', imgSrc: '/images/category-thumb-8.jpg' },
];

const CategorySection: React.FC = () => {
  return (
    <Box py={5} className={styles.overflowHidden}>
      <Container maxWidth="xl">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
          <Typography variant="h4" component="h2">
            Category
          </Typography>

          <Box display="flex" alignItems="center">
            <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
              View All
            </Button>
            <Box>
              <Button className={styles.btnYellow}>&#x276E;</Button>
              <Button className={styles.btnYellow}>&#x276F;</Button>
            </Box>
          </Box>
        </Box>

        {/* Scrollable Categories */}
        <Box className={styles.scrollableCategories}>
          {categories.map((category, index) => (
            <Box key={index} className={styles.categoryItem}>
              <Image
                src={category.imgSrc} // Corrected the image path
                alt={`${category.title} Thumbnail`}
                width={150} // Specify width
                height={150} // Specify height
                className={styles.roundedImage} // Optional styling for the image
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
