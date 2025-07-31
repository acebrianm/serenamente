import { Group, Psychology, Schedule, Star } from '@mui/icons-material';
import { Box, Card, CardContent, Container, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';

const About: React.FC = () => {
  const theme = useTheme();
  const features = [
    {
      icon: Psychology,
      title: 'Expertos Reconocidos',
      description: 'Conferencistas de clase mundial en psicología y bienestar',
    },
    {
      icon: Group,
      title: 'Networking',
      description: 'Conecta con personas que comparten tu interés en el crecimiento personal',
    },
    {
      icon: Star,
      title: 'Experiencias Únicas',
      description: 'Talleres interactivos y sesiones de mindfulness en vivo',
    },
    {
      icon: Schedule,
      title: 'Contenido Práctico',
      description: 'Herramientas y técnicas que puedes aplicar inmediatamente',
    },
  ];

  return (
    <Box id="about" sx={styles.aboutSection}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" sx={styles.sectionTitle(theme)}>
          Acerca de Serenamente
        </Typography>

        <Box sx={styles.descriptionContainer}>
          <Typography variant="h6" sx={styles.descriptionText}>
            Serenamente es una experiencia; es un viaje transformador hacia el bienestar mental y
            emocional. Durante dos días intensivos, exploraremos las últimas investigaciones en
            psicología positiva, mindfulness y desarrollo personal.
          </Typography>

          <Typography variant="h6" sx={styles.descriptionText}>
            Nuestros expertos internacionales compartirán estrategias prácticas y herramientas que
            puedes implementar inmediatamente en tu vida diaria para alcanzar una mayor serenidad y
            equilibrio.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card sx={styles.featureCard(theme)}>
                <CardContent sx={styles.featureCardContent}>
                  <feature.icon sx={styles.featureIcon} />
                  <Typography variant="h6" component="h3" sx={styles.featureTitle(theme)}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={styles.featureDescription}>
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

const styles = {
  aboutSection: {
    py: 8,
    backgroundColor: 'background.default',
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
  },
  sectionTitle: (theme: any) => ({
    textAlign: 'center',
    mb: 6,
    fontWeight: theme.custom.fontWeight.bold,
    color: 'primary.main',
    fontSize: { xs: theme.custom.fontSize.section.xs, md: theme.custom.fontSize.section.md },
  }),
  descriptionContainer: {
    mb: 6,
    textAlign: 'center',
  },
  descriptionText: {
    mb: 3,
    color: 'text.secondary',
    maxWidth: '800px',
    mx: 'auto',
    lineHeight: 1.7,
  },
  featureCard: (theme: any) => ({
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: theme.palette.custom.shadow.heavy,
    },
    borderRadius: theme.custom.borderRadius.medium,
    border: `1px solid ${theme.palette.custom.overlay.light}`,
  }),
  featureCardContent: {
    p: 3,
  },
  featureIcon: {
    fontSize: 60,
    color: 'primary.main',
    mb: 2,
  },
  featureTitle: (theme: any) => ({
    mb: 2,
    fontWeight: theme.custom.fontWeight.bold,
    color: 'primary.main',
  }),
  featureDescription: {
    lineHeight: 1.6,
  },
};

export default About;
