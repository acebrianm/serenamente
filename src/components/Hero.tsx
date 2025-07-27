import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-scroll';

const Hero: React.FC = () => {

  return (
    <Box
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
            fontWeight: 'bold',
            mb: 2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            animation: 'fadeInUp 1s ease-out'
          }}
        >
          Conferencia Serenamente
        </Typography>
        
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontSize: { xs: '1.2rem', md: '1.8rem', lg: '2rem' },
            mb: 3,
            fontWeight: 300,
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            animation: 'fadeInUp 1s ease-out 0.2s both'
          }}
        >
          Transformando vidas a través del bienestar mental y la serenidad
        </Typography>
        
        <Typography
          variant="h6"
          sx={{
            mb: 4,
            opacity: 0.9,
            maxWidth: '600px',
            mx: 'auto',
            animation: 'fadeInUp 1s ease-out 0.4s both'
          }}
        >
          Únete a nosotros en una experiencia única de crecimiento personal y bienestar
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="tickets" smooth={true} duration={500} style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.2rem',
                borderRadius: '50px',
                backgroundColor: '#ff4081',
                '&:hover': {
                  backgroundColor: '#e91e63',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s ease',
                animation: 'fadeInUp 1s ease-out 0.6s both',
                boxShadow: '0 8px 25px rgba(255, 64, 129, 0.3)'
              }}
            >
              Comprar Entradas
            </Button>
          </Link>
          
          <Link to="about" smooth={true} duration={500} style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.2rem',
                borderRadius: '50px',
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'white',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.3s ease',
                animation: 'fadeInUp 1s ease-out 0.8s both'
              }}
            >
              Saber Más
            </Button>
          </Link>
        </Box>
      </Container>
      
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Hero;