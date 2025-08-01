import { Router } from 'express';
import {
  googleAuth,
  googleCallback,
  login,
  oauthTokenExchange,
  register,
  resetPassword,
} from '../controllers/authController';
import { validateBody } from '../middlewares/validation';
import { loginSchema, registerSchema, resetPasswordSchema } from '../utils/validation';

const router: Router = Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/reset-password', validateBody(resetPasswordSchema), resetPassword);

// OAuth routes
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);
router.post('/oauth/token-exchange', oauthTokenExchange);

export default router;
