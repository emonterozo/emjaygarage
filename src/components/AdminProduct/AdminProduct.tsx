'use client';

import React from 'react';
import { Box, Fab, Typography, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import Product, { ProductProps } from '../Product/Product';
import { AppBar } from '..';
const NEXT_PUBLIC_ADMIN_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY;

const columns: GridColDef[] = [
  {
    field: 'description',
    headerName: 'Expenses',
    flex: 2,
  },
  {
    field: 'category',
    headerName: 'Category',
    flex: 2,
    valueFormatter: (params: string) => `${params} Expenses`,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    flex: 1,
    valueFormatter: (params: number) =>
      `₱ ${params.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
  },
];

export default function AdminProduct({ product }: Readonly<ProductProps>) {
  const theme = useTheme();
  const router = useRouter();

  const handlePressEdit = () => {
    router.push(`/admin/edit/${product._id}/${NEXT_PUBLIC_ADMIN_KEY}`);
  };

  return (
    <Box>
      <AppBar />
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
              fontFamily: 'Centauri',
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
            Overview of purchase cost, related expenses, and final sale amount.
          </Typography>
        </Box>
        <DataGrid
          rows={product.expenses}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25 },
            },
          }}
          hideFooterPagination
          pageSizeOptions={[25]}
          disableRowSelectionOnClick
          disableColumnSelector
          sx={{
            mt: 5,
            color: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            backgroundColor: '#121212',
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#1a1a1a',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: theme.palette.secondary.light,
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
              fontWeight: 'bold',
            },
            '.MuiDataGrid-columnSeparator': {
              color: theme.palette.primary.main,
            },
            '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
              outline: 'none',
              boxShadow: 'none',
            },
            '& .MuiDataGrid-columnHeader.MuiDataGrid-columnHeader--sorted': {
              outline: 'none',
              boxShadow: 'none',
            },
            '& .MuiDataGrid-footerContainer': {
              color: theme.palette.secondary.main,
            },
            '& .MuiTablePagination-root': {
              color: theme.palette.secondary.main,
            },
            '& .MuiIconButton-root': {
              color: theme.palette.secondary.main,
              '&:hover': {
                color: theme.palette.secondary.main,
              },
            },
          }}
          getRowId={(row) => row._id}
          slots={{
            footer: () => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: `1px solid ${theme.palette.secondary.main}`,
                  px: 5,
                  py: 2,
                }}
              >
                <Typography variant="subtitle1" color="white">
                  {`Total Expenses: ₱ ${product.total_expenses.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                </Typography>
                <Typography variant="subtitle1" color="white">
                  {`Selling Price: ₱ ${product.sold_price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                </Typography>
                <Typography variant="subtitle1" color="white">
                  {`Total Profit: ₱ ${product.profit.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                </Typography>
                <Typography variant="subtitle1" color="white">
                  {`Percentage: ${product.percentage}%`}
                </Typography>
              </Box>
            ),
            noRowsOverlay: () => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <Typography variant="subtitle1" color="white">
                  No available data
                </Typography>
              </Box>
            ),
          }}
        />
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
