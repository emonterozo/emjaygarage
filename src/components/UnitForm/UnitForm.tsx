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
  SelectChangeEvent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { PhotoView, PhotoProvider } from 'react-photo-view';
import Image from 'next/image';
import 'react-photo-view/dist/react-photo-view.css';

type FinancingDetails = {
  months: number;
  amount: number;
};

type Expense = {
  description: string;
  amount: number;
};

type FormProps = {
  model: string;
  price: number;
  description: string;
  detail: string;
  details: string[];
  downpayment: number;
  financingOptions: FinancingDetails[];
  purchasePrice: number;
  soldAmount: number;
  agentCommission: number;
  expenses: Expense[];
  isFeature: string;
  isSold: string;
  isActive: string;
  images: string[];
  financingMonths: number;
  financingAmount: number;
  expenseDescription: string;
  expenseAmount: number;
};

type TextFieldProps = {
  label: string;
  key: keyof FormProps;
};

const UNIT_DETAILS: TextFieldProps[] = [
  {
    label: 'Model',
    key: 'model',
  },
  {
    label: 'Price',
    key: 'price',
  },
  {
    label: 'Description',
    key: 'description',
  },
];

const UNIT_OTHER_DETAILS: TextFieldProps[] = [
  {
    label: 'Purchase Price',
    key: 'purchasePrice',
  },
  {
    label: 'Sold Amount',
    key: 'soldAmount',
  },
  {
    label: 'Agent Commission',
    key: 'agentCommission',
  },
];

type SelectionOptionProps = {
  label: string;
  value: string;
};

type SelectionKey = Pick<FormProps, 'isFeature' | 'isSold' | 'isActive'>;

type SelectionProps = {
  label: string;
  options: SelectionOptionProps[];
  key: keyof SelectionKey;
};

const SELECTIONS: SelectionProps[] = [
  {
    label: 'Feature Unit',
    options: [
      { label: 'No', value: 'false' },
      { label: 'Yes', value: 'true' },
    ],
    key: 'isFeature',
  },
  {
    label: 'Unit Status',
    options: [
      { label: 'For Sale', value: 'false' },
      { label: 'Sold', value: 'true' },
    ],
    key: 'isSold',
  },
  {
    label: 'Display Status',
    options: [
      { label: 'Published', value: 'true' },
      { label: 'Unpublished', value: 'false' },
    ],
    key: 'isActive',
  },
];

