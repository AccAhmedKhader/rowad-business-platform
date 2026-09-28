import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  BookMarked, 
  FileCheck2, 
  HelpCircle, 
  GraduationCap, 
  Download, 
  Printer, 
  Eye, 
  Layers, 
  Sparkles, 
  ChevronLeft, 
  SlidersHorizontal,
  BookmarkCheck,
  CheckCircle2,
  Type,
  Sun,
  Moon,
  Coffee,
  Columns,
  Square,
  Maximize2,
  Minimize2,
  Award,
  Check,
  Compass
} from 'lucide-react';
import { ALL_UNITS, getUnitByNumber } from '../data/unitsData';
import { TEXTBOOK_QUESTIONS_REGISTRY } from '../data/textbookQuestions/registry';
import { getUnitAssessmentData } from '../data/unitAssessments/registry';
import { ALL_BANK_QUESTIONS } from '../data/questionBankData';
import { TEACHER_GUIDE_DATA } from '../data/teacherGuideData';
import { UNIT1_LESSON1_TEACHER_STATIONS_GUIDE, getTeacherStationsGuideForLesson } from '../data/teacherStationsGuide';
import { downloadAsWordDocument, printDocumentAsPdf, ExportDocumentOptions } from '../utils/exportEngine';
import { PresentationScale } from './PresentationToolbar';
import { UnitLesson, UnitData } from '../types';

type BookKey = 'student_book' | 'textbook_questions' | 'assessments' | 'question_bank' | 'teacher_guide' | 'comprehensive_unit';
type BookFont = 'alexandria' | 'cairo' | 'tajawal' | 'amiri' | 'readex';
type ReaderTheme = 'classic' | 'sepia' | 'dark';
type ReaderFontSize = 'sm' | 'base' | 'lg' | 'xl';
type ColumnLayout = 'single' | 'dual';

