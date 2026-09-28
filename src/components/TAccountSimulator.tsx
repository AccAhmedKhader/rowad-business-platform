import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Scale, Plus, Trash2, CheckCircle2, AlertTriangle, RefreshCw, 
  Sparkles, FileSpreadsheet, ArrowLeft, ArrowRight, BookOpen, 
  Layers, ArrowUpRight, ArrowDownLeft, Eye, Check, PenTool, 
  HelpCircle, Shuffle, ShieldAlert, CheckCircle, Calculator, FileText, X,
  ShieldCheck, EyeOff, BookMarked, Workflow
} from 'lucide-react';
import { SubsidiaryBooksView } from './simulator/SubsidiaryBooksView';
import { PostingChallengeView } from './simulator/PostingChallengeView';
import { DetailedBalanceSheetView } from './simulator/DetailedBalanceSheetView';
import { AdjustingEntriesSandbox } from './simulator/AdjustingEntriesSandbox';
import { AccountingCyclePipeline } from './simulator/AccountingCyclePipeline';
import { TAccount } from './TAccount';

export interface TAccountEntry {
  id: string;
  date: string;
  oppositeAccount: string;
  amount: number;
  type: 'debit' | 'credit';
  note?: string;
}

export interface TAccount {
  id: string;
  name: string;
  code: string;
  category: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  normalBalance: 'debit' | 'credit';
  entries: TAccountEntry[];
}

export interface JournalEntry {
  id: string;
  date: string;
  debitAccountId: string;
  debitAccountName: string;
  creditAccountId: string;
  creditAccountName: string;
  amount: number;
  description: string;
}

export interface GuidedScenario {
  id: string;
  title: string;
  subtitle: string;
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم';
  description: string;
  journalEntries: Array<{
    date: string;
    debitAccName: string;
    debitCategory: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
    creditAccName: string;
    creditCategory: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
    amount: number;
    description: string;
  }>;
  endingInventory: number;
}

const PRESET_SCENARIOS: GuidedScenario[] = [
  {
    id: 'case-unit1',
    title: 'تطبيق الوحدة 1: أثر المعاملات على معادلة الميزانية والمركز المالي',
    subtitle: 'الأصول = الالتزامات + حقوق الملكية (الحالات الأربعة الأساسية للتوازن)',
    difficulty: 'مبتدئ',
    description: 'تطبيق تعليمي متخصص يوضح العمليات الأربعة المؤثرة في معادلة الميزانية: زيادة أصل ونقص آخر، زيادة أصل وزيادة التزام، زيادة أصل وزيادة رأس المال، ونقص أصل ونقص التزام.',
    endingInventory: 0,
    journalEntries: [
      {
        date: '2026/01/01',
        debitAccName: 'حساب الصندوق / النقدية (Cash)',
        debitCategory: 'asset',
        creditAccName: 'حساب رأس المال (Capital)',
        creditCategory: 'equity',
        amount: 150000,
        description: 'بداية النشاط وإيداع رأس المال نقداً بالخزينة (زيادة أصل = زيادة حقوق ملكية)'
      },
      {
        date: '2026/01/05',
        debitAccName: 'حساب الأثاث والتجهيزات (Furniture)',
        debitCategory: 'asset',
        creditAccName: 'حساب الصندوق / النقدية (Cash)',
        creditCategory: 'asset',
        amount: 20000,
        description: 'شراء أثاث نقداً (تغيير نوعي بالأصول: زيادة أصل يقابلها نقص أصل آخر)'
      },
      {
        date: '2026/01/10',
        debitAccName: 'حساب السيارات والمعدات (Equipment)',
        debitCategory: 'asset',
        creditAccName: 'حساب الموردين / الدائنون (Payables)',
        creditCategory: 'liability',
        amount: 50000,
        description: 'شراء سيارة نقل بالآجل على الحساب (زيادة أصل = زيادة التزام)'
      },
      {
        date: '2026/01/20',
        debitAccName: 'حساب الموردين / الدائنون (Payables)',
        debitCategory: 'liability',
        creditAccName: 'حساب الصندوق / النقدية (Cash)',
        creditCategory: 'asset',
        amount: 15000,
        description: 'سداد دفعة نقدية للموردين (نقص التزام = نقص أصل)'
      }
    ]
  },
  {
    id: 'case-1',
    title: 'الدورة المحاسبية المتكاملة لمنشأة "الأمل التجارية"',
    subtitle: 'من قيود التأسيس والعمليات التشغيلية إلى الحسابات الختامية',
    difficulty: 'متوسط',
    description: 'تطبيق شامل على تأسيس المنشأة، إيداع رأس المال، شراء أصول وبضاعة، بيع نقدي وآجل، وسداد المصروفات وترصيد الحسابات.',
    endingInventory: 25000,
    journalEntries: [
      {
        date: '2026/01/01',
        debitAccName: 'حساب البنك (Bank)',
        debitCategory: 'asset',
        creditAccName: 'حساب رأس المال (Capital)',
        creditCategory: 'equity',
        amount: 200000,
        description: 'إيداع رأس مال المنشأة المبدئي في الحساب البنكي'
      },
      {
        date: '2026/01/03',
        debitAccName: 'حساب الصندوق / النقدية (Cash)',
        debitCategory: 'asset',
        creditAccName: 'حساب البنك (Bank)',
        creditCategory: 'asset',
        amount: 30000,
        description: 'سحب مبلغ نقدي من البنك وتغذيته في خزينة الصندوق'
      },
      {
        date: '2026/01/05',
        debitAccName: 'حساب السيارات والمعدات (Equipment)',
        debitCategory: 'asset',
        creditAccName: 'حساب البنك (Bank)',
        creditCategory: 'asset',
        amount: 60000,
        description: 'شراء سيارة نقل للمنشأة بشيك بنكي'
      },
      {
        date: '2026/01/08',
        debitAccName: 'حساب المشتريات (Purchases)',
        debitCategory: 'expense',
        creditAccName: 'حساب الموردين / الدائنون (Payables)',
        creditCategory: 'liability',
        amount: 70000,
        description: 'شراء بضاعة على الحساب (بالآجل) من شركة النور'
      },
      {
        date: '2026/01/12',
        debitAccName: 'حساب الصندوق / النقدية (Cash)',
        debitCategory: 'asset',
        creditAccName: 'حساب المبيعات (Sales)',
        creditCategory: 'revenue',
        amount: 55000,
        description: 'بيع بضاعة نقداً وتحصيل قيمتها في الصندوق'
      },
      {
        date: '2026/01/15',
        debitAccName: 'حساب العملاء / المدينون (Receivables)',
        debitCategory: 'asset',
        creditAccName: 'حساب المبيعات (Sales)',
        creditCategory: 'revenue',
        amount: 45000,
        description: 'بيع بضاعة بالآجل للعميل مؤسسة الأهرام'
      },
      {
        date: '2026/01/20',
        debitAccName: 'حساب الموردين / الدائنون (Payables)',
        debitCategory: 'liability',
        creditAccName: 'حساب البنك (Bank)',
        creditCategory: 'asset',
        amount: 40000,
        description: 'سداد جزء من مستحقات الموردين بشيك بنكي'
      },
      {
        date: '2026/01/25',
        debitAccName: 'حساب مصروف إيجار المعرض (Rent)',
        debitCategory: 'expense',
        creditAccName: 'حساب الصندوق / النقدية (Cash)',
        creditCategory: 'asset',
        amount: 8000,
        description: 'سداد إيجار المعرض نقداً عن شهر يناير'
      },
      {
        date: '2026/01/30',
        debitAccName: 'حساب مصروف الرواتب والأجور (Salaries)',
        debitCategory: 'expense',
        creditAccName: 'حساب البنك (Bank)',
        creditCategory: 'asset',
        amount: 12000,
        description: 'تحويل رواتب موظفي المنشأة عبر الحساب البنكي'
      }
    ]
  },
  {
    id: 'case-2',
    title: 'تأسيس مشروع خدماتي واستشارات مالية',
    subtitle: 'التركيز على حركة النقدية والبنك وإيرادات الخدمات والمصروفات',
    difficulty: 'مبتدئ',
    description: 'مشروع يعتمد على تقديم خدمات مهنية مع مصروفات تشغيلية وسحب شخصي للمالك.',
    endingInventory: 0,
    journalEntries: [
      {
        date: '2026/01/01',
        debitAccName: 'حساب البنك (Bank)',
        debitCategory: 'asset',
        creditAccName: 'حساب رأس المال (Capital)',
        creditCategory: 'equity',
        amount: 100000,
        description: 'إيداع رأس المال المبدئي في البنك'
      },
      {
        date: '2026/01/04',
        debitAccName: 'حساب أجهزة الحاسب والأثاث (Office Assets)',
        debitCategory: 'asset',
        creditAccName: 'حساب البنك (Bank)',
        creditCategory: 'asset',
        amount: 25000,
        description: 'تجهيز مقر المكتب بالأجهزة والأثاث بشيك'
      },
      {
        date: '2026/01/10',
        debitAccName: 'حساب الصندوق / النقدية (Cash)',
        debitCategory: 'asset',
        creditAccName: 'حساب إيرادات الاستشارات (Services Revenue)',
        creditCategory: 'revenue',
        amount: 35000,
        description: 'تحصيل أتعاب استشارات دراسة جدوى نقداً'
      },
      {
        date: '2026/01/18',
        debitAccName: 'حساب مصروف الدعاية والتسويق (Marketing)',
        debitCategory: 'expense',
        creditAccName: 'حساب الصندوق / النقدية (Cash)',
        creditCategory: 'asset',
        amount: 5000,
        description: 'سداد حملة إعلانية رقمية نقداً'
      },
      {
        date: '2026/01/25',
        debitAccName: 'حساب المسحوبات الشخصية (Drawings)',
        debitCategory: 'equity',
        creditAccName: 'حساب البنك (Bank)',
        creditCategory: 'asset',
        amount: 6000,
        description: 'سحب شيك نقدي للمصروفات الشخصية لصاحب المنشأة'
      }
    ]
  },
  {
    id: 'case-3',
    title: 'اختبار كشف الأخطاء ومعالجة الحساب المعلق (Suspense Account)',
    subtitle: 'محاكاة عملية لكيفية اختلال توازن الميزان ومعالجته محاسبياً',
    difficulty: 'متقدم',
    description: 'يتضمن خطأ ترحيل في أحد أطراف القيد لتدريب الطالب على تحديد الفرق ومطابقة ميزان المراجعة.',
    endingInventory: 15000,
    journalEntries: [
      {
        date: '2026/01/01',
        debitAccName: 'حساب الصندوق / النقدية (Cash)',
        debitCategory: 'asset',
        creditAccName: 'حساب رأس المال (Capital)',
        creditCategory: 'equity',
        amount: 80000,
        description: 'إيداع رأس المال نقداً بالخزينة'
      },
      {
        date: '2026/01/05',
        debitAccName: 'حساب المشتريات (Purchases)',
        debitCategory: 'expense',
        creditAccName: 'حساب الصندوق / النقدية (Cash)',
        creditCategory: 'asset',
        amount: 30000,
        description: 'شراء بضاعة نقداً'
      },
      {
        date: '2026/01/15',
        debitAccName: 'حساب الصندوق / النقدية (Cash)',
        debitCategory: 'asset',
        creditAccName: 'حساب المبيعات (Sales)',
        creditCategory: 'revenue',
        amount: 42000,
        description: 'بيع بضاعة نقداً بالكامل'
      }
    ]
  },
  {
    id: 'case-unit5',
    title: 'تطبيق الوحدة 5: منشأة النور (التسويات الجردية والتحليل المالي الشامل)',
    subtitle: 'التسويات الأربعة، بضاعة آخر المدة، القوائم الختامية، والنسب المالية الستة',
    difficulty: 'متقدم',
    description: 'حالة تطبيقية شاملة تتضمن عمليات تجارية، وتطبيق قيود التسويات الجردية الأربعة (مصروف مقدم، مصروف مستحق، إيراد مستحق، إيراد مقدم) مع حساب بضاعة آخر المدة وإظهار القوائم والنسب المالية.',
    endingInventory: 35000,
    journalEntries: [
      {
        date: '2026/01/01',
        debitAccName: 'حساب البنك (Bank)',
        debitCategory: 'asset',
        creditAccName: 'حساب رأس المال (Capital)',
        creditCategory: 'equity',
        amount: 300000,
        description: 'إيداع رأس مال منشأة النور بالبنك'
      },
      {
        date: '2026/01/03',
        debitAccName: 'حساب الصندوق / النقدية (Cash)',
        debitCategory: 'asset',
        creditAccName: 'حساب البنك (Bank)',
        creditCategory: 'asset',
        amount: 50000,
        description: 'تحويل نقدي من البنك لتغذية خزينة الصندوق'
      },
      {
        date: '2026/01/07',
        debitAccName: 'حساب السيارات والمعدات (Equipment)',
        debitCategory: 'asset',
        creditAccName: 'حساب البنك (Bank)',
        creditCategory: 'asset',
        amount: 80000,
        description: 'شراء سيارات لنقل البضائع بشيك بنكي'
      },
      {
        date: '2026/01/10',
        debitAccName: 'حساب المشتريات (Purchases)',
        debitCategory: 'expense',
        creditAccName: 'حساب الموردين / الدائنون (Payables)',
        creditCategory: 'liability',
        amount: 90000,
        description: 'شراء بضاعة على الحساب بالآجل من شركة الأمل'
      },
      {
        date: '2026/01/15',
        debitAccName: 'حساب العملاء / المدينون (Receivables)',
        debitCategory: 'asset',
        creditAccName: 'حساب المبيعات (Sales)',
        creditCategory: 'revenue',
        amount: 120000,
        description: 'بيع بضاعة بالآجل للعميل أحمد فؤاد'
      },
      {
        date: '2026/01/22',
        debitAccName: 'حساب الصندوق / النقدية (Cash)',
        debitCategory: 'asset',
        creditAccName: 'حساب المبيعات (Sales)',
        creditCategory: 'revenue',
        amount: 40000,
        description: 'مبيعات نقدية فورية بالمعرض'
      },
      {
        date: '2026/01/25',
        debitAccName: 'حساب الموردين / الدائنون (Payables)',
        debitCategory: 'liability',
        creditAccName: 'حساب البنك (Bank)',
        creditCategory: 'asset',
        amount: 50000,
        description: 'سداد دفعة نقدية للموردين بشيك مصرفي'
      },
      {
        date: '2026/01/31',
        debitAccName: 'حساب مصروف إيجار مقدم (Prepaid Rent)',
        debitCategory: 'asset',
        creditAccName: 'حساب البنك (Bank)',
        creditCategory: 'asset',
        amount: 12000,
        description: 'قيد تسوية جردية (الوحدة 5): إثبات إيجار سنوي مدفوع مقدماً يخص العام القادم'
      },
      {
        date: '2026/01/31',
        debitAccName: 'حساب مصروف الرواتب والأجور (Salaries)',
        debitCategory: 'expense',
        creditAccName: 'حساب أجور ورواتب مستحقة (Accrued Salaries)',
        creditCategory: 'liability',
        amount: 6000,
        description: 'قيد تسوية جردية (الوحدة 5): إثبات رواتب مستحقة للعاملين لم تسدد بعد'
      }
    ]
  }
];

