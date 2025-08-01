import { Add, CreditCard, Delete, Person } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCreatePaymentIntent } from '../../hooks/useApi';
import { Event } from '../../services/api';

// Debug environment variable
console.log(
  'Stripe Publishable Key:',
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ? 'Present' : 'Missing'
);

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '').catch(
  error => {
    console.error('Failed to load Stripe:', error);
    return null;
  }
);

interface PaymentFormProps {
  event: Event;
}

interface CheckoutFormProps {
  event: Event;
  attendees: string[];
  clientSecret: string;
  totalAmount: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  event,
  attendees,
  clientSecret,
  totalAmount,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const theme = useTheme();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Debug Stripe loading
  React.useEffect(() => {
    console.log('Stripe status:', {
      stripe: !!stripe,
      elements: !!elements,
      clientSecret: !!clientSecret,
    });
  }, [stripe, elements, clientSecret]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe no está disponible. Por favor recarga la página.');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const { error: confirmError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-loading?eventId=${event.id}&attendees=${encodeURIComponent(JSON.stringify(attendees))}`,
        },
      });

      if (confirmError) {
        setError(confirmError.message || 'Error procesando el pago');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Error during payment:', error);
      setError('Ocurrió un error inesperado durante el pago');
      setIsProcessing(false);
    }
  };

  // Show loading state while Stripe is initializing
  if (!stripe || !elements) {
    return (
      <Box sx={styles.form}>
        <Typography variant="body1" sx={{ textAlign: 'center', py: 4 }}>
          Cargando formulario de pago...
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
      {error && (
        <Alert severity="error" sx={styles.errorAlert}>
          {error}
        </Alert>
      )}

      {/* Stripe PaymentElement with payment method options */}
      <PaymentElement
        options={{
          layout: {
            type: 'tabs',
            defaultCollapsed: false,
            radios: false,
            spacedAccordionItems: true,
          },
          fields: {
            billingDetails: 'auto',
          },
        }}
      />

      <Box sx={styles.summary(theme)}>
        <Typography variant="body1" sx={styles.summaryText}>
          {attendees.length} entrada{attendees.length > 1 ? 's' : ''} × ${event.price} ={' '}
          <strong>${totalAmount}</strong>
        </Typography>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={!stripe || isProcessing}
        sx={styles.payButton}
      >
        {isProcessing ? 'Procesando pago...' : `Pagar $${totalAmount}`}
      </Button>
    </Box>
  );
};

