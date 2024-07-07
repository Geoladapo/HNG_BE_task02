import { Router } from 'express';
import { getUser } from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

router.get('/:id', authenticate, getUser);

export default router;
