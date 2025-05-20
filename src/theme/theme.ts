'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#0C0E0D',
    },
    secondary: {
      main: '#D9D9D9',
    },
  },
  typography: {
    fontFamily: 'Centauri, sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input::placeholder': {
            color: '#A0A0A0', // Placeholder text color
            fontFamily: 'Poppins',
          },
          '& .MuiInputBase-input': {
            color: '#D9D9D9', // Input text color
            fontFamily: 'Poppins', // Default font for input text
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#D9D9D9', // Default border color
            },
            '&:hover fieldset': {
              borderColor: '#D9D9D9 !important', // Hover color
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976D2 !important', // Focused color
            },
          },
        },
      },
    },
  },
});

export default theme;
