import React, { useState, useMemo, useEffect } from 'react';
import { ALL_BANK_QUESTIONS } from '../data/questionBankData';
import { ALL_UNITS } from '../data/unitsData';
import { BankQuestion } from '../types';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  Filter, 
  Search, 
  Layers, 
  Award, 
  BrainCircuit, 
  Scale, 
  Lightbulb,
  Compass,
  Eye,
  EyeOff,
  BookOpen,
  AlertCircle
} from 'lucide-react';
import { PresentationToolbar, PresentationScale } from './PresentationToolbar';
import { SourceProvenanceBadge } from './SourceProvenanceBadge';
import { inferContentOrigin } from '../data/sourceRegistry';

interface QuestionBankViewProps {
  onAskAi: (questionPrompt: string, context?: string) => void;
  userAnswers: Record<string, string | number>;
  revealedExplanations: Record<string, boolean>;
  onSelectAnswer: (qId: string, answer: string | number) => void;
  onToggleReveal: (qId: string) => void;
  onResetAnswers: () => void;
  selectedUnitNumber?: number;
  onSelectUnit?: (unitNumber: number) => void;
  isAutoFillPage?: boolean;
  onToggleAutoFillPage?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  presentationScale?: PresentationScale;
  onChangeScale?: (scale: PresentationScale) => void;
}

