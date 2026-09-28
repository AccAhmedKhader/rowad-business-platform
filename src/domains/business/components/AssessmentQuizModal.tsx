import React, { useState, useEffect } from 'react';
import { 
  AssessmentQuizDefinition, 
  AssessmentDiagnosticResult 
} from '../types';
import { evaluateAssessment } from '../services/assessmentEngine';
import { SourceProvenanceBadge } from './SourceProvenanceBadge';
import { 
  X, 
  Clock, 
  Award, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Target, 
  BookOpen,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface AssessmentQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: AssessmentQuizDefinition | null;
  onRetake?: () => void;
}

export const AssessmentQuizModal: React.FC<AssessmentQuizModalProps> = ({
  isOpen,
  onClose,
  assessment,
  onRetake
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(20 * 60); // 20 minutes default
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [result, setResult] = useState<AssessmentDiagnosticResult | null>(null);

  // Initialize or reset quiz
  useEffect(() => {
    if (isOpen && assessment) {
      setCurrentIndex(0);
      setSelectedAnswers({});
      setTimeRemaining((assessment.durationMinutes || 20) * 60);
      setIsSubmitted(false);
      setResult(null);
    }
  }, [isOpen, assessment]);

  // Timer countdown
  useEffect(() => {
    if (!isOpen || isSubmitted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isSubmitted, timeRemaining]);

  if (!isOpen || !assessment) return null;

  const currentQuestion = assessment.questions[currentIndex];
  const totalQuestions = assessment.questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted || !currentQuestion) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optIdx
    }));
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    const diagnostic = evaluateAssessment(assessment, selectedAnswers);
    setResult(diagnostic);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-extrabold text-sm sm:text-base font-['Cairo']">
                  {assessment.title}
                </h3>
                <SourceProvenanceBadge
                  origin={assessment.sourceType}
                  sourceTitle="محرك التقييم التشخيصي للمنصة"
                  unitId={assessment.unitNumber}
                  compact={true}
                />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                معرف الاختبار: {assessment.id} • عدد الأسئلة: {totalQuestions}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-black ${
                timeRemaining < 180 
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse' 
                  : 'bg-slate-800 text-amber-300 border border-slate-700'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(timeRemaining)}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isSubmitted ? (
          /* Ongoing Quiz Interface */
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
            {/* Progress Bar & Question Jump */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold">
                  السؤال {currentIndex + 1} من {totalQuestions}
                </span>
                <span className="font-medium text-amber-600 font-bold">
                  تمت الإجابة: {answeredCount} / {totalQuestions}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-amber-500 h-2 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>

              {/* Question Navigation Bubbles */}
              <div className="flex items-center gap-1.5 flex-wrap pt-2">
                {assessment.questions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-slate-900 text-white shadow-xs scale-105'
                          : isAnswered
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Question Display */}
            {currentQuestion && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2 flex-wrap text-[11px]">
                  <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-md">
                    مستوى بلوم: {currentQuestion.bloomLevel || 'فهم'}
                  </span>
                  <span className="bg-slate-200 text-slate-800 font-medium px-2 py-0.5 rounded-md">
                    الصعوبة: {currentQuestion.difficulty || 'متوسط'}
                  </span>
                  {currentQuestion.learningOutcome && (
                    <span className="bg-blue-50 text-blue-800 font-medium px-2 py-0.5 rounded-md truncate max-w-[280px]">
                      {currentQuestion.learningOutcome}
                    </span>
                  )}
                </div>

                <p className="text-base sm:text-lg font-black text-slate-900 font-['Cairo'] leading-relaxed">
                  {currentQuestion.question}
                </p>

                {/* Options list */}
                <div className="space-y-2.5 pt-2">
                  {currentQuestion.options?.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[currentQuestion.id] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full p-4 rounded-xl border text-right transition-all flex items-center justify-between text-sm cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500 border-amber-600 text-white font-black shadow-xs ring-2 ring-amber-300'
                            : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <span className="font-['Cairo'] leading-relaxed">{opt}</span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 mr-3 ${
                          isSelected ? 'bg-white text-amber-600 font-black border-white' : 'border-slate-300 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Comprehensive Diagnostic Results Report */
          <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 animate-fadeIn">
            {/* Score & Qualitative Summary Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl ${
                      (result?.percentage || 0) >= 70 ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {result?.percentage}%
                    </div>
                    <div>
                      <h4 className="text-lg font-black font-['Cairo']">
                        نتيجة التقييم التشخيصي
                      </h4>
                      <p className="text-xs text-slate-300">
                        الدرجة المحققة: {result?.score} من {result?.totalPoints} أسئلة
                      </p>
                    </div>
                  </div>

                  <span className="text-xs px-3 py-1.5 rounded-xl bg-white/10 text-slate-200 border border-white/20 font-bold">
                    حفظ تلقائي في سجل الطالب (LMS)
                  </span>
                </div>

                {/* Qualitative Pedagogical Assessment */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                  <p className="text-xs font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>التقرير التشخيصي النوعي:</span>
                  </p>
                  <p className="text-sm font-medium text-slate-100 leading-relaxed font-['Cairo']">
                    {result?.qualitativeFeedback}
                  </p>
                </div>
              </div>
            </div>

            {/* Bloom Taxonomy Performance Breakdown */}
            {result?.bloomPerformance && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
                <h5 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <span>توزيع الأداء حسب مستويات التفكير (Bloom Taxonomy):</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {Object.entries(result.bloomPerformance).map(([level, stat]) => {
                    const rate = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                    return (
                      <div key={level} className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-700">{level}</span>
                          <span className="font-black text-slate-900">{stat.correct} / {stat.total} ({rate}%)</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              rate >= 75 ? 'bg-emerald-500' : rate >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${rate}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Concepts and Weak LOs to Review */}
            {((result?.conceptsToReview && result.conceptsToReview.length > 0) || 
              (result?.weakLearningObjectives && result.weakLearningObjectives.length > 0)) && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-3">
                <h5 className="text-xs font-black text-amber-950 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>مفاهيم ونواتج تعلم تتطلب المراجعة والتركيز:</span>
                </h5>
                <div className="space-y-2">
                  {result.weakLearningObjectives.map((lo, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-amber-900 bg-white/80 p-2.5 rounded-xl border border-amber-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                      <span>{lo}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Action Items */}
            {result?.recommendedActions && result.recommendedActions.length > 0 && (
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5 space-y-3">
                <h5 className="text-xs font-black text-blue-950 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span>خطة العمل والتدريب المقترحة:</span>
                </h5>
                <ul className="space-y-2 text-xs text-blue-900">
                  {result.recommendedActions.map((action, idx) => (
                    <li key={idx} className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-blue-200 font-medium">
                      <ArrowRight className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Footer Navigation */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {!isSubmitted ? (
            <>
              <button
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:hover:text-slate-600 flex items-center gap-1 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
                <span>السابق</span>
              </button>

              <div className="flex items-center gap-2">
                {currentIndex < totalQuestions - 1 ? (
                  <button
                    onClick={() => setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>التالي</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>إنهاء الاختبار واعتماد التقييم</span>
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setSelectedAnswers({});
                  setCurrentIndex(0);
                  setTimeRemaining((assessment.durationMinutes || 20) * 60);
                  setResult(null);
                  if (onRetake) onRetake();
                }}
                className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة الاختبار</span>
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-xs transition-all cursor-pointer"
              >
                إغلاق والعودة
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
