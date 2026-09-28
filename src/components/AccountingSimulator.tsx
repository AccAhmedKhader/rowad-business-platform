import React, { useState, useEffect } from 'react';
import { 
  Scale, BookMarked, PenTool, Calculator, FileSpreadsheet, 
  Sparkles, ShieldAlert, EyeOff, Eye, CheckCircle2, Award, 
  HelpCircle, AlertTriangle, BookOpen
} from 'lucide-react';
import { TAccountSimulator, TAccountSimulatorProps } from './TAccountSimulator';
import { useCurriculumFilter } from '../context/CurriculumFilterContext';

export interface AccountingSimulatorProps extends TAccountSimulatorProps {
  showCurriculumGuide?: boolean;
}

/**
 * AccountingSimulator:
 * المنظومة المتكاملة لمحاكاة الدورة المحاسبية طبقاً لمنهج كتاب الوزارة الرسمي (البكالوريا المصرية).
 * يعرض نماذج تفاعلية لـ:
 * 1. دفاتر اليومية المساعدة (الوحدة 3)
 * 2. دفتر الأستاذ العام وحسابات حرف T
 * 3. ميزان المراجعة وكاشف الأخطاء والحساب المعلق
 * 4. خيار 'الترحيل اليدوي' بالتوازي مع الترحيل التلقائي
 * 5. زر خاص لـ 'محاكاة الأخطاء' لإخفاء الترحيل الصحيح واكتشاف الفروق
 * 6. الحسابات الختامية والميزانية العمومية المفصلة
 * 7. حالات تدريبية واقعية معتمدة من الكتاب الرسمي
 */
