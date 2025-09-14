import { Request, Response, NextFunction } from 'express';
import { maintenanceService } from '@/services/maintenanceService';
import { logger } from '@/utils/logger';

export const maintenanceController = {
  async getMaintenanceRecords(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { page = 1, limit = 10, workshopId, status, type } = req.query;
      
      const records = await maintenanceService.getMaintenanceRecords({
        userId,
        workshopId: workshopId as string,
        status: status as string,
        type: type as string,
        page: Number(page),
        limit: Number(limit)
      });

      res.json({
        success: true,
        data: records
      });
    } catch (error) {
      next(error);
    }
  },

  async createMaintenanceRecord(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const recordData = req.body;
      
      const record = await maintenanceService.createMaintenanceRecord(userId, recordData);

      logger.info('Maintenance record created', { recordId: record.id, userId });
      
      res.status(201).json({
        success: true,
        message: 'Maintenance record created successfully',
        data: record
      });
    } catch (error) {
      next(error);
    }
  },

  async getMaintenanceRecord(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;
      
      const record = await maintenanceService.getMaintenanceRecordById(id, userId);

      res.json({
        success: true,
        data: record
      });
    } catch (error) {
      next(error);
    }
  },

  async updateMaintenanceRecord(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;
      const updateData = req.body;
      
      const record = await maintenanceService.updateMaintenanceRecord(id, userId, updateData);

      logger.info('Maintenance record updated', { recordId: id, userId });
      
      res.json({
        success: true,
        message: 'Maintenance record updated successfully',
        data: record
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteMaintenanceRecord(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;
      
      await maintenanceService.deleteMaintenanceRecord(id, userId);

      logger.info('Maintenance record deleted', { recordId: id, userId });
      
      res.json({
        success: true,
        message: 'Maintenance record deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  },

  async getPredictions(req: Request, res: Response, next: NextFunction) {
    try {
      const { workshopId } = req.params;
      const userId = (req as any).user.id;
      
      const predictions = await maintenanceService.getMaintenancePredictions(workshopId, userId);

      res.json({
        success: true,
        data: predictions
      });
    } catch (error) {
      next(error);
    }
  },

  async diagnoseIssue(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { symptoms, vehicleInfo, workshopId } = req.body;
      
      const diagnosis = await maintenanceService.diagnoseIssue({
        symptoms,
        vehicleInfo,
        workshopId,
        userId
      });

      logger.info('Issue diagnosed', { diagnosisId: diagnosis.id, userId });
      
      res.json({
        success: true,
        message: 'Issue diagnosed successfully',
        data: diagnosis
      });
    } catch (error) {
      next(error);
    }
  }
};
