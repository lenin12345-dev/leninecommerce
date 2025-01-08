import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';

const ProductPageSkeleton = () => {
  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      {/* Skeleton for Product Image */}
      <Skeleton 
        variant="rectangular" 
        width="100%" 
        height={300} 
        animation="wave" 
        sx={{ borderRadius: 2, mb: 2 }} 
      />

      {/* Skeleton for Product Title */}
      <Skeleton 
        variant="text" 
        width="60%" 
        height={40} 
        animation="wave" 
        sx={{ mb: 1 }} 
      />

      {/* Skeleton for Product Price */}
      <Skeleton 
        variant="text" 
        width="40%" 
        height={30} 
        animation="wave" 
        sx={{ mb: 2 }} 
      />

      {/* Skeleton for Product Description */}
      <Skeleton 
        variant="text" 
        width="100%" 
        height={20} 
        animation="wave" 
        sx={{ mb: 1 }} 
      />
      <Skeleton 
        variant="text" 
        width="90%" 
        height={20} 
        animation="wave" 
        sx={{ mb: 1 }} 
      />
      <Skeleton 
        variant="text" 
        width="80%" 
        height={20} 
        animation="wave" 
        sx={{ mb: 2 }} 
      />

      {/* Skeleton for Add to Cart Button */}
      <Skeleton 
        variant="rectangular" 
        width="40%" 
        height={50} 
        animation="wave" 
        sx={{ borderRadius: 2 }} 
      />
    </Box>
  );
};

export default ProductPageSkeleton;
