import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import { confirmPayment, createPaymentIntent, handleWebhook } from '../services/stripeService';

export const createPayment = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        error: 'UNAUTHORIZED',
        message: 'Debe estar autenticado para realizar esta acción',
      });
      return;
    }

    const { eventId, nameOfAttendee } = req.body;

    if (!eventId || !nameOfAttendee) {
      res.status(400).json({
        error: 'BAD_REQUEST',
        message: 'El ID del evento y nombre del asistente son requeridos',
      });
      return;
    }

    const paymentData = await createPaymentIntent({
      eventId,
      userId: req.user.userId,
      nameOfAttendee,
    });

    res.json({
      message: 'Intención de pago creada exitosamente',
      payment: paymentData,
    });
  } catch (error: any) {
    console.error('Error creando pago:', error);
    res.status(500).json({
      error: 'PAYMENT_ERROR',
      message: error.message || 'Ocurrió un error al procesar el pago',
    });
  }
};

export const confirmPaymentIntent = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      res.status(400).json({
        error: 'BAD_REQUEST',
        message: 'El ID de intención de pago es requerido',
      });
      return;
    }

    const ticket = await confirmPayment(paymentIntentId);

    res.json({
      message: 'Pago confirmado y ticket creado exitosamente',
      ticket,
    });
  } catch (error: any) {
    console.error('Error confirmando pago:', error);
    res.status(500).json({
      error: 'PAYMENT_ERROR',
      message: error.message || 'Ocurrió un error al confirmar el pago',
    });
  }
};

export const webhookHandler = async (req: any, res: Response): Promise<void> => {
  try {
    const signature = req.headers['stripe-signature'];

    if (!signature) {
      res.status(400).json({
        error: 'BAD_REQUEST',
        message: 'La firma de Stripe es requerida',
      });
      return;
    }

    await handleWebhook(req.body, signature);

    res.json({ received: true });
  } catch (error: any) {
    console.error('Error en webhook:', error);
    res.status(400).json({
      error: 'WEBHOOK_ERROR',
      message: error.message || 'Error procesando el webhook de Stripe',
    });
  }
};
