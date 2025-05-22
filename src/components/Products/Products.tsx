'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Grid, Card, IconButton } from '@mui/material';
import { Product } from '@/types/types';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import { useRouter } from 'next/navigation';

type ProductsProps = {
  products: Product[];
};

export default function Products({ products }: Readonly<ProductsProps>) {
  const theme = useTheme();
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handlePressProduct = (id: string) => {
    router.push(`/products/${id}`);
  };

  const scroll = (direction: string) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300, // Adjust scroll amount
        behavior: 'smooth',
      });
    }
  };

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
            fontFamily: 'Centauri',
          }}
        >
          OTHER UNITS
        </Typography>
        <Typography
          sx={{
            fontSize: {
              xs: '14px',
              md: '20px',
            },
            color: '#D9D9D9',
          }}
        >
          Browse a diverse range of additional vehicles suited for different needs, from utility to
          leisure.
        </Typography>
      </Box>
      <Grid container paddingTop="57px">
        <Grid size={{ xs: 12 }}>
          <Box sx={{ position: 'relative' }}>
            <IconButton
              sx={{
                position: 'absolute',
                left: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
              }}
              onClick={() => scroll('left')}
            >
              <ChevronLeft
                sx={{ width: { xs: '20px', md: '35px' }, height: { xs: '20px', md: '35px' } }}
              />
            </IconButton>
            <Box
              ref={scrollRef}
              sx={{
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                display: 'flex',
                flexDirection: 'row',
                gap: '15px',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}
            >
              {products.map((product, index) => (
                <Card
                  key={product._id}
                  sx={{
                    borderRadius: '24px',
                    height: '332px',
                    minWidth: '310px',
                    flexShrink: 0,
                    position: 'relative',
                    width: {
                      lg: index === 0 ? '639px' : '310px',
                    },
                  }}
                  onClick={() => handlePressProduct(product._id)}
                >
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        position: 'relative',
                        height: '332px',
                        width: '100%',
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}
                    >
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </Box>
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        background: 'rgba(8, 16, 19, 0.5)',
                        padding: '10px',
                        gap: '10px',
                      }}
                    >
                      <Typography color="#FFFFFF" sx={{ fontSize: '12px', fontFamily: 'Centauri' }}>
                        {product.name}
                      </Typography>
                      <Typography color="#CCCBCB" sx={{ fontSize: '12px', fontFamily: 'Centauri' }}>
                        {`₱ ${product.price.toLocaleString()}`}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'rgba(8, 16, 19, 0.9)',
                      padding: '10px',
                      gap: '10px',
                      borderRadius: '100px',
                    }}
                  >
                    <Typography color="#CCCBCB" sx={{ fontSize: '12px', fontFamily: 'Centauri' }}>
                      {product.is_sold ? 'Sold' : 'For Sale'}
                    </Typography>
                  </Box>
                </Card>
              ))}
            </Box>
            <IconButton
              sx={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
              }}
              onClick={() => scroll('right')}
            >
              <ChevronRight
                sx={{ width: { xs: '20px', md: '35px' }, height: { xs: '20px', md: '35px' } }}
              />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
