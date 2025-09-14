import { Request, Response, NextFunction } from 'express';
import { workshopService } from '@/services/workshopService';
import { logger } from '@/utils/logger';

export const workshopController = {
  async getWorkshops(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { page = 1, limit = 10, search } = req.query;
      
      const workshops = await workshopService.getWorkshops({
        userId,
        page: Number(page),
        limit: Number(limit),
        search: search as string
      });

      res.json({
        success: true,
        data: workshops
      });
    } catch (error) {
      next(error);
    }
  },

  async createWorkshop(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const workshopData = req.body;
      
      const workshop = await workshopService.createWorkshop(userId, workshopData);

      logger.info('Workshop created', { workshopId: workshop.id, userId });
      
      res.status(201).json({
        success: true,
        message: 'Workshop created successfully',
        data: workshop
      });
    } catch (error) {
      next(error);
    }
  },

  async getWorkshop(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;
      
      const workshop = await workshopService.getWorkshopById(id, userId);

      res.json({
        success: true,
        data: workshop
      });
    } catch (error) {
      next(error);
    }
  },

  async updateWorkshop(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;
      const updateData = req.body;
      
      const workshop = await workshopService.updateWorkshop(id, userId, updateData);

      logger.info('Workshop updated', { workshopId: id, userId });
      
      res.json({
        success: true,
        message: 'Workshop updated successfully',
        data: workshop
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteWorkshop(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;
      
      await workshopService.deleteWorkshop(id, userId);

      logger.info('Workshop deleted', { workshopId: id, userId });
      
      res.json({
        success: true,
        message: 'Workshop deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  },

  async getTechnicians(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;
      
      const technicians = await workshopService.getWorkshopTechnicians(id, userId);

      res.json({
        success: true,
        data: technicians
      });
    } catch (error) {
      next(error);
    }
  },

  async addTechnician(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = (req as any).user.id;
      const { technicianId } = req.body;
      
      const technician = await workshopService.addTechnicianToWorkshop(id, technicianId, userId);

      logger.info('Technician added to workshop', { workshopId: id, technicianId, userId });
      
      res.status(201).json({
        success: true,
        message: 'Technician added successfully',
        data: technician
      });
    } catch (error) {
      next(error);
    }
  }
};
