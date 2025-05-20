'use client';

import React from 'react';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';

export default function Contact() {
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
          <form>
            <Grid container spacing={3} sx={{ marginTop: '32px' }}>
              {/* Name & Phone Fields */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
                  Name
                </Typography>
                <TextField fullWidth variant="outlined" margin="normal" name="name" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
                  Phone
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="phoneNumber"
                  type="tel"
                />
              </Grid>

              {/* Email Field */}
              <Grid size={12}>
                <Typography color="#D9D9D9" sx={{ fontSize: '12px' }}>
                  Email
                </Typography>
                <TextField fullWidth variant="outlined" margin="normal" name="email" type="email" />
              </Grid>

              {/* Message Field */}
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
                  name="message"
                  placeholder="Type your message.."
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
    </Box>
  );
}
