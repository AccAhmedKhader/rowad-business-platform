import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppShell } from './AppShell';
import { HomePage } from '../pages/HomePage';
import { CurriculumPage } from '../pages/CurriculumPage';
import { UnitPage } from '../pages/UnitPage';
import { LessonPage } from '../pages/LessonPage';
import { TrainingPage } from '../pages/TrainingPage';
import { AssessmentPage } from '../pages/AssessmentPage';
import { QuestionBankPage } from '../pages/QuestionBankPage';
import { MockExamPage } from '../pages/MockExamPage';
import { UnitReviewPage } from '../pages/UnitReviewPage';
import { MyPathPage } from '../pages/MyPathPage';
import { LibraryPage } from '../pages/LibraryPage';
import { TeacherDashboardPage } from '../pages/TeacherDashboardPage';
import { ContentAnalyticsPage } from '../pages/ContentAnalyticsPage';
import { UnauthorizedPage } from '../pages/UnauthorizedPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { PrintView } from '../components/PrintView';
import { BusinessDomainPage } from '../pages/BusinessDomainPage';
import { RoleGuard } from './routeGuards';
import { UserManagementPage } from '../pages/UserManagementPage';
import { TeacherStudentManagementPage } from '../pages/TeacherStudentManagementPage';
import { PlatformCommandCenterPage } from '../pages/PlatformCommandCenterPage';

export const AppRoutes: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Primary Layout wrapping all shell routes */}
      <Route element={<AppShell />}>
        {/* Core & Home */}
        <Route path="/" element={<HomePage />} />

        {/* Curriculum Routes & Deep Links */}
        <Route path="/curriculum" element={<CurriculumPage />} />
        <Route path="/curriculum/:unitSlug" element={<UnitPage />} />
        <Route path="/curriculum/:unitSlug/lessons" element={<UnitPage />} />
        <Route path="/curriculum/:unitSlug/lessons/:lessonSlug" element={<LessonPage />} />

        {/* Training Routes */}
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/training/exercises" element={<TrainingPage />} />
        <Route path="/training/jre" element={<TrainingPage />} />
        <Route path="/training/simulators" element={<TrainingPage />} />
        <Route path="/training/documentary-cycle" element={<TrainingPage />} />
        <Route path="/training/error-correction" element={<TrainingPage />} />
        <Route path="/training/capstone" element={<TrainingPage />} />
        <Route path="/error-correction" element={<Navigate to="/training/error-correction" replace />} />
        <Route path="/errors-lab" element={<Navigate to="/training/error-correction" replace />} />
        <Route path="/capstone-portfolio" element={<Navigate to="/training/capstone" replace />} />
        <Route path="/portfolio" element={<Navigate to="/training/capstone" replace />} />

        {/* Assessment Routes - Separated Dedicated Route Components */}
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/assessment/question-bank" element={<QuestionBankPage />} />
        <Route path="/assessment/ministry-assessments" element={<AssessmentPage />} />
        <Route path="/assessment/unit-tests" element={<UnitReviewPage />} />
        <Route path="/assessment/mock-exams" element={<MockExamPage />} />

        {/* My Path (Adaptive & Mastery) */}
        <Route path="/my-path" element={<MyPathPage />} />
        <Route path="/my-path/progress" element={<MyPathPage />} />
        <Route path="/my-path/mastery" element={<MyPathPage />} />
        <Route path="/my-path/recommendations" element={<MyPathPage />} />
        <Route path="/my-path/capstone" element={<MyPathPage />} />

        {/* Library & Platform Publications */}
        <Route path="/library" element={<LibraryPage />} />

        {/* Unified Rowad academic domain: Business Administration */}
        <Route path="/business" element={<BusinessDomainPage />} />
        <Route path="/books" element={<Navigate to="/library" replace />} />

        {/* Protected Admin/Teacher Dashboards */}
        <Route path="/admin/users" element={<RoleGuard allowedRoles={['ADMIN']}><UserManagementPage /></RoleGuard>} />
        <Route path="/admin/academic-management" element={<RoleGuard allowedRoles={['ADMIN']}><TeacherStudentManagementPage /></RoleGuard>} />
        <Route path="/admin/command-center" element={<RoleGuard allowedRoles={['ADMIN']}><PlatformCommandCenterPage /></RoleGuard>} />

        <Route 
          path="/teacher-dashboard" 
          element={
            <RoleGuard allowedRoles={['TEACHER', 'ADMIN']}>
              <TeacherDashboardPage />
            </RoleGuard>
          } 
        />
        <Route 
          path="/content-analytics" 
          element={
            <RoleGuard allowedRoles={['CONTENT_MANAGER', 'ADMIN']}>
              <ContentAnalyticsPage />
            </RoleGuard>
          } 
        />

        {/* Print / Export View */}
        <Route path="/print" element={<PrintView onBack={() => navigate(-1)} />} />

        {/* Status & Guard Fallback Pages */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/404" element={<NotFoundPage />} />

        {/* Legacy Route Redirects (100% Backwards Compatibility) */}
        <Route path="/welcome" element={<Navigate to="/curriculum" replace />} />
        <Route path="/map" element={<Navigate to="/curriculum/unit-1" replace />} />
        <Route path="/lessons" element={<Navigate to="/curriculum/unit-1/lessons/lesson-1" replace />} />
        <Route path="/simulator" element={<Navigate to="/training/simulators" replace />} />
        <Route path="/jre" element={<Navigate to="/training/jre" replace />} />
        <Route path="/review" element={<Navigate to="/assessment/unit-tests" replace />} />
        <Route path="/qbank" element={<Navigate to="/assessment/question-bank" replace />} />
        <Route path="/exams" element={<Navigate to="/assessment/mock-exams" replace />} />

        {/* Catch-all Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