const PaymentForm: React.FC<PaymentFormProps> = ({ event }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const createPaymentIntentMutation = useCreatePaymentIntent();

  const [attendees, setAttendees] = useState<string[]>(['']);
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');

  const addAttendee = () => {
    if (attendees.length < 10) {
      setAttendees([...attendees, '']);
    }
  };

  const removeAttendee = (index: number) => {
    if (attendees.length > 1) {
      const newAttendees = attendees.filter((_, i) => i !== index);
      setAttendees(newAttendees);
    }
  };

  const updateAttendee = (index: number, value: string) => {
    const newAttendees = [...attendees];
    newAttendees[index] = value;
    setAttendees(newAttendees);
  };

  const handleAttendeesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const validAttendees = attendees.filter(name => name.trim().length > 0);

    if (validAttendees.length === 0) {
      setError('Por favor ingresa al menos un nombre de asistente');
      return;
    }

    setError('');

    console.log('Sending payment intent request:', {
      eventId: event.id,
      attendees: validAttendees.map(name => name.trim()),
    });

    createPaymentIntentMutation.mutate(
      {
        eventId: event.id,
        attendees: validAttendees.map(name => name.trim()),
      },
      {
        onSuccess: data => {
          console.log('Payment intent created:', data);
          setClientSecret(data.payment.clientSecret);
          setAttendees(validAttendees);
        },
        onError: (err: any) => {
          console.error('Payment intent error:', err);
          const errorMessage =
            err.response?.data?.message || err.message || 'Error al procesar el pago';
          setError(errorMessage);
          toast.error(errorMessage);
        },
      }
    );
  };

  const resetForm = () => {
    setClientSecret('');
    setError('');
  };

  const totalAmount = attendees.filter(name => name.trim().length > 0).length * event.price;

  return (
    <Box sx={styles.container(theme)}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" sx={styles.title(theme)}>
          Comprar Entradas
        </Typography>

        <Grid container spacing={4}>
          {/* Event Information */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={styles.card(theme)}>
              <CardContent>
                <Typography variant="h5" sx={styles.eventTitle(theme)}>
                  {event.name}
                </Typography>
                <Typography variant="body1" sx={styles.eventDate}>
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
                <Box sx={styles.priceBox(theme)}>
                  <Typography variant="h6" sx={styles.price}>
                    ${event.price} por entrada
                  </Typography>
                  {totalAmount > 0 && (
                    <Typography variant="h4" sx={styles.total(theme)}>
                      Total: ${totalAmount}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Attendees Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={clientSecret ? styles.cardDisabled(theme) : styles.card(theme)}>
              <CardContent>
                <Box sx={styles.header}>
                  <Person sx={styles.icon(theme)} />
                  <Typography variant="h5" sx={styles.cardTitle(theme)}>
                    Información de Asistentes
                  </Typography>
                </Box>

                {(error || createPaymentIntentMutation.error) && (
                  <Alert severity="error" sx={styles.errorAlert}>
                    {error ||
                      (createPaymentIntentMutation.error as any)?.response?.data?.message ||
                      'Error al procesar el pago'}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleAttendeesSubmit} sx={styles.form}>
                  <Typography variant="body2" sx={styles.helper(theme)}>
                    Nombres de las personas que asistirán:
                  </Typography>

                  {attendees.map((attendee, index) => (
                    <Box key={index} sx={styles.attendeeRow}>
                      <TextField
                        fullWidth
                        label={`Asistente ${index + 1}`}
                        value={attendee}
                        onChange={e => updateAttendee(index, e.target.value)}
                        variant="outlined"
                        disabled={!!clientSecret}
                        InputProps={{
                          startAdornment: <Person sx={styles.inputIcon(theme)} />,
                        }}
                      />
                      {attendees.length > 1 && !clientSecret && (
                        <IconButton
                          onClick={() => removeAttendee(index)}
                          sx={styles.removeButton(theme)}
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </Box>
                  ))}

                  {!clientSecret && (
                    <>
                      {attendees.length < 10 && (
                        <Button
                          type="button"
                          variant="outlined"
                          startIcon={<Add />}
                          onClick={addAttendee}
                          sx={styles.addButton}
                        >
                          Agregar asistente
                        </Button>
                      )}

                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={createPaymentIntentMutation.isPending || totalAmount === 0}
                        sx={styles.continueButton}
                      >
                        {createPaymentIntentMutation.isPending
                          ? 'Preparando pago...'
                          : `Continuar - $${totalAmount}`}
                      </Button>
                    </>
                  )}

                  {clientSecret && (
                    <Button variant="outlined" onClick={resetForm} sx={styles.backButton}>
                      ← Modificar asistentes
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Payment Form - Show only when clientSecret exists */}
          {clientSecret && (
            <Grid size={{ xs: 12, md: 7 }}>
              <Card sx={styles.card(theme)}>
                <CardContent>
                  <Box sx={styles.header}>
                    <CreditCard sx={styles.icon(theme)} />
                    <Typography variant="h5" sx={styles.cardTitle(theme)}>
                      Información de Pago
                    </Typography>
                  </Box>

                  {/* Stripe Elements with payment methods */}
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: 'stripe',
                        variables: {
                          fontFamily: 'system-ui, sans-serif',
                          colorPrimary: '#0570de',
                          colorBackground: '#ffffff',
                          colorText: '#30313d',
                          colorDanger: '#df1b41',
                          fontSizeBase: '16px',
                          spacingUnit: '2px',
                          borderRadius: '4px',
                        },
                      },
                      loader: 'auto',
                    }}
                  >
                    <CheckoutForm
                      event={event}
                      attendees={attendees}
                      clientSecret={clientSecret}
                      totalAmount={totalAmount}
                    />
                  </Elements>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

const styles = {
  container: (theme: any) => ({
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    py: 4,
  }),
  title: (theme: any) => ({
    textAlign: 'center',
    mb: 4,
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  }),
  card: (theme: any) => ({
    borderRadius: 2,
    boxShadow: theme.shadows[3],
  }),
  cardDisabled: (theme: any) => ({
    borderRadius: 2,
    boxShadow: theme.shadows[1],
    opacity: 0.7,
    backgroundColor: theme.palette.grey[50],
  }),
  eventTitle: (theme: any) => ({
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    mb: 2,
  }),
  eventDate: {
    mb: 1,
  },
  eventAddress: (theme: any) => ({
    color: theme.palette.text.secondary,
    mb: 3,
  }),
  priceBox: (theme: any) => ({
    textAlign: 'center',
    pt: 2,
    borderTop: `1px solid ${theme.palette.divider}`,
  }),
  price: {
    mb: 1,
  },
  total: (theme: any) => ({
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
  }),
  header: {
    display: 'flex',
    alignItems: 'center',
    mb: 3,
    gap: 2,
  },
  icon: (theme: any) => ({
    fontSize: 28,
    color: theme.palette.primary.main,
  }),
  cardTitle: (theme: any) => ({
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  }),
  errorAlert: {
    mb: 3,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  helper: (theme: any) => ({
    color: theme.palette.text.secondary,
  }),
  attendeeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  inputIcon: (theme: any) => ({
    color: theme.palette.text.secondary,
    mr: 1,
  }),
  removeButton: (theme: any) => ({
    color: theme.palette.error.main,
  }),
  addButton: {
    alignSelf: 'flex-start',
  },
  continueButton: {
    py: 2,
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  backButton: {
    mb: 3,
  },
  summary: (theme: any) => ({
    p: 2,
    backgroundColor: theme.palette.grey[50],
    borderRadius: 1,
    textAlign: 'center',
  }),
  summaryText: {
    fontSize: '1.1rem',
  },
  payButton: {
    py: 2,
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
};

export default PaymentForm;
