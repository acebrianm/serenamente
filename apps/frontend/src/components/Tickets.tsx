import { CalendarToday, LocalOffer, LocationOn } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../hooks/useApi';
import { Event } from '../services/api';
import PaymentForm from './payment/PaymentForm';

const Tickets: React.FC = () => {
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
  const { data: events = [], isLoading: loading, error } = useEvents({ adminView: false });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  // Filter active events
  console.log('events: ', events);

  const handlePurchase = (event: Event) => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    setSelectedEvent(event);
    setPaymentDialogOpen(true);
  };

  const handleClosePaymentDialog = () => {
    setPaymentDialogOpen(false);
    setSelectedEvent(null);
  };

  if (loading) {
    return (
      <Box sx={styles.loadingContainer(theme)}>
        <Typography variant="h6">Cargando eventos...</Typography>
      </Box>
    );
  }

  return (
    <Box id="tickets" sx={styles.ticketsSection(theme)}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" sx={styles.sectionTitle(theme)}>
          Eventos Disponibles
        </Typography>

        <Typography variant="h5" sx={styles.subtitle(theme)}>
          ¡Asegura tu lugar en estas experiencias transformadoras!
        </Typography>

        {error && (
          <Alert severity="error" sx={styles.errorAlert}>
            {(error as any)?.response?.data?.message || 'Error al cargar eventos'}
          </Alert>
        )}

        {events.length === 0 ? (
          <Box sx={styles.noEventsContainer(theme)}>
            <Typography variant="h5" sx={styles.noEventsTitle(theme)}>
              No hay eventos disponibles en este momento
            </Typography>
            <Typography variant="body1" sx={styles.noEventsText(theme)}>
              Mantente atento a nuestras próximas experiencias transformadoras.
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={styles.urgencyBanner(theme)}>
              <LocalOffer sx={styles.urgencyIcon} />
              <Typography variant="h6" component="span" sx={styles.urgencyText(theme)}>
                Cupos Limitados - ¡Reserva tu lugar ahora!
              </Typography>
            </Box>

            <Grid container spacing={4} sx={{ mb: 6 }}>
              {events.map((event, _index) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={event.id}>
                  <Card sx={styles.eventCard(theme)}>
                    <CardContent sx={styles.eventCardContent}>
                      <Typography variant="h4" component="h3" sx={styles.eventName(theme)}>
                        {event.name}
                      </Typography>

                      <Typography variant="body2" sx={styles.eventDescription}>
                        {event.description}
                      </Typography>

                      <Box sx={styles.eventDetails}>
                        <Box sx={styles.detailItem}>
                          <CalendarToday sx={styles.detailIcon(theme)} />
                          <Typography variant="body2">
                            {new Date(event.date).toLocaleDateString('es-ES', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </Typography>
                        </Box>

                        <Box sx={styles.detailItem}>
                          <LocationOn sx={styles.detailIcon(theme)} />
                          <Typography variant="body2">{event.address}</Typography>
                        </Box>
                      </Box>

                      <Box sx={styles.priceContainer(theme)}>
                        <Typography variant="h3" component="span" sx={styles.eventPrice(theme)}>
                          ${event.price}
                        </Typography>
                      </Box>

                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={() => handlePurchase(event)}
                        sx={styles.purchaseButton(theme)}
                      >
                        {isAuthenticated ? 'Comprar Entrada' : 'Iniciar Sesión para Comprar'}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        <Typography variant="body1" sx={styles.guaranteeText}>
          Garantía de satisfacción del 100% o devolución del dinero
        </Typography>
      </Container>

      <Dialog open={paymentDialogOpen} onClose={handleClosePaymentDialog} maxWidth="lg" fullWidth>
        <DialogTitle sx={styles.dialogTitle(theme)}>Completar Compra</DialogTitle>
        <DialogContent>{selectedEvent && <PaymentForm event={selectedEvent} />}</DialogContent>
      </Dialog>
    </Box>
  );
};

const styles = {
  loadingContainer: (theme: any) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
  }),
  ticketsSection: (theme: any) => ({
    py: 8,
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
  }),
  sectionTitle: (theme: any) => ({
    textAlign: 'center',
    mb: 2,
    fontWeight: theme.custom.fontWeight.bold,
    color: 'primary.main',
    fontSize: { xs: theme.custom.fontSize.section.xs, md: theme.custom.fontSize.section.md },
  }),
  subtitle: (theme: any) => ({
    textAlign: 'center',
    mb: 4,
    color: 'text.secondary',
    fontWeight: theme.custom.fontWeight.light,
  }),
  errorAlert: {
    mb: 3,
  },
  noEventsContainer: (_theme: any) => ({
    textAlign: 'center',
    py: 8,
  }),
  noEventsTitle: (theme: any) => ({
    color: theme.palette.text.primary,
    fontWeight: theme.custom.fontWeight.bold,
    mb: 2,
  }),
  noEventsText: (theme: any) => ({
    color: theme.palette.text.secondary,
  }),
  urgencyBanner: (theme: any) => ({
    textAlign: 'center',
    mb: 6,
    p: 2,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.custom.borderRadius.medium,
    color: 'white',
    maxWidth: '600px',
    mx: 'auto',
  }),
  urgencyIcon: {
    mr: 1,
    verticalAlign: 'middle',
  },
  urgencyText: (theme: any) => ({
    fontWeight: theme.custom.fontWeight.bold,
  }),
  eventCard: (theme: any) => ({
    height: '100%',
    borderRadius: theme.custom.borderRadius.large,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    boxShadow: theme.palette.custom.shadow.medium,
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: theme.palette.custom.shadow.heavy,
    },
  }),
  eventCardContent: {
    p: 3,
    textAlign: 'center',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  eventName: (theme: any) => ({
    mb: 2,
    fontWeight: theme.custom.fontWeight.bold,
    color: 'primary.main',
  }),
  eventDescription: {
    mb: 3,
    color: 'text.secondary',
    textAlign: 'left',
    flex: 1,
  },
  eventDetails: {
    mb: 3,
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    mb: 1,
    textAlign: 'left',
  },
  detailIcon: (theme: any) => ({
    fontSize: 16,
    color: theme.palette.text.secondary,
    mr: 1,
  }),
  priceContainer: (theme: any) => ({
    mb: 3,
    py: 2,
    borderTop: `1px solid ${theme.palette.divider}`,
  }),
  eventPrice: (theme: any) => ({
    fontWeight: theme.custom.fontWeight.bold,
    color: theme.palette.secondary.main,
  }),
  purchaseButton: (theme: any) => ({
    py: 2,
    fontSize: '1.1rem',
    borderRadius: theme.custom.borderRadius.medium,
    fontWeight: theme.custom.fontWeight.bold,
  }),
  guaranteeText: {
    textAlign: 'center',
    color: 'text.secondary',
    fontStyle: 'italic',
    mt: 4,
  },
  dialogTitle: (theme: any) => ({
    color: theme.palette.primary.main,
    fontWeight: theme.custom.fontWeight.bold,
  }),
};

export default Tickets;
