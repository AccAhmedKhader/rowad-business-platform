export interface PlatformCommandCenterReport {
  generatedAt: string;
  users: { total: number; students: number; teachers: number; guardians: number; active: number };
  academic: { lessons: number; questions: number; exams: number; attempts: number; averageMastery: number | null };
  quality: { blocked: number; review: number; pass: number; traceabilityRate: number };
  adaptive: { studentsWithPlans: number; recovery: number; growth: number; mastery: number };
  security: { auditEvents: number; activeSessions: number };
  alerts: string[];
}
