import { Router } from 'express';
import {
  checkPaymentStatus,
  confirmPaymentIntent,
  createPayment,
  webhookHandler,
} from '../controllers/paymentController';
import { authenticate } from '../middlewares/auth';
import { validateBody } from '../middlewares/validation';
import { confirmPaymentSchema, createPaymentSchema } from '../utils/validation';

const router: Router = Router();

// Payment routes
router.post(
  '/create-payment-intent',
  authenticate,
  validateBody(createPaymentSchema),
  createPayment
);
router.post(
  '/confirm-payment',
  authenticate,
  validateBody(confirmPaymentSchema),
  confirmPaymentIntent
);
router.get('/status/:paymentIntentId', authenticate, checkPaymentStatus);

router.post('/webhook', webhookHandler);

export default router;
