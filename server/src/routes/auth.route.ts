import { Router } from 'express';
import { signup, login, refreshAccessToken, logout, getCurrentUser } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh', refreshAccessToken);
router.post('/logout', logout);
router.get('/me', authenticate, getCurrentUser);

export default router;
