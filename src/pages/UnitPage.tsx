import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UnitMapAndOutcomes } from '../components/UnitMapAndOutcomes';
import { NotFoundPage } from './NotFoundPage';
import { normalizeUnitSlug, getSlugsFromLessonIndex } from '../routing/routeParams';
import { UnitMindMapView, MindMapView } from '../components/MindMapView';
import { getUnitMindMapBySlug } from '../data/mindMaps';
import { X, Sparkles } from 'lucide-react';

export const UnitPage: React.FC = () => {
  const { unitSlug } = useParams<{ unitSlug: string }>();
  const navigate = useNavigate();
  const [enrichingLessonId, setEnrichingLessonId] = useState<string | null>(null);

  const normalizedUnit = normalizeUnitSlug(unitSlug);

  if (!normalizedUnit) {
    return (
      <NotFoundPage 
        message={`الوحدة المطلوبة "${unitSlug || ''}" غير موجودة. يتضمن المنهاج حالياً 10 وحدات: unit-1 إلى unit-10.`}
        suggestedPath="/curriculum"
      />
    );
  }

  const handleSelectLesson = (lessonIndex: number) => {
    const { unitSlug: targetUnit, lessonSlug } = getSlugsFromLessonIndex(lessonIndex);
    navigate(`/curriculum/${targetUnit}/lessons/${lessonSlug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [activeLessonMindMapId, setActiveLessonMindMapId] = useState<string | null>(null);

  // خريطة الوحدة: الدروس كعقد، والنقر ينقل إلى خريطة الدرس
  const unitMap = getUnitMindMapBySlug(normalizedUnit);

  // كل الدروس بما فيها الإثرائي متاحة للاستعراض
  const isLessonAvailable = (_lessonId: string) => true;

  const handleSelectLessonById = (lessonId: string) => {
    const lesson = unitMap?.lessons.find((l) => l.id === lessonId);
    if (!lesson) return;
    if (lesson.enrich) {
      // فتح خريطة الدرس الإثرائي مباشرة
      setEnrichingLessonId(lesson.id);
      return;
    }
    navigate(`/curriculum/unit-${unitMap!.n}/lessons/lesson-${lesson.no}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLessonMindMapModal = (lessonId: string) => {
    setActiveLessonMindMapId(lessonId);
  };

  return (
    <div className="py-4 space-y-8">
      {unitMap && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <UnitMindMapView
            unit={normalizedUnit}
            onSelectLesson={handleSelectLessonById}
            onSelectLessonMindMap={handleOpenLessonMindMapModal}
            isLessonAvailable={isLessonAvailable}
          />
        </div>
      )}

      {/* نافذة منبثقة تفاعلية لخريطة الدرس التفصيلية عند استعراضها من خريطة الوحدة */}
      {activeLessonMindMapId && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-[#CBD5E1] rounded-2xl shadow-2xl max-w-7xl w-full p-4 sm:p-6 space-y-4 max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>خريطة الدرس التفصيلية التفاعلية (Bilateral Map)</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveLessonMindMapId(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                title="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <MindMapView
              lessonId={activeLessonMindMapId}
              showHeader={true}
            />
          </div>
        </div>
      )}

      {/* نافذة منبثقة للدرس الإثرائي إن تم اختياره */}
      {enrichingLessonId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-[#E4DED0] rounded-2xl shadow-2xl max-w-7xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#C4A484] uppercase">
                <Sparkles className="w-4 h-4" />
                <span>خريطة الدرس الإثرائي التفاعلية الكاملة</span>
              </div>
              <button
                type="button"
                onClick={() => setEnrichingLessonId(null)}
                className="p-1.5 rounded-lg text-[#888] hover:text-[#111] hover:bg-[#F0ECE1] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <MindMapView
              lessonId={enrichingLessonId}
              showHeader={true}
            />
          </div>
        </div>
      )}

      <UnitMapAndOutcomes
        key={normalizedUnit}
        initialUnitId={normalizedUnit}
        onSelectLesson={handleSelectLesson}
      />
    </div>
  );
};


