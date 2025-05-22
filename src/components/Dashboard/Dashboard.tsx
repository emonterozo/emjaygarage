'use client';

import React from 'react';
import { Typography, Grid, Card, CardContent, Box, useTheme, Button, Divider } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { DashboardItem } from '@/types/types';
import { useRouter } from 'next/navigation';
import { AppBar } from '..';

type Summary = {
  label: string;
  value: number;
};

type DashboardProps = {
  data: DashboardItem[];
  summary: Summary[];
};

const columns: GridColDef[] = [
  {
    field: 'is_active',
    headerName: 'Visibility',
    flex: 0.9,
    renderCell: (params) => (
      <span style={{ color: params.value ? '#D9D9D9' : '#F44336' }}>
        {params.value ? 'Published' : 'Unpublished'}
      </span>
    ),
  },
  {
    field: 'is_sold',
    headerName: 'Status',
    flex: 0.7,
    renderCell: (params) => (
      <span style={{ color: params.value ? '#4CAF50' : '#D9D9D9' }}>
        {params.value ? 'Sold' : 'For Sale'}
      </span>
    ),
  },
  {
    field: 'plate',
    headerName: 'Plate #',
    flex: 0.7,
    valueFormatter: (params: string) => (params === '' ? '-' : params),
  },
  {
    field: 'name',
    headerName: 'Model',
    flex: 2,
  },
  {
    field: 'total_expenses',
    headerName: 'Expenses',
    flex: 0.8,
    valueFormatter: (params: number) =>
      params !== 0
        ? params.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : '-',
  },
  {
    field: 'sold_price',
    headerName: 'Sold Price',
    flex: 0.8,
    valueFormatter: (params: number) =>
      params !== 0
        ? params.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : '-',
  },
  {
    field: 'profit',
    headerName: 'Profit',
    flex: 0.8,
    valueFormatter: (params: number) =>
      params !== 0
        ? params.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })
        : '-',
  },
  {
    field: 'percentage',
    headerName: 'Percentage',
    flex: 0.7,
    valueFormatter: (params: number) => `${params}%`,
  },
  {
    field: 'date_acquired',
    headerName: 'Date Acquired',
    flex: 0.8,
    valueFormatter: (params: Date) => {
      return params !== null ? format(params, 'MM-dd-yyy') : '-';
    },
  },
  {
    field: 'date_sold',
    headerName: 'Date Sold',
    flex: 0.8,
    valueFormatter: (params: Date) => {
      return params !== null ? format(params, 'MM-dd-yyy') : '-';
    },
  },
  {
    field: 'days_on_hold',
    headerName: 'Days',
    flex: 0.5,
    valueFormatter: (params: number) => (params > 0 ? params : '-'),
  },
];

const Dashboard = ({ data, summary }: DashboardProps) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Box>
      <AppBar />
      <Box
        sx={{
          paddingY: {
            xs: '40px',
            md: '80px',
          },
          paddingX: '30px',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.secondary.main,
          minHeight: '100vh',
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
            Dashboard
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
            Oversee overall sales performance, vehicle inventory, and key metrics — all in one
            place.
          </Typography>
        </Box>
        <Grid container spacing={2} sx={{ paddingTop: '57px' }}>
          {summary.map((item) => (
            <Grid size={{ xs: 12, md: 6 }} key={item.label}>
              <Card
                sx={{
                  backgroundColor: '#1E1E1E',
                  color: '#fff',
                  borderRadius: 3,
                  boxShadow: 3,
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    {item.label}
                  </Typography>
                  <Box
                    sx={{
                      width: 150,
                      height: 150,
                      borderRadius: '50%',
                      backgroundColor: '#333',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mt: 1,
                      boxShadow: '0 0 12px rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <Typography variant="h4" sx={{ fontWeight: 900 }}>
                      {item.value}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ borderColor: theme.palette.secondary.dark, marginY: 4, marginX: 3 }} />
        <DataGrid
          rows={data}
          columns={[
            ...columns,
            {
              field: 'actions',
              headerName: 'Actions',
              flex: 1,
              sortable: false,
              filterable: false,
              align: 'center',
              renderCell: (params) => {
                const handleClick = (e: React.MouseEvent) => {
                  e.stopPropagation();
                  router.push(`/admin/products/${params.id}`);
                };

                return (
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      color: 'primary.main',
                      backgroundColor: 'secondary.main',
                      borderRadius: 10,
                      textTransform: 'none',
                      fontFamily: 'bold',
                    }}
                    onClick={handleClick}
                  >
                    View
                  </Button>
                );
              },
            },
          ]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25 },
            },
          }}
          pageSizeOptions={[25]}
          disableRowSelectionOnClick
          disableColumnSelector
          sx={{
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
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
