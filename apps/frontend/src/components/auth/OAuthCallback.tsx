import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent multiple executions
    if (hasProcessed.current || isProcessing) {
      return;
    }

    const handleCallback = async () => {
      hasProcessed.current = true;
      setIsProcessing(true);

      const token = searchParams.get('token');
      const userStr = searchParams.get('user');
      const error = searchParams.get('error');

      if (error) {
        let errorMessage = 'Error en la autenticación';
        switch (error) {
          case 'oauth_error':
            errorMessage = 'Error en la autenticación OAuth';
            break;
          case 'oauth_failed':
            errorMessage = 'Falló la autenticación OAuth';
            break;
          default:
            errorMessage = 'Error desconocido en la autenticación';
        }
        toast.error(errorMessage);
        navigate('/login');
        return;
      }

      if (token && userStr) {
        try {
          const user = JSON.parse(decodeURIComponent(userStr));

          // Update auth context (this handles localStorage internally)
          login(user, token);

          toast.success('¡Autenticación exitosa!');
          navigate('/');
        } catch (error) {
          console.error('Error parsing OAuth callback data:', error);
          toast.error('Error procesando la autenticación');
          navigate('/login');
        }
      } else {
        toast.error('Datos de autenticación incompletos');
        navigate('/login');
      }
    };

    handleCallback();
  }, []); // Empty dependency array to run only once

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={2}
    >
      <CircularProgress size={60} />
      <Typography variant="h6">Procesando autenticación...</Typography>
    </Box>
  );
};

export default OAuthCallback;
