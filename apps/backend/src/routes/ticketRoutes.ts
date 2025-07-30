import { Router } from 'express';
import {
  createTicket,
  deleteTicket,
  getAllTickets,
  getMyTickets,
  updateTicket,
} from '../controllers/ticketController';
import { authenticate, requireAdmin } from '../middlewares/auth';
import { validateBody, validateParams } from '../middlewares/validation';
import { createTicketSchema, updateTicketSchema, uuidSchema } from '../utils/validation';

const router = Router();

// User routes
router.get('/me', authenticate, getMyTickets);

// Admin routes
router.post('/admin', authenticate, requireAdmin, validateBody(createTicketSchema), createTicket);
router.get('/admin', authenticate, requireAdmin, getAllTickets);
router.put(
  '/admin/:id',
  authenticate,
  requireAdmin,
  validateParams(uuidSchema),
  validateBody(updateTicketSchema),
  updateTicket
);
router.delete('/admin/:id', authenticate, requireAdmin, validateParams(uuidSchema), deleteTicket);

export default router;