interface LibraryViewProps {
  selectedUnitNumber: number;
  setSelectedUnitNumber: (num: number) => void;
  isAutoFillPage: boolean;
  onToggleAutoFillPage: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  presentationScale: PresentationScale;
  onChangeScale: (scale: PresentationScale) => void;
  onNavigateToTab?: (tab: any) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  selectedUnitNumber,
  setSelectedUnitNumber,
  isAutoFillPage,
  onToggleAutoFillPage,
  isFullscreen,
  onToggleFullscreen,
  presentationScale,
  onChangeScale,
  onNavigateToTab,
}) => {
  // Selected Book state
  const [selectedBook, setSelectedBook] = useState<BookKey>('question_bank');

  // Export settings state
  const [scope, setScope] = useState<'current_unit' | 'all_units'>('current_unit');
  const [includeAnswers, setIncludeAnswers] = useState<boolean>(true);
  const [schoolName, setSchoolName] = useState<string>('مدرسة : ................................. الثانوية');
  const [teacherName, setTeacherName] = useState<string>('الأستاذ / أحمد خضر');
  const [studentName, setStudentName] = useState<string>('');
  const [academicYear, setAcademicYear] = useState<string>('2026 / 2027');

  // Interactive Reader State (القارئ المكتبي المتطور للكتاب الخارجي)
  const [bookFont, setBookFont] = useState<BookFont>('alexandria');
  const [readerFontSize, setReaderFontSize] = useState<ReaderFontSize>('base');
  const [readerTheme, setReaderTheme] = useState<ReaderTheme>('classic');
  const [columnsMode, setColumnsMode] = useState<ColumnLayout>('single');
  const [isReaderFullscreen, setIsReaderFullscreen] = useState<boolean>(false);

  // Question Bank parts filter state
  const [selectedParts, setSelectedParts] = useState<{
    mcq: boolean;
    true_false: boolean;
    short_essay: boolean;
    calculation: boolean;
    case_study: boolean;
    jre: boolean;
  }>({
    mcq: true,
    true_false: true,
    short_essay: true,
    calculation: true,
    case_study: true,
    jre: true
  });

  // Active current unit
  const currentUnit = getUnitByNumber(selectedUnitNumber) || ALL_UNITS[0];

  // Metadata for the master books
  const BOOKS_METADATA = [
    {
      id: 'comprehensive_unit' as BookKey,
      title: 'الوحدة الشاملة المتكاملة (شرح + كتاب الوزارة + تقييمات + بنك الأسئلة)',
      subtitle: 'ملزمة الوحدة الشاملة الجاهزة للطباعة والتصدير بكافة مشتملاتها المنهجية والأكاديمية',
      description: 'إصدار شامل يجمع كافة مشتملات الوحدة في وثيقة واحدة منسقة: الشرح المفاهيمي المتكامل والمسار الاستكشافي، وتدريبات كتاب الوزارة بالحلول النموذجية، والأداءات الأسبوعية (A, B, C)، وبنك الأسئلة بستة أجزاء.',
      badge: 'الوحدة الشاملة الكل في واحد',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      icon: Layers,
      color: 'from-emerald-600 via-teal-700 to-indigo-800',
      pagesCount: 'جميع مشتملات الوحدة في ملف واحد جاهز للطباعة',
      targetAudience: 'المعلم والطالب للمذاكرة والطباعة الشاملة',
      partsSummary: 'الشرح والمحطات • كتاب المدرسة • التقييمات (A, B, C) • بنك الأسئلة بالكامل'
    },
    {
      id: 'student_book' as BookKey,
      title: 'كتاب الطالب التفاعلي والشرح المفاهيمي',
      subtitle: 'سلسلة رواد الأعمال — الإصدار المتمرس والمطوّر 2027',
      description: 'شرح مفاهيمي تحليلي شامل لجميع الوحدات العشر، مدعوم بأدوات التحليل الإداري الواقعي، وتصويب فخاخ الاختبارات والتقييمات (Exam Traps).',
      badge: 'الشرح المعياري',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: BookOpen,
      color: 'from-blue-600 to-indigo-700',
      pagesCount: '10 وحدات كاملة • 40 درساً تحليلياً',
      targetAudience: 'الطلاب والمعلمون',
      partsSummary: 'المفاهيم الجوهرية • أدوات التحليل • فخاخ الاختبارات • تقويم سريع'
    },
    {
      id: 'textbook_questions' as BookKey,
      title: 'كتاب أسئلة وتدريبات كتاب المدرسة',
      subtitle: 'الحلول النموذجية والسلالم المنهجية المعتمدة لكتاب الوزارة',
      description: 'حصر رسمي دقيق لكافة تدريبات كتاب الوزارة صفحة بصفحة مع تبريرات منهجية واستبعاد المشتتات.',
      badge: 'مطابق للوزارة',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: BookMarked,
      color: 'from-emerald-600 to-teal-700',
      pagesCount: '10 وحدات • تغطية شاملة لكتاب المدرسة',
      targetAudience: 'المعلم والطالب للواجبات',
      partsSummary: 'أسئلة نهاية الوحدات والدروس • توثيق صفحات الكتاب المدرسي'
    },
    {
      id: 'assessments' as BookKey,
      title: 'كتاب الأداءات والتقييمات الأسبوعية',
      subtitle: 'الدفتر الرسمي للأداءات الصفية والمنزلية ونماذج التقييم (A, B, C)',
      description: 'مذكرات التقييم الوزاري الأسبوعي مقسمة لفترات دراسية، متضمنة الأنشطة الصفية والواجبات ونماذج التقييم الأسبوعية الثلاثة.',
      badge: 'التقييمات الوزارية',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: FileCheck2,
      color: 'from-purple-600 to-pink-700',
      pagesCount: '32 أسبوعاً تقييمياً للوحدات العشر',
      targetAudience: 'المعلم لأعمال السنة وسجلات التقييم',
      partsSummary: 'فترة 1 (نشاط صفي) • فترة 2 (تطبيق منزلي) • فترة 3 (نماذج A, B, C)'
    },
    {
      id: 'question_bank' as BookKey,
      title: 'كتاب بنك الأسئلة المعياري (الكتاب الخارجي الشامل)',
      subtitle: 'الكتاب التدريبي الأقوى المصنف طبقاً لمستويات بلوم المعرفية',
      description: 'أكبر بنك أسئلة متدرج طبقاً لمستويات بلوم المعرفية بأجزائه الستة: الاختيار من متعدد، الصواب والخطأ بالتعليل، المقال، المسائل الحسابية، دراسات الحالة، ومختبر سؤال استدلال JRE الـ 20 درجة.',
      badge: 'الكتاب التدريبي الأقوى',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-300',
      icon: HelpCircle,
      color: 'from-amber-600 to-orange-700',
      pagesCount: 'أكثر من 1500 سؤال موزعة على الوحدات العشر',
      targetAudience: 'للتدريب النهائي والمراجعات الشاملة',
      partsSummary: '6 أجزاء معيارية (MCQ • صح وخطأ • مقال • حسابي • حالات • JRE 20 درجة)'
    },
    {
      id: 'teacher_guide' as BookKey,
      title: 'دليل المعلم والتخطيط البيداغوجي',
      subtitle: 'الخطة السنوية الشاملة ومصفوفة التقييم وبنك معالجة المفاهيم المغلوطة',
      description: 'دليل تربوي استراتيجي للمعلم يشتمل على خطة التوزيع السنوي على مدار 32 أسبوعاً، ومصفوفة توزيع درجات البكالوريا، وروبرك تصحيح JRE، وبنك تصويب المفاهيم الشائعة.',
      badge: 'دليل المعلم الشامل',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: GraduationCap,
      color: 'from-rose-600 to-red-700',
      pagesCount: 'دليل كامل للمنهج 2026 / 2027',
      targetAudience: 'السادة المعلمون والموجهون',
      partsSummary: 'خطة تدريسية شاملة 32 أسبوعاً للوحدات العشر • بنك معالجة المفاهيم المغلوطة لجميع الوحدات'
    }
  ];

  // Helper to render the complete 17 stations divided into the 5 stages in an integrated, unified flow
  const renderLessonStationsSection = (lesson: UnitLesson, unit: UnitData): string => {
    const st = lesson.stations || {};
    const firstConcept = lesson.concepts?.[0];
    const bmBox = firstConcept?.businessManagerBox || st.thinkAsManager;
    const jrePrompt = st.jreQuestion?.prompt || unit.jreQuestion?.prompt || 'قيّم الموقف الإداري وصُغ حكماً مبرراً وفق الروبرك الوزاري.';
    const jreAnswer = unit.jreQuestion?.modelAnswer;

    return `
      <div class="integrated-stations-stream" style="margin-top: 8pt; margin-bottom: 12pt; width: 100%; box-sizing: border-box;">

        <!-- 🧭 المرحلة الأولى -->
        <div style="margin-bottom: 12pt;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-right: 4px solid #1e3a8a; border-radius: 6px; padding: 5pt 10pt; display: flex; align-items: center; justify-content: space-between; margin-bottom: 6pt;">
            <span style="font-weight: 800; color: #1e3a8a; font-size: 11pt;">🧭 المرحلة الأولى: اليقظة الريادية والاستكشاف السياقي</span>
            <span style="font-size: 9pt; color: #64748b; font-weight: 600;">(لاحظ • تساءل) [بلوم: تذكر وفهم]</span>
          </div>
          <div style="font-size: 9.5pt; color: #475569; margin: 0 4pt 6pt 4pt; line-height: 1.6;"><strong>الهدف التربوي:</strong> تحفيز الملاحظة عبر ربط عقل الطالب بظواهر ومواقف حقيقية من بيئة الأعمال المصرية.</div>

          <!-- المحطة 1 -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-right: 3px solid #1e3a8a; border-radius: 6px; padding: 8pt 12pt; margin-bottom: 6pt; box-sizing: border-box;">
            <strong style="color: #1e3a8a; font-size: 10.5pt;">🎯 المحطة 1: سؤال توجيهي واستثارة فكرية:</strong>
            <div style="font-weight: bold; color: #0f172a; margin-top: 3pt; font-size: 11pt; line-height: 1.65;">« ${st.guidingQuestion || lesson.guidingQuestion || 'ما الأساس العلمي والتشغيلي لاتخاذ هذا القرار في بيئة الأعمال الحديثة؟'} »</div>
            <div style="font-size: 9.5pt; color: #475569; margin-top: 3pt; line-height: 1.6; background: #f8fafc; padding: 4pt 8pt; border-radius: 4pt; border: 1px solid #f1f5f9;"><strong>مفتاح الفهم التنافسي:</strong> ${st.strategicKey || 'يرتكز الدرس على ربط المفهوم الإداري بالظواهر الاقتصادية المعاشة وتحليل سلسلة الأثر والفرصة البديلة.'}</div>
          </div>

          <!-- المحطة 2 -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-right: 3px solid #0284c7; border-radius: 6px; padding: 8pt 12pt; box-sizing: border-box;">
            <strong style="color: #0369a1; font-size: 10.5pt;">🎬 المحطة 2: مقدمة وسيناريو دراسة الحالة:</strong>
            <div style="color: #334155; margin-top: 3pt; font-size: 10.5pt; line-height: 1.7;">${st.caseScenario?.scenario || st.introduction || lesson.priorContext || unit.caseStudy.story}</div>
            <div style="font-size: 9.5pt; color: #9a3412; margin-top: 4pt; background: #fffbeb; padding: 4pt 8pt; border-radius: 4pt; border: 1px solid #fef3c7; line-height: 1.6;"><strong>المعضلة التشغيلية في السوق:</strong> ${st.caseScenario?.dilemma || unit.caseStudy.analysis}</div>
          </div>
        </div>

        <!-- 🧠 المرحلة الثانية -->
        <div style="margin-bottom: 12pt;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-right: 4px solid #047857; border-radius: 6px; padding: 5pt 10pt; display: flex; align-items: center; justify-content: space-between; margin-bottom: 6pt;">
            <span style="font-weight: 800; color: #065f46; font-size: 11pt;">🧠 المرحلة الثانية: البناء المفاهيمي والهندسة المعرفية</span>
            <span style="font-size: 9pt; color: #64748b; font-weight: 600;">(استقصِ • فصّل) [بلوم: فهم وتطبيق]</span>
          </div>
          <div style="font-size: 9.5pt; color: #475569; margin: 0 4pt 6pt 4pt; line-height: 1.6;"><strong>الهدف التربوي:</strong> تفكيك الأطر العلمية وتأصيل المكون المعجمي والرياضي الصارم لمنظمات الأعمال.</div>

          <!-- المحطة 3 -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-right: 3px solid #059669; border-radius: 6px; padding: 8pt 12pt; margin-bottom: 6pt; box-sizing: border-box;">
            <strong style="color: #047857; font-size: 10.5pt;">📖 المحطة 3: تعلّم وتأصيل المتن المعرفي:</strong>
            <h4 style="margin: 3pt 0 2pt 0; color: #065f46; font-size: 11pt; font-weight: bold;">${st.learnTitle || firstConcept?.title || lesson.title}</h4>
            <p style="margin: 2pt 0; color: #334155; font-size: 10.5pt; line-height: 1.7;">${st.learnContent || firstConcept?.summary || 'الأطر الرسمية والقواعد المنهجية المعتمدة.'}</p>
            ${(st.learnPoints || firstConcept?.keyPoints || []).map(pt => `<div style="font-size: 9.5pt; color: #475569; margin-top: 2pt; line-height: 1.6;">• ${pt}</div>`).join('')}
          </div>

          <!-- المحطة 4 -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-right: 3px solid #0d9488; border-radius: 6px; padding: 8pt 12pt; margin-bottom: 6pt; box-sizing: border-box;">
            <strong style="color: #0f766e; font-size: 10.5pt;">🔍 المحطة 4: الاستكشاف وتحليل الأنماط التنافسية:</strong>
            <p style="margin: 3pt 0 0 0; color: #334155; font-size: 10.5pt; line-height: 1.7;">${st.competitivePatterns?.description || st.explore || 'استقصاء سلوك السوق وتحليل ديناميكيات المنافسة في السوق المصري والعلاقات بين متغيرات القرار.'}</p>
          </div>

          <!-- المحطة 5 -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-right: 3px solid #16a34a; border-radius: 6px; padding: 8pt 12pt; margin-bottom: 6pt; box-sizing: border-box;">
            <strong style="color: #15803d; font-size: 10.5pt;">💡 المحطة 5: مثال ونموذج استرشادي مبرر:</strong>
            <div style="font-weight: bold; color: #166534; margin-top: 3pt; font-size: 10.5pt;">${st.analyzedExample?.title || 'نموذج تطبيقي محلول من واقع السوق'}</div>
            <p style="margin: 2pt 0; color: #334155; font-size: 10.5pt; line-height: 1.7;">${st.analyzedExample?.scenario || unit.caseStudy.story}</p>
            <div style="background: #f0fdf4; padding: 4pt 8pt; border-radius: 4pt; font-size: 9.5pt; color: #14532d; margin-top: 4pt; border: 1px solid #dcfce7; line-height: 1.6;"><strong>التحليل والتبرير الإداري:</strong> ${st.analyzedExample?.analysis || unit.caseStudy.analysis}</div>
          </div>

          <!-- المحطة 6 -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-right: 3px solid #0284c7; border-radius: 6px; padding: 8pt 12pt; box-sizing: border-box;">
            <strong style="color: #0369a1; font-size: 10.5pt;">📐 المحطة 6: الشرح والعمليات الحسابية والتشغيلية:</strong>
            <p style="margin: 3pt 0 0 0; color: #334155; font-size: 10.5pt; line-height: 1.7;">${st.operationalCalculations?.description || st.explain || 'التركيز على منطق العمليات وإجراء الحسابات المالية (الربح والتكلفة والتعادل) وحل اختناقات التشغيل.'}</p>
          </div>
        </div>

        <!-- 💼 المرحلة الثالثة -->
        <div style="margin-bottom: 12pt;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-right: 4px solid #3b82f6; border-radius: 6px; padding: 5pt 10pt; display: flex; align-items: center; justify-content: space-between; margin-bottom: 6pt;">
            <span style="font-weight: 800; color: #1d4ed8; font-size: 11pt;">💼 المرحلة الثالثة: المحاكاة الاستراتيجية والممارسة التنفيذية</span>
            <span style="font-size: 9pt; color: #64748b; font-weight: 600;">(طبّق • وازن) [بلوم: تحليل وتقييم]</span>
          </div>
          <div style="font-size: 9.5pt; color: #475569; margin: 0 4pt 6pt 4pt; line-height: 1.6;"><strong>الهدف التربوي:</strong> التموضع في أدوار صناع القرار، والتحول من رصد البيانات إلى التخطيط والموازنة التنافسية.</div>

          <!-- المحطة 7 -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-right: 3px solid #2563eb; border-radius: 6px; padding: 8pt 12pt; margin-bottom: 6pt; box-sizing: border-box;">
            <strong style="color: #1d4ed8; font-size: 10.5pt;">🚀 المحطة 7: فكّر كرائد أعمال (The Innovator’s Vision):</strong>
            <p style="margin: 3pt 0 0 0; color: #334155; font-size: 10.5pt; line-height: 1.7;">${st.thinkAsEntrepreneur?.opportunity || st.thinkAsProfessional || 'اقتناص الفرص السوقية الناشئة، وبناء القيمة المضافة، وإدارة المخاطر بحس ابتكاري.'}</p>
          </div>

          <!-- المحطة 8 -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-right: 3px solid #4f46e5; border-radius: 6px; padding: 8pt 12pt; margin-bottom: 6pt; box-sizing: border-box;">
            <strong style="color: #4338ca; font-size: 10.5pt;">⚙️ المحطة 8: فكّر كمدير (The Executive Alignment):</strong>
            <div style="font-weight: bold; color: #312e81; font-size: 10.5pt; margin-top: 3pt;">${bmBox?.title || 'حوكمة الموارد وتنظيم تدفق المهام والرقابة'}</div>
            <p style="margin: 2pt 0; color: #334155; font-size: 10.5pt; line-height: 1.7;">${bmBox?.scenario || 'المعضلة القيادية في الموازنة بين الإيرادات والالتزام بالجودة.'}</p>
            <div style="background: #f8fafc; padding: 4pt 8pt; border-radius: 4pt; font-size: 9.5pt; color: #3730a3; border: 1px solid #e0e7ff; line-height: 1.6;"><strong>التوجيه الإداري:</strong> ${bmBox?.guidance || 'حوكمة الموارد وضبط الجودة لمنع الهدر والحفاظ على ثقة العملاء.'}</div>
          </div>

          <!-- المحطة 9 -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-right: 3px solid #059669; border-radius: 6px; padding: 8pt 12pt; margin-bottom: 6pt; box-sizing: border-box;">
            <strong style="color: #047857; font-size: 10.5pt;">🌱 المحطة 9: تطبيق حياتي واستدامة الأعمال:</strong>
            <p style="margin: 3pt 0 0 0; color: #334155; font-size: 10.5pt; line-height: 1.7;">${st.lifeApplication || 'روابط الدرس بممارسات المسؤولية الاجتماعية للشركات (CSR) والتنمية المستدامة والمواطنة المؤسسية.'}</p>
          </div>

          <!-- المحطة 10 -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-right: 3px solid #475569; border-radius: 6px; padding: 8pt 12pt; box-sizing: border-box;">
            <strong style="color: #334155; font-size: 10.5pt;">🕸️ المحطة 10: بنية المعرفة والهياكل الاستراتيجية:</strong>
            <p style="margin: 3pt 0 0 0; color: #334155; font-size: 10.5pt; line-height: 1.7;">${st.strategicFrameworks?.description || st.toolOrMetric?.description || 'الأطر الكلية (أبعاد PESTEL، مصفوفة SWOT، سلاسل القيمة) التي تربط المفهوم برؤية المنظمة.'}</p>
          </div>
        </div>

        <!-- 🧪 المرحلة الرابعة -->
        <div style="margin-bottom: 12pt;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-right: 4px solid #b91c1c; border-radius: 6px; padding: 5pt 10pt; display: flex; align-items: center; justify-content: space-between; margin-bottom: 6pt;">
            <span style="font-weight: 800; color: #991b1b; font-size: 11pt;">🧪 المرحلة الرابعة: ضبط النزاهة المعرفية وتصحيح المسار</span>
            <span style="font-size: 9pt; color: #64748b; font-weight: 600;">(استقصِ الأدلة • صحح الفخاخ) [بلوم: تحليل ونقد]</span>
          </div>
          <div style="font-size: 9.5pt; color: #475569; margin: 0 4pt 6pt 4pt; line-height: 1.6;"><strong>الهدف التربوي:</strong> فرز البيانات ومراجعة الفجوات الإدارية الشائعة لضمان دقة وصحة التفكير الاقتصادي.</div>

          <!-- المحطة 11 -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-right: 3px solid #0284c7; border-radius: 6px; padding: 8pt 12pt; margin-bottom: 6pt; box-sizing: border-box;">
            <strong style="color: #0369a1; font-size: 10.5pt;">📊 المحطة 11: طبيعة المعرفة الاقتصادية وبحوث السوق:</strong>
            <p style="margin: 3pt 0 0 0; color: #334155; font-size: 10.5pt; line-height: 1.7;">${st.marketResearch?.methodology || st.natureOfBusiness || 'منهجيات جمع البيانات الكمية والنوعية وتصميم الاستبيانات وصياغة تفسيرات تسويقية مبنية على أدلة إحصائية.'}</p>
          </div>

          <!-- المحطة 12 -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-right: 3px solid #dc2626; border-radius: 6px; padding: 8pt 12pt; margin-bottom: 6pt; box-sizing: border-box;">
            <strong style="color: #b91c1c; font-size: 10.5pt;">❌ المحطة 12: التصورات الخطأ والفخاخ الإدارية:</strong>
            <div style="color: #dc2626; font-weight: bold; margin-top: 3pt; font-size: 10.5pt; line-height: 1.6;">⚠️ الخطأ الشائع: ${st.challengeIdea?.trap || firstConcept?.examTrap || 'الخلط بين الربح المحاسبي والتدفق النقدي الفعلي أو بين الحجم والمشروعية.'}</div>
            <div style="color: #15803d; font-weight: bold; margin-top: 3pt; font-size: 10.5pt; line-height: 1.6;">✅ التصحيح العلمي: ${st.challengeIdea?.correction || firstConcept?.examTip || 'السيولة هي شريان الحياة اليومي للمنشأة، بينما الربحية شرط بقائها؛ الحجم لا يحدد ماهية منظمة الأعمال بل الغرض والاستمرارية.'}</div>
          </div>

          <!-- المحطة 13 -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-right: 3px solid #d97706; border-radius: 6px; padding: 8pt 12pt; box-sizing: border-box;">
            <strong style="color: #b45309; font-size: 10.5pt;">📑 المحطة 13: المعادلات والمفاهيم في لمحة:</strong>
            <div style="font-size: 10pt; color: #1e293b; margin-top: 3pt; line-height: 1.7; background: #fffdf5; padding: 4pt 8pt; border-radius: 4pt; border: 1px solid #fef3c7;">
              TR = P × Q (الإيراد الكلي) • TC = FC + VC (التكلفة الكلية) • Profit = TR - TC (صافي الربح) • نقطة التعادل = التكاليف الثابتة ÷ هامش المساهمة للوحدة.
            </div>
          </div>
        </div>

        <!-- 🥇 المرحلة الخامسة -->
        <div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-right: 4px solid #7c3aed; border-radius: 6px; padding: 5pt 10pt; display: flex; align-items: center; justify-content: space-between; margin-bottom: 6pt;">
            <span style="font-weight: 800; color: #6d28d9; font-size: 11pt;">🥇 المرحلة الخامسة: التمكين والإتقان وحوكمة الاستدلال</span>
            <span style="font-size: 9pt; color: #64748b; font-weight: 600;">(حكّم ووازِن) [بلوم: التقييم وإصدار الأحكام]</span>
          </div>
          <div style="font-size: 9.5pt; color: #475569; margin: 0 4pt 6pt 4pt; line-height: 1.6;"><strong>الهدف التربوي:</strong> قياس الكفاءة التدريبية المتدرجة والوصول للتتويج التقييمي النهائي لنظام البكالوريا.</div>

          <!-- المحطة 14 -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-right: 3px solid #d97706; border-radius: 6px; padding: 8pt 12pt; margin-bottom: 6pt; box-sizing: border-box;">
            <strong style="color: #b45309; font-size: 10.5pt;">📝 المحطة 14: حاول بنفسك وتمارين موجهة:</strong>
            <div style="font-weight: bold; color: #0f172a; margin-top: 3pt; font-size: 10.5pt; line-height: 1.65;">« ${st.tryYourself || 'ممارسة أدوات الدرس فورياً لقياس كفاءة الاستيعاب المبدئي للمفاهيم.'} »</div>
          </div>

          <!-- المحطة 15 -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-right: 3px solid #16a34a; border-radius: 6px; padding: 8pt 12pt; margin-bottom: 6pt; box-sizing: border-box;">
            <strong style="color: #15803d; font-size: 10.5pt;">🏋️ المحطة 15: تدريب وتقييمات متدرجة الصعوبة (النماذج أ، ب، ج):</strong>
            <p style="margin: 3pt 0 0 0; color: #334155; font-size: 10.5pt; line-height: 1.7;">أسئلة متدرجة تطابق معايير النماذج الوزارية الثلاثة (أ، ب، ج) لقياس التذكر والفهم والتطبيق والحل الحسابي.</p>
          </div>

          <!-- المحطة 16 -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-right: 3px solid #7c3aed; border-radius: 6px; padding: 8pt 12pt; margin-bottom: 6pt; box-sizing: border-box;">
            <strong style="color: #6d28d9; font-size: 10.5pt;">⚖️ المحطة 16: تحدّ تفكيرك (مختبر الحكم والاستدلال JRE وفق سلم الـ 20 درجة الوزاري):</strong>
            <div style="font-weight: bold; color: #0f172a; margin-top: 3pt; font-size: 11pt; line-height: 1.65;">نص السؤال المقالي الوزاري: « ${jrePrompt} »</div>
            <div style="margin-top: 4pt; background: #fdf4ff; padding: 4pt 8pt; border-radius: 4pt; font-size: 9.5pt; color: #581c87; border: 1px solid #fae8ff; line-height: 1.6;">
              <strong>عناصر الـ 20 درجة:</strong> الحكم الصريح (3) • التبرير السببي (4) • الدليل السياقي والمفاهيم (5) • الحجة المقابلة (4) • الاستنتاج المشروط (4).
            </div>
            ${jreAnswer ? `
              <div style="margin-top: 5pt; font-size: 10pt; color: #334155; line-height: 1.65; background: #faf5ff; padding: 6pt 10pt; border-radius: 4pt; border: 1px solid #f3e8ff;">
                <div><strong>[الحكم الصريح]:</strong> ${jreAnswer.judgment}</div>
                <div><strong>[التبرير السببي]:</strong> ${jreAnswer.reasoning}</div>
                <div><strong>[الدليل السياقي]:</strong> ${jreAnswer.evidence}</div>
                <div><strong>[الرأي المقابل]:</strong> ${jreAnswer.counterArgument}</div>
                <div><strong>[الاستنتاج المشروط]:</strong> ${jreAnswer.conclusion}</div>
              </div>
            ` : ''}
          </div>

          <!-- المحطة 17 -->
          <div style="background: #ffffff; border: 1px solid #e2e8f0; border-right: 3px solid #8b5cf6; border-radius: 6px; padding: 8pt 12pt; box-sizing: border-box;">
            <strong style="color: #7c3aed; font-size: 10.5pt;">🔄 المحطة 17: فكّر وتأمل والمراجعة المستدامة:</strong>
            <p style="margin: 3pt 0 0 0; color: #334155; font-size: 10.5pt; line-height: 1.7;">${st.reflect || 'وقفة ختامية تفاعلية لتأصيل الروابط بين الدرس والدروس السابقة وتثبيت الأداء المعرفي على المدى الطويل.'}</p>
          </div>
        </div>
      </div>
    `;
  };

  // Helper to compile HTML content with premium commercial textbook layout
  const generateBookContentHtml = useMemo(() => {
    let html = '';

    if (selectedBook === 'comprehensive_unit') {
      const unitsToRender = scope === 'all_units' ? ALL_UNITS : [currentUnit];
      unitsToRender.forEach(unit => {
        const uNum = unit.number;
        const textbookBundle = TEXTBOOK_QUESTIONS_REGISTRY[uNum];
        const uQuestions = textbookBundle ? textbookBundle.questions : [];
        const assessBundle = getUnitAssessmentData(uNum);
        const assessmentsList = assessBundle ? assessBundle.assessments : [];
        const unitQuestions = ALL_BANK_QUESTIONS.filter(q => q.unitNumber === uNum);

        // Categorize bank questions
        const mcqQuestions = unitQuestions.filter(q => q.type === 'mcq');
        const tfQuestions = unitQuestions.filter(q => q.type === 'true_false');
        const essayQuestions = unitQuestions.filter(q => q.type === 'short_essay');
        const calcQuestions = unitQuestions.filter(q => q.type === 'calculation');
        const caseQuestions = unitQuestions.filter(q => q.type === 'case_study');
        const jreQuestions = unitQuestions.filter(q => q.type === 'jre');

        html += `
          <div class="comprehensive-unit-container" style="margin-bottom: 36pt;">
            <!-- ترويسة وغلاف الوحدة الشاملة المتكاملة -->
            <div class="unit-title-bar" style="border-bottom: 3.5pt solid #059669; padding-bottom: 12pt; margin-bottom: 20pt; background: #f0fdf4; border-radius: 8pt; padding: 14pt 18pt;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6pt; flex-wrap: wrap; gap: 6pt;">
                <span style="background: #059669; color: white; padding: 4pt 16pt; border-radius: 6pt; font-weight: 900; font-size: 13.5pt;">الوحدة الشاملة [ 0${unit.number} ]</span>
                <span style="font-size: 11pt; color: #166534; font-weight: bold; background: #dcfce7; padding: 3pt 10pt; border-radius: 4pt;">الملزمة المتكاملة: شرح • تدريبات الوزارة • التقييمات • بنك الأسئلة</span>
              </div>
              <h1 style="color: #064e3b; margin: 6pt 0 4pt 0; font-size: 23pt; font-weight: 900;">${unit.title}</h1>
              <div style="font-size: 12.5pt; color: #166534; font-weight: 600; line-height: 1.6; margin-bottom: 10pt;">${unit.overview || ''}</div>
              
              <!-- فهرس محتويات الوحدة الأربعة -->
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8pt; background: #ffffff; border: 1.5pt solid #86efac; border-radius: 8pt; padding: 10pt 14pt; font-size: 10.5pt; color: #14532d;">
                <div>📘 <strong>المحور 1:</strong> الشرح المفاهيمي والمسار الاستكشافي (${(unit.lessons || []).length} دروس)</div>
                <div>📗 <strong>المحور 2:</strong> تدريبات كتاب الوزارة بالحلول (${uQuestions.length} تدريباً)</div>
                <div>📙 <strong>المحور 3:</strong> الأداءات والتقييمات الأسبوعية (${assessmentsList.length} أسابيع)</div>
                <div>📕 <strong>المحور 4:</strong> بنك الأسئلة الشامل (${unitQuestions.length} سؤالاً)</div>
              </div>
            </div>

            <!-- المحور الأول: الشرح المفاهيمي والمسار الاستكشافي -->
            <div class="comprehensive-section-part" style="margin-bottom: 26pt;">
              <div style="background: #eff6ff; border: 1pt solid #bfdbfe; border-right: 5pt solid #1e3a8a; padding: 10pt 14pt; border-radius: 8pt; margin-bottom: 16pt;">
                <h2 style="color: #1e3a8a; margin: 0; font-size: 17pt; font-weight: 900;">المحور الأول: الشرح المفاهيمي والمسار الاستكشافي المعتمد</h2>
                <div style="font-size: 11pt; color: #334155; margin-top: 3pt;">شرح تحليلي متكامل لدروس الوحدة، يشتمل على تأصيل المفاهيم، وأدوات التحليل، وفخاخ الاختبارات، ومحطات التعلم في نسق واحد انسيابي.</div>
              </div>
              
              ${(unit.lessons || []).map(lesson => `
                <div class="lesson-block" style="border: 1pt solid #cbd5e1; border-radius: 8pt; padding: 10pt 12pt; margin-bottom: 14pt; background: #ffffff; width: 100%; box-sizing: border-box; page-break-inside: auto;">
                  <div style="border-bottom: 2pt solid #0284c7; padding-bottom: 6pt; margin-bottom: 10pt; display: flex; align-items: center; justify-content: space-between;">
                    <div>
                      <span style="background: #e0f2fe; color: #0369a1; font-weight: 800; font-size: 11pt; padding: 2pt 8pt; border-radius: 4pt; margin-left: 6pt;">الدرس ${lesson.lessonNumber}</span>
                      <h2 style="display: inline; color: #0f172a; margin: 0; font-size: 17pt;">${lesson.title}</h2>
                    </div>
                    ${lesson.subtitle ? `<span style="font-size: 11pt; color: #64748b; font-weight: 600;">${lesson.subtitle}</span>` : ''}
                  </div>

                  <div style="font-size: 11pt; line-height: 1.7; color: #1e293b; margin-top: 6pt;">
                    <!-- المحطات الـ 17 المنهجية لشرح الدرس في نسق متكامل -->
                    ${renderLessonStationsSection(lesson, unit)}
                    
                    ${lesson.concepts && lesson.concepts.length ? `
                      <div style="margin-top: 16pt;">
                        <h3 style="color: #0f172a; margin-bottom: 12pt; border-bottom: 1.5pt solid #e2e8f0; padding-bottom: 4pt; font-size: 15pt;">المفاهيم الجوهرية للدرس:</h3>
                        ${lesson.concepts.map((c, cIdx) => `
                          <div style="background: #ffffff; border: 1pt solid #e2e8f0; border-right: 4pt solid #1e3a8a; border-radius: 8pt; padding: 12pt 16pt; margin-bottom: 14pt;">
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6pt;">
                              <h4 style="margin: 0; color: #1e3a8a; font-size: 14pt; font-weight: 800;">
                                [ ${cIdx + 1} ] ${c.title}
                              </h4>
                              ${c.tagline ? `<span style="font-size: 10.5pt; color: #64748b; font-weight: 600;">${c.tagline}</span>` : ''}
                            </div>
                            <p style="margin: 6pt 0 10pt 0; font-size: 12pt; color: #334155; line-height: 1.75;">${c.summary}</p>
                            ${c.keyPoints && c.keyPoints.length ? `
                              <ul style="margin: 0 0 10pt 0; padding-right: 20pt; font-size: 11.5pt; color: #475569; line-height: 1.8;">
                                ${c.keyPoints.map(kp => `<li>${kp}</li>`).join('')}
                              </ul>
                            ` : ''}
                            ${c.examTip ? `
                              <div class="golden-key-box" style="margin-top: 10pt; background: #fffbeb; border-right: 4pt solid #f59e0b; padding: 8pt 12pt; border-radius: 6pt; font-size: 11.5pt; color: #92400e;">
                                <strong>💡 مفتاح التفوق والتميز المعرفي:</strong> ${c.examTip}
                              </div>
                            ` : ''}
                            ${c.examTrap ? `
                              <div class="exam-trap-box" style="margin-top: 8pt; background: #fff1f2; border-right: 4pt solid #e11d48; padding: 8pt 12pt; border-radius: 6pt; font-size: 11.5pt; color: #9f1239;">
                                <strong>⚠️ فخ الاختبار والتقييم المتكرر (Exam Trap):</strong> ${c.examTrap}
                              </div>
                            ` : ''}
                          </div>
                        `).join('')}
                      </div>
                    ` : ''}

                    ${lesson.analysisTool ? `
                      <div class="tool-box" style="background: #f0fdf4; border: 1.5pt solid #86efac; border-right: 4pt solid #16a34a; border-radius: 8pt; padding: 14pt; margin: 16pt 0;">
                        <h4 style="color: #15803d; margin: 0 0 6pt 0; font-size: 13.5pt;">🛠️ أداة التحليل الإداري: ${lesson.analysisTool.title}</h4>
                        <p style="font-size: 11.5pt; color: #166534; margin: 0 0 6pt 0; line-height: 1.7;">${lesson.analysisTool.description}</p>
                        ${lesson.analysisTool.application ? `<div style="font-size: 11.5pt; color: #14532d; font-weight: bold; background: #ffffff; padding: 6pt 10pt; border-radius: 4pt; border: 1pt dashed #86efac;">تطبيق من السوق المصري: ${lesson.analysisTool.application}</div>` : ''}
                      </div>
                    ` : ''}

                    ${lesson.examTrapsList && lesson.examTrapsList.length ? `
                      <div style="background: #fff7ed; border: 1pt solid #fed7aa; border-radius: 8pt; padding: 12pt 16pt; margin: 14pt 0;">
                        <h4 style="color: #c2410c; margin: 0 0 8pt 0; font-size: 13pt;">⚠️ جدول فخاخ الاختبارات والتقييمات والتصويب المنهجي:</h4>
                        ${lesson.examTrapsList.map(et => `
                          <div style="margin-bottom: 8pt; font-size: 11.5pt; line-height: 1.7; background: #ffffff; padding: 8pt 12pt; border-radius: 6pt; border: 1pt solid #ffedd5;">
                            <div style="color: #dc2626; font-weight: bold; margin-bottom: 2pt;">❌ الفخ والخطأ الشائع: ${et.trap}</div>
                            <div style="color: #16a34a; font-weight: bold;">✅ التصويب الوزاري المعتمد: ${et.correction}</div>
                          </div>
                        `).join('')}
                      </div>
                    ` : ''}

                    ${lesson.quickCheck && lesson.quickCheck.length ? `
                      <div style="margin-top: 18pt; border-top: 2pt dashed #cbd5e1; padding-top: 14pt;">
                        <h4 style="color: #4f46e5; margin: 0 0 10pt 0; font-size: 13.5pt;">⚡ فحص سريع ومحطة تقويم الفهم (${lesson.quickCheck.length} أسئلة):</h4>
                        ${lesson.quickCheck.map((qc, qcIdx) => `
                          <div style="margin-bottom: 12pt; background: #f8fafc; border: 1pt solid #e2e8f0; border-radius: 8pt; padding: 12pt;">
                            <div style="font-weight: 800; font-size: 12.5pt; color: #0f172a; margin-bottom: 8pt;">
                              <span style="background: #4f46e5; color: white; padding: 1pt 7pt; border-radius: 4pt; margin-left: 6pt; font-size: 11pt;">س ${qcIdx + 1}</span>
                              ${qc.question}
                            </div>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px; margin: 8pt 0;">
                              ${qc.options.map((opt, oIdx) => `
                                <div style="background: white; border: 1pt solid #cbd5e1; padding: 6pt 10pt; border-radius: 6pt; font-size: 11.5pt;">
                                  <strong style="color: #4f46e5; margin-left: 4pt;">(${['أ', 'ب', 'ج', 'د'][oIdx] || oIdx + 1})</strong>
                                  ${opt}
                                </div>
                              `).join('')}
                            </div>
                            ${includeAnswers ? `
                              <div class="answer-box" style="margin-top: 8pt; background: #ecfdf5; border: 1pt solid #10b981; padding: 6pt 10pt; border-radius: 6pt; font-size: 11.5pt; color: #065f46;">
                                <strong>✅ الإجابة الصحيحة: (${['أ', 'ب', 'ج', 'د'][qc.correctIndex]})</strong> — ${qc.explanation}
                              </div>
                            ` : `
                              <div class="student-lines" style="border-bottom: 1pt dotted #94a3b8; height: 22px; margin-top: 8px;"></div>
                            `}
                          </div>
                        `).join('')}
                      </div>
                    ` : ''}

                    ${lesson.lessonSummary ? `
                      <div style="background: #f1f5f9; border-radius: 8pt; padding: 12pt 16pt; margin-top: 14pt; font-size: 12pt; color: #1e293b; border-right: 4pt solid #64748b;">
                        <strong>📌 كبسولة الدرس وخلاصة المفاهيم:</strong> ${lesson.lessonSummary}
                      </div>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="page-break" style="page-break-after: always;"></div>

            <!-- المحور الثاني: تدريبات كتاب الوزارة الرسمية -->
            ${uQuestions.length ? `
              <div class="comprehensive-section-part" style="margin-bottom: 26pt;">
                <div style="background: #f0fdfa; border: 1pt solid #99f6e4; border-right: 5pt solid #0284c7; padding: 10pt 14pt; border-radius: 8pt; margin-bottom: 16pt;">
                  <h2 style="color: #0284c7; margin: 0; font-size: 17pt; font-weight: 900;">المحور الثاني: أسئلة وتدريبات كتاب المدرسة الرسمية</h2>
                  <div style="font-size: 11pt; color: #334155; margin-top: 3pt;">الحلول النموذجية والسلالم المنهجية المعتمدة لكافة تدريبات كتاب الوزارة صفحة بصفحة (${uQuestions.length} سؤالاً).</div>
                </div>

                ${uQuestions.map((q, idx) => `
                  <div class="question-card" style="border: 1pt solid #cbd5e1; border-radius: 8pt; padding: 14pt 16pt; margin-bottom: 16pt; background: #ffffff; page-break-inside: avoid;">
                    <div class="question-header" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1pt dotted #e2e8f0; padding-bottom: 6pt; margin-bottom: 8pt;">
                      <div>
                        <span style="background: #0284c7; color: white; font-weight: 800; font-size: 10.5pt; padding: 2pt 8pt; border-radius: 4pt; margin-left: 6pt;">س ${idx + 1}</span>
                        <span style="font-size: 11pt; color: #475569; font-weight: bold;">[${q.sectionTitle}]</span>
                      </div>
                      <span style="font-size: 11pt; color: #0369a1; font-weight: bold; background: #e0f2fe; padding: 2pt 8pt; border-radius: 4pt;">كتاب الوزارة ص ${q.page || '-'}</span>
                    </div>
                    
                    <div class="question-text" style="font-size: 13pt; font-weight: bold; color: #0f172a; margin-bottom: 10pt; line-height: 1.65;">
                      ${q.questionText}
                    </div>

                    ${q.options && q.options.length ? `
                      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 8px; margin: 10pt 0;">
                        ${q.options.map((opt, oIdx) => `
                          <div style="background: #f8fafc; border: 1pt solid #cbd5e1; padding: 6pt 10pt; border-radius: 6pt; font-size: 12pt;">
                            <strong style="color: #0284c7; margin-left: 4pt;">(${['أ', 'ب', 'ج', 'د'][oIdx] || oIdx + 1})</strong>
                            ${opt}
                          </div>
                        `).join('')}
                      </div>
                    ` : ''}

                    ${includeAnswers ? `
                      <div class="answer-box" style="background: #f0fdf4; border: 1.5pt solid #86efac; border-radius: 6pt; padding: 10pt 14pt; margin-top: 10pt; font-size: 12pt; color: #14532d;">
                        <div style="font-weight: 800; color: #166534; margin-bottom: 4pt; font-size: 12.5pt;">
                          ✅ نموذج الإجابة المعتمد: ${q.correctOptionIndex !== undefined && q.options ? `(${['أ', 'ب', 'ج', 'د'][q.correctOptionIndex]}) ${q.options[q.correctOptionIndex]}` : q.modelAnswer}
                        </div>
                        ${q.distractorAnalysis && q.distractorAnalysis.length ? `<div style="margin-top: 4pt; color: #15803d;"><strong>شرح التحليل واستبعاد المشتتات:</strong> ${q.distractorAnalysis.map(d => `${d.option}: ${d.whyIncorrect}`).join(' | ')}</div>` : ''}
                        ${q.systematicJustification ? `<div style="font-size: 11.5pt; margin-top: 4pt; color: #166534;"><strong>التبرير المنهجي ومرجع كتاب الوزارة:</strong> ${q.systematicJustification}</div>` : ''}
                      </div>
                    ` : `
                      <div style="margin-top: 10pt;">
                        <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                        <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                        <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                      </div>
                    `}
                  </div>
                `).join('')}
              </div>

              <div class="page-break" style="page-break-after: always;"></div>
            ` : ''}

            <!-- المحور الثالث: الأداءات والتقييمات الأسبوعية -->
            ${assessmentsList.length ? `
              <div class="comprehensive-section-part" style="margin-bottom: 26pt;">
                <div style="background: #faf5ff; border: 1pt solid #e9d5ff; border-right: 5pt solid #7c3aed; padding: 10pt 14pt; border-radius: 8pt; margin-bottom: 16pt;">
                  <h2 style="color: #7c3aed; margin: 0; font-size: 17pt; font-weight: 900;">المحور الثالث: الأداءات الصفية والمنزلية ونماذج التقييم الأسبوعي</h2>
                  <div style="font-size: 11pt; color: #334155; margin-top: 3pt;">الدفتر الرسمي للأداءات الصفية والمنزلية ونماذج التقييم الأسبوعية الثلاثة المتوازية (A, B, C).</div>
                </div>

                ${assessmentsList.map(w => `
                  <div style="border: 1.5pt solid #cbd5e1; border-radius: 8pt; padding: 16pt; margin-bottom: 22pt; background: #ffffff; page-break-inside: avoid;">
                    <div style="background: #f8fafc; border: 1pt solid #cbd5e1; border-radius: 6pt; padding: 8pt 12pt; margin-bottom: 14pt; display: flex; flex-wrap: wrap; justify-content: space-between; font-size: 11pt; color: #334155;">
                      <div><strong>اسم الطالب:</strong> ................................................................</div>
                      <div><strong>الفصل:</strong> .................</div>
                      <div><strong>الأسبوع:</strong> ${w.weekNumber}</div>
                      <div style="background: #7c3aed; color: white; padding: 1pt 10pt; border-radius: 4pt; font-weight: bold;">الدرجة: ..... / 10</div>
                    </div>

                    <h2 style="color: #7c3aed; margin: 0 0 10pt 0; font-size: 16pt; border-bottom: 1.5pt solid #ddd6fe; padding-bottom: 4pt;">
                      الأسبوع ${w.weekNumber}: ${w.sectionTitle}
                    </h2>

                    <!-- فترات الأسبوع 1 و 2 -->
                    ${(w.performancePeriods || []).map(p => `
                      <div style="margin-bottom: 14pt; background: #faf5ff; border: 1pt solid #e9d5ff; border-radius: 6pt; padding: 12pt;">
                        <h3 style="color: #6b21a8; margin: 0 0 6pt 0; font-size: 13pt;">
                          ${p.periodNumber === 1 ? '📌 الفترة الأولى: النشاط الصفي وتطبيقات المهارة' : '📌 الفترة الثانية: الأداء المنزلي ومهمة التدريب'}
                        </h3>
                        
                        ${p.classActivity ? `
                          <div style="margin-bottom: 8pt; font-size: 11.5pt;">
                            <strong>المهمة الصفية:</strong> ${p.classActivity.task || p.classActivity.title}
                            ${includeAnswers && p.classActivity.modelAnswer ? `
                              <div style="background: #f0fdf4; border: 1pt solid #86efac; padding: 6pt 10pt; border-radius: 4pt; margin-top: 6pt; color: #166534;">
                                <strong>إجابة المعلم المعتمدة:</strong> ${p.classActivity.modelAnswer}
                              </div>
                            ` : ''}
                          </div>
                        ` : ''}

                        ${p.homeworkQuestions && p.homeworkQuestions.length ? `
                          <div style="font-size: 11.5pt;">
                            <strong>أسئلة الواجب المنزلي:</strong>
                            <ul style="margin: 4pt 0 0 0; padding-right: 18pt;">
                              ${p.homeworkQuestions.map(hq => `
                                <li style="margin-bottom: 6pt;">
                                  ${hq.question}
                                  ${includeAnswers && hq.modelAnswer ? `
                                    <div style="color: #15803d; font-size: 11pt; margin-top: 2pt;"><strong>الإجابة:</strong> ${hq.modelAnswer}</div>
                                  ` : ''}
                                </li>
                              `).join('')}
                            </ul>
                          </div>
                        ` : ''}
                      </div>
                    `).join('')}

                    <!-- نماذج التقييم الأسبوعي A, B, C -->
                    ${w.weeklyEvaluation && w.weeklyEvaluation.models && w.weeklyEvaluation.models.length ? `
                      <div style="margin-top: 14pt; border-top: 2pt dashed #cbd5e1; padding-top: 12pt;">
                        <h3 style="color: #7c3aed; margin: 0 0 10pt 0; font-size: 14pt;">
                          📝 الفترة الثالثة: نماذج التقييم الأسبوعي (3 نماذج متوازية):
                        </h3>
                        
                        ${w.weeklyEvaluation.models.map((modelData: any) => {
                          const modelTitle = `النموذج (${modelData.modelName}) — Model ${modelData.modelName}`;

                          return `
                            <div style="background: #ffffff; border: 1pt solid #cbd5e1; border-radius: 6pt; padding: 12pt; margin-bottom: 10pt;">
                              <div style="background: #f1f5f9; padding: 4pt 8pt; border-radius: 4pt; font-weight: bold; color: #0f172a; margin-bottom: 8pt; font-size: 12pt;">
                                ${modelTitle}
                              </div>
                              
                              ${modelData.mcqQuestions && modelData.mcqQuestions.length ? modelData.mcqQuestions.map((mcq: any, mIdx: number) => `
                                <div style="margin-bottom: 8pt; font-size: 11.5pt;">
                                  <strong>س${mIdx + 1} (اختيار من متعدد): ${mcq.text}</strong>
                                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 6px; margin: 6pt 0;">
                                    ${mcq.options.map((opt: string, oIdx: number) => `
                                      <div style="background: #f8fafc; border: 1pt solid #e2e8f0; padding: 4pt 8pt; border-radius: 4pt;">
                                        (${['أ', 'ب', 'ج', 'د'][oIdx]}) ${opt}
                                      </div>
                                    `).join('')}
                                  </div>
                                  ${includeAnswers ? `
                                    <div style="color: #15803d; font-weight: bold; margin-top: 4pt; font-size: 11pt;">
                                      الإجابة الصحيحة: (${['أ', 'ب', 'ج', 'د'][mcq.correctIndex]}) — ${mcq.explanation || mcq.rationale}
                                    </div>
                                  ` : ''}
                                </div>
                              `).join('') : ''}

                              ${modelData.writtenQuestions && modelData.writtenQuestions.length ? modelData.writtenQuestions.map((wq: any, wIdx: number) => `
                                <div style="font-size: 11.5pt; margin-top: 6pt;">
                                  <strong>س${wIdx + 2} (سؤال مقالي تحليلي): ${wq.text}</strong>
                                  ${includeAnswers ? `
                                    <div style="background: #f0fdf4; border: 1pt solid #bbf7d0; padding: 6pt 10pt; border-radius: 4pt; margin-top: 4pt; color: #166534; font-size: 11pt;">
                                      <strong>الإجابة النموذجية:</strong> ${wq.modelAnswer}
                                    </div>
                                  ` : `
                                    <div style="border-bottom: 1pt dotted #94a3b8; height: 22px; margin-top: 6px;"></div>
                                    <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                                  `}
                                </div>
                              `).join('') : ''}
                            </div>
                          `;
                        }).join('')}
                      </div>
                    ` : ''}

                  </div>
                `).join('')}
              </div>

              <div class="page-break" style="page-break-after: always;"></div>
            ` : ''}

            <!-- المحور الرابع: بنك الأسئلة الشامل -->
            ${unitQuestions.length ? `
              <div class="comprehensive-section-part" style="margin-bottom: 26pt;">
                <div style="background: #fffbeb; border: 1pt solid #fef3c7; border-right: 5pt solid #b45309; padding: 10pt 14pt; border-radius: 8pt; margin-bottom: 16pt;">
                  <h2 style="color: #b45309; margin: 0; font-size: 17pt; font-weight: 900;">المحور الرابع: بنك الأسئلة الشامل والمتدرج للوحدة</h2>
                  <div style="font-size: 11pt; color: #334155; margin-top: 3pt;">أكبر بنك أسئلة معياري طبقاً لمستويات بلوم بأجزائه الستة: MCQ، صواب وخطأ، مقال، مسائل حسابية، دراسات حالة، وسؤال JRE سلم الـ 20 درجة (${unitQuestions.length} سؤالاً).</div>
                </div>

                ${mcqQuestions.length ? `
                  <div class="part-block" style="margin-bottom: 20pt;">
                    <h3 style="color: #92400e; background: #fffbeb; padding: 6pt 12pt; border-radius: 6pt; border-right: 4pt solid #d97706; margin-bottom: 12pt; font-size: 14pt;">
                      1. أسئلة الاختيار من متعدد (${mcqQuestions.length} سؤالاً)
                    </h3>
                    ${mcqQuestions.map((q, idx) => `
                      <div class="question-card" style="border: 1pt solid #cbd5e1; border-radius: 8pt; padding: 12pt 14pt; margin-bottom: 14pt; background: #ffffff; page-break-inside: avoid;">
                        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1pt dotted #e2e8f0; padding-bottom: 4pt; margin-bottom: 6pt;">
                          <span style="background: #d97706; color: white; font-weight: 800; font-size: 10pt; padding: 2pt 8pt; border-radius: 4pt;">س ${idx + 1}</span>
                          <span style="font-size: 10pt; color: #92400e; font-weight: bold;">الدرجة: ${q.rubricScore || (q as any).points || 2}</span>
                        </div>
                        <div style="font-size: 12pt; font-weight: bold; color: #0f172a; margin-bottom: 8pt; line-height: 1.6;">${q.question}</div>
                        ${q.options && q.options.length ? `
                          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 6px; margin: 8pt 0;">
                            ${q.options.map((opt, oIdx) => `
                              <div style="background: #f8fafc; border: 1pt solid #cbd5e1; padding: 5pt 8pt; border-radius: 6pt; font-size: 11pt;">
                                <strong style="color: #d97706; margin-left: 4pt;">(${['أ', 'ب', 'ج', 'د'][oIdx] || oIdx + 1})</strong> ${opt}
                              </div>
                            `).join('')}
                          </div>
                        ` : ''}
                        ${includeAnswers ? `
                          <div style="background: #f0fdf4; border: 1pt solid #86efac; border-radius: 6pt; padding: 8pt 10pt; margin-top: 8pt; font-size: 11pt; color: #14532d;">
                            <strong>✅ الإجابة: (${['أ', 'ب', 'ج', 'د'][q.correctAnswer as number] || q.correctAnswer})</strong> — ${q.explanation || ''}
                          </div>
                        ` : '<div style="border-bottom: 1pt dotted #94a3b8; height: 20px; margin-top: 6px;"></div>'}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}

                ${tfQuestions.length ? `
                  <div class="part-block" style="margin-bottom: 20pt;">
                    <h3 style="color: #0369a1; background: #f0f9ff; padding: 6pt 12pt; border-radius: 6pt; border-right: 4pt solid #0284c7; margin-bottom: 12pt; font-size: 14pt;">
                      2. أسئلة الصواب والخطأ بالتعليل (${tfQuestions.length} سؤالاً)
                    </h3>
                    ${tfQuestions.map((q, idx) => `
                      <div class="question-card" style="border: 1pt solid #cbd5e1; border-radius: 8pt; padding: 12pt 14pt; margin-bottom: 14pt; background: #ffffff; page-break-inside: avoid;">
                        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1pt dotted #e2e8f0; padding-bottom: 4pt; margin-bottom: 6pt;">
                          <span style="background: #0284c7; color: white; font-weight: 800; font-size: 10pt; padding: 2pt 8pt; border-radius: 4pt;">س ${idx + 1}</span>
                          <span style="font-size: 10pt; color: #0369a1; font-weight: bold;">الدرجة: ${q.rubricScore || (q as any).points || 2}</span>
                        </div>
                        <div style="font-size: 12pt; font-weight: bold; color: #0f172a; margin-bottom: 8pt; line-height: 1.6;">${q.question}</div>
                        ${includeAnswers ? `
                          <div style="background: #f0fdf4; border: 1pt solid #86efac; border-radius: 6pt; padding: 8pt 10pt; margin-top: 8pt; font-size: 11pt; color: #14532d;">
                            <strong>✅ الحكم: ${q.correctAnswer ? 'صواب' : 'خطأ'}</strong> — ${q.explanation || ''}
                          </div>
                        ` : '<div style="border-bottom: 1pt dotted #94a3b8; height: 20px; margin-top: 6px;"></div>'}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}

                ${essayQuestions.length ? `
                  <div class="part-block" style="margin-bottom: 20pt;">
                    <h3 style="color: #4338ca; background: #eef2ff; padding: 6pt 12pt; border-radius: 6pt; border-right: 4pt solid #4f46e5; margin-bottom: 12pt; font-size: 14pt;">
                      3. الأسئلة المقالية التحليلية (${essayQuestions.length} سؤالاً)
                    </h3>
                    ${essayQuestions.map((q, idx) => `
                      <div class="question-card" style="border: 1pt solid #cbd5e1; border-radius: 8pt; padding: 12pt 14pt; margin-bottom: 14pt; background: #ffffff; page-break-inside: avoid;">
                        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1pt dotted #e2e8f0; padding-bottom: 4pt; margin-bottom: 6pt;">
                          <span style="background: #4f46e5; color: white; font-weight: 800; font-size: 10pt; padding: 2pt 8pt; border-radius: 4pt;">س ${idx + 1}</span>
                          <span style="font-size: 10pt; color: #4338ca; font-weight: bold;">الدرجة: ${q.rubricScore || (q as any).points || 4}</span>
                        </div>
                        <div style="font-size: 12pt; font-weight: bold; color: #0f172a; margin-bottom: 8pt; line-height: 1.6;">${q.question}</div>
                        ${includeAnswers ? `
                          <div style="background: #f0fdf4; border: 1pt solid #86efac; border-radius: 6pt; padding: 8pt 10pt; margin-top: 8pt; font-size: 11pt; color: #14532d;">
                            <strong>✅ الإجابة النموذجية:</strong> ${q.correctAnswer || q.explanation}
                          </div>
                        ` : '<div style="border-bottom: 1pt dotted #94a3b8; height: 44px; margin-top: 6px;"></div>'}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}

                ${calcQuestions.length ? `
                  <div class="part-block" style="margin-bottom: 20pt;">
                    <h3 style="color: #047857; background: #ecfdf5; padding: 6pt 12pt; border-radius: 6pt; border-right: 4pt solid #059669; margin-bottom: 12pt; font-size: 14pt;">
                      4. المسائل الحسابية والتشغيلية (${calcQuestions.length} مسألة)
                    </h3>
                    ${calcQuestions.map((q, idx) => `
                      <div class="question-card" style="border: 1pt solid #cbd5e1; border-radius: 8pt; padding: 12pt 14pt; margin-bottom: 14pt; background: #ffffff; page-break-inside: avoid;">
                        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1pt dotted #e2e8f0; padding-bottom: 4pt; margin-bottom: 6pt;">
                          <span style="background: #059669; color: white; font-weight: 800; font-size: 10pt; padding: 2pt 8pt; border-radius: 4pt;">مسألة ${idx + 1}</span>
                          <span style="font-size: 10pt; color: #047857; font-weight: bold;">الدرجة: ${q.rubricScore || (q as any).points || 5}</span>
                        </div>
                        <div style="font-size: 12pt; font-weight: bold; color: #0f172a; margin-bottom: 8pt; line-height: 1.6;">${q.question}</div>
                        ${includeAnswers ? `
                          <div style="background: #f0fdf4; border: 1pt solid #86efac; border-radius: 6pt; padding: 8pt 10pt; margin-top: 8pt; font-size: 11pt; color: #14532d;">
                            <strong>✅ خطوات الحل:</strong> <pre style="margin: 4pt 0 0 0; font-family: monospace; direction: ltr; text-align: left;">${q.correctAnswer || q.explanation}</pre>
                          </div>
                        ` : '<div style="border-bottom: 1pt dotted #94a3b8; height: 44px; margin-top: 6px;"></div>'}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}

                ${caseQuestions.length ? `
                  <div class="part-block" style="margin-bottom: 20pt;">
                    <h3 style="color: #9333ea; background: #faf5ff; padding: 6pt 12pt; border-radius: 6pt; border-right: 4pt solid #a855f7; margin-bottom: 12pt; font-size: 14pt;">
                      5. دراسات الحالة (${caseQuestions.length} حالة)
                    </h3>
                    ${caseQuestions.map((q, idx) => `
                      <div class="question-card" style="border: 1pt solid #cbd5e1; border-radius: 8pt; padding: 12pt 14pt; margin-bottom: 14pt; background: #ffffff; page-break-inside: avoid;">
                        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1pt dotted #e2e8f0; padding-bottom: 4pt; margin-bottom: 6pt;">
                          <span style="background: #a855f7; color: white; font-weight: 800; font-size: 10pt; padding: 2pt 8pt; border-radius: 4pt;">حالة ${idx + 1}</span>
                          <span style="font-size: 10pt; color: #9333ea; font-weight: bold;">الدرجة: ${q.rubricScore || (q as any).points || 6}</span>
                        </div>
                        <div style="font-size: 12pt; font-weight: bold; color: #0f172a; margin-bottom: 8pt; line-height: 1.6;">${q.question}</div>
                        ${includeAnswers ? `
                          <div style="background: #f0fdf4; border: 1pt solid #86efac; border-radius: 6pt; padding: 8pt 10pt; margin-top: 8pt; font-size: 11pt; color: #14532d;">
                            <strong>✅ القرار والتحليل:</strong> ${q.correctAnswer || q.explanation}
                          </div>
                        ` : '<div style="border-bottom: 1pt dotted #94a3b8; height: 44px; margin-top: 6px;"></div>'}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}

                ${jreQuestions.length ? `
                  <div class="part-block" style="margin-bottom: 20pt;">
                    <h3 style="color: #be123c; background: #fff1f2; padding: 6pt 12pt; border-radius: 6pt; border-right: 4pt solid #e11d48; margin-bottom: 12pt; font-size: 14pt;">
                      6. مختبر الحكم والاستدلال JRE سلم الـ 20 درجة (${jreQuestions.length} سؤالاً)
                    </h3>
                    ${jreQuestions.map((q, idx) => {
                      const jreData = q.jreStructure || (q as any).jreModelAnswer || (typeof q.correctAnswer === 'object' ? q.correctAnswer : null);
                      return `
                        <div class="question-card" style="border: 2pt solid #fecdd3; border-radius: 8pt; padding: 14pt 16pt; margin-bottom: 16pt; background: #ffffff; page-break-inside: avoid;">
                          <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1.5pt solid #ffe4e6; padding-bottom: 6pt; margin-bottom: 8pt;">
                            <span style="background: #e11d48; color: white; font-weight: 800; font-size: 11pt; padding: 2pt 10pt; border-radius: 4pt;">سؤال استدلال JRE رقم ${idx + 1}</span>
                            <span style="font-size: 11pt; color: #be123c; font-weight: 900; background: #ffe4e6; padding: 3pt 10pt; border-radius: 6pt;">الوزن: 20 درجة</span>
                          </div>
                          <div style="font-size: 13pt; font-weight: bold; color: #0f172a; margin-bottom: 10pt; line-height: 1.7;">${q.question}</div>
                          ${includeAnswers && jreData ? `
                            <div style="background: #f0fdf4; border: 1.5pt solid #86efac; border-radius: 6pt; padding: 10pt 12pt; margin-top: 8pt; font-size: 11pt; color: #14532d; line-height: 1.7;">
                              <div style="font-weight: 900; color: #166534; font-size: 12pt; margin-bottom: 4pt;">✅ نموذج الإجابة الاستدلالية (20 درجة):</div>
                              ${typeof jreData === 'object' ? `
                                <div>• <strong>الحكم:</strong> ${jreData.judgment || ''}</div>
                                <div>• <strong>التعليل:</strong> ${jreData.reasoning || ''}</div>
                                <div>• <strong>الدليل:</strong> ${jreData.evidence || ''}</div>
                                <div>• <strong>الرأي المقابل:</strong> ${jreData.counterArgument || ''}</div>
                                <div>• <strong>الاستنتاج:</strong> ${jreData.conclusion || ''}</div>
                              ` : `<div>${jreData}</div>`}
                            </div>
                          ` : '<div style="border-bottom: 1pt dotted #94a3b8; height: 66px; margin-top: 6px;"></div>'}
                        </div>
                      `;
                    }).join('')}
                  </div>
                ` : ''}

              </div>
            ` : ''}
          </div>
          <div class="page-break" style="page-break-after: always;"></div>
        `;
      });
    }

    else if (selectedBook === 'student_book') {
      const unitsToRender = scope === 'all_units' ? ALL_UNITS : [currentUnit];
      unitsToRender.forEach(unit => {
        html += `
          <div class="unit-section" style="margin-bottom: 32pt;">
            <div class="unit-title-bar" style="border-bottom: 3pt solid #1e3a8a; padding-bottom: 8pt; margin-bottom: 16pt;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6pt;">
                <span style="background: #1e3a8a; color: white; padding: 4pt 14pt; border-radius: 6pt; font-weight: 900; font-size: 13pt;">الوحدة [ 0${unit.number} ]</span>
                <span style="font-size: 11pt; color: #64748b; font-weight: bold;">سلسلة رواد الأعمال • كتاب الطالب المفصل</span>
              </div>
              <h1 style="color: #0f172a; margin: 4pt 0 6pt 0; font-size: 22pt;">${unit.title}</h1>
              <div style="font-size: 13pt; color: #334155; font-weight: 600; line-height: 1.6;">${unit.overview || ''}</div>
            </div>

            ${unit.bigIdea ? `
              <div class="golden-key-box" style="background: #fffbeb; border: 1pt solid #fef3c7; border-right: 5pt solid #d97706; padding: 12pt 16pt; border-radius: 8pt; margin-bottom: 16pt;">
                <div style="display: flex; align-items: center; gap: 8pt; margin-bottom: 4pt;">
                  <span style="font-size: 15pt;">💡</span>
                  <strong style="color: #92400e; font-size: 13pt;">الفكرة الكبرى للوحدة (The Big Idea):</strong>
                </div>
                <div style="font-size: 12.5pt; color: #78350f; font-weight: bold; line-height: 1.7;">${unit.bigIdea}</div>
              </div>
            ` : ''}

            <div style="background: #f8fafc; border: 1pt solid #e2e8f0; border-radius: 8pt; padding: 12pt 16pt; margin-bottom: 20pt;">
              <div style="font-weight: 800; color: #1e3a8a; margin-bottom: 8pt; font-size: 13pt;">🎯 نواتج التعلم المستهدفة للوحدة (طبقاً لمواصفات الوزارة):</div>
              <ul style="margin: 0; padding-right: 20pt; line-height: 1.9; font-size: 12pt; color: #334155;">
                ${(unit.learningOutcomes || []).map(lo => `<li>${lo}</li>`).join('')}
              </ul>
            </div>

            ${(unit.lessons || []).map(lesson => `
              <div class="lesson-block" style="border: 1pt solid #cbd5e1; border-radius: 8pt; padding: 10pt 12pt; margin-bottom: 14pt; background: #ffffff; width: 100%; box-sizing: border-box; page-break-inside: auto;">
                <div style="border-bottom: 2pt solid #0284c7; padding-bottom: 6pt; margin-bottom: 10pt; display: flex; align-items: center; justify-content: space-between;">
                  <div>
                    <span style="background: #e0f2fe; color: #0369a1; font-weight: 800; font-size: 11pt; padding: 2pt 8pt; border-radius: 4pt; margin-left: 6pt;">الدرس ${lesson.lessonNumber}</span>
                    <h2 style="display: inline; color: #0f172a; margin: 0; font-size: 17pt;">${lesson.title}</h2>
                  </div>
                  ${lesson.subtitle ? `<span style="font-size: 11pt; color: #64748b; font-weight: 600;">${lesson.subtitle}</span>` : ''}
                </div>

                <div style="font-size: 11pt; line-height: 1.7; color: #1e293b; margin-top: 6pt;">
                  <!-- المحطات الـ 17 المنهجية لشرح الدرس في نسق متكامل -->
                  ${renderLessonStationsSection(lesson, unit)}
                  
                  ${lesson.concepts && lesson.concepts.length ? `
                    <div style="margin-top: 16pt;">
                      <h3 style="color: #0f172a; margin-bottom: 12pt; border-bottom: 1.5pt solid #e2e8f0; padding-bottom: 4pt; font-size: 15pt;">المفاهيم الجوهرية للدرس:</h3>
                      ${lesson.concepts.map((c, cIdx) => `
                        <div style="background: #ffffff; border: 1pt solid #e2e8f0; border-right: 4pt solid #1e3a8a; border-radius: 8pt; padding: 12pt 16pt; margin-bottom: 14pt;">
                          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6pt;">
                            <h4 style="margin: 0; color: #1e3a8a; font-size: 14pt; font-weight: 800;">
                              [ ${cIdx + 1} ] ${c.title}
                            </h4>
                            ${c.tagline ? `<span style="font-size: 10.5pt; color: #64748b; font-weight: 600;">${c.tagline}</span>` : ''}
                          </div>
                          <p style="margin: 6pt 0 10pt 0; font-size: 12pt; color: #334155; line-height: 1.75;">${c.summary}</p>
                          ${c.keyPoints && c.keyPoints.length ? `
                            <ul style="margin: 0 0 10pt 0; padding-right: 20pt; font-size: 11.5pt; color: #475569; line-height: 1.8;">
                              ${c.keyPoints.map(kp => `<li>${kp}</li>`).join('')}
                            </ul>
                          ` : ''}
                          ${c.examTip ? `
                            <div class="golden-key-box" style="margin-top: 10pt; background: #fffbeb; border-right: 4pt solid #f59e0b; padding: 8pt 12pt; border-radius: 6pt; font-size: 11.5pt; color: #92400e;">
                              <strong>💡 مفتاح التفوق والتميز المعرفي:</strong> ${c.examTip}
                            </div>
                          ` : ''}
                          ${c.examTrap ? `
                            <div class="exam-trap-box" style="margin-top: 8pt; background: #fff1f2; border-right: 4pt solid #e11d48; padding: 8pt 12pt; border-radius: 6pt; font-size: 11.5pt; color: #9f1239;">
                              <strong>⚠️ فخ الاختبار والتقييم المتكرر (Exam Trap):</strong> ${c.examTrap}
                            </div>
                          ` : ''}
                        </div>
                      `).join('')}
                    </div>
                  ` : ''}

                  ${lesson.analysisTool ? `
                    <div class="tool-box" style="background: #f0fdf4; border: 1.5pt solid #86efac; border-right: 4pt solid #16a34a; border-radius: 8pt; padding: 14pt; margin: 16pt 0;">
                      <h4 style="color: #15803d; margin: 0 0 6pt 0; font-size: 13.5pt;">🛠️ أداة التحليل الإداري: ${lesson.analysisTool.title}</h4>
                      <p style="font-size: 11.5pt; color: #166534; margin: 0 0 6pt 0; line-height: 1.7;">${lesson.analysisTool.description}</p>
                      ${lesson.analysisTool.application ? `<div style="font-size: 11.5pt; color: #14532d; font-weight: bold; background: #ffffff; padding: 6pt 10pt; border-radius: 4pt; border: 1pt dashed #86efac;">تطبيق من السوق المصري: ${lesson.analysisTool.application}</div>` : ''}
                    </div>
                  ` : ''}

                  ${lesson.examTrapsList && lesson.examTrapsList.length ? `
                    <div style="background: #fff7ed; border: 1pt solid #fed7aa; border-radius: 8pt; padding: 12pt 16pt; margin: 14pt 0;">
                      <h4 style="color: #c2410c; margin: 0 0 8pt 0; font-size: 13pt;">⚠️ جدول فخاخ الاختبارات والتقييمات والتصويب المنهجي:</h4>
                      ${lesson.examTrapsList.map(et => `
                        <div style="margin-bottom: 8pt; font-size: 11.5pt; line-height: 1.7; background: #ffffff; padding: 8pt 12pt; border-radius: 6pt; border: 1pt solid #ffedd5;">
                          <div style="color: #dc2626; font-weight: bold; margin-bottom: 2pt;">❌ الفخ والخطأ الشائع: ${et.trap}</div>
                          <div style="color: #16a34a; font-weight: bold;">✅ التصويب الوزاري المعتمد: ${et.correction}</div>
                        </div>
                      `).join('')}
                    </div>
                  ` : ''}

                  ${lesson.quickCheck && lesson.quickCheck.length ? `
                    <div style="margin-top: 18pt; border-top: 2pt dashed #cbd5e1; padding-top: 14pt;">
                      <h4 style="color: #4f46e5; margin: 0 0 10pt 0; font-size: 13.5pt;">⚡ فحص سريع ومحطة تقويم الفهم (${lesson.quickCheck.length} أسئلة):</h4>
                      ${lesson.quickCheck.map((qc, qcIdx) => `
                        <div style="margin-bottom: 12pt; background: #f8fafc; border: 1pt solid #e2e8f0; border-radius: 8pt; padding: 12pt;">
                          <div style="font-weight: 800; font-size: 12.5pt; color: #0f172a; margin-bottom: 8pt;">
                            <span style="background: #4f46e5; color: white; padding: 1pt 7pt; border-radius: 4pt; margin-left: 6pt; font-size: 11pt;">س ${qcIdx + 1}</span>
                            ${qc.question}
                          </div>
                          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px; margin: 8pt 0;">
                            ${qc.options.map((opt, oIdx) => `
                              <div style="background: white; border: 1pt solid #cbd5e1; padding: 6pt 10pt; border-radius: 6pt; font-size: 11.5pt;">
                                <strong style="color: #4f46e5; margin-left: 4pt;">(${['أ', 'ب', 'ج', 'د'][oIdx] || oIdx + 1})</strong>
                                ${opt}
                              </div>
                            `).join('')}
                          </div>
                          ${includeAnswers ? `
                            <div class="answer-box" style="margin-top: 8pt; background: #ecfdf5; border: 1pt solid #10b981; padding: 6pt 10pt; border-radius: 6pt; font-size: 11.5pt; color: #065f46;">
                              <strong>✅ الإجابة الصحيحة: (${['أ', 'ب', 'ج', 'د'][qc.correctIndex]})</strong> — ${qc.explanation}
                            </div>
                          ` : `
                            <div class="student-lines" style="border-bottom: 1pt dotted #94a3b8; height: 22px; margin-top: 8px;"></div>
                          `}
                        </div>
                      `).join('')}
                    </div>
                  ` : ''}

                  ${lesson.lessonSummary ? `
                    <div style="background: #f1f5f9; border-radius: 8pt; padding: 12pt 16pt; margin-top: 14pt; font-size: 12pt; color: #1e293b; border-right: 4pt solid #64748b;">
                      <strong>📌 كبسولة الدرس وخلاصة المفاهيم:</strong> ${lesson.lessonSummary}
                    </div>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
          <div class="page-break" style="page-break-after: always;"></div>
        `;
      });
    }

    else if (selectedBook === 'textbook_questions') {
      const unitsToRender = scope === 'all_units' ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [selectedUnitNumber];
      unitsToRender.forEach(uNum => {
        const bundle = TEXTBOOK_QUESTIONS_REGISTRY[uNum];
        const uQuestions = bundle ? bundle.questions : [];
        if (!uQuestions.length) return;

        html += `
          <div class="unit-section" style="margin-bottom: 30pt;">
            <div class="unit-title-bar" style="border-bottom: 3pt solid #0284c7; padding-bottom: 8pt; margin-bottom: 16pt;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4pt;">
                <span style="background: #0284c7; color: white; padding: 3pt 12pt; border-radius: 6pt; font-weight: 800; font-size: 12pt;">الوحدة [ 0${uNum} ]</span>
                <span style="font-size: 11pt; color: #64748b;">كتاب الوزارة المعتمد • الصف الثاني الثانوي</span>
              </div>
              <h1 style="color: #0369a1; margin: 4pt 0 6pt 0; font-size: 20pt;">أسئلة وتدريبات كتاب المدرسة الرسمية</h1>
              <div style="font-size: 12pt; color: #475569; font-weight: bold;">
                إجمالي تدريبات الوحدة: ${uQuestions.length} سؤالاً مدعومة بأرقام الصفحات والسلالم التحليلية
              </div>
            </div>

            ${uQuestions.map((q, idx) => `
              <div class="question-card" style="border: 1pt solid #cbd5e1; border-radius: 8pt; padding: 14pt 16pt; margin-bottom: 16pt; background: #ffffff; page-break-inside: avoid;">
                <div class="question-header" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1pt dotted #e2e8f0; padding-bottom: 6pt; margin-bottom: 8pt;">
                  <div>
                    <span style="background: #0284c7; color: white; font-weight: 800; font-size: 10.5pt; padding: 2pt 8pt; border-radius: 4pt; margin-left: 6pt;">س ${idx + 1}</span>
                    <span style="font-size: 11pt; color: #475569; font-weight: bold;">[${q.sectionTitle}]</span>
                  </div>
                  <span style="font-size: 11pt; color: #0369a1; font-weight: bold; background: #e0f2fe; padding: 2pt 8pt; border-radius: 4pt;">كتاب الوزارة ص ${q.page || '-'}</span>
                </div>
                
                <div class="question-text" style="font-size: 13pt; font-weight: bold; color: #0f172a; margin-bottom: 10pt; line-height: 1.65;">
                  ${q.questionText}
                </div>

                ${q.options && q.options.length ? `
                  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 8px; margin: 10pt 0;">
                    ${q.options.map((opt, oIdx) => `
                      <div style="background: #f8fafc; border: 1pt solid #cbd5e1; padding: 6pt 10pt; border-radius: 6pt; font-size: 12pt;">
                        <strong style="color: #0284c7; margin-left: 4pt;">(${['أ', 'ب', 'ج', 'د'][oIdx] || oIdx + 1})</strong>
                        ${opt}
                      </div>
                    `).join('')}
                  </div>
                ` : ''}

                ${includeAnswers ? `
                  <div class="answer-box" style="background: #f0fdf4; border: 1.5pt solid #86efac; border-radius: 6pt; padding: 10pt 14pt; margin-top: 10pt; font-size: 12pt; color: #14532d;">
                    <div style="font-weight: 800; color: #166534; margin-bottom: 4pt; font-size: 12.5pt;">
                      ✅ نموذج الإجابة المعتمد: ${q.correctOptionIndex !== undefined && q.options ? `(${['أ', 'ب', 'ج', 'د'][q.correctOptionIndex]}) ${q.options[q.correctOptionIndex]}` : q.modelAnswer}
                    </div>
                    ${q.distractorAnalysis && q.distractorAnalysis.length ? `<div style="margin-top: 4pt; color: #15803d;"><strong>شرح التحليل واستبعاد المشتتات:</strong> ${q.distractorAnalysis.map(d => `${d.option}: ${d.whyIncorrect}`).join(' | ')}</div>` : ''}
                    ${q.systematicJustification ? `<div style="font-size: 11.5pt; margin-top: 4pt; color: #166534;"><strong>التبرير المنهجي ومرجع كتاب الوزارة:</strong> ${q.systematicJustification}</div>` : ''}
                  </div>
                ` : `
                  <div style="margin-top: 10pt;">
                    <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                    <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                    <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                  </div>
                `}
              </div>
            `).join('')}
          </div>
          <div class="page-break" style="page-break-after: always;"></div>
        `;
      });
    }

    else if (selectedBook === 'assessments') {
      const unitsToRender = scope === 'all_units' ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [selectedUnitNumber];
      unitsToRender.forEach(uNum => {
        const bundle = getUnitAssessmentData(uNum);
        const assessmentsList = bundle ? bundle.assessments : [];
        if (!assessmentsList.length) return;

        html += `
          <div class="unit-section" style="margin-bottom: 30pt;">
            <div class="unit-title-bar" style="border-bottom: 3pt solid #7c3aed; padding-bottom: 8pt; margin-bottom: 16pt;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4pt;">
                <span style="background: #7c3aed; color: white; padding: 3pt 12pt; border-radius: 6pt; font-weight: 800; font-size: 12pt;">الوحدة [ 0${uNum} ]</span>
                <span style="font-size: 11pt; color: #64748b;">دفتر التقييم والأداءات الصفية والمنزلية</span>
              </div>
              <h1 style="color: #6d28d9; margin: 4pt 0 6pt 0; font-size: 20pt;">الأداءات الصفية والتقييمات الأسبوعية الرسمية</h1>
              <div style="font-size: 12pt; color: #475569; font-weight: bold;">
                الأسابيع الدراسية المعتمدة للوحدة • مقسمة إلى فترات صفية ومنزلية ونماذج التقييم (A, B, C)
              </div>
            </div>

            ${assessmentsList.map(w => `
              <div style="border: 1.5pt solid #cbd5e1; border-radius: 8pt; padding: 16pt; margin-bottom: 22pt; background: #ffffff; page-break-inside: avoid;">
                
                <!-- ترويسة ورقة التقييم المدرسي الرسمي -->
                <div style="background: #f8fafc; border: 1pt solid #cbd5e1; border-radius: 6pt; padding: 8pt 12pt; margin-bottom: 14pt; display: flex; flex-wrap: wrap; justify-content: space-between; font-size: 11pt; color: #334155;">
                  <div><strong>اسم الطالب:</strong> ................................................................</div>
                  <div><strong>الفصل:</strong> .................</div>
                  <div><strong>الأسبوع:</strong> ${w.weekNumber}</div>
                  <div style="background: #7c3aed; color: white; padding: 1pt 10pt; border-radius: 4pt; font-weight: bold;">الدرجة: ..... / 10</div>
                </div>

                <h2 style="color: #7c3aed; margin: 0 0 10pt 0; font-size: 16pt; border-bottom: 1.5pt solid #ddd6fe; padding-bottom: 4pt;">
                  الأسبوع ${w.weekNumber}: ${w.sectionTitle}
                </h2>

                <!-- فترات الأسبوع 1 و 2 -->
                ${(w.performancePeriods || []).map(p => `
                  <div style="margin-bottom: 14pt; background: #faf5ff; border: 1pt solid #e9d5ff; border-radius: 6pt; padding: 12pt;">
                    <h3 style="color: #6b21a8; margin: 0 0 6pt 0; font-size: 13pt;">
                      ${p.periodNumber === 1 ? '📌 الفترة الأولى: النشاط الصفي وتطبيقات المهارة' : '📌 الفترة الثانية: الأداء المنزلي ومهمة التدريب'}
                    </h3>
                    
                    ${p.classActivity ? `
                      <div style="margin-bottom: 8pt; font-size: 11.5pt;">
                        <strong>المهمة الصفية:</strong> ${p.classActivity.task || p.classActivity.title}
                        ${includeAnswers && p.classActivity.modelAnswer ? `
                          <div style="background: #f0fdf4; border: 1pt solid #86efac; padding: 6pt 10pt; border-radius: 4pt; margin-top: 6pt; color: #166534;">
                            <strong>إجابة المعلم المعتمدة:</strong> ${p.classActivity.modelAnswer}
                          </div>
                        ` : ''}
                      </div>
                    ` : ''}

                    ${p.homeworkQuestions && p.homeworkQuestions.length ? `
                      <div style="font-size: 11.5pt;">
                        <strong>أسئلة الواجب المنزلي:</strong>
                        <ul style="margin: 4pt 0 0 0; padding-right: 18pt;">
                          ${p.homeworkQuestions.map(hq => `
                            <li style="margin-bottom: 6pt;">
                              ${hq.question}
                              ${includeAnswers && hq.modelAnswer ? `
                                <div style="color: #15803d; font-size: 11pt; margin-top: 2pt;"><strong>الإجابة:</strong> ${hq.modelAnswer}</div>
                              ` : ''}
                            </li>
                          `).join('')}
                        </ul>
                      </div>
                    ` : ''}
                  </div>
                `).join('')}

                <!-- نماذج التقييم الأسبوعي A, B, C -->
                ${w.weeklyEvaluation && w.weeklyEvaluation.models && w.weeklyEvaluation.models.length ? `
                  <div style="margin-top: 14pt; border-top: 2pt dashed #cbd5e1; padding-top: 12pt;">
                    <h3 style="color: #7c3aed; margin: 0 0 10pt 0; font-size: 14pt;">
                      📝 الفترة الثالثة: نماذج التقييم الأسبوعي (3 نماذج متوازية):
                    </h3>
                    
                    ${w.weeklyEvaluation.models.map((modelData: any) => {
                      const modelTitle = `النموذج (${modelData.modelName}) — Model ${modelData.modelName}`;

                      return `
                        <div style="background: #ffffff; border: 1pt solid #cbd5e1; border-radius: 6pt; padding: 12pt; margin-bottom: 10pt;">
                          <div style="background: #f1f5f9; padding: 4pt 8pt; border-radius: 4pt; font-weight: bold; color: #0f172a; margin-bottom: 8pt; font-size: 12pt;">
                            ${modelTitle}
                          </div>
                          
                          ${modelData.mcqQuestions && modelData.mcqQuestions.length ? modelData.mcqQuestions.map((mcq: any, mIdx: number) => `
                            <div style="margin-bottom: 8pt; font-size: 11.5pt;">
                              <strong>س${mIdx + 1} (اختيار من متعدد): ${mcq.text}</strong>
                              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 6px; margin: 6pt 0;">
                                ${mcq.options.map((opt: string, oIdx: number) => `
                                  <div style="background: #f8fafc; border: 1pt solid #e2e8f0; padding: 4pt 8pt; border-radius: 4pt;">
                                    (${['أ', 'ب', 'ج', 'د'][oIdx]}) ${opt}
                                  </div>
                                `).join('')}
                              </div>
                              ${includeAnswers ? `
                                <div style="color: #15803d; font-weight: bold; margin-top: 4pt; font-size: 11pt;">
                                  الإجابة الصحيحة: (${['أ', 'ب', 'ج', 'د'][mcq.correctIndex]}) — ${mcq.explanation || mcq.rationale}
                                </div>
                              ` : ''}
                            </div>
                          `).join('') : ''}

                          ${modelData.writtenQuestions && modelData.writtenQuestions.length ? modelData.writtenQuestions.map((wq: any, wIdx: number) => `
                            <div style="font-size: 11.5pt; margin-top: 6pt;">
                              <strong>س${wIdx + 2} (سؤال مقالي تحليلي): ${wq.text}</strong>
                              ${includeAnswers ? `
                                <div style="background: #f0fdf4; border: 1pt solid #bbf7d0; padding: 6pt 10pt; border-radius: 4pt; margin-top: 4pt; color: #166534; font-size: 11pt;">
                                  <strong>الإجابة النموذجية:</strong> ${wq.modelAnswer}
                                </div>
                              ` : `
                                <div style="border-bottom: 1pt dotted #94a3b8; height: 22px; margin-top: 6px;"></div>
                                <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                              `}
                            </div>
                          `).join('') : ''}
                        </div>
                      `;
                    }).join('')}
                  </div>
                ` : ''}

              </div>
            `).join('')}
          </div>
          <div class="page-break" style="page-break-after: always;"></div>
        `;
      });
    }

    else if (selectedBook === 'question_bank') {
      const unitsToRender = scope === 'all_units' ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [selectedUnitNumber];
      
      unitsToRender.forEach(uNum => {
        const unitQuestions = ALL_BANK_QUESTIONS.filter(q => q.unitNumber === uNum);
        if (!unitQuestions.length) return;

        // Categorize by part
        const mcqQuestions = unitQuestions.filter(q => q.type === 'mcq');
        const tfQuestions = unitQuestions.filter(q => q.type === 'true_false');
        const essayQuestions = unitQuestions.filter(q => q.type === 'short_essay');
        const calcQuestions = unitQuestions.filter(q => q.type === 'calculation');
        const caseQuestions = unitQuestions.filter(q => q.type === 'case_study');
        const jreQuestions = unitQuestions.filter(q => q.type === 'jre');

        html += `
          <div class="unit-section" style="margin-bottom: 30pt;">
            <div class="unit-title-bar" style="border-bottom: 3pt solid #b45309; padding-bottom: 8pt; margin-bottom: 16pt;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4pt;">
                <span style="background: #b45309; color: white; padding: 3pt 12pt; border-radius: 6pt; font-weight: 800; font-size: 12pt;">الوحدة [ 0${uNum} ]</span>
                <span style="font-size: 11pt; color: #b45309; font-weight: bold; background: #fef3c7; padding: 2pt 8pt; border-radius: 4pt;">بنك الأسئلة المعياري الذهبي</span>
              </div>
              <h1 style="color: #92400e; margin: 4pt 0 6pt 0; font-size: 22pt;">الكتاب الخارجي الشامل — بنك أسئلة الوحدة ${uNum}</h1>
              <div style="font-size: 12pt; color: #475569; font-weight: bold;">
                إجمالي أسئلة الوحدة: ${unitQuestions.length} سؤالاً • صياغات وزارية معيارية متدرجة طبقاً لمستويات بلوم
              </div>
            </div>

            ${selectedParts.mcq && mcqQuestions.length ? `
              <div class="part-block" style="margin-bottom: 22pt;">
                <h2 style="color: #92400e; background: #fffbeb; padding: 8pt 14pt; border-radius: 6pt; border-right: 5pt solid #d97706; margin-bottom: 14pt; font-size: 16pt;">
                  الجزء الأول: أسئلة الاختيار من متعدد (${mcqQuestions.length} سؤالاً)
                </h2>
                ${mcqQuestions.map((q, idx) => `
                  <div class="question-card" style="border: 1pt solid #cbd5e1; border-radius: 8pt; padding: 14pt 16pt; margin-bottom: 16pt; background: #ffffff; page-break-inside: avoid;">
                    <div class="question-header" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1pt dotted #e2e8f0; padding-bottom: 4pt; margin-bottom: 6pt;">
                      <div>
                        <span style="background: #1e3a8a; color: white; font-weight: bold; font-size: 10.5pt; padding: 2pt 8pt; border-radius: 4pt; margin-left: 6pt;">س ${idx + 1}</span>
                        <span style="font-size: 10.5pt; color: #64748b;">[الدرس: ${q.lessonTitle}]</span>
                      </div>
                      <span style="font-size: 10pt; color: #64748b; background: #f1f5f9; padding: 2pt 6pt; border-radius: 4pt;">بلوم: ${q.bloomLevel} • الصعوبة: ${q.difficulty}</span>
                    </div>
                    <div class="question-text" style="font-size: 13.5pt; font-weight: bold; color: #0f172a; margin: 8pt 0 10pt 0; line-height: 1.7;">
                      ${idx + 1}. ${q.question}
                    </div>
                    ${q.options ? `
                      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 8px; margin: 8pt 0 12pt 0;">
                        ${q.options.map((opt, oIdx) => `
                          <div style="background: #f8fafc; border: 1pt solid #cbd5e1; padding: 6pt 10pt; border-radius: 6pt; font-size: 12pt;">
                            <strong style="color: #1e3a8a; margin-left: 4pt;">(${['أ', 'ب', 'ج', 'د'][oIdx] || oIdx + 1})</strong>
                            ${opt}
                          </div>
                        `).join('')}
                      </div>
                    ` : ''}
                    ${includeAnswers ? `
                      <div class="answer-box" style="background: #f0fdf4; border: 1.5pt solid #86efac; border-radius: 6pt; padding: 10pt 14pt; margin-top: 10pt; font-size: 12pt; color: #14532d;">
                        <div style="font-weight: 800; color: #166534; margin-bottom: 4pt; font-size: 12.5pt;">
                          ✅ الإجابة الصحيحة: ${typeof q.correctAnswer === 'number' ? `(${['أ', 'ب', 'ج', 'د'][q.correctAnswer]}) ${q.options?.[q.correctAnswer]}` : q.correctAnswer}
                        </div>
                        ${q.explanation ? `<div style="margin-top: 4pt;"><strong>مسار التفكير واستبعاد المشتتات:</strong> ${q.explanation}</div>` : ''}
                        ${q.systematicJustification ? `<div style="font-size: 11pt; margin-top: 4pt; color: #166534;"><strong>التبرير المنهجي:</strong> ${q.systematicJustification}</div>` : ''}
                      </div>
                    ` : `
                      <div style="border-bottom: 1pt dotted #94a3b8; height: 22px; margin-top: 8px;"></div>
                    `}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${selectedParts.true_false && tfQuestions.length ? `
              <div class="part-block" style="margin-bottom: 22pt;">
                <h2 style="color: #92400e; background: #fffbeb; padding: 8pt 14pt; border-radius: 6pt; border-right: 5pt solid #d97706; margin-bottom: 14pt; font-size: 16pt;">
                  الجزء الثاني: أسئلة الصواب والخطأ مع التعليل وتصحيح الخطأ (${tfQuestions.length} سؤالاً)
                </h2>
                ${tfQuestions.map((q, idx) => `
                  <div class="question-card" style="border: 1pt solid #cbd5e1; border-radius: 8pt; padding: 14pt 16pt; margin-bottom: 16pt; background: #ffffff; page-break-inside: avoid;">
                    <div class="question-header" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1pt dotted #e2e8f0; padding-bottom: 4pt; margin-bottom: 6pt;">
                      <div>
                        <span style="background: #1e3a8a; color: white; font-weight: bold; font-size: 10.5pt; padding: 2pt 8pt; border-radius: 4pt; margin-left: 6pt;">س ${idx + 1}</span>
                        <span style="font-size: 10.5pt; color: #64748b;">[الدرس: ${q.lessonTitle}]</span>
                      </div>
                      <span style="font-size: 10pt; color: #64748b; background: #f1f5f9; padding: 2pt 6pt; border-radius: 4pt;">بلوم: ${q.bloomLevel}</span>
                    </div>
                    <div class="question-text" style="font-size: 13pt; font-weight: bold; color: #0f172a; margin: 8pt 0 10pt 0; line-height: 1.7;">
                      ${idx + 1}. ضَع علامة (✓) أو (✗) مع التعليل وتصويب الخطأ: "${q.question}"
                    </div>
                    ${includeAnswers ? `
                      <div class="answer-box" style="background: #f0fdf4; border: 1.5pt solid #86efac; border-radius: 6pt; padding: 10pt 14pt; margin-top: 10pt; font-size: 12pt; color: #14532d;">
                        <div style="font-weight: 800; color: #166534; margin-bottom: 4pt; font-size: 12.5pt;">
                          ✅ النتيجة: ${q.isTrue !== undefined ? (q.isTrue ? 'العبارة صحيحة (✓)' : 'العبارة خاطئة (✗)') : (q.correctAnswer || '')}
                        </div>
                        <div><strong>التعليل والتصويب الوزاري:</strong> ${q.correctAnswer || q.explanation}</div>
                        ${q.systematicJustification ? `<div style="font-size: 11pt; margin-top: 4pt; color: #166534;"><strong>التبرير المنهجي:</strong> ${q.systematicJustification}</div>` : ''}
                      </div>
                    ` : `
                      <div style="margin: 8pt 0; font-size: 12pt; font-weight: bold;">
                        [ &nbsp; ] صواب &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [ &nbsp; ] خطأ
                      </div>
                      <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                      <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                    `}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${selectedParts.short_essay && essayQuestions.length ? `
              <div class="part-block" style="margin-bottom: 22pt;">
                <h2 style="color: #92400e; background: #fffbeb; padding: 8pt 14pt; border-radius: 6pt; border-right: 5pt solid #d97706; margin-bottom: 14pt; font-size: 16pt;">
                  الجزء الثالث: الأسئلة المقالية التحليلية المركزة (${essayQuestions.length} أسئلة)
                </h2>
                ${essayQuestions.map((q, idx) => `
                  <div class="question-card" style="border: 1pt solid #cbd5e1; border-radius: 8pt; padding: 14pt 16pt; margin-bottom: 16pt; background: #ffffff; page-break-inside: avoid;">
                    <div class="question-header" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1pt dotted #e2e8f0; padding-bottom: 4pt; margin-bottom: 6pt;">
                      <div>
                        <span style="background: #1e3a8a; color: white; font-weight: bold; font-size: 10.5pt; padding: 2pt 8pt; border-radius: 4pt; margin-left: 6pt;">س ${idx + 1}</span>
                        <span style="font-size: 10.5pt; color: #64748b;">[الدرس: ${q.lessonTitle}]</span>
                      </div>
                      <span style="font-size: 10.5pt; font-weight: bold; color: #1e3a8a; background: #e0f2fe; padding: 2pt 8pt; border-radius: 4pt;">[الدرجة المقدرة: ${q.rubricScore || 3} درجات]</span>
                    </div>
                    <div class="question-text" style="font-size: 13pt; font-weight: bold; color: #0f172a; margin: 8pt 0 10pt 0; line-height: 1.7;">
                      ${idx + 1}. ${q.question}
                    </div>
                    ${includeAnswers ? `
                      <div class="answer-box" style="background: #f0fdf4; border: 1.5pt solid #86efac; border-radius: 6pt; padding: 10pt 14pt; margin-top: 10pt; font-size: 12pt; color: #14532d;">
                        <div style="font-weight: 800; color: #166534; margin-bottom: 4pt; font-size: 12.5pt;">✅ الإجابة النموذجية ودليل التصحيح:</div>
                        <div style="line-height: 1.7;">${q.correctAnswer}</div>
                        ${q.systematicJustification ? `<div style="font-size: 11pt; margin-top: 4pt; color: #166534;"><strong>التبرير المنهجي:</strong> ${q.systematicJustification}</div>` : ''}
                      </div>
                    ` : `
                      <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                      <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                      <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                    `}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${selectedParts.calculation && calcQuestions.length ? `
              <div class="part-block" style="margin-bottom: 22pt;">
                <h2 style="color: #92400e; background: #fffbeb; padding: 8pt 14pt; border-radius: 6pt; border-right: 5pt solid #d97706; margin-bottom: 14pt; font-size: 16pt;">
                  الجزء الرابع: المسائل الحسابية والتطبيقات الرقمية (${calcQuestions.length} مسائل)
                </h2>
                ${calcQuestions.map((q, idx) => `
                  <div class="question-card" style="border: 1pt solid #cbd5e1; border-radius: 8pt; padding: 14pt 16pt; margin-bottom: 16pt; background: #ffffff; page-break-inside: avoid;">
                    <div class="question-header" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1pt dotted #e2e8f0; padding-bottom: 4pt; margin-bottom: 6pt;">
                      <div>
                        <span style="background: #1e3a8a; color: white; font-weight: bold; font-size: 10.5pt; padding: 2pt 8pt; border-radius: 4pt; margin-left: 6pt;">مسألة ${idx + 1}</span>
                      </div>
                      <span style="font-size: 10.5pt; font-weight: bold; color: #047857; background: #dcfce7; padding: 2pt 8pt; border-radius: 4pt;">تطبيق مالي وقانوني</span>
                    </div>
                    <div class="question-text" style="font-size: 13pt; font-weight: bold; color: #0f172a; margin: 8pt 0 10pt 0; line-height: 1.7;">
                      ${idx + 1}. ${q.question}
                    </div>
                    ${includeAnswers ? `
                      <div class="answer-box" style="background: #f0fdf4; border: 1.5pt solid #86efac; border-radius: 6pt; padding: 10pt 14pt; margin-top: 10pt; font-size: 12pt; color: #14532d;">
                        <div style="font-weight: 800; color: #166534; margin-bottom: 4pt; font-size: 12.5pt;">✅ خطوات الحل الرياضي والنتيجة:</div>
                        <div style="white-space: pre-line; line-height: 1.7;">${q.correctAnswer}</div>
                        ${q.reasoningPath ? `<div style="font-size: 11pt; margin-top: 4pt; color: #047857;"><strong>مسار الاستدلال الرقمي:</strong> ${q.reasoningPath}</div>` : ''}
                      </div>
                    ` : `
                      <div style="border: 1pt dashed #94a3b8; border-radius: 6pt; background: #fafaf9; height: 65px; margin-top: 10pt; display: flex; align-items: center; justify-content: center; color: #78716c; font-size: 11pt;">
                        مسودة خطوات الحل الحسابي وتطبيق القانون
                      </div>
                    `}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${selectedParts.case_study && caseQuestions.length ? `
              <div class="part-block" style="margin-bottom: 22pt;">
                <h2 style="color: #92400e; background: #fffbeb; padding: 8pt 14pt; border-radius: 6pt; border-right: 5pt solid #d97706; margin-bottom: 14pt; font-size: 16pt;">
                  الجزء الخامس: دراسات الحالة والربط بالواقع المصري (${caseQuestions.length} حالات)
                </h2>
                ${caseQuestions.map((q, idx) => `
                  <div class="question-card" style="border: 1pt solid #cbd5e1; border-radius: 8pt; padding: 14pt 16pt; margin-bottom: 16pt; background: #ffffff; page-break-inside: avoid;">
                    <div class="question-header" style="border-bottom: 1pt dotted #e2e8f0; padding-bottom: 4pt; margin-bottom: 6pt;">
                      <span style="background: #1e3a8a; color: white; font-weight: bold; font-size: 10.5pt; padding: 2pt 8pt; border-radius: 4pt; margin-left: 6pt;">دراسة حالة ${idx + 1}</span>
                    </div>
                    <div class="question-text" style="font-size: 13pt; font-weight: bold; color: #0f172a; margin: 8pt 0 10pt 0; line-height: 1.75;">
                      ${idx + 1}. ${q.question}
                    </div>
                    ${includeAnswers ? `
                      <div class="answer-box" style="background: #f0fdf4; border: 1.5pt solid #86efac; border-radius: 6pt; padding: 10pt 14pt; margin-top: 10pt; font-size: 12pt; color: #14532d;">
                        <div style="font-weight: 800; color: #166534; margin-bottom: 4pt; font-size: 12.5pt;">✅ التحليل الإداري والتوصية الاستراتيجية:</div>
                        <div style="line-height: 1.7;">${q.correctAnswer}</div>
                      </div>
                    ` : `
                      <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                      <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                      <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                    `}
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${selectedParts.jre && jreQuestions.length ? `
              <div class="part-block" style="margin-bottom: 22pt;">
                <h2 style="color: #92400e; background: #fffbeb; padding: 8pt 14pt; border-radius: 6pt; border-right: 5pt solid #d97706; margin-bottom: 14pt; font-size: 16pt;">
                  الجزء السادس: مختبر الحكم والاستدلال الاستراتيجي JRE سلم الـ 20 درجة (${jreQuestions.length} أسئلة)
                </h2>
                ${jreQuestions.map((q, idx) => `
                  <div class="question-card" style="border: 1.5pt solid #d97706; border-radius: 8pt; padding: 14pt 16pt; margin-bottom: 18pt; background: #ffffff; page-break-inside: avoid;">
                    <div class="question-header" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1pt dotted #e2e8f0; padding-bottom: 4pt; margin-bottom: 6pt;">
                      <div>
                        <span style="background: #b45309; color: white; font-weight: 800; font-size: 10.5pt; padding: 2pt 8pt; border-radius: 4pt; margin-left: 6pt;">سؤال استدلال ${idx + 1}</span>
                      </div>
                      <span style="font-size: 10.5pt; font-weight: 900; color: #b45309; background: #fef3c7; padding: 2pt 8pt; border-radius: 4pt;">[وزاري: 20 درجة • مقسمة خماسياً]</span>
                    </div>
                    <div class="question-text" style="font-size: 13.5pt; font-weight: bold; color: #0f172a; margin: 8pt 0 10pt 0; line-height: 1.75;">
                      ${idx + 1}. ${q.question}
                    </div>
                    ${includeAnswers ? `
                      <div class="answer-box" style="background: #f0fdf4; border: 1.5pt solid #86efac; border-radius: 6pt; padding: 12pt 16pt; margin-top: 10pt; font-size: 12pt; color: #14532d;">
                        <div style="font-weight: 800; color: #166534; margin-bottom: 6pt; font-size: 13pt;">✅ الإجابة النموذجية المعيارية المقسمة وفق عناصر الـ 20 درجة:</div>
                        ${q.modelAnswerDetails ? `
                          <ul style="margin: 6pt 0; padding-right: 18pt; line-height: 1.8;">
                            ${q.modelAnswerDetails.map(detail => `<li>${detail}</li>`).join('')}
                          </ul>
                        ` : `<div style="line-height: 1.7;">${q.correctAnswer}</div>`}
                      </div>
                    ` : `
                      <div style="border: 1pt dashed #cbd5e1; padding: 10pt; border-radius: 6pt; margin-top: 8pt; font-size: 11.5pt; color: #64748b; background: #f8fafc;">
                        <strong>عناصر التقييم الخمسة (4 درجات لكل عنصر):</strong><br/>
                        (1) الحكم الصريح • (2) التبرير السببي • (3) الدليل من واقع الحالة • (4) الحجة المقابلة والرد عليها • (5) الاستنتاج المشروط.
                      </div>
                      <div style="border-bottom: 1pt dotted #94a3b8; height: 22px; margin-top: 8px;"></div>
                      <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                      <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                      <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                      <div style="border-bottom: 1pt dotted #94a3b8; height: 22px;"></div>
                    `}
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
          <div class="page-break" style="page-break-after: always;"></div>
        `;
      });
    }

    else if (selectedBook === 'teacher_guide') {
      const tg = TEACHER_GUIDE_DATA;
      html += `
        <div class="unit-section" style="margin-bottom: 30pt;">
          <div class="unit-title-bar" style="border-bottom: 3pt solid #be123c; padding-bottom: 8pt; margin-bottom: 16pt;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4pt;">
              <span style="background: #be123c; color: white; padding: 3pt 12pt; border-radius: 6pt; font-weight: 800; font-size: 12pt;">وثيقة المعلم والتوجيه</span>
              <span style="font-size: 11pt; color: #64748b;">العام الدراسي 2026 / 2027</span>
            </div>
            <h1 style="color: #be123c; margin: 4pt 0 6pt 0; font-size: 22pt;">دليل المعلم والتخطيط البيداغوجي الشامل</h1>
            <div style="font-size: 12pt; color: #475569; font-weight: bold;">
              الرؤية البيداغوجية، خطة الـ 32 أسبوعاً للوحدات العشر، مصفوفة توزيع الدرجات، وروبرك الـ 20 درجة
            </div>
          </div>

          <!-- الفلسفة التربوية -->
          <div style="background: #fff1f2; border: 1pt solid #fecdd3; border-right: 4pt solid #e11d48; border-radius: 8pt; padding: 12pt 16pt; margin-bottom: 16pt;">
            <h3 style="color: #9f1239; margin: 0 0 6pt 0; font-size: 13.5pt;">💡 فلسفة المنهج ورؤية البكالوريا المصرية 2027:</h3>
            <p style="margin: 0; font-size: 12pt; color: #881337; line-height: 1.75;">${tg.curriculumOverview}</p>
          </div>

          <!-- مصفوفة الدرجات -->
          <div style="margin-bottom: 20pt;">
            <h3 style="color: #0f172a; margin-bottom: 8pt; font-size: 14pt;">📊 مصفوفة توزيع الدرجات المعتمدة (الاختبار الفصلي وأعمال السنة):</h3>
            <table class="rubric-table" style="width: 100%; border-collapse: collapse; font-size: 11.5pt;">
              <thead>
                <tr style="background: #f1f5f9;">
                  <th style="border: 1pt solid #cbd5e1; padding: 7pt 10pt; text-align: right;">بند التقييم</th>
                  <th style="border: 1pt solid #cbd5e1; padding: 7pt 10pt; text-align: center; width: 15%;">الوزن النسبي / الدرجة</th>
                  <th style="border: 1pt solid #cbd5e1; padding: 7pt 10pt; text-align: right;">آلية التوثيق والضوابط</th>
                </tr>
              </thead>
              <tbody>
                ${tg.gradeDistribution.map(item => `
                  <tr>
                    <td style="border: 1pt solid #cbd5e1; padding: 7pt 10pt; font-weight: bold;">${item.component}</td>
                    <td style="border: 1pt solid #cbd5e1; padding: 7pt 10pt; text-align: center; font-weight: bold; color: #be123c;">${item.weight}</td>
                    <td style="border: 1pt solid #cbd5e1; padding: 7pt 10pt; color: #475569;">${item.description}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- الخطة التدريسية 32 أسبوعاً -->
          <div style="margin-bottom: 20pt;">
            <h3 style="color: #0f172a; margin-bottom: 8pt; font-size: 14pt;">📅 الخطة الزمنية لتوزيع المنهج (32 أسبوعاً تدريسياً للوحدات 1-10):</h3>
            <table class="rubric-table" style="width: 100%; border-collapse: collapse; font-size: 11pt;">
              <thead>
                <tr style="background: #f1f5f9;">
                  <th style="border: 1pt solid #cbd5e1; padding: 6pt 8pt; text-align: center; width: 10%;">الأسبوع</th>
                  <th style="border: 1pt solid #cbd5e1; padding: 6pt 8pt; text-align: right;">الوحدة والموضوع</th>
                  <th style="border: 1pt solid #cbd5e1; padding: 6pt 8pt; text-align: right;">استراتيجية التدريس المقترحة</th>
                </tr>
              </thead>
              <tbody>
                ${tg.weeklyPlans.map(plan => `
                  <tr>
                    <td style="border: 1pt solid #cbd5e1; padding: 6pt 8pt; text-align: center; font-weight: bold;">أسبوع ${plan.weekNumber}</td>
                    <td style="border: 1pt solid #cbd5e1; padding: 6pt 8pt;">
                      <strong>الوحدة ${plan.unitNumber}:</strong> ${plan.lessonTitle}
                    </td>
                    <td style="border: 1pt solid #cbd5e1; padding: 6pt 8pt; color: #475569;">${(plan.activeStrategies || []).join('، ')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- روبرك تصحيح سؤال JRE الـ 20 درجة -->
          <div style="margin-bottom: 20pt;">
            <h3 style="color: #0f172a; margin-bottom: 8pt; font-size: 14pt;">⚖️ روبرك التصحيح الوزاري المعتمد لسؤال الاستدلال JRE (20 درجة):</h3>
            <table class="rubric-table" style="width: 100%; border-collapse: collapse; font-size: 10.5pt;">
              <thead>
                <tr style="background: #f1f5f9;">
                  <th style="border: 1pt solid #cbd5e1; padding: 6pt 8pt; text-align: right; width: 22%;">المعيار (الوزن)</th>
                  <th style="border: 1pt solid #cbd5e1; padding: 6pt 8pt; text-align: right;">متميز (4 درجات)</th>
                  <th style="border: 1pt solid #cbd5e1; padding: 6pt 8pt; text-align: right;">متوسط (2.5 درجة)</th>
                  <th style="border: 1pt solid #cbd5e1; padding: 6pt 8pt; text-align: right;">مبتدئ (1 درجة)</th>
                </tr>
              </thead>
              <tbody>
                ${tg.jreGradingGuide.map(r => `
                  <tr>
                    <td style="border: 1pt solid #cbd5e1; padding: 6pt 8pt; font-weight: bold; background: #fafafa;">${r.criterion} (${r.points} درجات)</td>
                    <td style="border: 1pt solid #cbd5e1; padding: 6pt 8pt; color: #166534;">${r.performanceDescriptors.excellent}</td>
                    <td style="border: 1pt solid #cbd5e1; padding: 6pt 8pt; color: #854d0e;">${r.performanceDescriptors.competent}</td>
                    <td style="border: 1pt solid #cbd5e1; padding: 6pt 8pt; color: #991b1b;">${r.performanceDescriptors.needsImprovement}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <!-- بنك معالجة المفاهيم المغلوطة -->
          <div style="margin-bottom: 20pt;">
            <h3 style="color: #0f172a; margin-bottom: 8pt; font-size: 14pt;">🛠️ بنك معالجة المفاهيم المغلوطة والشائعة لدى الطلاب:</h3>
            <div style="display: grid; grid-template-columns: 1fr; gap: 10px;">
              ${tg.misconceptions.map((m, mIdx) => `
                <div style="background: #ffffff; border: 1pt solid #cbd5e1; border-radius: 6pt; padding: 10pt 14pt;">
                  <div style="font-weight: bold; color: #dc2626; margin-bottom: 4pt; font-size: 11.5pt;">
                    ❌ الاعتقاد الخاطئ [${mIdx + 1}]: ${m.misconception}
                  </div>
                  <div style="color: #16a34a; font-weight: bold; margin-bottom: 4pt; font-size: 11.5pt;">
                    ✅ الحقيقة العلمية: ${m.correctScientificConcept}
                  </div>
                  <div style="color: #475569; font-size: 11pt; background: #f8fafc; padding: 4pt 8pt; border-radius: 4pt;">
                    <strong>التدخل البيداغوجي المقترح:</strong> ${m.pedagogicalIntervention}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- مساعد التعلم البيداغوجي: إجابات وتوجيهات المحطات الـ 17 لجميع دروس الوحدة -->
          <div style="margin-top: 24pt; border-top: 2pt solid #cbd5e1; padding-top: 16pt;">
            <div style="background: #eef2ff; border: 1.5pt solid #c7d2fe; border-right: 5pt solid #4338ca; border-radius: 8pt; padding: 14pt 18pt; margin-bottom: 18pt;">
              <h3 style="color: #312e81; margin: 0 0 6pt 0; font-size: 16pt; font-weight: 900;">
                👨‍🏫 مساعد التعلم والتوجيه التربوي: بنك إجابات وتوجيهات المحطات الـ 17 الشامل
              </h3>
              <p style="margin: 0; font-size: 11pt; color: #3730a3; line-height: 1.7; text-align: justify;">
                مرجع استدلالي وإرشادي خاص بالمعلم فقط لكافة محطات الوحدة؛ يشتمل على التساؤلات الصفية، والإجابات النموذجية المعتمدة، وتوجيهات إدارة الحوار الصفي، وتصويب المفاهيم المغلوطة ونواتج التعلم المستهدفة طبقاً لمستويات بلوم المعرفية.
              </p>
            </div>

            ${(currentUnit.lessons || []).map(lesson => {
              const guideList = lesson.teacherStationsGuide || getTeacherStationsGuideForLesson(lesson.id, lesson.lessonNumber, currentUnit.number) || (lesson.id === 'u1-l1' || (currentUnit.number === 1 && lesson.lessonNumber === 1) ? UNIT1_LESSON1_TEACHER_STATIONS_GUIDE : undefined);
              if (!guideList || guideList.length === 0) return '';

              return `
                <div style="margin-bottom: 24pt; border: 1.5pt solid #e0e7ff; border-radius: 10pt; padding: 14pt 18pt; background: #ffffff; page-break-before: auto;">
                  <div style="background: #312e81; color: #ffffff; border-radius: 8pt; padding: 10pt 16pt; margin-bottom: 14pt; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <span style="font-size: 11pt; opacity: 0.9; display: block;">الدرس ${lesson.lessonNumber}: ${lesson.title}</span>
                      <strong style="font-size: 13pt;">دليل إجابات وتوجيهات المحطات الـ 17 — التوجيه التربوي الصفي</strong>
                    </div>
                    <span style="background: rgba(255,255,255,0.2); padding: 4pt 10pt; border-radius: 6pt; font-size: 10pt; font-weight: bold;">
                      17 محطة كاملة
                    </span>
                  </div>

                  <div style="display: flex; flex-direction: column; gap: 14pt;">
                    ${guideList.map(g => `
                      <div style="border: 1pt solid #cbd5e1; border-radius: 8pt; padding: 12pt 16pt; background: #ffffff; page-break-inside: avoid; margin-bottom: 10pt;">
                        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1pt solid #e2e8f0; padding-bottom: 6pt; margin-bottom: 8pt;">
                          <span style="font-weight: 900; color: #1e3a8a; font-size: 12pt;">
                            المحطة ${g.stationNumber}: ${g.stationName}
                          </span>
                          <span style="font-size: 9pt; background: #f1f5f9; color: #475569; padding: 2pt 6pt; border-radius: 4pt; font-weight: bold;">
                            ${g.pedagogicalObjective}
                          </span>
                        </div>

                        <div style="background: #f8fafc; border-right: 3.5pt solid #64748b; padding: 6pt 10pt; border-radius: 4pt; margin-bottom: 8pt;">
                          <strong style="color: #0f172a; font-size: 10pt;">❓ التساؤل الصفي المطروح:</strong>
                          <p style="margin: 3pt 0 0 0; font-size: 10.5pt; color: #1e293b; font-weight: bold;">« ${g.inquiry} »</p>
                        </div>

                        <div style="background: #f0fdf4; border: 1pt solid #bbf7d0; border-right: 3.5pt solid #16a34a; padding: 8pt 12pt; border-radius: 6pt; margin-bottom: 8pt;">
                          <strong style="color: #166534; font-size: 10.5pt;">✅ الإجابة النموذجية والاستدلالية المعتمدة:</strong>
                          <p style="margin: 4pt 0 0 0; font-size: 10.5pt; color: #0f172a; line-height: 1.75; text-align: justify; white-space: pre-line;">${g.modelAnswer}</p>
                        </div>

                        <div style="background: #fffbeb; border: 1pt solid #fef3c7; border-right: 3.5pt solid #d97706; padding: 6pt 10pt; border-radius: 4pt; margin-bottom: 8pt;">
                          <strong style="color: #92400e; font-size: 10pt;">🎯 توجيهات المعلم لإدارة الحوار الصفي:</strong>
                          <p style="margin: 3pt 0 0 0; font-size: 10pt; color: #78350f; line-height: 1.65; text-align: justify;">${g.teacherGuidance}</p>
                        </div>

                        ${g.commonMistakesToAddress ? `
                          <div style="background: #fff1f2; border: 1pt solid #fecdd3; border-right: 3.5pt solid #e11d48; padding: 6pt 10pt; border-radius: 4pt;">
                            <strong style="color: #9f1239; font-size: 10pt;">⚠️ التنبيه للأخطاء الشائعة وطريقة علاجها صفيًا:</strong>
                            <p style="margin: 3pt 0 0 0; font-size: 10pt; color: #881337; line-height: 1.65; text-align: justify;">${g.commonMistakesToAddress}</p>
                          </div>
                        ` : ''}
                      </div>
                    `).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    return html;
  }, [selectedBook, scope, currentUnit, selectedUnitNumber, includeAnswers, selectedParts]);

  // Export Handlers
  const handleExportWord = () => {
    const currentBook = BOOKS_METADATA.find(b => b.id === selectedBook) || BOOKS_METADATA[0];
    const exportTitle = scope === 'all_units'
      ? `${currentBook.title} — المنهج الكامل (الوحدات 1-10)`
      : `${currentBook.title} — الوحدة ${selectedUnitNumber} (${currentUnit.title})`;

    const exportOptions: ExportDocumentOptions = {
      title: exportTitle,
      subtitle: currentBook.subtitle,
      bookType: selectedBook,
      unitNumber: scope === 'all_units' ? 0 : selectedUnitNumber,
      unitTitle: scope === 'all_units' ? 'المنهج الكامل (الوحدات 1 - 10)' : `الوحدة ${selectedUnitNumber}: ${currentUnit.title}`,
      includeAnswers,
      schoolName,
      teacherName,
      studentName,
      academicYear,
      contentHtml: generateBookContentHtml
    };

    downloadAsWordDocument(exportOptions);
  };

  const handlePrintPdf = () => {
    const currentBook = BOOKS_METADATA.find(b => b.id === selectedBook) || BOOKS_METADATA[0];
    const exportTitle = scope === 'all_units'
      ? `${currentBook.title} — المنهج الكامل (الوحدات 1-10)`
      : `${currentBook.title} — الوحدة ${selectedUnitNumber} (${currentUnit.title})`;

    const exportOptions: ExportDocumentOptions = {
      title: exportTitle,
      subtitle: currentBook.subtitle,
      bookType: selectedBook,
      unitNumber: scope === 'all_units' ? 0 : selectedUnitNumber,
      unitTitle: scope === 'all_units' ? 'المنهج الكامل (الوحدات 1 - 10)' : `الوحدة ${selectedUnitNumber}: ${currentUnit.title}`,
      includeAnswers,
      schoolName,
      teacherName,
      studentName,
      academicYear,
      contentHtml: generateBookContentHtml
    };

    printDocumentAsPdf(exportOptions);
  };

  const currentBookInfo = BOOKS_METADATA.find(b => b.id === selectedBook) || BOOKS_METADATA[0];

  // Font styling class based on user selection
  const fontClass = {
    alexandria: "font-['Alexandria',sans-serif]",
    cairo: "font-['Cairo',sans-serif]",
    tajawal: "font-['Tajawal',sans-serif]",
    amiri: "font-['Amiri',serif]",
    readex: "font-['Readex_Pro',sans-serif]"
  }[bookFont];

  // Font size class for preview
  const fontSizeClass = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl"
  }[readerFontSize];

  // Theme class for preview reader
  const themeContainerClass = {
    classic: "bg-white text-slate-900 border-slate-200",
    sepia: "bg-[#fcfaf5] text-[#292524] border-[#e7e2d7] shadow-inner",
    dark: "bg-[#0b1329] text-[#f1f5f9] border-slate-800"
  }[readerTheme];

  const themePageClass = {
    classic: "bg-white text-slate-900 border-slate-200 shadow-md",
    sepia: "bg-[#fffdf9] text-[#292524] border-[#ebe5d8] shadow-md",
    dark: "bg-[#111c38] text-[#f1f5f9] border-slate-700 shadow-xl"
  }[readerTheme];

  return (
    <div className={`space-y-6 pb-16 ${fontClass}`}>
      
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white p-6 sm:p-8 border border-amber-500/20 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مكتبة الكتب الشاملة وتصدير الوثائق والمذكرات الفاخرة</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              مكتبة رواد الأعمال — مظهر وإخراج الكتب والمذكرات النموذجية المتكاملة
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              إصدارات مطبوعة ورقمية مصممة بأعلى معايير الإخراج التربوي الحديث لمرحلة البكالوريا. تتيح طباعة وتصدير الوحدة الشاملة أو الكتب التخصصية لكامل المنهج، مع التخصيص الكامل للبيانات والتصدير الفوري لـ <strong>Microsoft Word</strong> و <strong>PDF</strong>.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col items-center sm:items-end gap-3 shrink-0">
            <button
              onClick={handleExportWord}
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-blue-900/30 active:scale-95 transition-all cursor-pointer border border-blue-400/30"
              title="تنزيل المستند بصيغة Word (.doc)"
            >
              <Download className="w-4 h-4" />
              <span>تصدير إلى Word (.doc)</span>
            </button>

            <button
              onClick={handlePrintPdf}
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-900/20 active:scale-95 transition-all cursor-pointer border border-amber-300/40"
              title="طباعة أو تصدير PDF فوري"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة / حفظ كـ PDF</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -top-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Main Library Shelf Grid — Master Books & Comprehensive Unit */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-black text-slate-900">رفوف المكتبة الشاملة (اختر الإصدار أو الملزمة للعرض والطباعة)</h2>
          </div>
          <span className="text-xs text-slate-500 font-bold">{BOOKS_METADATA.length} إصدارات ومؤلفات معتمدة متكاملة</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {BOOKS_METADATA.map((book) => {
            const Icon = book.icon;
            const isSelected = selectedBook === book.id;

            return (
              <div
                key={book.id}
                onClick={() => setSelectedBook(book.id)}
                className={`relative group rounded-3xl p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-white border-amber-500 ring-4 ring-amber-400/20 shadow-xl -translate-y-1'
                    : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {/* Book Spine Badge */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${book.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${book.badgeColor}`}>
                      {book.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-black text-base text-slate-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1 leading-relaxed">
                      {book.subtitle}
                    </p>
                  </div>
                </div>

                {/* Footer of card */}
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="font-bold text-slate-800">{book.pagesCount}</span>
                  <span className={`font-black flex items-center gap-1 ${isSelected ? 'text-amber-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                    {isSelected ? 'الكتاب المعروض' : 'اختيار'}
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Selected indicator ribbon */}
                {isSelected && (
                  <div className="absolute top-2 left-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Control & Customization Panel */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-amber-600" />
            <h3 className="font-black text-slate-900 text-lg">خيارات وإعدادات التصدير والطباعة</h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportWord}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-bold text-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تصدير Word الآن</span>
            </button>
            <button
              onClick={handlePrintPdf}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 font-bold text-xs transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة / PDF</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Unit Scope */}
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1.5">
              نطاق المحتوى المراد تصديره:
            </label>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="current_unit">الوحدة المحددة فقط (الوحدة {selectedUnitNumber})</option>
              <option value="all_units">المنهج كاملاً (جميع الوحدات العشر 1 - 10)</option>
            </select>
          </div>

          {/* Teacher vs Student Mode */}
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1.5">
              نوع النسخة (الإجابات والحلول):
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIncludeAnswers(true)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer text-center ${
                  includeAnswers
                    ? 'bg-amber-500 border-amber-600 text-slate-950 font-black shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                نسخة المعلم (مجابة)
              </button>
              <button
                type="button"
                onClick={() => setIncludeAnswers(false)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer text-center ${
                  !includeAnswers
                    ? 'bg-amber-500 border-amber-600 text-slate-950 font-black shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                نسخة الطالب (تدريب)
              </button>
            </div>
          </div>

          {/* School Name Branding */}
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1.5">
              اسم المدرسة / الإدارة (للغلاف):
            </label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="مدرسة : ................................. الثانوية"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
            </input>
          </div>

          {/* Teacher Name */}
          <div>
            <label className="block text-xs font-black text-slate-700 mb-1.5">
              اسم المعلم / واضع المذكرة:
            </label>
            <input
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="الأستاذ / أحمد خضر"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
            </input>
          </div>
        </div>

        {/* Extra options for Question Bank: Parts Selector */}
        {selectedBook === 'question_bank' && (
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <span className="text-xs font-black text-slate-700 block">
              أجزاء بنك الأسئلة المراد تضمينها في الملف:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {[
                { key: 'mcq', label: '1. الاختيار من متعدد' },
                { key: 'true_false', label: '2. صواب وخطأ مع التعليل' },
                { key: 'short_essay', label: '3. المقال التحليلي' },
                { key: 'calculation', label: '4. المسائل الحسابية' },
                { key: 'case_study', label: '5. دراسات الحالة' },
                { key: 'jre', label: '6. استدلال JRE الـ 20 درجة' }
              ].map(part => {
                const isChecked = selectedParts[part.key as keyof typeof selectedParts];
                return (
                  <button
                    key={part.key}
                    type="button"
                    onClick={() => setSelectedParts(prev => ({ ...prev, [part.key]: !prev[part.key as keyof typeof prev] }))}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                    }`}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 ${isChecked ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span>{part.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Quick Print Single Comprehensive Unit Card */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 rounded-3xl p-5 sm:p-6 text-white border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
                <Printer className="w-3.5 h-3.5" />
                طباعة ملزمة الوحدة المتكاملة (All-In-One)
              </span>
              <span className="bg-white/10 text-amber-200 font-bold text-xs px-2.5 py-0.5 rounded-full border border-white/10">
                الوحدة {selectedUnitNumber}: {currentUnit.title}
              </span>
            </div>
            
            <h3 className="text-lg sm:text-xl font-black font-['Cairo'] text-white">
              طباعة وتصدير الوحدة {selectedUnitNumber} بجميع مشتملاتها في ملف واحد موحد
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              توليد ملزمة دراسية متكاملة للوحدة تشمل فورياً: الشرح المفاهيمي المترابط ومحطات الدرس + حلول وتدريبات كتاب الوزارة + الأداءات ونماذج التقييم الأسبوعي + بنك الأسئلة المتدرج وفق معايير المركز القومي للتقويم التربوي.
            </p>

            {/* Content Pills */}
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-bold text-amber-100">
              <span className="bg-black/30 px-2.5 py-1 rounded-lg border border-amber-500/20">📘 1. الشرح والمحطات الـ 17</span>
              <span className="bg-black/30 px-2.5 py-1 rounded-lg border border-amber-500/20">📗 2. أسئلة كتاب الوزارة</span>
              <span className="bg-black/30 px-2.5 py-1 rounded-lg border border-amber-500/20">📝 3. نماذج التقييمات الأسبوعية</span>
              <span className="bg-black/30 px-2.5 py-1 rounded-lg border border-amber-500/20">🎯 4. بنك الأسئلة ومختبر JRE</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => {
                setSelectedBook('comprehensive_unit');
                setScope('current_unit');
                setTimeout(() => handlePrintPdf(), 150);
              }}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-950/40 transition-all active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-950" />
              <span>طباعة ملزمة الوحدة {selectedUnitNumber} الآن (PDF)</span>
            </button>

            <button
              onClick={() => {
                setSelectedBook('comprehensive_unit');
                setScope('current_unit');
                setTimeout(() => handleExportWord(), 150);
              }}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تصدير الملزمة الشاملة كـ Word (.doc)</span>
            </button>
          </div>
        </div>

        {/* Subtle background glow */}
        <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Book Live Preview Window with Interactive External Textbook Reader */}
      <div className={`rounded-3xl border shadow-lg overflow-hidden transition-all duration-300 ${themeContainerClass}`}>
        
        {/* Reader Top Master Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${currentBookInfo.color} flex items-center justify-center text-white shadow-md shrink-0`}>
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-extrabold text-base text-white">معاينة الكتاب الخارجي التفاعلي</h4>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 font-extrabold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  {includeAnswers ? 'نسخة المعلم المعتمدة' : 'نسخة تدريب الطالب'}
                </span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 font-bold px-2 py-0.5 rounded-full border border-blue-400/30">
                  {scope === 'all_units' ? 'المنهج الكامل (1 - 10)' : `الوحدة ${selectedUnitNumber}`}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {currentBookInfo.title}
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleExportWord}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all active:scale-95 shadow-md cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل Word</span>
            </button>
            <button
              onClick={handlePrintPdf}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all active:scale-95 shadow-md cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة PDF</span>
            </button>
          </div>
        </div>

        {/* Professional External Textbook Reading Toolbar (شريط أدوات الكتاب الخارجي الفاخر) */}
        <div className="bg-slate-800 text-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-700/80">
          
          {/* Font Family Switcher */}
          <div className="flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-slate-400 font-bold shrink-0">الخط:</span>
            <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-700">
              {[
                { key: 'alexandria', label: 'الإسكندرية (كتاب خارجي)' },
                { key: 'cairo', label: 'القاهرة' },
                { key: 'tajawal', label: 'تجوال' },
                { key: 'amiri', label: 'النسخ الأميري' },
                { key: 'readex', label: 'ريدكس' }
              ].map(f => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setBookFont(f.key as BookFont)}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                    bookFont === f.key
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Font Size Scaler */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-bold">الحجم:</span>
            <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-700">
              {[
                { key: 'sm', label: 'A-' },
                { key: 'base', label: '100%' },
                { key: 'lg', label: 'A+' },
                { key: 'xl', label: 'A++' }
              ].map(sz => (
                <button
                  key={sz.key}
                  type="button"
                  onClick={() => setReaderFontSize(sz.key as ReaderFontSize)}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                    readerFontSize === sz.key
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {sz.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reader Theme */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-bold">نمط الورق:</span>
            <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-700">
              <button
                type="button"
                onClick={() => setReaderTheme('classic')}
                title="ورق كلاسيكي أبيض"
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                  readerTheme === 'classic'
                    ? 'bg-white text-slate-900'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Sun className="w-3 h-3 text-amber-500" />
                <span>أبيض</span>
              </button>
              <button
                type="button"
                onClick={() => setReaderTheme('sepia')}
                title="ورق كتب فاخر بيج كريمي"
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                  readerTheme === 'sepia'
                    ? 'bg-[#fcfaf5] text-[#78350f]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Coffee className="w-3 h-3 text-amber-700" />
                <span>كريمي فاخر</span>
              </button>
              <button
                type="button"
                onClick={() => setReaderTheme('dark')}
                title="وضع القراءة الليلي المريح"
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                  readerTheme === 'dark'
                    ? 'bg-slate-950 text-amber-400'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Moon className="w-3 h-3 text-indigo-400" />
                <span>ليلي</span>
              </button>
            </div>
          </div>

          {/* Columns Mode */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-bold">التنسيق:</span>
            <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-700">
              <button
                type="button"
                onClick={() => setColumnsMode('single')}
                title="صفحة واحدة متصلة"
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                  columnsMode === 'single'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Square className="w-3 h-3" />
                <span>كامل</span>
              </button>
              <button
                type="button"
                onClick={() => setColumnsMode('dual')}
                title="عمودان متجاوران للقراءة السريعة والمقارنة المنهجية"
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer ${
                  columnsMode === 'dual'
                    ? 'bg-amber-500 text-slate-950'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Columns className="w-3 h-3" />
                <span>عمودان</span>
              </button>
            </div>
          </div>

          {/* Full Page / Compact Margins Mode Toggle */}
          <button
            type="button"
            onClick={onToggleAutoFillPage}
            title={isAutoFillPage ? "العودة للعرض الافتراضي" : "ملء الصفحة بالكامل وتقليل الهوامش لطباعة وقراءة متسعة"}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
              isAutoFillPage
                ? 'bg-emerald-500 text-slate-950 font-black shadow-sm'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            {isAutoFillPage ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isAutoFillPage ? 'صفحة ممتلئة (هوامش مدمجة)' : 'ملء الصفحة (تقليل الهوامش)'}</span>
          </button>

          {/* Quick Unit Jump */}
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={selectedUnitNumber}
              onChange={(e) => setSelectedUnitNumber(Number(e.target.value))}
              className="bg-slate-900 text-amber-300 border border-slate-700 rounded-lg px-2 py-1 text-[11px] font-bold focus:outline-hidden"
            >
              {ALL_UNITS.map(u => (
                <option key={u.number} value={u.number}>
                  انتقال سريع: الوحدة {u.number}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Render Area with Simulated Commercial Book Cover & Content */}
        <div className={`p-2 sm:p-4 max-h-[850px] overflow-y-auto ${themeContainerClass}`}>
          <div className={`mx-auto rounded-3xl transition-colors border ${
            isAutoFillPage
              ? 'w-full max-w-none p-3 sm:p-6 space-y-6'
              : 'max-w-4xl p-6 sm:p-12 space-y-10'
          } ${themePageClass}`}>
            
            {/* Simulated Commercial External Book Cover (غلاف الكتاب والمذكرة الخارجي الفاخر) */}
            <div className={`relative overflow-hidden rounded-3xl border-4 border-double border-amber-600/80 text-center bg-gradient-to-b from-amber-500/10 via-amber-100/10 to-transparent shadow-md ${
              isAutoFillPage ? 'p-4 sm:p-8' : 'p-8 sm:p-12'
            }`}>
              
              {/* Top Series Ribbon */}
              <div className="flex items-center justify-between border-b border-amber-700/20 pb-3 mb-6 text-xs text-slate-600 font-bold">
                <span>{schoolName}</span>
                <span>العام الدراسي {academicYear}</span>
                <span className="hidden sm:inline">سلسلة رواد الأعمال التعليمية • مادة إدارة الأعمال</span>
              </div>
              
              {/* External Series Ribbon Emblem */}
              <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-slate-900 text-amber-400 font-black text-xs sm:text-sm tracking-wide shadow-md mb-6 border border-amber-500/30">
                <Award className="w-4 h-4 text-amber-400" />
                <span>سلسلة رواد الأعمال التعليمية — كتاب خارجي مطوّر</span>
              </div>
              
              {/* Dynamic Book Title */}
              <h1 className="text-2xl sm:text-4xl font-black text-slate-950 mb-3 tracking-tight">
                {currentBookInfo.title}
              </h1>
              
              <p className="text-sm sm:text-base text-amber-900 font-bold max-w-xl mx-auto mb-6 leading-relaxed">
                {currentBookInfo.subtitle}
              </p>

              {/* Distinction Badges */}
              <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-2xl mx-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold">
                  <Check className="w-3 h-3 text-blue-600" />
                  <span>شرح مفاهيمي مدعوم بالخرائط الذهنية</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>بنك أسئلة متدرج طبقاً لهرم بلوم</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-900 border border-purple-200 text-xs font-bold">
                  <Check className="w-3 h-3 text-purple-600" />
                  <span>تدريب على استدلال JRE الـ 20 درجة</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-900 border border-rose-200 text-xs font-bold">
                  <Check className="w-3 h-3 text-rose-600" />
                  <span>تصويب فخاخ الاختبارات والتقييمات (Exam Traps)</span>
                </span>
              </div>

              {/* Version Pill */}
              <div className="inline-block bg-emerald-600 text-white font-black px-5 py-2 rounded-xl text-xs sm:text-sm shadow-md mb-8">
                {includeAnswers ? 'نسخة المعلم النموذجية (مشفوعة بنماذج الإجابة وسلالم التقدير والتحليل)' : 'نسخة الطالب والتدريب الفصلي (جاهزة للطباعة والاختبارات المنزلية)'}
              </div>

              {/* Metadata Details Table on Cover */}
              <div className="max-w-lg mx-auto border border-amber-900/20 rounded-2xl overflow-hidden text-xs bg-white/90 shadow-xs">
                <div className="grid grid-cols-3 border-b border-amber-900/10 bg-amber-50/50 p-2.5 font-bold text-slate-800">
                  <span>المادة والمستوى</span>
                  <span className="col-span-2 text-right">إدارة الأعمال — الصف الثاني الثانوي (البكالوريا المصرية)</span>
                </div>
                <div className="grid grid-cols-3 border-b border-amber-900/10 p-2.5 text-slate-700 font-medium">
                  <span className="font-bold">نطاق المحتوى</span>
                  <span className="col-span-2 text-right">{scope === 'all_units' ? 'المنهج الكامل (الوحدات 1 - 10)' : `الوحدة ${selectedUnitNumber}: ${currentUnit.title}`}</span>
                </div>
                <div className="grid grid-cols-3 border-b border-amber-900/10 bg-amber-50/50 p-2.5 text-slate-700 font-medium">
                  <span className="font-bold">الإعداد والإشراف</span>
                  <span className="col-span-2 text-right">{teacherName}</span>
                </div>
                <div className="grid grid-cols-3 p-2.5 text-slate-700 font-medium">
                  <span className="font-bold">المواصفة الاختبارية</span>
                  <span className="col-span-2 text-right">مطابق 100% لمواصفات المركز القومي للتقويم التربوي 2026/2027</span>
                </div>
              </div>
            </div>

            {/* Rendered Book Content HTML with Column Mode Support & Text Justification */}
            <div 
              className={`prose prose-slate max-w-none text-right [&_p]:text-justify [&_p]:[text-justify:inter-word] [&_p]:[text-align-last:right] [&_.integrated-stations-stream_p]:text-justify [&_.lesson-block_p]:text-justify ${fontSizeClass} ${
                columnsMode === 'dual' ? 'columns-1 md:columns-2 gap-8 [column-rule:1px_solid_#cbd5e1]' : ''
              }`}
              dangerouslySetInnerHTML={{ __html: generateBookContentHtml }}
            />
          </div>
        </div>

        {/* Reader Footer Actions */}
        <div className="bg-slate-100 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <BookmarkCheck className="w-4 h-4 text-emerald-600" />
            <span>تصميم إخراجي فاخر متوافق مع معايير دور النشر التعليمية الكبرى ومقاسات A4 القياسية.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportWord}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>تنزيل Word (.doc)</span>
            </button>
            <button
              onClick={handlePrintPdf}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة / حفظ كـ PDF</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
