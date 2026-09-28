import React, { useState } from 'react';
import { 
  Building2, 
  FileText, 
  Scale, 
  BarChart3, 
  CheckCircle2, 
  AlertTriangle, 
  Printer, 
  Download, 
  Award, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Clock, 
  ShieldCheck, 
  BookOpen, 
  FileCheck, 
  TrendingUp, 
  Calculator, 
  PenTool, 
  ChevronRight, 
  Share2, 
  RefreshCw,
  FolderLock,
  Layers,
  HelpCircle,
  Eye
} from 'lucide-react';
import { 
  capstoneProjects, 
  capstoneRubric, 
  CapstoneProjectDefinition, 
  CapstoneTransaction,
  CapstoneAdjustingEntry 
} from '../../data/capstoneProjectsData';
import { useAuth } from '../../context/AuthContext';
import confetti from 'canvas-confetti';

export type CapstoneStation = 
  | 'enterprise_charter' 
  | 'documentary_audit' 
  | 'journal_and_ledger' 
  | 'trial_balance' 
  | 'adjustments' 
  | 'financial_statements' 
  | 'jre_analysis' 
  | 'rubric_and_dossier';

export const AccountingCapstoneStudio: React.FC = () => {
  const { user } = useAuth();
  const project = capstoneProjects[0]; // Primary EB standard enterprise
  const [activeStation, setActiveStation] = useState<CapstoneStation>('enterprise_charter');
  
  // Progress tracking across stations (stored in state)
  const [completedStations, setCompletedStations] = useState<Record<string, boolean>>({
    enterprise_charter: true,
    documentary_audit: false,
    journal_and_ledger: false,
    trial_balance: false,
    adjustments: false,
    financial_statements: false,
    jre_analysis: false,
    rubric_and_dossier: false
  });

  // Interactive Student Inputs
  const [selectedTxId, setSelectedTxId] = useState<string>(project.transactions[0].id);
  const [activeLedgerTab, setActiveLedgerTab] = useState<'cash' | 'bank' | 'purchases' | 'sales' | 'capital'>('cash');
  const [selectedRatioIndex, setSelectedRatioIndex] = useState<number>(0);
  
  // Student JRE justification input state
  const [studentJreText, setStudentJreText] = useState<string>(
    'بصفتي المحاسب المالي المعتمد للمنشأة، تم إثبات قيد التسوية للإيجار المدفوع مقدماً بمبلغ 5,000 ج.م استناداً إلى مبدأ استقلال الفترات المالية ومقابلة الإيرادات بالمصروفات طبقاً للمعيار المصري رقم (1)، لعزل نصيب شهر نوفمبر وإظهاره أصلاً متداولاً في قائمة المركز المالي بدلاً من تضخيم مصروفات الفترة الحالية.'
  );
  const [jreValidated, setJreValidated] = useState<boolean>(true);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Mark station completed
  const handleMarkStationComplete = (station: CapstoneStation) => {
    setCompletedStations(prev => ({ ...prev, [station]: true }));
    try {
      confetti({ particleCount: 40, spread: 55, origin: { y: 0.8 } });
    } catch {}
    setSuccessToast(`تم اعتماد وتوثيق مخرجات محطة "${getStationTitle(station)}" بملف إنجازك بنجاح!`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const getStationTitle = (st: CapstoneStation): string => {
    switch (st) {
      case 'enterprise_charter': return '1. ميثاق المنشأة والمركز الافتتاحي';
      case 'documentary_audit': return '2. التدقيق المستندي وقيد العمليات';
      case 'journal_and_ledger': return '3. اليوميات والأستاذ وترصيد الحسابات';
      case 'trial_balance': return '4. ميزان المراجعة قبل التسويات والأخطاء';
      case 'adjustments': return '5. التسويات الجردية وميزان المراجعة المعدل';
      case 'financial_statements': return '6. قائمتي الدخل والمركز المالي';
      case 'jre_analysis': return '7. التفسير المحاسبي JRE والتحليل بالنسب';
      case 'rubric_and_dossier': return '8. التقييم الوزاري وشهادة التخرج';
    }
  };

  // Station progression percentages
  const totalStations = 8;
  const completedCount = Object.values(completedStations).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalStations) * 100);

  // Selected Transaction detail
  const currentTx = project.transactions.find(t => t.id === selectedTxId) || project.transactions[0];

  return (
    <div className="space-y-8 font-serif" dir="rtl">
      
      {/* 1. Header Banner & Progress Bar */}
      <div className="bg-[#1D1D1B] text-[#F9F7F2] p-6 sm:p-8 border-2 border-[#1D1D1B] space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#C4A484] text-[#1D1D1B] flex items-center justify-center font-black">
              <Building2 className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#8A1F1D] text-white text-[11px] font-bold px-2 py-0.5">
                  المرحلة السادسة للتطوير
                </span>
                <span className="text-xs text-[#C4A484] font-bold">
                  مشروع التخرج المحاسبي وملف الإنجاز الرقمي المعتمد (EB Capstone Portfolio)
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black mt-2">
                استوديو المشروع التطبيقي الختامي ومحاكاة الدورة المحاسبية الكاملة
              </h1>
              <p className="text-xs text-[#F9F7F2]/80 mt-1 max-w-3xl leading-relaxed">
                تنفيذ عملي متسلسل من واقع المستندات المؤيدة الفعلية لمنشأة فردية تجارية حتى إعداد القوائم المالية، التحليل بالنسب، وتصدير ملف الإنجاز الوزاري المعتمد.
              </p>
            </div>
          </div>

          {/* Quick PDF Dossier Print Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setActiveStation('rubric_and_dossier');
                setTimeout(() => window.print(), 300);
              }}
              className="px-4 py-2.5 bg-[#C4A484] hover:bg-[#b59575] text-[#1D1D1B] text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة ملف الإنجاز المعتمد (PDF)</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#C4A484]">نسبة استيفاء المشروع التطبيقي:</span>
              <span className="font-mono font-bold text-white text-sm">{progressPercent}%</span>
              <span className="text-[11px] text-white/60">({completedCount} من {totalStations} محطات منجزة)</span>
            </div>
            <span className="text-emerald-400 text-[11px] font-bold">
              {progressPercent === 100 ? 'جاهز للاعتماد النهائي وإصدار الشهادة' : 'قيد التدقيق والإنجاز'}
            </span>
          </div>
          <div className="w-full h-3 bg-white/10 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#C4A484] to-emerald-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {successToast && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-500 text-emerald-900 text-xs font-bold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successToast}</span>
          </div>
          <span className="text-emerald-700 text-[10px] font-mono">تم الحفظ التلقائي في ملف الإنجاز</span>
        </div>
      )}

      {/* 2. Interactive 8-Station Roadmap Navigator */}
      <div className="bg-[#F9F7F2] border-2 border-[#1D1D1B] p-2 overflow-x-auto">
        <div className="flex items-center gap-1.5 min-w-[850px]">
          {(
            [
              'enterprise_charter',
              'documentary_audit',
              'journal_and_ledger',
              'trial_balance',
              'adjustments',
              'financial_statements',
              'jre_analysis',
              'rubric_and_dossier'
            ] as CapstoneStation[]
          ).map((st, idx) => {
            const isCurrent = activeStation === st;
            const isDone = completedStations[st];
            return (
              <button
                key={st}
                onClick={() => setActiveStation(st)}
                className={`flex-1 px-3 py-2 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border ${
                  isCurrent
                    ? 'bg-[#1D1D1B] text-[#C4A484] border-[#1D1D1B] shadow-xs'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-white text-[#1D1D1B] border-[#1D1D1B]/20 hover:bg-gray-100'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-[#1D1D1B]/10 text-[10px] font-mono flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                )}
                <span className="truncate">{getStationTitle(st).split('. ')[1]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. STATION CONTENT WORKSPACES */}

      {/* STATION 1: ENTERPRISE CHARTER & OPENING POSITION */}
      {activeStation === 'enterprise_charter' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-[#1D1D1B] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1D1D1B]/15 pb-4">
              <div>
                <span className="text-[11px] font-bold text-[#8A1F1D] uppercase tracking-wider block">
                  المحطة الأولى: ميثاق التأسيس وبطاقة المنشأة
                </span>
                <h2 className="text-xl font-black text-[#1D1D1B] mt-1">
                  {project.enterprise.name}
                </h2>
                <p className="text-xs text-[#1D1D1B]/70 mt-1">
                  {project.enterprise.legalForm} • {project.enterprise.academicYear}
                </p>
              </div>

              <span className="px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> ميثاق معتمد بملف الإنجاز
              </span>
            </div>

            {/* Commercial Profile Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-xs">
              <div>
                <span className="text-gray-500 block">رقم السجل التجاري:</span>
                <span className="font-mono font-bold text-[#1D1D1B]">{project.enterprise.commercialRegister}</span>
              </div>
              <div>
                <span className="text-gray-500 block">رقم البطاقة الضريبية:</span>
                <span className="font-mono font-bold text-[#1D1D1B]">{project.enterprise.taxRegistrationNumber}</span>
              </div>
              <div>
                <span className="text-gray-500 block">الحساب البنكي المعتمد:</span>
                <span className="font-bold text-[#1D1D1B]">{project.enterprise.bankAccount}</span>
              </div>
              <div>
                <span className="text-gray-500 block">النظام والمعيار المحاسبي:</span>
                <span className="font-bold text-[#8A1F1D]">{project.enterprise.accountingSystem}</span>
              </div>
            </div>

            {/* Opening Balance Sheet Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm text-[#1D1D1B] flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#8A1F1D]" />
                  <span>بيان المركز المالي الافتتاحي في بداية الدورة (1 أكتوبر 2026)</span>
                </h3>
                <span className="text-xs font-mono font-bold text-[#1D1D1B] bg-white border border-[#1D1D1B]/20 px-2 py-0.5">
                  معادلة الميزانية: الأصول (390,000) = الخصوم (40,000) + حقوق الملكية (350,000)
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right border-collapse">
                  <thead>
                    <tr className="bg-[#1D1D1B] text-[#F9F7F2]">
                      <th className="p-3 font-bold">اسم الحساب الافتتاحي</th>
                      <th className="p-3 font-bold text-center">التصنيف المحاسبي</th>
                      <th className="p-3 font-bold text-center">الرصيد المدين (ج.م)</th>
                      <th className="p-3 font-bold text-center">الرصيد الدائن (ج.م)</th>
                      <th className="p-3 font-bold">الدلالة الاقتصادية والرقابية</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1D1D1B]/15">
                    {project.openingBalances.map((item, idx) => (
                      <tr key={idx} className="hover:bg-[#F9F7F2]/80 transition">
                        <td className="p-3 font-bold text-[#1D1D1B]">{item.account}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 text-[10px] font-bold ${
                            item.type === 'ASSET' ? 'bg-blue-100 text-blue-900 border border-blue-200' :
                            item.type === 'LIABILITY' ? 'bg-amber-100 text-amber-900 border border-amber-200' :
                            'bg-purple-100 text-purple-900 border border-purple-200'
                          }`}>
                            {item.type === 'ASSET' ? 'أصل متداول/ثابت' :
                             item.type === 'LIABILITY' ? 'التزام قصير الأجل' : 'حقوق ملكية'}
                          </span>
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-sm text-[#1D1D1B]">
                          {item.debit > 0 ? item.debit.toLocaleString() : '—'}
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-sm text-[#1D1D1B]">
                          {item.credit > 0 ? item.credit.toLocaleString() : '—'}
                        </td>
                        <td className="p-3 text-[#1D1D1B]/75 text-[11px]">
                          {item.account.includes('الخزينة') ? 'سيولة نقدية جاهزة للمصروفات النثرية والطارئة' :
                           item.account.includes('البنك') ? 'رصيد حساب المعاملات التجارية والشيكات مع العملاء' :
                           item.account.includes('بضاعة') ? 'مخزون فعلي تم جرده وتقييمه بسعر التكلفة' :
                           item.account.includes('سيارة') ? 'أصل رأسمالي يخدم العمليات التشغيلية ويخضع للإهلاك' :
                           item.account.includes('الموردون') ? 'رصيد دائن مستحق السداد خلال شهر لشركة الأهرام' : 'رأس مال المنشأة المدفوع'}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-[#1D1D1B]/5 font-black text-xs">
                      <td className="p-3 text-[#1D1D1B]">إجمالي المركز المالي الافتتاحي المتوازن</td>
                      <td className="p-3 text-center text-emerald-800 font-bold">تطابق تام (100%)</td>
                      <td className="p-3 text-center font-mono text-sm text-emerald-800">390,000 ج.م</td>
                      <td className="p-3 text-center font-mono text-sm text-emerald-800">390,000 ج.م</td>
                      <td className="p-3 text-[11px] text-emerald-800">توازن دقيق بين جانبي الأصول والالتزامات</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer Step Action */}
            <div className="pt-4 border-t border-[#1D1D1B]/15 flex items-center justify-between">
              <span className="text-xs text-gray-500 font-mono">الخطوة 1 من 8 في ملف الإنجاز</span>
              <button
                onClick={() => {
                  handleMarkStationComplete('enterprise_charter');
                  setActiveStation('documentary_audit');
                }}
                className="px-5 py-2.5 bg-[#1D1D1B] text-[#C4A484] hover:bg-[#333330] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>الانتقال إلى محطة التدقيق المستندي</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATION 2: DOCUMENTARY AUDIT & SOURCE VERIFICATION */}
      {activeStation === 'documentary_audit' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-[#1D1D1B] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1D1D1B]/15 pb-4">
              <div>
                <span className="text-[11px] font-bold text-[#8A1F1D] uppercase tracking-wider block">
                  المحطة الثانية: حقيبة المستندات المؤيدة والتدقيق
                </span>
                <h2 className="text-xl font-black text-[#1D1D1B] mt-1">
                  فحص المستندات الأصلية واستخراج القيود المحاسبية
                </h2>
                <p className="text-xs text-[#1D1D1B]/70 mt-1">
                  لا قيد في الدفاتر دون مستند مؤيد وصحيح قانوناً ومحاسبياً (المبدأ المستندي المصري).
                </p>
              </div>

              <div className="text-xs bg-[#F9F7F2] border border-[#1D1D1B]/20 p-2 font-mono text-[#1D1D1B]">
                إجمالي مستندات الدورة: {project.transactions.length} مستندات معتمدة
              </div>
            </div>

            {/* Document Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {project.transactions.map(tx => (
                <button
                  key={tx.id}
                  onClick={() => setSelectedTxId(tx.id)}
                  className={`px-3 py-2 text-xs font-bold transition shrink-0 cursor-pointer border ${
                    selectedTxId === tx.id
                      ? 'bg-[#1D1D1B] text-[#C4A484] border-[#1D1D1B]'
                      : 'bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/15 hover:bg-white'
                  }`}
                >
                  <span className="font-mono ml-1.5 text-[10px] text-gray-500">[{tx.documentNumber}]</span>
                  <span>{tx.documentType} ({tx.amount.toLocaleString()} ج.م)</span>
                </button>
              ))}
            </div>

            {/* Visual Simulated Document Card */}
            <div className="border-2 border-[#1D1D1B] bg-[#F9F7F2] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1D1D1B]/15 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#8A1F1D] text-white flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] bg-[#1D1D1B] text-[#C4A484] px-1.5 py-0.5 font-bold font-mono">
                      رقم المستند: {currentTx.documentNumber}
                    </span>
                    <h3 className="font-black text-base text-[#1D1D1B] mt-1">
                      {currentTx.title}
                    </h3>
                  </div>
                </div>

                <div className="text-left">
                  <span className="text-[10px] text-gray-500 block">تاريخ العملية</span>
                  <span className="font-mono font-bold text-xs text-[#1D1D1B]">{currentTx.date}</span>
                </div>
              </div>

              <div className="p-4 bg-white border border-[#1D1D1B]/15 space-y-2">
                <span className="text-xs font-bold text-gray-500 block">بيان العملية وتفاصيل الشروط الائتمانية:</span>
                <p className="text-xs text-[#1D1D1B] leading-relaxed font-sans">
                  {currentTx.details}
                </p>
              </div>

              {/* Journal Entry Extracted */}
              <div className="p-4 bg-emerald-50/50 border border-emerald-300 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-900 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>قيد اليومية المستخرج والمعتمد سيكومترياً:</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-800">
                    القيمة: {currentTx.amount.toLocaleString()} ج.م
                  </span>
                </div>

                <div className="bg-white p-3 border border-emerald-200 text-xs font-mono space-y-1 text-[#1D1D1B]">
                  <div className="font-bold">مدين: {currentTx.debitAccount}</div>
                  <div className="font-bold pr-6">دائن: {currentTx.creditAccount}</div>
                  <div className="text-[11px] text-gray-500 pt-1 font-serif">
                    (إثبات {currentTx.title} بموجب {currentTx.documentType} رقم {currentTx.documentNumber})
                  </div>
                </div>

                <p className="text-[11px] text-[#1D1D1B]/80 leading-relaxed bg-white/70 p-2 border-r-2 border-[#8A1F1D]">
                  <span className="font-bold text-[#8A1F1D]">التبرير المحاسبي JRE:</span> {currentTx.jreJustification}
                </p>
              </div>

            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-[#1D1D1B]/15 flex items-center justify-between">
              <button
                onClick={() => setActiveStation('enterprise_charter')}
                className="px-4 py-2 bg-white border border-[#1D1D1B]/20 text-xs font-bold hover:bg-gray-100 flex items-center gap-1 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>العودة للميثاق</span>
              </button>

              <button
                onClick={() => {
                  handleMarkStationComplete('documentary_audit');
                  setActiveStation('journal_and_ledger');
                }}
                className="px-5 py-2.5 bg-[#1D1D1B] text-[#C4A484] hover:bg-[#333330] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>اعتماد المستندات والانتقال لليومية والأستاذ</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATION 3: GENERAL JOURNAL & T-ACCOUNT LEDGERS */}
      {activeStation === 'journal_and_ledger' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-[#1D1D1B] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1D1D1B]/15 pb-4">
              <div>
                <span className="text-[11px] font-bold text-[#8A1F1D] uppercase tracking-wider block">
                  المحطة الثالثة: اليوميات وترحيل حسابات الأستاذ
                </span>
                <h2 className="text-xl font-black text-[#1D1D1B] mt-1">
                  الترحيل إلى دفاتر الأستاذ العام وترصيد الحسابات
                </h2>
                <p className="text-xs text-[#1D1D1B]/70 mt-1">
                  ترصيد كل حساب لاستخراج رصيد آخر المدة المنقول لميزان المراجعة.
                </p>
              </div>

              <div className="flex items-center gap-1 bg-[#F9F7F2] p-1 border border-[#1D1D1B]/20">
                {(['cash', 'bank', 'purchases', 'sales', 'capital'] as const).map(tabKey => (
                  <button
                    key={tabKey}
                    onClick={() => setActiveLedgerTab(tabKey)}
                    className={`px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                      activeLedgerTab === tabKey
                        ? 'bg-[#1D1D1B] text-[#C4A484]'
                        : 'text-[#1D1D1B] hover:bg-white'
                    }`}
                  >
                    {tabKey === 'cash' ? 'ح/ الخزينة' :
                     tabKey === 'bank' ? 'ح/ البنك' :
                     tabKey === 'purchases' ? 'ح/ المشتريات' :
                     tabKey === 'sales' ? 'ح/ المبيعات' : 'ح/ رأس المال'}
                  </button>
                ))}
              </div>
            </div>

            {/* T-Account Display for Selected Tab */}
            <div className="border-2 border-[#1D1D1B] p-5 bg-[#F9F7F2] space-y-4">
              <div className="text-center border-b-2 border-[#1D1D1B] pb-2">
                <span className="text-xs text-gray-500 font-bold block">دفتر الأستاذ العام (صفحة 14)</span>
                <h3 className="text-lg font-black text-[#1D1D1B]">
                  حساب {activeLedgerTab === 'cash' ? 'الخزينة (الصندوق)' :
                        activeLedgerTab === 'bank' ? 'البنك الأهلي المصري' :
                        activeLedgerTab === 'purchases' ? 'المشتريات' :
                        activeLedgerTab === 'sales' ? 'المبيعات' : 'رأس المال'}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-0 border-2 border-[#1D1D1B] bg-white divide-x-2 divide-x-reverse divide-[#1D1D1B]">
                
                {/* Debit Side (منه) */}
                <div className="p-4 space-y-2">
                  <div className="text-center font-black text-xs text-[#8A1F1D] border-b border-[#1D1D1B]/20 pb-1">
                    الجانب المدين (منه)
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {activeLedgerTab === 'cash' && (
                      <>
                        <div className="flex justify-between font-mono">
                          <span>رصيد أول المدة (1/10)</span>
                          <span className="font-bold">60,000 ج.م</span>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span>إلى ح/ المبيعات (5/10)</span>
                          <span className="font-bold">30,000 ج.م</span>
                        </div>
                      </>
                    )}
                    {activeLedgerTab === 'bank' && (
                      <>
                        <div className="flex justify-between font-mono">
                          <span>رصيد أول المدة (1/10)</span>
                          <span className="font-bold">120,000 ج.م</span>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span>إلى ح/ المبيعات (5/10)</span>
                          <span className="font-bold">40,000 ج.م</span>
                        </div>
                      </>
                    )}
                    {activeLedgerTab === 'purchases' && (
                      <div className="flex justify-between font-mono">
                        <span>إلى ح/ الموردين (2/10)</span>
                        <span className="font-bold">50,000 ج.م</span>
                      </div>
                    )}
                    {activeLedgerTab === 'sales' && (
                      <div className="text-center text-gray-400 py-4">— لا توجد قيود مدينة —</div>
                    )}
                    {activeLedgerTab === 'capital' && (
                      <div className="text-center text-gray-400 py-4">— لا توجد قيود مدينة —</div>
                    )}
                  </div>
                  
                  <div className="border-t-2 border-[#1D1D1B] pt-1 flex justify-between font-mono font-black text-sm text-[#1D1D1B]">
                    <span>مجموع المدين:</span>
                    <span>
                      {activeLedgerTab === 'cash' ? '90,000 ج.م' :
                       activeLedgerTab === 'bank' ? '160,000 ج.م' :
                       activeLedgerTab === 'purchases' ? '50,000 ج.م' :
                       activeLedgerTab === 'sales' ? '0 ج.م' : '0 ج.م'}
                    </span>
                  </div>
                </div>

                {/* Credit Side (له) */}
                <div className="p-4 space-y-2">
                  <div className="text-center font-black text-xs text-[#1D1D1B] border-b border-[#1D1D1B]/20 pb-1">
                    الجانب الدائن (له)
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {activeLedgerTab === 'cash' && (
                      <>
                        <div className="flex justify-between font-mono">
                          <span>من ح/ مردودات مبيعات (15/10)</span>
                          <span className="font-bold">5,000 ج.م</span>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span>من مذكورين (صيانة + إيجار) (20/10)</span>
                          <span className="font-bold">14,000 ج.م</span>
                        </div>
                        <div className="flex justify-between font-mono text-emerald-800 bg-emerald-50 px-1">
                          <span>رصيد مرحل (مدين لآخر المدة)</span>
                          <span className="font-black">71,000 ج.م</span>
                        </div>
                      </>
                    )}
                    {activeLedgerTab === 'bank' && (
                      <>
                        <div className="flex justify-between font-mono">
                          <span>من ح/ الموردين (سداد) (10/10)</span>
                          <span className="font-bold">49,000 ج.م</span>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span>من ح/ أجهزة ومعدات (28/10)</span>
                          <span className="font-bold">25,000 ج.م</span>
                        </div>
                        <div className="flex justify-between font-mono text-emerald-800 bg-emerald-50 px-1">
                          <span>رصيد مرحل (مدين لآخر المدة)</span>
                          <span className="font-black">86,000 ج.م</span>
                        </div>
                      </>
                    )}
                    {activeLedgerTab === 'purchases' && (
                      <div className="flex justify-between font-mono text-emerald-800 bg-emerald-50 px-1">
                        <span>رصيد مرحل (مدين لآخر المدة)</span>
                        <span className="font-black">50,000 ج.م</span>
                      </div>
                    )}
                    {activeLedgerTab === 'sales' && (
                      <>
                        <div className="flex justify-between font-mono">
                          <span>من مذكورين (خزينة وبنك) (5/10)</span>
                          <span className="font-bold">70,000 ج.م</span>
                        </div>
                        <div className="flex justify-between font-mono text-purple-800 bg-purple-50 px-1">
                          <span>رصيد مرحل (دائن لآخر المدة)</span>
                          <span className="font-black">70,000 ج.م</span>
                        </div>
                      </>
                    )}
                    {activeLedgerTab === 'capital' && (
                      <>
                        <div className="flex justify-between font-mono">
                          <span>رصيد أول المدة (1/10)</span>
                          <span className="font-bold">350,000 ج.م</span>
                        </div>
                        <div className="flex justify-between font-mono text-purple-800 bg-purple-50 px-1">
                          <span>رصيد مرحل (دائن لآخر المدة)</span>
                          <span className="font-black">350,000 ج.م</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="border-t-2 border-[#1D1D1B] pt-1 flex justify-between font-mono font-black text-sm text-[#1D1D1B]">
                    <span>مجموع الدائن:</span>
                    <span>
                      {activeLedgerTab === 'cash' ? '90,000 ج.م' :
                       activeLedgerTab === 'bank' ? '160,000 ج.م' :
                       activeLedgerTab === 'purchases' ? '50,000 ج.م' :
                       activeLedgerTab === 'sales' ? '70,000 ج.م' : '350,000 ج.م'}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-[#1D1D1B]/15 flex items-center justify-between">
              <button
                onClick={() => setActiveStation('documentary_audit')}
                className="px-4 py-2 bg-white border border-[#1D1D1B]/20 text-xs font-bold hover:bg-gray-100 flex items-center gap-1 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>العودة للمستندات</span>
              </button>

              <button
                onClick={() => {
                  handleMarkStationComplete('journal_and_ledger');
                  setActiveStation('trial_balance');
                }}
                className="px-5 py-2.5 bg-[#1D1D1B] text-[#C4A484] hover:bg-[#333330] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>اعتماد الأستاذ والانتقال لميزان المراجعة</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATION 4: UNADJUSTED TRIAL BALANCE & ERROR CORRECTION */}
      {activeStation === 'trial_balance' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-[#1D1D1B] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1D1D1B]/15 pb-4">
              <div>
                <span className="text-[11px] font-bold text-[#8A1F1D] uppercase tracking-wider block">
                  المحطة الرابعة: ميزان المراجعة قبل التسويات
                </span>
                <h2 className="text-xl font-black text-[#1D1D1B] mt-1">
                  ميزان المراجعة بالأرصدة في 31 أكتوبر 2026
                </h2>
                <p className="text-xs text-[#1D1D1B]/70 mt-1">
                  فحص التوازن الحسابي والتحقق من سلامة الترحيل واكتشاف وتصحيح الأخطاء.
                </p>
              </div>

              <div className="text-xs bg-emerald-50 border border-emerald-300 text-emerald-900 px-3 py-1 font-bold flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>الميزان متوازن حسابياً (لا حاجة لحساب معلق)</span>
              </div>
            </div>

            {/* Trial Balance Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse">
                <thead>
                  <tr className="bg-[#1D1D1B] text-[#F9F7F2]">
                    <th className="p-3 font-bold">اسم الحساب</th>
                    <th className="p-3 font-bold text-center">أرصدة مدينة (ج.م)</th>
                    <th className="p-3 font-bold text-center">أرصدة دائنة (ج.م)</th>
                    <th className="p-3 font-bold">التصنيف الختامي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1D1D1B]/15">
                  {[
                    { acc: 'الخزينة (صندوق المنشأة)', dr: 71000, cr: 0, cat: 'أصل متداول (مركز مالي)' },
                    { acc: 'البنك الأهلي المصري', dr: 86000, cr: 0, cat: 'أصل متداول (مركز مالي)' },
                    { acc: 'بضاعة أول المدة', dr: 80000, cr: 0, cat: 'تكلفة المبيعات (قائمة الدخل)' },
                    { acc: 'سيارة النقل والتوزيع', dr: 90000, cr: 0, cat: 'أصل ثابت (مركز مالي)' },
                    { acc: 'أجهزة ومعدات وسيرفر مركزي', dr: 65000, cr: 0, cat: 'أصل ثابت (مركز مالي)' },
                    { acc: 'أثاث وتجهيزات المعرض', dr: 40000, cr: 0, cat: 'أصل ثابت (مركز مالي)' },
                    { acc: 'المشتريات', dr: 50000, cr: 0, cat: 'قائمة الدخل' },
                    { acc: 'مردودات ومسموحات المبيعات', dr: 5000, cr: 0, cat: 'إيراد مدين عكسي (قائمة الدخل)' },
                    { acc: 'مصروف إيجار المعرض', dr: 10000, cr: 0, cat: 'مصروف تشغيلي (يخضع للتسوية)' },
                    { acc: 'مصروف صيانة سيارات', dr: 4000, cr: 0, cat: 'مصروف إيرادي (قائمة الدخل)' },
                    { acc: 'المبيعات', dr: 0, cr: 70000, cat: 'إيراد رئيسي (قائمة الدخل)' },
                    { acc: 'الخصم المكتسب (تعجيل دفع)', dr: 0, cr: 1000, cat: 'إيراد تمويلي (قائمة الدخل)' },
                    { acc: 'الموردون (شركة الأهرام)', dr: 0, cr: 40000, cat: 'التزام متداول (مركز مالي)' },
                    { acc: 'الموردون (شركة القاهرة للتكنولوجيا)', dr: 0, cr: 0, cat: 'تمت تصفية الحساب بالسداد' },
                    { acc: 'رأس المال', dr: 0, cr: 350000, cat: 'حقوق الملكية (مركز مالي)' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-[#F9F7F2]/80 transition">
                      <td className="p-2.5 font-bold text-[#1D1D1B]">{row.acc}</td>
                      <td className="p-2.5 text-center font-mono font-bold text-sm text-[#1D1D1B]">
                        {row.dr > 0 ? row.dr.toLocaleString() : '—'}
                      </td>
                      <td className="p-2.5 text-center font-mono font-bold text-sm text-[#1D1D1B]">
                        {row.cr > 0 ? row.cr.toLocaleString() : '—'}
                      </td>
                      <td className="p-2.5 text-[11px] text-gray-600">{row.cat}</td>
                    </tr>
                  ))}
                  <tr className="bg-[#1D1D1B]/5 font-black text-xs">
                    <td className="p-3 text-[#1D1D1B]">إجمالي ميزان المراجعة قبل التسويات</td>
                    <td className="p-3 text-center font-mono text-sm text-emerald-800 font-black">501,000 ج.م</td>
                    <td className="p-3 text-center font-mono text-sm text-emerald-800 font-black">501,000 ج.م</td>
                    <td className="p-3 text-[11px] text-emerald-800 font-bold">تطابق وتوازن سليم 100%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-[#1D1D1B]/15 flex items-center justify-between">
              <button
                onClick={() => setActiveStation('journal_and_ledger')}
                className="px-4 py-2 bg-white border border-[#1D1D1B]/20 text-xs font-bold hover:bg-gray-100 flex items-center gap-1 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>العودة للأستاذ</span>
              </button>

              <button
                onClick={() => {
                  handleMarkStationComplete('trial_balance');
                  setActiveStation('adjustments');
                }}
                className="px-5 py-2.5 bg-[#1D1D1B] text-[#C4A484] hover:bg-[#333330] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>اعتماد الميزان والانتقال للتسويات الجردية</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATION 5: YEAR-END ADJUSTING ENTRIES & ADJUSTED TRIAL BALANCE */}
      {activeStation === 'adjustments' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-[#1D1D1B] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1D1D1B]/15 pb-4">
              <div>
                <span className="text-[11px] font-bold text-[#8A1F1D] uppercase tracking-wider block">
                  المحطة الخامسة: التسويات الجردية الشاملة
                </span>
                <h2 className="text-xl font-black text-[#1D1D1B] mt-1">
                  تطبيق أساس الاستحقاق ومعايير المحاسبة المصرية (EAS)
                </h2>
                <p className="text-xs text-[#1D1D1B]/70 mt-1">
                  إثبات قيود المقدمات والمستحقات، الإهلاك، ومخصصات التحفظ المحاسبي قبل إقفال الفترة.
                </p>
              </div>

              <span className="text-xs bg-[#8A1F1D] text-white px-3 py-1 font-bold">
                4 قيود تسوية معتمدة
              </span>
            </div>

            {/* Adjusting Entries Grid */}
            <div className="space-y-4">
              {project.adjustingEntries.map((adj, idx) => (
                <div key={adj.id} className="p-5 border-2 border-[#1D1D1B] bg-[#F9F7F2] space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-[#1D1D1B] text-[#C4A484] text-[10px] font-bold px-2 py-0.5 font-mono">
                          تسوية #{idx + 1}
                        </span>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 border border-emerald-300">
                          نوع التسوية: {adj.category}
                        </span>
                      </div>
                      <h4 className="font-black text-sm text-[#1D1D1B] mt-1.5">{adj.targetAccount}</h4>
                    </div>

                    <div className="text-left font-mono">
                      <span className="text-[10px] text-gray-500 block">مبلغ التسوية</span>
                      <span className="text-base font-black text-[#8A1F1D]">{adj.adjustmentAmount.toLocaleString()} ج.م</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#1D1D1B]/80 leading-relaxed bg-white p-2.5 border border-[#1D1D1B]/15">
                    {adj.description}
                  </p>

                  <div className="bg-emerald-50/60 p-3 border border-emerald-300 text-xs font-mono space-y-1">
                    <div className="font-bold text-emerald-950">مدين: {adj.entryDebit}</div>
                    <div className="font-bold text-emerald-950 pr-6">دائن: {adj.entryCredit}</div>
                    <div className="text-[11px] text-emerald-800 pt-1 font-serif">
                      الأثر الرقابي: {adj.explanation}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-[#1D1D1B]/15 flex items-center justify-between">
              <button
                onClick={() => setActiveStation('trial_balance')}
                className="px-4 py-2 bg-white border border-[#1D1D1B]/20 text-xs font-bold hover:bg-gray-100 flex items-center gap-1 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>العودة لميزان المراجعة</span>
              </button>

              <button
                onClick={() => {
                  handleMarkStationComplete('adjustments');
                  setActiveStation('financial_statements');
                }}
                className="px-5 py-2.5 bg-[#1D1D1B] text-[#C4A484] hover:bg-[#333330] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>اعتماد التسويات والانتقال للقوائم المالية</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATION 6: MULTI-STEP INCOME STATEMENT & CLASSIFIED BALANCE SHEET */}
      {activeStation === 'financial_statements' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-[#1D1D1B] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1D1D1B]/15 pb-4">
              <div>
                <span className="text-[11px] font-bold text-[#8A1F1D] uppercase tracking-wider block">
                  المحطة السادسة: القوائم المالية الختامية
                </span>
                <h2 className="text-xl font-black text-[#1D1D1B] mt-1">
                  قائمة الدخل المتعددة الخطوات وقائمة المركز المالي المبوبة
                </h2>
                <p className="text-xs text-[#1D1D1B]/70 mt-1">
                  المخرجات النهائية للدورة المحاسبية المعدة طبقاً لمعايير المحاسبة المصرية (EAS).
                </p>
              </div>

              <span className="text-xs bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 font-bold">
                صافي الربح للفترة: 12,000 ج.م
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Income Statement (Multi-Step) */}
              <div className="border-2 border-[#1D1D1B] p-5 bg-[#F9F7F2] space-y-4">
                <div className="text-center border-b-2 border-[#1D1D1B] pb-2">
                  <span className="text-xs text-gray-500 font-bold block">{project.enterprise.name}</span>
                  <h3 className="text-base font-black text-[#1D1D1B]">
                    قائمة الدخل ذات الخطوات المتعددة (عن شهر أكتوبر 2026)
                  </h3>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  
                  {/* Revenue section */}
                  <div className="flex justify-between font-bold">
                    <span>إجمالي المبيعات</span>
                    <span>70,000 ج.م</span>
                  </div>
                  <div className="flex justify-between text-rose-700 pr-3">
                    <span>يخصم: مردودات ومسموحات المبيعات</span>
                    <span>(5,000) ج.م</span>
                  </div>
                  <div className="flex justify-between font-black text-sm bg-white p-1.5 border border-[#1D1D1B]/15">
                    <span>صافي المبيعات</span>
                    <span>65,000 ج.م</span>
                  </div>

                  {/* COGS section */}
                  <div className="pt-2 text-[11px] font-bold text-[#8A1F1D] font-serif">تكلفة البضاعة المباعة:</div>
                  <div className="flex justify-between pr-3">
                    <span>بضاعة أول المدة</span>
                    <span>80,000 ج.م</span>
                  </div>
                  <div className="flex justify-between pr-3">
                    <span>يضاف: صافي المشتريات</span>
                    <span>50,000 ج.م</span>
                  </div>
                  <div className="flex justify-between text-rose-700 pr-3">
                    <span>يخصم: بضاعة آخر المدة (جرد فعلي)</span>
                    <span>(89,000) ج.م</span>
                  </div>
                  <div className="flex justify-between font-bold pr-3 border-t border-gray-300 pt-1">
                    <span>إجمالي تكلفة المبيعات</span>
                    <span>(41,000) ج.م</span>
                  </div>

                  {/* Gross Profit */}
                  <div className="flex justify-between font-black text-sm bg-emerald-100 text-emerald-900 p-2 border border-emerald-300">
                    <span>مجمل الربح التجاري (Gross Profit)</span>
                    <span>24,000 ج.م</span>
                  </div>

                  {/* Operating Expenses */}
                  <div className="pt-2 text-[11px] font-bold text-[#8A1F1D] font-serif">المصروفات التشغيلية والإدارية (بعد التسوية):</div>
                  <div className="flex justify-between pr-3">
                    <span>مصروف إيجار المعرض (نصيب الشهر)</span>
                    <span>(5,000) ج.م</span>
                  </div>
                  <div className="flex justify-between pr-3">
                    <span>مصروف صيانة السيارات</span>
                    <span>(4,000) ج.م</span>
                  </div>
                  <div className="flex justify-between pr-3">
                    <span>مصروف إهلاك سيارات النقل</span>
                    <span>(1,500) ج.م</span>
                  </div>
                  <div className="flex justify-between pr-3">
                    <span>مصروف ديون مشكوك في تحصيلها</span>
                    <span>(1,000) ج.م</span>
                  </div>
                  <div className="flex justify-between pr-3">
                    <span>مصروف مرتبات العاملين المستحقة</span>
                    <span>(1,500) ج.م</span>
                  </div>

                  {/* Other Income */}
                  <div className="flex justify-between text-emerald-800 pr-3">
                    <span>يضاف: إيراد الخصم المكتسب</span>
                    <span>+1,000 ج.م</span>
                  </div>

                  {/* Net Income */}
                  <div className="flex justify-between font-black text-base bg-[#1D1D1B] text-[#C4A484] p-2.5 mt-3">
                    <span>صافي ربح النشاط النهائي (Net Income)</span>
                    <span>12,000 ج.م</span>
                  </div>

                </div>
              </div>

              {/* Classified Balance Sheet */}
              <div className="border-2 border-[#1D1D1B] p-5 bg-[#F9F7F2] space-y-4">
                <div className="text-center border-b-2 border-[#1D1D1B] pb-2">
                  <span className="text-xs text-gray-500 font-bold block">{project.enterprise.name}</span>
                  <h3 className="text-base font-black text-[#1D1D1B]">
                    قائمة المركز المالي المبوبة في 31 أكتوبر 2026
                  </h3>
                </div>

                <div className="space-y-3 text-xs font-mono">
                  
                  {/* Non-Current Assets */}
                  <div>
                    <span className="font-bold text-[#8A1F1D] block font-serif">الأصول غير المتداولة (الثابتة):</span>
                    <div className="flex justify-between pr-3">
                      <span>سيارات النقل والتوزيع (بالصافي بعد الإهلاك)</span>
                      <span>88,500 ج.م</span>
                    </div>
                    <div className="flex justify-between pr-3">
                      <span>أجهزة كمبيوتر وخادم مركزي</span>
                      <span>65,000 ج.م</span>
                    </div>
                    <div className="flex justify-between pr-3">
                      <span>أثاث وتجهيزات المعرض</span>
                      <span>40,000 ج.م</span>
                    </div>
                    <div className="flex justify-between font-bold border-t border-gray-300 pt-1">
                      <span>إجمالي الأصول غير المتداولة</span>
                      <span>193,500 ج.م</span>
                    </div>
                  </div>

                  {/* Current Assets */}
                  <div>
                    <span className="font-bold text-[#8A1F1D] block font-serif">الأصول المتداولة:</span>
                    <div className="flex justify-between pr-3">
                      <span>مخزون بضاعة آخر المدة (31/10)</span>
                      <span>89,000 ج.م</span>
                    </div>
                    <div className="flex justify-between pr-3">
                      <span>البنك الأهلي المصري (حساب جاري)</span>
                      <span>86,000 ج.م</span>
                    </div>
                    <div className="flex justify-between pr-3">
                      <span>الخزينة (صندوق المنشأة)</span>
                      <span>71,000 ج.م</span>
                    </div>
                    <div className="flex justify-between pr-3">
                      <span>مصروف إيجار مدفوع مقدماً</span>
                      <span>5,000 ج.م</span>
                    </div>
                    <div className="flex justify-between font-bold border-t border-gray-300 pt-1">
                      <span>إجمالي الأصول المتداولة</span>
                      <span>251,000 ج.م</span>
                    </div>
                  </div>

                  {/* Total Assets */}
                  <div className="flex justify-between font-black text-sm bg-emerald-100 text-emerald-950 p-2 border border-emerald-300">
                    <span>مجموع الأصول (Total Assets)</span>
                    <span>444,500 ج.م</span>
                  </div>

                  {/* Liabilities & Equity */}
                  <div className="pt-2">
                    <span className="font-bold text-[#8A1F1D] block font-serif">الالتزامات وحقوق الملكية:</span>
                    <div className="flex justify-between pr-3">
                      <span>الموردون (شركة الأهرام)</span>
                      <span>40,000 ج.م</span>
                    </div>
                    <div className="flex justify-between pr-3">
                      <span>مرتبات ومصروفات مستحقة</span>
                      <span>2,500 ج.م</span>
                    </div>
                    <div className="flex justify-between pr-3 font-bold border-t border-gray-300 pt-1">
                      <span>إجمالي الالتزامات قصيرة الأجل</span>
                      <span>42,500 ج.م</span>
                    </div>

                    <div className="flex justify-between pr-3 pt-1">
                      <span>رأس المال المستثمر</span>
                      <span>350,000 ج.م</span>
                    </div>
                    <div className="flex justify-between pr-3 text-emerald-800">
                      <span>يضاف: صافي أرباح الشهر المنقولة</span>
                      <span>+12,000 ج.م</span>
                    </div>
                    <div className="flex justify-between font-bold border-t border-gray-300 pt-1">
                      <span>إجمالي حقوق الملكية (31/10)</span>
                      <span>402,000 ج.م</span>
                    </div>
                  </div>

                  {/* Total Liabilities & Equity */}
                  <div className="flex justify-between font-black text-sm bg-[#1D1D1B] text-[#C4A484] p-2.5">
                    <span>مجموع الالتزامات وحقوق الملكية</span>
                    <span>444,500 ج.م</span>
                  </div>

                </div>
              </div>

            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-[#1D1D1B]/15 flex items-center justify-between">
              <button
                onClick={() => setActiveStation('adjustments')}
                className="px-4 py-2 bg-white border border-[#1D1D1B]/20 text-xs font-bold hover:bg-gray-100 flex items-center gap-1 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>العودة للتسويات</span>
              </button>

              <button
                onClick={() => {
                  handleMarkStationComplete('financial_statements');
                  setActiveStation('jre_analysis');
                }}
                className="px-5 py-2.5 bg-[#1D1D1B] text-[#C4A484] hover:bg-[#333330] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>اعتماد القوائم والانتقال لمختبر JRE والنسب</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATION 7: JRE JUSTIFICATION & FINANCIAL RATIO LAB */}
      {activeStation === 'jre_analysis' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-[#1D1D1B] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1D1D1B]/15 pb-4">
              <div>
                <span className="text-[11px] font-bold text-[#8A1F1D] uppercase tracking-wider block">
                  المحطة السابعة: التحليل المالي وصياغة JRE
                </span>
                <h2 className="text-xl font-black text-[#1D1D1B] mt-1">
                  مختبر النسب المالية ومذكرة التفسير المحاسبي المدعوم بالأدلة
                </h2>
                <p className="text-xs text-[#1D1D1B]/70 mt-1">
                  قياس كفاءة السيولة والربحية والرفع المالي وصياغة رأي مهني رصين طبقاً لمعايير التقييم بالبكالوريا المصرية.
                </p>
              </div>

              <span className="text-xs bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 font-bold">
                مؤشرات أداء قوية في السيولة والربحية
              </span>
            </div>

            {/* 6 Core Financial Ratios Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.financialRatios.map((r, rIdx) => (
                <div 
                  key={rIdx}
                  onClick={() => setSelectedRatioIndex(rIdx)}
                  className={`p-4 border-2 transition cursor-pointer space-y-2 ${
                    selectedRatioIndex === rIdx 
                      ? 'border-[#1D1D1B] bg-white shadow-md ring-2 ring-[#C4A484]' 
                      : 'border-[#1D1D1B]/20 bg-[#F9F7F2] hover:border-[#1D1D1B]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold bg-[#1D1D1B] text-[#C4A484] px-2 py-0.5">
                      {r.category}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">المعيار: {r.benchmark}</span>
                  </div>

                  <h4 className="font-bold text-xs text-[#1D1D1B]">{r.name}</h4>

                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-[10px] text-gray-500 font-mono">{r.formula}</span>
                    <span className="text-xl font-black font-mono text-[#8A1F1D]">{r.calculatedValue}</span>
                  </div>

                  <p className="text-[11px] text-[#1D1D1B]/75 leading-relaxed pt-1 border-t border-[#1D1D1B]/10">
                    {r.interpretation}
                  </p>
                </div>
              ))}
            </div>

            {/* Interactive Student JRE Justification Composer */}
            <div className="p-5 border-2 border-[#1D1D1B] bg-[#F9F7F2] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-black text-sm text-[#1D1D1B] flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-[#8A1F1D]" />
                  <span>صياغة التفسير المحاسبي المدعوم بالأدلة JRE في ملف الإنجاز</span>
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-[#8A1F1D] font-bold">
                    (مطلوب وزاري: حكم مهني + تعليل منطقي + مستند مؤيد)
                  </span>
                  <div className="flex items-center gap-1 font-mono text-xs font-bold text-[#1D1D1B]/80 bg-white px-2 py-0.5 border border-[#1D1D1B]/15">
                    <span>{studentJreText.trim().split(/\s+/).filter(Boolean).length} كلمة</span>
                    <span>•</span>
                    <span>{studentJreText.length} حرف</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                <textarea
                  value={studentJreText}
                  onChange={e => setStudentJreText(e.target.value)}
                  rows={9}
                  className="w-full p-4 bg-white border-2 border-[#1D1D1B]/30 text-xs sm:text-sm text-[#1D1D1B] leading-relaxed focus:outline-hidden focus:border-[#8A1F1D] font-serif min-h-[170px] resize-y shadow-inner"
                  placeholder="صغ تقرير JRE المتكامل: 1) الموقف المحاسبي السليم 2) السند المعياري (الاستحقاق، الحيطة والحذر، معايير المحاسبة المصرية EAS) 3) الأثر المالي والقيود اليومية المصححة 4) الخلاصة والتوصية لمدير التدقيق..."
                />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold">مستوفٍ لركائز JRE الثلاثة ومعايير التوجيه الفني للوزارة</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {studentJreText.trim().length === 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setStudentJreText(`1. الموقف المحاسبي والحكم المهني:\n- بناءً على الفحص المستندي لمصنع النور للصناعات الغذائية، تبين أن...\n\n2. السند المعياري والمبادئ المحاسبية (EAS):\n- تطبيقاً لمبدأ الاستحقاق والحيطة والحذر ومعيار المخزون والأصول الثابتة...\n\n3. التحليل المالي والأثر الرقمي على القوائم:\n- يتطلب تصحيح الخطأ إثبات القيد التالي بمبلغ... وتأثيره على مجمل وصافي الربح...\n\n4. الخلاصة والتوصية الرقابية:\n- نوصي إدارة المنشأة بتطبيق الإجراء الرقابي التالي لمنع تكرار الخطأ...`);
                        }}
                        className="px-3 py-1.5 bg-[#FAF7EE] text-[#8A1F1D] border border-[#8A1F1D]/30 font-bold hover:bg-[#F0ECE1] transition cursor-pointer"
                      >
                        إدراج هيكل التقرير
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setJreValidated(true);
                        handleMarkStationComplete('jre_analysis');
                      }}
                      className="px-4 py-1.5 bg-[#1D1D1B] text-[#C4A484] hover:bg-[#333330] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>تثبيت التفسير في ملف الإنجاز</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-[#1D1D1B]/15 flex items-center justify-between">
              <button
                onClick={() => setActiveStation('financial_statements')}
                className="px-4 py-2 bg-white border border-[#1D1D1B]/20 text-xs font-bold hover:bg-gray-100 flex items-center gap-1 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>العودة للقوائم المالية</span>
              </button>

              <button
                onClick={() => {
                  handleMarkStationComplete('jre_analysis');
                  setActiveStation('rubric_and_dossier');
                }}
                className="px-5 py-2.5 bg-[#1D1D1B] text-[#C4A484] hover:bg-[#333330] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>الانتقال لشهادة التخرج وملف الإنجاز المعتمد</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STATION 8: OFFICIAL RUBRIC, CERTIFICATE & PRINTABLE DOSSIER */}
      {activeStation === 'rubric_and_dossier' && (
        <div className="space-y-8">
          
          {/* Official Printable EB Dossier Container */}
          <div className="bg-white border-2 border-[#1D1D1B] p-6 sm:p-10 space-y-8 shadow-sm">
            
            {/* Dossier Official Header */}
            <div className="border-b-2 border-[#1D1D1B] pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="text-xs text-[#8A1F1D] font-bold">
                  جمهورية مصر العربية • وزارة التربية والتعليم والتعليم الفني
                </div>
                <h2 className="text-2xl font-black text-[#1D1D1B] mt-1">
                  ملف الإنجاز الرقمي وشهادة إتمام المشروع التطبيقي المحاسبي
                </h2>
                <p className="text-xs text-[#1D1D1B]/70 mt-1">
                  شهادة تخرج معتمدة لنظام البكالوريا المصرية (EB) • مادة المحاسبة المالية • العام الدراسي 2026/2027
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 no-print">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 bg-[#1D1D1B] text-[#C4A484] hover:bg-[#333330] text-xs font-black transition flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة ملف الإنجاز والشهادة (PDF)</span>
                </button>
              </div>
            </div>

            {/* Official Student & Enterprise Metadata Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-xs">
              <div>
                <span className="text-gray-500 block">اسم الطالب المحاسب:</span>
                <span className="font-bold text-[#1D1D1B] text-sm">{user?.full_name || 'طالب البكالوريا المصرية'}</span>
              </div>
              <div>
                <span className="text-gray-500 block">كود الطالب الأكاديمي:</span>
                <span className="font-mono font-bold text-[#1D1D1B]">{user?.id ? user.id.slice(0, 10) : 'EB-ACC-2026-99'}</span>
              </div>
              <div>
                <span className="text-gray-500 block">المنشأة محل المحاكاة:</span>
                <span className="font-bold text-[#1D1D1B]">{project.enterprise.name}</span>
              </div>
              <div>
                <span className="text-gray-500 block">تاريخ الاعتماد الرسمي:</span>
                <span className="font-mono font-bold text-[#1D1D1B]">{new Date().toLocaleDateString('ar-EG')}</span>
              </div>
            </div>

            {/* Formal Certificate Display */}
            <div className="border-4 border-double border-[#1D1D1B] p-8 bg-[#FDFCF7] text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-2 right-2 text-[10px] text-gray-400 font-mono">EB-CERT-CAPSTONE-2026</div>
              
              <div className="w-16 h-16 bg-[#1D1D1B] text-[#C4A484] rounded-full mx-auto flex items-center justify-center font-black">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs text-[#8A1F1D] font-bold tracking-widest uppercase block">
                  وثيقة إتمام مشروع التخرج المحاسبي الرسمي
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#1D1D1B]">
                  شهادة كفاءة مهنية في المحاسبة المالية للبكالوريا المصرية
                </h3>
                <p className="text-xs sm:text-sm text-[#1D1D1B]/80 max-w-2xl mx-auto leading-relaxed pt-2">
                  تشهد وزارة التربية والتعليم والتعليم الفني وإدارة التوجيه الفني للعلوم التجارية بأن الطالب المذكور أعلاه قد أنجز بنجاح واقتدار كافة متطلبات الدورة المحاسبية الكاملة، بدءاً من فحص المستندات، واليومية والأستاذ، والتسويات الجردية، وصولاً إلى إعداد القوائم المالية والتحليل المالي بالنسب وصياغة التفسير المهني JRE.
                </p>
              </div>

              {/* Rubric Score Stamp */}
              <div className="inline-flex items-center gap-4 bg-white border-2 border-[#1D1D1B] px-6 py-3 shadow-xs">
                <div className="text-center">
                  <span className="text-[10px] text-gray-500 block">الدرجة الإجمالية الممنوحة</span>
                  <span className="text-3xl font-black font-mono text-[#8A1F1D]">98 / 100</span>
                </div>
                <div className="h-10 w-px bg-gray-300" />
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-800 block">التقدير الأكاديمي: امتياز مع مرتبة الشرف</span>
                  <span className="text-[10px] text-gray-500 font-mono">مستوفٍ لمعايير الكفاءة السيكومترية</span>
                </div>
              </div>

              {/* Signatures & Seal Area */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#1D1D1B]/15 text-xs">
                <div className="text-center space-y-2">
                  <span className="text-gray-500 block">المعلم المشرف:</span>
                  <div className="font-bold text-[#1D1D1B] pt-2">د. خالد عبد الرحمن</div>
                  <span className="text-[10px] text-gray-400 block font-mono">(توقيع معتمد)</span>
                </div>

                <div className="text-center space-y-2">
                  <span className="text-gray-500 block">ختم التوجيه الفني:</span>
                  <div className="w-16 h-16 border-2 border-[#8A1F1D] rounded-full mx-auto flex items-center justify-center text-[10px] text-[#8A1F1D] font-bold rotate-12">
                    معتمد رسمياً
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <span className="text-gray-500 block">الموجه العام للعلوم التجارية:</span>
                  <div className="font-bold text-[#1D1D1B] pt-2">أ.د. رئيس لجنة التقويم</div>
                  <span className="text-[10px] text-gray-400 block font-mono">(اعتماد وزاري)</span>
                </div>
              </div>

            </div>

            {/* Rubric Detailed Scorecard */}
            <div className="space-y-4">
              <h3 className="font-black text-base text-[#1D1D1B] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#8A1F1D]" />
                <span>بطاقة التقييم المعتمدة وفق روبرك وزارة التربية والتعليم (Rubric Assessment)</span>
              </h3>

              <div className="divide-y divide-[#1D1D1B]/15 border-2 border-[#1D1D1B]">
                {capstoneRubric.map(crit => (
                  <div key={crit.id} className="p-4 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#1D1D1B] text-[#C4A484] text-[10px] font-bold px-2 py-0.5 font-mono">
                          {crit.category}
                        </span>
                        <h4 className="font-bold text-xs text-[#1D1D1B]">{crit.name}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[11px] text-gray-600 pt-1">
                        {crit.indicators.map((ind, iIdx) => (
                          <span key={iIdx} className="bg-gray-100 px-2 py-0.5">• {ind}</span>
                        ))}
                      </div>
                    </div>

                    <div className="text-center min-w-[80px] bg-[#F9F7F2] border border-[#1D1D1B]/15 p-2 shrink-0">
                      <span className="text-[10px] text-gray-500 block">الدرجة الممنوحة</span>
                      <span className="font-mono font-black text-sm text-emerald-800">
                        {crit.maxScore} / {crit.maxScore}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Return & Completed Controls */}
          <div className="flex items-center justify-between no-print">
            <button
              onClick={() => setActiveStation('jre_analysis')}
              className="px-4 py-2 bg-white border border-[#1D1D1B]/20 text-xs font-bold hover:bg-gray-100 flex items-center gap-1 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة لمحطة التحليل والنسب</span>
            </button>

            <button
              onClick={() => {
                handleMarkStationComplete('rubric_and_dossier');
                try {
                  confetti({ particleCount: 100, spread: 80 });
                } catch {}
              }}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Award className="w-4 h-4" />
              <span>اعتماد وتوثيق ملف الإنجاز النهائي 100%</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
