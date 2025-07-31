import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useApi';
import SEOHelmet from '../SEOHelmet';

const Login: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(formData, {
      onSuccess: () => {
        toast.success('¡Bienvenido de vuelta!');
        navigate('/');
      },
      onError: (err: any) => {
        const errorMessage = err.response?.data?.message || 'Error al iniciar sesión';
        toast.error(errorMessage);
      },
    });
  };

  return (
    <>
      <SEOHelmet
        title="Iniciar Sesión - Serenamente"
        description="Inicia sesión en tu cuenta de Serenamente para acceder a tus tickets y gestionar tu perfil. Únete a la experiencia de bienestar mental más importante."
        keywords="login, iniciar sesión, serenamente, cuenta, perfil, tickets"
        url="https://serenamentemexico.com/login"
        noIndex={true}
      />
      <Box sx={styles.loginContainer(theme)}>
        <Container maxWidth="sm">
          <Card sx={styles.loginCard(theme)}>
            <CardContent sx={styles.cardContent}>
              <Typography variant="h3" component="h1" sx={styles.title(theme)}>
                Iniciar Sesión
              </Typography>

              <Typography variant="body1" sx={styles.subtitle(theme)}>
                Accede a tu cuenta para gestionar tus entradas
              </Typography>

              {loginMutation.error && (
                <Alert severity="error" sx={styles.errorAlert}>
                  {(loginMutation.error as any)?.response?.data?.message ||
                    'Error al iniciar sesión'}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
                <TextField
                  fullWidth
                  label="Correo Electrónico"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={styles.textField(theme)}
                />

                <TextField
                  fullWidth
                  label="Contraseña"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={styles.textField(theme)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loginMutation.isPending}
                  sx={styles.submitButton(theme)}
                >
                  {loginMutation.isPending ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </Button>
              </Box>

              <Box sx={styles.linksContainer}>
                <Typography variant="body2" sx={styles.linkText(theme)}>
                  ¿No tienes cuenta?{' '}
                  <Link to="/register" style={styles.link(theme)}>
                    Regístrate aquí
                  </Link>
                </Typography>

                <Typography variant="body2" sx={styles.linkText(theme)}>
                  ¿Olvidaste tu contraseña?{' '}
                  <Link to="/reset-password" style={styles.link(theme)}>
                    Recuperar contraseña
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

const styles = {
  loginContainer: (theme: any) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.custom.hero.gradient,
    py: 4,
  }),
  loginCard: (theme: any) => ({
    borderRadius: theme.custom.borderRadius.large,
    boxShadow: theme.palette.custom.shadow.heavy,
    backdropFilter: 'blur(10px)',
    backgroundColor: theme.palette.custom.overlay.dark,
  }),
  cardContent: {
    p: 4,
  },
  title: (theme: any) => ({
    textAlign: 'center',
    mb: 2,
    color: theme.palette.primary.main,
    fontWeight: theme.custom.fontWeight.bold,
  }),
  subtitle: (theme: any) => ({
    textAlign: 'center',
    mb: 4,
    color: theme.palette.text.secondary,
  }),
  errorAlert: {
    mb: 3,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    mb: 3,
  },
  textField: (theme: any) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.custom.borderRadius.medium,
      backgroundColor: theme.palette.background.paper,
    },
  }),
  submitButton: (theme: any) => ({
    py: 2,
    borderRadius: theme.custom.borderRadius.medium,
    fontWeight: theme.custom.fontWeight.bold,
    fontSize: '1.1rem',
  }),
  linksContainer: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  linkText: (theme: any) => ({
    color: theme.palette.text.secondary,
  }),
  link: (theme: any) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontWeight: theme.custom.fontWeight.bold,
    '&:hover': {
      textDecoration: 'underline',
    },
  }),
};

export default Login;
