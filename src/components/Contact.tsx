import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  TextField,
  IconButton,
  Grid
} from '@mui/material';
import { WhatsApp, Email, Send, Phone, LocationOn } from '@mui/icons-material';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const contactInfo = {
    phone: '+1 234 567 890',
    email: 'info@serenamente.com',
    whatsapp: '+1 234 567 890',
    location: 'Centro de Convenciones Internacional, Ciudad'
  };

  const whatsappMessage = 'Hola, me interesa la conferencia Serenamente';
  const emailSubject = 'Consulta sobre Conferencia Serenamente';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailBody = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AMessage: ${formData.message}`;
    window.open(`mailto:${contactInfo.email}?subject=${emailSubject}&body=${emailBody}`);
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
      color: '#25D366'
    },
    {
      icon: Email,
      title: 'Email',
      value: contactInfo.email,
      action: () => window.open(`mailto:${contactInfo.email}?subject=${emailSubject}`),
      color: '#ea4335'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      value: contactInfo.phone,
      action: () => window.open(`tel:${contactInfo.phone}`),
      color: '#0066ff'
    },
    {
      icon: LocationOn,
      title: 'Ubicación',
      value: contactInfo.location,
      action: () => {},
      color: '#ff4081'
    }
  ];

  return (
    <Box
      id="contact"
      sx={{
        py: 8,
        backgroundColor: 'background.default',
        minHeight: '80vh'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 2,
            fontWeight: 'bold',
            color: 'primary.main',
            fontSize: { xs: '2.5rem', md: '3.5rem' }
          }}
        >
          Contacto
        </Typography>

        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            mb: 6,
            color: 'text.secondary',
            fontWeight: 300
          }}
        >
          ¿Tienes preguntas? Estamos aquí para ayudarte
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h4"
              sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}
            >
              Envíanos un mensaje
            </Typography>

            <Card sx={{ p: 3, borderRadius: 3, boxShadow: '0 8px 25px rgba(0,0,0,0.1)' }}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Tu nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  sx={{ mb: 3 }}
                  required
                />

                <TextField
                  fullWidth
                  label="Tu email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  sx={{ mb: 3 }}
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
                  sx={{ mb: 3 }}
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<Send />}
                  sx={{
                    py: 2,
                    backgroundColor: '#ff4081',
                    '&:hover': {
                      backgroundColor: '#e91e63',
                    }
                  }}
                >
                  Enviar Mensaje
                </Button>
              </form>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Grid container spacing={3}>
              {contactMethods.map((method, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <Card
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      borderRadius: 3,
                      cursor: method.action !== (() => {}) ? 'pointer' : 'default',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: method.action !== (() => {}) ? 'translateY(-5px)' : 'none',
                        boxShadow: '0 12px 25px rgba(0,0,0,0.15)'
                      },
                      border: `2px solid ${method.color}20`
                    }}
                    onClick={method.action}
                  >
                    <CardContent>
                      <IconButton
                        sx={{
                          backgroundColor: `${method.color}20`,
                          color: method.color,
                          mb: 2,
                          '&:hover': {
                            backgroundColor: `${method.color}30`,
                          }
                        }}
                      >
                        <method.icon sx={{ fontSize: 30 }} />
                      </IconButton>

                      <Typography
                        variant="h6"
                        sx={{ mb: 1, fontWeight: 'bold', color: method.color }}
                      >
                        {method.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ wordBreak: 'break-word' }}
                      >
                        {method.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box
              sx={{
                mt: 4,
                p: 3,
                backgroundColor: 'primary.main',
                borderRadius: 3,
                color: 'white',
                textAlign: 'center'
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                ¡Contáctanos ahora!
              </Typography>

              <Button
                variant="contained"
                size="large"
                startIcon={<WhatsApp />}
                onClick={handleWhatsApp}
                sx={{
                  backgroundColor: '#25D366',
                  '&:hover': {
                    backgroundColor: '#20b954',
                  },
                  mr: 2,
                  mb: { xs: 2, sm: 0 }
                }}
              >
                WhatsApp
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<Email />}
                onClick={() => window.open(`mailto:${contactInfo.email}?subject=${emailSubject}`)}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'white',
                  }
                }}
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

export default Contact;