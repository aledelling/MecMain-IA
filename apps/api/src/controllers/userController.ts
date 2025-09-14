import { Request, Response, NextFunction } from 'express';
import { userService } from '@/services/userService';
import { logger } from '@/utils/logger';

export const userController = {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      
      const user = await userService.getUserById(userId);

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  },

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const updateData = req.body;
      
      const user = await userService.updateUser(userId, updateData);

      logger.info('User profile updated', { userId });
      
      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: user
      });
    } catch (error) {
      next(error);
    }
  },

  async deleteAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      
      await userService.deleteUser(userId);

      logger.info('User account deleted', { userId });
      
      res.json({
        success: true,
        message: 'Account deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  },

  async getUserWorkshops(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      
      const workshops = await userService.getUserWorkshops(userId);

      res.json({
        success: true,
        data: workshops
      });
    } catch (error) {
      next(error);
    }
  }
};
