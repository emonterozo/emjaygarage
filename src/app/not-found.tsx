'use-client';

import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
    >
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" color="textSecondary" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Oops! The page you are looking for does not exist.
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" color="primary" size="large" sx={{ marginTop: '1rem' }}>
          Go to Home
        </Button>
      </Link>
    </Box>
  );
}
