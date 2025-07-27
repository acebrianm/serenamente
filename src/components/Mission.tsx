import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { Favorite, Nature, Person } from '@mui/icons-material';

const Mission: React.FC = () => {
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
        background: 'linear-gradient(135deg, #0066ff 0%, #004bb5 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="rgba(255,255,255,0.03)" fill-rule="evenodd"%3E%3Cpath d="M20 20c0-11.046-8.954-20-20-20v20h20zm0 0c11.046 0 20 8.954 20 20H20V20z"/%3E%3C/g%3E%3C/svg%3E")',
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
            fontWeight: 'bold',
            fontSize: { xs: '2.5rem', md: '3.5rem' }
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
            fontWeight: 300
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
                  borderRadius: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
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
                  sx={{ mb: 2, fontWeight: 'bold' }}
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
            borderRadius: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
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