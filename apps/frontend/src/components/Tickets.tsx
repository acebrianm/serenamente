import { Check, Event, LocalOffer, Star } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';

const Tickets: React.FC = () => {
  const theme = useTheme();
  const tickets = [
    {
      name: 'Acceso General',
      price: '$150',
      originalPrice: '$200',
      features: [
        'Acceso completo a todas las conferencias',
        'Material de apoyo digital',
        'Certificado de participación',
        'Coffee breaks incluidos',
      ],
      popular: false,
      ribbon: 'Oferta Especial',
    },
    {
      name: 'VIP Experience',
      price: '$300',
      originalPrice: '$400',
      features: [
        'Todo lo incluido en Acceso General',
        'Sesión exclusiva con los ponentes',
        'Kit de bienvenida premium',
        'Almuerzo gourmet incluido',
        'Acceso prioritario a talleres',
        'Networking exclusivo',
      ],
      popular: true,
      ribbon: 'Más Popular',
    },
  ];

  const eventInfo = {
    date: 'Marzo 15-16, 2024',
    location: 'Centro de Convenciones Internacional',
    duration: '2 días completos de transformación',
  };

  return (
    <Box id="tickets" sx={styles.ticketsSection(theme)}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" sx={styles.sectionTitle(theme)}>
          Entradas
        </Typography>

        <Typography variant="h5" sx={styles.subtitle(theme)}>
          ¡Asegura tu lugar en esta experiencia transformadora!
        </Typography>

        <Box sx={styles.urgencyBanner(theme)}>
          <LocalOffer sx={styles.urgencyIcon} />
          <Typography variant="h6" component="span" sx={styles.urgencyText(theme)}>
            Cupos Limitados - ¡Solo quedan pocas entradas!
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {tickets.map((ticket, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Card sx={styles.ticketCard(theme, ticket.popular)}>
                {ticket.popular && (
                  <Chip label={ticket.ribbon} sx={styles.popularChip(theme)} icon={<Star />} />
                )}

                <CardContent sx={styles.ticketCardContent}>
                  <Typography variant="h4" component="h3" sx={styles.ticketName(theme)}>
                    {ticket.name}
                  </Typography>

                  <Box sx={styles.priceContainer}>
                    <Typography variant="h3" component="span" sx={styles.ticketPrice(theme)}>
                      {ticket.price}
                    </Typography>
                    <Typography variant="h6" component="span" sx={styles.originalPrice}>
                      {ticket.originalPrice}
                    </Typography>
                  </Box>

                  <Box sx={styles.featuresContainer}>
                    {ticket.features.map((feature, featureIndex) => (
                      <Box key={featureIndex} sx={styles.featureItem}>
                        <Check sx={styles.checkIcon(theme)} />
                        <Typography variant="body1">{feature}</Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    variant={ticket.popular ? 'contained' : 'outlined'}
                    size="large"
                    fullWidth
                    sx={styles.purchaseButton(theme, ticket.popular)}
                  >
                    Comprar Ahora
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={styles.eventInfoBox(theme)}>
          <Event sx={styles.eventIcon} />
          <Typography variant="h5" sx={styles.eventDate(theme)}>
            {eventInfo.date}
          </Typography>
          <Typography variant="h6" sx={styles.eventLocation}>
            {eventInfo.location}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {eventInfo.duration}
          </Typography>
        </Box>

        <Typography variant="body1" sx={styles.guaranteeText}>
          Garantía de satisfacción del 100% o devolución del dinero
        </Typography>
      </Container>
    </Box>
  );
};

const styles = {
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
    mb: 2,
    color: 'text.secondary',
    fontWeight: theme.custom.fontWeight.light,
  }),
  urgencyBanner: (theme: any) => ({
    textAlign: 'center',
    mb: 6,
    p: 2,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.custom.borderRadius.small,
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
  ticketCard: (theme: any, isPopular: boolean) => ({
    height: '100%',
    position: 'relative',
    border: isPopular ? `3px solid ${theme.palette.secondary.main}` : '1px solid #e0e0e0',
    borderRadius: theme.custom.borderRadius.medium,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: theme.palette.custom.shadow.heavy,
    },
  }),
  popularChip: (theme: any) => ({
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    fontWeight: 'bold',
    zIndex: 1,
  }),
  ticketCardContent: {
    p: 4,
    textAlign: 'center',
  },
  ticketName: (theme: any) => ({
    mb: 2,
    fontWeight: theme.custom.fontWeight.bold,
    color: 'primary.main',
  }),
  priceContainer: {
    mb: 3,
  },
  ticketPrice: (theme: any) => ({
    fontWeight: theme.custom.fontWeight.bold,
    color: theme.palette.secondary.main,
  }),
  originalPrice: {
    ml: 2,
    textDecoration: 'line-through',
    color: 'text.secondary',
  },
  featuresContainer: {
    mb: 4,
    textAlign: 'left',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    mb: 1,
  },
  checkIcon: (theme: any) => ({
    color: theme.palette.custom.success,
    mr: 2,
    fontSize: 20,
  }),
  purchaseButton: (theme: any, isPopular: boolean) => ({
    py: 2,
    fontSize: '1.1rem',
    borderRadius: theme.custom.borderRadius.small,
    ...(isPopular && {
      backgroundColor: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
      },
    }),
  }),
  eventInfoBox: (theme: any) => ({
    textAlign: 'center',
    p: 4,
    backgroundColor: 'white',
    borderRadius: theme.custom.borderRadius.medium,
    boxShadow: theme.palette.custom.shadow.light,
    mb: 4,
  }),
  eventIcon: {
    fontSize: 40,
    color: 'primary.main',
    mb: 2,
  },
  eventDate: (theme: any) => ({
    mb: 2,
    fontWeight: theme.custom.fontWeight.bold,
    color: 'primary.main',
  }),
  eventLocation: {
    mb: 1,
    color: 'text.secondary',
  },
  guaranteeText: {
    textAlign: 'center',
    color: 'text.secondary',
    fontStyle: 'italic',
  },
};

export default Tickets;
