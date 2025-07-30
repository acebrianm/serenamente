import { Router } from 'express';
import { login, register, resetPassword } from '../controllers/authController';
import { validateBody } from '../middlewares/validation';
import { loginSchema, registerSchema, resetPasswordSchema } from '../utils/validation';

const router = Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/reset-password', validateBody(resetPasswordSchema), resetPassword);

export default router;
