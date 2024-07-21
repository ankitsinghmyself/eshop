// components/LoadingSpinner.tsx
import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/system';

const CustomCircularProgress = styled(CircularProgress)({
  color: '#87CEEB', // Light sky color
  width: '80px !important',
  height: '80px !important',
});

const LoadingSpinner: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CustomCircularProgress />
    </Box>
  );
};

export default LoadingSpinner;
