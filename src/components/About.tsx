import React from 'react';
import { Box, Typography, Container, Card, CardContent, Grid } from '@mui/material';
import { Psychology, Group, Star, Schedule } from '@mui/icons-material';

const About: React.FC = () => {
  const features = [
    {
      icon: Psychology,
      title: 'Expertos Reconocidos',
      description: 'Conferencistas de clase mundial en psicología y bienestar'
    },
    {
      icon: Group,
      title: 'Networking',
      description: 'Conecta con personas que comparten tu interés en el crecimiento personal'
    },
    {
      icon: Star,
      title: 'Experiencias Únicas',
      description: 'Talleres interactivos y sesiones de mindfulness en vivo'
    },
    {
      icon: Schedule,
      title: 'Contenido Práctico',
      description: 'Herramientas y técnicas que puedes aplicar inmediatamente'
    }
  ];

  return (
    <Box
      id="about"
      sx={{
        py: 8,
        backgroundColor: 'background.default',
        minHeight: '80vh',
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
            mb: 6,
            fontWeight: 'bold',
            color: 'primary.main',
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}
        >
          Acerca de la Conferencia
        </Typography>

        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.7
            }}
          >
            Serenamente es más que una conferencia; es un viaje transformador hacia el bienestar mental y emocional. Durante dos días intensivos, exploraremos las últimas investigaciones en psicología positiva, mindfulness y desarrollo personal.
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.7
            }}
          >
            Nuestros expertos internacionales compartirán estrategias prácticas y herramientas que puedes implementar inmediatamente en tu vida diaria para alcanzar una mayor serenidad y equilibrio.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 12px 25px rgba(0,0,0,0.15)'
                  },
                  borderRadius: 3,
                  border: '1px solid rgba(0, 102, 255, 0.1)'
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <feature.icon
                    sx={{
                      fontSize: 60,
                      color: 'primary.main',
                      mb: 2
                    }}
                  />
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About;