export const QuestionBankView: React.FC<QuestionBankViewProps> = ({
  onAskAi,
  userAnswers,
  revealedExplanations,
  onSelectAnswer,
  onToggleReveal,
  onResetAnswers,
  selectedUnitNumber,
  onSelectUnit,
  isAutoFillPage = true,
  onToggleAutoFillPage,
  isFullscreen = false,
  onToggleFullscreen,
  presentationScale = 'large',
  onChangeScale = () => {}
}) => {
  const [selectedUnit, setSelectedUnit] = useState<number>(selectedUnitNumber || 0); // 0 = all
  const [selectedLesson, setSelectedLesson] = useState<number>(0); // 0 = all lessons in unit
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedBloom, setSelectedBloom] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync with selectedUnitNumber when changed from navbar
  useEffect(() => {
    if (selectedUnitNumber !== undefined && selectedUnitNumber > 0) {
      setSelectedUnit(selectedUnitNumber);
      setSelectedLesson(0);
    }
  }, [selectedUnitNumber]);

  // Available lessons for current unit
  const activeUnitData = useMemo(() => {
    return ALL_UNITS.find(u => u.number === selectedUnit);
  }, [selectedUnit]);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return ALL_BANK_QUESTIONS.filter(q => {
      if (selectedUnit !== 0 && q.unitNumber !== selectedUnit) return false;
      if (selectedLesson !== 0 && q.lessonNumber !== selectedLesson) return false;
      if (selectedType !== 'all' && q.type !== selectedType) return false;
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      if (selectedBloom !== 'all' && q.bloomLevel !== selectedBloom) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const textMatch = q.question.toLowerCase().includes(query) || q.explanation.toLowerCase().includes(query);
        if (!textMatch) return false;
      }
      return true;
    });
  }, [selectedUnit, selectedLesson, selectedType, selectedDifficulty, selectedBloom, searchQuery]);

  // Score metrics
  const answeredCount = Object.keys(userAnswers).length;
  let correctCount = 0;
  ALL_BANK_QUESTIONS.forEach(q => {
    const userAns = userAnswers[q.id];
    if (userAns !== undefined) {
      if (q.type === 'mcq' && userAns === q.correctAnswer) correctCount++;
      if (q.type === 'true_false' && userAns === q.correctAnswer) correctCount++;
    }
  });

  return (
    <div className="space-y-6">
      {/* Presentation Toolbar for Whiteboards and Screens */}
      <PresentationToolbar
        title="شاشة عرض بنك الأسئلة"
        badge={isAutoFillPage ? 'ملء تلقائي للصفحة (100%)' : 'العرض القياسي'}
        isAutoFillPage={isAutoFillPage}
        onToggleAutoFillPage={onToggleAutoFillPage}
        isFullscreen={isFullscreen}
        onToggleFullscreen={onToggleFullscreen}
        presentationScale={presentationScale}
        onChangeScale={onChangeScale}
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1 rounded-full text-xs border border-emerald-400/30 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5" />
                بنك الأسئلة والاختبارات التفاعلي
              </span>
              <span className="bg-amber-400/20 text-amber-300 font-bold px-3 py-1 rounded-full text-xs border border-amber-400/30">
                مستويات بلوم المعرفية 2027
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-['Cairo'] tracking-tight">
              بنك الأسئلة الشامل ونماذج التقييم المعياري
            </h1>
            <p className="text-emerald-200 text-sm mt-1 max-w-2xl leading-relaxed">
              أسئلة مقننة تغطي كافة مستويات التفكير (تذكر، فهم، تطبيق، تحليل، تقييم، وحكم واستدلال) مع تحليل المشتتات وشروحات نموذجية.
            </p>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-slate-900/80 border border-emerald-700/50 rounded-2xl p-4 flex items-center gap-5 shrink-0 backdrop-blur-xs">
            <div className="text-center">
              <span className="text-[11px] text-slate-400 block font-medium">الأسئلة المتوفرة</span>
              <span className="text-2xl font-black text-white">{ALL_BANK_QUESTIONS.length}</span>
            </div>
            <div className="w-px h-10 bg-slate-700" />
            <div className="text-center">
              <span className="text-[11px] text-slate-400 block font-medium">المنجز</span>
              <span className="text-2xl font-black text-emerald-400">{answeredCount}</span>
            </div>
            <div className="w-px h-10 bg-slate-700" />
            <div className="text-center">
              <span className="text-[11px] text-slate-400 block font-medium">صحيح</span>
              <span className="text-2xl font-black text-amber-400">{correctCount}</span>
            </div>
            <button
              onClick={onResetAnswers}
              title="إعادة تعيين الإجابات"
              className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ابحث في نص السؤال أو الشرح..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-9 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-800"
            />
          </div>

          {/* Unit Filter */}
          <select
            value={selectedUnit}
            onChange={(e) => {
              const val = Number(e.target.value);
              setSelectedUnit(val);
              setSelectedLesson(0);
              if (val > 0 && onSelectUnit) {
                onSelectUnit(val);
              }
            }}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value={0}>جميع الوحدات (1 - 10)</option>
            <option value={1}>الوحدة 1: مدخل إلى الأعمال</option>
            <option value={2}>الوحدة 2: أنواع المنظمات</option>
            <option value={3}>الوحدة 3: أهداف المنظمات وأصحاب المصلحة</option>
            <option value={4}>الوحدة 4: البيئة الداخلية والخارجية</option>
            <option value={5}>الوحدة 5: الإدارة والقيادة</option>
            <option value={6}>الوحدة 6: التسويق</option>
            <option value={7}>الوحدة 7: العمليات والإنتاج</option>
            <option value={8}>الوحدة 8: الموارد البشرية</option>
            <option value={9}>الوحدة 9: التمويل وأداء الأعمال</option>
            <option value={10}>الوحدة 10: الاستراتيجية وصنع القرار</option>
          </select>

          {/* Lesson Filter (active when a unit is chosen) */}
          {selectedUnit !== 0 && activeUnitData && (
            <select
              value={selectedLesson}
              onChange={(e) => setSelectedLesson(Number(e.target.value))}
              className="bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value={0}>جميع دروس الوحدة ({activeUnitData.lessons.length} دروس)</option>
              {activeUnitData.lessons.map(l => (
                <option key={l.id} value={l.lessonNumber}>
                  الدرس {l.lessonNumber}: {l.title}
                </option>
              ))}
            </select>
          )}

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="all">جميع أنواع الأسئلة</option>
            <option value="mcq">اختيار من متعدد (MCQ)</option>
            <option value="true_false">صواب وخطأ مع التعليل</option>
            <option value="short_essay">أسئلة مقالية وشرح</option>
            <option value="calculation">مسائل حسابية وتحليلية</option>
            <option value="jre">سؤال حكم واستدلال (JRE)</option>
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="all">كافة المستويات</option>
            <option value="تأسيسي">تأسيسي</option>
            <option value="متوسط">متوسط</option>
            <option value="متقدم">متقدم</option>
            <option value="تحدي">تحدي وأوائل الطلبة</option>
          </select>

          {/* Bloom Filter */}
          <select
            value={selectedBloom}
            onChange={(e) => setSelectedBloom(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="all">مستويات بلوم (الكل)</option>
            <option value="تذكر">تذكر</option>
            <option value="فهم">فهم</option>
            <option value="تطبيق">تطبيق</option>
            <option value="تحليل">تحليل</option>
            <option value="تقييم">تقييم</option>
            <option value="حكم واستدلال">حكم واستدلال</option>
          </select>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>
            النتائج المطابقة: <strong className="text-emerald-700 font-extrabold">{filteredQuestions.length}</strong> سؤال
          </span>
          <span className="text-[11px] text-slate-400">
            تلميح: انقر على أي خيار لاختبار معلوماتك ومعرفة التفسير والبدائل غير الصحيحة
          </span>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">لا توجد أسئلة تطابق معايير التصفية المختارة</h3>
            <p className="text-xs text-slate-500 mt-1">جرّب اختيار وحدة أخرى أو إزالة قيود البحث لعرض المزيد من الأسئلة.</p>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const userAns = userAnswers[q.id];
            const isRevealed = revealedExplanations[q.id];
            const isAnswered = userAns !== undefined;

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                {/* Meta header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="min-w-8 h-7 px-2 rounded-lg bg-emerald-800 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      س {q.questionNumber || idx + 1}
                    </span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md">
                      الوحدة {q.unitNumber}
                    </span>
                    {q.lessonNumber && (
                      <span className="text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-md flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-emerald-600" />
                        <span>الدرس {q.lessonNumber}: {q.lessonTitle || `الدرس ${q.lessonNumber}`}</span>
                      </span>
                    )}
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                      q.difficulty === 'تأسيسي' ? 'bg-blue-100 text-blue-700' :
                      q.difficulty === 'متوسط' ? 'bg-emerald-100 text-emerald-700' :
                      q.difficulty === 'متقدم' ? 'bg-amber-100 text-amber-700' :
                      'bg-rose-100 text-rose-700'
                    }`}>
                      {q.difficulty}
                    </span>
                    <span className="text-xs font-medium bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <BrainCircuit className="w-3 h-3" />
                      {q.bloomLevel}
                    </span>
                    <span className="text-xs font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md">
                      {q.type === 'mcq' ? 'اختيار من متعدد' :
                       q.type === 'true_false' ? 'صواب وخطأ' :
                       q.type === 'short_essay' ? 'مقالي تحليلي' :
                       q.type === 'jre' ? 'حكم واستدلال (JRE)' : 'مسألة حسابية'}
                    </span>
                    {q.cardId && (
                      <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
                        {q.cardId}
                      </span>
                    )}
                    <SourceProvenanceBadge
                      origin={inferContentOrigin(q)}
                      sourcePage={q.sourcePage}
                      unitId={q.unitNumber}
                      compact={true}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onAskAi(`ساعدني في حل وفهم هذا السؤال من الوحدة ${q.unitNumber}: ${q.question}`, q.explanation)}
                      className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                      title="استشر المستشار الذكي"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span className="hidden sm:inline">استشارة المستشار</span>
                    </button>

                    <button
                      onClick={() => onToggleReveal(q.id)}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors"
                    >
                      {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isRevealed ? 'إخفاء الشرح' : 'عرض الشرح'}</span>
                    </button>
                  </div>
                </div>

                {/* Learning Outcome if present */}
                {q.learningOutcome && (
                  <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-50/60 border border-emerald-200/60 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>ناتج التعلم المستهدف:</strong> {q.learningOutcome}</span>
                  </div>
                )}

                {/* Question Text */}
                <p className={`font-bold text-slate-900 leading-relaxed ${
                  presentationScale === 'xlarge' ? 'text-lg sm:text-xl' : presentationScale === 'large' ? 'text-base sm:text-lg' : 'text-base'
                }`}>
                  {q.question}
                </p>

                {/* Interactive Area By Type */}
                {q.type === 'mcq' && q.options && (
                  <div className="space-y-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAns === optIdx;
                      const isCorrect = optIdx === q.correctAnswer;

                      let btnStyle = "border-slate-200 bg-white hover:bg-slate-50 text-slate-800";
                      if (isAnswered) {
                        if (isCorrect) {
                          btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-400";
                        } else if (isSelected) {
                          btnStyle = "border-rose-500 bg-rose-50 text-rose-950 line-through ring-1 ring-rose-400";
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => onSelectAnswer(q.id, optIdx)}
                          className={`w-full text-right p-3.5 rounded-xl border flex items-center justify-between transition-all ${btnStyle} ${
                            presentationScale === 'xlarge' ? 'text-base sm:text-lg' : presentationScale === 'large' ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'
                          }`}
                        >
                          <span>{opt}</span>
                          {isAnswered && (
                            isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : isSelected ? (
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            ) : null
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {q.type === 'true_false' && (
                  <div className="flex items-center gap-3 pt-1">
                    {(['صواب', 'خطأ'] as const).map((choice) => {
                      const isSelected = userAns === choice;
                      const isCorrect = choice === q.correctAnswer;

                      let btnClass = "border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100";
                      if (isAnswered) {
                        if (isCorrect) {
                          btnClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-400";
                        } else if (isSelected) {
                          btnClass = "border-rose-500 bg-rose-50 text-rose-900 line-through ring-2 ring-rose-400";
                        }
                      }

                      return (
                        <button
                          key={choice}
                          onClick={() => onSelectAnswer(q.id, choice)}
                          className={`flex-1 py-3 px-4 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all ${btnClass} ${
                            presentationScale === 'xlarge' ? 'text-base sm:text-lg' : presentationScale === 'large' ? 'text-sm sm:text-base' : 'text-sm'
                          }`}
                        >
                          {choice === 'صواب' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                          <span>{choice}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Self-test writing area for essay and JRE questions */}
                {(q.type === 'short_essay' || q.type === 'jre' || q.type === 'calculation') && (
                  <div className="space-y-2 pt-1">
                    <div className="text-xs text-slate-500 font-semibold flex items-center justify-between">
                      <span>مساحة التدوين والصياغة الذاتية:</span>
                      <span className="text-[11px] text-slate-400">دوّن إجابتك أو نقاطك الرئيسية لمقارنتها بالنموذج المعتمد</span>
                    </div>
                    <textarea
                      rows={2}
                      value={typeof userAns === 'string' && userAns !== 'صواب' && userAns !== 'خطأ' ? userAns : ''}
                      onChange={(e) => onSelectAnswer(q.id, e.target.value)}
                      placeholder="اكتب صياغتك الذاتية هنا للمقارنة مع الإجابة النموذجية المعتمدة..."
                      className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                )}

                {/* Explanation & Distractor Analysis */}
                {isRevealed && (
                  <div className={`bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 space-y-3 animate-fadeIn ${
                    presentationScale === 'xlarge' ? 'text-base leading-[1.8]' : presentationScale === 'large' ? 'text-sm leading-[1.75]' : 'text-xs'
                  }`}>
                    {/* Model Answer Card for essay and JRE questions */}
                    {(q.type === 'short_essay' || q.type === 'jre' || q.type === 'calculation') && q.correctAnswer && (
                      <div className="p-4 bg-emerald-50/90 rounded-xl border border-emerald-200 space-y-1.5">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-xs sm:text-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>الإجابة الصحيحة / النموذجية المعتمدة:</span>
                        </div>
                        <p className="text-emerald-950 font-medium text-xs sm:text-sm whitespace-pre-line leading-relaxed">
                          {String(q.correctAnswer)}
                        </p>
                      </div>
                    )}

                    {/* Targeted alert for the selected incorrect distractor */}
                    {q.type === 'mcq' && isAnswered && typeof userAns === 'number' && userAns !== q.correctAnswer && (
                      (() => {
                        const selectedText = q.options ? q.options[userAns] : '';
                        const matchedDistractor = q.distractorAnalysis?.find(d => d.option === selectedText || (selectedText && d.option.includes(selectedText)) || (selectedText && selectedText.includes(d.option)));
                        if (matchedDistractor) {
                          return (
                            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs sm:text-sm text-rose-900 font-medium">
                              <div className="flex items-center gap-1.5 font-bold text-rose-800 mb-1">
                                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                                <span>فخ البديل الذي اخترته ({matchedDistractor.option}):</span>
                              </div>
                              <p className="text-rose-900 leading-relaxed">{matchedDistractor.whyIncorrect}</p>
                            </div>
                          );
                        }
                        return null;
                      })()
                    )}

                    {q.type === 'true_false' && q.correctionNote && (
                      <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 font-medium">
                        <strong>التصحيح الوزاري المعتمد:</strong> {q.correctionNote}
                      </div>
                    )}

                    <div className="text-slate-800 leading-relaxed">
                      <strong className="text-emerald-800 block mb-1">الشرح والتفسير العلمي:</strong>
                      {q.explanation}
                    </div>

                    {/* Systematic Justification & Reasoning Path (2-col grid aligned with textbook model) */}
                    {(q.systematicJustification || q.reasoningPath) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                        {q.systematicJustification && (
                          <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200/90 space-y-1.5 text-xs sm:text-sm">
                            <div className="flex items-center gap-1.5 font-bold text-amber-900">
                              <Lightbulb className="w-4 h-4 text-amber-700 shrink-0" />
                              <span>التعليل المنهجي المعتمد (لماذا هذه الإجابة؟):</span>
                            </div>
                            <p className="text-amber-950 font-medium leading-relaxed">
                              {q.systematicJustification}
                            </p>
                          </div>
                        )}
                        {q.reasoningPath && (
                          <div className="p-3.5 bg-indigo-50/80 rounded-xl border border-indigo-200/90 space-y-1.5 text-xs sm:text-sm">
                            <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                              <Compass className="w-4 h-4 text-indigo-700 shrink-0" />
                              <span>مسار الاستدلال وخطوات التفكير:</span>
                            </div>
                            <p className="text-indigo-950 font-medium leading-relaxed">
                              {q.reasoningPath}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {q.distractorAnalysis && q.distractorAnalysis.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-slate-200">
                        <span className="font-extrabold text-slate-700 block">
                          تحليل المشتتات والخيارات غير الصحيحة (لماذا استُبعدت؟):
                        </span>
                        {q.distractorAnalysis.map((d, dIdx) => (
                          <div key={dIdx} className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-600">
                            <span className="font-bold text-rose-700 ml-1">× {d.option}:</span>
                            <span>{d.whyIncorrect}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {q.modelAnswerDetails && (
                      <div className="space-y-1 pt-2 border-t border-slate-200">
                        <span className="font-extrabold text-slate-700 block">
                          عناصر الإجابة النموذجية المعتمدة في التصحيح:
                        </span>
                        <ul className="list-disc list-inside space-y-1 text-slate-700">
                          {q.modelAnswerDetails.map((detail, detIdx) => (
                            <li key={detIdx}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
