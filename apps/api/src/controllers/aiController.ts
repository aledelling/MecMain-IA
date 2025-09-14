import { Request, Response, NextFunction } from 'express';
import { aiService } from '@/services/aiService';
import { logger } from '@/utils/logger';

export const aiController = {
  async diagnoseIssue(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { symptoms, vehicleInfo, workshopId } = req.body;
      
      const diagnosis = await aiService.diagnoseIssue({
        symptoms,
        vehicleInfo,
        workshopId,
        userId
      });

      logger.info('AI diagnosis completed', { diagnosisId: diagnosis.id, userId });
      
      res.json({
        success: true,
        message: 'Diagnosis completed successfully',
        data: diagnosis
      });
    } catch (error) {
      next(error);
    }
  },

  async predictMaintenance(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { vehicleId, workshopId, timeHorizon = 30 } = req.body;
      
      const predictions = await aiService.predictMaintenance({
        vehicleId,
        workshopId,
        timeHorizon,
        userId
      });

      logger.info('Maintenance prediction completed', { vehicleId, workshopId, userId });
      
      res.json({
        success: true,
        message: 'Maintenance predictions generated successfully',
        data: predictions
      });
    } catch (error) {
      next(error);
    }
  },

  async recommendActions(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { issueId, context } = req.body;
      
      const recommendations = await aiService.recommendActions({
        issueId,
        context,
        userId
      });

      logger.info('AI recommendations generated', { issueId, userId });
      
      res.json({
        success: true,
        message: 'Recommendations generated successfully',
        data: recommendations
      });
    } catch (error) {
      next(error);
    }
  },

  async getTrainingProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const currentUserId = (req as any).user.id;
      
      const progress = await aiService.getTrainingProgress(userId, currentUserId);

      res.json({
        success: true,
        data: progress
      });
    } catch (error) {
      next(error);
    }
  },

  async startTraining(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { moduleId, workshopId } = req.body;
      
      const training = await aiService.startTraining({
        userId,
        moduleId,
        workshopId
      });

      logger.info('Training started', { trainingId: training.id, userId, moduleId });
      
      res.status(201).json({
        success: true,
        message: 'Training started successfully',
        data: training
      });
    } catch (error) {
      next(error);
    }
  },

  async completeTraining(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { trainingId, score, answers } = req.body;
      
      const result = await aiService.completeTraining({
        trainingId,
        userId,
        score,
        answers
      });

      logger.info('Training completed', { trainingId, userId, score });
      
      res.json({
        success: true,
        message: 'Training completed successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
};
