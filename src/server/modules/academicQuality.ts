import { Response } from 'express';
import { db } from '../db/database';
import { authenticate, AuthenticatedRequest } from '../middleware/authMiddleware';
import { academicQualityGate } from '../../domain/academicQuality/AcademicQualityGate';

export function handleAcademicQualityReport(req: AuthenticatedRequest, res: Response) {
  if (!req.user) return res.status(401).json({ success:false, error:{code:'UNAUTHORIZED'} });
  const report = academicQualityGate.inspectBank(db.questions);
  return res.json({ success:true, report });
}
