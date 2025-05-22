'use client';

import React from 'react';
import Image from 'next/image';
import { Grid, Card, Box, Typography, useTheme, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

import { Product } from '@/types/types';
import { AppBar } from '..';

type AdminProductsProps = {
  products: Product[];
};

export default function AdminProducts({ products }: Readonly<AdminProductsProps>) {
  const theme = useTheme();
  const router = useRouter();

  const handlePressProduct = (id: string) => {
    router.push(`/admin/products/${id}/`);
  };

  const handlePressAdd = () => {
    router.push(`/admin/add`);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        minHeight: '100vh',
      }}
    >
      <AppBar />
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
        }}
      >
        <Box id="catalog" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
            Unit Listings
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
            Seamlessly manage unit visibility and keep all details accurate and up to date.
          </Typography>
        </Box>
        <Grid container spacing={3} paddingTop="57px">
          {products.map((product) => (
            <Grid key={product._id} size={{ xs: 12, md: 4 }}>
              <Card
                key={product._id}
                sx={{
                  borderRadius: '24px',
                  position: 'relative',
                }}
                onClick={() => handlePressProduct(product._id)}
              >
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
                    {product.is_active ? (product.is_sold ? 'Sold' : 'For Sale') : 'Not Published'}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Fab
        variant="extended"
        color="secondary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handlePressAdd}
      >
        <AddIcon sx={{ mr: 1 }} />
        Add Unit
      </Fab>
    </Box>
  );
}
