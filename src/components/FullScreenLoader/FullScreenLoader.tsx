'use client';

import dynamic from 'next/dynamic';
const DynamicLottie = dynamic(() => import('lottie-react'), { ssr: false });
import loadingAnimation from '@/lottie/loading.json';
import { Box, Grid, Typography } from '@mui/material';
import theme from '@/theme/theme';

type FullScreenLoaderProps = {
  message?: string;
};

export default function FullScreenLoader({
  message = 'Loading data, please wait...',
}: Readonly<FullScreenLoaderProps>) {
  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(200, 200, 200, 0.39)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid size={12}>
          <DynamicLottie animationData={loadingAnimation} loop autoplay />
          <Typography
            sx={{
              color: theme.palette.secondary.main,
              fontSize: { xs: '32px', md: '60px' },
              textAlign: 'center',
            }}
          >
            {message}
          </Typography>
        </Grid>
      </Box>
    </Box>
  );
}
