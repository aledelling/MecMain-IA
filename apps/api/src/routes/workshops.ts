import { Router } from 'express';
import { workshopController } from '@/controllers/workshopController';
import { authMiddleware } from '@/middleware/auth';

const router = Router();

// Workshop routes (protected)
router.get('/', authMiddleware, workshopController.getWorkshops);
router.post('/', authMiddleware, workshopController.createWorkshop);
router.get('/:id', authMiddleware, workshopController.getWorkshop);
router.put('/:id', authMiddleware, workshopController.updateWorkshop);
router.delete('/:id', authMiddleware, workshopController.deleteWorkshop);
router.get('/:id/technicians', authMiddleware, workshopController.getTechnicians);
router.post('/:id/technicians', authMiddleware, workshopController.addTechnician);

export default router;
