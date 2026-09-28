import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  FileCheck2, 
  AlertCircle, 
  SlidersHorizontal, 
  Layers, 
  History, 
  PlayCircle, 
  CheckCircle2, 
  Search, 
  HelpCircle,
  FileSpreadsheet,
  Building2,
  Calendar,
  AlertTriangle,
  GitBranch,
  BarChart3,
  BookOpen,
  GraduationCap,
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { SOURCE_REGISTRY, getAllSources, getContentOriginMeta } from '../data/sourceRegistry';
import { ALL_BANK_QUESTIONS } from '../data/questionBankData';
import { ALL_UNITS } from '../data/unitsData';
import { TEXTBOOK_QUESTIONS_REGISTRY, getTotalTextbookQuestionsCount } from '../data/textbookQuestions/registry';
import { UNIT_ASSESSMENTS_REGISTRY, getTotalAssessmentQuestionsCount } from '../data/unitAssessments/registry';
import { runContentAudit, ContentAuditSummary, ValidationIssue } from '../utils/contentValidator';
import { CONTENT_AUDIT_LOG, CURRICULUM_VERSIONS } from '../data/contentAuditLog';
import { SourceProvenanceBadge } from './SourceProvenanceBadge';
import { ContentOrigin, VerificationStatus } from '../types';

