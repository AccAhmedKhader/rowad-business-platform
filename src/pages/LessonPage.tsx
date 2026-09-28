import React from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { LessonViewer } from '../components/LessonViewer';
import { NotFoundPage } from './NotFoundPage';
import { 
  normalizeUnitSlug, 
  normalizeLessonSlug, 
  isValidLessonSlug, 
  getLessonIndexFromSlugs, 
  getSlugsFromLessonIndex 
} from '../routing/routeParams';

interface LessonOutletContext {
  onOpenGlossaryTerm?: (termId: string) => void;
  onCompleteExercise?: () => void;
  completedExercisesCount?: number;
}

interface LessonPageProps {
  onOpenGlossaryTerm?: (termId: string) => void;
  onCompleteExercise?: () => void;
}

export const LessonPage: React.FC<LessonPageProps> = ({
  onOpenGlossaryTerm,
  onCompleteExercise
}) => {
  const { unitSlug, lessonSlug } = useParams<{ unitSlug: string; lessonSlug: string }>();
  const navigate = useNavigate();
  const outletCtx = useOutletContext<LessonOutletContext>() || {};

  const effectiveOnCompleteExercise = onCompleteExercise || outletCtx.onCompleteExercise;
  const effectiveOnOpenGlossaryTerm = onOpenGlossaryTerm || outletCtx.onOpenGlossaryTerm;

  const normUnit = normalizeUnitSlug(unitSlug);
  const normLesson = normalizeLessonSlug(lessonSlug);

  // Validate unit slug
  if (!normUnit) {
    return (
      <NotFoundPage
        message={`الوحدة "${unitSlug || ''}" غير صالحة. يرجى اختيار إحدى الوحدات المعتمدة (unit-1 إلى unit-10).`}
        suggestedPath="/curriculum"
      />
    );
  }

  // Validate lesson slug for this unit
  if (!normLesson || !isValidLessonSlug(normUnit, normLesson)) {
    const unitArabicNames: Record<string, string> = {
      'unit-1': 'الوحدة الأولى',
      'unit-2': 'الوحدة الثانية',
      'unit-3': 'الوحدة الثالثة',
      'unit-4': 'الوحدة الرابعة',
      'unit-5': 'الوحدة الخامسة',
      'unit-6': 'الوحدة السادسة',
      'unit-7': 'الوحدة السابعة',
      'unit-8': 'الوحدة الثامنة',
      'unit-9': 'الوحدة التاسعة',
      'unit-10': 'الوحدة العاشرة'
    };
    const unitTitle = unitArabicNames[normUnit] || 'الوحدة المحددة';
    return (
      <NotFoundPage
        message={`الدرس "${lessonSlug || ''}" غير موجود في ${unitTitle}. الدروس المتاحة هي من lesson-1 إلى lesson-6.`}
        suggestedPath={`/curriculum/${normUnit}`}
      />
    );
  }

  const currentLessonIndex = getLessonIndexFromSlugs(normUnit, normLesson);

  const handleLessonIndexChange = (newIndex: number) => {
    const { unitSlug: nextUnit, lessonSlug: nextLesson } = getSlugsFromLessonIndex(newIndex);
    navigate(`/curriculum/${nextUnit}/lessons/${nextLesson}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExerciseCompleted = () => {
    if (effectiveOnCompleteExercise) {
      effectiveOnCompleteExercise();
    }
  };

  return (
    <div className="w-full min-h-screen py-2">
      <LessonViewer
        currentLessonIndex={currentLessonIndex}
        setCurrentLessonIndex={handleLessonIndexChange}
        onCompleteExercise={handleExerciseCompleted}
        onOpenGlossaryTerm={effectiveOnOpenGlossaryTerm}
      />
    </div>
  );
};
