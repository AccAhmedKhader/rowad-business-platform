import express from 'express';
import path from 'path';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

import { db } from './src/server/db/database';

// Import auth and modules
import { 
  handleLogin, 
  handleRegister, 
  handleRefreshToken, 
  handleLogout, 
  handleGetMe, 
  handleListUsers,
  handleAdminCreateUser,
  handleAdminUpdateUserRole,
  handleListSessions,
  handleRevokeSession,
  handleRevokeAllSessions,
  handleForgotPassword,
  handleResetPassword,
  handleChangePassword,
  handleGetAuditLogs
} from './src/server/modules/auth';
import { handleUserManagementSummary, handleManagedUsers, handleBulkUserAction, handleAssignManagedRole, handleAdminResetPassword, handleManagedUserSessions, handleRevokeManagedSessions } from './src/server/modules/userManagement';
import { handleOrgClassSummary, handleCreateOrganization, handleCreateClass, handleEnrollStudents, handleAssignTeacher, handleGuardianLink, handleClassRoster, handleBulkImport } from './src/server/modules/teacherStudentManagement';
import { handleGetLessons, handleGetLessonById } from './src/server/modules/lessons';
import { handleGetQuestions, handleGetQuestionById } from './src/server/modules/questions';
import { handleGetExams, handleGetExamById, handleSubmitExam } from './src/server/modules/exams';
import { handleRecordQuestionAttempt, handleGetStudentProgress, handleUpdateLessonProgress } from './src/server/modules/progress';
import { handleGetAdaptivePath } from './src/server/modules/adaptive';
import { handleGetTeacherAnalytics, handleGetContentAnalytics } from './src/server/modules/analytics';
import { handleAcademicQualityReport } from './src/server/modules/academicQuality';
import { handleAdaptiveLearningPlan } from './src/server/modules/adaptiveLearning';
import { handlePlatformCommandCenter } from './src/server/modules/commandCenter';
import { handleEvaluateJreEssay } from './src/server/modules/ai';
import { authenticate, requireRole } from './src/server/middleware/authMiddleware';
import { runFullPsychometricSuite } from './src/domain/__tests__/psychometricValidation';
import { runAppliedGradingTests } from './src/domain/__tests__/appliedGradingValidation';
import { runP0ProductionSuite } from './src/server/__tests__/p0_production_suite';
import { verifiedAssessmentRegistry } from './src/domain/assessment/registry/VerifiedAssessmentRegistry';
import { sourceSnapshotRegistry } from './src/domain/assessment/registry/SourceSnapshotRegistry';
import { masterIntegrityAuditEngine } from './src/domain/assessment/audit/MasterIntegrityAuditEngine';
import { appendSecurityAuditEvent, verifySecurityAuditChain, getSecurityAuditEvents } from './src/server/auth/productionHardening';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Trust proxy for reverse proxy environments (e.g. Cloud Run, Nginx)
  app.set('trust proxy', 1);

  // M15 Production Hardening: request IDs, secure headers, controlled CORS and bounded payloads.
  app.disable('x-powered-by');
  app.use((req, res, next) => {
    const requestId = req.header('X-Request-ID') || crypto.randomUUID();
    res.setHeader('X-Request-ID', requestId);
    (req as express.Request & { requestId?: string }).requestId = requestId;
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    if (process.env.NODE_ENV === 'production') {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }
    const allowedOrigin = process.env.CORS_ORIGIN;
    if (allowedOrigin) res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Request-ID');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
  });
  app.use(express.json({ limit: '2mb', strict: true }));
  app.use(express.urlencoded({ extended: false, limit: '512kb' }));

  const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: { code: 'RATE_LIMIT_EXCEEDED', message: 'تم تجاوز الحد المسموح به مؤقتًا.' } }
  });
  app.use('/api', apiLimiter);


  // Login Rate Limiter (Prevent Brute Force)
  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // strict authentication brute-force protection
    standardHeaders: true,
    legacyHeaders: false,
    validate: {
      xForwardedForHeader: false,
      forwardedHeader: false,
      trustProxy: false
    },
    message: {
      success: false,
      error: {
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'تم تجاوز الحد المسموح به لمحاولات تسجيل الدخول. يرجى المحاولة بعد قليل.'
      }
    }
  });

  // Logging
  app.use((req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/health')) {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    }
    next();
  });

  // 1. Health & Readiness Endpoints
  const getHealthHandler = (req: express.Request, res: express.Response) => {
    const isDbReady = db.isReady();
    res.status(isDbReady ? 200 : 503).json({
      status: isDbReady ? 'ok' : 'degraded',
      version: '2.0.0',
      service: 'eb-accounting-platform',
      database: {
        ready: isDbReady,
        driver: 'atomic-persistent-disk-engine',
        usersCount: db.users.length,
        lessonsCount: db.lessons.length,
        questionsCount: db.questions.length,
        attemptsCount: db.questionAttempts.length + db.examAttempts.length
      },
      timestamp: new Date().toISOString()
    });
  };

  app.get('/health', getHealthHandler);
  app.get('/api/health', getHealthHandler);

  app.get('/ready', (req, res) => {
    const isDbReady = db.isReady();
    if (!isDbReady) {
      return res.status(503).json({
        status: 'not_ready',
        error: 'Database initialization pending or persistent file unreadable',
        timestamp: new Date().toISOString()
      });
    }
    res.json({
      status: 'ready',
      database: 'connected',
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    });
  });

  // 2. OpenAPI / API Documentation Route
  app.get('/api/docs', (req, res) => {
    res.json({
      openapi: '3.0.0',
      info: {
        title: 'EB Accounting Production API v2.0',
        version: '2.0.0',
        description: 'REST API for Egyptian Baccalaureate Financial Accounting & Business Platform'
      },
      paths: {
        '/health': { get: { summary: 'System Health Check' } },
        '/ready': { get: { summary: 'Kubernetes Readiness Probe' } },
        '/api/auth/register': { post: { summary: 'Register new student account' } },
        '/api/auth/login': { post: { summary: 'User login with bcrypt & JWT' } },
        '/api/auth/refresh': { post: { summary: 'Refresh JWT Access Token' } },
        '/api/auth/logout': { post: { summary: 'Invalidate refresh token session' } },
        '/api/auth/me': { get: { summary: 'Current authenticated user profile' } },
        '/api/auth/users': { get: { summary: 'List platform users (Admin/Teacher)' } },
        '/api/lessons': { get: { summary: 'List all published curriculum lessons' } },
        '/api/lessons/{id}': { get: { summary: 'Get lesson details' } },
        '/api/questions': { get: { summary: 'Query question bank items' } },
        '/api/exams': { get: { summary: 'List examination papers' } },
        '/api/exams/submit': { post: { summary: 'Submit exam answers & calculate score' } },
        '/api/progress/attempt': { post: { summary: 'Record question attempt' } },
        '/api/progress/student': { get: { summary: 'Get canonical student mastery & progress' } },
        '/api/adaptive/path': { get: { summary: 'Get adaptive remedial path' } },
        '/api/analytics/teacher': { get: { summary: 'Teacher dashboard metrics' } },
        '/api/analytics/content': { get: { summary: 'Content manager quality metrics' } },
        '/api/ai/evaluate-jre': { post: { summary: 'Evaluate JRE essay with canonical 20-point Rubric' } }
      }
    });
  });

  // 3. Auth Routes
  app.post('/api/auth/register', handleRegister);
  app.post('/api/auth/login', loginLimiter, handleLogin);
  app.post('/api/auth/refresh', handleRefreshToken);
  app.post('/api/auth/logout', handleLogout);
  app.get('/api/auth/me', authenticate, handleGetMe);
  app.get('/api/auth/users', authenticate, requireRole('ADMIN', 'TEACHER'), handleListUsers);
  app.post('/api/admin/users', authenticate, requireRole('ADMIN'), handleAdminCreateUser);
  app.patch('/api/admin/users/:id/role', authenticate, requireRole('ADMIN'), handleAdminUpdateUserRole);

  // 3.1 Session Lifecycle & Recovery Routes (Phase U2)
  app.get('/api/auth/sessions', authenticate, handleListSessions);
  app.post('/api/auth/sessions/:id/revoke', authenticate, handleRevokeSession);
  app.post('/api/auth/sessions/revoke-all', authenticate, handleRevokeAllSessions);
  app.post('/api/auth/password/forgot', handleForgotPassword);
  app.post('/api/auth/password/reset', handleResetPassword);
  app.post('/api/auth/password/change', authenticate, handleChangePassword);
  app.get('/api/admin/audit-logs', authenticate, requireRole('ADMIN'), handleGetAuditLogs);
  // Advanced User Management Center
  app.get('/api/admin/user-management/summary', authenticate, handleUserManagementSummary);
  app.get('/api/admin/user-management/users', authenticate, handleManagedUsers);
  app.post('/api/admin/user-management/users/bulk', authenticate, handleBulkUserAction);
  app.post('/api/admin/user-management/users/:id/roles', authenticate, handleAssignManagedRole);
  app.post('/api/admin/user-management/users/:id/reset-password', authenticate, handleAdminResetPassword);
  app.get('/api/admin/user-management/users/:id/sessions', authenticate, handleManagedUserSessions);
  app.post('/api/admin/user-management/users/:id/sessions/revoke-all', authenticate, handleRevokeManagedSessions);
  // M14 Teacher & Student Management Deepening
  app.get('/api/admin/academic-management/summary', authenticate, handleOrgClassSummary);
  app.post('/api/admin/academic-management/organizations', authenticate, handleCreateOrganization);
  app.post('/api/admin/academic-management/classes', authenticate, handleCreateClass);
  app.post('/api/admin/academic-management/classes/:classId/enrollments', authenticate, handleEnrollStudents);
  app.post('/api/admin/academic-management/classes/:classId/teachers', authenticate, handleAssignTeacher);
  app.post('/api/admin/academic-management/guardian-links', authenticate, handleGuardianLink);
  app.get('/api/admin/academic-management/classes/:classId/roster', authenticate, handleClassRoster);
  app.post('/api/admin/academic-management/bulk-import', authenticate, handleBulkImport);

  // 4. Content Routes
  app.get('/api/lessons', handleGetLessons);
  app.get('/api/lessons/:id', handleGetLessonById);
  app.get('/api/questions', handleGetQuestions);
  app.get('/api/questions/:id', handleGetQuestionById);
  app.get('/api/exams', handleGetExams);
  app.get('/api/exams/:id', handleGetExamById);
  app.post('/api/exams/submit', authenticate, handleSubmitExam);

  // 5. Progress, Analytics & Adaptive (Strictly Protected)
  app.post('/api/progress/attempt', authenticate, handleRecordQuestionAttempt);
  app.post('/api/progress/lesson', authenticate, handleUpdateLessonProgress);
  app.get('/api/progress/student', authenticate, handleGetStudentProgress);
  app.get('/api/progress/me', authenticate, handleGetStudentProgress);
  app.get('/api/adaptive/path', authenticate, handleGetAdaptivePath);
  app.get('/api/adaptive/plan', authenticate, handleAdaptiveLearningPlan);
  app.get('/api/academic-quality/report', authenticate, requireRole('ADMIN', 'CONTENT_MANAGER', 'REVIEWER'), handleAcademicQualityReport);
  app.get('/api/admin/command-center', authenticate, requireRole('ADMIN'), handlePlatformCommandCenter);
  app.get('/api/analytics/teacher', authenticate, requireRole('TEACHER', 'ADMIN'), handleGetTeacherAnalytics);
  app.get('/api/analytics/content', authenticate, requireRole('CONTENT_MANAGER', 'ADMIN'), handleGetContentAnalytics);
  app.post('/api/ai/evaluate-jre', authenticate, handleEvaluateJreEssay);

  // 6. Verified Assessment Registry & Sources
  app.get('/api/registry/sources', (req, res) => {
    res.json({
      success: true,
      sources: sourceSnapshotRegistry.getAllSnapshots()
    });
  });

  app.get('/api/registry/assessments', (req, res) => {
    const { lessonId } = req.query;
    const items = verifiedAssessmentRegistry.getStudentSafeAssessments(lessonId as string | undefined);
    res.json({
      success: true,
      total: items.length,
      assessments: items
    });
  });

  app.get('/api/registry/assessments/:id', (req, res) => {
    const item = verifiedAssessmentRegistry.getStudentSafeAssessmentById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Assessment not found in registry' });
    }
    res.json({
      success: true,
      assessment: item
    });
  });

  // 7. Automated Audit / Regression Test Endpoints
  app.get('/api/audit/master-integrity', (req, res) => {
    const report = masterIntegrityAuditEngine.runMasterAudit();
    res.json(report);
  });

  app.get('/api/audit/p0-production-suite', async (req, res) => {
    const suiteRes = await runP0ProductionSuite();
    res.json(suiteRes);
  });

  app.get('/api/audit/psychometric-suite', (req, res) => {
    const testResults = runFullPsychometricSuite();
    const allPassed = testResults.every(t => t.passed);
    res.json({
      success: allPassed,
      totalTests: testResults.length,
      passedTests: testResults.filter(t => t.passed).length,
      tests: testResults
    });
  });

  app.get('/api/audit/applied-grading-suite', (req, res) => {
    const suiteRes = runAppliedGradingTests();
    res.json(suiteRes);
  });

  // M15 Security Operations: tamper-evident audit-chain health and controlled audit access.
  app.get('/api/audit/security-chain', authenticate, requireRole('ADMIN'), (req, res) => {
    res.json({ success: true, ...verifySecurityAuditChain(), events: getSecurityAuditEvents(100) });
  });

  // Centralized error boundary prevents stack traces/secrets from reaching clients.
  app.use((err: unknown, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const requestId = (req as express.Request & { requestId?: string }).requestId;
    console.error(`[request:${requestId}]`, err);
    appendSecurityAuditEvent({ action: 'UNHANDLED_SERVER_ERROR', requestId, metadata: { method: req.method, path: req.path } });
    res.status(500).json({ success: false, error: { code: 'INTERNAL_SERVER_ERROR', message: 'حدث خطأ داخلي. يرجى المحاولة لاحقًا.', requestId } });
  });


  // 7. Vite / Static serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Production v2.1] Server running on http://0.0.0.0:${PORT}`);
  });
  const shutdown = (signal: string) => {
    console.log(`[Production v2.1] ${signal}: graceful shutdown requested`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10000).unref();
  };
  process.once('SIGTERM', () => shutdown('SIGTERM'));
  process.once('SIGINT', () => shutdown('SIGINT'));

}

startServer();
