import { Edit, Person, Save } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { useUpdateUser, useUser } from '../../hooks/useApi';

const Profile: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { data: userData } = useUser();
  const updateUserMutation = useUpdateUser();

  // Use userData from query if available, fallback to auth context
  const currentUser = userData || user;

  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    phone: currentUser?.phone || '',
  });
  const [editing, setEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    updateUserMutation.mutate(
      {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone || undefined,
      },
      {
        onSuccess: () => {
          toast.success('¡Perfil actualizado correctamente!');
          setEditing(false);
        },
        onError: (err: any) => {
          const errorMessage = err.response?.data?.message || 'Error al actualizar el perfil';
          toast.error(errorMessage);
        },
      }
    );
  };

  const handleCancel = () => {
    setFormData({
      firstName: currentUser?.firstName || '',
      lastName: currentUser?.lastName || '',
      phone: currentUser?.phone || '',
    });
    setEditing(false);
  };

  if (!user) {
    return null;
  }

  return (
    <Box sx={styles.profileContainer(theme)}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" sx={styles.pageTitle(theme)}>
          Mi Perfil
        </Typography>

        <Card sx={styles.profileCard(theme)}>
          <CardContent sx={styles.cardContent}>
            <Box sx={styles.headerSection}>
              <Person sx={styles.profileIcon(theme)} />
              <Typography variant="h4" sx={styles.cardTitle(theme)}>
                Información Personal
              </Typography>
              {!editing && (
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={() => setEditing(true)}
                  sx={styles.editButton(theme)}
                >
                  Editar
                </Button>
              )}
            </Box>

            {updateUserMutation.error && (
              <Alert severity="error" sx={styles.alert}>
                {(updateUserMutation.error as any)?.response?.data?.message ||
                  'Error al actualizar el perfil'}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!editing}
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
                    disabled={!editing}
                    variant="outlined"
                    sx={styles.textField(theme)}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Correo Electrónico"
                    value={currentUser?.email || ''}
                    disabled
                    variant="outlined"
                    sx={styles.textField(theme)}
                    helperText="El correo electrónico no se puede modificar"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!editing}
                    variant="outlined"
                    sx={styles.textField(theme)}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Rol"
                    value={user.role === 'ADMIN' ? 'Administrador' : 'Usuario'}
                    disabled
                    variant="outlined"
                    sx={styles.textField(theme)}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Fecha de Registro"
                    value={new Date(user.createdAt).toLocaleDateString('es-ES')}
                    disabled
                    variant="outlined"
                    sx={styles.textField(theme)}
                  />
                </Grid>
              </Grid>

              {editing && (
                <Box sx={styles.buttonContainer}>
                  <Button variant="outlined" onClick={handleCancel} sx={styles.cancelButton(theme)}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    disabled={updateUserMutation.isPending}
                    sx={styles.saveButton(theme)}
                  >
                    {updateUserMutation.isPending ? 'Guardando...' : 'Guardar Cambios'}
                  </Button>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

const styles = {
  profileContainer: (theme: any) => ({
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    py: 4,
  }),
  pageTitle: (theme: any) => ({
    textAlign: 'center',
    mb: 4,
    color: theme.palette.primary.main,
    fontWeight: theme.custom.fontWeight.bold,
  }),
  profileCard: (theme: any) => ({
    borderRadius: theme.custom.borderRadius.large,
    boxShadow: theme.palette.custom.shadow.medium,
    backgroundColor: theme.palette.background.paper,
  }),
  cardContent: {
    p: 4,
  },
  headerSection: {
    display: 'flex',
    alignItems: 'center',
    mb: 3,
    gap: 2,
  },
  profileIcon: (theme: any) => ({
    fontSize: 32,
    color: theme.palette.primary.main,
  }),
  cardTitle: (theme: any) => ({
    flex: 1,
    color: theme.palette.primary.main,
    fontWeight: theme.custom.fontWeight.bold,
  }),
  editButton: (theme: any) => ({
    borderRadius: theme.custom.borderRadius.medium,
  }),
  alert: {
    mb: 3,
  },
  textField: (theme: any) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.custom.borderRadius.medium,
    },
  }),
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
    mt: 4,
  },
  cancelButton: (theme: any) => ({
    borderRadius: theme.custom.borderRadius.medium,
  }),
  saveButton: (theme: any) => ({
    borderRadius: theme.custom.borderRadius.medium,
    fontWeight: theme.custom.fontWeight.bold,
  }),
};

export default Profile;
