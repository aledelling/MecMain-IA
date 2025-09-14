import { Router } from 'express';
import { userController } from '@/controllers/userController';
import { authMiddleware } from '@/middleware/auth';

const router = Router();

// User routes (protected)
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);
router.delete('/account', authMiddleware, userController.deleteAccount);
router.get('/workshops', authMiddleware, userController.getUserWorkshops);

export default router;