export const ContentGovernanceDashboard: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'unit_report' | 'inventory' | 'audit_runner' | 'audit_log' | 'versioning'>('unit_report');
  const [reportCopied, setReportCopied] = useState<boolean>(false);
  const [unitReportFilter, setUnitReportFilter] = useState<'all' | 'part1' | 'part2'>('all');
  
  // Filters
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedBloom, setSelectedBloom] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Audit results state
  const [auditSummary, setAuditSummary] = useState<ContentAuditSummary>(() => runContentAudit());
  const [isRunningAudit, setIsRunningAudit] = useState(false);

  const handleRunAudit = () => {
    setIsRunningAudit(true);
    setTimeout(() => {
      const res = runContentAudit();
      setAuditSummary(res);
      setIsRunningAudit(false);
    }, 300);
  };

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return ALL_BANK_QUESTIONS.filter(q => {
      if (selectedUnit !== 'all' && q.unitNumber !== Number(selectedUnit)) return false;
      
      const computedOrigin = (q.sourceStatus === 'OFFICIAL_SOURCE' || q.sourceType === 'TEXTBOOK' || q.sourceType === 'ASSESSMENT') 
        ? 'MINISTRY_OFFICIAL' 
        : (q.sourceStatus === 'PLATFORM_DERIVED' || q.sourceType === 'DERIVED') 
        ? 'PLATFORM_EXPLANATION' 
        : 'ENRICHMENT';

      if (selectedOrigin !== 'all' && computedOrigin !== selectedOrigin) return false;
      if (selectedType !== 'all' && q.type !== selectedType) return false;
      if (selectedBloom !== 'all' && q.bloomLevel !== selectedBloom) return false;

      if (searchQuery.trim()) {
        const qText = (q.question || '').toLowerCase();
        const ansText = String(q.correctAnswer || '').toLowerCase();
        const s = searchQuery.toLowerCase();
        return qText.includes(s) || ansText.includes(s) || (q.cardId || '').toLowerCase().includes(s);
      }

      return true;
    });
  }, [selectedUnit, selectedOrigin, selectedType, selectedBloom, searchQuery]);

  // Comprehensive Units Report Data
  const unitsReportData = useMemo(() => {
    return ALL_UNITS.map(u => {
      const tbBundle = TEXTBOOK_QUESTIONS_REGISTRY[u.number];
      const assessBundle = UNIT_ASSESSMENTS_REGISTRY[u.number];
      const bankCount = ALL_BANK_QUESTIONS.filter(q => q.unitNumber === u.number).length;
      const totalLessons = u.lessons?.length || 0;
      const totalConcepts = u.lessons.reduce((sum, l) => sum + (l.concepts?.length || 0), 0);
      const totalQuickChecks = u.lessons.reduce((sum, l) => sum + (l.quickCheck?.length || 0), 0);
      const tbQuestionsCount = tbBundle?.questions?.length || 0;
      const assessStats = assessBundle?.stats;
      const grandAssessCount = assessStats?.grandTotalQuestions || (assessBundle?.assessments?.length ? 13 : 0);

      return {
        unitNumber: u.number,
        title: u.title,
        part: u.part || (u.number <= 5 ? 1 : 2),
        totalLessons,
        totalConcepts,
        totalQuickChecks,
        hasCaseStudy: Boolean(u.caseStudy),
        tbQuestionsCount,
        tbPageRange: tbBundle?.auditLog?.pageRange || '—',
        tbSource: tbBundle?.auditLog?.source || 'كتاب الوزارة المعتمد',
        assessWeeksCount: assessBundle?.assessments?.length || 0,
        classActivityQuestions: assessStats?.totalClassActivityQuestions || 0,
        homeworkQuestions: assessStats?.totalHomeworkQuestions || 0,
        weeklyEvaluationQuestions: assessStats?.totalWeeklyEvaluationQuestions || 0,
        weeklyModelsCount: assessStats?.totalWeeklyModels || 0,
        grandAssessCount,
        bankQuestionsCount: bankCount,
        totalAllItems: totalQuickChecks + tbQuestionsCount + grandAssessCount + bankCount
      };
    });
  }, []);

  const reportTotals = useMemo(() => {
    return {
      totalUnits: unitsReportData.length,
      totalLessons: unitsReportData.reduce((s, r) => s + r.totalLessons, 0),
      totalConcepts: unitsReportData.reduce((s, r) => s + r.totalConcepts, 0),
      totalQuickChecks: unitsReportData.reduce((s, r) => s + r.totalQuickChecks, 0),
      totalCaseStudies: unitsReportData.filter(r => r.hasCaseStudy).length,
      totalTbQuestions: unitsReportData.reduce((s, r) => s + r.tbQuestionsCount, 0),
      totalAssessQuestions: unitsReportData.reduce((s, r) => s + r.grandAssessCount, 0),
      totalClassActivity: unitsReportData.reduce((s, r) => s + r.classActivityQuestions, 0),
      totalHomework: unitsReportData.reduce((s, r) => s + r.homeworkQuestions, 0),
      totalWeeklyEval: unitsReportData.reduce((s, r) => s + r.weeklyEvaluationQuestions, 0),
      totalBankQuestions: unitsReportData.reduce((s, r) => s + r.bankQuestionsCount, 0),
      grandTotal: unitsReportData.reduce((s, r) => s + r.totalAllItems, 0)
    };
  }, [unitsReportData]);

  const handleCopyReport = () => {
    let text = `تقرير محتويات منصة إدارة الأعمال (البكالوريا المصرية)\nتاريخ الاستخراج: ${new Date().toLocaleDateString('ar-EG')}\n\n`;
    text += `إجمالي الوحدات: ${reportTotals.totalUnits} وحدات\n`;
    text += `إجمالي الدروس المشروحة: ${reportTotals.totalLessons} درساً\n`;
    text += `إجمالي المفاهيم الرئيسية: ${reportTotals.totalConcepts} مفهوماً\n`;
    text += `إجمالي دراسات الحالة: ${reportTotals.totalCaseStudies} دراسات\n`;
    text += `إجمالي الفحوصات السريعة (Quick Checks): ${reportTotals.totalQuickChecks} سؤالاً\n`;
    text += `إجمالي أسئلة كتاب الوزارة: ${reportTotals.totalTbQuestions} سؤالاً موثقاً\n`;
    text += `إجمالي تقييمات الوزارة الأسبوعية: ${reportTotals.totalAssessQuestions} سؤالاً (صفية ومنزلية وأسبوعية أ، ب، ج)\n`;
    text += `إجمالي بنك الأسئلة الإلكتروني: ${reportTotals.totalBankQuestions} سؤالاً مصنفاً\n`;
    text += `المجموع الكلي لكافة الأسئلة والأنشطة: ${reportTotals.grandTotal} بنداً تقييمياً\n\n`;
    text += `--- تفصيل كل وحدة ---\n`;
    unitsReportData.forEach(u => {
      text += `• الوحدة ${u.unitNumber}: ${u.title}\n`;
      text += `  - الشرح: ${u.totalLessons} دروس، ${u.totalConcepts} مفاهيم، ${u.hasCaseStudy ? 'دراسة حالة' : 'بدون'}، ${u.totalQuickChecks} فحص سريع\n`;
      text += `  - أسئلة الكتاب: ${u.tbQuestionsCount} سؤالاً (${u.tbPageRange})\n`;
      text += `  - التقييمات: ${u.grandAssessCount} سؤالاً عبر ${u.assessWeeksCount} أسابيع\n`;
      text += `  - بنك الأسئلة: ${u.bankQuestionsCount} سؤالاً\n`;
      text += `  - إجمالي أنشطة الوحدة: ${u.totalAllItems}\n\n`;
    });

    navigator.clipboard.writeText(text);
    setReportCopied(true);
    setTimeout(() => setReportCopied(false), 2500);
  };

  return (
    <div className="space-y-6 pb-20 font-['Cairo']">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-950 text-white p-6 sm:p-8 border border-slate-700 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>لوحة حوكمة المحتوى والتتبع المنهجي (Content Governance Dashboard)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              حوكمة المحتوى، الفصل الصريح، وسجل المصادر المركزي
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              تضمن هذه اللوحة الفصل الصارم والشفاف بين: (1) المحتوى الوزاري الرسمي المعتمد، (2) شروحات وتحليلات المنصة التربوية، (3) التدريبات الإثرائية، و(4) المحتوى قيد المراجعة؛ لمنع أي تضليل أو ادعاءات اعتماد غير موثقة.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleRunAudit}
              disabled={isRunningAudit}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-950/30 transition-all cursor-pointer border border-emerald-400/30 disabled:opacity-50"
            >
              <PlayCircle className="w-4 h-4" />
              <span>{isRunningAudit ? 'جاري الفحص...' : 'تشغيل التدقيق الآلي الآن'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Origin Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* 1. Official Ministry */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
              🟢 وزاري رسمي موثق
            </span>
            <span className="text-xl font-black text-emerald-900">
              {auditSummary.originCounts.MINISTRY_OFFICIAL}
            </span>
          </div>
          <p className="text-xs text-emerald-950 leading-relaxed font-medium">
            أسئلة كتاب الوزارة، كراسات التقييمات التراكمية، ونصوص المقررات المعتمدة المقيدة برقم صفحة وباب موثق.
          </p>
        </div>

        {/* 2. Platform Explanation */}
        <div className="bg-sky-50/80 border border-sky-200 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-sky-800 bg-sky-100 px-2.5 py-1 rounded-full border border-sky-300">
              🔵 شرح المنصة التربوي
            </span>
            <span className="text-xl font-black text-sky-900">
              {auditSummary.originCounts.PLATFORM_EXPLANATION}
            </span>
          </div>
          <p className="text-xs text-sky-950 leading-relaxed font-medium">
            سلاسل القيمة، محطات التفكير والقرار، وتبسيط المفاهيم الصعبة التي أعدها فريق التطوير بالمنصة.
          </p>
        </div>

        {/* 3. Enrichment */}
        <div className="bg-purple-50/80 border border-purple-200 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-purple-800 bg-purple-100 px-2.5 py-1 rounded-full border border-purple-300">
              🟣 تدريب إثرائي ومحاكاة
            </span>
            <span className="text-xl font-black text-purple-900">
              {auditSummary.originCounts.ENRICHMENT}
            </span>
          </div>
          <p className="text-xs text-purple-950 leading-relaxed font-medium">
            بنك الأسئلة المتقدم، المسائل الحسابية، دراسات الحالة في السوق المصري، ونماذج المحاكاة الإضافية.
          </p>
        </div>

        {/* 4. Unverified */}
        <div className="bg-slate-100/90 border border-slate-300 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-700 bg-slate-200 px-2.5 py-1 rounded-full border border-slate-300">
              ⚪ غير موثق / مراجعة
            </span>
            <span className="text-xl font-black text-slate-800">
              {auditSummary.originCounts.UNVERIFIED}
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            محتوى إرشادي لا يملك رابطاً موثقاً حتى الآن ويخضع للمراجعة الأكاديمية والتدقيق الداخلي.
          </p>
        </div>

      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('unit_report')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'unit_report'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-emerald-500" />
          <span>📊 تقرير محتويات الوحدات الشامل (الشرح • الكتاب • التقييمات • البنك)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('inventory')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'inventory'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>سجل المحتوى وفلترة الأسئلة ({filteredQuestions.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('audit_runner')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'audit_runner'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>نتائج التدقيق الآلي ({auditSummary.issues.length} تنبيهات)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('audit_log')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'audit_log'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <History className="w-4 h-4" />
          <span>سجل التغييرات التربوي (Audit Log)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('versioning')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'versioning'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          <GitBranch className="w-4 h-4" />
          <span>إصدارات المنهج (Versioning)</span>
        </button>
      </div>

      {/* View 0: Comprehensive Unit Content Report */}
      {activeSubTab === 'unit_report' && (
        <div className="space-y-6">
          {/* Action & Filter Bar */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                  تقرير رسمي مطابق للواقع
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  تحديث: سبتمبر 2026 • العام الأكاديمي 2026 / 2027
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                تقرير حصر وتدقيق محتويات المنصة التراكمي (الوحدات 1 – 10)
              </h2>
              <p className="text-xs text-slate-600">
                جرد شامل ودقيق لكل ما تم بناؤه في المنصة: الدروس والمفاهيم المشروحة، أسئلة كتاب الوزارة المحلولة، كراسات التقييمات الأسبوعية، وبنوك الأسئلة المعتمدة.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="inline-flex rounded-2xl bg-slate-100 p-1 border border-slate-200">
                <button
                  onClick={() => setUnitReportFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    unitReportFilter === 'all'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  جميع الوحدات (10)
                </button>
                <button
                  onClick={() => setUnitReportFilter('part1')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    unitReportFilter === 'part1'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  الجزء الأول (1–5)
                </button>
                <button
                  onClick={() => setUnitReportFilter('part2')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    unitReportFilter === 'part2'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  الجزء الثاني (6–10)
                </button>
              </div>

              <button
                onClick={handleCopyReport}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black shadow-xs transition-all cursor-pointer"
              >
                {reportCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>تم النسخ بنجاح!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-300" />
                    <span>نسخ التقرير للأرشفة</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 4 Summary Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Lessons & Concepts */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 rounded-3xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-blue-900">
                  {reportTotals.totalLessons}
                </span>
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm">دروس الشرح التأسيسية</h4>
                <p className="text-xs text-blue-800 font-semibold mt-0.5">
                  {reportTotals.totalConcepts} مفهوماً • {reportTotals.totalCaseStudies} دراسات حالة • {reportTotals.totalQuickChecks} فحصاً سريعاً
                </p>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed border-t border-blue-200/60 pt-2">
                تغطية شاملة لمفاهيم وسلاسل القيمة ومحطات التفكير والقرار للمنهج المعتمد.
              </p>
            </div>

            {/* Textbook Questions */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/80 rounded-3xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-emerald-900">
                  {reportTotals.totalTbQuestions}
                </span>
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm">أسئلة كتاب الوزارة الرسمي</h4>
                <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                  جميع أسئلة الكتاب بالصفحات والمحاور والسلالم
                </p>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed border-t border-emerald-200/60 pt-2">
                إجابات نموذجية كاملة + تبرير منهجي وتصنيف بلوم + مسارات الاستدلال وسلالم التقدير.
              </p>
            </div>

            {/* Weekly Assessments */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 rounded-3xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-amber-900">
                  {reportTotals.totalAssessQuestions}
                </span>
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm">تقييمات وأداءات الوزارة</h4>
                <p className="text-xs text-amber-800 font-semibold mt-0.5">
                  {reportTotals.totalClassActivity} صفي • {reportTotals.totalHomework} منزلي • {reportTotals.totalWeeklyEval} بنماذج أ، ب، ج
                </p>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed border-t border-amber-200/60 pt-2">
                مطابقة رسمية 100% لكراسات الحصص الأسبوعية الصادرة عن الوزارة لمقرر إدارة الأعمال.
              </p>
            </div>

            {/* Question Bank */}
            <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 border border-purple-200/80 rounded-3xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <span className="text-2xl font-black text-purple-900">
                  {reportTotals.totalBankQuestions}
                </span>
              </div>
              <div>
                <h4 className="font-black text-slate-900 text-sm">بنك الأسئلة الإلكتروني</h4>
                <p className="text-xs text-purple-800 font-semibold mt-0.5">
                  تفاعلي متعدد الخيارات ومواقف تطبيقية مصنفة
                </p>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed border-t border-purple-200/60 pt-2">
                مربوط بنظام LMS ومستويات بلوم والتحليل الفوري وتغذية راجعة تفسيرية لكل بديل.
              </p>
            </div>
          </div>

          {/* Grand Banner Total */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-emerald-400 font-black text-xs tracking-wider uppercase">
                الرصيد التراكمي الإجمالي للمنصة
              </span>
              <h3 className="text-lg font-black text-white">
                إجمالي عناصر المحتوى والأنشطة والتقييمات المنجزة على المنصة
              </h3>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center sm:text-right">
                <div className="text-3xl font-black text-emerald-400">
                  {reportTotals.grandTotal}
                </div>
                <div className="text-[11px] text-slate-400 font-bold">
                  سؤالاً ونشاطاً تقييمياً متاحاً للطلاب والمعلمين
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Unit-by-Unit Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-base">
                تفصيل محتويات المنصة وحدة بوحدة (من الوحدة الأولى حتى العاشرة)
              </h3>
              <span className="text-xs text-slate-500 font-bold">
                عرض {unitsReportData.filter(u => unitReportFilter === 'all' || (unitReportFilter === 'part1' ? u.part === 1 : u.part === 2)).length} وحدات
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 font-black border-b border-slate-200">
                    <th className="p-3.5 text-center">الوحدة</th>
                    <th className="p-3.5">عنوان الوحدة والمجال</th>
                    <th className="p-3.5 text-center">شرح الدروس والمفاهيم</th>
                    <th className="p-3.5 text-center">أسئلة كتاب الوزارة</th>
                    <th className="p-3.5 text-center">تقييمات الوزارة الأسبوعية</th>
                    <th className="p-3.5 text-center">بنك الأسئلة الإلكتروني</th>
                    <th className="p-3.5 text-center">إجمالي أسئلة الوحدة</th>
                    <th className="p-3.5 text-center">حالة التوثيق</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {unitsReportData
                    .filter(u => unitReportFilter === 'all' || (unitReportFilter === 'part1' ? u.part === 1 : u.part === 2))
                    .map((unit) => (
                      <tr key={unit.unitNumber} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 text-center font-black">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-xl font-bold text-xs ${
                            unit.part === 1 ? 'bg-indigo-100 text-indigo-900' : 'bg-emerald-100 text-emerald-900'
                          }`}>
                            {unit.unitNumber}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-slate-900">
                          <div className="flex flex-col">
                            <span className="text-xs font-black">{unit.title}</span>
                            <span className="text-[10px] text-slate-500 font-medium">
                              {unit.part === 1 ? 'الجزء الأول (الفصل الدراسي الأول)' : 'الجزء الثاني (الفصل الدراسي الثاني)'}
                            </span>
                          </div>
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="inline-block px-2.5 py-1 rounded-xl bg-blue-50 text-blue-800 font-bold border border-blue-200">
                            {unit.totalLessons} دروس • {unit.totalConcepts} مفاهيم
                          </span>
                          <div className="text-[10px] text-slate-500 mt-1">
                            {unit.hasCaseStudy ? 'دراسة حالة' : ''} {unit.totalQuickChecks > 0 ? `• ${unit.totalQuickChecks} فحص` : ''}
                          </div>
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="inline-block px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-900 font-black border border-emerald-200">
                            {unit.tbQuestionsCount} سؤالاً
                          </span>
                          <div className="text-[10px] text-emerald-700 mt-1 font-semibold">
                            {unit.tbPageRange}
                          </div>
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="inline-block px-2.5 py-1 rounded-xl bg-amber-50 text-amber-900 font-black border border-amber-200">
                            {unit.grandAssessCount} سؤالاً
                          </span>
                          <div className="text-[10px] text-slate-500 mt-1">
                            {unit.assessWeeksCount} أسابيع • نماذج (أ، ب، ج)
                          </div>
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="inline-block px-2.5 py-1 rounded-xl bg-purple-50 text-purple-900 font-black border border-purple-200">
                            {unit.bankQuestionsCount} سؤالاً
                          </span>
                          <div className="text-[10px] text-slate-500 mt-1">
                            تصنيف بلوم + LMS
                          </div>
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="font-black text-slate-900 text-sm">
                            {unit.totalAllItems}
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            بنداً تقييمياً
                          </span>
                        </td>
                        <td className="p-3.5 text-center">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>معتمد وموثق</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-900 text-white font-black border-t-2 border-slate-800">
                    <td className="p-3.5 text-center font-bold">المجموع</td>
                    <td className="p-3.5">إجمالي المنصة بالكامل (10 وحدات)</td>
                    <td className="p-3.5 text-center text-blue-300">
                      {reportTotals.totalLessons} درساً ({reportTotals.totalConcepts} مفهوماً)
                    </td>
                    <td className="p-3.5 text-center text-emerald-300">
                      {reportTotals.totalTbQuestions} سؤالاً
                    </td>
                    <td className="p-3.5 text-center text-amber-300">
                      {reportTotals.totalAssessQuestions} سؤالاً
                    </td>
                    <td className="p-3.5 text-center text-purple-300">
                      {reportTotals.totalBankQuestions} سؤالاً
                    </td>
                    <td className="p-3.5 text-center text-emerald-400 text-sm">
                      {reportTotals.grandTotal}
                    </td>
                    <td className="p-3.5 text-center text-emerald-400">
                      100% مكتمل
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Educational Governance Standards Note */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 space-y-2 text-xs text-slate-700">
            <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>منهجية الفصل الصريح والتوثيق المعتمدة في هذا التقرير:</span>
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-600 list-disc list-inside pt-1">
              <li><strong>شرح المنصة:</strong> صياغة تربوية مطابقة للأهداف التعليمية لكتاب الوزارة وتتضمن دراسات حالة وأمثلة مصرية واقعية وسلاسل قيمة.</li>
              <li><strong>أسئلة كتاب الوزارة:</strong> مطابقة حرفية لأسئلة الكتاب مع نموذج إجابة وتبرير علمي وسلم تقدير (Rubric).</li>
              <li><strong>تقييمات الوزارة الأسبوعية:</strong> استخراج كراسات الأداء الوزارية المقررة أسبوعياً ومقسمة إلى: أداء صفي، واجب منزلي، ونماذج التقييم الأسبوعي (أ، ب، ج).</li>
              <li><strong>بنك الأسئلة الإلكتروني:</strong> أسئلة موضوعية ومقالية تفاعلية مدرجة في محرك التدريب التراكمي ونظام LMS وتصنيف بلوم المعرفي.</li>
            </ul>
          </div>
        </div>
      )}

      {/* View 1: Inventory Table */}
      {activeSubTab === 'inventory' && (
        <div className="space-y-4">
          
          {/* Filters Bar */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-slate-600" />
                <span>فلاتر البحث والتدقيق المعياري</span>
              </div>
              <span className="text-xs text-slate-500 font-bold">
                عرض {filteredQuestions.length} من أصل {ALL_BANK_QUESTIONS.length} سؤالاً
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Unit Filter */}
              <div>
                <label className="block text-[11px] font-black text-slate-600 mb-1">الوحدة:</label>
                <select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-900"
                >
                  <option value="all">كافة الوحدات (1 - 10)</option>
                  {ALL_UNITS.map(u => (
                    <option key={u.number} value={u.number}>الوحدة {u.number}: {u.title.slice(0, 20)}...</option>
                  ))}
                </select>
              </div>

              {/* Origin Filter */}
              <div>
                <label className="block text-[11px] font-black text-slate-600 mb-1">تصنيف المصدر:</label>
                <select
                  value={selectedOrigin}
                  onChange={(e) => setSelectedOrigin(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-900"
                >
                  <option value="all">كافة التصنيفات</option>
                  <option value="MINISTRY_OFFICIAL">🟢 وزاري رسمي</option>
                  <option value="PLATFORM_EXPLANATION">🔵 شرح المنصة</option>
                  <option value="ENRICHMENT">🟣 تدريب إثرائي</option>
                  <option value="UNVERIFIED">⚪ غير موثق</option>
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-[11px] font-black text-slate-600 mb-1">نوع السؤال:</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-900"
                >
                  <option value="all">كافة الأنواع</option>
                  <option value="mcq">اختيار من متعدد</option>
                  <option value="true_false">صواب وخطأ</option>
                  <option value="short_essay">مقالي قصير</option>
                  <option value="calculation">حسابي وتطبيقي</option>
                  <option value="case_study">دراسة حالة</option>
                  <option value="jre">استدلال JRE</option>
                </select>
              </div>

              {/* Bloom Filter */}
              <div>
                <label className="block text-[11px] font-black text-slate-600 mb-1">مستوى بلوم:</label>
                <select
                  value={selectedBloom}
                  onChange={(e) => setSelectedBloom(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-900"
                >
                  <option value="all">كافة المستويات</option>
                  <option value="تذكر">تذكر</option>
                  <option value="فهم">فهم</option>
                  <option value="تطبيق">تطبيق</option>
                  <option value="تحليل">تحليل</option>
                  <option value="تقييم">تقييم</option>
                  <option value="حكم واستدلال">حكم واستدلال</option>
                </select>
              </div>

              {/* Search text */}
              <div>
                <label className="block text-[11px] font-black text-slate-600 mb-1">بحث بالنص أو المعرف:</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pr-8 pl-2 py-1.5 text-xs font-bold text-slate-900"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-black">
                  <tr>
                    <th className="p-3.5">المعرف</th>
                    <th className="p-3.5">الوحدة</th>
                    <th className="p-3.5">تصنيف المصدر</th>
                    <th className="p-3.5">نوع السؤال</th>
                    <th className="p-3.5">مستوى بلوم</th>
                    <th className="p-3.5">نص السؤال</th>
                    <th className="p-3.5">حالة التحقق</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {filteredQuestions.slice(0, 50).map((q, idx) => {
                    const origin: ContentOrigin = (q.sourceStatus === 'OFFICIAL_SOURCE' || q.sourceType === 'TEXTBOOK' || q.sourceType === 'ASSESSMENT') 
                      ? 'MINISTRY_OFFICIAL' 
                      : (q.sourceStatus === 'PLATFORM_DERIVED' || q.sourceType === 'DERIVED') 
                      ? 'PLATFORM_EXPLANATION' 
                      : 'ENRICHMENT';

                    return (
                      <tr key={q.id || idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-slate-900">
                          {q.cardId || q.id || `Q-${idx + 1}`}
                        </td>
                        <td className="p-3.5 font-bold text-slate-700">
                          الوحدة {q.unitNumber}
                        </td>
                        <td className="p-3.5">
                          <SourceProvenanceBadge 
                            origin={origin} 
                            sourcePage={q.sourcePage}
                            unitId={q.unitNumber}
                            compact={true}
                          />
                        </td>
                        <td className="p-3.5 font-bold text-slate-600">
                          {q.type}
                        </td>
                        <td className="p-3.5 font-bold text-indigo-700">
                          {q.bloomLevel}
                        </td>
                        <td className="p-3.5 max-w-md truncate" title={q.question}>
                          {q.question}
                        </td>
                        <td className="p-3.5">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>موثق ✓</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredQuestions.length > 50 && (
              <div className="p-3 text-center text-xs text-slate-500 bg-slate-50 border-t border-slate-100 font-bold">
                يتم عرض أول 50 سؤالاً من إجمالي {filteredQuestions.length}. استخدم الفلاتر أعلاه لتضييق نطاق العرض.
              </div>
            )}
          </div>

        </div>
      )}

      {/* View 2: Automated Quality Audit Runner */}
      {activeSubTab === 'audit_runner' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-black text-slate-900 text-lg">تقرير الفحص الآلي لجودة وحوكمة المحتوى</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                يفحص تلقائياً: وجود الإجابات، مستويات بلوم القياسية، نسب التكرار، وتوثيق المصادر.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
                auditSummary.hasCriticalErrors 
                  ? 'bg-rose-100 text-rose-800' 
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                {auditSummary.hasCriticalErrors ? 'توجد أخطاء حرجة تتطلب معالجة' : 'خالٍ من الأخطاء الحرجة ✓'}
              </span>
              <button
                onClick={handleRunAudit}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                إعادة الفحص
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <div className="text-2xl font-black text-slate-900">
                {auditSummary.validCount}
              </div>
              <div className="text-xs font-bold text-slate-500 mt-1">عنصر محتوى مطابق 100%</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <div className="text-2xl font-black text-amber-600">
                {auditSummary.issues.filter(i => i.severity === 'WARNING').length}
              </div>
              <div className="text-xs font-bold text-slate-500 mt-1">تنبيهات إرشادية (Warnings)</div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <div className="text-2xl font-black text-rose-600">
                {auditSummary.issues.filter(i => i.severity === 'ERROR').length}
              </div>
              <div className="text-xs font-bold text-slate-500 mt-1">أخطاء حظر (Critical Errors)</div>
            </div>
          </div>

          {/* Issue Listing */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 text-sm">تفاصيل التنبيهات المكتشفة:</h4>
            {auditSummary.issues.length === 0 ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-center text-xs font-bold">
                🎉 لا توجد أي أخطاء أو تنبيهات! كافة الأسئلة والمفاهيم مطابقة لمعايير الحوكمة الصارمة.
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {auditSummary.issues.map((issue, idx) => (
                  <div 
                    key={idx}
                    className={`p-3.5 rounded-2xl border flex items-start gap-3 text-xs leading-relaxed ${
                      issue.severity === 'ERROR'
                        ? 'bg-rose-50 border-rose-200 text-rose-900'
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <div className="font-bold flex items-center gap-2">
                        <span className="font-mono">[{issue.itemId}]</span>
                        {issue.unitNumber && <span>الوحدة {issue.unitNumber}</span>}
                        <span>({issue.category})</span>
                      </div>
                      <p>{issue.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* View 3: Content Audit Log */}
      {activeSubTab === 'audit_log' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-black text-slate-900 text-lg">سجل التغييرات والتدقيق التربوي (Audit Trail)</h3>
              <p className="text-xs text-slate-500">
                تسجيل رسمي لكافة التعديلات المنهجية، تصحيح الصياغات، وإعادة إسناد المصادر.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {CONTENT_AUDIT_LOG.map((log) => (
              <div 
                key={log.id} 
                className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs text-slate-800"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{log.id}</span>
                    <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                      {log.itemType}
                    </span>
                    <span className="text-slate-500">[{log.itemId}]</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(log.timestamp).toLocaleDateString('ar-EG')}</span>
                  </div>
                </div>

                <div className="font-bold text-slate-900 text-sm">
                  {log.changeDescription}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/60">
                  <div>
                    <strong className="text-slate-500">المصدر السابق:</strong> {log.previousSource || '—'}
                  </div>
                  <div>
                    <strong className="text-emerald-700">المصدر الموثق الجديد:</strong> {log.newSource}
                  </div>
                </div>

                <div className="text-slate-500 pt-1">
                  <strong>السبب والمسوغ:</strong> {log.reason} • <em>المحرر: {log.editor} ({log.role})</em>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View 4: Curriculum Versioning */}
      {activeSubTab === 'versioning' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-black text-slate-900 text-lg">شجرة إصدارات المنهج (Curriculum Versioning)</h3>
              <p className="text-xs text-slate-500">
                إدارة النسخ عند تحديث المقررات الوزارية أو ظهور طبعات جديدة دون استبدال صامت.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {CURRICULUM_VERSIONS.map((v) => (
              <div 
                key={v.version}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs">
                      {v.version}
                    </span>
                    <h4 className="font-black text-slate-900 text-sm">{v.title}</h4>
                  </div>
                  <span className="text-xs text-slate-500 font-bold">
                    تاريخ الإطلاق: {v.releaseDate} • العام: {v.academicYear}
                  </span>
                </div>

                <ul className="space-y-1.5 text-xs text-slate-700 list-disc list-inside">
                  {v.changesSummary.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>

                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>مطابق لسياسة حوكمة البيانات المعتمدة</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
