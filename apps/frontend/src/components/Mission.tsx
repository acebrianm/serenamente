import { Favorite, Nature, Person } from '@mui/icons-material';
import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';

const Mission: React.FC = () => {
  const theme = useTheme();
  const values = [
    {
      icon: Favorite,
      title: 'Bienestar Integral',
      description:
        'Promovemos un enfoque holístico que abarca mente, cuerpo y espíritu para alcanzar la verdadera serenidad.',
    },
    {
      icon: Nature,
      title: 'Conexión Natural',
      description:
        'Fomentamos la reconexión con nosotros mismos y nuestro entorno para encontrar paz interior.',
    },
    {
      icon: Person,
      title: 'Crecimiento Personal',
      description:
        'Facilitamos herramientas prácticas para el autodesarrollo y la transformación positiva.',
    },
  ];

  return (
    <Box id="mission" sx={styles.missionSection(theme)}>
      <Container maxWidth="lg" sx={styles.containerOverlay}>
        <Typography variant="h2" component="h2" sx={styles.sectionTitle(theme)}>
          Nuestra Misión
        </Typography>

        <Typography variant="h5" sx={styles.subtitle(theme)}>
          Transformando vidas a través del bienestar integral
        </Typography>

        <Typography variant="h6" sx={styles.description}>
          En Serenamente, creemos que cada persona merece vivir una vida plena y equilibrada.
          Nuestra misión es democratizar el acceso al conocimiento sobre bienestar mental y
          herramientas de crecimiento personal.
        </Typography>

        <Grid container spacing={4} sx={styles.valuesContainer}>
          {values.map((value, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Box sx={styles.valueCard(theme)}>
                <value.icon sx={styles.valueIcon} />
                <Typography variant="h6" component="h3" sx={styles.valueTitle(theme)}>
                  {value.title}
                </Typography>
                <Typography variant="body1" sx={styles.valueDescription}>
                  {value.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={styles.commitmentBox(theme)}>
          <Typography variant="h6" sx={styles.commitmentText}>
            Nos comprometemos a crear un espacio seguro donde cada participante pueda explorar,
            aprender y crecer en su camino hacia una vida más serena y consciente.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const styles = {
  missionSection: (theme: any) => ({
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
    },
  }),
  containerOverlay: {
    position: 'relative',
    zIndex: 1,
  },
  sectionTitle: (theme: any) => ({
    textAlign: 'center',
    mb: 2,
    fontWeight: theme.custom.fontWeight.bold,
    fontSize: { xs: theme.custom.fontSize.section.xs, md: theme.custom.fontSize.section.md },
  }),
  subtitle: (theme: any) => ({
    textAlign: 'center',
    mb: 4,
    opacity: 0.9,
    fontWeight: theme.custom.fontWeight.light,
  }),
  description: {
    textAlign: 'center',
    mb: 6,
    opacity: 0.9,
    maxWidth: '800px',
    mx: 'auto',
    lineHeight: 1.7,
  },
  valuesContainer: {
    mb: 6,
  },
  valueCard: (theme: any) => ({
    textAlign: 'center',
    p: 3,
    borderRadius: theme.custom.borderRadius.medium,
    backgroundColor: theme.palette.custom.overlay.light,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${theme.palette.custom.overlay.light}`,
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  }),
  valueIcon: {
    fontSize: 60,
    mb: 2,
    opacity: 0.9,
  },
  valueTitle: (theme: any) => ({
    mb: 2,
    fontWeight: theme.custom.fontWeight.bold,
  }),
  valueDescription: {
    lineHeight: 1.6,
    opacity: 0.9,
  },
  commitmentBox: (theme: any) => ({
    textAlign: 'center',
    p: 4,
    borderRadius: theme.custom.borderRadius.medium,
    backgroundColor: theme.palette.custom.overlay.light,
    backdropFilter: 'blur(10px)',
    border: `1px solid ${theme.palette.custom.overlay.light}`,
  }),
  commitmentText: {
    lineHeight: 1.7,
    fontStyle: 'italic',
    opacity: 0.95,
  },
};

export default Mission;
