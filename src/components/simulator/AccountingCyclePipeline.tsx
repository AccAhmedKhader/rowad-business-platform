import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  PenTool, 
  Scale, 
  Calculator, 
  Sparkles, 
  FileSpreadsheet, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  RotateCcw,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Layers,
  Award,
  Check
} from 'lucide-react';
import { AdjustingEntriesSandbox } from './AdjustingEntriesSandbox';
import { TAccount, JournalEntry } from '../TAccountSimulator';

export interface PipelineJournalEntry {
  id: string;
  date: string;
  description: string;
  debitAccount: string;
  debitAmount: number;
  creditAccount: string;
  creditAmount: number;
  isCompound?: boolean;
}

export interface AccountingCyclePipelineProps {
  onPostTransactionToLedger?: (entry: {
    debitAccount: string;
    creditAccount: string;
    amount: number;
    description: string;
    date: string;
  }) => void;
  onNavigateToJRE?: () => void;
  accounts?: TAccount[];
  journalEntries?: (JournalEntry | PipelineJournalEntry)[];
  trialBalanceRows?: Array<{
    account: TAccount;
    totalDebit: number;
    totalCredit: number;
    debitBalance: number;
    creditBalance: number;
  }>;
  totalDebitBalances?: number;
  totalCreditBalances?: number;
  isTrialBalanced?: boolean;
  trialBalanceDiff?: number;
  endingInventory?: number;
  onSetEndingInventory?: (val: number) => void;
  onApplyAdjustment?: (type: 'prepaid_rent' | 'accrued_salaries' | 'accrued_revenue' | 'unearned_revenue') => void;
}

export type CycleStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export const DEFAULT_PIPELINE_ACCOUNTS: TAccount[] = [
  {
    id: 'acc-cash',
    name: 'حساب الصندوق / الخزينة (Cash)',
    code: '101',
    category: 'asset',
    normalBalance: 'debit',
    entries: [
      { id: 'e1', date: '2026/01/01', oppositeAccount: 'حساب رأس المال (Capital)', amount: 150000, type: 'debit', note: 'إيداع رأس المال نقداً بالخزينة' },
      { id: 'e2', date: '2026/01/05', oppositeAccount: 'حساب إيجار المعرض (Rent)', amount: 15000, type: 'credit', note: 'سداد إيجار المعرض نقداً' },
      { id: 'e3', date: '2026/01/12', oppositeAccount: 'حساب المشتريات (Purchases)', amount: 45000, type: 'credit', note: 'سداد قيمة مشتريات نقداً' },
      { id: 'e4', date: '2026/01/18', oppositeAccount: 'حساب المبيعات (Sales)', amount: 45000, type: 'debit', note: 'تحصيل مبيعات نقدية' }
    ]
  },
  {
    id: 'acc-bank',
    name: 'حساب البنك (Bank)',
    code: '102',
    category: 'asset',
    normalBalance: 'debit',
    entries: [
      { id: 'e5', date: '2026/01/01', oppositeAccount: 'حساب رأس المال (Capital)', amount: 100000, type: 'debit', note: 'إيداع حصة رأس المال بحساب البنك' },
      { id: 'e6', date: '2026/01/10', oppositeAccount: 'حساب السيارات والمعدات (Equipment)', amount: 20000, type: 'credit', note: 'سداد دفعة لشراء معدات بشيك' },
      { id: 'e7', date: '2026/01/22', oppositeAccount: 'حساب الموردين (Payables)', amount: 20000, type: 'credit', note: 'سداد للموردين بشيك بنكي' }
    ]
  },
  {
    id: 'acc-receivables',
    name: 'حساب العملاء / المدينون (Receivables)',
    code: '103',
    category: 'asset',
    normalBalance: 'debit',
    entries: [
      { id: 'e8', date: '2026/01/15', oppositeAccount: 'حساب المبيعات (Sales)', amount: 45000, type: 'debit', note: 'مبيعات بضاعة آجلة على الحساب' },
      { id: 'e9', date: '2026/01/25', oppositeAccount: 'حساب الصندوق (Cash)', amount: 15000, type: 'credit', note: 'تحصيل جزء من المستحق على العملاء' }
    ]
  },
  {
    id: 'acc-furniture',
    name: 'حساب الأثاث والتجهيزات (Furniture)',
    code: '111',
    category: 'asset',
    normalBalance: 'debit',
    entries: [
      { id: 'e10', date: '2026/01/03', oppositeAccount: 'حساب الصندوق (Cash)', amount: 35000, type: 'debit', note: 'شراء أثاث وتجهيزات مكتبية للمعرض' }
    ]
  },
  {
    id: 'acc-equipment',
    name: 'حساب السيارات والمعدات (Equipment)',
    code: '112',
    category: 'asset',
    normalBalance: 'debit',
    entries: [
      { id: 'e11', date: '2026/01/08', oppositeAccount: 'حساب الموردين (Payables)', amount: 80000, type: 'debit', note: 'شراء سيارة ومعدات نقل وتوزيع' }
    ]
  },
  {
    id: 'acc-payables',
    name: 'حساب الموردين / الدائنون (Payables)',
    code: '201',
    category: 'liability',
    normalBalance: 'credit',
    entries: [
      { id: 'e12', date: '2026/01/08', oppositeAccount: 'حساب السيارات والمعدات (Equipment)', amount: 60000, type: 'credit', note: 'المتبقي من ثمن السيارة على الحساب' },
      { id: 'e13', date: '2026/01/22', oppositeAccount: 'حساب البنك (Bank)', amount: 20000, type: 'debit', note: 'سداد دفعة للموردين بشيك بنكي' }
    ]
  },
  {
    id: 'acc-notes-payable',
    name: 'حساب أوراق الدفع (Notes Payable)',
    code: '202',
    category: 'liability',
    normalBalance: 'credit',
    entries: [
      { id: 'e14', date: '2026/01/10', oppositeAccount: 'حساب المشتريات (Purchases)', amount: 15000, type: 'credit', note: 'كمبيالة مستحقة السداد لأمر المورد' }
    ]
  },
  {
    id: 'acc-capital',
    name: 'حساب رأس المال (Capital)',
    code: '301',
    category: 'equity',
    normalBalance: 'credit',
    entries: [
      { id: 'e15', date: '2026/01/01', oppositeAccount: 'مذكورين (الصندوق والبنك)', amount: 250000, type: 'credit', note: 'رأس مال بداية النشاط التجاري' }
    ]
  },
  {
    id: 'acc-sales',
    name: 'حساب المبيعات (Sales Revenue)',
    code: '401',
    category: 'revenue',
    normalBalance: 'credit',
    entries: [
      { id: 'e16', date: '2026/01/15', oppositeAccount: 'حساب العملاء (Receivables)', amount: 45000, type: 'credit', note: 'مبيعات بضاعة آجلة بالفاتورة 101' },
      { id: 'e17', date: '2026/01/18', oppositeAccount: 'حساب الصندوق (Cash)', amount: 45000, type: 'credit', note: 'مبيعات بضاعة نقدية بالإيصال' }
    ]
  },
  {
    id: 'acc-purchases',
    name: 'حساب المشتريات (Purchases Expense)',
    code: '501',
    category: 'expense',
    normalBalance: 'debit',
    entries: [
      { id: 'e18', date: '2026/01/10', oppositeAccount: 'حساب أوراق الدفع (Notes Payable)', amount: 15000, type: 'debit', note: 'شراء بضاعة بكمبيالة' },
      { id: 'e19', date: '2026/01/12', oppositeAccount: 'حساب الصندوق (Cash)', amount: 30000, type: 'debit', note: 'شراء بضاعة نقداً' }
    ]
  },
  {
    id: 'acc-rent',
    name: 'حساب إيجار المعرض (Rent Expense)',
    code: '502',
    category: 'expense',
    normalBalance: 'debit',
    entries: [
      { id: 'e20', date: '2026/01/05', oppositeAccount: 'حساب الصندوق (Cash)', amount: 15000, type: 'debit', note: 'إيجار سنوي مدفوع نقداً' }
    ]
  },
  {
    id: 'acc-salaries',
    name: 'حساب مرتبات الموظفين (Salaries Expense)',
    code: '503',
    category: 'expense',
    normalBalance: 'debit',
    entries: [
      { id: 'e21', date: '2026/01/30', oppositeAccount: 'حساب الصندوق (Cash)', amount: 10000, type: 'debit', note: 'سداد مرتبات العاملين عن شهر يناير' }
    ]
  }
];

