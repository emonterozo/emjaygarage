'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  Chip,
  Grid,
  useTheme,
  Divider,
  Select,
  MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { PhotoView, PhotoProvider } from 'react-photo-view';
import Image from 'next/image';
import 'react-photo-view/dist/react-photo-view.css';

export default function UnitForm() {
  const theme = useTheme();
  const [form, setForm] = useState({
    model: '',
    price: '',
    description: '',
    downpayment: '',
    detailInput: '',
    details: [
      'Top of the line',
      'Paddle Shifter',
      'Automatic transmission',
      '68xxx Mileage',
      'Complete Documents',
      'Registered',
      'Automatic Transmission ',
      '9k+ Mileage only! (Original Odometer)',
      'Color: Super Red',
      'Brand New Condition',
      'All Stock, All Original',
      'Original Paint, No Retouch',
      'All Power Working',
      'Owner’s Manual & Booklet',
      'Complete Tools With Spare Tire',
      '2 Original Keys',
      'No History Of Accidents & Flood',
      'Complete Legal Documents',
    ],
    financing: [
      {
        months: 36,
        amount: 30000,
      },
      {
        months: 24,
        amount: 40000,
      },
      {
        months: 12,
        amount: 50000,
      },
    ],
    financingInput: { months: '', amount: '' },
    expenses: [
      {
        description: 'Sample expense 1',
        amount: 30000,
      },
      {
        description: 'Sample expense 2',
        amount: 40000,
      },
      {
        description: 'Sample expense 3',
        amount: 50000,
      },
    ],
    images: [],
  });

  const handlePickImages = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (!files) return;

      // Convert files to Object URLs for preview
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      console.log(newImages);

      setForm((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
    };
    input.click();
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
      <Typography
        sx={{
          fontSize: {
            xs: '22px',
            md: '40px',
          },
          color: '#D9D9D9',
        }}
      >
        Add New Unit
      </Typography>

      <Box sx={{ marginTop: '57px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Box>
          <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
            Model
          </Typography>
          <TextField fullWidth variant="outlined" margin="normal" />
        </Box>
        <Box>
          <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
            Price
          </Typography>
          <TextField type="number" fullWidth variant="outlined" margin="normal" />
        </Box>
        <Box>
          <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
            Description
          </Typography>
          <TextField fullWidth variant="outlined" margin="normal" multiline rows={5} />
        </Box>
        <Box>
          <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
            Details
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <TextField fullWidth variant="outlined" margin="normal" />
            <IconButton
              size="large"
              color="primary"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                '&:hover': {
                  backgroundColor: theme.palette.secondary.dark,
                },
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Box
            mt={1}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            {form.details.map((item, index) => (
              <Chip
                key={index}
                label={item}
                color="secondary"
                sx={{
                  fontFamily: 'Poppins',
                  fontSize: {
                    xs: '14px',
                    md: '16px',
                  },
                }}
                onDelete={() => {}}
              />
            ))}
          </Box>
        </Box>
        <Box>
          <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
            Downpayment
          </Typography>
          <TextField type="number" fullWidth variant="outlined" margin="normal" />
        </Box>
        <Divider sx={{ borderColor: '#333', my: 1 }} />
        <Box>
          <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
            Financing Options:
          </Typography>
          <Grid container spacing={1} mt={2}>
            <Grid size={6}>
              <Box>
                <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
                  Months
                </Typography>
                <TextField type="number" fullWidth variant="outlined" sx={{ marginTop: 1 }} />
              </Box>
            </Grid>
            <Grid size={6}>
              <Box>
                <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
                  Amount
                </Typography>
                <TextField type="number" fullWidth variant="outlined" sx={{ marginTop: 1 }} />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              startIcon={<AddIcon />}
              sx={{ mt: 2, backgroundColor: theme.palette.secondary.main }}
            >
              Add
            </Button>
          </Box>
          <Box
            mt={2}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            {form.financing.map((item) => (
              <Chip
                key={item.months}
                label={`${item.months} months (₱${item.amount.toLocaleString()})`}
                color="secondary"
                sx={{
                  fontFamily: 'Poppins',
                  fontSize: {
                    xs: '14px',
                    md: '16px',
                  },
                }}
                onDelete={() => {}}
              />
            ))}
          </Box>
        </Box>
        <Box>
          <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
            Purchase Price
          </Typography>
          <TextField type="number" fullWidth variant="outlined" margin="normal" />
        </Box>
        <Box>
          <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
            Sold Amount
          </Typography>
          <TextField type="number" fullWidth variant="outlined" margin="normal" />
        </Box>
        <Box>
          <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
            Agent Commission
          </Typography>
          <TextField type="number" fullWidth variant="outlined" margin="normal" />
        </Box>
        <Divider sx={{ borderColor: '#333', my: 1 }} />
        <Box>
          <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
            Unit Expenses:
          </Typography>
          <Grid container spacing={1} mt={2}>
            <Grid size={6}>
              <Box>
                <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
                  Description
                </Typography>
                <TextField fullWidth variant="outlined" sx={{ marginTop: 1 }} />
              </Box>
            </Grid>
            <Grid size={6}>
              <Box>
                <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
                  Amount
                </Typography>
                <TextField type="number" fullWidth variant="outlined" sx={{ marginTop: 1 }} />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              startIcon={<AddIcon />}
              sx={{ mt: 2, backgroundColor: theme.palette.secondary.main }}
            >
              Add
            </Button>
          </Box>
          <Box
            mt={2}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            {form.expenses.map((item) => (
              <Chip
                key={item.description}
                label={`${item.description} months (₱${item.amount.toLocaleString()})`}
                color="secondary"
                sx={{
                  fontFamily: 'Poppins',
                  fontSize: {
                    xs: '14px',
                    md: '16px',
                  },
                }}
                onDelete={() => {}}
              />
            ))}
          </Box>
        </Box>
        <Box>
          <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
            Feature Unit
          </Typography>
          <Select
            value="no"
            fullWidth
            sx={{
              color: theme.palette.secondary.main,
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.main,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.main,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.main,
              },
              marginTop: '16px',
              '.MuiSelect-icon': {
                color: theme.palette.secondary.main,
              },
              fontFamily: 'Poppins',
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#1a1a1a',
                  color: theme.palette.secondary.main,
                },
              },
            }}
          >
            <MenuItem value="yes" sx={{ fontFamily: 'Poppins' }}>
              Yes
            </MenuItem>
            <MenuItem value="no" sx={{ fontFamily: 'Poppins' }}>
              No
            </MenuItem>
          </Select>
        </Box>
        <Box>
          <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
            Unit Status
          </Typography>
          <Select
            value="sale"
            fullWidth
            sx={{
              color: theme.palette.secondary.main,
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.main,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.main,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.main,
              },
              marginTop: '16px',
              '.MuiSelect-icon': {
                color: theme.palette.secondary.main,
              },
              fontFamily: 'Poppins',
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#1a1a1a',
                  color: theme.palette.secondary.main,
                },
              },
            }}
          >
            <MenuItem value="sold" sx={{ fontFamily: 'Poppins' }}>
              Sold
            </MenuItem>
            <MenuItem value="sale" sx={{ fontFamily: 'Poppins' }}>
              For Sale
            </MenuItem>
          </Select>
        </Box>
        <Box>
          <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
            Display Status
          </Typography>
          <Select
            value="published"
            fullWidth
            sx={{
              color: theme.palette.secondary.main,
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.main,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.main,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.secondary.main,
              },
              marginTop: '16px',
              '.MuiSelect-icon': {
                color: theme.palette.secondary.main,
              },
              fontFamily: 'Poppins',
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#1a1a1a',
                  color: theme.palette.secondary.main,
                },
              },
            }}
          >
            <MenuItem value="published" sx={{ fontFamily: 'Poppins' }}>
              Published
            </MenuItem>
            <MenuItem value="unpublished" sx={{ fontFamily: 'Poppins' }}>
              Unpublished
            </MenuItem>
          </Select>
        </Box>
        <Box>
          <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
            Images
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              startIcon={<AddIcon />}
              sx={{
                mt: 2,
                backgroundColor: theme.palette.secondary.main,
              }}
              onClick={handlePickImages}
            >
              Add Image
            </Button>
          </Box>

          <PhotoProvider>
            <Grid container spacing={3} paddingTop={5}>
              {form.images.map((src, idx) => (
                <Grid key={idx} size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      position: 'relative',
                      height: '350px',
                      width: '100%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: 1,
                    }}
                  >
                    <PhotoView src={src}>
                      <Image src={src} alt={`preview-${idx}`} fill style={{ objectFit: 'cover' }} />
                    </PhotoView>
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        color: 'white',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
                      }}
                      onClick={() => {}}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </PhotoProvider>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Button
            fullWidth
            sx={{
              backgroundColor: theme.palette.secondary.main,
            }}
          >
            Save Unit
          </Button>
          <Button
            fullWidth
            sx={{
              backgroundColor: theme.palette.error.main,
              color: theme.palette.secondary.main,
            }}
          >
            Delete Unit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
