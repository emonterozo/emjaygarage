'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  useTheme,
  InputAdornment,
  IconButton,
  Snackbar,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAppStore } from '@/store/useAppStore';

const USERNAME = process.env.NEXT_PUBLIC_USERNAME;
const PASSWORD = process.env.NEXT_PUBLIC_PASSWORD;

export default function Login() {
  const theme = useTheme();
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);
  const [username, setUsername] = useState(USERNAME);
  const [password, setPassword] = useState(PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: '',
  });

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleLogin = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push('/admin/home');
    } else {
      setSnackbar({
        isOpen: true,
        message: data.message,
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.primary.main,
        position: 'relative',
        p: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          position: 'absolute',
          top: 16,
          left: 24,
          color: '#fff',
        }}
      >
        Emjay Garage
      </Typography>

      <Paper
        elevation={4}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
          backgroundColor: '#1E1E1E',
          color: '#fff',
        }}
      >
        <Typography variant="h5" gutterBottom textAlign="center" color="white">
          Login
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Username"
            type="text"
            margin="normal"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            margin="normal"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? (
                        <VisibilityOff sx={{ color: theme.palette.secondary.main }} />
                      ) : (
                        <Visibility sx={{ color: theme.palette.secondary.main }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
              '&.Mui-disabled': {
                backgroundColor: '#444',
                color: theme.palette.secondary.dark,
              },
            }}
            onClick={handleLogin}
            disabled={username === '' || password === ''}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
      <Snackbar
        open={snackbar.isOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
            sx: {
              backgroundColor: theme.palette.error.main,
              fontFamily: 'Poppins',
            },
          },
        }}
      />
    </Box>
  );
}
