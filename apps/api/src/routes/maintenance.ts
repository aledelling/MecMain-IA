import { Router } from 'express';
import { maintenanceController } from '@/controllers/maintenanceController';
import { authMiddleware } from '@/middleware/auth';

const router = Router();

// Maintenance routes (protected)
router.get('/', authMiddleware, maintenanceController.getMaintenanceRecords);
router.post('/', authMiddleware, maintenanceController.createMaintenanceRecord);
router.get('/:id', authMiddleware, maintenanceController.getMaintenanceRecord);
router.put('/:id', authMiddleware, maintenanceController.updateMaintenanceRecord);
router.delete('/:id', authMiddleware, maintenanceController.deleteMaintenanceRecord);
router.get('/predictions/:workshopId', authMiddleware, maintenanceController.getPredictions);
router.post('/diagnose', authMiddleware, maintenanceController.diagnoseIssue);

export default router;
