import { Router } from 'express';
import { deleteUser, getAllUsers, getMe, updateUser } from '../controllers/userController';
import { authenticate, requireAdmin } from '../middlewares/auth';
import { validateBody } from '../middlewares/validation';
import { updateUserSchema } from '../utils/validation';

const router = Router();

// User routes
router.get('/me', authenticate, getMe);
router.put('/', authenticate, validateBody(updateUserSchema), updateUser);
router.delete('/', authenticate, deleteUser);

// Admin routes
router.get('/admin/users', authenticate, requireAdmin, getAllUsers);

export default router;
