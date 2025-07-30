import { Email } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { authService } from '../../services/api';

const ResetPassword: React.FC = () => {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.resetPassword({ email });
      setSuccess(true);
      toast.success('¡Correo de recuperación enviado exitosamente!');
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || 'Error al enviar el correo de recuperación';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box sx={styles.resetContainer(theme)}>
        <Container maxWidth="sm">
          <Card sx={styles.resetCard(theme)}>
            <CardContent sx={styles.cardContent}>
              <Box sx={styles.successContainer}>
                <Email sx={styles.successIcon(theme)} />
                <Typography variant="h4" component="h1" sx={styles.successTitle(theme)}>
                  ¡Correo Enviado!
                </Typography>

                <Typography variant="body1" sx={styles.successText(theme)}>
                  Hemos enviado un enlace de recuperación de contraseña a {email}. Por favor, revisa
                  tu bandeja de entrada y sigue las instrucciones.
                </Typography>

                <Typography variant="body2" sx={styles.noteText(theme)}>
                  Si no recibes el correo en unos minutos, revisa tu carpeta de spam.
                </Typography>

                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  size="large"
                  sx={styles.backButton(theme)}
                >
                  Volver al Login
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={styles.resetContainer(theme)}>
      <Container maxWidth="sm">
        <Card sx={styles.resetCard(theme)}>
          <CardContent sx={styles.cardContent}>
            <Typography variant="h3" component="h1" sx={styles.title(theme)}>
              Recuperar Contraseña
            </Typography>

            <Typography variant="body1" sx={styles.subtitle(theme)}>
              Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña
            </Typography>

            {error && (
              <Alert severity="error" sx={styles.errorAlert}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
              <TextField
                fullWidth
                label="Correo Electrónico"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                variant="outlined"
                sx={styles.textField(theme)}
                InputProps={{
                  startAdornment: <Email sx={styles.emailIcon(theme)} />,
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={styles.submitButton(theme)}
              >
                {loading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
              </Button>
            </Box>

            <Box sx={styles.linksContainer}>
              <Typography variant="body2" sx={styles.linkText(theme)}>
                ¿Recordaste tu contraseña?{' '}
                <Link to="/login" style={styles.link(theme)}>
                  Iniciar sesión
                </Link>
              </Typography>

              <Typography variant="body2" sx={styles.linkText(theme)}>
                ¿No tienes cuenta?{' '}
                <Link to="/register" style={styles.link(theme)}>
                  Regístrate aquí
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

const styles = {
  resetContainer: (theme: any) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.custom.hero.gradient,
    py: 4,
  }),
  resetCard: (theme: any) => ({
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
  emailIcon: (theme: any) => ({
    color: theme.palette.text.secondary,
    mr: 1,
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
  successContainer: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },
  successIcon: (theme: any) => ({
    fontSize: 60,
    color: theme.palette.success.main,
    mb: 2,
  }),
  successTitle: (theme: any) => ({
    color: theme.palette.success.main,
    fontWeight: theme.custom.fontWeight.bold,
    mb: 2,
  }),
  successText: (theme: any) => ({
    color: theme.palette.text.primary,
    mb: 2,
  }),
  noteText: (theme: any) => ({
    color: theme.palette.text.secondary,
    fontStyle: 'italic',
    mb: 3,
  }),
  backButton: (theme: any) => ({
    py: 2,
    px: 4,
    borderRadius: theme.custom.borderRadius.medium,
    fontWeight: theme.custom.fontWeight.bold,
  }),
};

export default ResetPassword;
