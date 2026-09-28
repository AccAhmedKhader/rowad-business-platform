import React, { useState, useEffect, useMemo } from 'react';
import { 
  Award, Sparkles, BookOpen, Layers, RefreshCw, ChevronDown, Check, Send, 
  BarChart2, Search, Filter, ArrowRight, ArrowLeft, Copy, Printer, CheckCircle2, 
  AlertTriangle, Lightbulb, FileText, Compass, ExternalLink, HelpCircle, Eye
} from 'lucide-react';
import { CANONICAL_JRE_RUBRIC, JREEvaluationResult, getPerformanceBand } from '../domain/assessment/jre/JRERubric';
import { evaluateJREArgument } from '../domain/assessment/jre/JREEvaluationEngine';
import { ALL_CURRICULUM_JRE_CASES, JRE_UNITS_METADATA, JRECurriculumCase } from '../data/jreCurriculumRegistry';

interface JRETalkerProps {
  onComplete?: () => void;
  initialCaseId?: string;
}

export const JRETalker: React.FC<JRETalkerProps> = ({ onComplete, initialCaseId }) => {
  // Unit & Case selection state
  const [selectedUnitId, setSelectedUnitId] = useState<string>('all');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(initialCaseId || ALL_CURRICULUM_JRE_CASES[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Workspace mode: 'stepped' | 'unified' | 'exemplary' | 'tips'
  const [activeMode, setActiveMode] = useState<'stepped' | 'unified' | 'exemplary' | 'tips'>('stepped');

  // Find currently selected case
  const currentCase: JRECurriculumCase = useMemo(() => {
    return ALL_CURRICULUM_JRE_CASES.find(c => c.id === selectedCaseId) || ALL_CURRICULUM_JRE_CASES[0];
  }, [selectedCaseId]);

  // 6-step component states
  const [claim, setClaim] = useState<string>(currentCase.defaultClaim);
  const [reasoning, setReasoning] = useState<string>(currentCase.defaultReasoning);
  const [evidence, setEvidence] = useState<string>(currentCase.defaultEvidence);
  const [counterArg, setCounterArg] = useState<string>(currentCase.defaultCounterArg);
  const [rebuttal, setRebuttal] = useState<string>(currentCase.defaultRebuttal);
  const [conclusion, setConclusion] = useState<string>(currentCase.defaultConclusion);

  // Unified essay text
  const [unifiedEssay, setUnifiedEssay] = useState<string>(currentCase.exemplaryEssayFull);

  // Copy feedback
  const [copied, setCopied] = useState<boolean>(false);

  // Evaluation state
  const [evaluation, setEvaluation] = useState<JREEvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  // Update inputs when changing current case
  useEffect(() => {
    setClaim(currentCase.defaultClaim);
    setReasoning(currentCase.defaultReasoning);
    setEvidence(currentCase.defaultEvidence);
    setCounterArg(currentCase.defaultCounterArg);
    setRebuttal(currentCase.defaultRebuttal);
    setConclusion(currentCase.defaultConclusion);
    setUnifiedEssay(currentCase.exemplaryEssayFull);
  }, [selectedCaseId]);

  // Filtered cases list based on Unit tab and Search
  const filteredCases = useMemo(() => {
    return ALL_CURRICULUM_JRE_CASES.filter(c => {
      const matchesUnit = selectedUnitId === 'all' || c.unitId === selectedUnitId;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesUnit;
      
      const matchesSearch = 
        c.caseTitle.toLowerCase().includes(query) ||
        c.scenario.toLowerCase().includes(query) ||
        c.coreQuestion.toLowerCase().includes(query) ||
        c.targetConcept.toLowerCase().includes(query) ||
        c.unitName.toLowerCase().includes(query) ||
        c.tags.some(t => t.toLowerCase().includes(query));

      return matchesUnit && matchesSearch;
    });
  }, [selectedUnitId, searchQuery]);

  // Navigation indices
  const currentCaseIndex = useMemo(() => {
    return ALL_CURRICULUM_JRE_CASES.findIndex(c => c.id === currentCase.id);
  }, [currentCase.id]);

  const handlePrevCase = () => {
    if (currentCaseIndex > 0) {
      setSelectedCaseId(ALL_CURRICULUM_JRE_CASES[currentCaseIndex - 1].id);
    }
  };

  const handleNextCase = () => {
    if (currentCaseIndex < ALL_CURRICULUM_JRE_CASES.length - 1) {
      setSelectedCaseId(ALL_CURRICULUM_JRE_CASES[currentCaseIndex + 1].id);
    }
  };

  // Run live evaluation
  const runEvaluation = async () => {
    setIsEvaluating(true);
    try {
      const res = await evaluateJREArgument({
        essay: activeMode === 'unified' ? unifiedEssay : '',
        claim,
        reasoning,
        evidence,
        counterArg,
        rebuttal,
        conclusion,
        unitId: currentCase.unitId,
        questionId: currentCase.id,
        scenarioContext: currentCase.scenarioContext,
        targetConcept: currentCase.targetConcept,
        maxScore: 20
      });
      setEvaluation(res);
    } catch (e) {
      console.error('Error evaluating JRE:', e);
    } finally {
      setIsEvaluating(false);
    }
  };

  useEffect(() => {
    runEvaluation();
  }, [claim, reasoning, evidence, counterArg, rebuttal, conclusion, unifiedEssay, activeMode, currentCase]);

  // Actions
  const handleLoadExemplary = () => {
    setClaim(currentCase.defaultClaim);
    setReasoning(currentCase.defaultReasoning);
    setEvidence(currentCase.defaultEvidence);
    setCounterArg(currentCase.defaultCounterArg);
    setRebuttal(currentCase.defaultRebuttal);
    setConclusion(currentCase.defaultConclusion);
    setUnifiedEssay(currentCase.exemplaryEssayFull);
  };

  const handleClearDraft = () => {
    setClaim('');
    setReasoning('');
    setEvidence('');
    setCounterArg('');
    setRebuttal('');
    setConclusion('');
    setUnifiedEssay('');
  };

  const handleCopyEssay = () => {
    const textToCopy = activeMode === 'unified' 
      ? unifiedEssay 
      : [claim, reasoning, evidence, counterArg, rebuttal, conclusion].filter(Boolean).join('\n\n');
    
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const currentScore = evaluation?.totalScore ?? 20;
  const performanceBandKey = evaluation?.performanceBand || getPerformanceBand(currentScore);
  const bandLabel = {
    EXEMPLARY: 'مستوى ممتاز (Exemplary 18-20)',
    PROFICIENT: 'مستوى كفء (Proficient 14-17)',
    DEVELOPING: 'مستوى قيد التطوير (Developing 10-13)',
    NOVICE: 'مستوى مبتدئ (Novice 0-9)'
  }[performanceBandKey] || 'مستوى ممتاز';

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8 print:p-0">
      
      {/* Top Banner & Header */}
      <header className="bg-[#1D1D1B] text-[#F9F7F2] p-6 sm:p-8 border-2 border-[#1D1D1B] relative overflow-hidden shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#C4A484] text-[#1D1D1B] font-extrabold text-xs px-3 py-1 uppercase tracking-wider">
                منظومة الحكم والاستدلال المحاسبي (JRE)
              </span>
              <span className="bg-white/15 text-[#F9F7F2] text-xs font-bold px-2.5 py-0.5 border border-white/20">
                شامل جميع أسئلة المنهج (32 قضية معتمدة)
              </span>
              <span className="bg-[#8A1F1D] text-white text-xs font-bold px-2.5 py-0.5">
                وزاري: 20 درجة
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F9F7F2] tracking-tight">
              ورشة صياغة وتفنيد التفسير المحاسبي المدعوم بالأدلة
            </h1>
            
            <p className="text-sm text-[#F9F7F2]/80 max-w-3xl leading-relaxed">
              تدريب تفاعلي شامل على مهارة التفكير النقدي والاستدلال المالي والمرافعة المهنية لكافة القضايا الجدلية 
              في الوحدات العشر لمنهج المحاسبة المالية وفق المعايير الوزارية للبكالوريا المصرية.
            </p>
          </div>

          {/* Live Scorecard Highlight */}
          <div className="bg-[#FFFFFF]/10 backdrop-blur-md p-4 sm:p-5 border-2 border-[#C4A484]/40 text-center shrink-0 min-w-[200px]">
            <span className="text-[11px] text-[#F9F7F2]/80 block font-bold mb-1">الدرجة التقديرية الحالية</span>
            <div className="text-3xl sm:text-4xl font-black text-[#C4A484] font-mono tracking-tight">
              {currentScore} <span className="text-lg text-[#F9F7F2]/60 font-sans">/ 20</span>
            </div>
            <div className="mt-2 text-xs font-bold text-white bg-[#1D1D1B] px-2.5 py-1 border border-[#C4A484]/30">
              {bandLabel}
            </div>
          </div>
        </div>
      </header>

      {/* Curriculum Unit Navigator & Filter */}
      <section className="bg-white border-2 border-[#1D1D1B] p-4 sm:p-6 space-y-4 print:hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#1D1D1B]/15 pb-4">
          <div>
            <h2 className="text-base font-black text-[#1D1D1B] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#8A1F1D]" />
              <span>فهرس قضايا المنهج المعتمدة ({ALL_CURRICULUM_JRE_CASES.length} قضية موزعة على 10 وحدات)</span>
            </h2>
            <p className="text-xs text-[#1D1D1B]/70 mt-0.5">
              اختر الوحدة الدراسية أو ابحث بالكلمة المفتاحية لاستعراض قضاياها المحاسبية
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#1D1D1B]/40 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث عن قضية (إهلاك، مخزون، سمير...)"
              className="w-full pl-3 pr-9 py-2 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-xs text-[#1D1D1B] focus:border-[#8A1F1D] focus:outline-hidden"
            />
          </div>
        </div>

        {/* Unit Tabs Horizontal Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {JRE_UNITS_METADATA.map(unit => {
            const isSelected = selectedUnitId === unit.unitId;
            return (
              <button
                key={unit.unitId}
                onClick={() => setSelectedUnitId(unit.unitId)}
                className={`px-3 py-1.5 text-xs font-bold whitespace-nowrap transition border cursor-pointer ${
                  isSelected
                    ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B]'
                    : 'bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/20 hover:bg-[#C4A484]/20'
                }`}
              >
                {unit.unitNum === 0 ? 'جميع الوحدات' : `الوحدة ${unit.unitNum}`}
                <span className={`mr-1.5 text-[10px] px-1.5 py-0.2 rounded-xs ${
                  isSelected ? 'bg-[#C4A484] text-[#1D1D1B]' : 'bg-[#1D1D1B]/10 text-[#1D1D1B]'
                }`}>
                  {unit.casesCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Question Selector List / Dropdown */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-[#1D1D1B] mb-1.5">
            اختر السؤال / القضية المراد معالجتها:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto p-1 bg-[#F9F7F2] border border-[#1D1D1B]/15">
            {filteredCases.length === 0 ? (
              <div className="col-span-full py-8 text-center text-xs text-[#1D1D1B]/60">
                لا توجد قضايا مطابقة لمعايير البحث في هذه الوحدة.
              </div>
            ) : (
              filteredCases.map((c) => {
                const isCurrent = c.id === currentCase.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCaseId(c.id)}
                    className={`p-2.5 text-right border text-xs transition flex flex-col justify-between gap-1.5 cursor-pointer ${
                      isCurrent
                        ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B] ring-2 ring-[#C4A484]'
                        : 'bg-white text-[#1D1D1B] border-[#1D1D1B]/15 hover:border-[#1D1D1B] hover:bg-white/80'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 ${
                        isCurrent ? 'bg-[#C4A484] text-[#1D1D1B]' : 'bg-[#1D1D1B]/10 text-[#1D1D1B]'
                      }`}>
                        الوحدة {c.unitNum} • درس {c.lessonNumber}
                      </span>
                      <span className="text-[10px] opacity-75">{c.sourceReference.split('-').pop()?.trim()}</span>
                    </div>
                    <span className="font-bold line-clamp-2 leading-tight">
                      {c.caseTitle}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Prev / Next Case Quick Nav */}
        <div className="flex items-center justify-between pt-2 text-xs border-t border-[#1D1D1B]/10">
          <button
            onClick={handlePrevCase}
            disabled={currentCaseIndex === 0}
            className="px-3 py-1.5 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-[#1D1D1B] hover:bg-[#C4A484]/20 disabled:opacity-30 disabled:cursor-not-allowed font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>القضية السابقة</span>
          </button>

          <span className="font-bold text-[#1D1D1B]/80 text-xs">
            القضية {currentCaseIndex + 1} من أصل {ALL_CURRICULUM_JRE_CASES.length}
          </span>

          <button
            onClick={handleNextCase}
            disabled={currentCaseIndex === ALL_CURRICULUM_JRE_CASES.length - 1}
            className="px-3 py-1.5 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-[#1D1D1B] hover:bg-[#C4A484]/20 disabled:opacity-30 disabled:cursor-not-allowed font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <span>القضية التالية</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Active Case Context & Scenario Card */}
      <article className="bg-[#F9F7F2] border-2 border-[#1D1D1B] p-6 sm:p-8 space-y-6">
        {/* Case Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#1D1D1B]/15 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-[#8A1F1D] text-white text-xs font-bold px-2.5 py-0.5">
                الوحدة {currentCase.unitNum}: {currentCase.unitName}
              </span>
              <span className="text-xs text-[#1D1D1B]/70 font-bold">
                درس {currentCase.lessonNumber}: {currentCase.lessonTitle}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#1D1D1B]">
              {currentCase.caseTitle}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs bg-white border border-[#1D1D1B]/20 text-[#1D1D1B] px-3 py-1 font-mono font-bold">
              {currentCase.sourceReference}
            </span>
          </div>
        </div>

        {/* Real-world Scenario / Hook */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-black text-[#8A1F1D] uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>السيناريو الواقعي / نص القضية المحاسبية:</span>
          </div>
          <div className="bg-white p-4 sm:p-5 border border-[#1D1D1B]/20 text-sm sm:text-base leading-relaxed text-[#1D1D1B] font-serif">
            {currentCase.scenario}
          </div>
        </div>

        {/* Core Debate & Question */}
        <div className="bg-[#1D1D1B] text-[#F9F7F2] p-4 sm:p-5 border-r-4 border-[#C4A484] space-y-2">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#C4A484]">
            <Compass className="w-4 h-4" />
            <span>السؤال الجوهري للمقال (القضية المركزية):</span>
          </div>
          <p className="text-sm sm:text-base font-bold leading-relaxed text-[#F9F7F2]">
            {currentCase.coreQuestion}
          </p>
        </div>

        {/* Key Principles & Exam Requirements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* Principles */}
          <div className="bg-white border border-[#1D1D1B]/20 p-4 space-y-2">
            <span className="text-xs font-bold text-[#1D1D1B] flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-[#C4A484]" />
              <span>المبادئ والفروض المحاسبية الحاكمة:</span>
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentCase.principles.map((pr, idx) => (
                <span 
                  key={idx}
                  className="text-xs font-bold bg-[#F9F7F2] text-[#1D1D1B] border border-[#1D1D1B]/15 px-2.5 py-1"
                >
                  {pr}
                </span>
              ))}
            </div>
          </div>

          {/* Exam Requirements */}
          <div className="bg-white border border-[#1D1D1B]/20 p-4 space-y-2">
            <span className="text-xs font-bold text-[#1D1D1B] flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#8A1F1D]" />
              <span>المطلوب في تقويم البكالوريا (20 درجة):</span>
            </span>
            <ul className="space-y-1 text-xs text-[#1D1D1B]/80 list-disc list-inside">
              {currentCase.required.slice(0, 3).map((req, idx) => (
                <li key={idx} className="leading-snug">{req}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      {/* Mode Switcher & Quick Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white border-2 border-[#1D1D1B] p-3 sm:p-4 print:hidden">
        {/* Modes */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveMode('stepped')}
            className={`px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'stepped'
                ? 'bg-[#1D1D1B] text-[#F9F7F2]'
                : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>بناء الأركان الستة (مُجزأ)</span>
          </button>

          <button
            onClick={() => setActiveMode('unified')}
            className={`px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'unified'
                ? 'bg-[#1D1D1B] text-[#F9F7F2]'
                : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>المقال الموحد الممتد</span>
          </button>

          <button
            onClick={() => setActiveMode('exemplary')}
            className={`px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'exemplary'
                ? 'bg-[#8A1F1D] text-white'
                : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>النموذج الاسترشادي (20/20)</span>
          </button>

          <button
            onClick={() => setActiveMode('tips')}
            className={`px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'tips'
                ? 'bg-[#1D1D1B] text-[#F9F7F2]'
                : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>توجيهات المعلم</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleLoadExemplary}
            title="تعبئة النموذج الوزاري المثالي"
            className="px-2.5 py-1.5 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-[#1D1D1B] hover:bg-[#C4A484]/20 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8A1F1D]" />
            <span className="hidden sm:inline">تحميل 20/20</span>
          </button>

          <button
            onClick={handleClearDraft}
            title="تفريغ الحقول لكتابة إجابتك الشخصية"
            className="px-2.5 py-1.5 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-[#1D1D1B] hover:bg-[#C4A484]/20 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">تفريغ</span>
          </button>

          <button
            onClick={handleCopyEssay}
            title="نسخ نص المقال كاملاً"
            className="px-2.5 py-1.5 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-[#1D1D1B] hover:bg-[#C4A484]/20 text-xs font-bold flex items-center gap-1 transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
          </button>

          <button
            onClick={handlePrint}
            title="طباعة المقال مع تقرير الدرجات المعتمد"
            className="px-2.5 py-1.5 bg-[#1D1D1B] text-[#F9F7F2] hover:bg-[#333330] text-xs font-bold flex items-center gap-1 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>طباعة</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Layout (Editor + Scorecard) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left/Center Column: Selected Mode View (2 cols on LG) */}
        <div className="lg:col-span-2 space-y-6">

          {/* MODE 1: STEPPED 6-COMPONENT BUILDER */}
          {activeMode === 'stepped' && (
            <div className="space-y-4">
              <div className="bg-[#1D1D1B] text-white px-4 py-2 text-xs font-bold flex items-center justify-between">
                <span>نمط البناء المتسلسل للأركان الستة وفق سلّم التقييم الوزاري</span>
                <span className="text-[#C4A484]">5 معايير تقويم × 4 درجات</span>
              </div>

              {/* Step 1: Claim */}
              <div className="bg-white border-2 border-[#1D1D1B] p-4 sm:p-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="font-bold text-xs text-[#1D1D1B] flex items-center gap-2">
                    <span className="w-6 h-6 bg-[#1D1D1B] text-[#C4A484] text-xs flex items-center justify-center font-bold">1</span>
                    <span>الموقف والحكم المباشر (Claim / Direct Judgment):</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#1D1D1B]/70 bg-[#F9F7F2] px-2 py-0.5 border border-[#1D1D1B]/15">
                      {claim.trim().split(/\s+/).filter(Boolean).length} كلمة • {claim.length} حرف
                    </span>
                    <span className="text-[11px] font-bold text-[#8A1F1D] bg-[#8A1F1D]/10 px-2 py-0.5">
                      المعيار الأول (4 درجات)
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-[#1D1D1B]/60">
                  حدد موقفك المحاسبي الحاسم بوضوح وقوة ودون تردد (موافقة، رفض، أو تفضيل بديل).
                </p>
                <textarea
                  value={claim}
                  onChange={e => setClaim(e.target.value)}
                  rows={4}
                  className="w-full p-3 bg-[#F9F7F2] border border-[#1D1D1B]/20 focus:border-[#8A1F1D] focus:outline-hidden text-xs sm:text-sm leading-relaxed min-h-[90px] resize-y"
                  placeholder="حدد بوضوح لا لبس فيه: هل المعاملة صحيحة أم خاطئة، وما هو المعيار المنتهك..."
                />
              </div>

              {/* Step 2: Reasoning */}
              <div className="bg-white border-2 border-[#1D1D1B] p-4 sm:p-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="font-bold text-xs text-[#1D1D1B] flex items-center gap-2">
                    <span className="w-6 h-6 bg-[#1D1D1B] text-[#C4A484] text-xs flex items-center justify-center font-bold">2</span>
                    <span>التفسير والربط السببي بالمبادئ (Reasoning & Accounting Principles):</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#1D1D1B]/70 bg-[#F9F7F2] px-2 py-0.5 border border-[#1D1D1B]/15">
                      {reasoning.trim().split(/\s+/).filter(Boolean).length} كلمة • {reasoning.length} حرف
                    </span>
                    <span className="text-[11px] font-bold text-[#8A1F1D] bg-[#8A1F1D]/10 px-2 py-0.5">
                      المعيار الثاني (4 درجات)
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-[#1D1D1B]/60">
                  فسر الأسباب المحاسبية مستنداً للمبادئ المعيارية (المقابلة، الاستحقاق، الحيطة والحذر، الثبات، التكلفة التاريخية).
                </p>
                <textarea
                  value={reasoning}
                  onChange={e => setReasoning(e.target.value)}
                  rows={6}
                  className="w-full p-3 bg-[#F9F7F2] border border-[#1D1D1B]/20 focus:border-[#8A1F1D] focus:outline-hidden text-xs sm:text-sm leading-relaxed min-h-[140px] resize-y"
                  placeholder="اشرح التعليل المحاسبي التفصيلي استناداً للمبادئ والمعايير الحاكمة..."
                />
              </div>

              {/* Step 3: Evidence */}
              <div className="bg-white border-2 border-[#1D1D1B] p-4 sm:p-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="font-bold text-xs text-[#1D1D1B] flex items-center gap-2">
                    <span className="w-6 h-6 bg-[#1D1D1B] text-[#C4A484] text-xs flex items-center justify-center font-bold">3</span>
                    <span>الأدلة المحاسبية والأمثلة الرقمية (Evidence & Quantitative Data):</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#1D1D1B]/70 bg-[#F9F7F2] px-2 py-0.5 border border-[#1D1D1B]/15">
                      {evidence.trim().split(/\s+/).filter(Boolean).length} كلمة • {evidence.length} حرف
                    </span>
                    <span className="text-[11px] font-bold text-[#8A1F1D] bg-[#8A1F1D]/10 px-2 py-0.5">
                      المعيار الثالث (4 درجات)
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-[#1D1D1B]/60">
                  قدم أمثلة رقمية محددة أو أثر المعاملة على القوائم المالية (أرباح، سيولة، مركز مالي، حقوق الملكية).
                </p>
                <textarea
                  value={evidence}
                  onChange={e => setEvidence(e.target.value)}
                  rows={6}
                  className="w-full p-3 bg-[#F9F7F2] border border-[#1D1D1B]/20 focus:border-[#8A1F1D] focus:outline-hidden text-xs sm:text-sm leading-relaxed min-h-[140px] resize-y"
                  placeholder="سجل أرقام القيود، الفروق الحسابية، وتأثيرها الكمي بالأرقام والجنيهات على المركز المالي..."
                />
              </div>

              {/* Step 4: Counter-Argument */}
              <div className="bg-white border-2 border-[#1D1D1B] p-4 sm:p-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="font-bold text-xs text-[#1D1D1B] flex items-center gap-2">
                    <span className="w-6 h-6 bg-[#1D1D1B] text-[#C4A484] text-xs flex items-center justify-center font-bold">4</span>
                    <span>عرض الحجة المضادة للرأي المعارض (Counter-Argument):</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#1D1D1B]/70 bg-[#F9F7F2] px-2 py-0.5 border border-[#1D1D1B]/15">
                      {counterArg.trim().split(/\s+/).filter(Boolean).length} كلمة • {counterArg.length} حرف
                    </span>
                    <span className="text-[11px] font-bold text-[#1D1D1B]/70 bg-[#1D1D1B]/5 px-2 py-0.5">
                      معيار البنية الجدلية (شطر أ)
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-[#1D1D1B]/60">
                  اعرض بأمانة علمية وجهة النظر المخالفة وتبريرات أصحابها قبل تفنيدها.
                </p>
                <textarea
                  value={counterArg}
                  onChange={e => setCounterArg(e.target.value)}
                  rows={4}
                  className="w-full p-3 bg-[#F9F7F2] border border-[#1D1D1B]/20 focus:border-[#8A1F1D] focus:outline-hidden text-xs sm:text-sm leading-relaxed min-h-[90px] resize-y"
                  placeholder="قد يجادل البعض بأن هذه المعالجة مقبولة نظراً لـ..."
                />
              </div>

              {/* Step 5: Rebuttal */}
              <div className="bg-white border-2 border-[#1D1D1B] p-4 sm:p-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="font-bold text-xs text-[#1D1D1B] flex items-center gap-2">
                    <span className="w-6 h-6 bg-[#1D1D1B] text-[#C4A484] text-xs flex items-center justify-center font-bold">5</span>
                    <span>التفنيد والرد المحاسبي على الحجة المضادة (Rebuttal):</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#1D1D1B]/70 bg-[#F9F7F2] px-2 py-0.5 border border-[#1D1D1B]/15">
                      {rebuttal.trim().split(/\s+/).filter(Boolean).length} كلمة • {rebuttal.length} حرف
                    </span>
                    <span className="text-[11px] font-bold text-[#1D1D1B]/70 bg-[#1D1D1B]/5 px-2 py-0.5">
                      معيار البنية الجدلية (شطر ب)
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-[#1D1D1B]/60">
                  فند الحجة المعارضة وأثبت ثغراتها ونقاط ضعفها وفق المعايير والقوانين.
                </p>
                <textarea
                  value={rebuttal}
                  onChange={e => setRebuttal(e.target.value)}
                  rows={5}
                  className="w-full p-3 bg-[#F9F7F2] border border-[#1D1D1B]/20 focus:border-[#8A1F1D] focus:outline-hidden text-xs sm:text-sm leading-relaxed min-h-[120px] resize-y"
                  placeholder="إلا أن هذا الادعاء غير سليم محاسبياً لأن المعيار ينص صراحة على..."
                />
              </div>

              {/* Step 6: Justified Conclusion */}
              <div className="bg-white border-2 border-[#1D1D1B] p-4 sm:p-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="font-bold text-xs text-[#1D1D1B] flex items-center gap-2">
                    <span className="w-6 h-6 bg-[#1D1D1B] text-[#C4A484] text-xs flex items-center justify-center font-bold">6</span>
                    <span>الخاتمة المعللة والتوصية المهنية (Justified Conclusion & Recommendation):</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-[#1D1D1B]/70 bg-[#F9F7F2] px-2 py-0.5 border border-[#1D1D1B]/15">
                      {conclusion.trim().split(/\s+/).filter(Boolean).length} كلمة • {conclusion.length} حرف
                    </span>
                    <span className="text-[11px] font-bold text-[#8A1F1D] bg-[#8A1F1D]/10 px-2 py-0.5">
                      المعيار الخامس (4 درجات)
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-[#1D1D1B]/60">
                  صغ حكماً تركيبياً ناضجاً متوازناً مشفوعاً بتوصية مهنية تضمن مصداقية القوائم.
                </p>
                <textarea
                  value={conclusion}
                  onChange={e => setConclusion(e.target.value)}
                  rows={4}
                  className="w-full p-3 bg-[#F9F7F2] border border-[#1D1D1B]/20 focus:border-[#8A1F1D] focus:outline-hidden text-xs sm:text-sm leading-relaxed min-h-[90px] resize-y"
                  placeholder="بناءً على ما تقدم نوصي بإجراء قيد التسوية التالي واعتماد السياسة الرقابية..."
                />
              </div>
            </div>
          )}

          {/* MODE 2: UNIFIED ESSAY EDITOR */}
          {activeMode === 'unified' && (
            <div className="bg-white border-2 border-[#1D1D1B] p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1D1D1B]/15 pb-3">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-black text-[#1D1D1B]">
                    محرر المقال الممتد الموحد (Unified Continuous Essay)
                  </h4>
                  <p className="text-xs text-[#1D1D1B]/70">
                    اكتب مقالك بصورة فقرات متصلة كما ستكتبها في ورقة امتحان البكالوريا تماماً.
                  </p>
                </div>
                <div className="text-xs font-mono bg-[#F9F7F2] border border-[#1D1D1B]/20 px-2.5 py-1 font-bold">
                  <span>{unifiedEssay.trim().split(/\s+/).filter(Boolean).length} كلمة</span>
                  <span className="mx-1">•</span>
                  <span>{unifiedEssay.length} حرف</span>
                </div>
              </div>

              <textarea
                value={unifiedEssay}
                onChange={e => setUnifiedEssay(e.target.value)}
                rows={16}
                placeholder="ابدأ بصياغة الموقف والحكم المباشر، ثم التفسير السببي، ثم الأدلة الرقمية، ثم عرض الحجة المضادة والرد عليها، واختم بالخاتمة المعللة والتوصيات الرقابية..."
                className="w-full p-4 bg-[#F9F7F2] border-2 border-[#1D1D1B]/20 focus:border-[#8A1F1D] focus:outline-hidden text-sm sm:text-base leading-relaxed font-serif min-h-[360px] resize-y shadow-inner"
              />

              <div className="bg-[#1D1D1B]/5 p-3 text-xs text-[#1D1D1B]/75 leading-relaxed">
                💡 <strong>نصيحة الامتحان:</strong> احرص على استخدام أدوات الربط المنطقي المحاسبية 
                (مثل: "ويرجع ذلك إلى أن..."، "والدليل الرقمي على ذلك..."، "ورغم زعم البعض بأن..."، "وختاماً نوصي بـ...").
              </div>
            </div>
          )}

          {/* MODE 3: FULL EXEMPLARY 20/20 ESSAY */}
          {activeMode === 'exemplary' && (
            <div className="bg-white border-2 border-[#8A1F1D] p-6 space-y-6">
              <div className="flex items-center justify-between border-b-2 border-[#8A1F1D]/20 pb-4">
                <div className="space-y-1">
                  <span className="text-xs font-extrabold text-[#8A1F1D] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>النموذج الوزاري المعتمد الدرجة الكاملة (20 / 20)</span>
                  </span>
                  <h4 className="text-lg font-black text-[#1D1D1B]">
                    صياغة مرافعة JRE نموذجية ومكتملة الأركان لقضية {currentCase.caseTitle}
                  </h4>
                </div>
                <button
                  onClick={handleLoadExemplary}
                  className="px-3 py-1.5 bg-[#8A1F1D] hover:bg-[#701917] text-white text-xs font-bold transition cursor-pointer"
                >
                  نسخ إلى المحرر
                </button>
              </div>

              {/* Essay Content Rendered with Luxury Typographic Spacing */}
              <div className="bg-[#F9F7F2] p-6 border border-[#1D1D1B]/15 space-y-4 font-serif text-sm sm:text-base leading-relaxed text-[#1D1D1B] whitespace-pre-line">
                {currentCase.exemplaryEssayFull}
              </div>

              {/* Rubric Breakdown of Model Essay */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-white border border-[#1D1D1B]/15 text-xs space-y-1">
                  <strong className="text-[#8A1F1D] block">الحكم والموقف (4/4):</strong>
                  <p className="text-[#1D1D1B]/80">{currentCase.defaultClaim}</p>
                </div>
                <div className="p-3 bg-white border border-[#1D1D1B]/15 text-xs space-y-1">
                  <strong className="text-[#8A1F1D] block">التعليل بالمبادئ (4/4):</strong>
                  <p className="text-[#1D1D1B]/80">{currentCase.defaultReasoning}</p>
                </div>
                <div className="p-3 bg-white border border-[#1D1D1B]/15 text-xs space-y-1">
                  <strong className="text-[#8A1F1D] block">الدليل الرقمي (4/4):</strong>
                  <p className="text-[#1D1D1B]/80">{currentCase.defaultEvidence}</p>
                </div>
                <div className="p-3 bg-white border border-[#1D1D1B]/15 text-xs space-y-1">
                  <strong className="text-[#8A1F1D] block">التفنيد والخاتمة (8/8):</strong>
                  <p className="text-[#1D1D1B]/80">{currentCase.defaultRebuttal} {currentCase.defaultConclusion}</p>
                </div>
              </div>
            </div>
          )}

          {/* MODE 4: EXPERT TEACHER TIPS & TRAPS */}
          {activeMode === 'tips' && (
            <div className="bg-white border-2 border-[#1D1D1B] p-6 space-y-6">
              <div className="border-b border-[#1D1D1B]/15 pb-3">
                <h4 className="text-base font-black text-[#1D1D1B] flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#C4A484]" />
                  <span>توجيهات المعلم الخبير وإرشادات نيل الدرجة النهائية (20/20)</span>
                </h4>
                <p className="text-xs text-[#1D1D1B]/70 mt-1">
                  أهم الإرشادات والتحذيرات لتفادي فقد الدرجات في سؤال المقال الاستدلالي بالبكالوريا
                </p>
              </div>

              {/* Guiding Tips */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-[#8A1F1D] uppercase tracking-wider">
                  إرشادات خاصة بهذه القضية ({currentCase.caseTitle}):
                </h5>
                <div className="space-y-2">
                  {currentCase.guidingTips.map((tip, idx) => (
                    <div key={idx} className="p-3 bg-[#F9F7F2] border-r-4 border-[#8A1F1D] text-xs text-[#1D1D1B] leading-relaxed">
                      {tip}
                    </div>
                  ))}
                </div>
              </div>

              {/* Universal JRE Traps */}
              <div className="space-y-3 pt-4 border-t border-[#1D1D1B]/15">
                <h5 className="text-xs font-bold text-[#1D1D1B] uppercase tracking-wider">
                  الأفخاخ الشائعة التي تُفقد الطالب درجات المقال:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-red-50 border border-red-200 text-xs space-y-1">
                    <strong className="text-red-800 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>فخ الانحياز الأحادي المتطرف</span>
                    </strong>
                    <p className="text-red-900/80 leading-relaxed">
                      القول إن أحد الطرفين صواب 100% والآخر خطأ مطلقاً؛ المقال المتميز يعترف بوجاهة جزئية للرأي الآخر ثم يفندها بالأدلة.
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 text-xs space-y-1">
                    <strong className="text-amber-800 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>فخ غياب الأدلة الرقمية</span>
                    </strong>
                    <p className="text-amber-900/80 leading-relaxed">
                      الكلام النظري الإنشائي دون ذكر أرقام أو قيود محاسبية أو أثر واضح على حسابات الميزانية وقائمة الدخل يخصم 4 درجات كاملة.
                    </p>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 text-xs space-y-1">
                    <strong className="text-blue-800 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>فخ إغفال المبادئ الحاكمة</span>
                    </strong>
                    <p className="text-blue-900/80 leading-relaxed">
                      يجب تسمية المبادئ الصريحة في متن الإجابة (المقابلة، الحيطة والحذر، الثبات، الاستحقاق، التكلفة التاريخية).
                    </p>
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs space-y-1">
                    <strong className="text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>السر الذهبي: الخاتمة المشروطة</span>
                    </strong>
                    <p className="text-emerald-900/80 leading-relaxed">
                      اختم دائماً بـ "حكم مشروط بالضوابط الرقابية والإفصاح الشفاف في الإيضاحات المتممة للقوائم".
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Live Rubric Diagnostic Scorecard (1 col on LG) */}
        <aside className="space-y-4">
          
          <div className="bg-white border-2 border-[#1D1D1B] p-4 sm:p-5 space-y-4 shadow-sm sticky top-4">
            
            {/* Rubric Header */}
            <div className="border-b-2 border-[#1D1D1B]/15 pb-3 flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="font-black text-[#1D1D1B] text-sm flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#C4A484]" />
                  <span>لوحة تقييم الـ Rubric (20 درجة)</span>
                </h3>
                <span className="text-[11px] text-[#1D1D1B]/60 block">المعايير الخمسة المعتمدة</span>
              </div>

              <div className="text-right">
                <span className="font-mono text-xl font-black text-[#8A1F1D]">
                  {currentScore} / 20
                </span>
              </div>
            </div>

            {/* Criteria Breakdown Cards */}
            <div className="space-y-2.5">
              {CANONICAL_JRE_RUBRIC.map((crit, idx) => {
                const critEval = evaluation?.criteria[crit.id];
                const score = critEval?.score ?? 4;
                const isFull = score === 4;

                return (
                  <div key={crit.id} className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/15 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#1D1D1B] flex items-center gap-1.5">
                        <span className="w-4 h-4 bg-[#1D1D1B] text-white text-[10px] flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <span>{crit.nameAr.split('(')[0]}</span>
                      </span>
                      <span className={`font-mono font-bold px-2 py-0.5 text-xs ${
                        isFull 
                          ? 'bg-emerald-900 text-emerald-100' 
                          : score >= 2 
                            ? 'bg-[#1D1D1B] text-[#C4A484]' 
                            : 'bg-[#8A1F1D] text-white'
                      }`}>
                        {score} / 4
                      </span>
                    </div>

                    {critEval?.reasoning && (
                      <p className="text-[11px] text-[#1D1D1B]/75 leading-tight">
                        {critEval.reasoning}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Live Diagnostic Evaluator Notes */}
            {evaluation?.evaluatorNotes && (
              <div className="p-3 bg-[#1D1D1B] text-[#F9F7F2] text-xs leading-relaxed border-r-4 border-[#C4A484] space-y-1">
                <strong className="text-[#C4A484] block font-bold flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>تشخيص مقيم البكالوريا:</span>
                </strong>
                <p className="text-xs text-[#F9F7F2]/90">
                  {evaluation.evaluatorNotes}
                </p>
              </div>
            )}

            {/* Recommendations / Actionable tips */}
            {evaluation?.actionableRecommendations && evaluation.actionableRecommendations.length > 0 && (
              <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/15 text-xs space-y-1.5">
                <strong className="text-[#8A1F1D] block font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>توصيات لتحسين الدرجة:</span>
                </strong>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-[#1D1D1B]/80">
                  {evaluation.actionableRecommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Complete Workshop Action */}
            {onComplete && (
              <button
                onClick={onComplete}
                className="w-full py-3 bg-[#8A1F1D] hover:bg-[#701917] text-white font-bold text-xs transition border border-[#8A1F1D] flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Award className="w-4 h-4" />
                <span>اعتماد نتيجة الـ JRE وإكمال الورشة</span>
              </button>
            )}

          </div>

        </aside>

      </div>

      {/* Printable Report Footer (Visible only when printed) */}
      <div className="hidden print:block border-t-2 border-[#1D1D1B] pt-4 mt-8 text-xs text-[#1D1D1B]/80 space-y-2 font-serif">
        <div className="flex justify-between items-center">
          <span>منصة كتاب البكالوريا المصرية — ورشة التفسير المحاسبي المدعوم بالأدلة (JRE)</span>
          <span>درجة الطالب: {currentScore} / 20 ({bandLabel})</span>
        </div>
        <div className="flex justify-between items-center text-[10px] text-[#1D1D1B]/60">
          <span>القضية: {currentCase.caseTitle} — {currentCase.sourceReference}</span>
          <span>حقوق الطبع والنشر محفوظة © 2026</span>
        </div>
      </div>

    </div>
  );
};
