import { Google } from '@mui/icons-material';
import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
import React from 'react';

interface OAuthButtonsProps {
  disabled?: boolean;
}

const OAuthButtons: React.FC<OAuthButtonsProps> = ({ disabled = false }) => {
  const theme = useTheme();

  const handleGoogleLogin = () => {
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001';
    window.location.href = `${baseUrl}/auth/google`;
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.dividerContainer}>
        <Divider sx={styles.divider} />
        <Typography variant="body2" sx={styles.dividerText(theme)}>
          o continúa con
        </Typography>
        <Divider sx={styles.divider} />
      </Box>

      <Button
        variant="outlined"
        fullWidth
        disabled={disabled}
        onClick={handleGoogleLogin}
        startIcon={<Google />}
        sx={styles.oauthButton(theme)}
      >
        Continuar con Google
      </Button>
    </Box>
  );
};

const styles = {
  container: {
    width: '100%',
    mt: 3,
  },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    mb: 3,
    gap: 2,
  },
  divider: {
    flex: 1,
  },
  dividerText: (theme: any) => ({
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
  }),
  oauthButton: (theme: any) => ({
    py: 1.5,
    borderRadius: theme.custom.borderRadius.medium,
    borderColor: theme.palette.divider,
    color: theme.palette.text.primary,
    fontWeight: theme.custom.fontWeight.medium,
    '&:hover': {
      borderColor: theme.palette.primary.main,
      backgroundColor: theme.palette.action.hover,
    },
    '&:disabled': {
      opacity: 0.6,
    },
    marginBottom: theme.custom.spacing.xs,
  }),
};

export default OAuthButtons;