export const DEFAULT_PIPELINE_ENTRIES: PipelineJournalEntry[] = [
  {
    id: 'je-1',
    date: '2026/01/01',
    description: 'بدء النشاط التجاري وإيداع رأس المال بالصندوق والبنك',
    debitAccount: 'حساب الصندوق / الخزينة (Cash)',
    debitAmount: 150000,
    creditAccount: 'حساب رأس المال (Capital)',
    creditAmount: 150000,
    isCompound: false
  },
  {
    id: 'je-2',
    date: '2026/01/01',
    description: 'إيداع حصة رأس المال في الحساب البنكي الجاري',
    debitAccount: 'حساب البنك (Bank)',
    debitAmount: 100000,
    creditAccount: 'حساب رأس المال (Capital)',
    creditAmount: 100000,
    isCompound: false
  },
  {
    id: 'je-3',
    date: '2026/01/05',
    description: 'سداد إيجار المعرض نقداً',
    debitAccount: 'حساب إيجار المعرض (Rent Expense)',
    debitAmount: 15000,
    creditAccount: 'حساب الصندوق / الخزينة (Cash)',
    creditAmount: 15000,
    isCompound: false
  },
  {
    id: 'je-4',
    date: '2026/01/15',
    description: 'بيع بضاعة على الحساب للعميل شركة الهناء',
    debitAccount: 'حساب العملاء / المدينون (Receivables)',
    debitAmount: 45000,
    creditAccount: 'حساب المبيعات (Sales Revenue)',
    creditAmount: 45000,
    isCompound: false
  }
];

interface SampleDocument {
  id: string;
  docTitleAr: string;
  docNumber: string;
  date: string;
  issuer: string;
  recipient: string;
  transactionType: string;
  description: string;
  amount: number;
  debitAccountSuggested: string;
  creditAccountSuggested: string;
  equationImpact: string;
}

const SAMPLE_SOURCE_DOCUMENTS: SampleDocument[] = [
  {
    id: 'doc-inv-101',
    docTitleAr: 'فاتورة مبيعات آجلة رقم (INV-2026/101)',
    docNumber: 'INV-2026/101',
    date: '2026/01/15',
    issuer: 'منشأة الأمل التجارية',
    recipient: 'محلات النصر التجارية (عميل)',
    transactionType: 'بيع بضاعة على الحساب (آجل)',
    description: 'بيع 50 كرتونة بضاعة على الحساب لمحلات النصر التجارية بشروط سداد 30 يوماً',
    amount: 35000,
    debitAccountSuggested: 'حساب العملاء / المدينون (محلات النصر)',
    creditAccountSuggested: 'حساب المبيعات (Sales)',
    equationImpact: 'زيادة أصل (مدينون) يقابلها زيادة في حقوق الملكية عبر الإيرادات (المبيعات).'
  },
  {
    id: 'doc-pv-205',
    docTitleAr: 'إذن صرف نقدي رقم (PV-205)',
    docNumber: 'PV-205',
    date: '2026/01/18',
    issuer: 'خزينة منشأة الأمل التجارية',
    recipient: 'شركة الكهرباء والطاقة',
    transactionType: 'سداد مصروفات عمومية نقداً',
    description: 'سداد فاتورة استهلاك الكهرباء والإنارة لشهر يناير نقداً من الخزينة',
    amount: 4500,
    debitAccountSuggested: 'حساب مصروف الكهرباء والمرافق',
    creditAccountSuggested: 'حساب الخزينة / الصندوق',
    equationImpact: 'نقص في حقوق الملكية بسبب المصروف يقابله نقص متماثل في الأصل النقدي بالخزينة.'
  },
  {
    id: 'doc-chk-509',
    docTitleAr: 'شيك مصرفي مسحوب على البنك الأهلي المصري (CHK-509)',
    docNumber: 'CHK-509',
    date: '2026/01/22',
    issuer: 'منشأة الأمل التجارية',
    recipient: 'شركة النور للتجارة والتوريدات (مورد)',
    transactionType: 'سداد مستحقات موردين بشيك',
    description: 'سداد دفعة من الحساب المستحق لشركة النور بموجب الشيك البنكي رقم 509',
    amount: 20000,
    debitAccountSuggested: 'حساب الموردين / الدائنون (شركة النور)',
    creditAccountSuggested: 'حساب البنك (Bank)',
    equationImpact: 'نقص التزام متداول (الدائنون) يقابله نقص أصل نقدي لدى البنك بنفس القيمة.'
  }
];

