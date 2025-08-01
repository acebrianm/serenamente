import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useRegister } from '../../hooks/useApi';
import SEOHelmet from '../SEOHelmet';
import OAuthButtons from './OAuthButtons';

const Register: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuth();
  const registerMutation = useRegister();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    registerMutation.mutate(
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
      },
      {
        onSuccess: data => {
          // Update AuthContext state immediately
          login(data.user, data.token);
          toast.success('¡Cuenta creada exitosamente! Bienvenido a Serenamente');
          navigate('/');
        },
        onError: (err: any) => {
          const errorMessage = err.response?.data?.message || 'Error al registrar usuario';
          toast.error(errorMessage);
        },
      }
    );
  };

  return (
    <>
      <SEOHelmet
        title="Registrarse - Serenamente"
        description="Crea tu cuenta en Serenamente y asegura tu lugar en la conferencia o taller de bienestar mental más importante. Regístrate ahora y transforma tu vida."
        keywords="registro, crear cuenta, serenamente, conferencia, taller, bienestar mental, tickets"
        url="https://serenamentemexico.com/register"
      />
      <Box sx={styles.registerContainer(theme)}>
        <Container maxWidth="sm">
          <Card sx={styles.registerCard(theme)}>
            <CardContent sx={styles.cardContent}>
              <Typography variant="h3" component="h1" sx={styles.title(theme)}>
                Crear Cuenta
              </Typography>

              <Typography variant="body1" sx={styles.subtitle(theme)}>
                Únete a nosotros para acceder a eventos transformadores
              </Typography>

              {registerMutation.error && (
                <Alert severity="error" sx={styles.errorAlert}>
                  {(registerMutation.error as any)?.response?.data?.message ||
                    'Error al registrar usuario'}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      sx={styles.textField(theme)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Apellido"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      variant="outlined"
                      sx={styles.textField(theme)}
                    />
                  </Grid>
                </Grid>

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
                  label="Teléfono (Opcional)"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
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

                <TextField
                  fullWidth
                  label="Confirmar Contraseña"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  sx={styles.textField(theme)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                  disabled={registerMutation.isPending}
                  sx={styles.submitButton(theme)}
                >
                  {registerMutation.isPending ? 'Creando cuenta...' : 'Crear Cuenta'}
                </Button>
              </Box>

              <OAuthButtons disabled={registerMutation.isPending} />

              <Box sx={styles.linksContainer}>
                <Typography variant="body2" sx={styles.linkText(theme)}>
                  ¿Ya tienes cuenta?{' '}
                  <Link to="/login" style={styles.link(theme)}>
                    Iniciar sesión
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
  registerContainer: (theme: any) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.custom.hero.gradient,
    py: 4,
  }),
  registerCard: (theme: any) => ({
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

export default Register;
