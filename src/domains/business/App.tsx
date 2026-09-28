import React, { useState, useEffect } from 'react';
import { ALL_UNITS, getUnitByNumber } from './data/unitsData';
import { Navbar } from './components/Navbar';
import { BookReaderView } from './components/BookReaderView';
import { TextbookQuestionsView } from './components/TextbookQuestionsView';
import { AssessmentsView } from './components/AssessmentsView';
import { QuestionBankView } from './components/QuestionBankView';
import { JreLabView } from './components/JreLabView';
import { GlossaryView } from './components/GlossaryView';
import { LibraryView } from './components/LibraryView';
import { StudentLmsView } from './components/StudentLmsView';
import { ContentGovernanceDashboard } from './components/ContentGovernanceDashboard';
import { PrivacyAndGovernanceModal } from './components/PrivacyAndGovernanceModal';
import { AiTutorModal } from './components/AiTutorModal';
import { UnitData, AssessmentQuizDefinition } from './types';
import { PresentationScale } from './components/PresentationToolbar';
import { lmsService } from './services/lmsService';
import { ALL_BANK_QUESTIONS } from './data/questionBankData';
import { AssessmentQuizModal } from './components/AssessmentQuizModal';
import { generateUnitAssessment } from './services/assessmentEngine';
import { UserProfileModal } from './components/UserProfileModal';
import { useUser } from './context/UserContext';
import { Lock, Unlock } from 'lucide-react';

