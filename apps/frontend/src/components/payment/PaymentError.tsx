import { Error as ErrorIcon, Home, Refresh } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Container, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const PaymentError: React.FC = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();

  const message =
    searchParams.get('message') || 'Ocurrió un error durante el procesamiento del pago';
  const paymentIntentId = searchParams.get('payment_intent');

  const getErrorDetails = () => {
    const decodedMessage = decodeURIComponent(message);

    if (decodedMessage.includes('timeout') || decodedMessage.includes('demasiado tiempo')) {
      return {
        title: 'Verificación Demorada',
        description:
          'La verificación del pago está tomando más tiempo del esperado. Esto puede deberse a problemas temporales con el procesador de pagos.',
        suggestion:
          'Si tu pago fue procesado exitosamente, aparecerá en "Mis Entradas" en los próximos minutos. Si no aparece, por favor contacta a soporte.',
        canRetry: false,
      };
    }

    if (decodedMessage.includes('cancelado')) {
      return {
        title: 'Pago Cancelado',
        description: 'El pago fue cancelado antes de completarse.',
        suggestion: 'Puedes intentar realizar el pago nuevamente si lo deseas.',
        canRetry: true,
      };
    }

    if (decodedMessage.includes('fallido') || decodedMessage.includes('declined')) {
      return {
        title: 'Pago Rechazado',
        description: 'Tu método de pago fue rechazado por el banco o procesador.',
        suggestion: 'Verifica los datos de tu tarjeta o intenta con otro método de pago.',
        canRetry: true,
      };
    }

    if (decodedMessage.includes('acción adicional')) {
      return {
        title: 'Acción Requerida',
        description: 'Tu banco requiere verificación adicional para completar el pago.',
        suggestion:
          'Intenta realizar el pago nuevamente y completa la verificación requerida por tu banco.',
        canRetry: true,
      };
    }

    // Generic error
    return {
      title: 'Error en el Pago',
      description: decodedMessage,
      suggestion:
        'Por favor intenta realizar el pago nuevamente. Si el problema persiste, contacta a soporte.',
      canRetry: true,
    };
  };

  const errorDetails = getErrorDetails();

  return (
    <Box sx={styles.container(theme)}>
      <Container maxWidth="sm">
        <Card sx={styles.card(theme)}>
          <CardContent sx={styles.cardContent}>
            <ErrorIcon sx={styles.errorIcon(theme)} />

            <Typography variant="h4" sx={styles.title(theme)}>
              {errorDetails.title}
            </Typography>

            <Typography variant="body1" sx={styles.description(theme)}>
              {errorDetails.description}
            </Typography>

            <Typography variant="body2" sx={styles.suggestion(theme)}>
              {errorDetails.suggestion}
            </Typography>

            {paymentIntentId && (
              <Typography variant="caption" sx={styles.paymentId(theme)}>
                ID de referencia: {paymentIntentId}
              </Typography>
            )}

            <Box sx={styles.actionButtons}>
              {errorDetails.canRetry && (
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  size="large"
                  startIcon={<Refresh />}
                  sx={styles.retryButton}
                >
                  Intentar Nuevamente
                </Button>
              )}

              <Button
                component={Link}
                to="/"
                variant={errorDetails.canRetry ? 'outlined' : 'contained'}
                size="large"
                startIcon={<Home />}
                sx={styles.homeButton}
              >
                Volver al Inicio
              </Button>
            </Box>

            <Typography variant="body2" sx={styles.supportText(theme)}>
              Si necesitas ayuda, no dudes en contactarnos.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

const styles = {
  container: (theme: any) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.error.light,
    py: 4,
  }),
  card: (theme: any) => ({
    borderRadius: 2,
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper,
  }),
  cardContent: {
    textAlign: 'center',
    p: 4,
  },
  errorIcon: (theme: any) => ({
    fontSize: 80,
    color: theme.palette.error.main,
    mb: 3,
  }),
  title: (theme: any) => ({
    color: theme.palette.error.main,
    fontWeight: 'bold',
    mb: 2,
  }),
  description: (theme: any) => ({
    color: theme.palette.text.primary,
    mb: 2,
    lineHeight: 1.6,
  }),
  suggestion: (theme: any) => ({
    color: theme.palette.text.secondary,
    mb: 3,
    lineHeight: 1.6,
    fontStyle: 'italic',
  }),
  paymentId: (theme: any) => ({
    color: theme.palette.text.secondary,
    mb: 4,
    fontFamily: 'monospace',
    backgroundColor: theme.palette.grey[100],
    padding: '4px 8px',
    borderRadius: 1,
    display: 'inline-block',
  }),
  actionButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    mb: 4,
  },
  retryButton: {
    py: 2,
    borderRadius: 2,
    fontWeight: 'bold',
  },
  homeButton: {
    py: 2,
    borderRadius: 2,
    fontWeight: 'bold',
  },
  supportText: (theme: any) => ({
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
  }),
};

export default PaymentError;