export interface TAccountSimulatorProps {
  initialSubTab?: 'pipeline' | 'subsidiary' | 'journal' | 't_accounts' | 'posting_challenge' | 'trial_balance' | 'adjusting_entries' | 'final_accounts' | 'guided_cases';
  initialPostingMode?: 'auto' | 'manual';
  initialHideCorrectPosting?: boolean;
}

export const TAccountSimulator: React.FC<TAccountSimulatorProps> = ({
  initialSubTab = 'pipeline',
  initialPostingMode = 'manual',
  initialHideCorrectPosting = true
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const seedTransaction = (location.state as any)?.seedTransaction;
  const [seedNotification, setSeedNotification] = useState<string | null>(null);

  // Simulator Sub-tab
  const [activeSubTab, setActiveSubTab] = useState<
    'pipeline' | 'subsidiary' | 'journal' | 't_accounts' | 'posting_challenge' | 'trial_balance' | 'adjusting_entries' | 'final_accounts' | 'guided_cases'
  >(initialSubTab);

  // Manual vs Auto Posting mode
  const [postingMode, setPostingMode] = useState<'auto' | 'manual'>(initialPostingMode);
  // Hide correct posting toggle to simulate errors
  const [hideCorrectPosting, setHideCorrectPosting] = useState<boolean>(initialHideCorrectPosting);

  // Accounts state
  const [accounts, setAccounts] = useState<TAccount[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [endingInventory, setEndingInventory] = useState<number>(25000);
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-1');

  // New Journal Entry Form State
  const [entryDate, setEntryDate] = useState<string>('2026/02/01');
  const [debitAccId, setDebitAccId] = useState<string>('');
  const [creditAccId, setCreditAccId] = useState<string>('');
  const [entryAmount, setEntryAmount] = useState<number | ''>('');
  const [entryDesc, setEntryDesc] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);

  // New Custom Account Form State
  const [newAccName, setNewAccName] = useState<string>('');
  const [newAccCategory, setNewAccCategory] = useState<'asset' | 'liability' | 'equity' | 'revenue' | 'expense'>('asset');

  // Simulated deliberate error (for error testing)
  const [deliberateError, setDeliberateError] = useState<{ active: boolean; type: string; difference: number }>({
    active: false,
    type: '',
    difference: 0
  });

  // Load a scenario
  const loadScenario = (scenario: GuidedScenario) => {
    setSelectedCaseId(scenario.id);
    setEndingInventory(scenario.endingInventory);
    setDeliberateError({ active: false, type: '', difference: 0 });

    // Build accounts map
    const accMap: { [name: string]: TAccount } = {};

    const helperGetCategoryNormal = (cat: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense') => {
      if (cat === 'asset' || cat === 'expense') return 'debit';
      return 'credit';
    };

    const builtJournal: JournalEntry[] = [];

    scenario.journalEntries.forEach((item, idx) => {
      // Ensure debit acc exists
      if (!accMap[item.debitAccName]) {
        accMap[item.debitAccName] = {
          id: `acc-${Object.keys(accMap).length + 1}`,
          name: item.debitAccName,
          code: `10${Object.keys(accMap).length + 1}`,
          category: item.debitCategory,
          normalBalance: helperGetCategoryNormal(item.debitCategory),
          entries: []
        };
      }

      // Ensure credit acc exists
      if (!accMap[item.creditAccName]) {
        accMap[item.creditAccName] = {
          id: `acc-${Object.keys(accMap).length + 1}`,
          name: item.creditAccName,
          code: `20${Object.keys(accMap).length + 1}`,
          category: item.creditCategory,
          normalBalance: helperGetCategoryNormal(item.creditCategory),
          entries: []
        };
      }

      const dAcc = accMap[item.debitAccName];
      const cAcc = accMap[item.creditAccName];

      const entryId = `j-${idx + 1}`;

      // Post to Debit side of debit account
      dAcc.entries.push({
        id: `e-d-${idx + 1}`,
        date: item.date,
        oppositeAccount: item.creditAccName,
        amount: item.amount,
        type: 'debit',
        note: item.description
      });

      // Post to Credit side of credit account
      cAcc.entries.push({
        id: `e-c-${idx + 1}`,
        date: item.date,
        oppositeAccount: item.debitAccName,
        amount: item.amount,
        type: 'credit',
        note: item.description
      });

      builtJournal.push({
        id: entryId,
        date: item.date,
        debitAccountId: dAcc.id,
        debitAccountName: dAcc.name,
        creditAccountId: cAcc.id,
        creditAccountName: cAcc.name,
        amount: item.amount,
        description: item.description
      });
    });

    const accountList = Object.values(accMap);
    setAccounts(accountList);
    setJournalEntries(builtJournal);

    if (accountList.length > 1) {
      setDebitAccId(accountList[0].id);
      setCreditAccId(accountList[1].id);
    }
  };

  // Initialize on mount
  React.useEffect(() => {
    loadScenario(PRESET_SCENARIOS[0]);
  }, []);

  // Handle transaction seeded from Documentary Cycle Simulator
  React.useEffect(() => {
    if (seedTransaction && accounts.length > 0) {
      let currentAccs = [...accounts];
      
      // Find or create debit account
      let dAcc = currentAccs.find(a => 
        a.name.toLowerCase().includes(seedTransaction.debitAccount.toLowerCase()) || 
        seedTransaction.debitAccount.toLowerCase().includes(a.name.toLowerCase())
      );
      if (!dAcc) {
        dAcc = {
          id: `acc-seed-d-${Date.now()}`,
          name: seedTransaction.debitAccount,
          code: `10${currentAccs.length + 1}`,
          category: 'asset',
          normalBalance: 'debit',
          entries: []
        };
        currentAccs.push(dAcc);
      }

      // Find or create credit account
      let cAcc = currentAccs.find(a => 
        a.name.toLowerCase().includes(seedTransaction.creditAccount.toLowerCase()) || 
        seedTransaction.creditAccount.toLowerCase().includes(a.name.toLowerCase())
      );
      if (!cAcc) {
        cAcc = {
          id: `acc-seed-c-${Date.now()}`,
          name: seedTransaction.creditAccount,
          code: `20${currentAccs.length + 1}`,
          category: 'liability',
          normalBalance: 'credit',
          entries: []
        };
        currentAccs.push(cAcc);
      }

      if (currentAccs.length > accounts.length) {
        setAccounts(currentAccs);
      }

      setDebitAccId(dAcc.id);
      setCreditAccId(cAcc.id);
      setEntryAmount(seedTransaction.amount || '');
      setEntryDate(seedTransaction.date || '2026/02/01');
      setEntryDesc(seedTransaction.description || '');
      setActiveSubTab('journal');
      setSeedNotification(
        `تم بنجاح نقل العملية من محاكي الدورة المستندية: "${seedTransaction.description}" بمبلغ ${seedTransaction.amount.toLocaleString()} ج.م. تمت تعبئة الحساب المدين (${seedTransaction.debitAccount}) والدائن (${seedTransaction.creditAccount}) تلقائياً. يمكنك مراجعة القيد وترحيله فوراً.`
      );
    }
  }, [seedTransaction, accounts.length]);

  // Post a new Journal Entry
  const handlePostJournalEntry = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!debitAccId || !creditAccId || !entryAmount || Number(entryAmount) <= 0) {
      setFormError('يرجى تحديد الحساب المدين والحساب الدائن ومبلغ صحيح أكبر من صفر.');
      return;
    }
    if (debitAccId === creditAccId) {
      setFormError('يجب اختيار حسابين مختلفين لطرفي القيد (المدين والدائن).');
      return;
    }

    const dAcc = accounts.find(a => a.id === debitAccId);
    const cAcc = accounts.find(a => a.id === creditAccId);
    if (!dAcc || !cAcc) return;

    const amount = Number(entryAmount);
    const dateStr = entryDate || '2026/02/01';
    const descStr = entryDesc || `قيد ترحيل بين ${dAcc.name} و ${cAcc.name}`;
    const newJId = `j-${Date.now()}`;

    // Add to journal
    const newJEntry: JournalEntry = {
      id: newJId,
      date: dateStr,
      debitAccountId: dAcc.id,
      debitAccountName: dAcc.name,
      creditAccountId: cAcc.id,
      creditAccountName: cAcc.name,
      amount,
      description: descStr
    };

    // Update Accounts with new postings
    setAccounts(prev => prev.map(acc => {
      if (acc.id === dAcc.id) {
        return {
          ...acc,
          entries: [
            ...acc.entries,
            {
              id: `e-d-${Date.now()}`,
              date: dateStr,
              oppositeAccount: cAcc.name,
              amount,
              type: 'debit',
              note: descStr
            }
          ]
        };
      }
      if (acc.id === cAcc.id) {
        return {
          ...acc,
          entries: [
            ...acc.entries,
            {
              id: `e-c-${Date.now()}`,
              date: dateStr,
              oppositeAccount: dAcc.name,
              amount,
              type: 'credit',
              note: descStr
            }
          ]
        };
      }
      return acc;
    }));

    setJournalEntries(prev => [newJEntry, ...prev]);
    setEntryAmount('');
    setEntryDesc('');
  };

  // Add a new custom T-Account
  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAccName.trim()) return;

    const helperGetCategoryNormal = (cat: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense') => {
      if (cat === 'asset' || cat === 'expense') return 'debit';
      return 'credit';
    };

    const newAcc: TAccount = {
      id: `acc-${Date.now()}`,
      name: newAccName.trim(),
      code: `30${accounts.length + 1}`,
      category: newAccCategory,
      normalBalance: helperGetCategoryNormal(newAccCategory),
      entries: []
    };

    setAccounts(prev => [...prev, newAcc]);
    setNewAccName('');
  };

  // Helper to post a custom transaction from subsidiary books or error correction
  const postCustomTransaction = (
    debitName: string,
    creditName: string,
    amount: number,
    desc: string,
    date: string
  ) => {
    let currentAccounts = [...accounts];
    
    // Find or create debit account
    let dAcc = currentAccounts.find(a => a.name.trim() === debitName.trim() || a.name.includes(debitName.split(' ')[0]));
    if (!dAcc) {
      const isAsset = debitName.includes('مقدم') || debitName.includes('مستحق') || debitName.includes('عملاء') || debitName.includes('مدين') || debitName.includes('سيارات') || debitName.includes('بنك') || debitName.includes('صندوق') || debitName.includes('أثاث') || debitName.includes('معلق');
      dAcc = {
        id: `acc-${Date.now()}-d`,
        name: debitName,
        code: `10${currentAccounts.length + 1}`,
        category: isAsset ? 'asset' : 'expense',
        normalBalance: 'debit',
        entries: []
      };
      currentAccounts.push(dAcc);
    }

    // Find or create credit account
    let cAcc = currentAccounts.find(a => a.name.trim() === creditName.trim() || a.name.includes(creditName.split(' ')[0]));
    if (!cAcc) {
      const isLiab = creditName.includes('مستحق') || creditName.includes('مقدماً') || creditName.includes('موردين') || creditName.includes('دائن') || creditName.includes('قرض');
      const isRev = creditName.includes('مبيعات') || creditName.includes('إيراد') || creditName.includes('خدمات');
      cAcc = {
        id: `acc-${Date.now()}-c`,
        name: creditName,
        code: `20${currentAccounts.length + 1}`,
        category: isLiab ? 'liability' : (isRev ? 'revenue' : 'equity'),
        normalBalance: 'credit',
        entries: []
      };
      currentAccounts.push(cAcc);
    }

    const newJId = `j-${Date.now()}`;
    const newJEntry: JournalEntry = {
      id: newJId,
      date,
      debitAccountId: dAcc.id,
      debitAccountName: dAcc.name,
      creditAccountId: cAcc.id,
      creditAccountName: cAcc.name,
      amount,
      description: desc
    };

    currentAccounts = currentAccounts.map(acc => {
      if (acc.id === dAcc!.id) {
        return {
          ...acc,
          entries: [
            ...acc.entries,
            {
              id: `e-d-${Date.now()}`,
              date,
              oppositeAccount: cAcc!.name,
              amount,
              type: 'debit',
              note: desc
            }
          ]
        };
      }
      if (acc.id === cAcc!.id) {
        return {
          ...acc,
          entries: [
            ...acc.entries,
            {
              id: `e-c-${Date.now()}`,
              date,
              oppositeAccount: dAcc!.name,
              amount,
              type: 'credit',
              note: desc
            }
          ]
        };
      }
      return acc;
    });

    setAccounts(currentAccounts);
    setJournalEntries(prev => [newJEntry, ...prev]);
  };

  // Helper for Unit 1: Explain the impact of a journal entry on the Accounting Equation
  const getEquationImpactDescription = (dAcc?: TAccount, cAcc?: TAccount, amt?: number | '') => {
    if (!dAcc || !cAcc || !amt || Number(amt) <= 0) return null;
    const numAmt = Number(amt);
    const dCat = dAcc.category;
    const cCat = cAcc.category;

    if (dCat === 'asset' && cCat === 'asset') {
      return {
        type: 'أصول فقط (تغيير نوعي في هيكل الأصول)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        text: `تغيير نوعي داخلي في الأصول: زيادة في الأصل (${dAcc.name}) بمبلغ ${numAmt.toLocaleString()} ج.م يقابلها نقص مماثل في الأصل (${cAcc.name}) بنفس القيمة. تظل قيمة إجمالي الأصول وطرفا معادلة الميزانية ثابتين دون أي تغيير.`
      };
    }
    if (dCat === 'asset' && cCat === 'liability') {
      return {
        type: 'زيادة متماثلة في طرفي المعادلة (+الأصول = +الالتزامات)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
        text: `زيادة في الأصول (${dAcc.name}) بمبلغ ${numAmt.toLocaleString()} ج.م يقابلها زيادة متطابقة في الالتزامات (${cAcc.name}) بنفس المبلغ. يزداد طرفا معادلة الميزانية معاً مع بقاء التوازن تاماً.`
      };
    }
    if (dCat === 'asset' && (cCat === 'equity' || cCat === 'revenue')) {
      return {
        type: 'زيادة متماثلة في طرفي المعادلة (+الأصول = +حقوق الملكية)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
        text: `زيادة في الأصول (${dAcc.name}) بمبلغ ${numAmt.toLocaleString()} ج.م يقابلها زيادة في حقوق الملكية (${cAcc.name}). يرتفع إجمالي طرفي المعادلة معاً بنفس القيمة.`
      };
    }
    if (dCat === 'liability' && cCat === 'asset') {
      return {
        type: 'نقص متماثل في طرفي المعادلة (-الالتزامات = -الأصول)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
        text: `سداد التزام: نقص في الالتزامات (${dAcc.name}) بمبلغ ${numAmt.toLocaleString()} ج.م يقابله نقص متماثل في الأصول (${cAcc.name}). ينخفض طرفا معادلة المركز المالي معاً بالتساوي.`
      };
    }
    if (dCat === 'expense' && cCat === 'asset') {
      return {
        type: 'نقص متماثل في طرفي المعادلة (-حقوق الملكية = -الأصول)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
        text: `سداد مصروف: المصروف (${dAcc.name}) يخفض صافي الربح وحقوق الملكية بمبلغ ${numAmt.toLocaleString()} ج.م، ويقابله نقص في الأصل النقدي (${cAcc.name}). ينخفض جانبا المعادلة بالتساوي.`
      };
    }
    if (dCat === 'equity' && cCat === 'asset') {
      return {
        type: 'نقص متماثل في طرفي المعادلة (-حقوق الملكية = -الأصول)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
        text: `مسحوبات شخصية للمالك: تخفض حقوق الملكية بمبلغ ${numAmt.toLocaleString()} ج.م، ويقابلها خروج أصل نقدي أو عيني (${cAcc.name}).`
      };
    }
    return {
      type: 'تأثير مركب متوازن',
      badgeColor: 'bg-stone-100 text-stone-900 border-stone-300',
      text: `أثر قيد محاسبي بين (${dAcc.name}) و(${cAcc.name}) بمبلغ ${numAmt.toLocaleString()} ج.م مع الحفاظ التام على توازن معادلة المركز المالي.`
    };
  };

  // Handler for Unit 5: End-of-period Adjusting Entries
  const handleApplyQuickAdjustment = (type: 'prepaid_rent' | 'accrued_salaries' | 'accrued_revenue' | 'unearned_revenue') => {
    if (type === 'prepaid_rent') {
      postCustomTransaction(
        'حساب مصروف إيجار مقدم (Prepaid Rent)',
        'حساب مصروف إيجار المعرض (Rent)',
        3000,
        'قيد تسوية جردية (الوحدة 5): استبعاد إيجار مدفوع مقدماً يخص الفترة القادمة وتثبيته كأصل متداول (أرصدة مدينة أخرى)',
        '2026/01/31'
      );
    } else if (type === 'accrued_salaries') {
      postCustomTransaction(
        'حساب مصروف الرواتب والأجور (Salaries)',
        'حساب أجور ورواتب مستحقة (Accrued Salaries)',
        2500,
        'قيد تسوية جردية (الوحدة 5): إثبات أجور مستحقة للعاملين لم تسدد حتى نهاية السنة كالتزام متداول (أرصدة دائنة أخرى)',
        '2026/01/31'
      );
    } else if (type === 'accrued_revenue') {
      postCustomTransaction(
        'حساب إيرادات خدمات مستحقة (Accrued Revenue)',
        'حساب إيرادات الاستشارات والخدمات (Services Revenue)',
        4000,
        'قيد تسوية جردية (الوحدة 5): إثبات إيرادات خدمات مكتسبة لم تُحصّل بعد وتثبيتها كأصل متداول',
        '2026/01/31'
      );
    } else if (type === 'unearned_revenue') {
      postCustomTransaction(
        'حساب إيرادات الاستشارات والخدمات (Services Revenue)',
        'حساب إيرادات خدمات محصلة مقدماً (Unearned Revenue)',
        2000,
        'قيد تسوية جردية (الوحدة 5): تأجيل إيراد خدمات محصل مقدماً يخص السنة القادمة وتثبيته كالتزام متداول',
        '2026/01/31'
      );
    }
  };

  // Handler for transferring periodic totals from Unit 3 subsidiary books to general journal
  const handleTransferFromSubsidiary = (entry: {
    description: string;
    debitAccount: string;
    creditAccount: string;
    amount: number;
    date: string;
  }) => {
    postCustomTransaction(
      entry.debitAccount,
      entry.creditAccount,
      entry.amount,
      entry.description,
      entry.date
    );
  };

  // Handler for applying correcting entry from Unit 4 error challenge
  const handleApplyCorrectingEntry = (entry: {
    debitAccount: string;
    creditAccount: string;
    amount: number;
    description: string;
    date: string;
  }) => {
    postCustomTransaction(
      entry.debitAccount,
      entry.creditAccount,
      entry.amount,
      entry.description,
      entry.date
    );
    // Reset any deliberate error so trial balance re-balances immediately
    setDeliberateError({ active: false, type: '', difference: 0 });
  };

  // Delete a single entry from T-Account
  const handleDeleteTEntry = (accId: string, entryId: string) => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id !== accId) return acc;
      return {
        ...acc,
        entries: acc.entries.filter(e => e.id !== entryId)
      };
    }));
  };

  // Compute Account Totals & Balance
  const calculateAccountSummary = (acc: TAccount) => {
    const totalDebit = acc.entries
      .filter(e => e.type === 'debit')
      .reduce((sum, e) => sum + e.amount, 0);

    const totalCredit = acc.entries
      .filter(e => e.type === 'credit')
      .reduce((sum, e) => sum + e.amount, 0);

    const higherTotal = Math.max(totalDebit, totalCredit);
    const diff = totalDebit - totalCredit;

    let balanceType: 'debit' | 'credit' | 'zero' = 'zero';
    let balanceAmount = 0;

    if (diff > 0) {
      balanceType = 'debit';
      balanceAmount = diff;
    } else if (diff < 0) {
      balanceType = 'credit';
      balanceAmount = Math.abs(diff);
    }

    return {
      totalDebit,
      totalCredit,
      higherTotal,
      diff,
      balanceType,
      balanceAmount
    };
  };

  // Trial Balance Calculations
  const trialBalanceRows = accounts.map(acc => {
    const summary = calculateAccountSummary(acc);
    return {
      account: acc,
      totalDebit: summary.totalDebit,
      totalCredit: summary.totalCredit,
      debitBalance: summary.balanceType === 'debit' ? summary.balanceAmount : 0,
      creditBalance: summary.balanceType === 'credit' ? summary.balanceAmount : 0
    };
  });

  const rawTotalDebitBalances = trialBalanceRows.reduce((sum, r) => sum + r.debitBalance, 0);
  const rawTotalCreditBalances = trialBalanceRows.reduce((sum, r) => sum + r.creditBalance, 0);

  // Apply deliberate error if active
  const totalDebitBalances = rawTotalDebitBalances + (deliberateError.active && deliberateError.type === 'debit_over' ? deliberateError.difference : 0);
  const totalCreditBalances = rawTotalCreditBalances + (deliberateError.active && deliberateError.type === 'credit_over' ? deliberateError.difference : 0);

  const trialBalanceDiff = totalDebitBalances - totalCreditBalances;
  const isTrialBalanced = Math.abs(trialBalanceDiff) === 0;

  // Final Accounts Calculations
  const salesAccount = accounts.find(a => a.name.includes('المبيعات') || a.category === 'revenue');
  const salesTotal = salesAccount ? calculateAccountSummary(salesAccount).balanceAmount : 0;

  const purchasesAccount = accounts.find(a => a.name.includes('المشتريات'));
  const purchasesTotal = purchasesAccount ? calculateAccountSummary(purchasesAccount).balanceAmount : 0;

  const begInvAccount = accounts.find(a => a.name.includes('مخزون أول'));
  const begInvTotal = begInvAccount ? calculateAccountSummary(begInvAccount).balanceAmount : 0;

  const cogs = begInvTotal + purchasesTotal - endingInventory;
  const grossProfit = salesTotal - cogs;

  const operatingExpenseAccounts = accounts.filter(a => a.category === 'expense' && !a.name.includes('المشتريات'));
  const totalOperatingExpenses = operatingExpenseAccounts.reduce((sum, a) => sum + calculateAccountSummary(a).balanceAmount, 0);

  const netProfit = grossProfit - totalOperatingExpenses;

  // Balance Sheet Items
  const assetAccounts = accounts.filter(a => a.category === 'asset');
  const totalNonInventoryAssets = assetAccounts.reduce((sum, a) => {
    const s = calculateAccountSummary(a);
    return sum + (s.balanceType === 'debit' ? s.balanceAmount : -s.balanceAmount);
  }, 0);
  const totalAssets = totalNonInventoryAssets + endingInventory;

  const liabilityAccounts = accounts.filter(a => a.category === 'liability');
  const totalLiabilities = liabilityAccounts.reduce((sum, a) => {
    const s = calculateAccountSummary(a);
    return sum + (s.balanceType === 'credit' ? s.balanceAmount : -s.balanceAmount);
  }, 0);

  const capitalAccount = accounts.find(a => a.name.includes('رأس المال'));
  const capitalTotal = capitalAccount ? calculateAccountSummary(capitalAccount).balanceAmount : 0;

  const drawingsAccount = accounts.find(a => a.name.includes('المسحوبات'));
  const drawingsTotal = drawingsAccount ? calculateAccountSummary(drawingsAccount).balanceAmount : 0;

  const totalEquity = capitalTotal + netProfit - drawingsTotal;
  const totalLiabilitiesAndEquity = totalLiabilities + totalEquity;

  const isBalanceSheetBalanced = Math.abs(totalAssets - totalLiabilitiesAndEquity) === 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-[#1D1D1B] text-[#F9F7F2] rounded-none p-6 sm:p-8 shadow-xs border border-[#1D1D1B] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#C4A484] text-[#1D1D1B] font-bold text-xs px-3 py-0.5 uppercase tracking-wider font-serif">
              مختبر المحاسبة التفاعلي المتكامل v2.0
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 font-serif">
            محاكي الحسابات T v2 (اليومية ← دفتر الأستاذ T ← ميزان المراجعة ← القوائم الختامية)
          </h2>
          <p className="text-xs sm:text-sm text-[#F9F7F2]/80 mt-1 font-serif max-w-3xl leading-relaxed">
            منظومة تدريبية تفاعلية تحاكي خطوات الدورة المحاسبية بالتسلسل المنطقي: تسجيل قيود اليومية بنظرية القيد المزدوج، ترحيلها تلقائياً لحسابات الأستاذ حرف (T)، ترصيد الحسابات وإعداد ميزان المراجعة، ثم توليد الحسابات والقوائم الختامية!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
          <button
            onClick={() => loadScenario(PRESET_SCENARIOS.find(s => s.id === selectedCaseId) || PRESET_SCENARIOS[0])}
            className="px-4 py-2.5 bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 text-[#F9F7F2] text-xs font-bold transition flex items-center justify-center gap-2 border border-[#F9F7F2]/20 font-serif"
          >
            <RefreshCw className="w-4 h-4 text-[#C4A484]" />
            <span>إعادة ضبط الحالة</span>
          </button>
        </div>
      </div>

      {/* Control Strip: Manual Posting, Error Simulation & Hide Correct Posting (الوحدتان 3 و 4) */}
      <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-3 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-3 font-serif">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Manual Posting Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#1D1D1B]">خيار الترحيل:</span>
            <div className="inline-flex border border-[#1D1D1B]/30 bg-[#F9F7F2] p-0.5">
              <button
                type="button"
                onClick={() => {
                  setPostingMode('auto');
                  setHideCorrectPosting(false);
                }}
                className={`px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                  postingMode === 'auto'
                    ? 'bg-[#1D1D1B] text-[#F9F7F2]'
                    : 'text-[#1D1D1B] hover:bg-[#FFFFFF]'
                }`}
              >
                الترحيل التلقائي (الآلي)
              </button>
              <button
                type="button"
                onClick={() => {
                  setPostingMode('manual');
                  setActiveSubTab('posting_challenge');
                }}
                className={`px-3 py-1.5 text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  postingMode === 'manual'
                    ? 'bg-[#C4A484] text-[#1D1D1B] font-extrabold shadow-xs'
                    : 'text-[#1D1D1B] hover:bg-[#FFFFFF]'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>الترحيل اليدوي (تحدي الطالب)</span>
              </button>
            </div>
          </div>

          {/* Hide Correct Posting Toggle */}
          <button
            type="button"
            onClick={() => {
              setHideCorrectPosting(!hideCorrectPosting);
              if (activeSubTab !== 'posting_challenge') {
                setActiveSubTab('posting_challenge');
              }
            }}
            className={`px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 border cursor-pointer ${
              hideCorrectPosting
                ? 'bg-rose-900 text-[#FFFFFF] border-rose-950 shadow-xs'
                : 'bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/30 hover:bg-[#F0EEE6]'
            }`}
          >
            {hideCorrectPosting ? <EyeOff className="w-3.5 h-3.5 text-rose-300" /> : <Eye className="w-3.5 h-3.5 text-[#1D1D1B]" />}
            <span>{hideCorrectPosting ? 'الترحيل الصحيح مخفي (وضع المحاكاة نشط)' : 'إخفاء الترحيل الصحيح'}</span>
          </button>
        </div>

        {/* Dedicated Error Simulation Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveSubTab('posting_challenge');
              setPostingMode('manual');
              setHideCorrectPosting(true);
            }}
            className="px-4 py-2 bg-gradient-to-r from-rose-800 to-amber-700 hover:from-rose-900 hover:to-amber-800 text-white text-xs font-bold transition flex items-center gap-2 shadow-sm border border-rose-950 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-amber-300" />
            <span>محاكاة أخطاء الترحيل واكتشاف الفروق (الوحدة 4)</span>
            <span className="bg-amber-400 text-rose-950 text-[10px] font-extrabold px-1.5 py-0.5">
              الكتاب الرسمي
            </span>
          </button>
        </div>
      </div>

      {/* Simulator Navigation Sub-Tabs - Reordered in Sequential Accounting Cycle Order */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#1D1D1B]/15 scrollbar-none font-serif">
        <button
          onClick={() => setActiveSubTab('pipeline')}
          className={`px-4 py-2 text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border cursor-pointer ${
            activeSubTab === 'pipeline'
              ? 'bg-[#1D1D1B] text-[#C4A484] border-[#1D1D1B] shadow-xs'
              : 'bg-[#F9F7F2] text-[#1D1D1B] border-[#1D1D1B]/20 hover:bg-[#F0EEE6]'
          }`}
        >
          <Workflow className="w-4 h-4 text-[#C4A484]" />
          <span>خط أنابيب الدورة المتكاملة (1 - 7 Pipeline)</span>
          <span className="bg-[#C4A484] text-[#1D1D1B] text-[9px] font-black px-1.5 py-0.5">شامل</span>
        </button>

        <button
          onClick={() => setActiveSubTab('subsidiary')}
          className={`px-4 py-2 text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border cursor-pointer ${
            activeSubTab === 'subsidiary'
              ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B] shadow-xs'
              : 'bg-[#FFFFFF] text-[#1D1D1B] border-[#1D1D1B]/15 hover:bg-[#F9F7F2]'
          }`}
        >
          <BookMarked className="w-4 h-4 text-[#C4A484]" />
          <span>1. الدفاتر المساعدة (الوحدة 3)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('journal')}
          className={`px-4 py-2 text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border cursor-pointer ${
            activeSubTab === 'journal'
              ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B] shadow-xs'
              : 'bg-[#FFFFFF] text-[#1D1D1B] border-[#1D1D1B]/15 hover:bg-[#F9F7F2]'
          }`}
        >
          <PenTool className="w-4 h-4 text-[#C4A484]" />
          <span>2. اليومية العامة والمركزية ({journalEntries.length} قيد)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('t_accounts')}
          className={`px-4 py-2 text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border cursor-pointer ${
            activeSubTab === 't_accounts'
              ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B] shadow-xs'
              : 'bg-[#FFFFFF] text-[#1D1D1B] border-[#1D1D1B]/15 hover:bg-[#F9F7F2]'
          }`}
        >
          <Scale className="w-4 h-4 text-[#C4A484]" />
          <span>3. دفتر الأستاذ وحسابات T ({accounts.length} حساب)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('posting_challenge')}
          className={`px-4 py-2 text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border cursor-pointer ${
            activeSubTab === 'posting_challenge'
              ? 'bg-rose-900 text-[#FFFFFF] border-rose-950 shadow-xs'
              : 'bg-[#FFFFFF] text-rose-950 border-rose-200 hover:bg-rose-50'
          }`}
        >
          <EyeOff className="w-4 h-4 text-[#C4A484]" />
          <span>4. الترحيل اليدوي ومحاكي أخطاء الوحدة 4</span>
        </button>

        <button
          onClick={() => setActiveSubTab('trial_balance')}
          className={`px-4 py-2 text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border cursor-pointer ${
            activeSubTab === 'trial_balance'
              ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B] shadow-xs'
              : 'bg-[#FFFFFF] text-[#1D1D1B] border-[#1D1D1B]/15 hover:bg-[#F9F7F2]'
          }`}
        >
          <Calculator className="w-4 h-4 text-[#C4A484]" />
          <span>5. ميزان المراجعة وكاشف الأخطاء</span>
        </button>

        <button
          onClick={() => setActiveSubTab('adjusting_entries')}
          className={`px-4 py-2 text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border cursor-pointer ${
            activeSubTab === 'adjusting_entries'
              ? 'bg-[#8A1F1D] text-[#FFFFFF] border-[#8A1F1D] shadow-xs'
              : 'bg-[#FFFFFF] text-[#8A1F1D] border-[#8A1F1D]/30 hover:bg-rose-50'
          }`}
        >
          <Layers className="w-4 h-4 text-[#C4A484]" />
          <span>6. التسويات الجردية الذكية وكاشف الأثر المالي (الوحدة 5)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('final_accounts')}
          className={`px-4 py-2 text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border cursor-pointer ${
            activeSubTab === 'final_accounts'
              ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B] shadow-xs'
              : 'bg-[#FFFFFF] text-[#1D1D1B] border-[#1D1D1B]/15 hover:bg-[#F9F7F2]'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-[#C4A484]" />
          <span>7. الحسابات الختامية والميزانية العمومية المفصلة</span>
        </button>

        <button
          onClick={() => setActiveSubTab('guided_cases')}
          className={`px-4 py-2 text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border cursor-pointer ${
            activeSubTab === 'guided_cases'
              ? 'bg-[#1D1D1B] text-[#F9F7F2] border-[#1D1D1B] shadow-xs'
              : 'bg-[#FFFFFF] text-[#1D1D1B] border-[#1D1D1B]/15 hover:bg-[#F9F7F2]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#C4A484]" />
          <span>8. حالات تدريبية جاهزة ({PRESET_SCENARIOS.length})</span>
        </button>
      </div>

      {/* Trial Balance Quick Status Banner */}
      <div className={`p-4 rounded-none border flex flex-wrap items-center justify-between gap-4 transition font-serif ${
        isTrialBalanced 
          ? 'bg-[#FFFFFF] border-[#1D1D1B]/20 text-[#1D1D1B]' 
          : 'bg-[#FDF3F2] border-rose-800 text-[#8A1F1D]'
      }`}>
        <div className="flex items-center gap-3">
          {isTrialBalanced ? (
            <div className="w-9 h-9 bg-[#1D1D1B] text-[#C4A484] flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          ) : (
            <div className="w-9 h-9 bg-rose-800 text-[#FFFFFF] flex items-center justify-center font-bold">
              <AlertTriangle className="w-5 h-5" />
            </div>
          )}
          <div>
            <div className="font-extrabold text-sm sm:text-base">
              {isTrialBalanced 
                ? 'حالة النظام: ميزان المراجعة متوازن تماماً (القيد المزدوج محقق 100%)' 
                : `تنبيه اختلال التوازن: يوجد فرق قدره ${Math.abs(trialBalanceDiff).toLocaleString()} ج (يتطلب حساب معلق)`}
            </div>
            <div className="text-xs text-[#1D1D1B]/70 font-sans">
              إجمالي الأرصدة المدينة: <strong className="font-mono text-[#1D1D1B]">{totalDebitBalances.toLocaleString()} ج</strong> • إجمالي الأرصدة الدائنة: <strong className="font-mono text-[#1D1D1B]">{totalCreditBalances.toLocaleString()} ج</strong>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeSubTab !== 'journal' && (
            <button
              onClick={() => setActiveSubTab('journal')}
              className="px-3 py-1.5 bg-[#1D1D1B] hover:bg-[#333330] text-[#F9F7F2] text-xs font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <PenTool className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>دفتر اليومية (القيود)</span>
            </button>
          )}
          {activeSubTab !== 't_accounts' && (
            <button
              onClick={() => setActiveSubTab('t_accounts')}
              className="px-3 py-1.5 bg-[#F9F7F2] hover:bg-[#FFFFFF] text-[#1D1D1B] border border-[#1D1D1B]/20 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>دفتر الأستاذ (T)</span>
            </button>
          )}
          {activeSubTab !== 'trial_balance' && (
            <button
              onClick={() => setActiveSubTab('trial_balance')}
              className="px-3 py-1.5 bg-[#F9F7F2] hover:bg-[#FFFFFF] text-[#1D1D1B] border border-[#1D1D1B]/20 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>ميزان المراجعة</span>
            </button>
          )}
          {activeSubTab !== 'final_accounts' && (
            <button
              onClick={() => setActiveSubTab('final_accounts')}
              className="px-3 py-1.5 bg-[#F9F7F2] hover:bg-[#FFFFFF] text-[#1D1D1B] border border-[#1D1D1B]/20 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#C4A484]" />
              <span>القوائم الختامية</span>
            </button>
          )}
        </div>
      </div>

      {/* Unit 1 Accounting Equation Live Interactive Bar */}
      <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-4 sm:p-5 shadow-xs font-serif space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#1D1D1B]/15 pb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#1D1D1B] text-[#C4A484] text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider">
              الوحدة الأولى
            </span>
            <h4 className="font-extrabold text-sm sm:text-base text-[#1D1D1B] flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#C4A484]" />
              <span>معادلة الميزانية العمومية والمركز المالي (الأصول = الالتزامات + حقوق الملكية)</span>
            </h4>
          </div>
          <span className="text-xs font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 border border-emerald-300">
            قاعدة التوازن الأساسية
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-[#F4F8F4] border border-emerald-800/30 p-3.5 text-center flex flex-col justify-between">
            <span className="text-xs text-[#1B4D2E] font-bold block">1. إجمالي الأصول (Assets)</span>
            <span className="text-xl font-mono font-extrabold text-[#1B4D2E] block my-1">
              {totalAssets.toLocaleString()} ج.م
            </span>
            <span className="text-[10px] text-[#1D1D1B]/60 font-sans">
              {assetAccounts.length} حسابات أصول + {endingInventory > 0 ? `مخزون آخر المدة (${endingInventory.toLocaleString()})` : 'مخزون آخر المدة (0)'}
            </span>
          </div>

          <div className="bg-[#FDF3F2] border border-rose-800/30 p-3.5 text-center flex flex-col justify-between">
            <span className="text-xs text-[#8A1F1D] font-bold block">2. إجمالي الالتزامات (Liabilities)</span>
            <span className="text-xl font-mono font-extrabold text-[#8A1F1D] block my-1">
              {totalLiabilities.toLocaleString()} ج.م
            </span>
            <span className="text-[10px] text-[#1D1D1B]/60 font-sans">
              {liabilityAccounts.length} حسابات ديون وموردين ومستحقات
            </span>
          </div>

          <div className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-3.5 text-center flex flex-col justify-between">
            <span className="text-xs text-[#1D1D1B] font-bold block">3. حقوق الملكية (Owner's Equity)</span>
            <span className="text-xl font-mono font-extrabold text-[#1D1D1B] block my-1">
              {totalEquity.toLocaleString()} ج.م
            </span>
            <span className="text-[10px] text-[#1D1D1B]/60 font-sans">
              رأس المال ({capitalTotal.toLocaleString()}) {netProfit >= 0 ? `+ ربح (${netProfit.toLocaleString()})` : `- خسارة (${Math.abs(netProfit).toLocaleString()})`} {drawingsTotal > 0 ? `- مسحوبات (${drawingsTotal.toLocaleString()})` : ''}
            </span>
          </div>
        </div>

        <div className="pt-2.5 border-t border-[#1D1D1B]/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#1D1D1B]/75 text-xs">
              مجموع طرف المعادلة الأيسر (الالتزامات + حقوق الملكية):
            </span>
            <strong className="font-mono text-[#1D1D1B] text-sm">{totalLiabilitiesAndEquity.toLocaleString()} ج.م</strong>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 ${isBalanceSheetBalanced ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'}`}>
            {isBalanceSheetBalanced 
              ? '✓ طرفا معادلة المركز المالي متطابقان تماماً (قاعدة التوازن متحققة)' 
              : `تنبيه: فرق في معادلة المركز المالي بمقدار ${Math.abs(totalAssets - totalLiabilitiesAndEquity).toLocaleString()} ج.م`}
          </span>
        </div>
      </div>

      {/* Documentary Cycle Bridge Notification Banner */}
      {seedNotification && (
        <div className="bg-[#1B4D2E]/10 border-2 border-[#1B4D2E] p-4 flex items-start justify-between gap-3 text-xs sm:text-sm font-serif">
          <div className="flex items-start gap-2.5">
            <FileText className="w-5 h-5 text-[#1B4D2E] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#1B4D2E]">تم الربط مع محاكي الدورة المستندية ومصادر القيد:</div>
              <div className="text-[#1D1D1B] mt-0.5 leading-relaxed">{seedNotification}</div>
            </div>
          </div>
          <button
            onClick={() => setSeedNotification(null)}
            className="text-[#1B4D2E] hover:text-[#1D1D1B] p-1 cursor-pointer"
            title="إغلاق التنبيه"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* SUB-TAB 0: خط أنابيب الدورة المحاسبية المتكاملة الشاملة (1 - 7) */}
      {activeSubTab === 'pipeline' && (
        <div className="space-y-6">
          <AccountingCyclePipeline
            accounts={accounts}
            journalEntries={journalEntries}
            trialBalanceRows={trialBalanceRows}
            totalDebitBalances={totalDebitBalances}
            totalCreditBalances={totalCreditBalances}
            isTrialBalanced={isTrialBalanced}
            trialBalanceDiff={trialBalanceDiff}
            endingInventory={endingInventory}
            onSetEndingInventory={setEndingInventory}
            onApplyAdjustment={handleApplyQuickAdjustment}
            onPostTransactionToLedger={(entry) => {
              postCustomTransaction(
                entry.debitAccount,
                entry.creditAccount,
                entry.amount,
                entry.description,
                entry.date
              );
            }}
            onNavigateToJRE={() => navigate('/training/jre')}
          />
        </div>
      )}

      {/* SUB-TAB 1: الدفاتر المساعدة (الوحدة الثالثة) */}
      {activeSubTab === 'subsidiary' && (
        <div className="space-y-6">
          <SubsidiaryBooksView 
            onTransferToGeneralJournal={(entry) => {
              handleTransferFromSubsidiary(entry);
              setActiveSubTab('journal');
            }}
          />

          {/* Sequential Progression Controls: Subsidiary -> Journal */}
          <div className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-4 flex flex-wrap items-center justify-between gap-4 font-serif">
            <div className="text-right">
              <span className="text-xs font-bold text-[#1D1D1B] block">
                الخطوة التالية في الدورة المحاسبية: دفتر اليومية العامة
              </span>
              <span className="text-[11px] text-[#1D1D1B]/70">
                بعد تسجيل وتلخيص اليوميات المساعدة، يتم إثبات القيود المركزية الشهرية في دفتر اليومية العامة وترحيلها لدفتر الأستاذ العام.
              </span>
            </div>
            <button
              onClick={() => setActiveSubTab('journal')}
              className="px-4 py-2.5 bg-[#1D1D1B] hover:bg-[#333330] text-[#F9F7F2] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>الانتقال إلى 2. اليومية العامة والمركزية</span>
              <ArrowLeft className="w-4 h-4 text-[#C4A484]" />
            </button>
          </div>
        </div>
      )}

      {/* 2. دفتر اليومية العامة وتسجيل وترحيل القيود (General Journal) */}
      {activeSubTab === 'journal' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Post New Journal Entry Form */}
            <div className="bg-[#FFFFFF] border border-[#1D1D1B]/15 p-5 shadow-xs space-y-4 font-serif">
              <div className="border-b border-[#1D1D1B]/10 pb-3">
                <h3 className="font-extrabold text-base text-[#1D1D1B] flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-[#C4A484]" />
                  <span>تسجيل وترحيل قيد يومية جديد</span>
                </h3>
                <p className="text-xs text-[#1D1D1B]/60 mt-0.5">
                  الخطوة الأولى في الدورة المحاسبية: إثبات العملية بنظرية القيد المزدوج، وتحديد الطرف المدين والطرف الدائن مع الترحيل اللحظي لدفتر الأستاذ.
                </p>
              </div>

              <form onSubmit={handlePostJournalEntry} className="space-y-3 text-xs">
                {formError && (
                  <div className="p-2.5 bg-rose-50 border border-rose-300 text-rose-800 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{formError}</span>
                  </div>
                )}
                <div>
                  <label className="block font-bold text-[#1D1D1B] mb-1">تاريخ العملية:</label>
                  <input
                    type="text"
                    value={entryDate}
                    onChange={e => setEntryDate(e.target.value)}
                    placeholder="2026/02/01"
                    className="w-full p-2 bg-[#F9F7F2] border border-[#1D1D1B]/20 font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1B4D2E] mb-1">الطرف المدين (من حـ/):</label>
                  <select
                    value={debitAccId}
                    onChange={e => setDebitAccId(e.target.value)}
                    className="w-full p-2.5 bg-[#F4F8F4] border border-emerald-800/30 text-xs font-bold text-[#1B4D2E]"
                    required
                  >
                    <option value="">-- اختر الحساب المدين --</option>
                    {accounts.map(a => (
                      <option key={a.id} value={a.id}>{a.name} ({a.category})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#8A1F1D] mb-1">الطرف الدائن (إلى حـ/):</label>
                  <select
                    value={creditAccId}
                    onChange={e => setCreditAccId(e.target.value)}
                    className="w-full p-2.5 bg-[#FDF3F2] border border-rose-800/30 text-xs font-bold text-[#8A1F1D]"
                    required
                  >
                    <option value="">-- اختر الحساب الدائن --</option>
                    {accounts.map(a => (
                      <option key={a.id} value={a.id}>{a.name} ({a.category})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#1D1D1B] mb-1">مبلغ العملية (جنيه):</label>
                  <input
                    type="number"
                    value={entryAmount}
                    onChange={e => setEntryAmount(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="مثال: 25000"
                    className="w-full p-2.5 bg-[#F9F7F2] border border-[#1D1D1B]/20 font-mono text-sm font-bold text-[#1D1D1B]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#1D1D1B] mb-1">البيان / شرح القيد:</label>
                  <input
                    type="text"
                    value={entryDesc}
                    onChange={e => setEntryDesc(e.target.value)}
                    placeholder="مثال: شراء بضاعة نقداً / سداد مصروفات"
                    className="w-full p-2.5 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-xs font-serif"
                  />
                </div>

                {/* Unit 1 Accounting Equation Live Impact Analyzer */}
                {debitAccId && creditAccId && entryAmount !== '' && Number(entryAmount) > 0 && (() => {
                  const impact = getEquationImpactDescription(
                    accounts.find(a => a.id === debitAccId),
                    accounts.find(a => a.id === creditAccId),
                    entryAmount
                  );
                  if (!impact) return null;
                  return (
                    <div className="p-3 bg-[#F9F7F2] border border-[#1D1D1B]/25 space-y-1 text-xs">
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <span className="font-extrabold text-[#1D1D1B] flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5 text-[#C4A484]" />
                          <span>أثر القيد على معادلة الميزانية (الوحدة 1):</span>
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 border ${impact.badgeColor}`}>
                          {impact.type}
                        </span>
                      </div>
                      <p className="text-[#1D1D1B]/80 text-[11px] leading-relaxed pt-1">
                        {impact.text}
                      </p>
                    </div>
                  );
                })()}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1D1D1B] hover:bg-[#333330] text-[#F9F7F2] font-bold text-xs transition flex items-center justify-center gap-2 border border-[#1D1D1B] shadow-xs cursor-pointer"
                >
                  <ArrowDownLeft className="w-4 h-4 text-[#C4A484]" />
                  <span>ترحيل القيد فورياً إلى حسابات الأستاذ T</span>
                </button>
              </form>

              {/* Unit 5 End-of-Period Adjusting Entries Box */}
              <div className="pt-3 border-t border-[#1D1D1B]/15 space-y-3 font-serif">
                <div className="flex items-center justify-between border-b border-[#1D1D1B]/10 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#1D1D1B] text-[#C4A484] text-[10px] font-bold px-2 py-0.5">
                      الوحدة الخامسة
                    </span>
                    <h4 className="font-extrabold text-xs text-[#1D1D1B]">
                      لوحة قيود التسويات الجردية الأربعة (أساس الاستحقاق)
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-[#1D1D1B]/60">31 ديسمبر</span>
                </div>
                <p className="text-[11px] text-[#1D1D1B]/70 leading-relaxed">
                  انقر لتطبيق أي من قيود التسويات المعتمدة في نهاية الفترة المالية، وترحيلها تلقائياً للأستاذ وملاحظة أثرها على قائمة المركز المالي والأرباح:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleApplyQuickAdjustment('prepaid_rent')}
                    className="p-2 text-right bg-[#F9F7F2] hover:bg-[#F0EEE6] border border-[#1D1D1B]/15 text-xs font-bold transition flex flex-col gap-0.5 cursor-pointer"
                  >
                    <span className="text-[#1B4D2E] flex items-center justify-between">
                      <span>1. مصروف مدفوع مقدماً</span>
                      <Plus className="w-3 h-3 text-[#1B4D2E]" />
                    </span>
                    <span className="text-[10px] text-[#1D1D1B]/60 font-normal">إيجار مقدم: 3,000 ج.م (أصل متداول)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyQuickAdjustment('accrued_salaries')}
                    className="p-2 text-right bg-[#F9F7F2] hover:bg-[#F0EEE6] border border-[#1D1D1B]/15 text-xs font-bold transition flex flex-col gap-0.5 cursor-pointer"
                  >
                    <span className="text-[#8A1F1D] flex items-center justify-between">
                      <span>2. مصروف مستحق الدفع</span>
                      <Plus className="w-3 h-3 text-[#8A1F1D]" />
                    </span>
                    <span className="text-[10px] text-[#1D1D1B]/60 font-normal">أجور مستحقة: 2,500 ج.م (التزام متداول)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyQuickAdjustment('accrued_revenue')}
                    className="p-2 text-right bg-[#F9F7F2] hover:bg-[#F0EEE6] border border-[#1D1D1B]/15 text-xs font-bold transition flex flex-col gap-0.5 cursor-pointer"
                  >
                    <span className="text-[#1B4D2E] flex items-center justify-between">
                      <span>3. إيراد مستحق القبض</span>
                      <Plus className="w-3 h-3 text-[#1B4D2E]" />
                    </span>
                    <span className="text-[10px] text-[#1D1D1B]/60 font-normal">خدمات مستحقة: 4,000 ج.م (أصل متداول)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyQuickAdjustment('unearned_revenue')}
                    className="p-2 text-right bg-[#F9F7F2] hover:bg-[#F0EEE6] border border-[#1D1D1B]/15 text-xs font-bold transition flex flex-col gap-0.5 cursor-pointer"
                  >
                    <span className="text-[#8A1F1D] flex items-center justify-between">
                      <span>4. إيراد محصل مقدماً</span>
                      <Plus className="w-3 h-3 text-[#8A1F1D]" />
                    </span>
                    <span className="text-[10px] text-[#1D1D1B]/60 font-normal">إيراد غير مكتسب: 2,000 ج.م (التزام)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* General Journal Ledger Table */}
            <div className="lg:col-span-2 bg-[#FFFFFF] border border-[#1D1D1B]/15 p-5 shadow-xs space-y-4 font-serif">
              <div className="flex items-center justify-between border-b border-[#1D1D1B]/10 pb-3">
                <div>
                  <h3 className="font-extrabold text-base text-[#1D1D1B]">
                    دفتر اليومية العامة (General Journal)
                  </h3>
                  <p className="text-xs text-[#1D1D1B]/60">سجل العمليات المالية التاريخية المقيدة بنظرية القيد المزدوج</p>
                </div>
                <span className="text-xs font-mono font-bold bg-[#F9F7F2] border border-[#1D1D1B]/15 px-2.5 py-1">
                  {journalEntries.length} قيداً مسجلاً
                </span>
              </div>

              <div className="overflow-x-auto max-h-[480px] border border-[#1D1D1B]/20">
                <table className="w-full text-xs text-right">
                  <thead className="bg-[#1D1D1B] text-[#F9F7F2] sticky top-0 font-bold">
                    <tr>
                      <th className="p-2.5 border-l border-[#1D1D1B]/40 font-mono">التاريخ</th>
                      <th className="p-2.5 border-l border-[#1D1D1B]/40 text-left font-mono">منه (مدين)</th>
                      <th className="p-2.5 border-l border-[#1D1D1B]/40 text-left font-mono">له (دائن)</th>
                      <th className="p-2.5 border-l border-[#1D1D1B]/40">البيان وحسابات القيد</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1D1D1B]/10 bg-[#FFFFFF]">
                    {journalEntries.map((j) => (
                      <tr key={j.id} className="hover:bg-[#F9F7F2]">
                        <td className="p-2.5 font-mono text-[#1D1D1B]/70 border-l border-[#1D1D1B]/10 text-[11px]">{j.date}</td>
                        <td className="p-2.5 text-left font-mono font-bold text-[#1B4D2E] border-l border-[#1D1D1B]/10">
                          {j.amount.toLocaleString()}
                        </td>
                        <td className="p-2.5 text-left font-mono font-bold text-[#8A1F1D] border-l border-[#1D1D1B]/10">
                          {j.amount.toLocaleString()}
                        </td>
                        <td className="p-2.5 border-l border-[#1D1D1B]/10 space-y-0.5">
                          <div className="font-bold text-[#1B4D2E]">من حـ/ {j.debitAccountName}</div>
                          <div className="font-bold text-[#8A1F1D] pr-4">إلى حـ/ {j.creditAccountName}</div>
                          <div className="text-[11px] text-[#1D1D1B]/60 pr-2">({j.description})</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Sequential Progression Banner: Journal -> Ledger */}
          <div className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-4 flex flex-wrap items-center justify-between gap-4 font-serif">
            <div>
              <span className="text-xs font-bold text-[#1D1D1B] block">
                الخطوة التالية في الدورة المحاسبية: ترحيل العمليات إلى دفتر الأستاذ العام
              </span>
              <span className="text-[11px] text-[#1D1D1B]/70">
                تم تسجيل جميع العمليات في دفتر اليومية بنجاح. الخطوة المنطقية التالية هي فحص حسابات الأستاذ حرف (T) وترصيدها.
              </span>
            </div>
            <button
              onClick={() => setActiveSubTab('t_accounts')}
              className="px-4 py-2.5 bg-[#1D1D1B] hover:bg-[#333330] text-[#F9F7F2] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>الانتقال إلى دفتر الأستاذ (حسابات T)</span>
              <ArrowLeft className="w-4 h-4 text-[#C4A484]" />
            </button>
          </div>
        </div>
      )}

      {/* 2. دفتر الأستاذ العام وحسابات حرف T (General Ledger - T Accounts) */}
      {activeSubTab === 't_accounts' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-[#FFFFFF] p-4 border border-[#1D1D1B]/15 font-serif">
            <div>
              <h3 className="font-extrabold text-base text-[#1D1D1B]">
                دفتر الأستاذ العام (General Ledger - T Accounts)
              </h3>
              <p className="text-xs text-[#1D1D1B]/60">
                الخطوة الثانية: كل حساب يمثل جانباً مديناً (منه) على اليمين وجانباً دائناً (له) على اليسار، مع حساب الرصيد المرحل والمنقول.
              </p>
            </div>

            {/* Quick Add Account Form */}
            <form onSubmit={handleAddAccount} className="flex flex-wrap items-center gap-2 text-xs">
              <input
                type="text"
                value={newAccName}
                onChange={e => setNewAccName(e.target.value)}
                placeholder="اسم حساب أستاذ جديد..."
                className="p-2 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-xs font-serif min-w-[180px]"
                required
              />
              <select
                value={newAccCategory}
                onChange={e => setNewAccCategory(e.target.value as any)}
                className="p-2 bg-[#F9F7F2] border border-[#1D1D1B]/20 text-xs font-serif"
              >
                <option value="asset">أصل (Asset) - طبيعته مدين</option>
                <option value="liability">خصم (Liability) - طبيعته دائن</option>
                <option value="equity">حقوق ملكية (Equity) - دائن</option>
                <option value="revenue">إيراد (Revenue) - دائن</option>
                <option value="expense">مصروف (Expense) - مدين</option>
              </select>
              <button
                type="submit"
                className="px-3 py-2 bg-[#1D1D1B] text-[#F9F7F2] font-bold flex items-center gap-1 hover:bg-[#333330] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#C4A484]" />
                <span>إضافة حساب</span>
              </button>
            </form>
          </div>

          {/* T-Accounts Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accounts.map(acc => (
              <TAccount
                key={acc.id}
                id={`t-acc-${acc.id}`}
                accountName={acc.name}
                accountCode={acc.code}
                category={acc.category}
                normalBalance={acc.normalBalance}
                entries={acc.entries}
                onDeleteEntry={(entryId) => handleDeleteTEntry(acc.id, entryId)}
              />
            ))}
          </div>

          {/* Sequential Progression Controls: Ledger -> Posting Challenge / Trial Balance */}
          <div className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-4 flex flex-wrap items-center justify-between gap-4 font-serif">
            <button
              onClick={() => setActiveSubTab('journal')}
              className="px-4 py-2.5 bg-[#FFFFFF] hover:bg-[#F4F4F0] text-[#1D1D1B] border border-[#1D1D1B]/20 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 text-[#C4A484]" />
              <span>الرجوع إلى 2. دفتر اليومية</span>
            </button>
            <div className="text-center sm:text-right">
              <span className="text-xs font-bold text-[#1D1D1B] block">
                الخطوة التالية: الترحيل اليدوي وأخطاء الترحيل (الوحدة 4)
              </span>
              <span className="text-[11px] text-[#1D1D1B]/70">
                تدرب على الترحيل بنفسك واخفِ الترحيل الصحيح لاكتشاف ومعالجة أخطاء الترحيل قبل إعداد ميزان المراجعة.
              </span>
            </div>
            <button
              onClick={() => setActiveSubTab('posting_challenge')}
              className="px-4 py-2.5 bg-[#8A1F1D] hover:bg-[#6e1816] text-[#FFFFFF] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>الانتقال إلى 4. الترحيل اليدوي ومحاكي الأخطاء</span>
              <ArrowLeft className="w-4 h-4 text-[#C4A484]" />
            </button>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: الترحيل اليدوي ومحاكي أخطاء الوحدة الرابعة */}
      {activeSubTab === 'posting_challenge' && (
        <div className="space-y-6">
          <PostingChallengeView
            onApplyCorrectingEntryToJournal={handleApplyCorrectingEntry}
            onNavigateToTrialBalance={() => setActiveSubTab('trial_balance')}
            initialPostingMode={postingMode}
            initialHideCorrectPosting={hideCorrectPosting}
            onModeChange={setPostingMode}
            onHideCorrectPostingChange={setHideCorrectPosting}
          />

          {/* Sequential Progression Controls: Challenge -> Trial Balance */}
          <div className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-4 flex flex-wrap items-center justify-between gap-4 font-serif">
            <button
              onClick={() => setActiveSubTab('t_accounts')}
              className="px-4 py-2.5 bg-[#FFFFFF] hover:bg-[#F4F4F0] text-[#1D1D1B] border border-[#1D1D1B]/20 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 text-[#C4A484]" />
              <span>الرجوع إلى 3. دفتر الأستاذ (T)</span>
            </button>
            <div className="text-center sm:text-right">
              <span className="text-xs font-bold text-[#1D1D1B] block">
                الخطوة التالية: ميزان المراجعة وكاشف الأخطاء
              </span>
              <span className="text-[11px] text-[#1D1D1B]/70">
                انتقل إلى ميزان المراجعة للتحقق من التوازن الرياضي وكشف أي فروق أو معالجتها بالحساب المعلق.
              </span>
            </div>
            <button
              onClick={() => setActiveSubTab('trial_balance')}
              className="px-4 py-2.5 bg-[#1D1D1B] hover:bg-[#333330] text-[#F9F7F2] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>الانتقال إلى 5. ميزان المراجعة</span>
              <ArrowLeft className="w-4 h-4 text-[#C4A484]" />
            </button>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: TRIAL BALANCE & ERROR DETECTOR */}
      {activeSubTab === 'trial_balance' && (
        <div className="space-y-6 font-serif">
          
          {/* Error Injection Sandbox Bar */}
          <div className="bg-[#FFFFFF] border border-[#1D1D1B]/15 p-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-sm text-[#1D1D1B] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#C4A484]" />
                <span>أداة محاكاة أخطاء عدم التوازن (Error Simulator)</span>
              </h4>
              <p className="text-xs text-[#1D1D1B]/70">
                جرب إحداث خلل مقصود لمشاهدة ظهور الحساب المعلق (Suspense Account) وتأثيره على الاتساق الداخلي.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setActiveSubTab('posting_challenge')}
                className="px-3 py-1.5 bg-[#8A1F1D] hover:bg-[#6e1816] text-[#FFFFFF] text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <EyeOff className="w-3.5 h-3.5 text-[#C4A484]" />
                <span>حل حالات أخطاء الترحيل يدوياً (الوحدة 4)</span>
              </button>
              {!deliberateError.active ? (
                <>
                  <button
                    onClick={() => setDeliberateError({ active: true, type: 'debit_over', difference: 15000 })}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 text-xs font-bold transition"
                  >
                    محاكاة زيادة في المدين (+15,000 ج)
                  </button>
                  <button
                    onClick={() => setDeliberateError({ active: true, type: 'credit_over', difference: 20000 })}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 text-xs font-bold transition"
                  >
                    محاكاة زيادة في الدائن (+20,000 ج)
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setDeliberateError({ active: false, type: '', difference: 0 })}
                  className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-[#FFFFFF] text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>إلغاء الخطأ وتصحيح الميزان فوراً</span>
                </button>
              )}
            </div>
          </div>

          {/* Main Trial Balance Table */}
          <div className="bg-[#FFFFFF] border border-[#1D1D1B]/15 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#1D1D1B]/10 pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-[#1D1D1B]">
                  ميزان المراجعة بالأرصدة (Trial Balance by Balances)
                </h3>
                <p className="text-xs text-[#1D1D1B]/60">مستخرج من ترصيد كافة حسابات الأستاذ العام</p>
              </div>
              <span className="text-xs bg-[#1D1D1B] text-[#F9F7F2] px-3 py-1 font-bold">
                في 2026/01/31
              </span>
            </div>

            <div className="overflow-x-auto border border-[#1D1D1B]/20">
              <table className="w-full text-xs text-right">
                <thead className="bg-[#1D1D1B] text-[#F9F7F2] font-bold">
                  <tr>
                    <th className="p-3 border-l border-[#1D1D1B]/40">كود</th>
                    <th className="p-3 border-l border-[#1D1D1B]/40">اسم حساب الأستاذ</th>
                    <th className="p-3 border-l border-[#1D1D1B]/40">التبويب المحاسبي</th>
                    <th className="p-3 text-left font-mono border-l border-[#1D1D1B]/40">رصيد مدين (منه)</th>
                    <th className="p-3 text-left font-mono border-l border-[#1D1D1B]/40">رصيد دائن (له)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1D1D1B]/10 bg-[#FFFFFF]">
                  {trialBalanceRows.map((row) => (
                    <tr key={row.account.id} className="hover:bg-[#F9F7F2]">
                      <td className="p-3 font-mono text-[#1D1D1B]/60 border-l border-[#1D1D1B]/10">{row.account.code}</td>
                      <td className="p-3 font-bold text-[#1D1D1B] border-l border-[#1D1D1B]/10">{row.account.name}</td>
                      <td className="p-3 border-l border-[#1D1D1B]/10">
                        <span className="text-[10px] bg-[#F9F7F2] text-[#1D1D1B] px-2 py-0.5 border border-[#1D1D1B]/15">
                          {row.account.category === 'asset' ? 'أصل' : row.account.category === 'liability' ? 'خصم' : row.account.category === 'equity' ? 'ملكية' : row.account.category === 'revenue' ? 'إيراد' : 'مصروف'}
                        </span>
                      </td>
                      <td className="p-3 text-left font-mono font-bold text-[#1B4D2E] border-l border-[#1D1D1B]/10">
                        {row.debitBalance > 0 ? row.debitBalance.toLocaleString() : '-'}
                      </td>
                      <td className="p-3 text-left font-mono font-bold text-[#8A1F1D] border-l border-[#1D1D1B]/10">
                        {row.creditBalance > 0 ? row.creditBalance.toLocaleString() : '-'}
                      </td>
                    </tr>
                  ))}

                  {/* Suspense Account Row if unbalanced */}
                  {!isTrialBalanced && (
                    <tr className="bg-rose-50 font-bold text-rose-900 border-t-2 border-rose-800">
                      <td className="p-3 font-mono">9999</td>
                      <td className="p-3">حساب معلق (Suspense Account) - تسوية مؤقتة للفرق</td>
                      <td className="p-3">حساب وسيط</td>
                      <td className="p-3 text-left font-mono">
                        {trialBalanceDiff < 0 ? Math.abs(trialBalanceDiff).toLocaleString() : '-'}
                      </td>
                      <td className="p-3 text-left font-mono">
                        {trialBalanceDiff > 0 ? trialBalanceDiff.toLocaleString() : '-'}
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot className="bg-[#1D1D1B] text-[#F9F7F2] font-black text-sm font-mono">
                  <tr>
                    <td colSpan={3} className="p-3 text-right font-serif">الإجمالي العام لميزان المراجعة:</td>
                    <td className="p-3 text-left text-[#C4A484]">
                      {(totalDebitBalances + (!isTrialBalanced && trialBalanceDiff < 0 ? Math.abs(trialBalanceDiff) : 0)).toLocaleString()} ج
                    </td>
                    <td className="p-3 text-left text-[#C4A484]">
                      {(totalCreditBalances + (!isTrialBalanced && trialBalanceDiff > 0 ? trialBalanceDiff : 0)).toLocaleString()} ج
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Sequential Progression Controls: Trial Balance -> Adjusting Entries */}
          <div className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-4 flex flex-wrap items-center justify-between gap-4 font-serif">
            <button
              onClick={() => setActiveSubTab('posting_challenge')}
              className="px-4 py-2.5 bg-[#FFFFFF] hover:bg-[#F4F4F0] text-[#1D1D1B] border border-[#1D1D1B]/20 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 text-[#C4A484]" />
              <span>الرجوع إلى 4. الترحيل اليدوي والأخطاء</span>
            </button>
            <div className="text-center sm:text-right">
              <span className="text-xs font-bold text-[#1D1D1B] block">
                الخطوة التالية: التسويات الجردية وكاشف الأثر المالي (الوحدة 5)
              </span>
              <span className="text-[11px] text-[#1D1D1B]/70">
                إثبات المصروفات والإيرادات المقدمة والمستحقة ومخصص الديون المشكوك فيها وإهلاك الأصول وفق معايير EAS.
              </span>
            </div>
            <button
              onClick={() => setActiveSubTab('adjusting_entries')}
              className="px-4 py-2.5 bg-[#8A1F1D] hover:bg-[#701917] text-[#FFFFFF] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>الانتقال إلى 6. التسويات الجردية الذكية</span>
              <ArrowLeft className="w-4 h-4 text-[#C4A484]" />
            </button>
          </div>

        </div>
      )}

      {/* 6. التسويات الجردية الذكية وكاشف الأثر المالي (Adjusting Entries Sandbox) */}
      {activeSubTab === 'adjusting_entries' && (
        <div className="space-y-6 font-serif">
          <AdjustingEntriesSandbox
            onApplyAdjustmentToLedger={(entry) => {
              postCustomTransaction(
                entry.debitAccount,
                entry.creditAccount,
                entry.amount,
                entry.description,
                entry.date
              );
            }}
            onNavigateToJRE={() => {
              navigate('/training/jre');
            }}
          />

          <div className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-4 flex flex-wrap items-center justify-between gap-4 font-serif">
            <button
              onClick={() => setActiveSubTab('trial_balance')}
              className="px-4 py-2.5 bg-[#FFFFFF] hover:bg-[#F4F4F0] text-[#1D1D1B] border border-[#1D1D1B]/20 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 text-[#C4A484]" />
              <span>الرجوع إلى 5. ميزان المراجعة</span>
            </button>
            <div className="text-center sm:text-right">
              <span className="text-xs font-bold text-[#1D1D1B] block">
                الخطوة التالية: الحسابات والقوائم الختامية
              </span>
              <span className="text-[11px] text-[#1D1D1B]/70">
                توليد حساب المتاجرة والأرباح والخسائر وقائمة المركز المالي والمؤشرات المالية بعد التسوية.
              </span>
            </div>
            <button
              onClick={() => setActiveSubTab('final_accounts')}
              className="px-4 py-2.5 bg-[#1D1D1B] hover:bg-[#333330] text-[#F9F7F2] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>الانتقال إلى 7. القوائم والحسابات الختامية</span>
              <ArrowLeft className="w-4 h-4 text-[#C4A484]" />
            </button>
          </div>
        </div>
      )}

      {/* 7. القوائم والحسابات الختامية (Final Accounts Generator) */}
      {activeSubTab === 'final_accounts' && (
        <div className="space-y-6 font-serif">
          
          {/* Ending inventory control */}
          <div className="bg-[#FFFFFF] border border-[#1D1D1B]/15 p-4 flex flex-wrap items-center justify-between gap-4">
            <div>
              <label className="font-bold text-sm text-[#1D1D1B] block">
                مخزون بضاعة آخر المدة (بناءً على الجرد الفعلي للمستودعات):
              </label>
              <span className="text-xs text-[#1D1D1B]/60">يظهر كطرف دائن في حساب المتاجرة، وأصل متداول في الميزانية العمومية.</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={endingInventory}
                onChange={e => setEndingInventory(Number(e.target.value))}
                className="p-2 bg-[#F9F7F2] border border-[#1D1D1B]/20 font-mono text-sm font-bold w-36 text-left"
              />
              <span className="text-xs font-bold text-[#1D1D1B]">جنيه</span>
            </div>
          </div>

          {/* المرحلة الأولى: الحسابات الختامية لقياس نتائج النشاط (المتاجرة والأرباح والخسائر) */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#1D1D1B] text-[#F9F7F2] font-bold text-xs px-2.5 py-0.5 font-serif">
                المرحلة 1
              </span>
              <h4 className="font-extrabold text-sm sm:text-base text-[#1D1D1B]">
                الحسابات الختامية التمهيدية (لقياس مجمل وصافي ربح النشاط التجاري)
              </h4>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 1. Trading Account (حساب المتاجرة) */}
              <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-5 shadow-xs space-y-4 flex flex-col">
                <div className="border-b border-[#1D1D1B]/15 pb-2">
                  <span className="text-[10px] bg-[#C4A484] text-[#1D1D1B] font-bold px-2 py-0.5">الحساب الختامي 1</span>
                  <h4 className="font-extrabold text-base text-[#1D1D1B] mt-1">حساب المتاجرة (Trading Account)</h4>
                  <p className="text-[11px] text-[#1D1D1B]/60">لقياس مجمل الربح أو الخسارة من حركة البضاعة والمبيعات</p>
                </div>

                <div className="space-y-2 text-xs flex-1">
                  <div className="flex justify-between text-[#1D1D1B]/80">
                    <span>المبيعات (إيراد النشاط الرئيسي):</span>
                    <span className="font-mono font-bold">{salesTotal.toLocaleString()} ج</span>
                  </div>
                  <div className="flex justify-between text-[#1D1D1B]/80">
                    <span>(+) بضاعة أول المدة:</span>
                    <span className="font-mono font-bold">{begInvTotal.toLocaleString()} ج</span>
                  </div>
                  <div className="flex justify-between text-[#1D1D1B]/80">
                    <span>(+) المشتريات:</span>
                    <span className="font-mono font-bold">{purchasesTotal.toLocaleString()} ج</span>
                  </div>
                  <div className="flex justify-between text-[#1D1D1B]/80">
                    <span>(-) بضاعة آخر المدة (بالجرد الفعلي):</span>
                    <span className="font-mono font-bold">({endingInventory.toLocaleString()}) ج</span>
                  </div>
                  <div className="pt-2 border-t border-[#1D1D1B]/15 flex justify-between font-bold text-[#1D1D1B]">
                    <span>تكلفة البضاعة المباعة (COGS):</span>
                    <span className="font-mono">{cogs.toLocaleString()} ج</span>
                  </div>
                </div>

                <div className="bg-[#1D1D1B] text-[#F9F7F2] p-3 font-bold text-xs flex justify-between items-center">
                  <span>مجمل الربح المنقول لحساب أ.خ (Gross Profit):</span>
                  <span className="font-mono text-[#C4A484] text-sm">{grossProfit.toLocaleString()} ج</span>
                </div>
              </div>

              {/* 2. Profit & Loss Account (حساب الأرباح والخسائر) */}
              <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-5 shadow-xs space-y-4 flex flex-col">
                <div className="border-b border-[#1D1D1B]/15 pb-2">
                  <span className="text-[10px] bg-[#C4A484] text-[#1D1D1B] font-bold px-2 py-0.5">الحساب الختامي 2</span>
                  <h4 className="font-extrabold text-base text-[#1D1D1B] mt-1">حساب الأرباح والخسائر (P&L Account)</h4>
                  <p className="text-[11px] text-[#1D1D1B]/60">لقياس صافي الدخل النهائي بعد تحميل كافة المصروفات التشغيلية</p>
                </div>

                <div className="space-y-2 text-xs flex-1">
                  <div className="flex justify-between font-bold text-[#1B4D2E]">
                    <span>مجمل الربح المنقول من حساب المتاجرة:</span>
                    <span className="font-mono">{grossProfit.toLocaleString()} ج</span>
                  </div>
                  
                  <div className="pt-2 border-t border-[#1D1D1B]/10 space-y-1.5">
                    <span className="text-[11px] font-bold text-[#1D1D1B]/70 block">المصروفات التشغيلية والعمومية المفصلة:</span>
                    {operatingExpenseAccounts.map(e => (
                      <div key={e.id} className="flex justify-between text-[#1D1D1B]/75 text-[11px] pr-2">
                        <span>• {e.name.split(' (')[0]}:</span>
                        <span className="font-mono">{calculateAccountSummary(e).balanceAmount.toLocaleString()} ج</span>
                      </div>
                    ))}
                    {operatingExpenseAccounts.length === 0 && (
                      <span className="text-[11px] text-[#1D1D1B]/40">- لا توجد مصروفات أخرى -</span>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#1D1D1B]/15 flex justify-between font-bold text-[#1D1D1B]">
                    <span>إجمالي المصروفات التشغيلية:</span>
                    <span className="font-mono text-[#8A1F1D]">{totalOperatingExpenses.toLocaleString()} ج</span>
                  </div>
                </div>

                <div className="bg-[#1D1D1B] text-[#F9F7F2] p-3 font-bold text-xs flex justify-between items-center">
                  <span>صافي الربح النهائي المرحل لحقوق الملكية:</span>
                  <span className="font-mono text-[#C4A484] text-sm">{netProfit.toLocaleString()} ج</span>
                </div>
              </div>
            </div>
          </div>

          {/* المرحلة الثانية: الميزانية العمومية التفصيلية الشاملة لكافة حسابات الأصول والخصوم والالتزامات */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#1D1D1B] text-[#F9F7F2] font-bold text-xs px-2.5 py-0.5 font-serif">
                المرحلة 2
              </span>
              <h4 className="font-extrabold text-sm sm:text-base text-[#1D1D1B]">
                الميزانية العمومية وقائمة المركز المالي التفصيلية (تفصيل الأصول والخصوم والالتزامات وحقوق الملكية)
              </h4>
            </div>

            <DetailedBalanceSheetView
              accounts={accounts}
              endingInventory={endingInventory}
              grossProfit={grossProfit}
              netProfit={netProfit}
              salesTotal={salesTotal}
              cogs={cogs}
              calculateAccountSummary={calculateAccountSummary}
              onSelectAccount={() => setActiveSubTab('t_accounts')}
            />
          </div>

          {/* Sequential Progression Controls: Final Accounts -> Practice Cases */}
          <div className="bg-[#F9F7F2] border border-[#1D1D1B]/20 p-4 flex flex-wrap items-center justify-between gap-4 font-serif">
            <button
              onClick={() => setActiveSubTab('trial_balance')}
              className="px-4 py-2.5 bg-[#FFFFFF] hover:bg-[#F4F4F0] text-[#1D1D1B] border border-[#1D1D1B]/20 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 text-[#C4A484]" />
              <span>الرجوع إلى 5. ميزان المراجعة</span>
            </button>
            <div className="text-center sm:text-right">
              <span className="text-xs font-bold text-[#1D1D1B] block">
                اكتملت الدورة المحاسبية بنجاح!
              </span>
              <span className="text-[11px] text-[#1D1D1B]/70">
                يمكنك تجربة سيناريوهات وحالات عملية إضافية لتطبيق كافة خطوات الدورة المحاسبية.
              </span>
            </div>
            <button
              onClick={() => setActiveSubTab('guided_cases')}
              className="px-4 py-2.5 bg-[#1D1D1B] hover:bg-[#333330] text-[#F9F7F2] text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#C4A484]" />
              <span>الانتقال إلى 7. الحالات والسيناريوهات التدريبية</span>
            </button>
          </div>

        </div>
      )}

      {/* 5. حالات وسيناريوهات تدريبية جاهزة (Guided Practice Scenarios) */}
      {activeSubTab === 'guided_cases' && (
        <div className="space-y-6 font-serif">
          <div className="bg-[#FFFFFF] border border-[#1D1D1B]/15 p-5">
            <h3 className="font-extrabold text-base text-[#1D1D1B]">
              حالات وسيناريوهات محاسبية معتمدة في منهج EB
            </h3>
            <p className="text-xs text-[#1D1D1B]/60 mt-0.5">
              اختر حالة دراسية لتحميل قيودها فورياً في دفتر اليومية ومتابعة ترحيلها خطوة بخطوة عبر الدورة المحاسبية الكاملة:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRESET_SCENARIOS.map(sc => (
              <div 
                key={sc.id}
                className={`bg-[#FFFFFF] border-2 p-5 shadow-xs space-y-4 flex flex-col transition ${
                  selectedCaseId === sc.id ? 'border-[#1D1D1B] bg-[#F9F7F2]' : 'border-[#1D1D1B]/20 hover:border-[#1D1D1B]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-[#1D1D1B] text-[#C4A484] font-bold px-2 py-0.5">
                    مستوى: {sc.difficulty}
                  </span>
                  <span className="text-xs font-mono text-[#1D1D1B]/60">
                    {sc.journalEntries.length} قيود
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-[#1D1D1B]">{sc.title}</h4>
                  <p className="text-xs text-[#C4A484] font-semibold">{sc.subtitle}</p>
                </div>

                <p className="text-xs text-[#1D1D1B]/80 leading-relaxed flex-1">
                  {sc.description}
                </p>

                <button
                  onClick={() => {
                    loadScenario(sc);
                    setActiveSubTab('journal');
                  }}
                  className="w-full py-2.5 bg-[#1D1D1B] hover:bg-[#333330] text-[#F9F7F2] font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-4 h-4 text-[#C4A484]" />
                  <span>تحميل ومحاكاة الحالة في دفتر اليومية</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export { TAccountSimulator as AccountingSimulator };
export default TAccountSimulator;
