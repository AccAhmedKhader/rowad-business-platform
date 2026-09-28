import { Response } from 'express';
import { db } from '../db/database';
import { adaptiveLearningEngine } from '../../domain/adaptive/AdaptiveLearningEngine';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export function handleAdaptiveLearningPlan(req: AuthenticatedRequest, res: Response) {
  if (!req.user) return res.status(401).json({ success:false, error:{code:'UNAUTHORIZED'} });
  let targetUserId = req.user.userId;
  if (['ADMIN','TEACHER'].includes(req.user.role) && typeof req.query.userId === 'string') targetUserId = req.query.userId;
  const attempts = db.questionAttempts.filter(a => a.user_id === targetUserId);
  const plan = adaptiveLearningEngine.buildPlan({ userId: targetUserId, attempts, lessons: db.lessons });
  return res.json({ success:true, plan });
}
