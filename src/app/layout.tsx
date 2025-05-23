import type { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme/theme';
import { AuthInitializer, MUIProvider } from '@/components';

import './globals.css';

export const metadata: Metadata = {
  title: 'Emjay Garage',
  description: 'Buying and selling of quality cars',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthInitializer>
          <MUIProvider>
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </AppRouterCacheProvider>
          </MUIProvider>
        </AuthInitializer>
      </body>
    </html>
  );
}
