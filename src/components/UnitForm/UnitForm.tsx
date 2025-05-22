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
  Snackbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { PhotoView, PhotoProvider } from 'react-photo-view';
import Image from 'next/image';
import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';
import 'react-photo-view/dist/react-photo-view.css';
import { storage } from '@/lib/firebase';
import FullScreenLoader from '../FullScreenLoader/FullScreenLoader';
import { useRouter } from 'next/navigation';
import { differenceInDays } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type FinancingDetails = {
  months: string;
  amount: string;
  _id?: string;
};

type Expense = {
  description: string;
  amount: string;
  category: string;
};

type FormProps = {
  _id?: string;
  plate: string;
  model: string;
  price: string;
  description: string;
  detail: string;
  details: string[];
  downpayment: string;
  financingOptions: FinancingDetails[];
  purchasePrice: string;
  soldAmount: string;
  salesIncentive: string;
  acquiredCity: string;
  expenses: Expense[];
  isFeature: string;
  isOwnUnit: string;
  isSold: string;
  isActive: string;
  images: string[];
  financingMonths: string;
  financingAmount: string;
  expenseDescription: string;
  expenseAmount: string;
  expenseCategory: string;
  dateAcquired?: string;
  dateSold?: string;
};

type TextFieldProps = {
  label: string;
  key: keyof FormProps;
};

const UNIT_DETAILS: TextFieldProps[] = [
  {
    label: 'Plate number',
    key: 'plate',
  },
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
    label: 'Cost of Unit',
    key: 'purchasePrice',
  },
  {
    label: 'Selling Price',
    key: 'soldAmount',
  },
  {
    label: 'Sales Incentive',
    key: 'salesIncentive',
  },
  {
    label: 'Acquired City',
    key: 'acquiredCity',
  },
];

const DATES: TextFieldProps[] = [
  {
    label: 'Date Acquired',
    key: 'dateAcquired',
  },
  {
    label: 'Date Sold',
    key: 'dateSold',
  },
];

type SelectionOptionProps = {
  label: string;
  value: string;
};

type SelectionKey = Pick<
  FormProps,
  'isFeature' | 'isOwnUnit' | 'isSold' | 'isActive' | 'expenseCategory'
>;

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
    label: 'Own Unit',
    options: [
      { label: 'No', value: 'false' },
      { label: 'Yes', value: 'true' },
    ],
    key: 'isOwnUnit',
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

const EXPENSES_CATEGORIES = [
  { label: 'Operating Expenses', value: 'Operating' },
  { label: 'Non-operating Expenses', value: 'Non-operating' },
];

type UnitFormProps = {
  data?: FormProps;
};