export const AccountingSimulator: React.FC<AccountingSimulatorProps> = ({
  initialSubTab = 'pipeline',
  initialPostingMode = 'manual',
  initialHideCorrectPosting = true,
  showCurriculumGuide = true
}) => {
  const { selectedUnitId: globalUnitId, isSidebarCollapsed } = useCurriculumFilter();

  const [activeTab, setActiveTab] = useState<
    'pipeline' | 'subsidiary' | 'journal' | 't_accounts' | 'posting_challenge' | 'trial_balance' | 'adjusting_entries' | 'final_accounts' | 'guided_cases'
  >(initialSubTab);

  // Auto-switch tab based on selected curriculum unit
  useEffect(() => {
    if (globalUnitId === 'unit-3') {
      setActiveTab('journal');
    } else if (globalUnitId === 'unit-4') {
      setActiveTab('trial_balance');
    } else if (globalUnitId === 'unit-5') {
      setActiveTab('adjusting_entries');
    } else if (globalUnitId === 'unit-7') {
      setActiveTab('final_accounts');
    } else if (globalUnitId === 'unit-2' || globalUnitId === 'unit-1') {
      setActiveTab('pipeline');
    }
  }, [globalUnitId]);

  const [mode, setMode] = useState<'auto' | 'manual'>(initialPostingMode);
  const [hideCorrect, setHideCorrect] = useState<boolean>(initialHideCorrectPosting);
  const [showCurriculumModal, setShowCurriculumModal] = useState<boolean>(false);

  return (
    <div className={`space-y-6 font-serif transition-all duration-300 ${
      isSidebarCollapsed ? 'w-full max-w-none px-2 sm:px-6' : ''
    }`} dir="rtl">
      {/* Official Curriculum Banner */}
      <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#1D1D1B] text-[#C4A484] text-xs font-bold px-2.5 py-0.5 uppercase tracking-wider">
                كتاب المحاسبة المالية المعتمد • وزارة التربية والتعليم
              </span>
              <span className="bg-[#C4A484]/25 text-[#1D1D1B] text-xs font-bold px-2 py-0.5 border border-[#1D1D1B]/20">
                الوحدات من الأولى وحتى الخامسة (الدورة المحاسبية المتكاملة الشاملة)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#1D1D1B] mt-1">
              مكون المحاكاة المحاسبية التفاعلي الشامل (Units 1 - 5 Simulator)
            </h1>
            <p className="text-xs sm:text-sm text-[#1D1D1B]/75 max-w-4xl leading-relaxed">
              محاكاة ميدانية تفاعلية متزامنة تغطي الدورة المحاسبية الكاملة: معادلة الميزانية وتحليل أثر العمليات (الوحدة 1)، قيود اليومية ونظرية القيد المزدوج (الوحدة 2)، دفاتر اليومية المساعدة (الوحدة 3)، الترحيل لدفتر الأستاذ T وميزان المراجعة وتصحيح الأخطاء (الوحدة 4)، وصولاً إلى التسويات الجردية والقوائم المالية الختامية والنسب المالية (الوحدة 5).
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowCurriculumModal(!showCurriculumModal)}
              className="px-3 py-2 bg-[#F9F7F2] hover:bg-[#F0EEE6] text-[#1D1D1B] border border-[#1D1D1B]/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#C4A484]" />
              <span>{showCurriculumModal ? 'إخفاء دليل الوحدات' : 'دليل وحدات الكتاب المدرسي (1 - 5)'}</span>
            </button>
          </div>
        </div>

        {/* Expandable Official Cases Curriculum Guide */}
        {showCurriculumModal && (
          <div className="mt-4 pt-4 border-t border-[#1D1D1B]/15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/15 space-y-1">
              <span className="font-bold text-[#1D1D1B] block">الوحدة الأولى: معادلة الميزانية والمركز المالي</span>
              <p className="text-[#1D1D1B]/70 leading-relaxed text-[11px]">
                تحليل أثر المعاملات الأربعة الأساسية على معادلة (الأصول = الالتزامات + حقوق الملكية) مع التحديث والتحقق اللحظي من التوازن المطلق.
              </p>
            </div>
            <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/15 space-y-1">
              <span className="font-bold text-[#1D1D1B] block">الوحدة الثانية: دفتر اليومية والقيد المزدوج</span>
              <p className="text-[#1D1D1B]/70 leading-relaxed text-[11px]">
                تسجيل قيود اليومية البسيطة والمركبة وفق الأصول المحاسبية، وتحديد الطرف المدين (الآخذ) والطرف الدائن (المعطي) بدقة.
              </p>
            </div>
            <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/15 space-y-1">
              <span className="font-bold text-[#1D1D1B] block">الوحدة الثالثة: الدفاتر المساعدة (الطريقة الفرنسية/الإنجليزية)</span>
              <p className="text-[#1D1D1B]/70 leading-relaxed text-[11px]">
                تطبيقات منشأة فريدة ومحلات بلال: يوميات المبيعات والمشتريات الآجلة، مردوداتها، دفتر النقدية التحليلي، وسلفة المصروفات النثرية المستديمة.
              </p>
            </div>
            <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/15 space-y-1">
              <span className="font-bold text-[#1D1D1B] block">الوحدة الرابعة: الترحيل للأستاذ وميزان المراجعة وتصحيح الأخطاء</span>
              <p className="text-[#1D1D1B]/70 leading-relaxed text-[11px]">
                محاكاة الترحيل اليدوي لحسابات T، توليد ميزان المراجعة بالأرصدة والمجاميع، واختبار كشف الأخطاء وفتح الحساب المعلق ومعالجته بالطريقتين المطولة والمختصرة.
              </p>
            </div>
            <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/15 space-y-1 md:col-span-2 lg:col-span-2">
              <span className="font-bold text-[#1D1D1B] block">الوحدة الخامسة: التسويات الجردية والقوائم الختامية والنسب المالية</span>
              <p className="text-[#1D1D1B]/70 leading-relaxed text-[11px]">
                لوحة إثبات التسويات الجردية الأربعة (المصروفات والإيرادات المقدمة والمستحقة)، استخراج بضاعة آخر المدة، حساب المتاجرة والأرباح والخسائر، الميزانية العمومية المفصلة، وحزمة المؤشرات المالية الستة (رأس المال العامل، نسبة التداول، نسبة السيولة السريعة، نسبة الديون، وهوامش الربح ودوران المخزون).
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Core Simulation Engine */}
      <TAccountSimulator
        key={`${activeTab}-${mode}-${hideCorrect}`}
        initialSubTab={activeTab}
        initialPostingMode={mode}
        initialHideCorrectPosting={hideCorrect}
      />
    </div>
  );
};

export { TAccountSimulator };
export default AccountingSimulator;
