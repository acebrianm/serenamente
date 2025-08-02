import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import {
  confirmPayment,
  createPaymentIntent,
  getPaymentStatus,
  handleWebhook,
} from '../services/stripeService';

export const createPayment = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    console.log('Payment request received:', {
      eventId: req.body.eventId,
      attendees: req.body.attendees,
      nameOfAttendee: req.body.nameOfAttendee,
      userId: req.user?.userId,
    });

    if (!req.user) {
      res.status(401).json({
        error: 'UNAUTHORIZED',
        message: 'Debe estar autenticado para realizar esta acción',
      });
      return;
    }

    const { eventId, attendees, nameOfAttendee } = req.body;

    // Support both old and new formats
    let attendeesList: string[] = [];

    if (attendees && Array.isArray(attendees)) {
      // New format - multiple attendees
      attendeesList = attendees
        .filter((name: any) => typeof name === 'string' && name.trim().length > 0)
        .map((name: string) => name.trim());
    } else if (nameOfAttendee && typeof nameOfAttendee === 'string') {
      // Old format - single attendee
      attendeesList = [nameOfAttendee.trim()];
    }

    if (!eventId || attendeesList.length === 0) {
      res.status(400).json({
        error: 'BAD_REQUEST',
        message: 'El ID del evento y al menos un asistente son requeridos',
      });
      return;
    }

    console.log('Creating payment intent with:', {
      eventId,
      userId: req.user.userId,
      attendees: attendeesList,
      attendeesCount: attendeesList.length,
    });

    const paymentData = await createPaymentIntent({
      eventId,
      userId: req.user.userId,
      attendees: attendeesList,
    });

    console.log('Payment intent created successfully:', {
      paymentIntentId: paymentData.paymentIntentId,
      amount: paymentData.amount,
      ticketCount: paymentData.ticketCount,
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

export const checkPaymentStatus = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { paymentIntentId } = req.params;

    if (!paymentIntentId) {
      res.status(400).json({
        error: 'BAD_REQUEST',
        message: 'Payment Intent ID es requerido',
      });
      return;
    }

    if (!req.user) {
      res.status(401).json({
        error: 'UNAUTHORIZED',
        message: 'Debe estar autenticado para realizar esta acción',
      });
      return;
    }

    const paymentStatus = await getPaymentStatus(paymentIntentId, req.user.userId);

    res.json(paymentStatus);
  } catch (error: any) {
    console.error('Error checking payment status:', error);
    res.status(500).json({
      error: 'PAYMENT_STATUS_ERROR',
      message: error.message || 'Error al verificar el estado del pago',
    });
  }
};

export const webhookHandler = async (req: any, res: Response): Promise<void> => {
  try {
    const signature = req.headers['stripe-signature'];

    console.log('🔗 Webhook received:', {
      url: req.url,
      path: req.path,
      method: req.method,
      hasSignature: !!signature,
      bodyType: typeof req.body,
      bodyIsBuffer: Buffer.isBuffer(req.body),
      bodyLength: req.body ? req.body.length : 0,
      contentType: req.get('content-type'),
      signaturePreview: signature ? `${signature.substring(0, 50)}...` : 'none',
    });

    if (!signature) {
      console.error('❌ No Stripe signature found in headers');
      res.status(400).send('Missing Stripe signature');
      return;
    }

    if (!Buffer.isBuffer(req.body)) {
      console.error('❌ Request body is not a Buffer:', typeof req.body);
      res.status(400).send('Invalid request body format');
      return;
    }

    res.status(200);

    console.log('🔍 Processing webhook with Buffer body, length:', req.body.length);

    await handleWebhook(req.body, signature);

    console.log('✅ Webhook processed successfully');
  } catch (error: any) {
    console.error('❌ Error en webhook:', error);
    console.error('Error details:', {
      message: error.message,
      type: error.type,
      stack: error.stack?.split('\n').slice(0, 3).join('\n'),
    });
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};
