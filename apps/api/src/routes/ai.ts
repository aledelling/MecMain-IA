import { Router } from 'express';
import { aiController } from '@/controllers/aiController';
import { authMiddleware } from '@/middleware/auth';

const router = Router();

// AI routes (protected)
router.post('/diagnose', authMiddleware, aiController.diagnoseIssue);
router.post('/predict', authMiddleware, aiController.predictMaintenance);
router.post('/recommend', authMiddleware, aiController.recommendActions);
router.get('/training-progress/:userId', authMiddleware, aiController.getTrainingProgress);
router.post('/training/start', authMiddleware, aiController.startTraining);
router.post('/training/complete', authMiddleware, aiController.completeTraining);

export default router;
