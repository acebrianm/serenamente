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
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
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

        {isHomePage && (
          <>
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
          </>
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
  mobileMenuLink: {
    textDecoration: 'none',
    color: 'inherit',
    width: '100%',
  },
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
  userMenuButton: (theme: any) => ({
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
  loginButton: (theme: any) => ({
    borderColor: 'primary.main',
    color: 'primary.main',
    '&:hover': {
      borderColor: 'primary.dark',
      color: 'primary.dark',
    },
  }),
  registerButton: (theme: any) => ({
    backgroundColor: 'primary.main',
    '&:hover': {
      backgroundColor: 'primary.dark',
    },
  }),
};

export default Navbar;
