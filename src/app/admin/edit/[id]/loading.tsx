import { FullScreenLoader } from '@/components';
import { Box } from '@mui/material';

export default function Loading() {
  return (
    <Box sx={{ height: '100vh', backgroundColor: '#0C0E0D' }}>
      <FullScreenLoader />;
    </Box>
  );
}
