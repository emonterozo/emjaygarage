'use client';

import React from 'react';
import { Box, Grid, Typography, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';

const OPTIONS = [
  {
    title: 'Navigation',
    subContents: [
      {
        title: 'Home',
        path: '/#home',
      },
      {
        title: 'Catalog',
        path: '/#catalog',
      },
      {
        title: 'Contact',
        path: '/#contact',
      },
    ],
  },
  {
    title: 'Support Us',
    subContents: [
      {
        title: 'Facebook',
        path: 'https://www.facebook.com/emjaygarage',
      },
      {
        title: 'Instagram',
        path: 'https://www.instagram.com/emjaygarage',
      },
      {
        title: 'Tiktok',
        path: 'https://www.tiktok.com/@emjaygarage',
      },
    ],
  },
];

export default function Footer() {
  const theme = useTheme();
  const router = useRouter();

  const onClick = (title: string, path: string) => {
    if (title === 'Navigation') {
      router.push(path);
    } else {
      window.open(path, '_blank');
    }
  };

  return (
    <Box
      sx={{
        paddingTop: {
          xs: '40px',
          md: '80px',
        },
        paddingX: {
          xs: '35px',
          md: '70px',
        },
        paddingBottom: '25px',
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: '14px',
                  md: '16px',
                },
                color: '#D9D9D9',
                fontFamily: 'Centauri',
              }}
            >
              Emjay Garage
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 'light',
                fontSize: {
                  xs: '16px',
                  md: '18px',
                },
                color: '#9B9B9B',
              }}
            >
              Discover a wide selection of quality vehicles and enjoy exceptional service at every
              step.
            </Typography>
          </Box>
        </Grid>
        {OPTIONS.map((option) => (
          <Grid key={option.title} size={{ xs: 12, md: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: '14px',
                    md: '16px',
                  },
                  color: '#D9D9D9',
                  fontFamily: 'Centauri',
                }}
              >
                {option.title}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {option.subContents.map((item) => (
                  <Typography
                    key={item.title}
                    sx={{
                      fontSize: {
                        xs: '10px',
                        md: '12px',
                      },
                      color: '#9B9B9B',
                      fontFamily: 'Centauri',
                      cursor: 'pointer',
                      '&:hover': { color: '#FFFFFF' },
                    }}
                    onClick={() => onClick(option.title, item.path)}
                  >
                    {item.title}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ bgcolor: '#D9D9D9', marginY: '24px' }} />
      <Typography
        sx={{
          fontFamily: 'Poppins',
          fontWeight: 'light',
          fontSize: '12px',
          color: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        {`© ${new Date().getFullYear()} Emjay Garage. All rights reserved.`}
      </Typography>
    </Box>
  );
}
