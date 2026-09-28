import { Response } from 'express';
import { db } from '../db/database';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { academicQualityGate } from '../../domain/academicQuality/AcademicQualityGate';
import { adaptiveLearningEngine } from '../../domain/adaptive/AdaptiveLearningEngine';
import { sessionService } from '../auth/sessionService';

export function handlePlatformCommandCenter(req: AuthenticatedRequest, res: Response) {
  if (!req.user) return res.status(401).json({ success:false, error:{code:'UNAUTHORIZED'} });
  const users = db.users;
  const quality = academicQualityGate.inspectBank(db.questions);
  const studentPlans = users.filter(u => u.role === 'STUDENT').map(u => adaptiveLearningEngine.buildPlan({ userId:u.id, attempts:db.questionAttempts.filter(a=>a.user_id===u.id), lessons:db.lessons }));
  const scores = db.masterySnapshots.map((x:any) => Number(x.mastery_score ?? x.composite_mastery ?? x.score)).filter(Number.isFinite);
  const activeSessions = users.reduce((n,u)=>n+sessionService.listUserSessions(u.id).filter(s=>s.status==='ACTIVE').length,0);
  const alerts: string[] = [];
  if (quality.blockedCount > 0) alerts.push(`يوجد ${quality.blockedCount} بندًا محجوبًا في بوابة الجودة الأكاديمية.`);
  if (quality.reviewCount > 0) alerts.push(`يوجد ${quality.reviewCount} بندًا يحتاج مراجعة أكاديمية.`);
  if (studentPlans.filter(p=>p.status==='RECOVERY').length > 0) alerts.push('يوجد طلاب يحتاجون إلى مسار علاجي تكيفي.');
  return res.json({ success:true, report:{
    generatedAt:new Date().toISOString(),
    users:{ total:users.length, students:users.filter(u=>u.role==='STUDENT').length, teachers:users.filter(u=>u.role==='TEACHER').length, guardians:users.filter(u=>u.role==='GUARDIAN').length, active:users.filter(u=>u.status==='ACTIVE').length },
    academic:{ lessons:db.lessons.length, questions:db.questions.length, exams:db.exams.length, attempts:db.questionAttempts.length, averageMastery:scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):null },
    quality:{ blocked:quality.blockedCount, review:quality.reviewCount, pass:quality.passCount, traceabilityRate:quality.officialTraceabilityRate },
    adaptive:{ studentsWithPlans:studentPlans.filter(p=>p.steps.length>0).length, recovery:studentPlans.filter(p=>p.status==='RECOVERY').length, growth:studentPlans.filter(p=>p.status==='GROWTH').length, mastery:studentPlans.filter(p=>p.status==='MASTERY').length },
    security:{ auditEvents:db.auditLogs.length, activeSessions },
    alerts
  }});
}