export const AccountingCyclePipeline: React.FC<AccountingCyclePipelineProps> = ({
  onPostTransactionToLedger,
  onNavigateToJRE,
  accounts,
  journalEntries,
  trialBalanceRows,
  totalDebitBalances,
  totalCreditBalances,
  isTrialBalanced,
  trialBalanceDiff,
  endingInventory,
  onSetEndingInventory,
  onApplyAdjustment
}) => {
  const [currentStep, setCurrentStep] = useState<CycleStep>(1);
  const [selectedDocIndex, setSelectedDocIndex] = useState<number>(0);
  const [internalAccounts, setInternalAccounts] = useState<TAccount[]>(DEFAULT_PIPELINE_ACCOUNTS);
  const [internalJournal, setInternalJournal] = useState<PipelineJournalEntry[]>(DEFAULT_PIPELINE_ENTRIES);
  const [internalInventory, setInternalInventory] = useState<number>(endingInventory !== undefined ? endingInventory : 25000);

  const effectiveAccounts = accounts && accounts.length > 0 ? accounts : internalAccounts;
  const effectiveJournal = journalEntries && journalEntries.length > 0 ? journalEntries : internalJournal;
  const effectiveInventory = endingInventory !== undefined ? endingInventory : internalInventory;
  const setEffectiveInventory = onSetEndingInventory || setInternalInventory;

  const calculatedTbRows = useMemo(() => {
    return effectiveAccounts.map(acc => {
      const debitSum = acc.entries.filter(e => e.type === 'debit').reduce((s, e) => s + e.amount, 0);
      const creditSum = acc.entries.filter(e => e.type === 'credit').reduce((s, e) => s + e.amount, 0);
      const diff = debitSum - creditSum;
      return {
        account: acc,
        totalDebit: debitSum,
        totalCredit: creditSum,
        debitBalance: diff > 0 ? diff : 0,
        creditBalance: diff < 0 ? -diff : 0
      };
    });
  }, [effectiveAccounts]);

  const effectiveTbRows = trialBalanceRows && trialBalanceRows.length > 0 ? trialBalanceRows : calculatedTbRows;
  const effectiveTotalDebitBal = totalDebitBalances !== undefined ? totalDebitBalances : effectiveTbRows.reduce((s, r) => s + r.debitBalance, 0);
  const effectiveTotalCreditBal = totalCreditBalances !== undefined ? totalCreditBalances : effectiveTbRows.reduce((s, r) => s + r.creditBalance, 0);
  const effectiveIsTrialBalanced = isTrialBalanced !== undefined ? isTrialBalanced : (effectiveTotalDebitBal === effectiveTotalCreditBal);
  const effectiveDiff = trialBalanceDiff !== undefined ? trialBalanceDiff : Math.abs(effectiveTotalDebitBal - effectiveTotalCreditBal);

  const [journalDraft, setJournalDraft] = useState<{
    date: string;
    debitAcc: string;
    creditAcc: string;
    amount: number;
    desc: string;
  }>({
    date: SAMPLE_SOURCE_DOCUMENTS[0].date,
    debitAcc: SAMPLE_SOURCE_DOCUMENTS[0].debitAccountSuggested,
    creditAcc: SAMPLE_SOURCE_DOCUMENTS[0].creditAccountSuggested,
    amount: SAMPLE_SOURCE_DOCUMENTS[0].amount,
    desc: SAMPLE_SOURCE_DOCUMENTS[0].description
  });

  const [postedSuccessMessage, setPostedSuccessMessage] = useState<string | null>(null);

  const selectedDoc = SAMPLE_SOURCE_DOCUMENTS[selectedDocIndex];

  // Select a source doc and autofill draft
  const handleSelectDocument = (idx: number) => {
    setSelectedDocIndex(idx);
    const doc = SAMPLE_SOURCE_DOCUMENTS[idx];
    setJournalDraft({
      date: doc.date,
      debitAcc: doc.debitAccountSuggested,
      creditAcc: doc.creditAccountSuggested,
      amount: doc.amount,
      desc: doc.description
    });
    setPostedSuccessMessage(null);
  };

  // Submit Draft to Live Ledger
  const handleCommitJournalToLedger = () => {
    const amt = Number(journalDraft.amount);
    if (!amt || amt <= 0) return;

    // Mutate internal state if using standalone mode
    setInternalAccounts(prev => {
      let debitFound = false;
      let creditFound = false;
      const updated = prev.map(acc => {
        const isDebitMatch = acc.name === journalDraft.debitAcc || 
          acc.name.includes(journalDraft.debitAcc.split(' ')[1] || '') ||
          journalDraft.debitAcc.includes(acc.name.split(' ')[1] || '');
        const isCreditMatch = acc.name === journalDraft.creditAcc || 
          acc.name.includes(journalDraft.creditAcc.split(' ')[1] || '') ||
          journalDraft.creditAcc.includes(acc.name.split(' ')[1] || '');

        if (isDebitMatch) {
          debitFound = true;
          return {
            ...acc,
            entries: [
              ...acc.entries,
              {
                id: `e-${Date.now()}-d`,
                date: journalDraft.date,
                oppositeAccount: journalDraft.creditAcc,
                amount: amt,
                type: 'debit' as const,
                note: journalDraft.desc
              }
            ]
          };
        }
        if (isCreditMatch) {
          creditFound = true;
          return {
            ...acc,
            entries: [
              ...acc.entries,
              {
                id: `e-${Date.now()}-c`,
                date: journalDraft.date,
                oppositeAccount: journalDraft.debitAcc,
                amount: amt,
                type: 'credit' as const,
                note: journalDraft.desc
              }
            ]
          };
        }
        return acc;
      });

      const newAccs = [...updated];
      if (!debitFound) {
        newAccs.push({
          id: `acc-${Date.now()}-1`,
          name: journalDraft.debitAcc,
          code: '199',
          category: 'expense',
          normalBalance: 'debit',
          entries: [{
            id: `e-${Date.now()}-d`,
            date: journalDraft.date,
            oppositeAccount: journalDraft.creditAcc,
            amount: amt,
            type: 'debit',
            note: journalDraft.desc
          }]
        });
      }
      if (!creditFound) {
        newAccs.push({
          id: `acc-${Date.now()}-2`,
          name: journalDraft.creditAcc,
          code: '299',
          category: 'revenue',
          normalBalance: 'credit',
          entries: [{
            id: `e-${Date.now()}-c`,
            date: journalDraft.date,
            oppositeAccount: journalDraft.debitAcc,
            amount: amt,
            type: 'credit',
            note: journalDraft.desc
          }]
        });
      }
      return newAccs;
    });

    setInternalJournal(prev => [
      ...prev,
      {
        id: `je-${Date.now()}`,
        date: journalDraft.date,
        description: journalDraft.desc,
        debitAccount: journalDraft.debitAcc,
        debitAmount: amt,
        creditAccount: journalDraft.creditAcc,
        creditAmount: amt,
        isCompound: false
      }
    ]);

    if (onPostTransactionToLedger) {
      onPostTransactionToLedger({
        debitAccount: journalDraft.debitAcc,
        creditAccount: journalDraft.creditAcc,
        amount: amt,
        description: journalDraft.desc,
        date: journalDraft.date
      });
    }

    setPostedSuccessMessage(
      `تم بنجاح ترحيل القيد: [من حـ/ ${journalDraft.debitAcc} إلى حـ/ ${journalDraft.creditAcc}] بمبلغ ${amt.toLocaleString()} ج.م إلى دفتر الأستاذ العام وميزان المراجعة.`
    );
  };

  // Step 6: Income statement calculation
  const revenues = effectiveAccounts
    .filter(a => a.category === 'revenue')
    .map(a => {
      const sum = a.entries.reduce((s, e) => s + (e.type === 'credit' ? e.amount : -e.amount), 0);
      return { name: a.name, amount: Math.max(0, sum) };
    });

  const expenses = effectiveAccounts
    .filter(a => a.category === 'expense')
    .map(a => {
      const sum = a.entries.reduce((s, e) => s + (e.type === 'debit' ? e.amount : -e.amount), 0);
      return { name: a.name, amount: Math.max(0, sum) };
    });

  const totalRevenues = revenues.reduce((s, r) => s + r.amount, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const netIncome = totalRevenues - totalExpenses;

  // Balance sheet assets and liabilities
  const assets = effectiveAccounts
    .filter(a => a.category === 'asset')
    .map(a => {
      const sum = a.entries.reduce((s, e) => s + (e.type === 'debit' ? e.amount : -e.amount), 0);
      return { name: a.name, amount: Math.max(0, sum) };
    });

  const liabilities = effectiveAccounts
    .filter(a => a.category === 'liability')
    .map(a => {
      const sum = a.entries.reduce((s, e) => s + (e.type === 'credit' ? e.amount : -e.amount), 0);
      return { name: a.name, amount: Math.max(0, sum) };
    });

  const equities = effectiveAccounts
    .filter(a => a.category === 'equity')
    .map(a => {
      const sum = a.entries.reduce((s, e) => s + (e.type === 'credit' ? e.amount : -e.amount), 0);
      return { name: a.name, amount: Math.max(0, sum) };
    });

  const totalAssets = assets.reduce((s, a) => s + a.amount, 0) + Number(effectiveInventory || 0);
  const totalLiabilities = liabilities.reduce((s, l) => s + l.amount, 0);
  const totalEquityBase = equities.reduce((s, eq) => s + eq.amount, 0);
  const totalEquityWithNetIncome = totalEquityBase + netIncome;

  const PIPELINE_STEPS = [
    { num: 1, label: '1. المستند المؤيد', icon: FileText, desc: 'فحص فواتير وأذون المعاملة' },
    { num: 2, label: '2. قيد اليومية', icon: PenTool, desc: 'تحليل القيد المزدوج والأثر' },
    { num: 3, label: '3. دفتر الأستاذ T', icon: Scale, desc: 'الترحيل والترصيد اللحظي' },
    { num: 4, label: '4. ميزان المراجعة', icon: Calculator, desc: 'مطابقة الأرصدة والمجاميع' },
    { num: 5, label: '5. التسويات الجردية', icon: Layers, desc: 'الأثر المالي وفق EAS' },
    { num: 6, label: '6. القوائم الختامية', icon: FileSpreadsheet, desc: 'قائمة الدخل والمركز المالي' },
    { num: 7, label: '7. التبرير المهني JRE', icon: Sparkles, desc: 'صياغة التفسير الوزاري' }
  ];

  return (
    <div className="space-y-6 font-serif" dir="rtl">
      
      {/* Visual Pipeline Stepper Navigation Bar */}
      <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#1D1D1B]/15 pb-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-[#1D1D1B] text-[#C4A484] text-xs font-bold px-2.5 py-0.5">
                مسار الدورة المحاسبية المتكاملة (Full Cycle Pipeline)
              </span>
              <span className="bg-[#8A1F1D] text-white text-xs font-bold px-2 py-0.5">
                المرحلة الأولى • الربط الشامل
              </span>
            </div>
            <h2 className="text-xl font-black text-[#1D1D1B] mt-1">
              المعمل التطبيقي المترابط من المستند الأصلي وحتى التبرير المهني
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-[#1D1D1B]/70">الخطوة الحالية:</span>
            <span className="bg-[#C4A484]/20 border border-[#1D1D1B]/20 text-[#1D1D1B] px-3 py-1">
              {PIPELINE_STEPS.find(s => s.num === currentStep)?.label}
            </span>
          </div>
        </div>

        {/* 7-Step Interactive Pipeline Progress Track */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {PIPELINE_STEPS.map((s) => {
            const Icon = s.icon;
            const isActive = currentStep === s.num;
            const isPassed = currentStep > s.num;

            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setCurrentStep(s.num as CycleStep)}
                className={`p-2.5 text-right border transition flex flex-col justify-between space-y-1.5 cursor-pointer relative ${
                  isActive
                    ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B] shadow-sm'
                    : isPassed
                    ? 'bg-[#F9F7F2] hover:bg-[#F0EEE6] text-[#1D1D1B] border-[#1D1D1B]/30'
                    : 'bg-[#FFFFFF] hover:bg-[#F9F7F2] text-[#1D1D1B]/70 border-[#1D1D1B]/15'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-6 h-6 flex items-center justify-center text-xs font-bold ${
                    isActive ? 'bg-[#C4A484] text-[#1D1D1B]' : isPassed ? 'bg-emerald-700 text-white' : 'bg-[#1D1D1B]/10 text-[#1D1D1B]'
                  }`}>
                    {isPassed ? '✓' : s.num}
                  </div>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C4A484]' : 'text-current'}`} />
                </div>

                <div>
                  <h4 className="text-xs font-extrabold line-clamp-1">{s.label}</h4>
                  <p className="text-[10px] opacity-75 line-clamp-1">{s.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 1: Source Document Inspection */}
      {currentStep === 1 && (
        <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#1D1D1B]/15 pb-4">
            <div>
              <span className="text-xs font-bold text-[#8A1F1D] uppercase tracking-wider block mb-1">
                الخطوة الأولى • مستندات القيد الثبوتية
              </span>
              <h3 className="text-xl font-black text-[#1D1D1B]">
                فحص وتحليل المستند المؤيد للعملية المالية (Source Document Inspection)
              </h3>
              <p className="text-xs sm:text-sm text-[#1D1D1B]/70 mt-1">
                لا يُجرى أي قيد في دفاتر اليومية إلا استناداً لمستند كتابي رسمي. اختر إحدى المعاملات الواقعية لفحص مستندها واستخراج أطرافها:
              </p>
            </div>

            <div className="flex items-center gap-2">
              {SAMPLE_SOURCE_DOCUMENTS.map((doc, idx) => (
                <button
                  key={doc.id}
                  onClick={() => handleSelectDocument(idx)}
                  className={`px-3 py-1.5 text-xs font-bold border transition cursor-pointer ${
                    selectedDocIndex === idx
                      ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B]'
                      : 'bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/20 hover:bg-[#FFFFFF]'
                  }`}
                >
                  مستند {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Document Physical Representation Frame */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-[#FFFDF9] border-2 border-[#1D1D1B] p-6 shadow-xs relative font-serif space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#1D1D1B] pb-3">
                <div className="text-right">
                  <span className="text-[10px] text-[#1D1D1B]/60 font-bold block">الجهة المصدرة:</span>
                  <strong className="text-sm font-extrabold text-[#1D1D1B]">{selectedDoc.issuer}</strong>
                </div>
                <div className="text-center px-3 py-1 bg-[#1D1D1B] text-[#C4A484] text-xs font-bold">
                  {selectedDoc.docTitleAr}
                </div>
                <div className="text-left font-mono text-xs">
                  <div>التاريخ: {selectedDoc.date}</div>
                  <div>الرقم: {selectedDoc.docNumber}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-2 text-xs border-b border-[#1D1D1B]/15">
                <div>
                  <span className="text-[#1D1D1B]/60 block text-[11px]">المستفيد / العميل:</span>
                  <span className="font-bold text-[#1D1D1B] text-sm">{selectedDoc.recipient}</span>
                </div>
                <div>
                  <span className="text-[#1D1D1B]/60 block text-[11px]">نوع المعاملة:</span>
                  <span className="font-bold text-[#8A1F1D] text-sm">{selectedDoc.transactionType}</span>
                </div>
              </div>

              <div className="py-2 text-xs space-y-1">
                <span className="text-[#1D1D1B]/60 text-[11px] block">بيان وتفاصيل المعاملة:</span>
                <p className="bg-[#F9F7F2] p-3 border border-[#1D1D1B]/15 leading-relaxed font-bold text-[#1D1D1B]">
                  {selectedDoc.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t-2 border-[#1D1D1B] font-mono">
                <span className="text-xs font-bold text-[#1D1D1B] font-serif">المبلغ الإجمالي المعتمد:</span>
                <span className="text-xl font-black text-[#1B4D2E] bg-emerald-50 px-3 py-1 border border-emerald-300">
                  {selectedDoc.amount.toLocaleString()} ج.م
                </span>
              </div>
            </div>

            {/* Document Extraction Analysis Guide */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-5 space-y-3">
                <h4 className="text-sm font-extrabold text-[#1D1D1B] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                  <span>البيانات المستخرجة توجيهاً لدفتر اليومية:</span>
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-white border border-[#1D1D1B]/10">
                    <span className="text-[#1D1D1B]/60 block text-[10px]">الطرف المدين المستنتج (من حـ/):</span>
                    <strong className="text-sm text-emerald-900">{selectedDoc.debitAccountSuggested}</strong>
                  </div>

                  <div className="p-2.5 bg-white border border-[#1D1D1B]/10">
                    <span className="text-[#1D1D1B]/60 block text-[10px]">الطرف الدائن المستنتج (إلى حـ/):</span>
                    <strong className="text-sm text-[#8A1F1D]">{selectedDoc.creditAccountSuggested}</strong>
                  </div>

                  <div className="p-2.5 bg-white border border-[#1D1D1B]/10">
                    <span className="text-[#1D1D1B]/60 block text-[10px]">الأثر على معادلة الميزانية:</span>
                    <p className="text-[11px] text-[#1D1D1B]/80 font-serif leading-relaxed mt-0.5">
                      {selectedDoc.equationImpact}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-2.5 bg-[#1D1D1B] hover:bg-[#333333] text-[#F9F7F2] text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-3"
                >
                  <span>الانتقال إلى الخطوة 2: صياغة قيد اليومية</span>
                  <ArrowLeft className="w-4 h-4 text-[#C4A484]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Journal Entry Editing & Verification */}
      {currentStep === 2 && (
        <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1D1D1B]/15 pb-4">
            <div>
              <span className="text-xs font-bold text-[#8A1F1D] uppercase tracking-wider block mb-1">
                الخطوة الثانية • دفتر اليومية العامة
              </span>
              <h3 className="text-xl font-black text-[#1D1D1B]">
                صياغة وتوجيه قيد اليومية المزدوج (Double-Entry General Journal)
              </h3>
              <p className="text-xs sm:text-sm text-[#1D1D1B]/70 mt-1">
                استناداً للمستند ({selectedDoc.docNumber})، راجع أطراف القيد وتأكد من توازن الجانب المدين والدائن بدقة:
              </p>
            </div>

            <button
              onClick={() => setCurrentStep(1)}
              className="px-3 py-1.5 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-xs font-bold text-[#1D1D1B] transition flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5 text-[#8A1F1D]" />
              <span>مراجعة المستند</span>
            </button>
          </div>

          {/* Journal Form Editor */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-4">
              <div className="border border-[#1D1D1B]/20 overflow-hidden text-xs">
                <div className="bg-[#1D1D1B] text-[#F9F7F2] p-2.5 grid grid-cols-12 font-bold text-center">
                  <span className="col-span-2 border-l border-white/20">مدين (ج.م)</span>
                  <span className="col-span-2 border-l border-white/20">دائن (ج.م)</span>
                  <span className="col-span-8 text-right pr-3">بيان أطراف القيد وشرح المعاملة</span>
                </div>

                {/* Debit Row Input */}
                <div className="p-3 grid grid-cols-12 items-center bg-[#FFFFFF] border-b border-[#1D1D1B]/10 gap-2">
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={journalDraft.amount}
                      onChange={(e) => setJournalDraft({ ...journalDraft, amount: Number(e.target.value) })}
                      className="w-full p-1.5 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-center font-mono font-bold text-emerald-900"
                    />
                  </div>
                  <span className="col-span-2 text-center font-mono text-[#1D1D1B]/30">-</span>
                  <div className="col-span-8 flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#1D1D1B]/60">من حـ/</span>
                    <input
                      type="text"
                      value={journalDraft.debitAcc}
                      onChange={(e) => setJournalDraft({ ...journalDraft, debitAcc: e.target.value })}
                      className="w-full p-1.5 bg-[#F9F7F2] border border-[#1D1D1B]/20 font-bold text-sm text-[#1D1D1B]"
                    />
                  </div>
                </div>

                {/* Credit Row Input */}
                <div className="p-3 grid grid-cols-12 items-center bg-[#F9F7F2] gap-2">
                  <span className="col-span-2 text-center font-mono text-[#1D1D1B]/30">-</span>
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={journalDraft.amount}
                      onChange={(e) => setJournalDraft({ ...journalDraft, amount: Number(e.target.value) })}
                      className="w-full p-1.5 bg-white border border-[#1D1D1B]/20 text-center font-mono font-bold text-[#8A1F1D]"
                    />
                  </div>
                  <div className="col-span-8 flex items-center gap-2 pr-6">
                    <span className="text-[11px] font-bold text-[#1D1D1B]/60">إلى حـ/</span>
                    <input
                      type="text"
                      value={journalDraft.creditAcc}
                      onChange={(e) => setJournalDraft({ ...journalDraft, creditAcc: e.target.value })}
                      className="w-full p-1.5 bg-white border border-[#1D1D1B]/20 font-bold text-sm text-[#1D1D1B]"
                    />
                  </div>
                </div>

                {/* Description input */}
                <div className="p-3 bg-[#FFFFFF] border-t border-[#1D1D1B]/10 space-y-1">
                  <span className="text-[10px] text-[#1D1D1B]/60 block font-bold">شرح القيد المحاسبي:</span>
                  <input
                    type="text"
                    value={journalDraft.desc}
                    onChange={(e) => setJournalDraft({ ...journalDraft, desc: e.target.value })}
                    className="w-full p-2 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-xs text-[#1D1D1B]"
                  />
                </div>
              </div>

              {postedSuccessMessage && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-700" />
                  <span>{postedSuccessMessage}</span>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCommitJournalToLedger}
                  className="px-5 py-2.5 bg-[#8A1F1D] hover:bg-[#701917] text-[#FFFFFF] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Scale className="w-4 h-4 text-[#C4A484]" />
                  <span>ترحيل هذا القيد فورياً إلى دفتر الأستاذ العام</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 bg-[#1D1D1B] hover:bg-[#333333] text-[#F9F7F2] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>متابعة إلى 3. دفتر الأستاذ T</span>
                  <ArrowLeft className="w-4 h-4 text-[#C4A484]" />
                </button>
              </div>
            </div>

            {/* Side Card: Accounting Equation Impact */}
            <div className="lg:col-span-4 bg-[#F9F7F2] border border-[#1D1D1B]/20 p-5 space-y-3">
              <span className="text-xs font-extrabold text-[#1D1D1B] block border-b border-[#1D1D1B]/15 pb-2">
                التحقق من توازن معادلة المركز المالي:
              </span>
              <div className="p-3 bg-white border border-[#1D1D1B]/10 text-xs space-y-2">
                <div className="font-bold text-[#1D1D1B]">الأصول = الالتزامات + حقوق الملكية</div>
                <p className="text-[11px] text-[#1D1D1B]/70 leading-relaxed">
                  القيد المزدوج يضمن أن كل زيادة أو نقص في جانب يقابله أثر مساوٍ تماماً في الجانب الآخر؛ فلا يختل التوازن تحت أي ظرف.
                </p>
              </div>
              <div className="text-[11px] text-[#1D1D1B]/80 leading-relaxed font-bold">
                عدد القيود الإجمالي المثبتة باليومية حالياً: {effectiveJournal.length} قيد.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: T-Account Ledger View */}
      {currentStep === 3 && (
        <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1D1D1B]/15 pb-4">
            <div>
              <span className="text-xs font-bold text-[#8A1F1D] uppercase tracking-wider block mb-1">
                الخطوة الثالثة • دفتر الأستاذ العام (T-Accounts)
              </span>
              <h3 className="text-xl font-black text-[#1D1D1B]">
                ترحيل قيود اليومية وترصيد حسابات الأستاذ ({effectiveAccounts.length} حساب نشط)
              </h3>
              <p className="text-xs sm:text-sm text-[#1D1D1B]/70 mt-1">
                لكل حساب صفحة مستقلة على شكل حرف T؛ الجانب الأيمن (منه / مدين) والجانب الأيسر (له / دائن) مع استخراج الرصيد المرحل والمنقول:
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-3 py-1.5 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-xs font-bold text-[#1D1D1B] flex items-center gap-1 cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>الرجوع لليومية</span>
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="px-4 py-1.5 bg-[#1D1D1B] text-[#F9F7F2] text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>الانتقال لميزان المراجعة</span>
                <ArrowLeft className="w-3.5 h-3.5 text-[#C4A484]" />
              </button>
            </div>
          </div>

          {/* Accounts Grid Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {effectiveAccounts.slice(0, 6).map((acc) => {
              const debitEntries = acc.entries.filter(e => e.type === 'debit');
              const creditEntries = acc.entries.filter(e => e.type === 'credit');
              const dTotal = debitEntries.reduce((s, e) => s + e.amount, 0);
              const cTotal = creditEntries.reduce((s, e) => s + e.amount, 0);
              const higher = Math.max(dTotal, cTotal);
              const diff = dTotal - cTotal;

              return (
                <div key={acc.id} className="border-2 border-[#1D1D1B] bg-white text-xs overflow-hidden shadow-xs">
                  <div className="bg-[#1D1D1B] text-[#F9F7F2] p-2 text-center font-bold flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#C4A484]">{acc.code}</span>
                    <span className="truncate">{acc.name}</span>
                    <span className="text-[10px] bg-white/20 px-1">
                      {acc.category === 'asset' ? 'أصل' : acc.category === 'liability' ? 'التزام' : acc.category === 'equity' ? 'ملكية' : acc.category === 'revenue' ? 'إيراد' : 'مصروف'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 divide-x divide-x-reverse divide-[#1D1D1B]/20 min-h-[140px]">
                    {/* Debit side */}
                    <div className="p-2 space-y-1 bg-[#FFFFFF]">
                      <div className="font-bold text-center text-emerald-900 border-b border-[#1D1D1B]/10 pb-1">
                        منه (مدين)
                      </div>
                      {debitEntries.map(e => (
                        <div key={e.id} className="flex items-center justify-between text-[11px]">
                          <span className="truncate text-[#1D1D1B]/60 text-[10px]">{e.oppositeAccount}</span>
                          <span className="font-mono font-bold text-emerald-800">{e.amount.toLocaleString()}</span>
                        </div>
                      ))}
                      {diff < 0 && (
                        <div className="text-[10px] font-bold text-[#8A1F1D] pt-1">
                          رصيد مرحل دائن: {Math.abs(diff).toLocaleString()}
                        </div>
                      )}
                    </div>

                    {/* Credit side */}
                    <div className="p-2 space-y-1 bg-[#F9F7F2]">
                      <div className="font-bold text-center text-[#8A1F1D] border-b border-[#1D1D1B]/10 pb-1">
                        له (دائن)
                      </div>
                      {creditEntries.map(e => (
                        <div key={e.id} className="flex items-center justify-between text-[11px]">
                          <span className="truncate text-[#1D1D1B]/60 text-[10px]">{e.oppositeAccount}</span>
                          <span className="font-mono font-bold text-[#8A1F1D]">{e.amount.toLocaleString()}</span>
                        </div>
                      ))}
                      {diff > 0 && (
                        <div className="text-[10px] font-bold text-emerald-800 pt-1">
                          رصيد مرحل مدين: {diff.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Balancing footer */}
                  <div className="grid grid-cols-2 bg-[#1D1D1B] text-[#F9F7F2] p-1.5 text-center font-mono font-bold border-t border-[#1D1D1B]">
                    <span>{higher.toLocaleString()} ج</span>
                    <span>{higher.toLocaleString()} ج</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-[#F9F7F2] border border-[#1D1D1B]/20 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-[#1D1D1B]/80 font-bold">
              يتم سحب الأرصدة النهائية لجميع حسابات الأستاذ أعلاه تلقائياً وتغذيتها في ميزان المراجعة التالي.
            </span>
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="px-4 py-2 bg-[#1D1D1B] hover:bg-[#333333] text-[#F9F7F2] text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>متابعة إلى 4. ميزان المراجعة</span>
              <ArrowLeft className="w-4 h-4 text-[#C4A484]" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Trial Balance */}
      {currentStep === 4 && (
        <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1D1D1B]/15 pb-4">
            <div>
              <span className="text-xs font-bold text-[#8A1F1D] uppercase tracking-wider block mb-1">
                الخطوة الرابعة • ميزان المراجعة قبل التسويات
              </span>
              <h3 className="text-xl font-black text-[#1D1D1B]">
                ميزان المراجعة بالأرصدة وكاشف الأخطاء الحسابية (Unadjusted Trial Balance)
              </h3>
              <p className="text-xs sm:text-sm text-[#1D1D1B]/70 mt-1">
                كشف دوري يثبت التوازن الحسابي بين مجموع الأرصدة المدينة والدائنة كشرط أساسي قبل الانتقال للتسويات الجردية:
              </p>
            </div>

            <div className={`px-3 py-1.5 text-xs font-bold border flex items-center gap-1.5 ${
              effectiveIsTrialBalanced ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              {effectiveIsTrialBalanced ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              <span>{effectiveIsTrialBalanced ? 'الميزان متوازن تماماً ✓' : `اختلال توازن قدره ${Math.abs(effectiveDiff).toLocaleString()} ج`}</span>
            </div>
          </div>

          <div className="border border-[#1D1D1B]/20 overflow-x-auto text-xs">
            <table className="w-full text-right">
              <thead className="bg-[#1D1D1B] text-[#F9F7F2] font-bold">
                <tr>
                  <th className="p-2.5 border-l border-white/20">كود</th>
                  <th className="p-2.5 border-l border-white/20">اسم حساب الأستاذ</th>
                  <th className="p-2.5 border-l border-white/20">التبويب</th>
                  <th className="p-2.5 text-left font-mono border-l border-white/20">رصيد مدين (منه)</th>
                  <th className="p-2.5 text-left font-mono">رصيد دائن (له)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1D1D1B]/10">
                {effectiveTbRows.map(r => (
                  <tr key={r.account.id} className="hover:bg-[#F9F7F2]">
                    <td className="p-2.5 font-mono text-[#1D1D1B]/60">{r.account.code}</td>
                    <td className="p-2.5 font-bold text-[#1D1D1B]">{r.account.name}</td>
                    <td className="p-2.5 text-[11px] text-[#1D1D1B]/70">{r.account.category}</td>
                    <td className="p-2.5 text-left font-mono font-bold text-emerald-800">
                      {r.debitBalance > 0 ? r.debitBalance.toLocaleString() : '-'}
                    </td>
                    <td className="p-2.5 text-left font-mono font-bold text-[#8A1F1D]">
                      {r.creditBalance > 0 ? r.creditBalance.toLocaleString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-[#1D1D1B] text-[#F9F7F2] font-black text-xs font-mono">
                <tr>
                  <td colSpan={3} className="p-2.5 text-right font-serif">الإجمالي العام:</td>
                  <td className="p-2.5 text-left text-[#C4A484]">{effectiveTotalDebitBal.toLocaleString()} ج</td>
                  <td className="p-2.5 text-left text-[#C4A484]">{effectiveTotalCreditBal.toLocaleString()} ج</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-xs font-bold text-[#1D1D1B] flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>الرجوع لدفتر الأستاذ</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="px-5 py-2.5 bg-[#8A1F1D] hover:bg-[#701917] text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>المتابعة إلى 5. التسويات الجردية الذكية (الوحدة 5)</span>
              <ArrowLeft className="w-4 h-4 text-[#C4A484]" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: Dynamic Adjusting Entries Sandbox */}
      {currentStep === 5 && (
        <div className="space-y-4">
          <AdjustingEntriesSandbox
            onApplyAdjustmentToLedger={(entry) => {
              if (onPostTransactionToLedger) {
                onPostTransactionToLedger(entry);
              }
              setInternalAccounts(prev => {
                return prev.map(acc => {
                  if (acc.name === entry.debitAccount || entry.debitAccount.includes(acc.name)) {
                    return {
                      ...acc,
                      entries: [
                        ...acc.entries,
                        {
                          id: `adj-${Date.now()}-d`,
                          date: entry.date,
                          oppositeAccount: entry.creditAccount,
                          amount: entry.amount,
                          type: 'debit' as const,
                          note: entry.description
                        }
                      ]
                    };
                  }
                  if (acc.name === entry.creditAccount || entry.creditAccount.includes(acc.name)) {
                    return {
                      ...acc,
                      entries: [
                        ...acc.entries,
                        {
                          id: `adj-${Date.now()}-c`,
                          date: entry.date,
                          oppositeAccount: entry.debitAccount,
                          amount: entry.amount,
                          type: 'credit' as const,
                          note: entry.description
                        }
                      ]
                    };
                  }
                  return acc;
                });
              });
            }}
            onNavigateToJRE={() => setCurrentStep(7)}
          />

          <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="px-4 py-2 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-xs font-bold text-[#1D1D1B] flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>الرجوع إلى ميزان المراجعة</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(6)}
              className="px-5 py-2.5 bg-[#1D1D1B] hover:bg-[#333333] text-[#F9F7F2] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>المتابعة إلى 6. القوائم المالية الختامية (EAS)</span>
              <ArrowLeft className="w-4 h-4 text-[#C4A484]" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: Final Financial Statements (Income Statement & Balance Sheet) */}
      {currentStep === 6 && (
        <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1D1D1B]/15 pb-4">
            <div>
              <span className="text-xs font-bold text-[#8A1F1D] uppercase tracking-wider block mb-1">
                الخطوة السادسة • القوائم المالية الختامية
              </span>
              <h3 className="text-xl font-black text-[#1D1D1B]">
                قائمة الدخل والمركز المالي طبقاً لمعايير المحاسبة المصرية (EAS)
              </h3>
              <p className="text-xs sm:text-sm text-[#1D1D1B]/70 mt-1">
                المخرجات النهائية للدورة المحاسبية بعد استيعاب جميع قيود التسوية والتحقق من إقفال الإيرادات والمصروفات:
              </p>
            </div>

            {/* Ending Inventory Setter */}
            <div className="flex items-center gap-2 bg-[#F9F7F2] p-2 border border-[#1D1D1B]/20 text-xs">
              <span className="font-bold text-[#1D1D1B]">مخزون آخر المدة (الجرد الفعلي):</span>
              <input
                type="number"
                value={effectiveInventory}
                onChange={(e) => setEffectiveInventory(Number(e.target.value))}
                className="w-24 p-1 bg-white border border-[#1D1D1B]/30 font-mono font-bold text-center"
              />
              <span className="text-[10px] text-[#1D1D1B]/60">ج.م</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Income Statement */}
            <div className="border-2 border-[#1D1D1B] bg-white p-5 space-y-4">
              <div className="border-b-2 border-[#1D1D1B] pb-2 flex items-center justify-between">
                <h4 className="font-black text-sm text-[#1D1D1B]">
                  قائمة الدخل عن السنة المالية المنتهية في 2026/12/31
                </h4>
                <span className="text-[10px] bg-[#1D1D1B] text-[#F9F7F2] px-2 py-0.5 font-bold">
                  EAS 1
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="font-bold text-emerald-900 bg-emerald-50 p-2 border border-emerald-200">
                  أولاً: إيرادات النشاط التشغيلي
                </div>
                {revenues.map((r, i) => (
                  <div key={i} className="flex justify-between px-2 text-[11px]">
                    <span>{r.name}</span>
                    <span className="font-mono font-bold">{r.amount.toLocaleString()} ج</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold border-t border-[#1D1D1B]/15 pt-1 px-2">
                  <span>إجمالي الإيرادات:</span>
                  <span className="font-mono text-emerald-800">{totalRevenues.toLocaleString()} ج</span>
                </div>

                <div className="font-bold text-[#8A1F1D] bg-rose-50 p-2 border border-rose-200 mt-3">
                  ثانياً: المصروفات التشغيلية والتسويات
                </div>
                {expenses.map((e, i) => (
                  <div key={i} className="flex justify-between px-2 text-[11px]">
                    <span>{e.name}</span>
                    <span className="font-mono font-bold">{e.amount.toLocaleString()} ج</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold border-t border-[#1D1D1B]/15 pt-1 px-2">
                  <span>إجمالي المصروفات:</span>
                  <span className="font-mono text-[#8A1F1D]">{totalExpenses.toLocaleString()} ج</span>
                </div>
              </div>

              <div className="pt-3 border-t-2 border-[#1D1D1B] flex items-center justify-between bg-[#1D1D1B] text-[#F9F7F2] p-3">
                <span className="font-bold text-xs">صافي ربح / (خسارة) العام:</span>
                <span className={`text-base font-black font-mono ${netIncome >= 0 ? 'text-[#C4A484]' : 'text-rose-300'}`}>
                  {netIncome.toLocaleString()} ج.م
                </span>
              </div>
            </div>

            {/* Balance Sheet Statement */}
            <div className="border-2 border-[#1D1D1B] bg-white p-5 space-y-4">
              <div className="border-b-2 border-[#1D1D1B] pb-2 flex items-center justify-between">
                <h4 className="font-black text-sm text-[#1D1D1B]">
                  قائمة المركز المالي في 2026/12/31
                </h4>
                <span className="text-[10px] bg-[#1D1D1B] text-[#F9F7F2] px-2 py-0.5 font-bold">
                  Balance Sheet
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="font-bold text-[#1D1D1B] bg-[#F9F7F2] p-2 border border-[#1D1D1B]/15">
                  جانب الأصول (الموجودات):
                </div>
                {assets.map((a, i) => (
                  <div key={i} className="flex justify-between px-2 text-[11px]">
                    <span>{a.name}</span>
                    <span className="font-mono font-bold">{a.amount.toLocaleString()} ج</span>
                  </div>
                ))}
                {Number(effectiveInventory) > 0 && (
                  <div className="flex justify-between px-2 text-[11px]">
                    <span>بضاعة آخر المدة (مخزون فعلي)</span>
                    <span className="font-mono font-bold">{Number(effectiveInventory).toLocaleString()} ج</span>
                  </div>
                )}
                <div className="flex justify-between font-bold border-t border-[#1D1D1B]/15 pt-1 px-2 text-emerald-900">
                  <span>مجموع الأصول:</span>
                  <span className="font-mono">{totalAssets.toLocaleString()} ج</span>
                </div>

                <div className="font-bold text-[#1D1D1B] bg-[#F9F7F2] p-2 border border-[#1D1D1B]/15 mt-3">
                  جانب الالتزامات وحقوق الملكية:
                </div>
                <div className="flex justify-between px-2 text-[11px]">
                  <span>إجمالي الالتزامات والخصوم المتداولة:</span>
                  <span className="font-mono font-bold">{totalLiabilities.toLocaleString()} ج</span>
                </div>
                <div className="flex justify-between px-2 text-[11px]">
                  <span>رأس المال وحقوق الشركاء:</span>
                  <span className="font-mono font-bold">{totalEquityBase.toLocaleString()} ج</span>
                </div>
                <div className="flex justify-between px-2 text-[11px] font-bold text-[#8A1F1D]">
                  <span>يضاف صافي أرباح العام:</span>
                  <span className="font-mono">{netIncome.toLocaleString()} ج</span>
                </div>
                <div className="flex justify-between font-bold border-t border-[#1D1D1B]/15 pt-1 px-2 text-[#1D1D1B]">
                  <span>مجموع الالتزامات وحقوق الملكية:</span>
                  <span className="font-mono">{(totalLiabilities + totalEquityWithNetIncome).toLocaleString()} ج</span>
                </div>
              </div>

              <div className="p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold text-center">
                تطابق توازن المركز المالي: الأصول = الالتزامات + حقوق الملكية ✓
              </div>
            </div>

          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setCurrentStep(5)}
              className="px-4 py-2 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-xs font-bold text-[#1D1D1B] flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>الرجوع للتسويات الجردية</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(7)}
              className="px-5 py-2.5 bg-[#8A1F1D] hover:bg-[#701917] text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>الخطوة 7: صياغة مقال التبرير المحاسبي (JRE)</span>
              <ArrowLeft className="w-4 h-4 text-[#C4A484]" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: JRE Professional Justification Workshop Bridge */}
      {currentStep === 7 && (
        <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1D1D1B]/15 pb-4">
            <div>
              <span className="text-xs font-bold text-[#1B4D2E] uppercase tracking-wider block mb-1">
                الخطوة السابعة • التبرير المحاسبي المهني JRE (20 درجة)
              </span>
              <h3 className="text-xl font-black text-[#1D1D1B]">
                التبرير المحاسبي المدعوم بالأدلة وصياغة الرأي المهني المنضبط
              </h3>
              <p className="text-xs sm:text-sm text-[#1D1D1B]/70 mt-1">
                المرحلة الأرقى في الفكر المحاسبي وفق نظام البكالوريا المصرية الجديد؛ ربط الأرقام بالقوانين والمعايير والمبادئ المحاسبية:
              </p>
            </div>

            <span className="bg-[#1B4D2E] text-white text-xs font-bold px-3 py-1">
              سلم التصحيح الوزاري المعتمد
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-[#F9F7F2] border border-[#1D1D1B]/20 space-y-4">
              <h4 className="font-extrabold text-sm text-[#1D1D1B] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#8A1F1D]" />
                <span>عناصر مقال التبرير المحاسبي الكامل (JRE Elements):</span>
              </h4>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 bg-white border border-[#1D1D1B]/15">
                  <strong className="text-[#8A1F1D] block">1. الموقف والادعاء (Claim):</strong>
                  <span>تحديد القرار المحاسبي السليم بصورة واضحة وقاطعة.</span>
                </div>
                <div className="p-2.5 bg-white border border-[#1D1D1B]/15">
                  <strong className="text-[#8A1F1D] block">2. الأدلة الرقمية (Evidence):</strong>
                  <span>الاستشهاد بالأرقام المستخرجة من القوائم المالية والمستندات.</span>
                </div>
                <div className="p-2.5 bg-white border border-[#1D1D1B]/15">
                  <strong className="text-[#8A1F1D] block">3. الأساس النظري والمعايير (Accounting Standard / Principle):</strong>
                  <span>الربط بمبدأ الاستحقاق، المقابلة، الحيطة والحذر، أو معايير المحاسبة المصرية (EAS).</span>
                </div>
                <div className="p-2.5 bg-white border border-[#1D1D1B]/15">
                  <strong className="text-[#8A1F1D] block">4. التوصية وتفنيد الرأي المعاكس (Counter-Argument & Rebuttal):</strong>
                  <span>بيان خطأ المعالجة البديلة وأثرها المضلل على متخذي القرار.</span>
                </div>
              </div>
            </div>

            <div className="p-5 bg-[#FFFFFF] border-2 border-[#1B4D2E] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#1B4D2E] bg-emerald-50 px-2.5 py-1 border border-emerald-300 inline-block">
                  ورشة الكتابة التفاعلية الكاملة
                </span>
                <h4 className="text-base font-extrabold text-[#1D1D1B]">
                  الانتقال إلى ورشة JRE المتخصصة للمنهج
                </h4>
                <p className="text-xs text-[#1D1D1B]/70 leading-relaxed">
                  تضم ورشة JRE 15 حالة منهجية معتمدة تغطي الوحدات الخمس، مع محرك تقييم فوري ومصحح إرشادي يقدم تفصيلاً لدرجات الطالب وفق السلم الرسمي (20 درجة).
                </p>
              </div>

              {onNavigateToJRE && (
                <button
                  type="button"
                  onClick={onNavigateToJRE}
                  className="w-full py-3 bg-[#1B4D2E] hover:bg-[#153c23] text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-[#C4A484]" />
                  <span>فتح ورشة مقال التفسير المحاسبي JRE بكامل أدواتها</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="p-4 bg-[#F9F7F2] border border-[#1D1D1B]/20 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setCurrentStep(6)}
              className="px-4 py-2 bg-white border border-[#1D1D1B]/20 text-xs font-bold text-[#1D1D1B] flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>الرجوع للقوائم المالية</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 bg-[#1D1D1B] text-[#F9F7F2] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-[#C4A484]" />
              <span>إعادة مسار الدورة من البداية</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
