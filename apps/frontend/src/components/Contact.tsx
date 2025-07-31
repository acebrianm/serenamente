import { Email, Send, WhatsApp } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useContactMessage } from '../hooks/useApi';

const Contact: React.FC = () => {
  const theme = useTheme();
  const sendMessageMutation = useContactMessage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [success, setSuccess] = useState(false);

  const contactInfo = {
    email: 'serenamente@gmail.com',
    whatsapp: '+52 55 8036 5253',
  };

  const whatsappMessage = 'Hola, me interesa la conferencia Serenamente';
  const emailSubject = 'Consulta sobre Conferencia Serenamente';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    // Client-side validation
    const trimmedData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    if (!trimmedData.name || trimmedData.name.length < 2) {
      toast.error('El nombre debe tener al menos 2 caracteres');
      return;
    }

    if (!trimmedData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedData.email)) {
      toast.error('Por favor ingresa un email válido');
      return;
    }

    if (!trimmedData.message || trimmedData.message.length < 10) {
      toast.error('El mensaje debe tener al menos 10 caracteres');
      return;
    }

    sendMessageMutation.mutate(trimmedData, {
      onSuccess: () => {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        toast.success('¡Mensaje enviado exitosamente! Te contactaremos pronto.');
      },
      onError: (err: any) => {
        console.error('Contact form error:', err.response?.data);

        // Handle validation errors with specific field messages
        if (err.response?.data?.errors) {
          const errors = err.response.data.errors;
          errors.forEach((error: { field: string; message: string }) => {
            toast.error(`${error.field}: ${error.message}`);
          });
        } else {
          const errorMessage =
            err.response?.data?.message ||
            'Error al enviar el mensaje. Por favor intenta de nuevo.';
          toast.error(errorMessage);
        }
      },
    });
  };

  const handleWhatsApp = () => {
    const whatsappUrl = `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const contactMethods = [
    {
      icon: WhatsApp,
      title: 'WhatsApp',
      value: contactInfo.whatsapp,
      action: handleWhatsApp,
      color: theme.palette.custom.social.whatsapp,
    },
    {
      icon: Email,
      title: 'Email',
      value: contactInfo.email,
      action: () => window.open(`mailto:${contactInfo.email}?subject=${emailSubject}`),
      color: theme.palette.custom.social.gmail,
    },
  ];

  return (
    <Box id="contact" sx={styles.contactSection}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" sx={styles.sectionTitle(theme)}>
          Contacto
        </Typography>

        <Typography variant="h5" sx={styles.subtitle(theme)}>
          ¿Tienes preguntas? Estamos aquí para ayudarte
        </Typography>

        <Typography variant="h4" sx={styles.formTitle}>
          Envíanos un mensaje
        </Typography>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={styles.formCard(theme)}>
              {sendMessageMutation.error && (
                <Alert severity="error" sx={styles.errorAlert}>
                  {(sendMessageMutation.error as any)?.response?.data?.message ||
                    'Error al enviar el mensaje'}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={styles.successAlert}>
                  ¡Mensaje enviado exitosamente! Te contactaremos pronto.
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Tu nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  sx={styles.formField}
                  required
                />

                <TextField
                  fullWidth
                  label="Tu email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  sx={styles.formField}
                  required
                />

                <TextField
                  fullWidth
                  label="Tu mensaje"
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  sx={styles.formField}
                  required
                  helperText={`${formData.message.length}/1000 caracteres (mínimo 10)`}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={sendMessageMutation.isPending}
                  startIcon={<Send />}
                  sx={styles.submitButton(theme)}
                >
                  {sendMessageMutation.isPending ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
              </form>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container spacing={3}>
              {contactMethods.map((method, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <Card
                    sx={styles.contactMethodCard(theme, method.color, method.action)}
                    onClick={method.action}
                  >
                    <CardContent>
                      <IconButton sx={styles.contactMethodIcon(method.color)}>
                        <method.icon sx={styles.contactMethodIconSize} />
                      </IconButton>

                      <Typography variant="h6" sx={styles.contactMethodTitle(method.color)}>
                        {method.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={styles.contactMethodValue}
                      >
                        {method.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={styles.ctaSection(theme)}>
              <Typography variant="h6" sx={styles.ctaTitle}>
                ¡Contáctanos ahora!
              </Typography>

              <Button
                variant="contained"
                size="large"
                startIcon={<WhatsApp />}
                onClick={handleWhatsApp}
                sx={styles.whatsappButton(theme)}
              >
                WhatsApp
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<Email />}
                onClick={() => window.open(`mailto:${contactInfo.email}?subject=${emailSubject}`)}
                sx={styles.emailButton}
              >
                Email
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const styles = {
  contactSection: {
    py: 8,
    backgroundColor: 'background.default',
    minHeight: '80vh',
  },
  sectionTitle: (theme: any) => ({
    textAlign: 'center',
    mb: 2,
    fontWeight: theme.custom.fontWeight.bold,
    color: 'primary.main',
    fontSize: { xs: theme.custom.fontSize.section.xs, md: theme.custom.fontSize.section.md },
  }),
  subtitle: (theme: any) => ({
    textAlign: 'center',
    mb: 6,
    color: 'text.secondary',
    fontWeight: theme.custom.fontWeight.light,
  }),
  formTitle: {
    mb: 4,
    fontWeight: 'bold',
    color: 'primary.main',
  },
  formCard: (theme: any) => ({
    p: 3,
    borderRadius: theme.custom.borderRadius.medium,
    boxShadow: theme.palette.custom.shadow.medium,
  }),
  errorAlert: {
    mb: 3,
  },
  successAlert: {
    mb: 3,
  },
  formField: {
    mb: 3,
  },
  submitButton: (theme: any) => ({
    py: 2,
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  }),
  contactMethodCard: (theme: any, methodColor: string, methodAction: any) => ({
    p: 3,
    textAlign: 'center',
    borderRadius: theme.custom.borderRadius.medium,
    cursor: methodAction !== (() => {}) ? 'pointer' : 'default',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: methodAction !== (() => {}) ? 'translateY(-5px)' : 'none',
      boxShadow: theme.palette.custom.shadow.heavy,
    },
    border: `2px solid ${methodColor}20`,
  }),
  contactMethodIcon: (methodColor: string) => ({
    backgroundColor: `${methodColor}20`,
    color: methodColor,
    mb: 2,
    '&:hover': {
      backgroundColor: `${methodColor}30`,
    },
  }),
  contactMethodIconSize: {
    fontSize: 30,
  },
  contactMethodTitle: (methodColor: string) => ({
    mb: 1,
    fontWeight: 'bold',
    color: methodColor,
  }),
  contactMethodValue: {
    wordBreak: 'break-word',
  },
  ctaSection: (theme: any) => ({
    mt: 4,
    p: 3,
    backgroundColor: 'primary.main',
    borderRadius: theme.custom.borderRadius.medium,
    color: 'white',
    textAlign: 'center',
  }),
  ctaTitle: {
    mb: 2,
    fontWeight: 'bold',
  },
  whatsappButton: (theme: any) => ({
    backgroundColor: theme.palette.custom.social.whatsapp,
    '&:hover': {
      backgroundColor: '#20b954',
    },
    mr: 2,
    mb: { xs: 2, sm: 0 },
  }),
  emailButton: {
    borderColor: 'white',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'white',
    },
  },
};

export default Contact;
