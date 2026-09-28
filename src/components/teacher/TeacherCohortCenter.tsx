import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  TrendingUp, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle2, 
  Brain, 
  Target, 
  FileText, 
  Printer, 
  Send, 
  Calendar, 
  Award, 
  Sparkles, 
  RefreshCw, 
  Sliders, 
  ShieldCheck, 
  Filter, 
  ArrowLeft, 
  Clock, 
  Plus, 
  Search, 
  Check, 
  X,
  BookOpen,
  Activity,
  Layers,
  Building2,
  Star,
  Eye,
  Lightbulb,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';
import { WeeklyCurriculumPacingView } from './WeeklyCurriculumPacingView';
import { TeacherPedagogicalDossier } from './TeacherPedagogicalDossier';
import { availableUnits, getLessonsForUnit } from '../../data/lessonsData';

export type TeacherTab = 'overview' | 'pacing_and_lesson_plans' | 'item_analysis' | 'concept_heatmap' | 'interventions' | 'assignments' | 'inspection_report' | 'capstone_eval';

export interface StudentCohortRecord {
  id: string;
  name: string;
  email: string;
  accuracyRate: number;
  attemptsCount: number;
  completedLessons: number;
  lastActive: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW' | 'EXCELLENT';
  criticalGaps: string[];
  interventionStatus: 'PENDING' | 'PRESCRIPTION_SENT' | 'RESOLVED';
}

export interface ConceptCohortStatus {
  conceptId: string;
  conceptName: string;
  unitTitle: string;
  bloomLevel: 'KNOWLEDGE' | 'APPLICATION' | 'ANALYSIS';
  accuracyRate: number;
  facilityIndex: number;
  totalAttempts: number;
  status: 'MASTERED' | 'STABLE' | 'NEEDS_REINFORCEMENT' | 'CRITICAL_GAP';
  commonDistractorNote: string;
}

export interface PsychometricItemRow {
  id: string;
  code: string;
  conceptName: string;
  unit: string;
  difficulty: 'سهل' | 'متوسط' | 'متقدم' | 'تحدي';
  attempts: number;
  facilityIndex: number; // 0.0 to 1.0 (p-value)
  discriminationIndex: number; // -1.0 to 1.0 (D)
  reliabilityWarning: boolean;
  statusText: string;
  recommendation: string;
}

export interface ClassAssignment {
  id: string;
  title: string;
  type: 'DIAGNOSTIC' | 'CASE_STUDY' | 'MOCK_EXAM' | 'REMEDIAL';
  assignedDate: string;
  dueDate: string;
  totalAssigned: number;
  submittedCount: number;
  avgScore: number;
  status: 'ACTIVE' | 'GRADED' | 'DRAFT';
}

