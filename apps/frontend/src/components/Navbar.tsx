import { Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-scroll';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const menuItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'about', label: 'Acerca de' },
    { id: 'mission', label: 'Misión' },
    { id: 'tickets', label: 'Entradas' },
    { id: 'contact', label: 'Contacto' },
  ];

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar position="fixed" sx={styles.appBar(theme)}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={styles.brandName(theme)}>
          Serenamente
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuOpen}
              sx={styles.mobileMenuButton}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
            >
              {menuItems.map(item => (
                <MenuItem key={item.id} onClick={handleMobileMenuClose}>
                  <Link to={item.id} smooth={true} duration={500} style={styles.mobileMenuLink}>
                    {item.label}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={styles.desktopMenuContainer}>
            {menuItems.map(item => (
              <Link
                key={item.id}
                to={item.id}
                smooth={true}
                duration={500}
                style={styles.desktopMenuLink}
              >
                <Button sx={styles.desktopMenuButton(theme)}>{item.label}</Button>
              </Link>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

const styles = {
  appBar: (theme: any) => ({
    backgroundColor: theme.palette.background.paper,
    backdropFilter: 'blur(10px)',
  }),
  brandName: (theme: any) => ({
    flexGrow: 1,
    color: 'primary.main',
    fontWeight: theme.custom.fontWeight.bold,
  }),
  mobileMenuButton: {
    color: 'primary.main',
  },
  mobileMenuLink: {
    textDecoration: 'none',
    color: 'inherit',
    width: '100%',
  },
  desktopMenuContainer: {
    display: 'flex',
    gap: 2,
  },
  desktopMenuLink: {
    textDecoration: 'none',
  },
  desktopMenuButton: (theme: any) => ({
    color: 'primary.main',
    '&:hover': {
      backgroundColor: theme.palette.custom.overlay.light,
    },
  }),
};

export default Navbar;
