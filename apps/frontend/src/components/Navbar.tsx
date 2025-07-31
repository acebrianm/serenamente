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
import { Link } from 'react-scroll';
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
      // If on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on other page, navigate to home then scroll to section
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleDesktopMenuItemClick = (sectionId: string) => {
    if (isHomePage) {
      // Already handled by react-scroll Link component
      return;
    } else {
      // If on other page, navigate to home then scroll to section
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
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
    <AppBar position="fixed" sx={styles.appBar(theme)}>
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={styles.brandName(theme)}>
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
              sx={styles.mobileMenu}
            >
              {menuItems.map(item => (
                <MenuItem key={item.id} onClick={() => handleMenuItemClick(item.id)}>
                  <Typography sx={styles.mobileMenuItemText(theme)}>{item.label}</Typography>
                </MenuItem>
              ))}
              {!isAuthenticated && (
                <>
                  <MenuItem onClick={handleMobileMenuClose}>
                    <RouterLink to="/login" style={styles.mobileMenuLink}>
                      <Typography sx={styles.mobileMenuItemText(theme)}>Iniciar Sesión</Typography>
                    </RouterLink>
                  </MenuItem>
                  <MenuItem onClick={handleMobileMenuClose}>
                    <RouterLink to="/register" style={styles.mobileMenuLink}>
                      <Typography sx={styles.mobileMenuItemText(theme)}>Registrarse</Typography>
                    </RouterLink>
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <Box sx={styles.desktopMenuContainer}>
            {menuItems.map(item =>
              isHomePage ? (
                <Link
                  key={item.id}
                  to={item.id}
                  smooth={true}
                  duration={500}
                  style={styles.desktopMenuLink}
                >
                  <Button sx={styles.desktopMenuButton(theme)}>{item.label}</Button>
                </Link>
              ) : (
                <Button
                  key={item.id}
                  onClick={() => handleDesktopMenuItemClick(item.id)}
                  sx={styles.desktopMenuButton(theme)}
                >
                  {item.label}
                </Button>
              )
            )}
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
                <MenuItem onClick={handleUserMenuClose}>
                  <Person sx={styles.menuIcon} />
                  <RouterLink to="/profile" style={styles.menuLink}>
                    Mi Perfil
                  </RouterLink>
                </MenuItem>
                <MenuItem onClick={handleUserMenuClose}>
                  <Receipt sx={styles.menuIcon} />
                  <RouterLink to="/my-tickets" style={styles.menuLink}>
                    Mis Entradas
                  </RouterLink>
                </MenuItem>
                {isAdmin && (
                  <MenuItem onClick={handleUserMenuClose}>
                    <AdminPanelSettings sx={styles.menuIcon} />
                    <RouterLink to="/admin/events" style={styles.menuLink}>
                      Administración
                    </RouterLink>
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>
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
    backdropFilter: 'blur(10px)',
    boxShadow: theme.palette.custom.shadow.light,
  }),
  brandName: (theme: any) => ({
    flexGrow: 1,
    color: 'primary.main',
    fontWeight: theme.custom.fontWeight.bold,
    textDecoration: 'none',
    '&:hover': {
      color: 'primary.dark',
    },
  }),
  mobileMenuButton: {
    color: 'primary.main',
  },
  mobileMenu: {
    '& .MuiPaper-root': {
      minWidth: '200px',
    },
  },
  mobileMenuLink: {
    textDecoration: 'none',
    color: 'inherit',
    width: '100%',
    display: 'block',
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
  desktopMenuLink: {
    textDecoration: 'none',
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
