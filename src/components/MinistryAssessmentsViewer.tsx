import React, { useState, useMemo } from 'react';
import {
  FileText,
  CheckCircle2,
  HelpCircle,
  Award,
  Layers,
  Search,
  Filter,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Calendar,
  BookOpen,
  ArrowRight,
  Printer,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import {
  ALL_MINISTRY_ASSESSMENTS,
  MinistryAssessmentItem
} from '../data/ministryAssessmentsData';
import { useCurriculumFilter } from '../context/CurriculumFilterContext';

export const MinistryAssessmentsViewer: React.FC = () => {
  const {
    selectedUnitId: globalUnitId,
    selectedLessonId: globalLessonId,
    selectedUnit,
    selectedLesson,
    clearFilters: clearGlobalFilters
  } = useCurriculumFilter();

  // Active sub-type: 'all' | 'performance' | 'evaluation'
  const [activeTypeTab, setActiveTypeTab] = useState<'all' | 'performance' | 'evaluation'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<string>('all');
  const [selectedBloom, setSelectedBloom] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedWeek, setSelectedWeek] = useState<string>('all');
  const [selectedLessonFilter, setSelectedLessonFilter] = useState<string>('all');
  const [selectedTextMatch, setSelectedTextMatch] = useState<string>('all');
  const [showOnlyCrossUnit, setShowOnlyCrossUnit] = useState<boolean>(false);

  // Expanded cards state
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  // Selected user choices for MCQs to test themselves
  const [userSelectedOptions, setUserSelectedOptions] = useState<Record<string, string>>({});

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const allIds: Record<string, boolean> = {};
    ALL_MINISTRY_ASSESSMENTS.forEach(item => {
      allIds[item.question_id] = true;
    });
    setExpandedIds(allIds);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  // Distinct weeks list for filtering
  const availableWeeks = useMemo(() => {
    const set = new Set<string>();
    ALL_MINISTRY_ASSESSMENTS.forEach(item => {
      if (item.week && item.week !== 'غير مذكور صراحة') {
        set.add(item.week);
      }
    });
    return Array.from(set);
  }, []);

  // Filtered assessment items
  const filteredItems = useMemo(() => {
    return ALL_MINISTRY_ASSESSMENTS.filter(item => {
      // Type tab
      if (activeTypeTab === 'performance' && item.source_type !== 'أدائي') return false;
      if (activeTypeTab === 'evaluation' && item.source_type !== 'تقييم') return false;

      // Global or local unit filter
      const activeUnit = globalUnitId || (selectedUnitFilter !== 'all' ? selectedUnitFilter : null);
      if (activeUnit && item.official_unit_id !== activeUnit) return false;

      // Global or local lesson filter
      const activeLesson = globalLessonId || (selectedLessonFilter !== 'all' ? selectedLessonFilter : null);
      if (activeLesson && item.official_lesson_id !== activeLesson) return false;

      // Bloom filter
      if (selectedBloom !== 'all' && !item.bloom.includes(selectedBloom)) return false;

      // Difficulty filter
      if (selectedDifficulty !== 'all' && !item.difficulty.includes(selectedDifficulty)) return false;

      // Week filter
      if (selectedWeek !== 'all' && item.week !== selectedWeek) return false;

      // Text match filter
      if (selectedTextMatch !== 'all' && item.text_match_status !== selectedTextMatch) return false;

      // Cross unit filter
      if (showOnlyCrossUnit && !item.cross_unit_repetition) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inText = item.question_text.toLowerCase().includes(query);
        const inReq = item.required.toLowerCase().includes(query);
        const inAns = item.answer.toLowerCase().includes(query);
        const inConcept = item.official_concept.toLowerCase().includes(query);
        const inId = item.question_id.toLowerCase().includes(query);
        const inCanonical = (item.canonical_id || '').toLowerCase().includes(query);
        const inLegacy = (item.legacy_id || '').toLowerCase().includes(query);
        if (!inText && !inReq && !inAns && !inConcept && !inId && !inCanonical && !inLegacy) return false;
      }

      return true;
    });
  }, [
    activeTypeTab,
    globalUnitId,
    selectedUnitFilter,
    globalLessonId,
    selectedLessonFilter,
    selectedBloom,
    selectedDifficulty,
    selectedWeek,
    selectedTextMatch,
    showOnlyCrossUnit,
    searchQuery
  ]);

  // Counts
  const totalCount = ALL_MINISTRY_ASSESSMENTS.length;
  const performanceCount = ALL_MINISTRY_ASSESSMENTS.filter(i => i.source_type === 'أدائي').length;
  const evaluationCount = ALL_MINISTRY_ASSESSMENTS.filter(i => i.source_type === 'تقييم').length;

  return (
    <div className="space-y-6 text-[#1D1D1B] font-sans pb-16">
      {/* Header Banner */}
      <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1D1D1B]/15 pb-4 mb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-[#8A1F1D] text-white text-xs font-bold px-2.5 py-0.5 uppercase tracking-wider">
                كتاب الوزارة والتقييمات المعتمدة (Final Release)
              </span>
              <span className="text-xs font-mono bg-[#F9F7F2] text-[#1D1D1B] border border-[#1D1D1B]/20 px-2 py-0.5 font-bold">
                توثيق ۲۸۸ سؤالاً معتمداً • الوحدات ۱ إلى ٥ (ص ۳ إلى ۸٤)
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-[#1D1D1B] flex items-center gap-2 mt-1">
              <FileText className="w-6 h-6 text-[#8A1F1D]" />
              <span>بنك الأداءات والتقييمات المدرسية المعتمدة</span>
            </h2>
            <p className="text-xs md:text-sm text-[#1D1D1B]/70 leading-relaxed max-w-4xl">
              تفريغ شامل وكامل لكافة الأنشطة الصفية، الأداءات المنزلية، والتقييمات الأسبوعية بنماذجها الثلاثة (أ، ب، ج) وتدريبات الشهر الأول، مع الفصل التام والربط المنهجي بالوحدة والدرس ونواتج التعلم ومستويات بلوم المعرفية والصعوبة وتدقيق مفاتيح الإجابات وتوثيق التقاطعات المشتركة بين الوحدات.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => window.print()}
              className="px-3 py-2 bg-[#F9F7F2] hover:bg-[#EFECE6] border border-[#1D1D1B] text-xs font-bold text-[#1D1D1B] flex items-center gap-1.5 transition cursor-pointer"
              title="طباعة بنك الأداءات والتقييمات"
            >
              <Printer className="w-3.5 h-3.5 text-[#8A1F1D]" />
              <span>طباعة المستند</span>
            </button>
          </div>
        </div>

        {/* Global Filter Indicator (if active) */}
        {(globalUnitId || globalLessonId) && (
          <div className="bg-[#FFF9F2] border border-[#C4A484] p-3 mb-4 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-[#8A1F1D] font-bold">
              <Sparkles className="w-4 h-4" />
              <span>
                مرشح المنهج مفعل حالياً: {selectedUnit?.titleAr || globalUnitId} {selectedLesson ? `• ${selectedLesson.titleAr}` : globalLessonId ? `• (${globalLessonId})` : ''}
              </span>
            </div>
            <button
              onClick={clearGlobalFilters}
              className="text-xs text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-300 font-bold px-2.5 py-1 flex items-center gap-1 transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>إلغاء الفلتر العام</span>
            </button>
          </div>
        )}

        {/* Top Distinction Tabs: الفصل التام بين الأداء والتقييم */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setActiveTypeTab('all')}
            className={`p-3.5 border-2 text-right transition flex items-center justify-between cursor-pointer ${
              activeTypeTab === 'all'
                ? 'bg-[#1D1D1B] text-white border-[#1D1D1B]'
                : 'bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/20 hover:border-[#1D1D1B]'
            }`}
          >
            <div>
              <div className="text-xs font-bold opacity-80">عرض كافة المحتويات</div>
              <div className="text-base font-extrabold mt-0.5">الجميع ({totalCount} مفرداً)</div>
            </div>
            <Layers className={`w-5 h-5 ${activeTypeTab === 'all' ? 'text-amber-300' : 'text-[#8A1F1D]'}`} />
          </button>

          <button
            onClick={() => setActiveTypeTab('performance')}
            className={`p-3.5 border-2 text-right transition flex items-center justify-between cursor-pointer ${
              activeTypeTab === 'performance'
                ? 'bg-[#164E63] text-white border-[#164E63]'
                : 'bg-[#F0FDFA] text-[#0F766E] border-[#0F766E]/30 hover:border-[#0F766E]'
            }`}
          >
            <div>
              <div className="text-xs font-bold opacity-90">قسم الأداءات الصفية والمنزلية</div>
              <div className="text-base font-extrabold mt-0.5">الأداءات والأنشطة ({performanceCount})</div>
            </div>
            <BookOpen className="w-5 h-5 text-cyan-300" />
          </button>

          <button
            onClick={() => setActiveTypeTab('evaluation')}
            className={`p-3.5 border-2 text-right transition flex items-center justify-between cursor-pointer ${
              activeTypeTab === 'evaluation'
                ? 'bg-[#8A1F1D] text-white border-[#8A1F1D]'
                : 'bg-[#FFF5F5] text-[#8A1F1D] border-[#8A1F1D]/30 hover:border-[#8A1F1D]'
            }`}
          >
            <div>
              <div className="text-xs font-bold opacity-90">قسم التقييمات الأسبوعية والاختبارات</div>
              <div className="text-base font-extrabold mt-0.5">التقييمات المعتمدة ({evaluationCount})</div>
            </div>
            <Award className="w-5 h-5 text-rose-200" />
          </button>
        </div>
      </div>

      {/* Control & Search Bar */}
      <div className="bg-[#FFFFFF] border border-[#1D1D1B]/20 p-4 space-y-4 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-3 relative">
            <Search className="w-4 h-4 text-[#1D1D1B]/40 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ابحث في نص السؤال، المفهوم، أو المطلوب..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#F9F7F2] border border-[#1D1D1B]/25 py-2 pr-9 pl-3 text-xs font-medium focus:outline-hidden focus:border-[#8A1F1D]"
            />
          </div>

          {/* Unit Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedUnitFilter}
              onChange={e => {
                setSelectedUnitFilter(e.target.value);
                setSelectedLessonFilter('all');
              }}
              className="w-full bg-[#F9F7F2] border border-[#1D1D1B]/25 py-2 px-2 text-xs font-medium focus:outline-hidden focus:border-[#8A1F1D]"
            >
              <option value="all">الوحدات (الكل - {totalCount} سؤال معتمد)</option>
              <option value="unit-1">الوحدة 1: ماهية ومبادئ المحاسبة (ص 3-18)</option>
              <option value="unit-2">الوحدة 2: القيد المزدوج والأستاذ (ص 19-37)</option>
              <option value="unit-3">الوحدة 3: دفاتر اليومية المساعدة (ص 39-51)</option>
              <option value="unit-4">الوحدة 4: ميزان المراجعة وتصحيح الأخطاء (ص 52-71)</option>
              <option value="unit-5">الوحدة 5: القوائم المالية – المنشأة الفردية (ص 72-84)</option>
            </select>
          </div>

          {/* Lesson Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedLessonFilter}
              onChange={e => setSelectedLessonFilter(e.target.value)}
              className="w-full bg-[#F9F7F2] border border-[#1D1D1B]/25 py-2 px-3 text-xs font-medium focus:outline-hidden focus:border-[#8A1F1D]"
            >
              <option value="all">كافة الدروس (27 درساً معتمداً)</option>
              {(selectedUnitFilter === 'all' || selectedUnitFilter === 'unit-1') && (
                <optgroup label="الوحدة الأولى (ص 3-18)">
                  <option value="U01-L01">الدرس 1: ماهية المحاسبة وأطرافها ومبادئها</option>
                  <option value="U01-L02">الدرس 2: المعادلة المحاسبية والمركز المالي</option>
                  <option value="U01-L03">الدرس 3: القيد المزدوج وحسابات الأستاذ T</option>
                  <option value="U01-L04">الدرس 4: ميزان المراجعة والأخطاء وحساب التسوية</option>
                  <option value="U01-L05">الدرس 5: الدورة المحاسبية الكاملة والقوائم</option>
                </optgroup>
              )}
              {(selectedUnitFilter === 'all' || selectedUnitFilter === 'unit-2') && (
                <optgroup label="الوحدة الثانية (ص 19-37)">
                  <option value="U02-L01">الدرس 1: قاعدة القيد المزدوج وتحليل الأثر المالي</option>
                  <option value="U02-L02">الدرس 2: منطق المدين والدائن وطبيعة الحسابات</option>
                  <option value="U02-L03">الدرس 3: حسابات الأستاذ والترحيل والترصيد</option>
                  <option value="U02-L04">الدرس 4: ميزان المراجعة واكتشاف الأخطاء</option>
                  <option value="U02-L05">الدرس 5: التطبيق المتكامل والتحليل المتقدم (JRE)</option>
                </optgroup>
              )}
              {(selectedUnitFilter === 'all' || selectedUnitFilter === 'unit-3') && (
                <optgroup label="الوحدة الثالثة: دفاتر اليومية المساعدة (ص 39-51)">
                  <option value="U03-L01">الدرس 1: تصنيف المعاملات وتحديد دفتر القيد الأولي</option>
                  <option value="U03-L02">الدرس 2: تطبيق تسجيل وترحيل المبيعات والمشتريات الآجلة</option>
                  <option value="U03-L03">الدرس 3: المردودات والخصم التجاري والنقدي</option>
                  <option value="U03-L04">الدرس 4: دفتر النقدية والمصروفات النثرية</option>
                  <option value="U03-L05">الدرس 5: التطبيق المتكامل للدفاتر المساعدة</option>
                  <option value="U03-L06">الدرس 6: تحليل الرقابة الداخلية وصياغة حكم مهني مدعوم بالأدلة</option>
                </optgroup>
              )}
              {(selectedUnitFilter === 'all' || selectedUnitFilter === 'unit-4') && (
                <optgroup label="الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء (ص 52-71)">
                  <option value="U04-L01">الدرس 1: إعداد ميزان المراجعة وأهدافه وحدوده الرقابية</option>
                  <option value="U04-L02">الدرس 2: الأخطاء المؤثرة على توازن ميزان المراجعة</option>
                  <option value="U04-L03">الدرس 3: الأخطاء غير المؤثرة على توازن ميزان المراجعة</option>
                  <option value="U04-L04">الدرس 4: الحساب المعلق ومعالجة الفروق المؤقتة</option>
                  <option value="U04-L05">الدرس 5: قيود التصحيح والتطبيق المتكامل وJRE</option>
                </optgroup>
              )}
              {(selectedUnitFilter === 'all' || selectedUnitFilter === 'unit-5') && (
                <optgroup label="الوحدة الخامسة: القوائم المالية – المنشأة الفردية (ص 72-84)">
                  <option value="U05-L01">الدرس 1: حساب المتاجرة وتكلفة البضاعة المباعة</option>
                  <option value="U05-L02">الدرس 2: حساب الأرباح والخسائر وصافي الربح</option>
                  <option value="U05-L03">الدرس 3: تسويات نهاية الفترة</option>
                  <option value="U05-L04">الدرس 4: قائمة المركز المالي</option>
                  <option value="U05-L05">الدرس 5: التطبيق المتكامل والتحليل المالي</option>
                  <option value="U05-L06">الدرس 6: JRE والاستدلال المالي</option>
                </optgroup>
              )}
            </select>
          </div>

          {/* Bloom Level */}
          <div className="md:col-span-2">
            <select
              value={selectedBloom}
              onChange={e => setSelectedBloom(e.target.value)}
              className="w-full bg-[#F9F7F2] border border-[#1D1D1B]/25 py-2 px-2 text-xs font-medium focus:outline-hidden focus:border-[#8A1F1D]"
            >
              <option value="all">مستوى بلوم (الكل)</option>
              <option value="تذكر">تذكر (Remember)</option>
              <option value="فهم">فهم (Understand)</option>
              <option value="تطبيق">تطبيق (Apply)</option>
              <option value="تحليل">تحليل (Analyze)</option>
              <option value="تقويم">تقويم (Evaluate)</option>
              <option value="ابتكار">ابتكار (Create)</option>
            </select>
          </div>

          {/* Difficulty */}
          <div className="md:col-span-1">
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="w-full bg-[#F9F7F2] border border-[#1D1D1B]/25 py-2 px-1 text-xs font-medium focus:outline-hidden focus:border-[#8A1F1D]"
            >
              <option value="all">الصعوبة</option>
              <option value="أساسي">أساسي</option>
              <option value="متوسط">متوسط</option>
              <option value="متقدم">متقدم</option>
            </select>
          </div>

          {/* Text Match Filter */}
          <div className="md:col-span-1">
            <select
              value={selectedTextMatch}
              onChange={e => setSelectedTextMatch(e.target.value)}
              className="w-full bg-[#F9F7F2] border border-[#1D1D1B]/25 py-2 px-1 text-xs font-medium focus:outline-hidden focus:border-[#8A1F1D]"
              title="تصفية حسب درجة مطابقة النص"
            >
              <option value="all">المطابقة</option>
              <option value="HIGH">عالية (HIGH)</option>
              <option value="PARTIAL">جزئية (PARTIAL)</option>
              <option value="WEAK">مشتقة (WEAK)</option>
            </select>
          </div>

          {/* Week Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedWeek}
              onChange={e => setSelectedWeek(e.target.value)}
              className="w-full bg-[#F9F7F2] border border-[#1D1D1B]/25 py-2 px-2 text-xs font-medium focus:outline-hidden focus:border-[#8A1F1D]"
              title="تصفية حسب الأسبوع الدراسي"
            >
              <option value="all">كافة الأسابيع المدرسية</option>
              {availableWeeks.map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Counter & Bulk Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#1D1D1B]/10 text-xs">
          <div className="flex flex-wrap items-center gap-3 font-bold">
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#8A1F1D]" />
              <span>عدد الأسئلة المعروضة:</span>
              <span className="bg-[#8A1F1D] text-white px-2 py-0.5 font-mono font-bold">
                {filteredItems.length} سؤالاً مطابقاً
              </span>
            </div>

            {/* Cross-Unit Toggle Button */}
            <button
              onClick={() => setShowOnlyCrossUnit(!showOnlyCrossUnit)}
              className={`px-2.5 py-1 border text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                showOnlyCrossUnit
                  ? 'bg-[#8A1F1D] text-white border-[#8A1F1D]'
                  : 'bg-[#FFF9F2] text-[#8A1F1D] border-[#C4A484] hover:bg-[#F9F7F2]'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>التقاطعات المشتركة بين الوحدات (15 زوجاً)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="px-2.5 py-1 bg-[#F9F7F2] hover:bg-[#EFECE6] border border-[#1D1D1B]/20 font-bold text-[#1D1D1B] flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3 h-3 text-[#8A1F1D]" />
              <span>توسيع كافة الحلول</span>
            </button>
            <button
              onClick={collapseAll}
              className="px-2.5 py-1 bg-[#F9F7F2] hover:bg-[#EFECE6] border border-[#1D1D1B]/20 font-bold text-[#1D1D1B] flex items-center gap-1 cursor-pointer"
            >
              <EyeOff className="w-3 h-3 text-[#1D1D1B]/60" />
              <span>طي كافة الحلول</span>
            </button>
          </div>
        </div>
      </div>

      {/* Question Cards List */}
      {filteredItems.length === 0 ? (
        <div className="bg-[#FFFFFF] border-2 border-dashed border-[#1D1D1B]/30 p-12 text-center space-y-3">
          <HelpCircle className="w-10 h-10 text-[#1D1D1B]/40 mx-auto" />
          <h3 className="text-base font-bold text-[#1D1D1B]">لا توجد أسئلة مطابقة لمعايير البحث الحالية</h3>
          <p className="text-xs text-[#1D1D1B]/70 max-w-md mx-auto">
            يرجى ضبط معايير التصفية أو إلغاء تحديد الأسبوع ومستوى الصعوبة لإظهار الأسئلة المعتمدة.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredItems.map((item, index) => {
            const isExpanded = !!expandedIds[item.question_id];
            const isPerformance = item.source_type === 'أدائي';
            const displayId = item.canonical_id || item.question_id;

            return (
              <div
                key={item.question_id}
                id={`assessment-${displayId}`}
                className="bg-[#FFFFFF] border-2 border-[#1D1D1B] shadow-2xs hover:shadow-sm transition"
              >
                {/* Card Header */}
                <div className="p-4 sm:p-5 border-b border-[#1D1D1B]/15 bg-[#F9F7F2]/60">
                  <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
                    {/* Source badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-extrabold bg-[#1D1D1B] text-white px-2 py-0.5">
                        #{index + 1} • {displayId}
                      </span>

                      {item.legacy_id && item.legacy_id !== displayId && (
                        <span className="font-mono text-[11px] font-bold bg-[#EDE8DF] text-[#555] border border-[#1D1D1B]/20 px-1.5 py-0.5" title="المعرف التوثيقي السابق">
                          سابقاً: {item.legacy_id}
                        </span>
                      )}

                      <span className={`text-xs font-extrabold px-2.5 py-0.5 border ${
                        isPerformance
                          ? 'bg-[#0F766E] text-white border-[#0F766E]'
                          : 'bg-[#8A1F1D] text-white border-[#8A1F1D]'
                      }`}>
                        {isPerformance ? 'أداء صفي / منزلي' : 'تقييم أسبوعي'}
                      </span>

                      <span className="text-xs font-bold bg-[#FFFFFF] text-[#1D1D1B] border border-[#1D1D1B]/30 px-2 py-0.5">
                        كتاب الوزارة: ص {item.source_page}
                      </span>

                      {/* Text match status badge */}
                      {item.text_match_status && (
                        <span className={`text-[11px] font-bold px-2 py-0.5 border ${
                          item.text_match_status === 'HIGH'
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : item.text_match_status === 'PARTIAL'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-purple-100 text-purple-900 border-purple-300'
                        }`}>
                          {item.text_match_status === 'HIGH' ? 'مطابقة عالية' : item.text_match_status === 'PARTIAL' ? 'مطابقة جزئية' : 'مطابقة مشتقة'}
                        </span>
                      )}

                      {item.week && item.week !== 'غير مذكور صراحة' && (
                        <span className="text-xs font-bold bg-[#FFFFFF] text-[#8A1F1D] border border-[#8A1F1D]/30 px-2 py-0.5 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{item.week}</span>
                        </span>
                      )}
                    </div>

                    {/* Taxonomy badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 border ${
                        item.difficulty === 'أساسي'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : item.difficulty === 'متوسط'
                          ? 'bg-amber-50 text-amber-800 border-amber-300'
                          : 'bg-rose-50 text-rose-800 border-rose-300'
                      }`}>
                        صعوبة: {item.difficulty} {item.canonical_difficulty ? `(${item.canonical_difficulty})` : ''}
                      </span>

                      <span className="text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200 px-2 py-0.5">
                        بلوم: {item.bloom} {item.canonical_bloom ? `(${item.canonical_bloom})` : ''}
                      </span>
                    </div>
                  </div>

                  {/* Cross-unit repetition banner if present */}
                  {item.cross_unit_repetition && (
                    <div className="bg-amber-50 border border-amber-300 text-amber-950 p-2.5 text-xs mb-2 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold">تقاطع وتكرار منهجي (نسبة التشابه: {item.cross_unit_repetition.similarity}): </span>
                        <span>مرتبط بـ <strong className="font-mono">{item.cross_unit_repetition.related_qid}</strong> — {item.cross_unit_repetition.note}</span>
                      </div>
                    </div>
                  )}

                  {/* Answer Key Audit banner if present (e.g. U05-Q017) */}
                  {item.answer_key_audit && (
                    <div className="bg-emerald-50 border border-emerald-400 text-emerald-950 p-2.5 text-xs font-bold mb-2 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-emerald-900">تدقيق مفتاح الإجابة النهائي: </span>
                        <span>{item.answer_key_audit}</span>
                      </div>
                    </div>
                  )}

                  {/* Unit & Lesson Breadcrumb */}
                  <div className="text-xs text-[#1D1D1B]/70 flex flex-wrap items-center gap-1.5 pt-1">
                    <Bookmark className="w-3.5 h-3.5 text-[#C4A484]" />
                    <span className="font-bold text-[#1D1D1B]">{item.official_unit}</span>
                    <span>←</span>
                    <span className="text-[#1D1D1B]/80 font-medium">{item.official_lesson}</span>
                    <span>•</span>
                    <span className="text-[#8A1F1D] font-bold">المفهوم: {item.official_concept}</span>
                  </div>
                </div>

                {/* Card Body: Question Text & Content */}
                <div className="p-4 sm:p-6 space-y-4">
                  {/* The Question Statement */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-[#8A1F1D] flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>نص السؤال / الموقف المحاسبي:</span>
                    </div>
                    <div className="text-sm md:text-base font-bold text-[#1D1D1B] leading-relaxed whitespace-pre-line bg-[#F9F7F2]/40 p-4 border-r-4 border-[#8A1F1D]">
                      {item.question_text}
                    </div>
                  </div>

                  {/* Required statement */}
                  {item.required && (
                    <div className="bg-[#FFFDF7] border border-[#C4A484]/40 p-3 text-xs space-y-1">
                      <span className="font-bold text-[#8A1F1D]">المطلوب التعليمي:</span>
                      <p className="text-[#1D1D1B]/90 font-medium leading-normal">{item.required}</p>
                    </div>
                  )}

                  {/* MCQ Options (if question is multiple choice) */}
                  {item.options && item.options.length > 0 && (
                    <div className="space-y-2.5 pt-2">
                      <div className="text-xs font-bold text-[#1D1D1B]">اختر الإجابة الصحيحة لاختبار معلوماتك:</div>
                      <div className="grid grid-cols-1 gap-2">
                        {item.options.map(opt => {
                          const userSelected = userSelectedOptions[item.question_id] === opt.label;
                          const isShowingAnswer = isExpanded;

                          let btnClasses = 'bg-[#FFFFFF] border-[#1D1D1B]/20 text-[#1D1D1B] hover:bg-[#F9F7F2]';

                          if (userSelected) {
                            btnClasses = opt.isCorrect
                              ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                              : 'bg-rose-50 border-rose-600 text-rose-950 font-bold';
                          } else if (isShowingAnswer && opt.isCorrect) {
                            btnClasses = 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold';
                          }

                          return (
                            <button
                              key={opt.label}
                              onClick={() => {
                                setUserSelectedOptions(prev => ({
                                  ...prev,
                                  [item.question_id]: opt.label
                                }));
                              }}
                              className={`w-full text-right p-3 border text-xs sm:text-sm transition flex items-start gap-2.5 cursor-pointer ${btnClasses}`}
                            >
                              <span className="w-5 h-5 flex items-center justify-center border font-bold shrink-0 bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/30">
                                {opt.label}
                              </span>
                              <span className="leading-relaxed grow">{opt.text}</span>
                              {userSelected && opt.isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Pedagogical Metadata Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-[#F9F7F2] p-3 border border-[#1D1D1B]/10">
                    <div>
                      <span className="text-[#1D1D1B]/60 font-bold">ناتج التعلم المستهدف: </span>
                      <span className="text-[#1D1D1B] font-medium">{item.LO}</span>
                    </div>
                    <div>
                      <span className="text-[#1D1D1B]/60 font-bold">المهارة المحاسبية: </span>
                      <span className="text-[#8A1F1D] font-mono font-bold">{item.skill}</span>
                    </div>
                  </div>

                  {/* Toggle Solve & Explanation Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => toggleExpand(item.question_id)}
                      className={`w-full py-2.5 px-4 text-xs sm:text-sm font-bold flex items-center justify-between border-2 transition cursor-pointer ${
                        isExpanded
                          ? 'bg-[#1D1D1B] text-white border-[#1D1D1B]'
                          : 'bg-[#FFFFFF] text-[#8A1F1D] border-[#8A1F1D] hover:bg-[#8A1F1D] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        <span>{isExpanded ? 'إخفاء نموذج الإجابة ومسار الحل المنهجي' : 'عرض نموذج الإجابة المعتمد وخطوات الحل والتأصيل'}</span>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Expanded Solution Section */}
                  {isExpanded && (
                    <div className="space-y-4 pt-4 border-t-2 border-[#1D1D1B]/15 animate-in fade-in duration-200">
                      {/* Official Answer */}
                      <div className="space-y-1.5">
                        <div className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          <span>نموذج الإجابة المعتمد:</span>
                        </div>
                        <div className="bg-emerald-50/70 border border-emerald-300 p-4 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed whitespace-pre-line">
                          {item.answer}
                        </div>
                      </div>

                      {/* Step-by-Step Solution Path */}
                      {item.solution_path && item.solution_path.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-xs font-bold text-[#1D1D1B] flex items-center gap-1">
                            <ArrowRight className="w-3.5 h-3.5 text-[#8A1F1D]" />
                            <span>مسار الحل والتفكير خطوة بخطوة:</span>
                          </div>
                          <div className="bg-[#FFFFFF] border border-[#1D1D1B]/20 p-3.5 space-y-1.5 text-xs text-[#1D1D1B]">
                            {item.solution_path.map((step, sIdx) => (
                              <div key={sIdx} className="leading-relaxed font-medium">
                                {step}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Accounting Reasoning / Justification */}
                      {item.reasoning && (
                        <div className="space-y-1.5">
                          <div className="text-xs font-bold text-[#8A1F1D] flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>التأصيل المحاسبي والتعليل المنهجي:</span>
                          </div>
                          <div className="bg-[#FFFDF7] border-l-4 border-l-[#8A1F1D] border border-[#C4A484]/30 p-3 text-xs text-[#1D1D1B]/90 leading-relaxed font-medium">
                            {item.reasoning}
                          </div>
                        </div>
                      )}

                      {/* Calculation Audit if present */}
                      {item.calculation_audit && (
                        <div className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-3 text-xs flex flex-wrap items-center justify-between gap-2 font-mono">
                          <span className="text-[#1D1D1B]/70 font-sans font-bold">التدقيق الحسابي للمعادلة:</span>
                          <span className="bg-[#FFFFFF] px-2 py-0.5 border border-[#1D1D1B]/20 font-bold text-[#8A1F1D]">
                            {item.calculation_audit.formula} = {item.calculation_audit.result}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