export default function UnitForm() {
  const theme = useTheme();
  const [form, setForm] = useState<FormProps>({
    model: '',
    price: 0,
    description: '',
    detail: '',
    details: [],
    downpayment: 0,
    financingOptions: [],
    purchasePrice: 0,
    soldAmount: 0,
    agentCommission: 0,
    expenses: [],
    isFeature: 'false',
    isSold: 'false',
    isActive: 'true',
    images: [],
    financingMonths: 0,
    financingAmount: 0,
    expenseDescription: '',
    expenseAmount: 0,
  });

  const handlePickImages = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (!files) return;

      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));

      setForm((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
    };
    input.click();
  };

  const handleSelectChange = (key: keyof SelectionKey, event: SelectChangeEvent) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleTextFieldChange = (
    key: keyof FormProps,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const addDetails = () => {
    const details = [...form.details];
    details.push(form.detail);
    setForm((prev) => ({ ...prev, detail: '', details }));
  };

  const removeChip = (
    key: keyof Pick<FormProps, 'details' | 'expenses' | 'financingOptions' | 'images'>,
    index: number,
  ) => {
    let chips = [...form[key]];
    chips = chips.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, [key]: chips }));
  };

  const addFinancingExpenseDetails = (
    key: keyof Pick<FormProps, 'financingOptions' | 'expenses'>,
  ) => {
    const details = [...form[key]];
    details.push(
      key === 'financingOptions'
        ? { months: form.financingMonths, amount: form.financingAmount }
        : { description: form.expenseDescription, amount: form.expenseAmount },
    );
    setForm((prev) => ({
      ...prev,
      [key]: details,
      financingMonths: 0,
      financingAmount: 0,
      expenseDescription: '',
      expenseAmount: 0,
    }));
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
        {UNIT_DETAILS.map((item) => (
          <Box key={item.key}>
            <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
              {item.label}
            </Typography>
            <TextField
              type={item.key === 'price' ? 'number' : 'text'}
              fullWidth
              variant="outlined"
              margin="normal"
              multiline={item.key === 'description'}
              rows={5}
              value={form[item.key]}
              onChange={(event) => handleTextFieldChange(item.key, event)}
              slotProps={{
                htmlInput: {
                  min: 0,
                },
              }}
            />
          </Box>
        ))}
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
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              value={form.detail}
              onChange={(event) => handleTextFieldChange('detail', event)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && form.detail.length > 0) {
                  addDetails();
                }
              }}
            />
            <IconButton
              size="large"
              color="primary"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                '&:hover': {
                  backgroundColor: theme.palette.secondary.dark,
                },
                '&.Mui-disabled': {
                  backgroundColor: theme.palette.secondary.main,
                },
              }}
              disabled={form.detail.length <= 0}
              onClick={addDetails}
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
                onDelete={() => removeChip('details', index)}
              />
            ))}
          </Box>
        </Box>
        <Box>
          <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
            Downpayment
          </Typography>
          <TextField
            type="number"
            fullWidth
            variant="outlined"
            margin="normal"
            value={form.downpayment}
            onChange={(event) => handleTextFieldChange('downpayment', event)}
            slotProps={{
              htmlInput: {
                min: 0,
              },
            }}
          />
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
                <TextField
                  type="number"
                  fullWidth
                  variant="outlined"
                  sx={{ marginTop: 1 }}
                  value={form.financingMonths}
                  onChange={(event) => handleTextFieldChange('financingMonths', event)}
                  slotProps={{
                    htmlInput: {
                      min: 0,
                    },
                  }}
                />
              </Box>
            </Grid>
            <Grid size={6}>
              <Box>
                <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
                  Amount
                </Typography>
                <TextField
                  type="number"
                  fullWidth
                  variant="outlined"
                  sx={{ marginTop: 1 }}
                  value={form.financingAmount}
                  onChange={(event) => handleTextFieldChange('financingAmount', event)}
                  slotProps={{
                    htmlInput: {
                      min: 1,
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              startIcon={<AddIcon />}
              sx={{ mt: 2, backgroundColor: theme.palette.secondary.main }}
              disabled={
                form.financingMonths.toString() === '0' ||
                form.financingMonths.toString() === '' ||
                form.financingAmount.toString() === '0' ||
                form.financingAmount.toString() === ''
              }
              onClick={() => addFinancingExpenseDetails('financingOptions')}
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
            {form.financingOptions.map((item, index) => (
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
                onDelete={() => removeChip('financingOptions', index)}
              />
            ))}
          </Box>
        </Box>
        {UNIT_OTHER_DETAILS.map((item) => (
          <Box key={item.label}>
            <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
              {item.label}
            </Typography>
            <TextField
              type="number"
              fullWidth
              variant="outlined"
              margin="normal"
              value={form[item.key]}
              onChange={(event) => handleTextFieldChange(item.key, event)}
              slotProps={{
                htmlInput: {
                  min: 0,
                },
              }}
            />
          </Box>
        ))}
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
                <TextField
                  fullWidth
                  variant="outlined"
                  sx={{ marginTop: 1 }}
                  value={form.expenseDescription}
                  onChange={(event) => handleTextFieldChange('expenseDescription', event)}
                />
              </Box>
            </Grid>
            <Grid size={6}>
              <Box>
                <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
                  Amount
                </Typography>
                <TextField
                  type="number"
                  fullWidth
                  variant="outlined"
                  sx={{ marginTop: 1 }}
                  value={form.expenseAmount}
                  onChange={(event) => handleTextFieldChange('expenseAmount', event)}
                  slotProps={{
                    htmlInput: {
                      min: 1,
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              startIcon={<AddIcon />}
              sx={{ mt: 2, backgroundColor: theme.palette.secondary.main }}
              disabled={
                form.expenseDescription === '' ||
                form.expenseAmount.toString() === '0' ||
                form.expenseAmount.toString() === ''
              }
              onClick={() => addFinancingExpenseDetails('expenses')}
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
            {form.expenses.map((item, index) => (
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
                onDelete={() => removeChip('expenses', index)}
              />
            ))}
          </Box>
        </Box>
        {SELECTIONS.map((item) => (
          <Box key={item.label}>
            <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
              {item.label}
            </Typography>
            <Select
              value={form[item.key]}
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
              onChange={(event) => handleSelectChange(item.key, event)}
            >
              {item.options.map((option) => (
                <MenuItem key={option.value} value={option.value} sx={{ fontFamily: 'Poppins' }}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        ))}
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
              {form.images.map((src, index) => (
                <Grid key={index} size={{ xs: 12, md: 4 }}>
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
                      <Image
                        src={src}
                        alt={`preview-${index}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
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
                      onClick={() => removeChip('images', index)}
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
            onClick={() => console.log(form)}
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
