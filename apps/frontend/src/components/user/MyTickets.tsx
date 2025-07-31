import {
  CalendarToday,
  LocationOn,
  Person,
  ConfirmationNumber as TicketIcon,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useUserTickets } from '../../hooks/useApi';

const MyTickets: React.FC = () => {
  const theme = useTheme();
  const { data: tickets = [], isLoading: loading, error } = useUserTickets();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <Box sx={styles.loadingContainer(theme)}>
        <Typography variant="h6">Cargando tus entradas...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.ticketsContainer(theme)}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h1" sx={styles.pageTitle(theme)}>
          Mis Entradas
        </Typography>

        {error && (
          <Alert severity="error" sx={styles.errorAlert}>
            {(error as any)?.response?.data?.message || 'Error al cargar las entradas'}
          </Alert>
        )}

        {tickets.length === 0 ? (
          <Card sx={styles.emptyCard(theme)}>
            <CardContent sx={styles.emptyContent}>
              <TicketIcon sx={styles.emptyIcon(theme)} />
              <Typography variant="h5" sx={styles.emptyTitle(theme)}>
                No tienes entradas aún
              </Typography>
              <Typography variant="body1" sx={styles.emptyText(theme)}>
                Cuando compres entradas para nuestros eventos, aparecerán aquí.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {tickets.map(ticket => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={ticket.id}>
                <Card sx={styles.ticketCard(theme)}>
                  <CardContent sx={styles.ticketContent}>
                    <Box sx={styles.ticketHeader}>
                      <TicketIcon sx={styles.ticketIcon(theme)} />
                      <Chip
                        label={ticket.isActive ? 'Activa' : 'Inactiva'}
                        color={ticket.isActive ? 'success' : 'error'}
                        size="small"
                        sx={styles.statusChip}
                      />
                    </Box>

                    <Typography variant="h5" sx={styles.eventName(theme)}>
                      {ticket.event.name}
                    </Typography>

                    <Box sx={styles.detailItem}>
                      <Person sx={styles.detailIcon(theme)} />
                      <Typography variant="body1" sx={styles.detailText(theme)}>
                        {ticket.nameOfAttendee}
                      </Typography>
                    </Box>

                    <Box sx={styles.detailItem}>
                      <CalendarToday sx={styles.detailIcon(theme)} />
                      <Typography variant="body1" sx={styles.detailText(theme)}>
                        {new Date(ticket.event.date).toLocaleDateString('es-ES', {
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
                      <Typography variant="body1" sx={styles.detailText(theme)}>
                        {ticket.event.address}
                      </Typography>
                    </Box>

                    <Box sx={styles.priceContainer(theme)}>
                      <Typography variant="h6" sx={styles.price(theme)}>
                        ${ticket.event.price}
                      </Typography>
                    </Box>

                    <Typography variant="body2" sx={styles.purchaseDate(theme)}>
                      Comprada el {new Date(ticket.createdAt).toLocaleDateString('es-ES')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
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
    pt: 12,
  }),
  ticketsContainer: (theme: any) => ({
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    pt: 12,
    pb: 4,
  }),
  pageTitle: (theme: any) => ({
    textAlign: 'center',
    mb: 4,
    color: theme.palette.primary.main,
    fontWeight: theme.custom.fontWeight.bold,
  }),
  errorAlert: {
    mb: 3,
  },
  emptyCard: (theme: any) => ({
    borderRadius: theme.custom.borderRadius.large,
    boxShadow: theme.palette.custom.shadow.light,
    backgroundColor: theme.palette.background.paper,
  }),
  emptyContent: {
    textAlign: 'center',
    py: 6,
  },
  emptyIcon: (theme: any) => ({
    fontSize: 80,
    color: theme.palette.text.secondary,
    mb: 2,
  }),
  emptyTitle: (theme: any) => ({
    color: theme.palette.text.primary,
    mb: 2,
    fontWeight: theme.custom.fontWeight.bold,
  }),
  emptyText: (theme: any) => ({
    color: theme.palette.text.secondary,
  }),
  ticketCard: (theme: any) => ({
    height: '100%',
    borderRadius: theme.custom.borderRadius.large,
    boxShadow: theme.palette.custom.shadow.medium,
    backgroundColor: theme.palette.background.paper,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.palette.custom.shadow.heavy,
    },
  }),
  ticketContent: {
    p: 3,
  },
  ticketHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
  },
  ticketIcon: (theme: any) => ({
    fontSize: 28,
    color: theme.palette.primary.main,
  }),
  statusChip: {
    fontWeight: 'bold',
  },
  eventName: (theme: any) => ({
    color: theme.palette.primary.main,
    fontWeight: theme.custom.fontWeight.bold,
    mb: 3,
  }),
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    mb: 2,
  },
  detailIcon: (theme: any) => ({
    fontSize: 20,
    color: theme.palette.text.secondary,
    mr: 1,
  }),
  detailText: (theme: any) => ({
    color: theme.palette.text.primary,
  }),
  priceContainer: (theme: any) => ({
    textAlign: 'center',
    mt: 3,
    mb: 2,
    py: 2,
    borderTop: `1px solid ${theme.palette.divider}`,
  }),
  price: (theme: any) => ({
    color: theme.palette.secondary.main,
    fontWeight: theme.custom.fontWeight.bold,
  }),
  purchaseDate: (theme: any) => ({
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: '0.85rem',
  }),
};

export default MyTickets;
