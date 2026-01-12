import React from 'react';
import { Box, Container, Typography, useTheme } from '@mui/material';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  py?: number;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const Section: React.FC<SectionProps> = ({
  children,
  title,
  subtitle,
  maxWidth = 'lg',
  py = 6,
  backgroundColor,
  textAlign = 'center',
}) => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        py,
        backgroundColor: backgroundColor || 'transparent',
      }}
    >
      <Container maxWidth={maxWidth}>
        {(title || subtitle) && (
          <Box sx={{ mb: 4, textAlign }}>
            {title && (
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: subtitle ? 2 : 0,
                  color: theme.palette.text.primary,
                }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  fontWeight: 400,
                  maxWidth: 600,
                  mx: textAlign === 'center' ? 'auto' : 0,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        )}
        {children}
      </Container>
    </Box>
  );
};

export default Section;