import { Box, Button, Container, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { Link } from 'react-scroll';

const Hero: React.FC = () => {
  const theme = useTheme();

  return (
    <Box id="hero" sx={styles.heroContainer(theme)}>
      <Container maxWidth="lg" sx={styles.contentContainer}>
        <Grid container spacing={4} sx={styles.gridContainer}>
          {/* Video Section */}
          <Grid size={{ xs: 12, md: 6 }} sx={styles.videoSection}>
            <Box sx={styles.videoContainer(theme)}>
              <Box
                component="video"
                sx={styles.video}
                autoPlay
                muted
                loop
                playsInline
                poster="/videos/hero-poster.jpg"
              >
                <source src="/videos/hero-video.mp4" type="video/mp4" />
                <source src="/videos/hero-video.webm" type="video/webm" />
                Tu navegador no soporta el elemento de video.
              </Box>
            </Box>
          </Grid>

          {/* Content Section */}
          <Grid size={{ xs: 12, md: 6 }} sx={styles.contentSection}>
            <Box sx={styles.textContent}>
              {/* Text content - hidden on mobile */}
              <Box sx={styles.heroTextContent}>
                <Typography variant="h1" component="h1" sx={styles.mainTitle(theme)}>
                  Conferencia Serenamente
                </Typography>

                <Typography variant="h4" component="h2" sx={styles.subtitle(theme)}>
                  Transformando vidas a través del bienestar mental y la serenidad
                </Typography>

                <Typography variant="h6" sx={styles.description}>
                  Únete a nosotros en una experiencia única de crecimiento personal y bienestar
                </Typography>
              </Box>

              {/* CTA Buttons - always visible */}
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
            </Box>
          </Grid>
        </Grid>
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

          @keyframes fadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
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
    pt: { xs: '80px', md: '80px' }, // Add top padding to account for fixed navbar
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
    width: '100%',
  },

  gridContainer: {
    minHeight: '80vh',
    alignItems: 'center',
  },

  videoSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    order: { xs: 1, md: 1 }, // Video first on mobile, first on desktop
    py: { xs: 2, md: 0 }, // Only padding on mobile
  },

  videoContainer: (theme: any) => ({
    width: { xs: '280px', md: '400px' },
    height: { xs: '380px', md: '640px' },
    maxWidth: { xs: '90vw', md: '400px' },
    borderRadius: theme.custom.borderRadius.medium,
    overflow: 'hidden',
    boxShadow: theme.palette.custom.shadow.heavy,
    animation: { xs: 'fadeInUp 1s ease-out', md: 'fadeInLeft 1s ease-out' },
    position: 'relative',
    aspectRatio: '9/16', // Portrait aspect ratio
    mx: 'auto', // Center the video
  }),

  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },

  contentSection: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    order: { xs: 2, md: 2 }, // Content second on mobile, second on desktop
  },

  textContent: {
    textAlign: { xs: 'center', md: 'left' },
    maxWidth: '100%',
    animation: { xs: 'fadeInUp 1s ease-out 0.3s both', md: 'fadeInRight 1s ease-out 0.3s both' },
    px: { xs: 2, md: 0 }, // Only horizontal padding on mobile
    py: { xs: 2, md: 0 }, // Only vertical padding on mobile
  },

  heroTextContent: {
    display: { xs: 'none', md: 'block' }, // Hide text on mobile, show on desktop
    mb: { md: 4 }, // Add margin bottom on desktop only
  },

  mainTitle: (theme: any) => ({
    fontSize: {
      xs: theme.custom.fontSize.section.xs,
      md: theme.custom.fontSize.hero.md,
      lg: theme.custom.fontSize.hero.lg,
    },
    fontWeight: theme.custom.fontWeight.bold,
    mb: 2,
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    lineHeight: 1.2,
  }),

  subtitle: (theme: any) => ({
    fontSize: {
      xs: '1.1rem',
      md: theme.custom.fontSize.subtitle.md,
      lg: theme.custom.fontSize.subtitle.lg,
    },
    mb: 3,
    fontWeight: theme.custom.fontWeight.light,
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    lineHeight: 1.4,
  }),

  description: {
    mb: 4,
    opacity: 0.9,
    maxWidth: { xs: '100%', md: '500px' },
    mx: { xs: 'auto', md: 0 },
    lineHeight: 1.6,
  },

  buttonContainer: {
    display: 'flex',
    gap: 2,
    justifyContent: { xs: 'center', md: 'flex-start' },
    flexWrap: 'wrap',
    mt: { xs: 0, md: 2 }, // No top margin on mobile, add margin on desktop
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
  }),
};

export default Hero;
