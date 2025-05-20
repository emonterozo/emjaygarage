'use client';

import React from 'react';
import { Box } from '@mui/material';
import theme from '@/theme/theme';

export default function Banner() {
  return (
    <Box
      id="home"
      sx={{
        height: {
          xs: '100vh',
          sm: '50vh',
          lg: '100vh',
        },
        backgroundImage: {
          xs: 'url("/mobile-banner.png")',
          sm: 'url("/banner.png")',
        },
        backgroundSize: {
          xs: 'contain',
          lg: 'cover',
        },
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.palette.primary.main,
        p: 0,
      }}
    />
  );
}
