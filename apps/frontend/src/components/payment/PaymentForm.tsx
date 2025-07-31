import { CreditCard, Lock, Person } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCreatePaymentIntent } from '../../hooks/useApi';
import { Event } from '../../services/api';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '');

interface PaymentFormProps {
  event: Event;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ event }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const createPaymentIntentMutation = useCreatePaymentIntent();
  const [nameOfAttendee, setNameOfAttendee] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!nameOfAttendee.trim()) {
      setError('Por favor ingresa el nombre del asistente');
      return;
    }

    setError('');

    createPaymentIntentMutation.mutate(
      {
        eventId: event.id,
        nameOfAttendee: nameOfAttendee.trim(),
      },
      {
        onSuccess: async data => {
          try {
            const stripe = await stripePromise;
            if (!stripe) {
              throw new Error('Stripe no se pudo cargar');
            }

            const { clientSecret, paymentIntentId } = data;

            toast.loading('Procesando pago...', { id: 'payment-processing' });

            const { error: stripeError } = await stripe.confirmPayment({
              clientSecret,
              confirmParams: {
                return_url: `${window.location.origin}/payment-success?eventId=${event.id}&nameOfAttendee=${encodeURIComponent(nameOfAttendee)}&paymentIntentId=${paymentIntentId}`,
              },
            });

            toast.dismiss('payment-processing');

            if (stripeError) {
              const errorMessage = stripeError.message || 'Error al procesar el pago';
              setError(errorMessage);
              toast.error(errorMessage);
            }
          } catch (_err: any) {
            toast.dismiss('payment-processing');
            const errorMessage = 'Error al procesar el pago con Stripe';
            setError(errorMessage);
            toast.error(errorMessage);
          }
        },
        onError: (err: any) => {
          const errorMessage = err.response?.data?.message || 'Error al procesar el pago';
          setError(errorMessage);
          toast.error(errorMessage);
        },
      }
    );
  };

  return (
    <Box sx={styles.paymentContainer(theme)}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" sx={styles.pageTitle(theme)}>
          Comprar Entrada
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={styles.eventCard(theme)}>
              <CardContent>
                <Typography variant="h5" sx={styles.eventTitle(theme)}>
                  {event.name}
                </Typography>
                <Typography variant="body1" sx={styles.eventDate(theme)}>
                  {new Date(event.date).toLocaleDateString('es-ES', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
                <Typography variant="body2" sx={styles.eventAddress(theme)}>
                  {event.address}
                </Typography>
                <Box sx={styles.priceContainer(theme)}>
                  <Typography variant="h4" sx={styles.eventPrice(theme)}>
                    ${event.price}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={styles.paymentCard(theme)}>
              <CardContent>
                <Box sx={styles.paymentHeader}>
                  <CreditCard sx={styles.paymentIcon(theme)} />
                  <Typography variant="h5" sx={styles.paymentTitle(theme)}>
                    Información de Pago
                  </Typography>
                </Box>

                {(error || createPaymentIntentMutation.error) && (
                  <Alert severity="error" sx={styles.errorAlert}>
                    {error ||
                      (createPaymentIntentMutation.error as any)?.response?.data?.message ||
                      'Error al procesar el pago'}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
                  <TextField
                    fullWidth
                    label="Nombre del Asistente"
                    value={nameOfAttendee}
                    onChange={e => setNameOfAttendee(e.target.value)}
                    required
                    variant="outlined"
                    sx={styles.textField(theme)}
                    InputProps={{
                      startAdornment: <Person sx={styles.inputIcon(theme)} />,
                    }}
                    helperText="Nombre completo de la persona que asistirá al evento"
                  />

                  <Box sx={styles.securityNote(theme)}>
                    <Lock sx={styles.lockIcon(theme)} />
                    <Typography variant="body2" sx={styles.securityText(theme)}>
                      Tus datos de pago están protegidos con encriptación SSL
                    </Typography>
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={createPaymentIntentMutation.isPending}
                    sx={styles.payButton(theme)}
                  >
                    {createPaymentIntentMutation.isPending
                      ? 'Procesando...'
                      : `Pagar $${event.price}`}
                  </Button>
                </Box>

                <Typography variant="caption" sx={styles.disclaimer(theme)}>
                  Al completar esta compra, aceptas nuestros términos y condiciones.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const styles = {
  paymentContainer: (theme: any) => ({
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    py: 4,
  }),
  pageTitle: (theme: any) => ({
    textAlign: 'center',
    mb: 4,
    color: theme.palette.primary.main,
    fontWeight: theme.custom.fontWeight.bold,
  }),
  eventCard: (theme: any) => ({
    borderRadius: theme.custom.borderRadius.large,
    boxShadow: theme.palette.custom.shadow.medium,
    backgroundColor: theme.palette.background.paper,
  }),
  eventTitle: (theme: any) => ({
    color: theme.palette.primary.main,
    fontWeight: theme.custom.fontWeight.bold,
    mb: 2,
  }),
  eventDate: (theme: any) => ({
    color: theme.palette.text.primary,
    mb: 1,
  }),
  eventAddress: (theme: any) => ({
    color: theme.palette.text.secondary,
    mb: 3,
  }),
  priceContainer: (theme: any) => ({
    textAlign: 'center',
    pt: 2,
    borderTop: `1px solid ${theme.palette.divider}`,
  }),
  eventPrice: (theme: any) => ({
    color: theme.palette.secondary.main,
    fontWeight: theme.custom.fontWeight.bold,
  }),
  paymentCard: (theme: any) => ({
    borderRadius: theme.custom.borderRadius.large,
    boxShadow: theme.palette.custom.shadow.medium,
    backgroundColor: theme.palette.background.paper,
  }),
  paymentHeader: {
    display: 'flex',
    alignItems: 'center',
    mb: 3,
    gap: 2,
  },
  paymentIcon: (theme: any) => ({
    fontSize: 28,
    color: theme.palette.primary.main,
  }),
  paymentTitle: (theme: any) => ({
    color: theme.palette.primary.main,
    fontWeight: theme.custom.fontWeight.bold,
  }),
  errorAlert: {
    mb: 3,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  textField: (theme: any) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.custom.borderRadius.medium,
    },
  }),
  inputIcon: (theme: any) => ({
    color: theme.palette.text.secondary,
    mr: 1,
  }),
  securityNote: (theme: any) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    p: 2,
    backgroundColor: theme.palette.success.light,
    borderRadius: theme.custom.borderRadius.medium,
  }),
  lockIcon: (theme: any) => ({
    fontSize: 16,
    color: theme.palette.success.main,
  }),
  securityText: (theme: any) => ({
    color: theme.palette.success.dark,
    fontSize: '0.875rem',
  }),
  payButton: (theme: any) => ({
    py: 2,
    borderRadius: theme.custom.borderRadius.medium,
    fontWeight: theme.custom.fontWeight.bold,
    fontSize: '1.1rem',
  }),
  disclaimer: (theme: any) => ({
    textAlign: 'center',
    color: theme.palette.text.secondary,
    mt: 2,
  }),
};

export default PaymentForm;
