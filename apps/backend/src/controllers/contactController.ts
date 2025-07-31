import { Request, Response } from 'express';
import { emailService } from '../services/emailService';

export const sendContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      res.status(400).json({
        error: 'BAD_REQUEST',
        message: 'Nombre, email y mensaje son requeridos',
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        error: 'BAD_REQUEST',
        message: 'Formato de email inválido',
      });
      return;
    }

    // Validate message length
    if (message.length > 1000) {
      res.status(400).json({
        error: 'BAD_REQUEST',
        message: 'El mensaje no puede exceder 1000 caracteres',
      });
      return;
    }

    // Send contact email
    await emailService.sendContactEmail({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    res.json({
      message: 'Mensaje enviado exitosamente. Te contactaremos pronto.',
    });
  } catch (error) {
    console.error('Error enviando mensaje de contacto:', error);
    res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Error al enviar el mensaje. Por favor intenta de nuevo.',
    });
  }
};
