import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#1E1E1E',
        height: '100vh',
        px: {
          xs: '12px',
          lg: '84px',
        },
      }}
    >
      <Typography
        gutterBottom
        sx={{
          fontFamily: 'Centauri',
          fontSize: { xs: '35px', lg: '72px' },
          color: '#D9D9D9',
        }}
      >
        {`The page you're looking for doesn't exist...`}
      </Typography>
      <Typography
        gutterBottom
        sx={{
          fontFamily: 'Poppins',
          fontSize: '26px',
          color: '#CCCBCB',
        }}
      >
        Please go back to the home page...
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" color="secondary" size="large" sx={{ marginTop: '1rem' }}>
          Go to Home
        </Button>
      </Link>
    </Box>
  );
}
