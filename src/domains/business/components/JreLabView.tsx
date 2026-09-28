import React, { useState, useEffect } from 'react';
import { OFFICIAL_JRE_RUBRIC, JRE_COMPARISON_CASES } from '../data/jreGuideData';
import { ALL_UNITS } from '../data/unitsData';
import { UnitData } from '../types';
import { 
  Scale, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Send, 
  BookOpen, 
  FileText, 
  RefreshCw,
  ChevronRight,
  TrendingUp,
  Brain,
  Layers
} from 'lucide-react';
import { PresentationToolbar, PresentationScale } from './PresentationToolbar';

interface JreLabViewProps {
  onGradeWithAi: (studentAnswer: string, caseContext: string, unitTitle: string) => void;
  aiGradingLoading: boolean;
  aiGradingResult: string | null;
  selectedUnitNumber?: number;
  onSelectUnit?: (unitNumber: number) => void;
  isAutoFillPage?: boolean;
  onToggleAutoFillPage?: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  presentationScale?: PresentationScale;
  onChangeScale?: (scale: PresentationScale) => void;
}

export const JreLabView: React.FC<JreLabViewProps> = ({
  onGradeWithAi,
  aiGradingLoading,
  aiGradingResult,
  selectedUnitNumber,
  onSelectUnit,
  isAutoFillPage = true,
  onToggleAutoFillPage,
  isFullscreen = false,
  onToggleFullscreen,
  presentationScale = 'large',
  onChangeScale = () => {}
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'simulator' | 'rubric' | 'cases'>('simulator');
  const [selectedUnitIndex, setSelectedUnitIndex] = useState<number>(
    selectedUnitNumber ? Math.max(0, selectedUnitNumber - 1) : 0
  );

  // Student Draft Inputs for each pillar
  const [judgmentText, setJudgmentText] = useState<string>('');
  const [reasoningText, setReasoningText] = useState<string>('');
  const [evidenceText, setEvidenceText] = useState<string>('');
  const [counterText, setCounterText] = useState<string>('');
  const [conclusionText, setConclusionText] = useState<string>('');
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);

  // Synchronize with selectedUnitNumber when changed from navbar
  useEffect(() => {
    if (selectedUnitNumber !== undefined && selectedUnitNumber > 0) {
      setSelectedUnitIndex(selectedUnitNumber - 1);
      setShowModelAnswer(false);
    }
  }, [selectedUnitNumber]);

  const currentUnit: UnitData = ALL_UNITS[selectedUnitIndex] || ALL_UNITS[0];

  const handleGradeSubmission = () => {
    const fullAnswer = `
[الحكم المباشر]: ${judgmentText || 'لم يكتب'}
[التبرير السببي]: ${reasoningText || 'لم يكتب'}
[الدليل ومفاهيم المنهج]: ${evidenceText || 'لم يكتب'}
[الموازنة والحجة المقابلة]: ${counterText || 'لم يكتب'}
[الخاتمة المشروطة]: ${conclusionText || 'لم يكتب'}
`;
    const context = `
دراسة حالة الوحدة (${currentUnit.title}):
${currentUnit.caseStudy.story}
سؤال الحكم والاستدلال المطلوب:
${currentUnit.jreQuestion.prompt}
`;
    onGradeWithAi(fullAnswer, context, currentUnit.title);
  };

  const loadSampleDraft = () => {
    setJudgmentText('أوصي بالتحول المنضبط إلى شركة تضامن أو شركة ذات مسؤولية محدودة مع الاحتفاظ بالرقابة على الجودة.');
    setReasoningText('لأن التوسع السريع مع المسؤولية غير المحدودة يعرض أصول مريم الشخصية لخطر الحجز حال حدوث أي تعثر مالي أو تراجع في التدفق النقدي، ولأن الشريك يوفر السيولة اللازمة لشراء أفران صناعية حديثة.');
    setEvidenceText('كما حدث في دراسة الحالة عندما احترقت دفعة الكعك السابقة بسبب ضغط العمل وضيق الوقت، مما كبد المنشأة خسائر فادحة وعجزًا مؤقتًا في السيولة النقدية.');
    setCounterText('ورغم أن إدخال شريك قد يقلص من نسبة مريم في الأرباح الصافية ويحد من انفرادها بصنع القرار الإداري، إلا أن مخاطر الاستمرار الفردي تفوق بكثير تكلفة التشارك.');
    setConclusionText('ولذلك فإن القرار الرشيد هو إبرام عقد شراكة مقنن يمنح مريم حق الإشراف الفني على الإنتاج، وتخصيص نسبة من الأرباح للتحوط وسداد الالتزامات.');
  };

  return (
    <div className="space-y-6">
      {/* Presentation Toolbar for Whiteboards and Screens */}
      <PresentationToolbar
        title="شاشة عرض مختبر JRE"
        badge={isAutoFillPage ? 'ملء تلقائي للصفحة (100%)' : 'العرض القياسي'}
        isAutoFillPage={isAutoFillPage}
        onToggleAutoFillPage={onToggleAutoFillPage}
        isFullscreen={isFullscreen}
        onToggleFullscreen={onToggleFullscreen}
        presentationScale={presentationScale}
        onChangeScale={onChangeScale}
      />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-800/40 relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-purple-500/20 text-purple-300 font-bold px-3 py-1 rounded-full text-xs border border-purple-400/30 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                سؤال التقييم والاستدلال الحاسم (20 درجة)
              </span>
              <span className="bg-amber-400/20 text-amber-300 font-bold px-3 py-1 rounded-full text-xs border border-amber-400/30">
                منهجية الحكم والاستدلال التربوية
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-['Cairo'] tracking-tight">
              مختبر الحكم والاستدلال والموازنة النقدية (JRE Lab)
            </h1>
            <p className="text-purple-200 text-sm mt-1 max-w-2xl leading-relaxed">
              تدريب تفاعلي ومحاكاة دقيقة لكتابة استجابة متكاملة لسؤال تقييم الحالة وفق سلم تقييم تدريبي من تصميم المنصة (مسترشد بالمعايير التربوية) مع تقييم ذكي فوري.
            </p>
          </div>

          {/* Sub Navigation */}
          <div className="inline-flex p-1 bg-slate-900/80 rounded-xl border border-purple-700/50 backdrop-blur-xs shrink-0">
            <button
              onClick={() => setActiveSubTab('simulator')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'simulator'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              مختبر كتابة الإجابة
            </button>
            <button
              onClick={() => setActiveSubTab('rubric')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'rubric'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              سلم التصحيح (20 درجة)
            </button>
            <button
              onClick={() => setActiveSubTab('cases')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === 'cases'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              نماذج مقارنة (ضعيف vs ممتاز)
            </button>
          </div>
        </div>
      </div>

      {activeSubTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Context & Prompt */}
          <div className="lg:col-span-5 space-y-4">
            {/* Unit Selector */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
                اختر دراسة الحالة وسؤال الوحدة:
              </label>
              <select
                value={selectedUnitIndex}
                onChange={(e) => {
                  const idx = Number(e.target.value);
                  setSelectedUnitIndex(idx);
                  setShowModelAnswer(false);
                  if (onSelectUnit) {
                    onSelectUnit(idx + 1);
                  }
                }}
                className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold rounded-xl p-2.5 focus:ring-2 focus:ring-purple-500 cursor-pointer"
              >
                {ALL_UNITS.map((u, i) => (
                  <option key={u.id} value={i}>
                    الوحدة {u.number}: {u.title}
                  </option>
                ))}
              </select>

              <div className="p-3.5 bg-purple-50 rounded-xl border border-purple-100">
                <span className="text-xs font-extrabold text-purple-800 block mb-1">
                  سياق دراسة الحالة ({currentUnit.caseStudy.title}):
                </span>
                <p className={`text-slate-700 leading-relaxed max-h-56 overflow-y-auto pr-1 ${
                  presentationScale === 'xlarge' ? 'text-base leading-[1.8]' : presentationScale === 'large' ? 'text-sm leading-[1.75]' : 'text-xs'
                }`}>
                  {currentUnit.caseStudy.story}
                </p>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <span className="text-xs font-extrabold text-amber-900 block mb-1 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-600" />
                  المسألة وقضية النقاش الوزارية:
                </span>
                <p className={`font-bold text-slate-900 leading-relaxed ${
                  presentationScale === 'xlarge' ? 'text-base sm:text-lg' : presentationScale === 'large' ? 'text-sm sm:text-base' : 'text-xs'
                }`}>
                  {currentUnit.jreQuestion.prompt}
                </p>
                <div className={`text-amber-800 mt-2 ${
                  presentationScale === 'xlarge' ? 'text-sm' : 'text-xs'
                }`}>
                  <strong>معيار الحكم والتقييم:</strong> {currentUnit.jreQuestion.judgmentCriteria}
                </div>
              </div>

              <button
                onClick={loadSampleDraft}
                className="w-full text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 border border-purple-200 py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Brain className="w-3.5 h-3.5" />
                تحميل مسودة تدريبية نموذجية للبدء
              </button>
            </div>

            {/* Model Answer Drawer */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
              <button
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="w-full py-2 px-3 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl flex items-center justify-between transition-colors"
              >
                <span>{showModelAnswer ? 'إخفاء الإجابة النموذجية الرسمية' : 'كشف الإجابة النموذجية الوزارية'}</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${showModelAnswer ? 'rotate-90' : ''}`} />
              </button>

              {showModelAnswer && (
                <div className={`space-y-2.5 text-slate-700 leading-relaxed pt-2 border-t border-slate-100 ${
                  presentationScale === 'xlarge' ? 'text-base leading-[1.8]' : presentationScale === 'large' ? 'text-sm leading-[1.75]' : 'text-xs'
                }`}>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <strong className="text-blue-900 block font-black">1. الحكم الصريح:</strong>
                    {currentUnit.jreQuestion.modelAnswer.judgment}
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                    <strong className="text-emerald-900 block font-black">2. التبرير المنطقي والسببي:</strong>
                    {currentUnit.jreQuestion.modelAnswer.reasoning}
                  </div>
                  <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <strong className="text-amber-900 block font-black">3. الدليل من الحالة والمقرر:</strong>
                    {currentUnit.jreQuestion.modelAnswer.evidence}
                  </div>
                  <div className="p-3 bg-rose-50 rounded-lg border border-rose-100">
                    <strong className="text-rose-900 block font-black">4. الموازنة والحجة المقابلة:</strong>
                    {currentUnit.jreQuestion.modelAnswer.counterArgument}
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <strong className="text-purple-900 block font-black">5. الاستنتاج المبرر المشروط:</strong>
                    {currentUnit.jreQuestion.modelAnswer.conclusion}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: 5 Pillars Interactive Builder */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900">
                  صياغة الاستجابة وفق معايير سلم التقدير (20 درجة)
                </h3>
                <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full">
                  5 معايير متسلسلة
                </span>
              </div>

              {/* Pillar 1: الحكم المباشر */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className={`font-bold text-slate-800 flex items-center gap-1.5 ${
                    presentationScale === 'xlarge' ? 'text-sm' : 'text-xs'
                  }`}>
                    <span className="w-5 h-5 rounded-md bg-purple-600 text-white text-[11px] font-black flex items-center justify-center">1</span>
                    <span>الحكم المباشر الصريح (Judgment)</span>
                  </label>
                  <span className="text-xs font-extrabold text-purple-600">3 درجات</span>
                </div>
                <input
                  type="text"
                  placeholder="مثال: أرى أنه يجب على المنظمة... / أوصي بعدم قبول هذا العرض لأن..."
                  value={judgmentText}
                  onChange={(e) => setJudgmentText(e.target.value)}
                  className={`w-full font-medium p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500 bg-slate-50 focus:bg-white ${
                    presentationScale === 'xlarge' ? 'text-base' : presentationScale === 'large' ? 'text-sm' : 'text-xs'
                  }`}
                />
              </div>

              {/* Pillar 2: التبرير السببي */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className={`font-bold text-slate-800 flex items-center gap-1.5 ${
                    presentationScale === 'xlarge' ? 'text-sm' : 'text-xs'
                  }`}>
                    <span className="w-5 h-5 rounded-md bg-purple-600 text-white text-[11px] font-black flex items-center justify-center">2</span>
                    <span>التبرير المنطقي والسببي (Reasoning)</span>
                  </label>
                  <span className="text-xs font-extrabold text-purple-600">4 درجات</span>
                </div>
                <textarea
                  rows={2}
                  placeholder="استخدم روابط العلة: (لأن، وبناء عليه، مما يؤدي إلى زيادة الإيراد / خفض المخاطر...)"
                  value={reasoningText}
                  onChange={(e) => setReasoningText(e.target.value)}
                  className={`w-full font-medium p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500 bg-slate-50 focus:bg-white resize-none ${
                    presentationScale === 'xlarge' ? 'text-base' : presentationScale === 'large' ? 'text-sm' : 'text-xs'
                  }`}
                />
              </div>

              {/* Pillar 3: الدليل من الحالة */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className={`font-bold text-slate-800 flex items-center gap-1.5 ${
                    presentationScale === 'xlarge' ? 'text-sm' : 'text-xs'
                  }`}>
                    <span className="w-5 h-5 rounded-md bg-purple-600 text-white text-[11px] font-black flex items-center justify-center">3</span>
                    <span>الدليل من دراسة الحالة ومصطلحات المنهج (Evidence)</span>
                  </label>
                  <span className="text-xs font-extrabold text-purple-600">5 درجات</span>
                </div>
                <textarea
                  rows={2}
                  placeholder="استشهد بأرقام ووقائع محددة من القصة + وظف مصطلحات الوحدة (مثل: تكاليف ثابتة، أصحاب المصلحة...)"
                  value={evidenceText}
                  onChange={(e) => setEvidenceText(e.target.value)}
                  className={`w-full font-medium p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500 bg-slate-50 focus:bg-white resize-none ${
                    presentationScale === 'xlarge' ? 'text-base' : presentationScale === 'large' ? 'text-sm' : 'text-xs'
                  }`}
                />
              </div>

              {/* Pillar 4: الموازنة والرأي الآخر */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className={`font-bold text-slate-800 flex items-center gap-1.5 ${
                    presentationScale === 'xlarge' ? 'text-sm' : 'text-xs'
                  }`}>
                    <span className="w-5 h-5 rounded-md bg-purple-600 text-white text-[11px] font-black flex items-center justify-center">4</span>
                    <span>الموازنة والحجة المقابلة والطرف المتضرر (Counter-argument)</span>
                  </label>
                  <span className="text-xs font-extrabold text-purple-600">4 درجات</span>
                </div>
                <textarea
                  rows={2}
                  placeholder="ورغم أن هذا القرار قد يؤدي إلى (تكلفة معينة أو معارضة طرف)، إلا أن..."
                  value={counterText}
                  onChange={(e) => setCounterText(e.target.value)}
                  className={`w-full font-medium p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500 bg-slate-50 focus:bg-white resize-none ${
                    presentationScale === 'xlarge' ? 'text-base' : presentationScale === 'large' ? 'text-sm' : 'text-xs'
                  }`}
                />
              </div>

              {/* Pillar 5: الاستنتاج المبرر المشروط */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className={`font-bold text-slate-800 flex items-center gap-1.5 ${
                    presentationScale === 'xlarge' ? 'text-sm' : 'text-xs'
                  }`}>
                    <span className="w-5 h-5 rounded-md bg-purple-600 text-white text-[11px] font-black flex items-center justify-center">5</span>
                    <span>الاستنتاج المبرر المشروط بالسياق (Qualified Conclusion)</span>
                  </label>
                  <span className="text-xs font-extrabold text-purple-600">4 درجات</span>
                </div>
                <textarea
                  rows={2}
                  placeholder="وبناء على ما تقدم، فإن التوصية النهائية المشروطة هي... بشرط اتخاذ إجراء..."
                  value={conclusionText}
                  onChange={(e) => setConclusionText(e.target.value)}
                  className={`w-full font-medium p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-purple-500 bg-slate-50 focus:bg-white resize-none ${
                    presentationScale === 'xlarge' ? 'text-base' : presentationScale === 'large' ? 'text-sm' : 'text-xs'
                  }`}
                />
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={handleGradeSubmission}
                  disabled={aiGradingLoading}
                  className="w-full py-3.5 px-6 rounded-xl font-black text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {aiGradingLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>جارٍ تقييم إجابتك وفق معايير سلم التصحيح الـ 20...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-purple-200" />
                      <span>إرسال الإجابة للتقييم الفوري بالمستشار الذكي (سلم الـ 20 درجة)</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* AI Grading Output Card */}
            {aiGradingResult && (
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-2xl p-6 shadow-sm space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-purple-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-700" />
                    <h4 className="text-sm font-black text-purple-950">
                      تقرير التقييم المعتمد من مستشار رواد الأعمال
                    </h4>
                  </div>
                  <span className="text-xs bg-purple-200 text-purple-900 font-bold px-2.5 py-0.5 rounded-full">
                    معايير تصحيح البكالوريا 2027
                  </span>
                </div>

                <div className={`text-slate-800 leading-relaxed whitespace-pre-wrap font-medium ${
                  presentationScale === 'xlarge' ? 'text-base leading-[1.8]' : presentationScale === 'large' ? 'text-sm leading-[1.75]' : 'text-xs'
                }`}>
                  {aiGradingResult}
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {activeSubTab === 'rubric' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-black text-slate-900">
              سلم تقييم تدريبي من تصميم المنصة لسؤال الحكم والاستدلال (20 درجة)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              المعايير الخمسة المقترحة من قبل خبراء المنصة والمسترشدة بمصفوفات التقييم التربوي للبكالوريا 2027
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {OFFICIAL_JRE_RUBRIC.map((item, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-black text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-black bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                      {item.maxScore} درجات
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 mb-1">
                    {item.criterion}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="text-[11px] font-extrabold text-slate-700 block">مؤشرات الإجابة الممتازة:</span>
                  <ul className="space-y-1">
                    {item.indicators.map((ind, iIdx) => (
                      <li key={iIdx} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{ind}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'cases' && (
        <div className="space-y-6">
          {JRE_COMPARISON_CASES.map((item, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <span className="text-xs font-black bg-purple-100 text-purple-800 px-3 py-1 rounded-full mb-2 inline-block">
                  دراسة حالة مقارنة
                </span>
                <h3 className="text-lg font-black text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <strong>نص المسألة:</strong> {item.casePrompt}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weak Answer */}
                <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-rose-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      إجابة ضعيفة (لا تحقق المعايير)
                    </span>
                    <span className="text-xs font-black bg-rose-200 text-rose-900 px-2.5 py-0.5 rounded-full">
                      {item.weakAnswer.score} / 20 درجة
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-rose-200 text-xs text-slate-800 leading-relaxed italic">
                    "{item.weakAnswer.text}"
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-extrabold text-rose-900 block">أسباب تدني الدرجة والثغرات:</span>
                    <ul className="space-y-1 text-xs text-rose-800">
                      {item.weakAnswer.critique.map((c, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-1.5">
                          <span className="text-rose-600 font-bold ml-1">×</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Strong Answer */}
                <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      إجابة نموذجية فائقة (الدرجة النهائية)
                    </span>
                    <span className="text-xs font-black bg-emerald-200 text-emerald-950 px-2.5 py-0.5 rounded-full">
                      {item.strongAnswer.score} / 20 درجة
                    </span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-emerald-200 text-xs text-slate-800 leading-relaxed">
                    {item.strongAnswer.text}
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-extrabold text-emerald-900 block">أسباب نيل الدرجة النهائية:</span>
                    <ul className="space-y-1 text-xs text-emerald-800">
                      {item.strongAnswer.strengths.map((s, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