export const TeacherCohortCenter: React.FC = () => {
  const navigate = useNavigate();
  const { user, quickSwitchRole } = useAuth();
  const [activeTab, setActiveTab] = useState<TeacherTab>('overview');
  const [selectedCohort, setSelectedCohort] = useState('شعبة المحاسبة 1 - الصف العاشر (32 طالباً)');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnitFilter, setSelectedUnitFilter] = useState('ALL');
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);

  // Teacher Pedagogy & Pacing Guide state
  const [pedagogySubTab, setPedagogySubTab] = useState<'pacing_schedule' | 'lesson_dossiers' | 'jre_masterclass'>('pacing_schedule');
  const [selectedPedagogyUnit, setSelectedPedagogyUnit] = useState<string>('unit-1');
  const [selectedPedagogyLesson, setSelectedPedagogyLesson] = useState<string>('lesson-1');

  // 1. Cohort Students dataset
  const [students, setStudents] = useState<StudentCohortRecord[]>([
    {
      id: 'st-1',
      name: 'أحمد محمود سليمان',
      email: 'ahmed.m@student.eb.edu.eg',
      accuracyRate: 48,
      attemptsCount: 14,
      completedLessons: 3,
      lastActive: 'منذ ساعتين',
      riskLevel: 'HIGH',
      criticalGaps: ['الحساب المعلق بميزان المراجعة', 'المصروفات المستحقة والمقدمة'],
      interventionStatus: 'PENDING'
    },
    {
      id: 'st-2',
      name: 'سارة طارق إبراهيم',
      email: 'sara.t@student.eb.edu.eg',
      accuracyRate: 59,
      attemptsCount: 18,
      completedLessons: 4,
      lastActive: 'أمس',
      riskLevel: 'HIGH',
      criticalGaps: ['الترحيل من اليوميات المساعدة', 'مذكرة تسوية البنك'],
      interventionStatus: 'PENDING'
    },
    {
      id: 'st-3',
      name: 'عمر خالد الدسوقي',
      email: 'omar.k@student.eb.edu.eg',
      accuracyRate: 64,
      attemptsCount: 22,
      completedLessons: 5,
      lastActive: 'اليوم',
      riskLevel: 'MEDIUM',
      criticalGaps: ['التفرقة بين المصروف الإيرادي والرأسمالي'],
      interventionStatus: 'PRESCRIPTION_SENT'
    },
    {
      id: 'st-4',
      name: 'مريم شريف عبد الله',
      email: 'mariam.s@student.eb.edu.eg',
      accuracyRate: 78,
      attemptsCount: 35,
      completedLessons: 6,
      lastActive: 'اليوم',
      riskLevel: 'LOW',
      criticalGaps: [],
      interventionStatus: 'RESOLVED'
    },
    {
      id: 'st-5',
      name: 'يوسف مصطفى النجار',
      email: 'youssef.m@student.eb.edu.eg',
      accuracyRate: 92,
      attemptsCount: 42,
      completedLessons: 6,
      lastActive: 'منذ نصف ساعة',
      riskLevel: 'EXCELLENT',
      criticalGaps: [],
      interventionStatus: 'RESOLVED'
    },
    {
      id: 'st-6',
      name: 'نور الدين أحمد العوضي',
      email: 'nour.a@student.eb.edu.eg',
      accuracyRate: 88,
      attemptsCount: 38,
      completedLessons: 6,
      lastActive: 'منذ ساعة',
      riskLevel: 'EXCELLENT',
      criticalGaps: [],
      interventionStatus: 'RESOLVED'
    }
  ]);

  // 2. Concept Cohort Statuses
  const conceptStatuses: ConceptCohortStatus[] = [
    {
      conceptId: 'c-u1-1',
      conceptName: 'أثر المعاملات على طرفي معادلة الميزانية',
      unitTitle: 'الوحدة 1',
      bloomLevel: 'APPLICATION',
      accuracyRate: 91,
      facilityIndex: 0.91,
      totalAttempts: 124,
      status: 'MASTERED',
      commonDistractorNote: 'استيعاب ممتاز لتأثير الأصول والالتزامات وحقوق الملكية.'
    },
    {
      conceptId: 'c-u1-2',
      conceptName: 'النفقات الإيرادية مقابل النفقات الرأسمالية',
      unitTitle: 'الوحدة 1',
      bloomLevel: 'ANALYSIS',
      accuracyRate: 79,
      facilityIndex: 0.79,
      totalAttempts: 98,
      status: 'STABLE',
      commonDistractorNote: 'بعض الطلاب يخلطون بين عمرات الآلات التوسعية ومصروفات الصيانة الدورية.'
    },
    {
      conceptId: 'c-u2-1',
      conceptName: 'الدورة المستندية والخصم التجاري والنقدي',
      unitTitle: 'الوحدة 2',
      bloomLevel: 'APPLICATION',
      accuracyRate: 85,
      facilityIndex: 0.85,
      totalAttempts: 112,
      status: 'MASTERED',
      commonDistractorNote: 'التطبيق المحاسبي لشروط الدفع (2/10 صافي 30) متقن بنسبة عالية.'
    },
    {
      conceptId: 'c-u3-1',
      conceptName: 'الترحيل من اليوميات المساعدة لدفاتر الأستاذ',
      unitTitle: 'الوحدة 3',
      bloomLevel: 'APPLICATION',
      accuracyRate: 74,
      facilityIndex: 0.74,
      totalAttempts: 105,
      status: 'NEEDS_REINFORCEMENT',
      commonDistractorNote: 'خلط متكرر في تاريخ الترحيل الإجمالي لدفتر الأستاذ العام مقابل اليومي لحساب الأستاذ المساعد.'
    },
    {
      conceptId: 'c-u4-1',
      conceptName: 'معالجة فروق ميزان المراجعة بالحساب المعلق',
      unitTitle: 'الوحدة 4',
      bloomLevel: 'ANALYSIS',
      accuracyRate: 52,
      facilityIndex: 0.52,
      totalAttempts: 130,
      status: 'CRITICAL_GAP',
      commonDistractorNote: 'فجوة حرجة: 48% من الطلاب يعتقدون خطأً أن الحساب المعلق يفتح عند حدوث أخطاء متكافئة.'
    },
    {
      conceptId: 'c-u5-1',
      conceptName: 'التسويات الجردية للمصروفات المقدمة والمستحقة',
      unitTitle: 'الوحدة 5',
      bloomLevel: 'APPLICATION',
      accuracyRate: 68,
      facilityIndex: 0.68,
      totalAttempts: 94,
      status: 'NEEDS_REINFORCEMENT',
      commonDistractorNote: 'صعوبة في حساب المدة الزمنية الدقيقة التي تخص الفترة المالية المنتهية في 31/12.'
    },
    {
      conceptId: 'c-u6-1',
      conceptName: 'إعداد مذكرة تسوية البنك ومعالجة الشيكات المعلقة',
      unitTitle: 'الوحدة 6',
      bloomLevel: 'ANALYSIS',
      accuracyRate: 71,
      facilityIndex: 0.71,
      totalAttempts: 88,
      status: 'STABLE',
      commonDistractorNote: 'الخلط بين الجانب الذي تعدل فيه مصاريف البنك وأخطاء تسجيل الدفاتر.'
    }
  ];

  // 3. Item Analysis dataset (Psychometric IRT items)
  const itemAnalysisRows: PsychometricItemRow[] = [
    {
      id: 'itm-1',
      code: 'EB-Q-042',
      conceptName: 'معالجة رصيد الحساب المعلق الدائن',
      unit: 'الوحدة 4',
      difficulty: 'متقدم',
      attempts: 58,
      facilityIndex: 0.38,
      discriminationIndex: 0.52,
      reliabilityWarning: false,
      statusText: 'مفردة ممتازة عالية التمييز',
      recommendation: 'سؤال سيكومتري متزن يفرق بدقة بين الطلاب المتفوقين والمتوسطين.'
    },
    {
      id: 'itm-2',
      code: 'EB-Q-018',
      conceptName: 'إثبات قيد المصروف المقدم في نهاية الفترة',
      unit: 'الوحدة 5',
      difficulty: 'متوسط',
      attempts: 64,
      facilityIndex: 0.65,
      discriminationIndex: 0.46,
      reliabilityWarning: false,
      statusText: 'مفردة متزنة قياسياً',
      recommendation: 'مستوى الصعوبة مثالي ومناسب للاختبارات الشهرية والنهائية.'
    },
    {
      id: 'itm-3',
      code: 'EB-Q-077',
      conceptName: 'التمييز بين الخصم التجاري وتعجيل الدفع',
      unit: 'الوحدة 2',
      difficulty: 'سهل',
      attempts: 72,
      facilityIndex: 0.94,
      discriminationIndex: 0.18,
      reliabilityWarning: true,
      statusText: 'سهل للغاية / تمييز ضعيف',
      recommendation: 'معامل السهولة مرتفع جداً (0.94). يفضل تعقيد الخيارات أو إدراج شرط تاريخ السداد.'
    },
    {
      id: 'itm-4',
      code: 'EB-Q-105',
      conceptName: 'تصحيح خطأ الترحيل في طرف واحد من القيد',
      unit: 'الوحدة 4',
      difficulty: 'تحدي',
      attempts: 49,
      facilityIndex: 0.22,
      discriminationIndex: 0.28,
      reliabilityWarning: true,
      statusText: 'شديد الصعوبة / قد يربك الطلاب',
      recommendation: 'معامل السهولة منخفض (0.22). يرجى مراجعة وضوح الصياغة اللغوية للمشتت ب.'
    },
    {
      id: 'itm-5',
      code: 'EB-Q-031',
      conceptName: 'إعداد قيد اليومية المركب في دفاتر المنشأة',
      unit: 'الوحدة 1',
      difficulty: 'متوسط',
      attempts: 68,
      facilityIndex: 0.76,
      discriminationIndex: 0.44,
      reliabilityWarning: false,
      statusText: 'مفردة متزنة قياسياً',
      recommendation: 'إتقان جيد وتوزيع متجانس على البدائل.'
    }
  ];

  // 4. Assignments dataset
  const [assignments, setAssignments] = useState<ClassAssignment[]>([
    {
      id: 'asg-1',
      title: 'الاختبار التشخيصي للوحدة الرابعة: ميزان المراجعة والأخطاء',
      type: 'DIAGNOSTIC',
      assignedDate: '2026-09-14',
      dueDate: '2026-09-20',
      totalAssigned: 32,
      submittedCount: 28,
      avgScore: 74.5,
      status: 'ACTIVE'
    },
    {
      id: 'asg-2',
      title: 'دراسة حالة تطبيقية: الدورة المستندية لشركة النيل التجارية',
      type: 'CASE_STUDY',
      assignedDate: '2026-09-10',
      dueDate: '2026-09-16',
      totalAssigned: 32,
      submittedCount: 32,
      avgScore: 88.2,
      status: 'GRADED'
    },
    {
      id: 'asg-3',
      title: 'حزمة تدريب علاجي مخصصة: التسويات الجردية والحساب المعلق',
      type: 'REMEDIAL',
      assignedDate: '2026-09-17',
      dueDate: '2026-09-22',
      totalAssigned: 8,
      submittedCount: 5,
      avgScore: 68.0,
      status: 'ACTIVE'
    }
  ]);

  // 5. Capstone Submissions dataset
  const [capstoneSubmissions, setCapstoneSubmissions] = useState<any[]>([
    {
      studentId: 'st-1',
      studentName: 'عمر فاروق المصري',
      firmName: 'شركة الأهرام للصناعات الغذائية ش.م.م',
      stationsCompleted: 8,
      submittedAt: '2026-09-17',
      rubricScores: {
        accountingAccuracy: 34,
        adjustingEntries: 24,
        financialInterpretation: 23,
        dossierCompleteness: 15
      },
      totalScore: 96,
      status: 'CERTIFIED',
      teacherFeedback: 'إنجاز محاسبي متميز والتزام تام بالمعايير المصرية ودقة فائقة في إقفال الحسابات وصياغة تقرير JRE.'
    },
    {
      studentId: 'st-2',
      studentName: 'سارة أحمد خليل',
      firmName: 'شركة الأهرام للصناعات الغذائية ش.م.م',
      stationsCompleted: 8,
      submittedAt: '2026-09-18',
      rubricScores: {
        accountingAccuracy: 31,
        adjustingEntries: 22,
        financialInterpretation: 24,
        dossierCompleteness: 14
      },
      totalScore: 91,
      status: 'CERTIFIED',
      teacherFeedback: 'ملف إنجاز متكامل، التفسير المالي لنسبة التداول ممتاز ودقيق.'
    },
    {
      studentId: 'st-3',
      studentName: 'كريم نبيل الشرقاوي',
      firmName: 'شركة الأهرام للصناعات الغذائية ش.م.م',
      stationsCompleted: 7,
      submittedAt: '2026-09-18',
      rubricScores: {
        accountingAccuracy: 26,
        adjustingEntries: 18,
        financialInterpretation: 17,
        dossierCompleteness: 11
      },
      totalScore: 72,
      status: 'PENDING_REVIEW',
      teacherFeedback: 'يتبقى استكمال فحص قيد التسوية للمصروف المقدم وتدقيق ميزان المراجعة بعد التسويات.'
    },
    {
      studentId: 'st-4',
      studentName: 'مريم يوسف عبد الله',
      firmName: 'شركة الأهرام للصناعات الغذائية ش.م.م',
      stationsCompleted: 5,
      submittedAt: '2026-09-16',
      rubricScores: {
        accountingAccuracy: 22,
        adjustingEntries: 14,
        financialInterpretation: 12,
        dossierCompleteness: 10
      },
      totalScore: 58,
      status: 'NEEDS_REVISION',
      teacherFeedback: 'يرجى مراجعة ترحيل حسابات الأستاذ العام وتصحيح الفرق في ميزان المراجعة قبل الانتقال للقوائم.'
    }
  ]);

  const [selectedCapstone, setSelectedCapstone] = useState<any | null>(null);

  const handleCertifyCapstone = (studentId: string, customFeedback?: string) => {
    setCapstoneSubmissions(prev => prev.map(cap => {
      if (cap.studentId === studentId) {
        return {
          ...cap,
          status: 'CERTIFIED',
          teacherFeedback: customFeedback || cap.teacherFeedback || 'تم اعتماد وإجازة ملف الإنجاز المحاسبي رسمياً ومنح شهادة التخرج.'
        };
      }
      return cap;
    }));
    try {
      confetti({ particleCount: 70, spread: 80 });
    } catch {}
    setAlertSuccess('تم اعتماد مشروع التخرج بنجاح ومنح الطالب ترخيص التخرج المحاسبي الرسمي.');
    if (selectedCapstone && selectedCapstone.studentId === studentId) {
      setSelectedCapstone((prev: any) => ({ ...prev, status: 'CERTIFIED' }));
    }
    setTimeout(() => setAlertSuccess(null), 4000);
  };

  // Actions
  const handleSendIntervention = (studentId: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, interventionStatus: 'PRESCRIPTION_SENT' };
      }
      return s;
    }));
    setAlertSuccess('تم إرسال الخطة العلاجية والكبسولة التشخيصية للطالب بنجاح وإشعاره في لوحة مساره الشخصي.');
    setTimeout(() => setAlertSuccess(null), 4000);
  };

  const handleCreateAssignment = () => {
    const newAsg: ClassAssignment = {
      id: `asg-${Date.now()}`,
      title: 'اختبار محاكاة قصير: مهارات القيود والتسويات (15 دقيقة)',
      type: 'MOCK_EXAM',
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: '2026-09-25',
      totalAssigned: 32,
      submittedCount: 0,
      avgScore: 0,
      status: 'ACTIVE'
    };
    setAssignments([newAsg, ...assignments]);
    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch {}
    setAlertSuccess('تم جدولة وتكليف الشعبة بالاختبار المحاكي الجديد بنجاح.');
    setTimeout(() => setAlertSuccess(null), 4000);
  };

  const atRiskStudents = students.filter(s => s.riskLevel === 'HIGH' || s.riskLevel === 'MEDIUM');

  return (
    <div className="space-y-8 font-serif" dir="rtl">
      
      {/* Editorial Header Banner */}
      <div className="bg-[#1D1D1B] text-[#F9F7F2] p-6 sm:p-8 border-2 border-[#1D1D1B] space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#C4A484] text-[#1D1D1B] flex items-center justify-center font-black">
              <Users className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#8A1F1D] text-white text-[11px] font-bold px-2 py-0.5">
                  المرحلة الخامسة للتطوير
                </span>
                <span className="text-xs text-[#C4A484] font-bold">
                  مركز التوجيه الفني والتحليل السيكومتري للشعبة الصفية
                </span>
              </div>
              <h2 className="text-2xl font-black mt-2">
                لوحة إشراف المعلم وإدارة أداء الشعبة الدراسية
              </h2>
              <p className="text-xs text-[#F9F7F2]/80 mt-1">
                تشخيص سيكومتري دقيق لمستويات التمكن وفق نظرية الاستجابة للمفردة (IRT)، إدارة الفجوات المفاهيمية، وتكليف خطط التدخل الفوري.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Quick Cohort Selector */}
            <div className="bg-white/10 border border-white/20 p-2.5 text-right">
              <span className="text-[10px] text-[#C4A484] block font-bold">الشعبة المحددة:</span>
              <select
                value={selectedCohort}
                onChange={e => setSelectedCohort(e.target.value)}
                className="bg-transparent text-white text-xs font-bold font-serif focus:outline-none cursor-pointer mt-1"
              >
                <option value="شعبة المحاسبة 1 - الصف العاشر (32 طالباً)" className="text-[#1D1D1B]">
                  شعبة المحاسبة 1 - الصف العاشر (32 طالباً)
                </option>
                <option value="شعبة المحاسبة 2 - الصف العاشر (28 طالباً)" className="text-[#1D1D1B]">
                  شعبة المحاسبة 2 - الصف العاشر (28 طالباً)
                </option>
              </select>
            </div>

            {user?.role !== 'TEACHER' && user?.role !== 'ADMIN' && quickSwitchRole && (
              <button
                onClick={() => quickSwitchRole('TEACHER')}
                className="px-3.5 py-2.5 bg-[#C4A484] hover:bg-[#b59575] text-[#1D1D1B] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>دخول بنمط المعلم الخبير</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 High-Level Key Performance Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          
          <div className="bg-white/5 border border-white/10 p-4 space-y-1">
            <span className="text-xs text-[#C4A484] font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> متوسط دقة الشعبة
            </span>
            <div className="text-3xl font-black font-mono text-white">
              78.4%
            </div>
            <span className="text-[10px] text-emerald-400 font-bold block">+4.2% مقارنة بالاختبار السابق</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 space-y-1">
            <span className="text-xs text-[#C4A484] font-bold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> الطلاب بدائرة التعثر
            </span>
            <div className="text-3xl font-black font-mono text-rose-400">
              {atRiskStudents.length} طلاب
            </div>
            <span className="text-[10px] text-white/70 block">يحتاجون لخطة تدخلية موجهة</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 space-y-1">
            <span className="text-xs text-[#C4A484] font-bold flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> نسبة إتمام المنهاج
            </span>
            <div className="text-3xl font-black font-mono text-white">
              81.2%
            </div>
            <span className="text-[10px] text-emerald-400 font-bold block">مكتمل حتى منتصف الوحدة الخامسة</span>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 space-y-1">
            <span className="text-xs text-[#C4A484] font-bold flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" /> المحاولات المسجلة
            </span>
            <div className="text-3xl font-black font-mono text-white">
              486
            </div>
            <span className="text-[10px] text-white/70 block">عبر التمارين والمحاكيات الرسمية</span>
          </div>

        </div>

      </div>

      {/* Alert Banner for Actions */}
      {alertSuccess && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-500 text-emerald-900 text-xs font-bold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{alertSuccess}</span>
          </div>
          <button onClick={() => setAlertSuccess(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Sub-Navigation Navigation Bar */}
      <div className="bg-[#F9F7F2] border-2 border-[#1D1D1B] p-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#1D1D1B] text-[#C4A484]'
                : 'bg-white text-[#1D1D1B] border border-[#1D1D1B]/20 hover:bg-gray-100'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>نظرة عامة ومنحنى الأداء</span>
          </button>

          <button
            onClick={() => setActiveTab('pacing_and_lesson_plans')}
            className={`px-3 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'pacing_and_lesson_plans'
                ? 'bg-[#1E3A8A] text-white shadow-xs'
                : 'bg-white text-[#1D1D1B] border border-[#1D1D1B]/20 hover:bg-gray-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-extrabold">توزيع المنهج بالأسابيع وخطط التدريس</span>
          </button>

          <button
            onClick={() => setActiveTab('concept_heatmap')}
            className={`px-3 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'concept_heatmap'
                ? 'bg-[#1D1D1B] text-[#C4A484]'
                : 'bg-white text-[#1D1D1B] border border-[#1D1D1B]/20 hover:bg-gray-100'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>مصفوفة الفجوات المفاهيمية</span>
          </button>

          <button
            onClick={() => setActiveTab('item_analysis')}
            className={`px-3 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'item_analysis'
                ? 'bg-[#1D1D1B] text-[#C4A484]'
                : 'bg-white text-[#1D1D1B] border border-[#1D1D1B]/20 hover:bg-gray-100'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>التحليل المعياري للمفردات (Item Analysis)</span>
          </button>

          <button
            onClick={() => setActiveTab('interventions')}
            className={`px-3 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'interventions'
                ? 'bg-[#8A1F1D] text-white'
                : 'bg-white text-[#1D1D1B] border border-[#1D1D1B]/20 hover:bg-gray-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            <span>إدارة التدخل للطلاب المتعثرين ({atRiskStudents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-3 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'assignments'
                ? 'bg-[#1D1D1B] text-[#C4A484]'
                : 'bg-white text-[#1D1D1B] border border-[#1D1D1B]/20 hover:bg-gray-100'
            }`}
          >
            <Target className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>الواجبات والتكليفات الصفية ({assignments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inspection_report')}
            className={`px-3 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'inspection_report'
                ? 'bg-[#1D1D1B] text-[#C4A484]'
                : 'bg-white text-[#1D1D1B] border border-[#1D1D1B]/20 hover:bg-gray-100'
            }`}
          >
            <Printer className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>تقرير التوجيه الفني المعتمد</span>
          </button>

          <button
            onClick={() => setActiveTab('capstone_eval')}
            className={`px-3.5 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'capstone_eval'
                ? 'bg-[#8A1F1D] text-white shadow-xs'
                : 'bg-[#C4A484]/20 text-[#1D1D1B] border border-[#C4A484] hover:bg-[#C4A484]/40'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-[#C4A484]" />
            <span className="font-extrabold">مشاريع التخرج وحقائب الإنجاز ({capstoneSubmissions.length})</span>
          </button>

        </div>

        <div className="text-[11px] text-[#1D1D1B]/70 font-mono hidden md:block">
          معتمد للتوجيه الفني والمتابعة الإشرافية (EB-ACC-2026)
        </div>
      </div>

      {/* TAB 1: OVERVIEW & PERFORMANCE CURVE */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Grade Distribution & Mastery Bands */}
          <div className="bg-white border-2 border-[#1D1D1B] p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#1D1D1B]/15 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-[#1D1D1B]">
                  منحنى التوزيع التكراري لمستويات التمكن الصفي (Normal Distribution Curve)
                </h3>
                <p className="text-xs text-[#1D1D1B]/70">توزيع طلاب الشعبة البالغ عددهم 32 طالباً على شرائح الإتقان الأكاديمي</p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 border border-emerald-200">
                توزيع إيجابي متزن
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
              
              <div className="p-4 bg-emerald-50/50 border border-emerald-300 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-900">1. إتقان ممتاز (85% فأكثر)</span>
                  <span className="font-mono font-bold text-emerald-800">11 طالباً (34%)</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200">
                  <div className="h-full bg-emerald-600" style={{ width: '34%' }} />
                </div>
                <p className="text-[11px] text-emerald-800">مستعدون للمهام الإثرائية ودراسات الجدوى المتقدمة</p>
              </div>

              <div className="p-4 bg-blue-50/50 border border-blue-300 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-900">2. إتقان جيد جداً (75% - 84%)</span>
                  <span className="font-mono font-bold text-blue-800">12 طالباً (38%)</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200">
                  <div className="h-full bg-blue-600" style={{ width: '38%' }} />
                </div>
                <p className="text-[11px] text-blue-800">أداء مستقر في التمارين المحاسبية الاعتيادية</p>
              </div>

              <div className="p-4 bg-amber-50/50 border border-amber-300 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-900">3. مستوى متوسط (65% - 74%)</span>
                  <span className="font-mono font-bold text-amber-800">6 طلاب (19%)</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200">
                  <div className="h-full bg-amber-500" style={{ width: '19%' }} />
                </div>
                <p className="text-[11px] text-amber-800">يحتاجون تدعيم مهارات التسويات وميزان المراجعة</p>
              </div>

              <div className="p-4 bg-rose-50/50 border border-rose-300 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-rose-900">4. دون المستوى (أقل من 65%)</span>
                  <span className="font-mono font-bold text-rose-800">3 طلاب (9%)</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200">
                  <div className="h-full bg-rose-600" style={{ width: '9%' }} />
                </div>
                <p className="text-[11px] text-rose-800 font-bold">مشمولون في خطة التدخل العلاجي الفوري</p>
              </div>

            </div>
          </div>

          {/* Unit Mastery Comparison */}
          <div className="bg-white border-2 border-[#1D1D1B] p-6 space-y-4 shadow-xs">
            <h3 className="font-extrabold text-base text-[#1D1D1B] border-b border-[#1D1D1B]/15 pb-3">
              مقارنة مستويات استيعاب الشعبة عبر الوحدات الدراسية المقررة
            </h3>

            <div className="space-y-3">
              {[
                { name: 'الوحدة 1: الإطار المفاهيمي ومعادلة الميزانية', rate: 89, color: 'bg-emerald-600' },
                { name: 'الوحدة 2: الدورة المستندية وعمليات البضاعة والخصم', rate: 86, color: 'bg-emerald-600' },
                { name: 'الوحدة 3: اليوميات المساعدة ودفاتر الأستاذ العام والمساعد', rate: 76, color: 'bg-blue-600' },
                { name: 'الوحدة 4: ميزان المراجعة وتصحيح الأخطاء والحساب المعلق', rate: 58, color: 'bg-rose-600' },
                { name: 'الوحدة 5: التسويات الجردية للمصروفات والإيرادات', rate: 71, color: 'bg-amber-600' },
                { name: 'الوحدة 6: الرقابة الداخلية وإعداد مذكرة تسوية البنك', rate: 74, color: 'bg-blue-600' }
              ].map((u, idx) => (
                <div key={idx} className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/10 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1D1D1B]">{u.name}</span>
                    <span className="font-mono font-bold text-[#1D1D1B]">{u.rate}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200">
                    <div className={`h-full ${u.color}`} style={{ width: `${u.rate}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 1.5: PACING GUIDE & DETAILED LESSON PLANS */}
      {activeTab === 'pacing_and_lesson_plans' && (
        <div className="space-y-6">
          
          {/* Header Action Bar */}
          <div className="bg-[#1E3A8A] text-white p-5 sm:p-6 border-b-4 border-[#C5A059] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-300" />
                <span className="text-xs font-mono font-bold tracking-wider text-[#C4A484] uppercase">
                  MASTER TEACHER PACING & PEDAGOGY CENTER
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-serif">
                مركز خطط التدريس وتوزيع المنهج الزمني بالأسابيع
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-2xl font-sans">
                دليل المعلم الموجه المعتمد لشهادة البكالوريا المصرية (EB) — يركز على إيه، يستخدم أساليب إيه لتوضيح الموضوع، توزيع زمن الحصة، صعوبات التعلم، وموجهات تصحيح مقال JRE.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => navigate('/print?edition=teacher')}
                className="px-4 py-2.5 bg-[#C5A059] hover:bg-[#b08e4c] text-[#0C1E36] text-xs font-black transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                title="تصدير نسخة المعلم الإرشادية كاملة كملف مطبوع A4 PDF"
              >
                <Printer className="w-4 h-4 text-[#0C1E36]" />
                <span>طباعة نسخة المعلم المعتمدة (A4 PDF)</span>
              </button>
            </div>
          </div>

          {/* Subtabs Selector Bar */}
          <div className="bg-white border-2 border-[#1D1D1B] p-2 flex flex-wrap items-center gap-2 shadow-2xs">
            <button
              onClick={() => setPedagogySubTab('pacing_schedule')}
              className={`px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                pedagogySubTab === 'pacing_schedule'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-gray-100'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300" />
              <span>خريطة توزيع المنهج الزمني بالأسابيع (32 أسبوعاً)</span>
            </button>

            <button
              onClick={() => setPedagogySubTab('lesson_dossiers')}
              className={`px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                pedagogySubTab === 'lesson_dossiers'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-gray-100'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
              <span>أدلة الدروس التفصيلية والأساليب الصفية (58 درساً)</span>
            </button>

            <button
              onClick={() => setPedagogySubTab('jre_masterclass')}
              className={`px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                pedagogySubTab === 'jre_masterclass'
                  ? 'bg-[#8A1F1D] text-white'
                  : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-gray-100'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>موجهات وسلالم تحكيم مقال الاستدلال JRE (20 درجة)</span>
            </button>
          </div>

          {/* SUBTAB 1: WEEKLY PACING SCHEDULE */}
          {pedagogySubTab === 'pacing_schedule' && (
            <div className="space-y-4">
              <WeeklyCurriculumPacingView 
                onSelectLesson={(lessonId) => {
                  setSelectedPedagogyLesson(lessonId);
                  setPedagogySubTab('lesson_dossiers');
                }}
              />
            </div>
          )}

          {/* SUBTAB 2: DETAILED LESSON PEDAGOGICAL DOSSIERS */}
          {pedagogySubTab === 'lesson_dossiers' && (
            <div className="space-y-6">
              
              {/* Unit and Lesson Selector Controls */}
              <div className="bg-white border-2 border-[#1D1D1B] p-4 space-y-3 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1D1D1B]/15 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#1E3A8A]" />
                    <span className="text-xs font-bold text-[#1D1D1B]">اختر الوحدة الدراسية:</span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {availableUnits.map(unit => (
                      <button
                        key={unit.id}
                        onClick={() => {
                          setSelectedPedagogyUnit(unit.id);
                          const unitLessons = getLessonsForUnit(unit.id);
                          if (unitLessons.length > 0) {
                            setSelectedPedagogyLesson(unitLessons[0].id);
                          }
                        }}
                        className={`px-2.5 py-1 text-xs font-bold transition cursor-pointer border ${
                          selectedPedagogyUnit === unit.id
                            ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                            : 'bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/20 hover:bg-gray-100'
                        }`}
                      >
                        الوحدة {unit.unitNumber}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lessons in Selected Unit */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-bold text-[#1D1D1B]/70 shrink-0">دروس الوحدة:</span>
                  {getLessonsForUnit(selectedPedagogyUnit).map((l, lIdx) => (
                    <button
                      key={l.id}
                      onClick={() => setSelectedPedagogyLesson(l.id)}
                      className={`px-3 py-1.5 text-xs font-bold transition cursor-pointer flex items-center gap-1.5 border ${
                        selectedPedagogyLesson === l.id
                          ? 'bg-[#0C1E36] text-[#C5A059] border-[#0C1E36] shadow-xs'
                          : 'bg-white text-[#1D1D1B] border-[#1D1D1B]/20 hover:bg-[#F9F7F2]'
                      }`}
                    >
                      <span className="font-mono text-[10px]">[{lIdx + 1}]</span>
                      <span className="truncate max-w-[220px]">{l.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Render Full Pedagogical Dossier */}
              <TeacherPedagogicalDossier
                lessonId={selectedPedagogyLesson}
                unitNumber={parseInt(selectedPedagogyUnit.replace('unit-', ''), 10) || 1}
                lessonNumber={1}
              />
            </div>
          )}

          {/* SUBTAB 3: JRE MASTERCLASS & GRADING DIRECTIVES */}
          {pedagogySubTab === 'jre_masterclass' && (
            <div className="bg-white border-2 border-[#1D1D1B] p-6 space-y-6 shadow-xs font-serif">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-[#8A1F1D] pb-4 gap-3">
                <div>
                  <h4 className="text-lg sm:text-xl font-black text-[#8A1F1D] flex items-center gap-2">
                    <Award className="w-6 h-6 text-[#C5A059]" />
                    <span>ميثاق تحكيم مقال الاستدلال المحاسبي JRE (20 درجة وزارية)</span>
                  </h4>
                  <p className="text-xs text-[#1D1D1B]/70 font-sans mt-1">
                    دليل المعلم لتصحيح المقال الاستدلالي وتدريب الطلاب على صياغة الحجة المالية المقنعة وفق المعايير المصرية (EAS).
                  </p>
                </div>
                <div className="bg-[#8A1F1D]/10 border border-[#8A1F1D] px-3 py-1.5 text-xs font-mono font-bold text-[#8A1F1D]">
                  الوزن النسبي: 20% من الدرجة الكلية
                </div>
              </div>

              {/* 4 Rubric Columns Explained */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                
                <div className="border-2 border-[#1E3A8A] bg-[#EFF6FF] p-4 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-[#1E3A8A]/20 pb-1.5">
                    <strong className="text-sm font-black font-serif text-[#1E3A8A]">
                      المعيار الأول: التكييف المحاسبي وتحديد المبدأ الحاكم
                    </strong>
                    <span className="font-mono font-bold bg-[#1E3A8A] text-white px-2 py-0.5 text-xs">
                      4 درجات
                    </span>
                  </div>
                  <p className="text-[#1D1D1B]/80 leading-relaxed">
                    <strong>ماذا يقيس؟</strong> قدرة الطالب على تشخيص الواقعة المالية وتحديد المبدأ المحاسبي (مثل: المقابلة، الاستحقاق، الحيطة والحذر، الوحدة المحاسبية) أو المعيار المصري ذي الصلة.
                  </p>
                  <div className="bg-white p-2 border border-[#1E3A8A]/20 text-[#14532D]">
                    <strong>دليل الدرجة الكاملة:</strong> ذكر المبدأ بوضوح وربطه بسبب حدوث الخلل دون تردد.
                  </div>
                </div>

                <div className="border-2 border-[#14532D] bg-[#F0FDF4] p-4 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-[#14532D]/20 pb-1.5">
                    <strong className="text-sm font-black font-serif text-[#14532D]">
                      المعيار الثاني: دقة الحسابات الرقمية وصياغة القيود
                    </strong>
                    <span className="font-mono font-bold bg-[#14532D] text-white px-2 py-0.5 text-xs">
                      6 درجات
                    </span>
                  </div>
                  <p className="text-[#1D1D1B]/80 leading-relaxed">
                    <strong>ماذا يقيس؟</strong> صحة العمليات الجبرية، كتابة قيود التسوية أو التصحيح المتوازنة بأطرافها المدينة والدائنة بالأرقام الدقيقة والشرح المختصر.
                  </p>
                  <div className="bg-white p-2 border border-[#14532D]/20 text-[#14532D]">
                    <strong>دليل الدرجة الكاملة:</strong> تطابق طرفي القيد وسلامة العمليات الحسابية 100%.
                  </div>
                </div>

                <div className="border-2 border-[#C5A059] bg-[#FAF7EE] p-4 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-[#C5A059]/30 pb-1.5">
                    <strong className="text-sm font-black font-serif text-[#8A5D00]">
                      المعيار الثالث: تبرير الأثر على القوائم وحقوق الملاك
                    </strong>
                    <span className="font-mono font-bold bg-[#C5A059] text-[#0C1E36] px-2 py-0.5 text-xs">
                      6 درجات
                    </span>
                  </div>
                  <p className="text-[#1D1D1B]/80 leading-relaxed">
                    <strong>ماذا يقيس؟</strong> تتبع الأثر المتسلسل: كيف يؤثر الخطأ أو التعديل على مجمل الربح، صافي ربح الفترة في قائمة الدخل، وإجمالي الأصول والالتزامات وحقوق الملكية في المركز المالي.
                  </p>
                  <div className="bg-white p-2 border border-[#C5A059]/20 text-[#14532D]">
                    <strong>دليل الدرجة الكاملة:</strong> بيان الأثر على القائمتين معاً وليس قائمة الدخل فقط.
                  </div>
                </div>

                <div className="border-2 border-[#8A1F1D] bg-[#FEF2F2] p-4 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-[#8A1F1D]/20 pb-1.5">
                    <strong className="text-sm font-black font-serif text-[#8A1F1D]">
                      المعيار الرابع: التوصية المهنية وجودة صياغة التقرير
                    </strong>
                    <span className="font-mono font-bold bg-[#8A1F1D] text-white px-2 py-0.5 text-xs">
                      4 درجات
                    </span>
                  </div>
                  <p className="text-[#1D1D1B]/80 leading-relaxed">
                    <strong>ماذا يقيس؟</strong> صياغة توصية وقائية تحمي المنشأة مستقبلاً (مثل: تفعيل المطابقة الثلاثية للمستندات، اعتماد القيود من المدير المالي، الجرد المفاجئ).
                  </p>
                  <div className="bg-white p-2 border border-[#8A1F1D]/20 text-[#14532D]">
                    <strong>دليل الدرجة الكاملة:</strong> لغة مهنية رصينة وتوصية قابلة للتطبيق العملي.
                  </div>
                </div>

              </div>

              {/* JRE Simulator Integration Link */}
              <div className="bg-[#FAF8F5] border border-[#1D1D1B]/20 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-sans">
                <div className="space-y-0.5">
                  <strong className="text-sm font-bold text-[#1D1D1B]">
                    هل تريد تدريب طلابك عملياً على سيناريوهات مقال JRE التفاعلية؟
                  </strong>
                  <p className="text-[#1D1D1B]/70">
                    يمكن للطلاب كتابة المقال ومراجعته بنظام التحكيم الفوري التلقائي داخل المنصة.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/my-path/jre')}
                  className="px-4 py-2 bg-[#1D1D1B] hover:bg-[#333330] text-[#F9F7F2] text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#C4A484]" />
                  <span>الانتقال لمختبر JRE التفاعلي</span>
                </button>
              </div>

            </div>
          )}

        </div>
      )}
      {activeTab === 'concept_heatmap' && (
        <div className="bg-white border-2 border-[#1D1D1B] p-6 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1D1D1B]/15 pb-4">
            <div>
              <h3 className="font-extrabold text-base text-[#1D1D1B] flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#8A1F1D]" />
                <span>مصفوفة تشخيص الفجوات المفاهيمية الصاعدة (Concept Diagnostic Matrix)</span>
              </h3>
              <p className="text-xs text-[#1D1D1B]/70 mt-1">
                رصد فوري لنسب الإتقان والمشتتات المربكة للطلاب في كل مفهوم محاسبي لتوجيه الشرح الصفي.
              </p>
            </div>
            <div className="text-xs bg-[#8A1F1D] text-white px-3 py-1 font-bold">
              فجوة حرجة مرصودة في الوحدة 4
            </div>
          </div>

          <div className="divide-y divide-[#1D1D1B]/10">
            {conceptStatuses.map(c => (
              <div key={c.conceptId} className="py-4 px-2 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:bg-[#F9F7F2]/80 transition">
                
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold bg-[#1D1D1B] text-[#C4A484] px-2 py-0.5">
                      {c.unitTitle}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 ${
                      c.status === 'MASTERED' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                      c.status === 'STABLE' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                      c.status === 'NEEDS_REINFORCEMENT' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                      'bg-rose-100 text-rose-900 border border-rose-300'
                    }`}>
                      {c.status === 'MASTERED' ? 'إتقان تام صفي' :
                       c.status === 'STABLE' ? 'مفهوم مستقر' :
                       c.status === 'NEEDS_REINFORCEMENT' ? 'بحاجة لتدعيم صفي' : 'فجوة حرجة بالشعبة'}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">
                      (إجمالي محاولات الشعبة: {c.totalAttempts})
                    </span>
                  </div>
                  <h4 className="font-bold text-sm text-[#1D1D1B]">{c.conceptName}</h4>
                  <p className="text-xs text-[#1D1D1B]/80 leading-relaxed bg-[#F9F7F2] p-2 border-r-2 border-[#C4A484]">
                    <span className="font-bold text-[#8A1F1D]">ملاحظة التوجيه التربوي:</span> {c.commonDistractorNote}
                  </p>
                </div>

                <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end shrink-0">
                  <div className="text-center min-w-[90px] bg-white border border-[#1D1D1B]/20 p-2">
                    <span className="text-[10px] text-gray-500 block">نسبة دقة الشعبة</span>
                    <span className={`text-xl font-mono font-black ${
                      c.accuracyRate >= 80 ? 'text-emerald-700' :
                      c.accuracyRate >= 65 ? 'text-blue-700' : 'text-rose-700'
                    }`}>
                      {c.accuracyRate}%
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('interventions');
                    }}
                    className="px-3 py-2 bg-[#1D1D1B] text-[#C4A484] hover:bg-[#333330] text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>عرض الطلاب المتعثرين</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ITEM ANALYSIS (IRT) */}
      {activeTab === 'item_analysis' && (
        <div className="bg-white border-2 border-[#1D1D1B] p-6 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1D1D1B]/15 pb-4">
            <div>
              <h3 className="font-extrabold text-base text-[#1D1D1B] flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#8A1F1D]" />
                <span>التحليل المعياري للمفردات الاختبارية (Item Analysis)</span>
              </h3>
              <p className="text-xs text-[#1D1D1B]/70 mt-1">
                معايرة معامل السهولة ($p$-value) ومعامل التمييز ($D$) وفق المعايير القياسية للتقويم التربوي.
              </p>
            </div>
            <span className="text-xs bg-[#F9F7F2] border border-[#1D1D1B]/20 px-3 py-1 font-mono text-[#1D1D1B]">
              نطاق الصعوبة المعتمد: 0.25 - 0.85
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse">
              <thead>
                <tr className="bg-[#1D1D1B] text-[#F9F7F2]">
                  <th className="p-3 font-bold">كود المفردة</th>
                  <th className="p-3 font-bold">المفهوم المحاسبي المستهدف</th>
                  <th className="p-3 font-bold text-center">معامل السهولة (p)</th>
                  <th className="p-3 font-bold text-center">معامل التمييز (D)</th>
                  <th className="p-3 font-bold">الحالة المعيارية والتقويمية</th>
                  <th className="p-3 font-bold">توصية المعلم والخبير</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1D1D1B]/15">
                {itemAnalysisRows.map(row => (
                  <tr key={row.id} className="hover:bg-[#F9F7F2]/80 transition">
                    <td className="p-3 font-mono font-bold text-[#8A1F1D]">{row.code}</td>
                    <td className="p-3">
                      <div className="font-bold text-[#1D1D1B]">{row.conceptName}</div>
                      <span className="text-[10px] text-gray-500">{row.unit} • {row.attempts} محاولة</span>
                    </td>
                    <td className="p-3 text-center font-mono font-bold text-base">
                      <span className={`px-2 py-0.5 ${
                        row.facilityIndex < 0.25 ? 'bg-rose-100 text-rose-900 font-black' :
                        row.facilityIndex > 0.85 ? 'bg-amber-100 text-amber-900 font-black' : 'bg-emerald-100 text-emerald-900'
                      }`}>
                        {row.facilityIndex}
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono font-bold text-base">
                      <span className={`px-2 py-0.5 ${
                        row.discriminationIndex >= 0.40 ? 'text-emerald-800' : 'text-amber-800'
                      }`}>
                        +{row.discriminationIndex}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 text-[10px] font-bold ${
                        row.reliabilityWarning
                          ? 'bg-rose-100 text-rose-900 border border-rose-300'
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      }`}>
                        {row.statusText}
                      </span>
                    </td>
                    <td className="p-3 text-[#1D1D1B]/80 max-w-xs">{row.recommendation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: TARGETED INTERVENTIONS */}
      {activeTab === 'interventions' && (
        <div className="bg-white border-2 border-[#1D1D1B] p-6 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1D1D1B]/15 pb-4">
            <div>
              <h3 className="font-extrabold text-base text-[#1D1D1B] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#8A1F1D]" />
                <span>إدارة التدخل السريع للطلاب المعرضين للتعثر الأكاديمي</span>
              </h3>
              <p className="text-xs text-[#1D1D1B]/70 mt-1">
                تحديد الفجوات وإرسال مسارات علاجية موجهة مباشرة للوحة مسار الطالب مع توثيق إشرافي.
              </p>
            </div>
            <div className="text-xs font-bold text-[#8A1F1D] bg-rose-50 border border-rose-200 px-3 py-1.5">
              {atRiskStudents.length} طلاب بحاجة لتدخل فوري
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {atRiskStudents.map(st => (
              <div key={st.id} className="p-5 border-2 border-[#1D1D1B] bg-[#F9F7F2] space-y-4 shadow-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-black text-base text-[#1D1D1B]">{st.name}</h4>
                    <span className="text-[11px] text-gray-600 font-mono">{st.email}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 text-xs font-bold ${
                    st.riskLevel === 'HIGH' ? 'bg-rose-700 text-white' : 'bg-amber-600 text-white'
                  }`}>
                    {st.riskLevel === 'HIGH' ? 'خطر تعثر حرج' : 'خطر متوسط'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-white p-2 border border-[#1D1D1B]/10">
                    <span className="text-[10px] text-gray-500 block">نسبة الدقة</span>
                    <span className="font-mono font-black text-rose-700 text-sm">{st.accuracyRate}%</span>
                  </div>
                  <div className="bg-white p-2 border border-[#1D1D1B]/10">
                    <span className="text-[10px] text-gray-500 block">المحاولات</span>
                    <span className="font-mono font-bold text-[#1D1D1B] text-sm">{st.attemptsCount}</span>
                  </div>
                  <div className="bg-white p-2 border border-[#1D1D1B]/10">
                    <span className="text-[10px] text-gray-500 block">الدروس المكتملة</span>
                    <span className="font-mono font-bold text-[#1D1D1B] text-sm">{st.completedLessons}/6</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#8A1F1D] block">الفجوات المشخصة:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {st.criticalGaps.map((gap, gIdx) => (
                      <span key={gIdx} className="bg-white text-[#1D1D1B] border border-rose-300 text-[10px] font-bold px-2 py-0.5">
                        • {gap}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#1D1D1B]/10 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500">
                    {st.interventionStatus === 'PRESCRIPTION_SENT' ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> تم إرسال الخطة العلاجية
                      </span>
                    ) : (
                      'بانتظار إرسال التكليف'
                    )}
                  </span>

                  <button
                    onClick={() => handleSendIntervention(st.id)}
                    disabled={st.interventionStatus === 'PRESCRIPTION_SENT'}
                    className={`px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      st.interventionStatus === 'PRESCRIPTION_SENT'
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-[#8A1F1D] text-white hover:bg-[#a12523]'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{st.interventionStatus === 'PRESCRIPTION_SENT' ? 'تم الإرسال بنجاح' : 'إرسال خطة علاجية فورية'}</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: CLASS ASSIGNMENTS */}
      {activeTab === 'assignments' && (
        <div className="bg-white border-2 border-[#1D1D1B] p-6 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1D1D1B]/15 pb-4">
            <div>
              <h3 className="font-extrabold text-base text-[#1D1D1B] flex items-center gap-2">
                <Target className="w-5 h-5 text-[#8A1F1D]" />
                <span>الواجبات والتكليفات الصفية المجدولة</span>
              </h3>
              <p className="text-xs text-[#1D1D1B]/70 mt-1">
                إدارة المهام الموحدة والاختبارات الدورية القصيرة ومتابعة نسب التسليم الحية.
              </p>
            </div>
            <button
              onClick={handleCreateAssignment}
              className="px-4 py-2 bg-[#1D1D1B] text-[#C4A484] hover:bg-[#333330] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>إنشاء تكليف أو اختبار صفي جديد</span>
            </button>
          </div>

          <div className="space-y-4">
            {assignments.map(asg => (
              <div key={asg.id} className="p-4 border border-[#1D1D1B]/20 bg-[#F9F7F2] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-[#1D1D1B] transition">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-[#1D1D1B] text-white px-2 py-0.5">
                      {asg.type === 'DIAGNOSTIC' ? 'اختبار تشخيصي' :
                       asg.type === 'CASE_STUDY' ? 'مسألة تطبيقية' :
                       asg.type === 'REMEDIAL' ? 'حزمة علاجية' : 'امتحان محاكي'}
                    </span>
                    <span className="text-[11px] text-gray-500 font-mono">
                      تاريخ الاستحقاق: {asg.dueDate}
                    </span>
                  </div>
                  <h4 className="font-black text-sm text-[#1D1D1B]">{asg.title}</h4>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-center">
                    <span className="text-[10px] text-gray-500 block">نسبة التسليم</span>
                    <span className="font-mono font-bold text-sm text-[#1D1D1B]">
                      {asg.submittedCount} / {asg.totalAssigned} ({Math.round((asg.submittedCount / asg.totalAssigned) * 100)}%)
                    </span>
                  </div>

                  <div className="text-center">
                    <span className="text-[10px] text-gray-500 block">متوسط الدرجة</span>
                    <span className="font-mono font-black text-sm text-emerald-700">
                      {asg.avgScore > 0 ? `${asg.avgScore}%` : 'قيد التصحيح'}
                    </span>
                  </div>

                  <span className={`px-2.5 py-1 text-xs font-bold ${
                    asg.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {asg.status === 'ACTIVE' ? 'نشط ومتاح' : 'تم الرصد'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: OFFICIAL INSPECTION & MENTORSHIP REPORT */}
      {activeTab === 'inspection_report' && (
        <div className="bg-white border-2 border-[#1D1D1B] p-6 sm:p-8 space-y-6 shadow-xs">
          
          {/* Printable Header */}
          <div className="border-b-2 border-[#1D1D1B] pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-[#8A1F1D] font-bold">
                جمهورية مصر العربية • وزارة التربية والتعليم والتعليم الفني
              </div>
              <h3 className="text-xl font-black text-[#1D1D1B] mt-1">
                تقرير المتابعة الفنية والإشراف التربوي لمادة المحاسبة المالية
              </h3>
              <p className="text-xs text-[#1D1D1B]/70 mt-1">
                نظام البكالوريا المصرية (EB) • الفصل الدراسي الأول • العام الأكاديمي 2026/2027
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-[#1D1D1B] text-[#C4A484] hover:bg-[#333330] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة التقرير الفني المعتمد (PDF)</span>
            </button>
          </div>

          {/* Official Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-xs">
            <div>
              <span className="text-gray-500 block">المعلم المشرف:</span>
              <span className="font-bold text-[#1D1D1B]">د. خالد عبد الرحمن (معلم خبير)</span>
            </div>
            <div>
              <span className="text-gray-500 block">الشعبة الدراسية:</span>
              <span className="font-bold text-[#1D1D1B]">شعبة المحاسبة 1 (32 طالباً)</span>
            </div>
            <div>
              <span className="text-gray-500 block">الموجه الفني الزائر:</span>
              <span className="font-bold text-[#1D1D1B]">أ.د. الموجه العام للعلوم التجارية</span>
            </div>
            <div>
              <span className="text-gray-500 block">تاريخ إعداد التقرير:</span>
              <span className="font-mono font-bold text-[#1D1D1B]">{new Date().toLocaleDateString('ar-EG')}</span>
            </div>
          </div>

          {/* Official Diagnostic Summary */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-sm text-[#1D1D1B] border-r-4 border-[#8A1F1D] pr-3">
              أولاً: ملخص المؤشرات الإحصائية العامة للشعبة
            </h4>
            <div className="p-4 border border-[#1D1D1B]/20 leading-relaxed text-xs space-y-2 text-[#1D1D1B]">
              <p>
                • بلغت نسبة النجاح العامة للشعبة في التقييمات التراكمية <strong>78.4%</strong>، محققة زيادة قدرها <strong>4.2%</strong> عن الاختبار القبلي.
              </p>
              <p>
                • أظهرت الشعبة تفوقاً ملحوظاً في كفايات <strong>الوحدة الأولى والثانية</strong> (معادلة الميزانية والدورة المستندية) بنسبة إتقان فاقت <strong>86%</strong>.
              </p>
              <p>
                • تم رصد فجوة مفاهيمية حرجة في <strong>الوحدة الرابعة</strong> حول معالجة الحساب المعلق بميزان المراجعة (نسبة دقة 52%)، وتم على إثرها إطلاق حزمة تدخل علاجي موجهة.
              </p>
            </div>
          </div>

          {/* Remedial & Enrichment Plan */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-sm text-[#1D1D1B] border-r-4 border-[#8A1F1D] pr-3">
              ثانياً: خطة التدخل العلاجي والتوجيهات الإشرافية
            </h4>
            <div className="p-4 border border-[#1D1D1B]/20 leading-relaxed text-xs space-y-2 text-[#1D1D1B]">
              <p>
                1. <strong>تخصيص ورشة عمل صفية تطبيقية:</strong> باستخدام محاكي الحسابات والأستاذ `T-Account Simulator` للربط البصري بين أخطاء الترحيل والحساب المعلق.
              </p>
              <p>
                2. <strong>متابعة الطلاب المشمولين بالدعم:</strong> إسناد الكبسولات المعرفية وأسئلة التحقق لعدد 3 طلاب دون المستوى وإعادة قياس الأداء خلال أسبوعين.
              </p>
              <p>
                3. <strong>إثراء الطلاب المتفوقين:</strong> تكليف الطلاب الحاصلين على امتياز (11 طالباً) ببحوث دراسات الحالة في مقالات التفسير المالي (JRE).
              </p>
            </div>
          </div>

          {/* Official Signatures Footer */}
          <div className="pt-8 border-t border-[#1D1D1B]/20 grid grid-cols-3 text-center text-xs font-bold text-[#1D1D1B]">
            <div>
              <span>توقيع معلم المادة</span>
              <div className="h-10 mt-2 font-serif italic text-gray-400 text-[11px]">د. خالد عبد الرحمن</div>
            </div>
            <div>
              <span>توقيع الموجه الفني الزائر</span>
              <div className="h-10 mt-2 font-serif italic text-gray-400 text-[11px]">معتمد رسمياً</div>
            </div>
            <div>
              <span>خاتم المدرسة والاعتماد</span>
              <div className="h-10 mt-2 border border-dashed border-[#1D1D1B]/30 flex items-center justify-center text-[10px] text-gray-400 mx-auto w-28">
                خاتم شعار المنظومة
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 7: CAPSTONE PORTFOLIO EVALUATION & CERTIFICATION */}
      {activeTab === 'capstone_eval' && (
        <div className="space-y-6">
          
          {/* Top Banner */}
          <div className="bg-white border-2 border-[#1D1D1B] p-6 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1D1D1B]/15 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#8A1F1D] text-white flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1D1D1B]">
                    مركز تقييم مشاريع التخرج المحاسبية واعتماد ملفات الإنجاز (Capstone Portfolios)
                  </h3>
                  <p className="text-xs text-[#1D1D1B]/70">
                    مراجعة وتقييم محاكاة الدورة المحاسبية الكاملة للشركات الواقعية وفق سلم التقييم الوزاري المعتمد (Rubric)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold bg-[#C4A484]/20 border border-[#C4A484] px-3 py-1.5 text-[#1D1D1B]">
                  سلم التقييم الوزاري: 100 درجة
                </span>
              </div>
            </div>

            {/* 4 KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 bg-[#F9F7F2] border border-[#1D1D1B]/20 space-y-1">
                <span className="text-xs text-[#1D1D1B]/70 font-bold">إجمالي المشاريع المسجلة</span>
                <div className="text-2xl font-black font-mono text-[#1D1D1B]">
                  {capstoneSubmissions.length} مشاريع
                </div>
                <span className="text-[10px] text-emerald-800 font-bold block">منشآت صناعية وتجارية واقعية</span>
              </div>

              <div className="p-4 bg-emerald-50/60 border border-emerald-300 space-y-1">
                <span className="text-xs text-emerald-900 font-bold">المشاريع المعتمدة والمرخصة</span>
                <div className="text-2xl font-black font-mono text-emerald-800">
                  {capstoneSubmissions.filter((c: any) => c.status === 'CERTIFIED').length}
                </div>
                <span className="text-[10px] text-emerald-700 font-bold block">تم منح إفادة التخرج المحاسبي</span>
              </div>

              <div className="p-4 bg-amber-50/60 border border-amber-300 space-y-1">
                <span className="text-xs text-amber-900 font-bold">بانتظار الفحص والمراجعة</span>
                <div className="text-2xl font-black font-mono text-amber-800">
                  {capstoneSubmissions.filter((c: any) => c.status === 'PENDING_REVIEW').length}
                </div>
                <span className="text-[10px] text-amber-700 font-bold block">جاهزة لتدقيق المعلم والموجه</span>
              </div>

              <div className="p-4 bg-blue-50/60 border border-blue-300 space-y-1">
                <span className="text-xs text-blue-900 font-bold">متوسط درجات الشعبة</span>
                <div className="text-2xl font-black font-mono text-blue-800">
                  {Math.round(capstoneSubmissions.reduce((acc: number, c: any) => acc + c.totalScore, 0) / capstoneSubmissions.length)} / 100
                </div>
                <span className="text-[10px] text-blue-700 font-bold block">معدل إتقان فائق (كفايات القرن 21)</span>
              </div>
            </div>

            {/* Rubric Criteria Guide */}
            <div className="bg-[#F9F7F2] p-4 border border-[#1D1D1B]/15 space-y-2 text-xs">
              <div className="font-extrabold text-[#1D1D1B] flex items-center justify-between">
                <span>معايير التقييم الوزارية الأربعة (Ministerial Rubric Weights):</span>
                <span className="text-[11px] text-[#8A1F1D] font-mono">EB-CAPSTONE-RUBRIC-2026</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-[11px]">
                <div className="bg-white p-2.5 border border-[#1D1D1B]/10 space-y-1">
                  <div className="flex justify-between font-bold text-[#1D1D1B]">
                    <span>1. الدقة المحاسبية</span>
                    <span className="font-mono text-[#8A1F1D]">35 درجة</span>
                  </div>
                  <p className="text-gray-600 text-[10px] leading-relaxed">
                    سلامة قيد اليومية، توازن الأستاذ العام، مطابقة ميزان المراجعة قبل التسويات.
                  </p>
                </div>
                <div className="bg-white p-2.5 border border-[#1D1D1B]/10 space-y-1">
                  <div className="flex justify-between font-bold text-[#1D1D1B]">
                    <span>2. التسويات والورقة</span>
                    <span className="font-mono text-[#8A1F1D]">25 درجة</span>
                  </div>
                  <p className="text-gray-600 text-[10px] leading-relaxed">
                    تسوية المصروفات والإيرادات والمخصصات، وإعداد ورقة العمل ذات العشرة أعمدة.
                  </p>
                </div>
                <div className="bg-white p-2.5 border border-[#1D1D1B]/10 space-y-1">
                  <div className="flex justify-between font-bold text-[#1D1D1B]">
                    <span>3. التحليل المالي JRE</span>
                    <span className="font-mono text-[#8A1F1D]">25 درجة</span>
                  </div>
                  <p className="text-gray-600 text-[10px] leading-relaxed">
                    حساب مؤشرات السيولة والربحية، وكتابة تقرير تفسيري مدعوم بالأدلة وصنع القرار.
                  </p>
                </div>
                <div className="bg-white p-2.5 border border-[#1D1D1B]/10 space-y-1">
                  <div className="flex justify-between font-bold text-[#1D1D1B]">
                    <span>4. اكتمال ملف الإنجاز</span>
                    <span className="font-mono text-[#8A1F1D]">15 درجة</span>
                  </div>
                  <p className="text-gray-600 text-[10px] leading-relaxed">
                    تنظيم الفوليو الرقمي، توثيق المستندات المؤيدة، الشفافية والميثاق المهني.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="bg-white border-2 border-[#1D1D1B] p-6 space-y-4 shadow-xs overflow-x-auto">
            <div className="flex items-center justify-between border-b border-[#1D1D1B]/15 pb-3">
              <div>
                <h4 className="font-extrabold text-sm text-[#1D1D1B]">
                  قائمة مشاريع التخرج وحقائب الطلاب المسلمة
                </h4>
                <p className="text-xs text-[#1D1D1B]/70">انقر على أي ملف لفحص محطاته الثمانية وإسناد التقييم النهائي أو الاعتماد</p>
              </div>
            </div>

            <table className="w-full text-right text-xs border-collapse">
              <thead>
                <tr className="bg-[#1D1D1B] text-[#F9F7F2] font-bold">
                  <th className="p-3">اسم الطالب</th>
                  <th className="p-3">المنشأة الاقتصادية المخصصة</th>
                  <th className="p-3 text-center">المحطات المنجزة</th>
                  <th className="p-3 text-center">تفصيل الدرجات (دقة / تسويات / تفسير / ملف)</th>
                  <th className="p-3 text-center">المجموع الكلي</th>
                  <th className="p-3 text-center">حالة الاعتماد</th>
                  <th className="p-3 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {capstoneSubmissions.map((cap: any) => (
                  <tr key={cap.studentId} className="hover:bg-amber-50/40 transition">
                    <td className="p-3 font-bold text-[#1D1D1B]">
                      {cap.studentName}
                    </td>
                    <td className="p-3 text-[#1D1D1B]/80 font-serif">
                      <div className="font-bold">{cap.firmName}</div>
                      <span className="text-[10px] text-gray-500 font-mono">تاريخ التسليم: {cap.submittedAt}</span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="inline-flex items-center gap-1.5 bg-[#F9F7F2] px-2.5 py-1 border border-[#1D1D1B]/15">
                        <span className="font-mono font-bold text-[#1D1D1B]">{cap.stationsCompleted} / 8</span>
                        <span className="text-[10px] text-gray-500">محطة</span>
                      </div>
                    </td>
                    <td className="p-3 text-center font-mono text-[11px]">
                      <span className="text-emerald-700 font-bold" title="دقة">{cap.rubricScores.accountingAccuracy}</span>
                      <span className="text-gray-400 mx-1">/</span>
                      <span className="text-blue-700 font-bold" title="تسويات">{cap.rubricScores.adjustingEntries}</span>
                      <span className="text-gray-400 mx-1">/</span>
                      <span className="text-amber-700 font-bold" title="تفسير JRE">{cap.rubricScores.financialInterpretation}</span>
                      <span className="text-gray-400 mx-1">/</span>
                      <span className="text-purple-700 font-bold" title="ملف">{cap.rubricScores.dossierCompleteness}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="font-mono font-black text-sm px-2.5 py-1 bg-[#1D1D1B] text-[#C4A484]">
                        {cap.totalScore}%
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      {cap.status === 'CERTIFIED' ? (
                        <span className="bg-emerald-100 text-emerald-900 border border-emerald-400 px-2.5 py-1 font-bold text-[10px] flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          <span>معتمد ومرخص</span>
                        </span>
                      ) : cap.status === 'PENDING_REVIEW' ? (
                        <span className="bg-amber-100 text-amber-900 border border-amber-400 px-2.5 py-1 font-bold text-[10px] flex items-center justify-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-700" />
                          <span>بانتظار التدقيق</span>
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-900 border border-red-400 px-2.5 py-1 font-bold text-[10px] flex items-center justify-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-700" />
                          <span>يحتاج تعديلات</span>
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedCapstone(cap)}
                          className="px-2.5 py-1.5 bg-[#1D1D1B] hover:bg-[#8A1F1D] text-white text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3 h-3 text-[#C4A484]" />
                          <span>فحص وتقييم</span>
                        </button>
                        {cap.status !== 'CERTIFIED' && (
                          <button
                            onClick={() => handleCertifyCapstone(cap.studentId)}
                            className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold transition flex items-center gap-1 cursor-pointer"
                          >
                            <Award className="w-3 h-3" />
                            <span>اعتماد</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Interactive Inspection & Certification Modal */}
          {selectedCapstone && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" dir="rtl">
              <div className="bg-white border-4 border-[#1D1D1B] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b-2 border-[#1D1D1B] pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#8A1F1D] text-white flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-[#1D1D1B]">
                        فحص ملف إنجاز الطالب: {selectedCapstone.studentName}
                      </h3>
                      <span className="text-xs text-gray-600 font-bold">{selectedCapstone.firmName}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedCapstone(null)}
                    className="text-gray-500 hover:text-[#1D1D1B] p-1"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress in the 8 Stations */}
                <div className="bg-[#F9F7F2] p-4 border border-[#1D1D1B]/20 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>موقف محطات الدورة المحاسبية المنجزة:</span>
                    <span className="font-mono text-[#8A1F1D]">{selectedCapstone.stationsCompleted} من 8 محطات</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2.5">
                    <div 
                      className="bg-[#8A1F1D] h-2.5 transition-all"
                      style={{ width: `${(selectedCapstone.stationsCompleted / 8) * 100}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-[10px] text-center font-bold pt-1">
                    <div className="p-1 bg-white border border-emerald-500 text-emerald-900">1. الميثاق والمستندات</div>
                    <div className="p-1 bg-white border border-emerald-500 text-emerald-900">2. اليومية والأستاذ</div>
                    <div className="p-1 bg-white border border-emerald-500 text-emerald-900">3. ميزان والتسويات</div>
                    <div className="p-1 bg-white border border-emerald-500 text-emerald-900">4. القوائم وتقرير JRE</div>
                  </div>
                </div>

                {/* Rubric Evaluation Adjustment */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-[#1D1D1B] border-r-4 border-[#8A1F1D] pr-2">
                    تعديل ورصد درجات سلم التقييم الوزاري (Rubric Scoring):
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 border border-[#1D1D1B]/20 bg-white space-y-1">
                      <div className="flex justify-between font-bold">
                        <span>الدقة المحاسبية لقيد اليومية والترحيل:</span>
                        <span className="font-mono text-[#8A1F1D]">{selectedCapstone.rubricScores.accountingAccuracy} / 35</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="35" 
                        value={selectedCapstone.rubricScores.accountingAccuracy}
                        onChange={e => {
                          const val = parseInt(e.target.value) || 0;
                          setSelectedCapstone((prev: any) => ({
                            ...prev,
                            rubricScores: { ...prev.rubricScores, accountingAccuracy: val },
                            totalScore: val + prev.rubricScores.adjustingEntries + prev.rubricScores.financialInterpretation + prev.rubricScores.dossierCompleteness
                          }));
                        }}
                        className="w-full accent-[#8A1F1D]" 
                      />
                    </div>

                    <div className="p-3 border border-[#1D1D1B]/20 bg-white space-y-1">
                      <div className="flex justify-between font-bold">
                        <span>إعداد التسويات وورقة العمل:</span>
                        <span className="font-mono text-[#8A1F1D]">{selectedCapstone.rubricScores.adjustingEntries} / 25</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="25" 
                        value={selectedCapstone.rubricScores.adjustingEntries}
                        onChange={e => {
                          const val = parseInt(e.target.value) || 0;
                          setSelectedCapstone((prev: any) => ({
                            ...prev,
                            rubricScores: { ...prev.rubricScores, adjustingEntries: val },
                            totalScore: prev.rubricScores.accountingAccuracy + val + prev.rubricScores.financialInterpretation + prev.rubricScores.dossierCompleteness
                          }));
                        }}
                        className="w-full accent-[#8A1F1D]" 
                      />
                    </div>

                    <div className="p-3 border border-[#1D1D1B]/20 bg-white space-y-1">
                      <div className="flex justify-between font-bold">
                        <span>التحليل المالي وصياغة مقال JRE:</span>
                        <span className="font-mono text-[#8A1F1D]">{selectedCapstone.rubricScores.financialInterpretation} / 25</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="25" 
                        value={selectedCapstone.rubricScores.financialInterpretation}
                        onChange={e => {
                          const val = parseInt(e.target.value) || 0;
                          setSelectedCapstone((prev: any) => ({
                            ...prev,
                            rubricScores: { ...prev.rubricScores, financialInterpretation: val },
                            totalScore: prev.rubricScores.accountingAccuracy + prev.rubricScores.adjustingEntries + val + prev.rubricScores.dossierCompleteness
                          }));
                        }}
                        className="w-full accent-[#8A1F1D]" 
                      />
                    </div>

                    <div className="p-3 border border-[#1D1D1B]/20 bg-white space-y-1">
                      <div className="flex justify-between font-bold">
                        <span>اكتمال ملف الإنجاز والتوثيق الرقمي:</span>
                        <span className="font-mono text-[#8A1F1D]">{selectedCapstone.rubricScores.dossierCompleteness} / 15</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="15" 
                        value={selectedCapstone.rubricScores.dossierCompleteness}
                        onChange={e => {
                          const val = parseInt(e.target.value) || 0;
                          setSelectedCapstone((prev: any) => ({
                            ...prev,
                            rubricScores: { ...prev.rubricScores, dossierCompleteness: val },
                            totalScore: prev.rubricScores.accountingAccuracy + prev.rubricScores.adjustingEntries + prev.rubricScores.financialInterpretation + val
                          }));
                        }}
                        className="w-full accent-[#8A1F1D]" 
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-[#1D1D1B] text-white">
                    <span className="font-bold text-xs">المجموع النهائي المحتسب:</span>
                    <span className="text-base font-black font-mono text-[#C4A484]">
                      {selectedCapstone.totalScore} من 100
                    </span>
                  </div>
                </div>

                {/* Qualitative Feedback */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#1D1D1B] block">
                    ملاحظات وتوجيهات المعلم الموجه للطالب:
                  </label>
                  <textarea
                    rows={3}
                    value={selectedCapstone.teacherFeedback}
                    onChange={e => setSelectedCapstone({ ...selectedCapstone, teacherFeedback: e.target.value })}
                    className="w-full p-2.5 text-xs border-2 border-[#1D1D1B] font-serif focus:outline-none focus:ring-1 focus:ring-[#8A1F1D]"
                    placeholder="اكتب التوجيهات أو الملاحظات حول الدورة المحاسبية..."
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1D1D1B]/20">
                  <button
                    onClick={() => setSelectedCapstone(null)}
                    className="px-4 py-2 border border-[#1D1D1B] text-xs font-bold hover:bg-gray-100"
                  >
                    إغلاق النافذة
                  </button>
                  <button
                    onClick={() => {
                      handleCertifyCapstone(selectedCapstone.studentId, selectedCapstone.teacherFeedback);
                    }}
                    className="px-5 py-2 bg-[#8A1F1D] hover:bg-[#701917] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-[#C4A484]" />
                    <span>اعتماد المشروع وإصدار إفادة التخرج</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
