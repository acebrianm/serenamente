import { Add, Delete, Edit, Event as EventIcon, Visibility } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Event, eventService } from '../../services/api';

const EventManagement: React.FC = () => {
  const theme = useTheme();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    price: '',
    date: '',
    promoVideo: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventService.getAllEventsAdmin();
      setEvents(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar eventos');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        name: event.name,
        description: event.description,
        address: event.address,
        price: event.price.toString(),
        date: new Date(event.date).toISOString().slice(0, 16),
        promoVideo: event.promoVideo || '',
      });
    } else {
      setEditingEvent(null);
      setFormData({
        name: '',
        description: '',
        address: '',
        price: '',
        date: '',
        promoVideo: '',
      });
    }
    setOpenDialog(true);
    setError('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingEvent(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const eventData = {
        name: formData.name,
        description: formData.description,
        address: formData.address,
        price: parseFloat(formData.price),
        date: new Date(formData.date).toISOString(),
        promoVideo: formData.promoVideo || undefined,
      };

      if (editingEvent) {
        await eventService.updateEvent(editingEvent.id, eventData);
        toast.success('¡Evento actualizado correctamente!');
      } else {
        await eventService.createEvent(eventData);
        toast.success('¡Evento creado correctamente!');
      }

      fetchEvents();
      handleCloseDialog();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al guardar el evento';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (eventId: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      return;
    }

    try {
      await eventService.deleteEvent(eventId);
      toast.success('¡Evento eliminado correctamente!');
      fetchEvents();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al eliminar el evento';
      toast.error(errorMessage);
    }
  };

  const handleToggleActive = async (event: Event) => {
    try {
      await eventService.updateEvent(event.id, { isActive: !event.isActive });
      toast.success(`¡Evento ${event.isActive ? 'desactivado' : 'activado'} correctamente!`);
      fetchEvents();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al actualizar el evento';
      toast.error(errorMessage);
    }
  };

  if (loading) {
    return (
      <Box sx={styles.loadingContainer(theme)}>
        <Typography variant="h6">Cargando eventos...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.managementContainer(theme)}>
      <Container maxWidth="lg">
        <Box sx={styles.header}>
          <Typography variant="h3" component="h1" sx={styles.pageTitle(theme)}>
            Gestión de Eventos
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            sx={styles.addButton(theme)}
          >
            Crear Evento
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={styles.alert}>
            {error}
          </Alert>
        )}

        {events.length === 0 ? (
          <Card sx={styles.emptyCard(theme)}>
            <CardContent sx={styles.emptyContent}>
              <EventIcon sx={styles.emptyIcon(theme)} />
              <Typography variant="h5" sx={styles.emptyTitle(theme)}>
                No hay eventos creados
              </Typography>
              <Typography variant="body1" sx={styles.emptyText(theme)}>
                Crea tu primer evento para comenzar.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {events.map(event => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={event.id}>
                <Card sx={styles.eventCard(theme)}>
                  <CardContent>
                    <Box sx={styles.eventHeader}>
                      <Typography variant="h6" sx={styles.eventName(theme)}>
                        {event.name}
                      </Typography>
                      <Chip
                        label={event.isActive ? 'Activo' : 'Inactivo'}
                        color={event.isActive ? 'success' : 'error'}
                        size="small"
                        onClick={() => handleToggleActive(event)}
                        sx={styles.statusChip}
                      />
                    </Box>

                    <Typography variant="body2" sx={styles.eventDescription(theme)}>
                      {event.description.length > 100
                        ? `${event.description.substring(0, 100)}...`
                        : event.description}
                    </Typography>

                    <Typography variant="body2" sx={styles.eventDate(theme)}>
                      {new Date(event.date).toLocaleDateString('es-ES', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Typography>

                    <Typography variant="h6" sx={styles.eventPrice(theme)}>
                      ${event.price}
                    </Typography>

                    <Box sx={styles.cardActions}>
                      <IconButton
                        onClick={() => handleOpenDialog(event)}
                        sx={styles.actionButton(theme)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(event.id)}
                        sx={styles.deleteButton(theme)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle sx={styles.dialogTitle(theme)}>
            {editingEvent ? 'Editar Evento' : 'Crear Nuevo Evento'}
          </DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Nombre del Evento"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    sx={styles.textField(theme)}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Descripción"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    multiline
                    rows={3}
                    sx={styles.textField(theme)}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Dirección"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    sx={styles.textField(theme)}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Precio"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    sx={styles.textField(theme)}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Fecha y Hora"
                    name="date"
                    type="datetime-local"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    sx={styles.textField(theme)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Video Promocional (URL)"
                    name="promoVideo"
                    value={formData.promoVideo}
                    onChange={handleInputChange}
                    sx={styles.textField(theme)}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions sx={styles.dialogActions}>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingEvent ? 'Actualizar' : 'Crear'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

const styles = {
  loadingContainer: (theme: any) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.default,
  }),
  managementContainer: (theme: any) => ({
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    py: 4,
  }),
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 4,
  },
  pageTitle: (theme: any) => ({
    color: theme.palette.primary.main,
    fontWeight: theme.custom.fontWeight.bold,
  }),
  addButton: (theme: any) => ({
    borderRadius: theme.custom.borderRadius.medium,
  }),
  alert: {
    mb: 3,
  },
  emptyCard: (theme: any) => ({
    borderRadius: theme.custom.borderRadius.large,
    boxShadow: theme.palette.custom.shadow.light,
  }),
  emptyContent: {
    textAlign: 'center',
    py: 6,
  },
  emptyIcon: (theme: any) => ({
    fontSize: 80,
    color: theme.palette.text.secondary,
    mb: 2,
  }),
  emptyTitle: (theme: any) => ({
    color: theme.palette.text.primary,
    mb: 2,
    fontWeight: theme.custom.fontWeight.bold,
  }),
  emptyText: (theme: any) => ({
    color: theme.palette.text.secondary,
  }),
  eventCard: (theme: any) => ({
    height: '100%',
    borderRadius: theme.custom.borderRadius.large,
    boxShadow: theme.palette.custom.shadow.medium,
  }),
  eventHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    mb: 2,
  },
  eventName: (theme: any) => ({
    color: theme.palette.primary.main,
    fontWeight: theme.custom.fontWeight.bold,
    flex: 1,
    mr: 1,
  }),
  statusChip: {
    cursor: 'pointer',
  },
  eventDescription: (theme: any) => ({
    mb: 2,
    color: theme.palette.text.secondary,
  }),
  eventDate: (theme: any) => ({
    mb: 2,
    color: theme.palette.text.primary,
  }),
  eventPrice: (theme: any) => ({
    color: theme.palette.secondary.main,
    fontWeight: theme.custom.fontWeight.bold,
    mb: 2,
  }),
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 1,
  },
  actionButton: (theme: any) => ({
    color: theme.palette.primary.main,
  }),
  deleteButton: (theme: any) => ({
    color: theme.palette.error.main,
  }),
  dialogTitle: (theme: any) => ({
    color: theme.palette.primary.main,
    fontWeight: theme.custom.fontWeight.bold,
  }),
  form: {
    mt: 2,
  },
  textField: (theme: any) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.custom.borderRadius.medium,
    },
  }),
  dialogActions: {
    p: 3,
  },
};

export default EventManagement;
