import { Router } from 'express';
import { createPayment, confirmPaymentIntent, webhookHandler } from '../controllers/paymentController';
import { authenticate } from '../middlewares/auth';
import { validateBody } from '../middlewares/validation';
import { createPaymentSchema, confirmPaymentSchema } from '../utils/validation';

const router = Router();

// Payment routes
router.post('/create-payment-intent', authenticate, validateBody(createPaymentSchema), createPayment);
router.post('/confirm-payment', authenticate, validateBody(confirmPaymentSchema), confirmPaymentIntent);

// Webhook route (no authentication needed)
router.post('/webhook', webhookHandler);

export default router;