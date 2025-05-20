'use client';

import { ReactNode } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function MUIProvider({ children }: Readonly<{ children: ReactNode }>) {
  return <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>;
}
