import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Target, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  BrainCircuit, 
  FileCheck2, 
  Award, 
  Layers, 
  RotateCcw, 
  User, 
  Sparkles, 
  ChevronRight, 
  BookOpen, 
  ShieldCheck,
  Scale,
  Flame,
  Bookmark,
  Users,
  Briefcase
} from 'lucide-react';
import { lmsService } from '../services/lmsService';
import { ALL_UNITS } from '../data/unitsData';
import { StudentProfile, StudentProgress, StudentMasteryItem, UserRole } from '../types';
import { SourceProvenanceBadge } from './SourceProvenanceBadge';
import { useUser } from '../context/UserContext';

interface StudentLmsViewProps {
  onNavigateToTab: (tab: any) => void;
  onSelectUnit: (unitNumber: number) => void;
  onStartAssessment?: (unitNumber: number) => void;
}

export const StudentLmsView: React.FC<StudentLmsViewProps> = ({
  onNavigateToTab,
  onSelectUnit,
  onStartAssessment
}) => {
  const { 
    user, 
    levelInfo, 
    setOpenUserModal, 
    setActiveUserModalTab,
    switchRole
  } = useUser();

  const [student, setStudent] = useState<StudentProfile>(lmsService.getCurrentStudent());
  const [progress, setProgress] = useState<StudentProgress>(lmsService.getProgress());
  const [masteryItems, setMasteryItems] = useState<StudentMasteryItem[]>([]);
  const [reviewRecs, setReviewRecs] = useState<{ loTitle: string; unitNumber: number; reason: string }[]>([]);
  const [bloomStats, setBloomStats] = useState<Record<string, { correct: number; total: number; percentage: number }>>({});
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user.name);

  // Load latest LMS data
  const refreshData = () => {
    const curStudent = lmsService.getCurrentStudent();
    const curProgress = lmsService.getProgress();
    setStudent(curStudent);
    setProgress(curProgress);
    setMasteryItems(lmsService.calculateMastery());
    setReviewRecs(lmsService.getReviewRecommendations());
    setBloomStats(lmsService.getCognitiveBloomStats());
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  // Performance calculations
  const totalAnswered = Object.keys(progress.answeredQuestions).length;
  const correctCount = Object.values(progress.answeredQuestions).filter(a => a.isCorrect).length;
  const overallAccuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
  
  // Total expected lessons across all units
  const totalLessonsCount = ALL_UNITS.reduce((acc, u) => acc + (u.lessons?.length || 0), 0);
  const completionPercentage = Math.min(100, Math.round((progress.completedLessons.length / (totalLessonsCount || 1)) * 100));

  const handleSaveName = () => {
    if (!nameInput.trim()) return;
    const updated = { ...student, name: nameInput.trim() };
    lmsService.saveCurrentStudent(updated);
    setStudent(updated);
    setIsEditingName(false);
  };

  const handleResetData = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في إعادة ضبط سجل تدريباتك؟ سيتم تصفير الأسئلة والمحاولات المحلية لحماية خصوصيتك.')) {
      lmsService.resetStudentData();
      refreshData();
    }
  };

  return (
    <div className="space-y-8 pb-20 font-['Cairo']">
      
      {/* Top Welcome & World-Class User Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 border border-indigo-500/20 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>لوحة التعلم التراكمية — LMS الطالب والمنظومة الموحدة</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl shadow-inner select-none">
                {user.avatar}
              </div>

              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 text-lg font-black text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-400"
                    placeholder="اسم المستخدم..."
                  />
                  <button
                    onClick={handleSaveName}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    حفظ
                  </button>
                  <button
                    onClick={() => { setIsEditingName(false); setNameInput(user.name); }}
                    className="px-2 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    إلغاء
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                      مرحباً بك، {user.name}
                    </h1>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="text-xs text-indigo-300 hover:text-white underline cursor-pointer"
                    >
                      (تعديل)
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {levelInfo.title} (مستوى {levelInfo.level})
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="text-xs font-bold text-orange-400 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-orange-400" />
                      {user.studyStreak.currentDays} أيام متواصلة 🔥
                    </span>
                  </div>
                </div>
              )}
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pt-1">
              {user.grade} • {user.track}. يتم احتساب مستوى إتقانك وفق خوارزمية تربوية مستندة لمصفوفة نواتج التعلم ومستويات بلوم المعرفية.
            </p>
          </div>

          {/* Quick Stat Badges & Center Button */}
          <div className="flex flex-col sm:items-end gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 text-center min-w-[90px]">
                <div className="text-xl sm:text-2xl font-black text-amber-300">{overallAccuracy}%</div>
                <div className="text-[10px] text-slate-300 font-bold">متوسط الدقة</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 text-center min-w-[90px]">
                <div className="text-xl sm:text-2xl font-black text-emerald-300">{totalAnswered}</div>
                <div className="text-[10px] text-slate-300 font-bold">سؤال منجز</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 text-center min-w-[90px]">
                <div className="text-xl sm:text-2xl font-black text-indigo-300">{user.gamification.xp}</div>
                <div className="text-[10px] text-slate-300 font-bold">نقاط XP</div>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveUserModalTab('overview');
                setOpenUserModal(true);
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>فتح مركز المستخدم والتعلم الشخصي ⚡</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Role Switcher Quick Bar */}
      <div className="bg-slate-100 border border-slate-200 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Users className="w-4 h-4 text-indigo-600" />
          <span>منظور الحساب التعليمي النشط:</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {([
            { role: 'student', label: 'طالب البكالوريا', icon: GraduationCap },
            { role: 'teacher', label: 'معلم أول / موجه', icon: Briefcase },
            { role: 'parent', label: 'ولي أمر متابع', icon: Users },
            { role: 'auditor', label: 'مشرف جودة وحوكمة', icon: ShieldCheck }
          ] as const).map(item => {
            const isSelected = user.role === item.role;
            const Icon = item.icon;
            return (
              <button
                key={item.role}
                onClick={() => switchRole(item.role)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-black shadow-xs'
                    : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Assessment Engine Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-5 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black font-['Cairo']">
              نظام الاختبارات والتشخيص المعرفي (Assessment Engine)
            </h3>
            <p className="text-xs sm:text-sm text-amber-100 mt-0.5">
              اختبر مستواك بمؤقت قياسي، واحصل على تقرير تشخيصي يحلل مستويات تفكيرك (بلوم) ويحدد المفاهيم التي تتطلب المراجعة.
            </p>
          </div>
        </div>

        {onStartAssessment && (
          <button
            onClick={() => onStartAssessment(1)}
            className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-black transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>بدء اختبار تشخيصي الآن</span>
          </button>
        )}
      </div>

      {/* Progress & Mastery Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Curriculum Completion */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-black">
              <Target className="w-5 h-5 text-indigo-600" />
              <h3>إنجاز المنهج الدراسي</h3>
            </div>
            <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
              {progress.completedLessons.length} من {totalLessonsCount} درس
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span>نسبة التقدم المكتمل</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            يتم احتساب الدرس مكتملاً عند الاطلاع على محطاته البيداغوجية وحل أسئلة تقييمه الصفي أو بنك الأسئلة المرتبط به.
          </p>
        </div>

        {/* Card 2: Diagnostic Accuracy & Strengths */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-black">
              <Award className="w-5 h-5 text-emerald-600" />
              <h3>الأداء والاستيعاب العام</h3>
            </div>
            <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {correctCount} إجابة صحيحة
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="space-y-1">
              <div className="text-lg font-black text-slate-900">
                {overallAccuracy >= 80 ? 'مستوى استيعاب متميز' : overallAccuracy >= 60 ? 'مستوى استيعاب متوسط' : 'في مرحلة التأسيس'}
              </div>
              <div className="text-xs text-slate-500">
                معدل الخطأ التراكمي: {totalAnswered > 0 ? totalAnswered - correctCount : 0} أسئلة
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
            💡 <strong>ملاحظة تربوية:</strong> الهدف ليس مجرد الإجابة الصحيحة بل فهم التبرير المنهجي وتحليل المشتتات والخيارات الخاطئة.
          </div>
        </div>

        {/* Card 3: JRE Lab Diagnostics */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 font-black">
              <Scale className="w-5 h-5 text-purple-600" />
              <h3>استدلال JRE (سلم الـ 20)</h3>
            </div>
            <SourceProvenanceBadge 
              origin="PLATFORM_EXPLANATION" 
              sourceId="SRC-PLAT-JRE-GUIDE" 
              compact={true} 
            />
          </div>

          <div className="space-y-2">
            <div className="text-sm font-black text-slate-900">
              {progress.jreSubmissions.length} مقالات استدلال مسجلة
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              تقييم تدريبي إرشادي من المنصة يركز على تفكيك الإجابة لخمسة أركان: (الحكم، التبرير، الدليل، الموازنة، والخاتمة).
            </p>
          </div>

          <button
            onClick={() => onNavigateToTab('jre_lab')}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-xs transition-all cursor-pointer border border-purple-200"
          >
            <span>دخول مختبر الحكم والاستدلال</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Smart Error Notebook Quick Box */}
      {user.mistakeNotebook.length > 0 && (
        <div className="bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base text-rose-950">
                  دفتر الأخطاء والمفاهيم الذكي ({user.mistakeNotebook.filter(m => !m.resolved).length} أسئلة معلقة)
                </h3>
                <span className="text-[10px] font-black bg-rose-200 text-rose-800 px-2 py-0.5 rounded-full">
                  معالجة موجهة
                </span>
              </div>
              <p className="text-xs text-rose-800 mt-0.5">
                لديك أسئلة سابقة غير محلولة، حلها الآن يكسبك +30 XP لكل مفهوم ويغلق فجوة التعلم.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setActiveUserModalTab('mistakes');
              setOpenUserModal(true);
            }}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            فتح دفتر الأخطاء الآن 🛠️
          </button>
        </div>
      )}

      {/* Actionable Review Recommendations: "نقاط تحتاج مراجعة" */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="font-black text-slate-900 text-lg">نقاط تحتاج إلى مراجعة وتثبيت مفاهيمي</h3>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            {reviewRecs.length > 0 ? `${reviewRecs.length} توصيات مخصصة` : 'لا توجد فجوات حالياً'}
          </span>
        </div>

        {reviewRecs.length === 0 ? (
          <div className="text-center py-8 space-y-2 bg-emerald-50/50 rounded-2xl border border-emerald-100 p-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-black text-emerald-900 text-base">رائع! أداؤك متوازن في كافة النواتج التي تدربت عليها</h4>
            <p className="text-xs text-emerald-700 max-w-md mx-auto">
              لم تسجل الخوارزمية تكرار أخطاء ملحوظة في أي ناتج تعليمي حتى الآن. استمر في حل بنك الأسئلة والتقييمات الأسبوعية.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviewRecs.map((rec, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black text-amber-800 bg-amber-200/60 px-2 py-0.2 rounded-md">
                      الوحدة 0{rec.unitNumber}
                    </span>
                    <h5 className="font-bold text-sm text-slate-900">{rec.loTitle}</h5>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{rec.reason}</p>
                  <button
                    onClick={() => {
                      onSelectUnit(rec.unitNumber);
                      onNavigateToTab('question_bank');
                    }}
                    className="inline-flex items-center gap-1 text-xs text-amber-800 hover:text-amber-950 font-black pt-1"
                  >
                    <span>تدرب على أسئلة هذه الوحدة الآن</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bloom Taxonomy & Cognitive Domain Breakdown */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-indigo-600" />
            <h3 className="font-black text-slate-900 text-lg">تحليل المستويات المعرفية (هرم بلوم المعدل)</h3>
          </div>
          <span className="text-xs font-bold text-slate-500">
            توزيع الإتقان حسب المهارة العقلية
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {Object.entries(bloomStats).map(([level, stat]) => (
            <div key={level} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="text-xs font-black text-slate-700 block">{level}</span>
              <div className="text-xl font-black text-indigo-600">{stat.percentage}%</div>
              <div className="text-[11px] text-slate-400">
                {stat.correct} من {stat.total}
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Units Mastery Matrix */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <h3 className="font-black text-slate-900 text-lg">مصفوفة إتقان نواتج التعلم (Mastery Matrix)</h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <span>مقياس 0-4 (متقن = 4)</span>
          </div>
        </div>

        <div className="space-y-4">
          {ALL_UNITS.map(unit => {
            const unitMasteries = masteryItems.filter(m => m.unitNumber === unit.number);
            const totalOutcomes = unit.learningOutcomes?.length || 0;
            const masteredCount = unitMasteries.filter(m => m.score >= 3).length;

            return (
              <div key={unit.number} className="border border-slate-100 rounded-2xl p-4 hover:border-slate-300 transition-all bg-slate-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-xs font-black">
                      الوحدة {unit.number}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{unit.title}</h4>
                  </div>
                  <div className="text-xs text-slate-500 font-bold">
                    إتقان {masteredCount} من {totalOutcomes} نواتج تعلم
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {unitMasteries.map(m => {
                    const badgeColor = 
                      m.level === 'متقن' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                      m.level === 'جيد' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                      m.level === 'يحتاج تدريب' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                      m.level === 'بدأ' ? 'bg-indigo-100 text-indigo-800 border-indigo-300' :
                      'bg-slate-100 text-slate-500 border-slate-200';

                    return (
                      <div key={m.loId} className="bg-white p-3 rounded-xl border border-slate-200 text-xs flex flex-col justify-between gap-2 shadow-2xs">
                        <span className="text-slate-700 font-medium line-clamp-2" title={m.loTitle}>
                          {m.loTitle}
                        </span>
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                          <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] border ${badgeColor}`}>
                            {m.level} ({m.score}/4)
                          </span>
                          <span className="text-slate-400 text-[10px]">
                            {m.correctCount} / {m.totalQuestionsAttempted} أسئلة
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Governance & Reset Options */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-right">
          <div className="flex items-center gap-2 justify-center sm:justify-start text-slate-900 font-bold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>حماية البيانات وحرية تصفير السجل التدريبي</span>
          </div>
          <p className="text-xs text-slate-500">
            تُحفظ كافة سجلاتك التدريبية والتقييمية محلياً على هذا المتصفح لحماية خصوصيتك التامة، ويمكنك تصفيرها في أي وقت.
          </p>
        </div>

        <button
          onClick={handleResetData}
          className="px-4 py-2 rounded-xl border border-rose-200 text-rose-700 bg-white hover:bg-rose-50 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-2xs"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>إعادة ضبط سجل التدريبات</span>
        </button>
      </div>

    </div>
  );
};
