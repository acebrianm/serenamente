import React from 'react';
import { Box, Typography, Container, Grid, useTheme } from '@mui/material';
import { Favorite, Nature, Person } from '@mui/icons-material';

const Mission: React.FC = () => {
  const theme = useTheme();
  const values = [
    {
      icon: Favorite,
      title: 'Bienestar Integral',
      description: 'Promovemos un enfoque holístico que abarca mente, cuerpo y espíritu para alcanzar la verdadera serenidad.'
    },
    {
      icon: Nature,
      title: 'Conexión Natural',
      description: 'Fomentamos la reconexión con nosotros mismos y nuestro entorno para encontrar paz interior.'
    },
    {
      icon: Person,
      title: 'Crecimiento Personal',
      description: 'Facilitamos herramientas prácticas para el autodesarrollo y la transformación positiva.'
    }
  ];

  return (
    <Box
      id="mission"
      sx={{
        py: 8,
        backgroundColor: 'primary.main',
        color: 'white',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        background: theme.palette.custom.mission.gradient,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme.palette.custom.mission.pattern,
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 2,
            fontWeight: theme.custom.fontWeight.bold,
            fontSize: { xs: theme.custom.fontSize.section.xs, md: theme.custom.fontSize.section.md }
          }}
        >
          Nuestra Misión
        </Typography>

        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            mb: 4,
            opacity: 0.9,
            fontWeight: theme.custom.fontWeight.light
          }}
        >
          Transformando vidas a través del bienestar integral
        </Typography>

        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            mb: 6,
            opacity: 0.9,
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.7
          }}
        >
          En Serenamente, creemos que cada persona merece vivir una vida plena y equilibrada. Nuestra misión es democratizar el acceso al conocimiento sobre bienestar mental y herramientas de crecimiento personal.
        </Typography>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {values.map((value, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Box
                sx={{
                  textAlign: 'center',
                  p: 3,
                  borderRadius: theme.custom.borderRadius.medium,
                  backgroundColor: theme.palette.custom.overlay.light,
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${theme.palette.custom.overlay.light}`,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  }
                }}
              >
                <value.icon
                  sx={{
                    fontSize: 60,
                    mb: 2,
                    opacity: 0.9
                  }}
                />
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ mb: 2, fontWeight: theme.custom.fontWeight.bold }}
                >
                  {value.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.6, opacity: 0.9 }}
                >
                  {value.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            textAlign: 'center',
            p: 4,
            borderRadius: theme.custom.borderRadius.medium,
            backgroundColor: theme.palette.custom.overlay.light,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${theme.palette.custom.overlay.light}`,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              lineHeight: 1.7,
              fontStyle: 'italic',
              opacity: 0.95
            }}
          >
            Nos comprometemos a crear un espacio seguro donde cada participante pueda explorar, aprender y crecer en su camino hacia una vida más serena y consciente.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Mission;