import { CheckCircle, Download, Home } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Container, Typography, useTheme } from '@mui/material';
import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const attendeesParam = searchParams.get('attendees');

  // Memoize attendees to prevent re-creation on every render
  const attendees = useMemo(() => {
    try {
      return attendeesParam ? JSON.parse(decodeURIComponent(attendeesParam)) : [];
    } catch (error) {
      console.error('Error parsing attendees:', error);
      return [];
    }
  }, [attendeesParam]);

  return (
    <Box sx={styles.successContainer(theme, 'success')}>
      <Container maxWidth="sm">
        <Card sx={styles.successCard(theme)}>
          <CardContent sx={styles.cardContent}>
            <CheckCircle sx={styles.successIcon(theme)} />

            <Typography variant="h3" sx={styles.successTitle(theme)}>
              ¡Pago Exitoso!
            </Typography>

            <Typography variant="h5" sx={styles.thankYouText(theme)}>
              Gracias por tu compra
            </Typography>

            <Typography variant="body1" sx={styles.confirmationText(theme)}>
              {attendees.length === 1 ? (
                <>
                  Tu entrada ha sido confirmada para <strong>{attendees[0]}</strong>.
                </>
              ) : (
                <>
                  Tus {attendees.length} entradas han sido confirmadas para:{' '}
                  <strong>{attendees.join(', ')}</strong>.
                </>
              )}{' '}
              Recibirás un correo electrónico con los detalles de confirmación.
            </Typography>

            <Box sx={styles.actionButtons}>
              <Button
                component={Link}
                to="/my-tickets"
                variant="contained"
                size="large"
                startIcon={<Download />}
                sx={styles.ticketsButton(theme)}
              >
                Ver Mis Entradas
              </Button>

              <Button
                component={Link}
                to="/"
                variant="outlined"
                size="large"
                startIcon={<Home />}
                sx={styles.homeButton(theme)}
              >
                Volver al Inicio
              </Button>
            </Box>

            <Typography variant="body2" sx={styles.supportText(theme)}>
              Si tienes alguna pregunta, no dudes en contactarnos.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

const styles = {
  successContainer: (theme: any, type: 'processing' | 'success' | 'error') => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    backgroundColor:
      type === 'success'
        ? theme.palette.success.light
        : type === 'error'
          ? theme.palette.error.light
          : theme.palette.background.default,
    py: 4,
  }),
  successCard: (theme: any) => ({
    borderRadius: theme.custom.borderRadius.large,
    boxShadow: theme.palette.custom.shadow.heavy,
    backgroundColor: theme.palette.background.paper,
  }),
  cardContent: {
    textAlign: 'center',
    p: 4,
  },
  successIcon: (theme: any) => ({
    fontSize: 80,
    color: theme.palette.success.main,
    mb: 3,
  }),
  successTitle: (theme: any) => ({
    color: theme.palette.success.main,
    fontWeight: theme.custom.fontWeight.bold,
    mb: 2,
  }),
  thankYouText: (theme: any) => ({
    color: theme.palette.text.primary,
    mb: 3,
    fontWeight: theme.custom.fontWeight.bold,
  }),
  confirmationText: (theme: any) => ({
    color: theme.palette.text.secondary,
    mb: 4,
    lineHeight: 1.6,
  }),
  actionButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    mb: 4,
  },
  ticketsButton: (theme: any) => ({
    py: 2,
    borderRadius: theme.custom.borderRadius.medium,
    fontWeight: theme.custom.fontWeight.bold,
  }),
  homeButton: (theme: any) => ({
    py: 2,
    borderRadius: theme.custom.borderRadius.medium,
    fontWeight: theme.custom.fontWeight.bold,
  }),
  supportText: (theme: any) => ({
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
  }),
};

export default PaymentSuccess;
