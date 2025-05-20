'use client';

import React, { useState } from 'react';
import { Box, Typography, Grid, TextField, Button, Snackbar } from '@mui/material';
import emailjs from '@emailjs/browser';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z
    .string()
    .min(1, 'Phone is required')
    .regex(/^09\d{9}$/, 'Phone must start with 09 and be exactly 11 digits'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  message: z.string().min(1, 'Message is required'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    message: '',
  });

  const sendEmail = (data: ContactFormData) => {
    const serviceId = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID ?? '';
    const templateId = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID ?? '';
    const publicKey = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY ?? '';
    const emailTemplate = {
      from_name: data.name,
      from_email: data.email,
      to_name: 'Emjay Garage',
      contact_number: data.phone,
      message: data.message,
    };
    emailjs.send(serviceId, templateId, emailTemplate, publicKey).then(
      () => {
        reset();
        setSnackbar({
          isOpen: true,
          message: 'Thank you for your inquiry. We will get back to you shortly.',
        });
      },
      () => {
        setSnackbar({
          isOpen: true,
          message: 'Something when wrong. Please try again.',
        });
      },
    );
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url("/background-image.png")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          id="contact"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            justifyContent: 'center',
            alignItems: 'center',
            width: {
              xs: '100%',
              md: '640px',
            },
          }}
        >
          <Typography
            color="#D9D9D9"
            sx={{
              fontSize: {
                xs: '14px',
                md: '16px',
              },
            }}
          >
            {`Let's Talk!`}
          </Typography>
          <Typography
            color="#D9D9D9"
            sx={{
              fontSize: {
                xs: '22px',
                md: '40px',
              },
            }}
          >
            Contact Us
          </Typography>
          <Typography
            color="#D9D9D9"
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 'light',
              fontSize: {
                xs: '14px',
                md: '16px',
              },
              textAlign: 'center',
            }}
          >
            Let us help you on what you want. <br />
            Fill out the following form and we will get back at you in the next 24 hours.
          </Typography>
          <form onSubmit={handleSubmit(sendEmail)}>
            <Grid container spacing={3} sx={{ marginTop: '32px' }}>
              {/* Name */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
                  Name
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>

              {/* Phone */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
                  Phone
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  type="tel"
                  {...register('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              </Grid>

              {/* Email */}
              <Grid size={12}>
                <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  type="email"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>

              {/* Message */}
              <Grid size={12}>
                <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
                  Message
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={5}
                  variant="outlined"
                  margin="normal"
                  placeholder="Type your message.."
                  {...register('message')}
                  error={!!errors.message}
                  helperText={errors.message?.message}
                />
              </Grid>

              {/* Submit Button */}
              <Grid size={12} display="flex" justifyContent="start">
                <Button type="submit" variant="contained" color="secondary" sx={{ width: '30%' }}>
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
      <Snackbar
        open={snackbar.isOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{
          content: {
            sx: { backgroundColor: '#4BB543', fontFamily: 'Poppins' },
          },
        }}
        autoHideDuration={3000}
        onClose={() => {
          setSnackbar({
            isOpen: false,
            message: '',
          });
        }}
        message={snackbar.message}
      />
    </Box>
  );
}