export default function UnitForm({ data }: Readonly<UnitFormProps>) {
  const theme = useTheme();
  const router = useRouter();
  const [form, setForm] = useState<FormProps>(
    data ?? {
      plate: '',
      model: '',
      price: '0',
      description: '',
      detail: '',
      details: [],
      downpayment: '0',
      financingOptions: [],
      purchasePrice: '0',
      soldAmount: '0',
      salesIncentive: '0',
      acquiredCity: '',
      expenses: [],
      isFeature: 'false',
      isOwnUnit: 'true',
      isSold: 'false',
      isActive: 'false',
      images: [],
      financingMonths: '0',
      financingAmount: '0',
      expenseDescription: '',
      expenseAmount: '0',
      expenseCategory: 'Operating',
      dateAcquired: undefined,
      dateSold: undefined,
    },
  );

  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handlePickImages = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = async (event) => {
      setIsLoading(true);
      const files = (event.target as HTMLInputElement).files;
      if (!files) return;

      const selectedFiles = Array.from(files);

      const uploadPromises = selectedFiles.map((file) => {
        const fileRef = ref(storage, Date.now().toString());
        const uploadTask = uploadBytesResumable(fileRef, file);

        return new Promise<string>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            null,
            (error) => reject(error),
            () => {
              getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => resolve(downloadURL))
                .catch(reject);
            },
          );
        });
      });

      try {
        const downloadURLs = await Promise.all(uploadPromises);
        setForm((prev) => ({ ...prev, images: [...prev.images, ...downloadURLs] }));
        setSnackbar({
          isOpen: true,
          message: 'Successfully uploaded product images.',
        });
      } catch {
        setSnackbar({
          isOpen: true,
          message: 'Error occurred uploading product image.',
        });
      } finally {
        setIsLoading(false);
      }
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

    if (key === 'images') {
      const filteredArray = form.images.filter((_, i) => i === index);
      const desertRef = ref(storage, filteredArray[0]);

      // Delete the file
      deleteObject(desertRef)
        .then(() => {
          setSnackbar({
            isOpen: true,
            message: 'Successfully deleted product image.',
          });
        })
        .catch(() => {
          setSnackbar({
            isOpen: true,
            message: 'Error occurred deleting product image.',
          });
        });
    }
  };

  const addFinancingExpenseDetails = (
    key: keyof Pick<FormProps, 'financingOptions' | 'expenses'>,
  ) => {
    const details = [...form[key]];
    details.push(
      key === 'financingOptions'
        ? { months: form.financingMonths, amount: form.financingAmount }
        : {
            description: form.expenseDescription,
            amount: form.expenseAmount,
            category: form.expenseCategory,
          },
    );
    setForm((prev) => ({
      ...prev,
      [key]: details,
      financingMonths: '0',
      financingAmount: '0',
      expenseDescription: '',
      expenseAmount: '0',
      expenseCategory: 'Operating',
    }));
  };

  const saveUnit = async () => {
    setIsLoading(true);
    let expenses: Expense[] = [...form.expenses];

    if (parseInt(form.purchasePrice, 10) > 0) {
      expenses.push({
        description: 'Cost of Unit',
        amount: form.purchasePrice,
        category: 'Operating',
      });
    } else {
      expenses = expenses.filter((item) => item.description !== 'Cost of Unit');
    }

    if (parseInt(form.salesIncentive, 10) > 0) {
      expenses.push({
        description: 'Sales Incentive',
        amount: form.salesIncentive,
        category: 'Operating',
      });
    } else {
      expenses = expenses.filter((item) => item.description !== 'Sales Incentive');
    }

    const uniqueExpenses = Object.values(
      expenses.reduce(
        (acc, curr) => {
          acc[curr.description] = curr;
          return acc;
        },
        {} as Record<string, (typeof expenses)[number]>,
      ),
    ).sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));

    const totalExpenses = uniqueExpenses.reduce((sum, expense) => {
      return sum + parseFloat(expense.amount || '0');
    }, 0);

    const terms = form.financingOptions.map((item) => ({
      term: parseInt(item.months, 0),
      amount: parseFloat(item.amount).toFixed(2),
    }));

    const profit = parseFloat(form.soldAmount) - totalExpenses;
    const percentage = Math.round((profit / totalExpenses) * 100);
    const days = differenceInDays(new Date(form.dateSold!), new Date(form.dateAcquired!));

    const payload = {
      _id: form._id,
      plate: form.plate,
      name: form.model,
      description: form.description,
      details: form.details,
      price: form.price === '' ? '0' : form.price,
      images: form.images,
      financing_details: {
        down_payment: form.downpayment === '' ? '0' : form.downpayment,
        terms: terms,
      },
      is_feature: form.isFeature === 'true',
      is_own_unit: form.isOwnUnit === 'true',
      is_sold: form.isSold === 'true',
      is_active: form.isActive === 'true',
      purchase_price: form.purchasePrice === '' ? '0' : form.purchasePrice,
      expenses: uniqueExpenses,
      total_expenses: totalExpenses,
      sold_price: form.soldAmount === '' ? '0' : form.soldAmount,
      sales_incentive: form.salesIncentive === '' ? '0' : form.salesIncentive,
      date_acquired: form.dateAcquired ?? null,
      date_sold: form.dateSold ?? null,
      acquired_city: form.acquiredCity,
      profit: profit,
      percentage: isNaN(percentage) ? 0 : percentage,
      days_on_hold: isNaN(days) ? 0 : days,
    };

    try {
      const res = await fetch('/api/products', {
        method: data ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSnackbar({
          isOpen: true,
          message: `Vehicle has been ${data ? 'updated' : 'added'} successfully.`,
        });

        router.push(data ? `/admin/products/${data._id}/` : `/admin/home`);
      } else {
        setSnackbar({
          isOpen: true,
          message: `Failed to ${data ? 'updated' : 'added'} vehicle. Please try again later.`,
        });
      }
    } catch {
      setSnackbar({
        isOpen: true,
        message: `Failed to ${data ? 'updated' : 'added'} vehicle. Please try again later.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUnit = async () => {
    setIsLoading(true);

    form.images.forEach(async (image) => {
      await deleteObject(ref(storage, image));
    });

    try {
      const res = await fetch(`/api/products?id=${data?._id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSnackbar({
          isOpen: true,
          message: 'Vehicle has been deleted successfully.',
        });
        router.push(`/admin/home`);
      } else {
        setSnackbar({
          isOpen: true,
          message: 'Failed to delete vehicle. Please try again later.',
        });
      }
    } catch {
      setSnackbar({
        isOpen: true,
        message: 'Failed to delete vehicle. Please try again later.',
      });
    } finally {
      setIsLoading(false);
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
      }}
    >
      {isLoading && <FullScreenLoader />}
      <Typography
        sx={{
          fontSize: {
            xs: '22px',
            md: '40px',
          },
          color: '#ffffff',
          fontFamily: 'Centauri',
        }}
      >
        {data ? 'Edit Unit' : 'Add New Unit'}
      </Typography>

      <Box sx={{ marginTop: '57px', display: 'flex', flexDirection: 'column', gap: 3 }}>
        {UNIT_DETAILS.map((item) => (
          <Box key={item.key}>
            <Typography color="#ffffff" sx={{ fontSize: '18px' }}>
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
          <Typography color="#ffffff" sx={{ fontSize: '18px' }}>
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
                key={item}
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
          <Typography color="#ffffff" sx={{ fontSize: '18px' }}>
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
          <Typography color="#ffffff" sx={{ fontSize: '18px' }}>
            Financing Options:
          </Typography>
          <Grid container spacing={1} mt={2}>
            <Grid size={6}>
              <Box>
                <Typography color="#ffffff" sx={{ fontSize: '18px' }}>
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
                <Typography color="#ffffff" sx={{ fontSize: '18px' }}>
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
              sx={{ mt: 2, backgroundColor: theme.palette.secondary.main, fontSize: '16px' }}
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
                label={`${item.months} months (₱${parseFloat(item.amount).toLocaleString(
                  undefined,
                  { minimumFractionDigits: 2, maximumFractionDigits: 2 },
                )})`}
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
            <Typography color="#ffffff" sx={{ fontSize: '18px' }}>
              {item.label}
            </Typography>
            <TextField
              type={item.key === 'acquiredCity' ? 'text' : 'number'}
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
        {DATES.map((item) => (
          <Box key={item.key} flex={1}>
            <Typography color="#ffffff" sx={{ fontSize: '18px' }}>
              {item.label}
            </Typography>
            <DatePicker
              value={form[item.key] ? new Date(form[item.key] as string) : null}
              onChange={(value) => setForm({ ...form, [item.key]: value })}
              slotProps={{
                actionBar: {
                  actions: ['clear'], // shows "Clear" button in the calendar popup
                },
                textField: {
                  InputProps: {
                    sx: {
                      color: '#D9D9D9',
                      '& .MuiSvgIcon-root': {
                        color: '#D9D9D9',
                      },
                    },
                  },
                  sx: {
                    border: '1px solid #D9D9D9',
                    borderRadius: '4px',
                    width: '100%',
                    marginY: '16px',
                  },
                },
              }}
            />
          </Box>
        ))}

        <Divider sx={{ borderColor: '#333', my: 1 }} />
        <Box>
          <Typography color="#ffffff" sx={{ fontSize: '18px' }}>
            Unit Expenses:
          </Typography>
          <Grid container spacing={1} mt={2}>
            <Grid size={4}>
              <Box>
                <Typography color="#ffffff" sx={{ fontSize: '18px' }}>
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
            <Grid size={4}>
              <Box>
                <Typography color="#ffffff" sx={{ fontSize: '18px' }}>
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
            <Grid size={4}>
              <Box>
                <Typography color="#ffffff" sx={{ fontSize: '18px' }}>
                  Category
                </Typography>
                <Select
                  value={form.expenseCategory}
                  fullWidth
                  sx={{
                    marginTop: 1,
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
                  onChange={(event) => handleSelectChange('expenseCategory', event)}
                >
                  {EXPENSES_CATEGORIES.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{ fontFamily: 'Poppins' }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              startIcon={<AddIcon />}
              sx={{ mt: 2, backgroundColor: theme.palette.secondary.main, fontSize: '16px' }}
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
                label={`${item.category} Expenses - ${item.description}  (₱${parseFloat(
                  item.amount,
                ).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })})`}
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
            <Typography color="#ffffff" sx={{ fontSize: '18px' }}>
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
          <Typography color="#ffffff" sx={{ fontSize: '18px' }}>
            Images
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              startIcon={<AddIcon />}
              sx={{
                fontSize: '16px',
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
                <Grid key={src} size={{ xs: 12, md: 4 }}>
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
              fontSize: '16px',
            }}
            onClick={saveUnit}
          >
            Submit
          </Button>
          {data && (
            <Button
              fullWidth
              sx={{
                backgroundColor: theme.palette.error.main,
                color: theme.palette.secondary.main,
              }}
              onClick={deleteUnit}
            >
              Delete
            </Button>
          )}
        </Box>
      </Box>
      <Snackbar
        open={snackbar.isOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        autoHideDuration={3000}
        onClose={() => {
          setSnackbar({
            isOpen: false,
            message: '',
          });
        }}
        message={snackbar.message}
        slotProps={{
          content: {
            sx: { backgroundColor: '#4BB543', fontFamily: 'Poppins' },
          },
        }}
      />
    </Box>
  );
}
