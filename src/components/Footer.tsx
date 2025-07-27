import React from 'react';
import { Box, Typography, Container, IconButton, Divider, Grid } from '@mui/material';
import { Instagram, X, LinkedIn, Facebook, Email, Phone } from '@mui/icons-material';

const Footer: React.FC = () => {
  const links = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Acerca de', href: '#about' },
    { label: 'Misión', href: '#mission' },
    { label: 'Entradas', href: '#tickets' },
    { label: 'Contacto', href: '#contact' }
  ];

  const legalLinks = [
    { label: 'Política de Privacidad', href: '#' },
    { label: 'Términos y Condiciones', href: '#' },
    { label: 'Política de Cookies', href: '#' }
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/serenamente', color: '#E4405F' },
    { icon: X, href: 'https://x.com/serenamente', color: '#000000' },
    { icon: LinkedIn, href: 'https://linkedin.com/company/serenamente', color: '#0077B5' },
    { icon: Facebook, href: 'https://facebook.com/serenamente', color: '#1877F2' }
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1a1a1a',
        color: 'white',
        pt: 6,
        pb: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h4"
              component="h3"
              sx={{ mb: 2, fontWeight: 'bold', color: '#ff4081' }}
            >
              Serenamente
            </Typography>
            <Typography
              variant="body1"
              sx={{ mb: 3, opacity: 0.8, lineHeight: 1.6 }}
            >
              Transformando vidas a través del bienestar integral
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      backgroundColor: social.color,
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <social.icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography
              variant="h6"
              component="h4"
              sx={{ mb: 2, fontWeight: 'bold' }}
            >
              Enlaces Rápidos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {links.map((link, index) => (
                <Typography
                  key={index}
                  component="a"
                  href={link.href}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#ff4081',
                      textDecoration: 'underline',
                    },
                    transition: 'color 0.3s ease'
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography
              variant="h6"
              component="h4"
              sx={{ mb: 2, fontWeight: 'bold' }}
            >
              Contacto
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: '#ff4081', fontSize: 20 }} />
                <Typography
                  component="a"
                  href="mailto:info@serenamente.com"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    '&:hover': { color: '#ff4081' }
                  }}
                >
                  info@serenamente.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ color: '#ff4081', fontSize: 20 }} />
                <Typography
                  component="a"
                  href="tel:+1234567890"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    '&:hover': { color: '#ff4081' }
                  }}
                >
                  +1 234 567 890
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="h6"
              component="h4"
              sx={{ mb: 2, fontWeight: 'bold' }}
            >
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {legalLinks.map((link, index) => (
                <Typography
                  key={index}
                  component="a"
                  href={link.href}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    '&:hover': {
                      color: '#ff4081',
                      textDecoration: 'underline',
                    },
                    transition: 'color 0.3s ease'
                  }}
                >
                  {link.label}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            © 2024 Serenamente. Todos los derechos reservados.
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            Hecho con ❤️ para transformar vidas
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;