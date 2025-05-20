'use client';

import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import Image from 'next/image';
import { Product } from '@/types/types';
import { useRouter } from 'next/navigation';

type CatalogProps = {
  products: Product[];
};

export default function Catalog({ products }: Readonly<CatalogProps>) {
  const theme = useTheme();
  const router = useRouter();

  const handlePressProduct = (id: string) => {
    router.push(`/products/${id}`);
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
          Car Catalog
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
          Explore our Cars you might like!
        </Typography>
      </Box>
      <Grid container spacing={2} paddingTop="57px">
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              bgcolor: '#081013',
              borderRadius: '24px',
            }}
            onClick={() => handlePressProduct(products[0]._id)}
          >
            <Box
              sx={{
                position: 'relative',
                height: {
                  xs: 250,
                  lg: 428,
                },
                width: '100%',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Image
                src={products[0].images[0]}
                alt={products[0].name}
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>

            <CardContent>
              <Typography color="#D9D9D9" sx={{ fontSize: '16px' }}>
                {products[0].name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  marginTop: '16px',
                }}
              >
                <Typography
                  color="#CCCBCB"
                  sx={{
                    fontSize: '16px',
                    fontFamily: 'Poppins',
                    fontWeight: 'light',
                  }}
                >
                  {products[0].description}
                </Typography>
                <Typography color="#D9D9D9" sx={{ fontSize: '24px' }}>
                  {`₱ ${products[0].price.toLocaleString()}`}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Grid container spacing={2}>
            {products.slice(1).map((product, index) => (
              <Grid key={product._id} size={{ xs: 12, md: index > 1 ? undefined : 6 }}>
                <Card
                  sx={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    height: index > 1 ? '332px' : '307px',
                    position: 'relative',
                  }}
                  onClick={() => handlePressProduct(product._id)}
                >
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        position: 'relative',
                        height: index > 1 ? '332px' : '307px',
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
                      {product.is_sold ? 'Sold' : 'For Sale'}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
