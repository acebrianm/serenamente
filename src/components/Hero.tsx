import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Link } from 'react-scroll';

const Hero: React.FC = () => {
  const theme = useTheme();

  return (
    <Box id="hero" sx={styles.heroContainer(theme)}>
      <Container maxWidth="lg" sx={styles.contentContainer}>
        <Typography variant="h1" component="h1" sx={styles.mainTitle(theme)}>
          Conferencia Serenamente
        </Typography>

        <Typography variant="h4" component="h2" sx={styles.subtitle(theme)}>
          Transformando vidas a través del bienestar mental y la serenidad
        </Typography>

        <Typography variant="h6" sx={styles.description}>
          Únete a nosotros en una experiencia única de crecimiento personal y bienestar
        </Typography>

        <Box sx={styles.buttonContainer}>
          <Link to="tickets" smooth={true} duration={500} style={{ textDecoration: 'none' }}>
            <Button variant="contained" size="large" sx={styles.primaryButton(theme)}>
              Comprar Entradas
            </Button>
          </Link>

          <Link to="about" smooth={true} duration={500} style={{ textDecoration: 'none' }}>
            <Button variant="outlined" size="large" sx={styles.secondaryButton(theme)}>
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

const styles = {
  heroContainer: (theme: any) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.custom.hero.gradient,
    color: 'white',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.palette.custom.hero.overlay,
    },
  }),

  contentContainer: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
  },

  mainTitle: (theme: any) => ({
    fontSize: {
      xs: theme.custom.fontSize.hero.xs,
      md: theme.custom.fontSize.hero.md,
      lg: theme.custom.fontSize.hero.lg,
    },
    fontWeight: theme.custom.fontWeight.bold,
    mb: 2,
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    animation: 'fadeInUp 1s ease-out',
  }),

  subtitle: (theme: any) => ({
    fontSize: {
      xs: theme.custom.fontSize.subtitle.xs,
      md: theme.custom.fontSize.subtitle.md,
      lg: theme.custom.fontSize.subtitle.lg,
    },
    mb: 3,
    fontWeight: theme.custom.fontWeight.light,
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    animation: 'fadeInUp 1s ease-out 0.2s both',
  }),

  description: {
    mb: 4,
    opacity: 0.9,
    maxWidth: '600px',
    mx: 'auto',
    animation: 'fadeInUp 1s ease-out 0.4s both',
  },

  buttonContainer: {
    display: 'flex',
    gap: 2,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  primaryButton: (theme: any) => ({
    px: 4,
    py: 2,
    fontSize: theme.custom.fontSize.subtitle.xs,
    borderRadius: theme.custom.borderRadius.round,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
      transform: 'scale(1.05)',
    },
    transition: 'all 0.3s ease',
    animation: 'fadeInUp 1s ease-out 0.6s both',
    boxShadow: theme.palette.custom.shadow.colored,
  }),

  secondaryButton: (theme: any) => ({
    px: 4,
    py: 2,
    fontSize: theme.custom.fontSize.subtitle.xs,
    borderRadius: theme.custom.borderRadius.round,
    borderColor: 'white',
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.custom.overlay.light,
      borderColor: 'white',
      transform: 'scale(1.05)',
    },
    transition: 'all 0.3s ease',
    animation: 'fadeInUp 1s ease-out 0.8s both',
  }),
};

export default Hero;
