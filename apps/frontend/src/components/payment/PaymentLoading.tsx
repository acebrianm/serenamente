import { CheckCircle, Error as ErrorIcon, HourglassEmpty } from '@mui/icons-material';
import { Box, Card, CardContent, Container, Typography, useTheme } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentLoading: React.FC = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'checking' | 'timeout'>('loading');
  const [attempts, setAttempts] = useState(0);
  const attemptsRef = useRef(0); // ✅ Persistente entre renders
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const paymentIntentId = searchParams.get('payment_intent');
  const eventId = searchParams.get('eventId');
  const attendees = searchParams.get('attendees');

  useEffect(() => {
    if (!paymentIntentId) {
      navigate('/');
      return;
    }

    setStatus('checking');
    const maxAttempts = 30;

    const checkPaymentStatus = async () => {
      const attemptNumber = attemptsRef.current + 1;
      console.log(`🔍 Checking payment status (attempt ${attemptNumber}/${maxAttempts})`);

      try {
        const response = await fetch(`/api/payments/status/${paymentIntentId}?t=${Date.now()}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Payment status response:', data);

          switch (data.status) {
            case 'succeeded':
              navigate(
                `/payment-success?payment_intent=${paymentIntentId}&eventId=${eventId}&attendees=${attendees}`
              );
              return;
            case 'failed':
              navigate(
                `/payment-error?message=${encodeURIComponent(data.message)}&payment_intent=${paymentIntentId}`
              );
              return;
            case 'requires_action':
              navigate(
                `/payment-error?message=${encodeURIComponent('El pago requiere acción adicional')}&payment_intent=${paymentIntentId}`
              );
              return;
            default:
              break;
          }
        } else {
          console.error(
            'Error response from payment status:',
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }

      attemptsRef.current += 1;
      setAttempts(attemptsRef.current);

      if (attemptsRef.current >= maxAttempts) {
        console.log('⏰ Timeout reached, stopping polling');
        setStatus('timeout');

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        setTimeout(() => {
          navigate(
            `/payment-error?message=${encodeURIComponent('La verificación del pago tomó demasiado tiempo')}&payment_intent=${paymentIntentId}`
          );
        }, 3000);
      }
    };

    checkPaymentStatus();
    intervalRef.current = setInterval(checkPaymentStatus, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [paymentIntentId, eventId, attendees, navigate]);

  const getStatusContent = () => {
    switch (status) {
      case 'loading':
        return {
          icon: <HourglassEmpty sx={styles.loadingIcon(theme)} />,
          title: 'Inicializando...',
          message: 'Preparando verificación de pago',
        };
      case 'checking':
        return {
          icon: <HourglassEmpty sx={styles.loadingIcon(theme)} />,
          title: 'Verificando Pago',
          message: `Confirmando tu pago con Stripe... (${attempts}/${30})`,
        };
      case 'timeout':
        return {
          icon: <ErrorIcon sx={styles.errorIcon(theme)} />,
          title: 'Verificación Demorada',
          message:
            'La verificación está tomando más tiempo del esperado. Te redirigiremos para revisar el estado.',
        };
      default:
        return {
          icon: <CheckCircle sx={styles.successIcon(theme)} />,
          title: 'Pago Confirmado',
          message: 'Redirigiendo...',
        };
    }
  };

  const statusContent = getStatusContent();

  return (
    <Box sx={styles.container(theme)}>
      <Container maxWidth="sm">
        <Card sx={styles.card(theme)}>
          <CardContent sx={styles.cardContent}>
            <Box sx={styles.iconContainer}>{statusContent.icon}</Box>

            <Typography variant="h4" sx={styles.title(theme)}>
              {statusContent.title}
            </Typography>

            <Typography variant="body1" sx={styles.message(theme)}>
              {statusContent.message}
            </Typography>

            {status === 'checking' && (
              <Box sx={styles.progressContainer}>
                <Box sx={styles.progressBar(theme)}>
                  <Box sx={styles.progressFill(theme, (attempts / 30) * 100)} />
                </Box>
                <Typography variant="caption" sx={styles.progressText(theme)}>
                  Por favor no cierres esta ventana
                </Typography>
              </Box>
            )}

            {status === 'timeout' && (
              <Typography variant="body2" sx={styles.timeoutText(theme)}>
                Si tu pago fue exitoso, aparecerá en "Mis Entradas" en unos minutos.
              </Typography>
            )}
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
    backgroundColor: theme.palette.background.default,
    py: 4,
  }),
  card: (theme: any) => ({
    borderRadius: 2,
    boxShadow: theme.shadows[3],
  }),
  cardContent: {
    textAlign: 'center',
    p: 4,
  },
  iconContainer: {
    mb: 3,
  },
  loadingIcon: (theme: any) => ({
    fontSize: 80,
    color: theme.palette.primary.main,
    animation: 'spin 2s linear infinite',
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  }),
  successIcon: (theme: any) => ({
    fontSize: 80,
    color: theme.palette.success.main,
  }),
  errorIcon: (theme: any) => ({
    fontSize: 80,
    color: theme.palette.warning.main,
  }),
  title: (theme: any) => ({
    color: theme.palette.text.primary,
    fontWeight: 'bold',
    mb: 2,
  }),
  message: (theme: any) => ({
    color: theme.palette.text.secondary,
    mb: 3,
    lineHeight: 1.6,
  }),
  progressContainer: {
    width: '100%',
    mt: 3,
  },
  progressBar: (theme: any) => ({
    width: '100%',
    height: 4,
    backgroundColor: theme.palette.grey[300],
    borderRadius: 2,
    overflow: 'hidden',
    mb: 1,
  }),
  progressFill: (theme: any, width: number) => ({
    width: `${width}%`,
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.3s ease',
  }),
  progressText: (theme: any) => ({
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
  }),
  timeoutText: (theme: any) => ({
    color: theme.palette.warning.main,
    mt: 2,
    fontStyle: 'italic',
  }),
};

export default PaymentLoading;
