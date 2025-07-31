import {
  AccountCircle,
  AdminPanelSettings,
  ExitToApp,
  Menu as MenuIcon,
  Person,
  Receipt,
} from '@mui/icons-material';
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
import toast from 'react-hot-toast';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  const isHomePage = location.pathname === '/';

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

  const handleMenuItemClick = (sectionId: string) => {
    handleMobileMenuClose();
    if (isHomePage) {
      // If on home page, scroll to section with proper offset
      const element = document.getElementById(sectionId);
      if (element) {
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    } else {
      // If on other page, navigate to home then scroll to section
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const elementPosition = element.offsetTop;
          const offsetPosition = elementPosition - 80;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 150);
    }
  };

  const handleDesktopMenuItemClick = (sectionId: string) => {
    if (isHomePage) {
      // Use native scroll with proper offset
      const element = document.getElementById(sectionId);
      if (element) {
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    } else {
      // If on other page, navigate to home then scroll to section
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const elementPosition = element.offsetTop;
          const offsetPosition = elementPosition - 80;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 150);
    }
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
    toast.success('¡Sesión cerrada exitosamente!');
    navigate('/');
  };

  return (
    <AppBar position="fixed" sx={styles.appBar(theme)} elevation={2}>
      <Toolbar>
        <Box component={RouterLink} to="/" sx={styles.logoContainer}>
          <Box
            component="img"
            src="/logo192.png"
            alt="Serenamente - Conferencia de Bienestar Mental"
            title="Ir a inicio"
            loading="eager"
            sx={styles.logo}
          />
        </Box>

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
              sx={styles.mobileMenu}
            >
              {menuItems.map(item => (
                <MenuItem
                  key={item.id}
                  onClick={() => handleMenuItemClick(item.id)}
                  sx={styles.mobileMenuItem}
                >
                  <Typography sx={styles.mobileMenuItemText(theme)}>{item.label}</Typography>
                </MenuItem>
              ))}
              {!isAuthenticated && (
                <>
                  <MenuItem
                    onClick={() => {
                      handleMobileMenuClose();
                      navigate('/login');
                    }}
                    sx={styles.mobileMenuItem}
                  >
                    <Typography sx={styles.mobileMenuItemText(theme)}>Iniciar Sesión</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMobileMenuClose();
                      navigate('/register');
                    }}
                    sx={styles.mobileMenuItem}
                  >
                    <Typography sx={styles.mobileMenuItemText(theme)}>Registrarse</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <Box sx={styles.desktopMenuContainer}>
            {menuItems.map(item => (
              <Button
                key={item.id}
                onClick={() => handleDesktopMenuItemClick(item.id)}
                sx={styles.desktopMenuButton(theme)}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={styles.authContainer}>
          {isAuthenticated ? (
            <>
              <IconButton
                size="large"
                onClick={handleUserMenuOpen}
                sx={styles.userMenuButton(theme)}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={userMenuAnchor}
                open={Boolean(userMenuAnchor)}
                onClose={handleUserMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    handleUserMenuClose();
                    navigate('/profile');
                  }}
                  sx={styles.userMenuItem}
                >
                  <Person sx={styles.menuIcon} />
                  Mi Perfil
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleUserMenuClose();
                    navigate('/my-tickets');
                  }}
                  sx={styles.userMenuItem}
                >
                  <Receipt sx={styles.menuIcon} />
                  Mis Entradas
                </MenuItem>
                {isAdmin && (
                  <MenuItem
                    onClick={() => {
                      handleUserMenuClose();
                      navigate('/admin/events');
                    }}
                    sx={styles.userMenuItem}
                  >
                    <AdminPanelSettings sx={styles.menuIcon} />
                    Administración
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout} sx={styles.userMenuItem}>
                  <ExitToApp sx={styles.menuIcon} />
                  Cerrar Sesión
                </MenuItem>
              </Menu>
            </>
          ) : (
            !isMobile && (
              <Box sx={styles.authButtons}>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  sx={styles.loginButton(theme)}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  sx={styles.registerButton(theme)}
                >
                  Registrarse
                </Button>
              </Box>
            )
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const styles = {
  appBar: (theme: any) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.palette.custom.shadow.light,
    zIndex: 1100,
  }),
  logoContainer: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  logo: {
    height: {
      xs: '32px', // Smaller on mobile
      sm: '40px', // Medium on tablet
      md: '48px', // Larger on desktop
    },
    width: 'auto',
    maxHeight: '48px',
    objectFit: 'contain',
    transition: 'all 0.2s ease-in-out',
    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
    '&:hover': {
      transform: 'scale(1.05)',
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
    },
  },
  mobileMenuButton: {
    color: 'primary.main',
    zIndex: 1200,
  },
  mobileMenu: {
    zIndex: 1200,
    '& .MuiPaper-root': {
      minWidth: '200px',
      zIndex: 1200,
    },
  },
  mobileMenuLink: {
    textDecoration: 'none',
    color: 'inherit',
    width: '100%',
    display: 'block',
  },
  mobileMenuItem: {
    cursor: 'pointer',
    width: '100%',
    minHeight: '48px',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  mobileMenuItemText: (theme: any) => ({
    width: '100%',
    color: theme.palette.text.primary,
    fontWeight: 'medium',
  }),
  desktopMenuContainer: {
    display: 'flex',
    gap: 2,
    mr: 2,
  },
  desktopMenuButton: (theme: any) => ({
    color: 'primary.main',
    '&:hover': {
      backgroundColor: theme.palette.custom.overlay.light,
    },
  }),
  authContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  userMenuButton: (_theme: any) => ({
    color: 'primary.main',
  }),
  menuIcon: {
    mr: 1,
  },
  menuLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  userMenuItem: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
  authButtons: {
    display: 'flex',
    gap: 1,
  },
  loginButton: (_theme: any) => ({
    borderColor: 'primary.main',
    color: 'primary.main',
    '&:hover': {
      borderColor: 'primary.dark',
      color: 'primary.dark',
    },
  }),
  registerButton: (_theme: any) => ({
    backgroundColor: 'primary.main',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  }),
};

export default Navbar;
