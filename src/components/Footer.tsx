import React from 'react';
import { Box, Typography, Container, IconButton, Divider, Grid, useTheme } from '@mui/material';
import { Instagram, X, LinkedIn, Facebook, Email, Phone } from '@mui/icons-material';

const Footer: React.FC = () => {
  const theme = useTheme();
  
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
    { icon: Instagram, href: 'https://instagram.com/serenamente', color: theme.palette.custom.social.instagram },
    { icon: X, href: 'https://x.com/serenamente', color: theme.palette.custom.social.x },
    { icon: LinkedIn, href: 'https://linkedin.com/company/serenamente', color: theme.palette.custom.social.linkedin },
    { icon: Facebook, href: 'https://facebook.com/serenamente', color: theme.palette.custom.social.facebook }
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.custom.footer.background,
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
              sx={{ mb: 2, fontWeight: theme.custom.fontWeight.bold, color: theme.palette.secondary.main }}
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
                    backgroundColor: theme.palette.custom.overlay.light,
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
              sx={{ mb: 2, fontWeight: theme.custom.fontWeight.bold }}
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
                    color: theme.palette.custom.overlay.dark,
                    textDecoration: 'none',
                    '&:hover': {
                      color: theme.palette.secondary.main,
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
              sx={{ mb: 2, fontWeight: theme.custom.fontWeight.bold }}
            >
              Contacto
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ color: theme.palette.secondary.main, fontSize: 20 }} />
                <Typography
                  component="a"
                  href="mailto:info@serenamente.com"
                  sx={{
                    color: theme.palette.custom.overlay.dark,
                    textDecoration: 'none',
                    '&:hover': { color: theme.palette.secondary.main }
                  }}
                >
                  info@serenamente.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ color: theme.palette.secondary.main, fontSize: 20 }} />
                <Typography
                  component="a"
                  href="tel:+1234567890"
                  sx={{
                    color: theme.palette.custom.overlay.dark,
                    textDecoration: 'none',
                    '&:hover': { color: theme.palette.secondary.main }
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
              sx={{ mb: 2, fontWeight: theme.custom.fontWeight.bold }}
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
                    color: theme.palette.custom.overlay.dark,
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    '&:hover': {
                      color: theme.palette.secondary.main,
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

        <Divider sx={{ my: 4, backgroundColor: theme.palette.custom.footer.divider }} />

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
            sx={{ color: theme.palette.custom.overlay.medium }}
          >
            © 2024 Serenamente. Todos los derechos reservados.
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.custom.overlay.medium }}
          >
            Hecho con ❤️ para transformar vidas
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;