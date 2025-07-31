import { Email, Facebook, Instagram, LinkedIn, Phone, X } from '@mui/icons-material';
import { Box, Container, Divider, Grid, IconButton, Typography, useTheme } from '@mui/material';
import React from 'react';

const Footer: React.FC = () => {
  const theme = useTheme();

  const links = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Acerca de', href: '#about' },
    { label: 'Misión', href: '#mission' },
    { label: 'Entradas', href: '#tickets' },
    { label: 'Contacto', href: '#contact' },
  ];

  const legalLinks = [
    { label: 'Política de Privacidad', href: '#' },
    { label: 'Términos y Condiciones', href: '#' },
    { label: 'Política de Cookies', href: '#' },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://instagram.com/serenamente',
      color: theme.palette.custom.social.instagram,
    },
    { icon: X, href: 'https://x.com/serenamente', color: theme.palette.custom.social.x },
    {
      icon: LinkedIn,
      href: 'https://linkedin.com/company/serenamente',
      color: theme.palette.custom.social.linkedin,
    },
    {
      icon: Facebook,
      href: 'https://facebook.com/serenamente',
      color: theme.palette.custom.social.facebook,
    },
  ];

  return (
    <Box component="footer" sx={styles.footerContainer(theme)}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h4" component="h3" sx={styles.brandTitle(theme)}>
              Serenamente
            </Typography>
            <Typography variant="body1" sx={styles.brandDescription}>
              Transformando vidas a través del bienestar integral
            </Typography>
            <Box sx={styles.socialContainer}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={styles.socialButton(theme, social.color)}
                >
                  <social.icon />
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Typography variant="h6" component="h4" sx={styles.sectionTitle(theme)}>
              Enlaces Rápidos
            </Typography>
            <Box sx={styles.linksContainer}>
              {links.map((link, index) => (
                <Typography key={index} component="a" href={link.href} sx={styles.linkItem(theme)}>
                  {link.label}
                </Typography>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" component="h4" sx={styles.sectionTitle(theme)}>
              Contacto
            </Typography>
            <Box sx={styles.contactContainer}>
              <Box sx={styles.contactItem}>
                <Email sx={styles.contactIcon(theme)} />
                <Typography
                  component="a"
                  href="mailto:info@serenamente.com"
                  sx={styles.contactLink(theme)}
                >
                  info@serenamente.com
                </Typography>
              </Box>
              <Box sx={styles.contactItem}>
                <Phone sx={styles.contactIcon(theme)} />
                <Typography component="a" href="tel:+1234567890" sx={styles.contactLink(theme)}>
                  +1 234 567 890
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" component="h4" sx={styles.sectionTitle(theme)}>
              Legal
            </Typography>
            <Box sx={styles.linksContainer}>
              {legalLinks.map((link, index) => (
                <Typography
                  key={index}
                  component="a"
                  href={link.href}
                  sx={styles.legalLinkItem(theme)}
                >
                  {link.label}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={styles.divider(theme)} />

        <Box sx={styles.bottomSection}>
          <Typography variant="body2" sx={styles.copyrightText(theme)}>
            © 2024 Serenamente. Todos los derechos reservados.
          </Typography>
          <Typography variant="body2" sx={styles.copyrightText(theme)}>
            Hecho con ❤️ para transformar vidas
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const styles = {
  footerContainer: (theme: any) => ({
    backgroundColor: theme.palette.custom.footer.background,
    color: 'white',
    pt: 6,
    pb: 3,
  }),
  brandTitle: (theme: any) => ({
    mb: 2,
    fontWeight: theme.custom.fontWeight.bold,
    color: theme.palette.secondary.main,
  }),
  brandDescription: {
    mb: 3,
    opacity: 0.8,
    lineHeight: 1.6,
  },
  socialContainer: {
    display: 'flex',
    gap: 1,
  },
  socialButton: (theme: any, socialColor: string) => ({
    color: 'white',
    backgroundColor: theme.palette.custom.overlay.light,
    '&:hover': {
      backgroundColor: socialColor,
      transform: 'translateY(-2px)',
    },
    transition: 'all 0.3s ease',
  }),
  sectionTitle: (theme: any) => ({
    mb: 2,
    fontWeight: theme.custom.fontWeight.bold,
  }),
  linksContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  linkItem: (theme: any) => ({
    color: theme.palette.custom.overlay.dark,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.secondary.main,
      textDecoration: 'underline',
    },
    transition: 'color 0.3s ease',
  }),
  contactContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  contactIcon: (theme: any) => ({
    color: theme.palette.secondary.main,
    fontSize: 20,
  }),
  contactLink: (theme: any) => ({
    color: theme.palette.custom.overlay.dark,
    textDecoration: 'none',
    '&:hover': { color: theme.palette.secondary.main },
  }),
  legalLinkItem: (theme: any) => ({
    color: theme.palette.custom.overlay.dark,
    textDecoration: 'none',
    fontSize: '0.9rem',
    '&:hover': {
      color: theme.palette.secondary.main,
      textDecoration: 'underline',
    },
    transition: 'color 0.3s ease',
  }),
  divider: (theme: any) => ({
    my: 4,
    backgroundColor: theme.palette.custom.footer.divider,
  }),
  bottomSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 2,
  },
  copyrightText: (theme: any) => ({
    color: theme.palette.custom.overlay.medium,
  }),
};

export default Footer;
