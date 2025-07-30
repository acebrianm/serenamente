import { Router } from 'express';
import { 
  getAllEvents, 
  getEventById, 
  createEvent, 
  updateEvent, 
  deleteEvent, 
  getAllEventsAdmin 
} from '../controllers/eventController';
import { authenticate, requireAdmin } from '../middlewares/auth';
import { validateBody, validateParams } from '../middlewares/validation';
import { createEventSchema, updateEventSchema, uuidSchema } from '../utils/validation';

const router = Router();

// Public routes
router.get('/', getAllEvents);
router.get('/:id', validateParams(uuidSchema), getEventById);

// Admin routes
router.post('/admin', authenticate, requireAdmin, validateBody(createEventSchema), createEvent);
router.get('/admin/all', authenticate, requireAdmin, getAllEventsAdmin);
router.put('/admin/:id', authenticate, requireAdmin, validateParams(uuidSchema), validateBody(updateEventSchema), updateEvent);
router.delete('/admin/:id', authenticate, requireAdmin, validateParams(uuidSchema), deleteEvent);

export default router;