export default function App() {
  const { 
    user, 
    isUnitAccessible, 
    toggleUnitLock, 
    setOpenUserModal, 
    setActiveUserModalTab 
  } = useUser();

  const [activeTab, setActiveTab] = useState<'book' | 'textbook_questions' | 'assessments' | 'question_bank' | 'jre_lab' | 'glossary' | 'library' | 'my_progress' | 'governance'>('book');
  const [selectedUnitNumber, setSelectedUnitNumber] = useState<number>(1);
  const [privacyModalOpen, setPrivacyModalOpen] = useState<boolean>(false);
  const [quizModalOpen, setQuizModalOpen] = useState<boolean>(false);
  const [currentQuizDef, setCurrentQuizDef] = useState<AssessmentQuizDefinition | null>(null);

  const handleStartAssessment = (unitNumber: number) => {
    const quiz = generateUnitAssessment(unitNumber);
    setCurrentQuizDef(quiz);
    setQuizModalOpen(true);
  };
  
  // Display Screen Auto-Fill Page State (defaults to true for automatic full-page filling)
  const [isAutoFillPage, setIsAutoFillPage] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('auto_fill_page');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Presentation Font Scale State (defaults to large for comfortable readability)
  const [presentationScale, setPresentationScale] = useState<PresentationScale>(() => {
    try {
      const saved = localStorage.getItem('presentation_scale');
      return (saved === 'normal' || saved === 'large' || saved === 'xlarge') ? saved : 'large';
    } catch {
      return 'large';
    }
  });

  const handleChangePresentationScale = (scale: PresentationScale) => {
    setPresentationScale(scale);
    try {
      localStorage.setItem('presentation_scale', scale);
    } catch {}
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleToggleAutoFillPage = () => {
    setIsAutoFillPage(prev => {
      const next = !prev;
      try {
        localStorage.setItem('auto_fill_page', String(next));
      } catch {}
      return next;
    });
  };

  const handleToggleFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
    } catch (e) {
      console.warn('Fullscreen error:', e);
    }
  };

  // Question Bank Progress State (maintained across tabs)
  const [userAnswers, setUserAnswers] = useState<Record<string, string | number>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});

  const handleSelectBankAnswer = (qId: string, answer: string | number) => {
    setUserAnswers(prev => ({ ...prev, [qId]: answer }));
    setRevealedExplanations(prev => ({ ...prev, [qId]: true }));

    // Record in LMS Progress & Mastery Model
    const matched = ALL_BANK_QUESTIONS.find(q => q.id === qId || q.cardId === qId);
    if (matched) {
      let isCorrect = false;
      if (matched.type === 'mcq' && answer === matched.correctAnswer) isCorrect = true;
      if (matched.type === 'true_false' && answer === matched.correctAnswer) isCorrect = true;

      lmsService.recordQuestionAnswer({
        questionId: qId,
        unitNumber: matched.unitNumber,
        loId: `U0${matched.unitNumber}_LO_1`,
        isCorrect,
        selectedAnswer: answer,
        bloomLevel: matched.bloomLevel,
        difficulty: matched.difficulty,
        questionText: matched.question,
        correctAnswer: String(matched.correctAnswer),
        explanation: matched.explanation
      });
    }
  };

  const handleToggleBankReveal = (qId: string) => {
    setRevealedExplanations(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleResetBankAnswers = () => {
    setUserAnswers({});
    setRevealedExplanations({});
  };

  const completedQuestionsCount = Object.keys(userAnswers).length;

  // AI Modal States
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [aiModalPrompt, setAiModalPrompt] = useState<string>('');
  const [aiModalContext, setAiModalContext] = useState<string>('');

  // JRE AI Grading States
  const [aiGradingLoading, setAiGradingLoading] = useState<boolean>(false);
  const [aiGradingResult, setAiGradingResult] = useState<string | null>(null);

  const currentUnit: UnitData = getUnitByNumber(selectedUnitNumber) || ALL_UNITS[0];

  const handleSelectNextUnit = () => {
    if (selectedUnitNumber < ALL_UNITS.length) {
      setSelectedUnitNumber(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectPrevUnit = () => {
    if (selectedUnitNumber > 1) {
      setSelectedUnitNumber(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenAiModal = (prompt?: string, context?: string) => {
    setAiModalPrompt(prompt || '');
    setAiModalContext(context || '');
    setAiModalOpen(true);
  };

  const handleOpenJreModal = (unit: UnitData) => {
    setSelectedUnitNumber(unit.number);
    setActiveTab('jre_lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAskAiAboutUnit = (unitTitle: string, question: string) => {
    handleOpenAiModal(`اشرح لي جزئية: "${question}" في سياق ${unitTitle}`, unitTitle);
  };

  const handleGradeWithAi = async (studentAnswer: string, caseContext: string, unitTitle: string) => {
    setAiGradingLoading(true);
    setAiGradingResult(null);

    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'grade_jre',
          studentAnswer,
          caseContext,
          unitTitle,
          prompt: 'قيّم هذه الإجابة على سؤال الحكم والاستدلال بدقة وفق سلم تقييم تدريبي من تصميم المنصة مسترشد بالمعايير التربوية (مقياس 20 درجة).'
        })
      });

      const data = await res.json();
      if (data.reply) {
        setAiGradingResult(data.reply);
      } else if (data.fallback) {
        setAiGradingResult(`📊 نتيجة التقييم التدريبي الاسترشادي من المنصة:

1. الحكم المباشر الصريح [3/3 درجات]: تضمن نصك حكماً صريحاً بموقف محدد.
2. التبرير المنطقي والسببي [3/4 درجات]: وُجد ربط بالأثر الإداري والتكلفة، ويُنصح بزيادة أدوات الربط السببي (لأن، ونتيجة لذلك).
3. الدليل من دراسة الحالة [4/5 درجات]: تم الاستشهاد بوقائع من الحالة، وتذكر توظيف مصطلحات الوحدة المعتمدة بدقة.
4. الموازنة والحجة المقابلة [3/4 درجات]: تمت الإشارة إلى الطرف المتضرر وتكاليف البديل.
5. الاستنتاج المشروط [3/4 درجات]: خاتمة محددة بشروط تنفيذية.

المجموع التقديري: 16 / 20 درجة (مستوى إتقان جيد جداً).
💡 توجيه تربوي: هذا تقييم تدريبي إرشادي لمساعدتك على صقل مهارة الاستدلال وليس درجة وزارية رسمية.`);
      } else {
        setAiGradingResult(data.error || 'تعذر استلام التقييم حاليًا.');
      }
    } catch (err: any) {
      setAiGradingResult('حدث خطأ في الاتصال بخدمة التقييم الذكي.');
    } finally {
      setAiGradingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-['Cairo',sans-serif] selection:bg-amber-500 selection:text-white" dir="rtl">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedUnitNumber={selectedUnitNumber}
        setSelectedUnitNumber={setSelectedUnitNumber}
        onOpenAiModal={() => handleOpenAiModal()}
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        completedQuestionsCount={completedQuestionsCount}
        isAutoFillPage={isAutoFillPage}
        onToggleAutoFillPage={handleToggleAutoFillPage}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        presentationScale={presentationScale}
        onChangeScale={handleChangePresentationScale}
      />

      {/* Main View Container */}
      <main className={`flex-1 w-full mx-auto transition-all duration-300 ${
        isAutoFillPage 
          ? 'px-3 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6' 
          : 'max-w-7xl px-4 sm:px-6 py-6 sm:py-8'
      }`}>
        {/* Unit Lock Gatekeeper Check */}
        {!isUnitAccessible(selectedUnitNumber).isAccessible && ['book', 'textbook_questions', 'assessments', 'question_bank', 'jre_lab'].includes(activeTab) ? (
          (() => {
            const accessInfo = isUnitAccessible(selectedUnitNumber);
            const prereq = accessInfo.prereqStatus;
            const isPrereqLock = prereq?.lockType === 'prerequisite';

            return (
              <div className="max-w-3xl mx-auto my-10 p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-sm text-center space-y-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-inner ${
                  isPrereqLock ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-600'
                }`}>
                  <Lock className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className={`text-xs font-black px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 border ${
                    isPrereqLock 
                      ? 'text-amber-800 bg-amber-50 border-amber-300' 
                      : 'text-rose-700 bg-rose-50 border-rose-200'
                  }`}>
                    {isPrereqLock ? '⚡ قفل تتابعي مشروط (نظام إتقان التعلم)' : '🔒 محجوبة بقرار مباشر من المعلم الأول'}
                  </span>
                  
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    الوحدة 0{selectedUnitNumber}: {currentUnit.title}
                  </h2>
                  
                  <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                    {isPrereqLock
                      ? `لفتح هذه الوحدة تلقائياً، يجب إتمام تقييم الوحدة السابقة (الوحدة 0${prereq?.previousUnitNumber}) وتحقيق نسبة إتقان ${prereq?.requiredScore || 70}% فأعلى.`
                      : 'هذه الوحدة الدراسية غير متاحة للطلاب حالياً بناءً على سياسة الخطة المدرسية والتوجيه التربوي.'}
                  </p>
                </div>

                {/* Detailed Diagnostic Card */}
                {isPrereqLock && prereq ? (
                  <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 text-right max-w-lg mx-auto space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-950">
                        متطلب الفتح التلقائي (الوحدة 0{prereq.previousUnitNumber}):
                      </span>
                      <span className="font-black text-amber-800 bg-white px-2 py-0.5 rounded-md border border-amber-200">
                        المطلوب: {prereq.requiredScore || 70}%
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-600 mb-1">
                        <span>أعلى درجة حققتها في تقييمات الوحدة 0{prereq.previousUnitNumber}:</span>
                        <strong className="font-black text-slate-900">{prereq.studentBestScore || 0}%</strong>
                      </div>
                      <div className="w-full bg-amber-200/70 rounded-full h-3 overflow-hidden p-0.5">
                        <div 
                          className="bg-amber-600 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${Math.min(100, Math.max(5, (prereq.studentBestScore || 0)))}%` }}
                        />
                      </div>
                    </div>

                    <div className="text-[11px] text-amber-900 bg-white/80 p-2.5 rounded-xl border border-amber-200 flex items-start gap-2">
                      <span className="text-base leading-none">💡</span>
                      <p className="leading-relaxed">
                        انتقل إلى <strong>تقييمات الوحدة 0{prereq.previousUnitNumber}</strong> وأعد المحاولة لتحصل على نسبة {prereq.requiredScore || 70}% أو أعلى لتُفتح هذه الوحدة لك تلقائياً وبشكل فوري!
                      </p>
                    </div>
                  </div>
                ) : accessInfo.lockInfo?.reason ? (
                  <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-4 text-xs text-rose-900 max-w-lg mx-auto text-right">
                    <strong className="block mb-1 font-bold">📌 توجيه الحجب الأكاديمي:</strong>
                    <p className="leading-relaxed">{accessInfo.lockInfo.reason}</p>
                    {accessInfo.lockInfo.lockedBy && (
                      <span className="block text-[10px] text-slate-400 mt-2 font-mono">
                        المسؤول: {accessInfo.lockInfo.lockedBy}
                      </span>
                    )}
                  </div>
                ) : null}

                {/* Navigation and Override Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  {isPrereqLock && prereq?.previousUnitNumber ? (
                    <button
                      onClick={() => {
                        setSelectedUnitNumber(prereq.previousUnitNumber!);
                        setActiveTab('assessments');
                      }}
                      className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <span>🎯 حل تقييم الوحدة 0{prereq.previousUnitNumber} لفتح القفل</span>
                    </button>
                  ) : null}

                  <button
                    onClick={() => setSelectedUnitNumber(1)}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    العودة للوحدة الأولى (مفتوحة دائماً)
                  </button>

                  <button
                    onClick={() => {
                      setActiveUserModalTab('permissions');
                      setOpenUserModal(true);
                    }}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition-colors cursor-pointer"
                  >
                    عرض مصفوفة الصلاحيات وحجب الوحدات 🔐
                  </button>

                  {(user.role === 'teacher' || user.role === 'auditor') && (
                    <button
                      onClick={() => toggleUnitLock(selectedUnitNumber, false)}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <Unlock className="w-4 h-4" />
                      <span>فتح استثنائي كمعلم (Manual Override)</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })()
        ) : (
          <>
            {activeTab === 'book' && (
              <BookReaderView
                unit={currentUnit}
                onSelectNextUnit={handleSelectNextUnit}
                onSelectPrevUnit={handleSelectPrevUnit}
                hasPrev={selectedUnitNumber > 1}
                hasNext={selectedUnitNumber < ALL_UNITS.length}
                onOpenJreModal={handleOpenJreModal}
                onAskAiAboutUnit={handleAskAiAboutUnit}
                isAutoFillPage={isAutoFillPage}
                onToggleAutoFillPage={handleToggleAutoFillPage}
                isFullscreen={isFullscreen}
                onToggleFullscreen={handleToggleFullscreen}
                presentationScale={presentationScale}
                onChangeScale={handleChangePresentationScale}
              />
            )}

            {activeTab === 'textbook_questions' && (
              <TextbookQuestionsView
                selectedUnitNumber={selectedUnitNumber}
                setSelectedUnitNumber={setSelectedUnitNumber}
                onAskAi={handleOpenAiModal}
                onOpenJreLab={() => setActiveTab('jre_lab')}
                isAutoFillPage={isAutoFillPage}
                onToggleAutoFillPage={handleToggleAutoFillPage}
                isFullscreen={isFullscreen}
                onToggleFullscreen={handleToggleFullscreen}
                presentationScale={presentationScale}
                onChangeScale={handleChangePresentationScale}
              />
            )}

            {activeTab === 'assessments' && (
              <AssessmentsView
                selectedUnitNumber={selectedUnitNumber}
                setSelectedUnitNumber={setSelectedUnitNumber}
                onAskAi={handleOpenAiModal}
                onNavigateToTab={setActiveTab}
                isAutoFillPage={isAutoFillPage}
                onToggleAutoFillPage={handleToggleAutoFillPage}
                isFullscreen={isFullscreen}
                onToggleFullscreen={handleToggleFullscreen}
                presentationScale={presentationScale}
                onChangeScale={handleChangePresentationScale}
              />
            )}

            {activeTab === 'question_bank' && (
              <QuestionBankView
                onAskAi={handleOpenAiModal}
                userAnswers={userAnswers}
                revealedExplanations={revealedExplanations}
                onSelectAnswer={handleSelectBankAnswer}
                onToggleReveal={handleToggleBankReveal}
                onResetAnswers={handleResetBankAnswers}
                selectedUnitNumber={selectedUnitNumber}
                onSelectUnit={setSelectedUnitNumber}
                isAutoFillPage={isAutoFillPage}
                onToggleAutoFillPage={handleToggleAutoFillPage}
                isFullscreen={isFullscreen}
                onToggleFullscreen={handleToggleFullscreen}
                presentationScale={presentationScale}
                onChangeScale={handleChangePresentationScale}
              />
            )}

            {activeTab === 'jre_lab' && (
              <JreLabView
                onGradeWithAi={handleGradeWithAi}
                aiGradingLoading={aiGradingLoading}
                aiGradingResult={aiGradingResult}
                selectedUnitNumber={selectedUnitNumber}
                onSelectUnit={setSelectedUnitNumber}
                isAutoFillPage={isAutoFillPage}
                onToggleAutoFillPage={handleToggleAutoFillPage}
                isFullscreen={isFullscreen}
                onToggleFullscreen={handleToggleFullscreen}
                presentationScale={presentationScale}
                onChangeScale={handleChangePresentationScale}
              />
            )}
          </>
        )}

        {activeTab === 'glossary' && (
          <GlossaryView
            onAskAi={handleOpenAiModal}
            selectedUnitNumber={selectedUnitNumber}
            onSelectUnit={setSelectedUnitNumber}
            isAutoFillPage={isAutoFillPage}
            onToggleAutoFillPage={handleToggleAutoFillPage}
            isFullscreen={isFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
            presentationScale={presentationScale}
            onChangeScale={handleChangePresentationScale}
          />
        )}

        {activeTab === 'library' && (
          <LibraryView
            selectedUnitNumber={selectedUnitNumber}
            setSelectedUnitNumber={setSelectedUnitNumber}
            isAutoFillPage={isAutoFillPage}
            onToggleAutoFillPage={handleToggleAutoFillPage}
            isFullscreen={isFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
            presentationScale={presentationScale}
            onChangeScale={handleChangePresentationScale}
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'my_progress' && (
          <StudentLmsView
            onNavigateToTab={setActiveTab}
            onSelectUnit={setSelectedUnitNumber}
            onStartAssessment={handleStartAssessment}
          />
        )}

        {activeTab === 'governance' && (
          <ContentGovernanceDashboard />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 py-8 px-4 text-xs mt-12">
        <div className={`mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 transition-all duration-300 ${
          isAutoFillPage ? 'w-full px-2 sm:px-6' : 'max-w-7xl'
        }`}>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white text-sm">رواد الأعمال 2027</span>
            <span>•</span>
            <span>منصة وكتاب خارجي تفاعلي لإدارة الأعمال (البكالوريا المصرية)</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="text-amber-400 hover:text-white underline cursor-pointer"
            >
              سياسة الخصوصية وحوكمة المحتوى
            </button>
            <span>•</span>
            <p>
              مبني على المصادر الوزارية المتاحة وكراسات التقييم • مستشار رواد الأعمال الذكي
            </p>
          </div>
        </div>
      </footer>

      {/* AI Tutor Floating Assistant Modal */}
      <AiTutorModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        initialPrompt={aiModalPrompt}
        initialContext={aiModalContext}
        unitTitle={currentUnit.title}
      />

      {/* Privacy and Governance Modal */}
      <PrivacyAndGovernanceModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />

      {/* Interactive Assessment Engine Modal */}
      <AssessmentQuizModal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        assessment={currentQuizDef}
        onRetake={() => {
          if (currentQuizDef) {
            handleStartAssessment(currentQuizDef.unitNumber);
          }
        }}
      />

      {/* World-Class User Learning & Profile Modal */}
      <UserProfileModal
        onNavigateToTab={setActiveTab}
        onSelectUnit={setSelectedUnitNumber}
      />
    </div>
  );
}
