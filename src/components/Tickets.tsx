import React from 'react';
import { Box, Typography, Container, Button, Card, CardContent, Chip, Grid, useTheme } from '@mui/material';
import { Star, Check, LocalOffer, Event } from '@mui/icons-material';

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
        'Coffee breaks incluidos'
      ],
      popular: false,
      ribbon: 'Oferta Especial'
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
        'Networking exclusivo'
      ],
      popular: true,
      ribbon: 'Más Popular'
    }
  ];

  const eventInfo = {
    date: 'Marzo 15-16, 2024',
    location: 'Centro de Convenciones Internacional',
    duration: '2 días completos de transformación'
  };

  return (
    <Box
      id="tickets"
      sx={{
        py: 8,
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 2,
            fontWeight: theme.custom.fontWeight.bold,
            color: 'primary.main',
            fontSize: { xs: theme.custom.fontSize.section.xs, md: theme.custom.fontSize.section.md }
          }}
        >
          Entradas
        </Typography>

        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            mb: 2,
            color: 'text.secondary',
            fontWeight: theme.custom.fontWeight.light
          }}
        >
          ¡Asegura tu lugar en esta experiencia transformadora!
        </Typography>

        <Box
          sx={{
            textAlign: 'center',
            mb: 6,
            p: 2,
            backgroundColor: theme.palette.secondary.main,
            borderRadius: theme.custom.borderRadius.small,
            color: 'white',
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          <LocalOffer sx={{ mr: 1, verticalAlign: 'middle' }} />
          <Typography variant="h6" component="span" sx={{ fontWeight: theme.custom.fontWeight.bold }}>
            Cupos Limitados - ¡Solo quedan pocas entradas!
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {tickets.map((ticket, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  border: ticket.popular ? `3px solid ${theme.palette.secondary.main}` : '1px solid #e0e0e0',
                  borderRadius: theme.custom.borderRadius.medium,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: theme.palette.custom.shadow.heavy
                  }
                }}
              >
                {ticket.popular && (
                  <Chip
                    label={ticket.ribbon}
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: theme.palette.secondary.main,
                      color: 'white',
                      fontWeight: 'bold',
                      zIndex: 1
                    }}
                    icon={<Star />}
                  />
                )}

                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h4" component="h3" sx={{ mb: 2, fontWeight: theme.custom.fontWeight.bold, color: 'primary.main' }}>
                    {ticket.name}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="h3"
                      component="span"
                      sx={{ fontWeight: theme.custom.fontWeight.bold, color: theme.palette.secondary.main }}
                    >
                      {ticket.price}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="span"
                      sx={{
                        ml: 2,
                        textDecoration: 'line-through',
                        color: 'text.secondary'
                      }}
                    >
                      {ticket.originalPrice}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 4, textAlign: 'left' }}>
                    {ticket.features.map((feature, featureIndex) => (
                      <Box key={featureIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Check sx={{ color: theme.palette.custom.success, mr: 2, fontSize: 20 }} />
                        <Typography variant="body1">
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    variant={ticket.popular ? 'contained' : 'outlined'}
                    size="large"
                    fullWidth
                    sx={{
                      py: 2,
                      fontSize: '1.1rem',
                      borderRadius: theme.custom.borderRadius.small,
                      ...(ticket.popular && {
                        backgroundColor: theme.palette.secondary.main,
                        '&:hover': {
                          backgroundColor: theme.palette.secondary.dark,
                        }
                      })
                    }}
                  >
                    Comprar Ahora
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            textAlign: 'center',
            p: 4,
            backgroundColor: 'white',
            borderRadius: theme.custom.borderRadius.medium,
            boxShadow: theme.palette.custom.shadow.light,
            mb: 4
          }}
        >
          <Event sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 2, fontWeight: theme.custom.fontWeight.bold, color: 'primary.main' }}>
            {eventInfo.date}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1, color: 'text.secondary' }}>
            {eventInfo.location}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {eventInfo.duration}
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            fontStyle: 'italic'
          }}
        >
          Garantía de satisfacción del 100% o devolución del dinero
        </Typography>
      </Container>
    </Box>
  );
};

export default Tickets;