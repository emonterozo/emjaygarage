'use client';

import React from 'react';
import { Box, Divider, Fab, List, ListItem, Typography, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';

import Product, { ProductProps } from '../Product/Product';
const NEXT_PUBLIC_ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY;

export default function AdminProduct({ product }: Readonly<ProductProps>) {
  const theme = useTheme();
  const router = useRouter();

  const handlePressEdit = () => {
    router.push(`/admin/edit/${product._id}/${NEXT_PUBLIC_ADMIN_KEY}`);
  };

  return (
    <Box>
      <Product product={product} />
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
            Unit Summary
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
            Overview of purchase cost, related expenses, and final sale amount
          </Typography>
        </Box>

        <Box
          sx={{
            p: {
              xs: 2,
              md: 4,
            },
            backgroundColor: '#1A1A1A',
            borderRadius: 2,
            marginTop: '57px',
          }}
        >
          <Box display="flex" flexDirection="column" gap={3}>
            {[
              { label: 'Purchase Price', value: product.purchase_price },
              { label: 'Sold Amount', value: product.sold_price },
              { label: 'Agent Commission', value: product.sales_incentive },
            ].map((item) => (
              <Box key={item.label}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '16px',
                      md: '20px',
                    },
                    color: '#FFB22C',
                  }}
                >
                  {item.label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '16px',
                      md: '20px',
                    },
                    color: '#D9D9D9',
                    mt: '5px',
                  }}
                >
                  ₱ {item.value.toLocaleString()}
                </Typography>
              </Box>
            ))}
            <Box>
              <>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '18px',
                      md: '20px',
                    },
                    color: '#FFB22C',
                  }}
                >
                  Expenses
                </Typography>
                <List dense>
                  {product.expenses.map((item) => (
                    <ListItem key={item._id} disablePadding sx={{ marginTop: '3px' }}>
                      <Typography
                        sx={{
                          color: '#D9D9D9',
                          fontSize: {
                            xs: '16px',
                            md: '20px',
                          },
                          flex: 1,
                          fontFamily: 'Poppins',
                        }}
                      >
                        {item.description}
                      </Typography>
                      <Typography
                        sx={{
                          color: '#D9D9D9',
                          fontSize: {
                            xs: '16px',
                            md: '20px',
                          },
                          fontFamily: 'Poppins',
                        }}
                      >
                        ₱ {item.amount.toLocaleString()}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </>
              <Divider sx={{ borderColor: '#333', my: 1 }} />
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Typography
                  sx={{
                    color: '#FFB22C',
                    fontSize: {
                      xs: '16px',
                      md: '20px',
                    },
                  }}
                >
                  Total Expenses
                </Typography>
                <Typography
                  sx={{
                    color: '#f0e9e9',
                    fontSize: {
                      xs: '16px',
                      md: '20px',
                    },
                  }}
                >{`₱ ${product.total_expenses.toLocaleString()}`}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Fab
        variant="extended"
        color="secondary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handlePressEdit}
      >
        <EditIcon sx={{ mr: 1 }} />
        Edit Unit
      </Fab>
    </Box>
  );
}
