import { Router } from 'express';
import { sendContactMessage } from '../controllers/contactController';
import { validateBody } from '../middlewares/validation';
import { contactSchema } from '../utils/validation';

const router: Router = Router();

router.post('/', validateBody(contactSchema), sendContactMessage);

export default router;
