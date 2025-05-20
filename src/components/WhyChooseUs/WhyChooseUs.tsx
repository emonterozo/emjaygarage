'use client';

import React from 'react';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { Box, Typography, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ITEMS = [
  {
    icon: <DirectionsCarOutlinedIcon sx={{ width: '60px', height: '60px' }} />,
    title: 'Guaranteed Cars',
    description:
      'We ensure every vehicle meets high-quality standards thorough inspections. Each car comes with complete papers, giving you confidence in your purchase.',
  },
  {
    icon: <TimerOutlinedIcon sx={{ width: '60px', height: '60px' }} />,
    title: 'Quick & Easy Process',
    description:
      'Enjoy a seamless car-buying experience with our hassle-free process. We streamline every step to ensure smooth transactions with minimal wait time.',
  },
  {
    icon: <EmojiEventsOutlinedIcon sx={{ width: '60px', height: '60px' }} />,
    title: 'Satisfied Customers',
    description:
      'Customer satisfaction is our priority, and our track record speaks for itself. With numerous successful deals and positive reviews, we guarantee a great experience every time.',
  },
];

export default function WhyChooseUs() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        paddingY: {
          xs: '40px',
          md: '80px',
        },
        paddingX: {
          xs: '35px',
          md: '70px',
        },
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Typography
          sx={{
            fontSize: {
              xs: '22px',
              md: '40px',
            },
            color: '#D9D9D9',
          }}
        >
          Why Choose Us
        </Typography>
        <Typography
          sx={{
            fontSize: {
              xs: '12px',
              md: '16px',
            },
            color: '#D9D9D9',
          }}
        >
          Your satisfaction drives us forward
        </Typography>
      </Box>
      <Grid container spacing={2} marginTop="57px">
        {ITEMS.map((item) => (
          <Grid key={item.title} size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                paddingX: '12px',
                paddingY: '24px',
                alignItems: 'center',
              }}
            >
              {item.icon}
              <Typography
                sx={{
                  fontSize: {
                    xs: '14px',
                    md: '16px',
                  },
                  textAlign: 'center',
                }}
              >
                {item.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontWeight: 'light',
                  fontSize: {
                    xs: '14px',
                    md: '16px',
                  },
                  textAlign: 'center',
                }}
              >
                {item.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
