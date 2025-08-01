import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import theme from '../../theme/theme';
import Footer from '../Footer';
import Navbar from '../Navbar';

const Layout: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Outlet />
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          containerStyle={{
            top: 80, // Position below navbar
          }}
          toastOptions={{
            duration: 4000,
            style: {
              background: theme.palette.background.paper,
              color: theme.palette.text.primary,
              borderRadius: theme.custom.borderRadius.medium,
              boxShadow: theme.palette.custom.shadow.medium,
            },
            success: {
              iconTheme: {
                primary: theme.palette.success.main,
                secondary: theme.palette.background.paper,
              },
            },
            error: {
              iconTheme: {
                primary: theme.palette.error.main,
                secondary: theme.palette.background.paper,
              },
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Layout;
