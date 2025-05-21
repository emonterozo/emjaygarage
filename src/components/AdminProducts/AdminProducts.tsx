'use client';

import React from 'react';
import Image from 'next/image';
import { Grid, Card, Box, Typography, useTheme, Fab, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

import { Product } from '@/types/types';

type AdminProductsProps = {
  products: Product[];
};

const NEXT_PUBLIC_ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY;

export default function AdminProducts({ products }: Readonly<AdminProductsProps>) {
  const theme = useTheme();
  const router = useRouter();

  const handlePressProduct = (id: string) => {
    router.push(`/admin/products/${id}/${NEXT_PUBLIC_ADMIN_KEY}`);
  };

  const handlePressAdd = () => {
    router.push(`/admin/add/${NEXT_PUBLIC_ADMIN_KEY}`);
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        paddingY: {
          xs: '40px',
          md: '80px',
        },
        paddingX: {
          xs: '35px',
          md: '70px',
        },
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
          }}
        >
          View Dashboard
        </Button>
      </Box>
      <Box id="catalog" sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Typography
          sx={{
            fontSize: {
              xs: '22px',
              md: '40px',
            },
            color: '#D9D9D9',
          }}
        >
          Unit Listings
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
          Manage the visibility and details of each unit
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
                <Typography color="#FFFFFF" sx={{ fontSize: '12px' }}>
                  {product.name}
                </Typography>
                <Typography color="#CCCBCB" sx={{ fontSize: '12px' }}>
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
                <Typography color="#CCCBCB" sx={{ fontSize: '12px' }}>
                  {product.is_active ? (product.is_sold ? 'Sold' : 'For Sale') : 'Not Published'}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
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
