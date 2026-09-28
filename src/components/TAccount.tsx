import React, { useMemo } from 'react';
import { Trash2, Plus, Info, Scale, CheckCircle2, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export interface TAccountEntryItem {
  id?: string;
  date?: string;
  oppositeAccount?: string;
  description?: string;
  amount: number;
  type?: 'debit' | 'credit';
  note?: string;
  reference?: string;
}

export type AccountCategory = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense' | 'other' | string;

export interface TAccountCalculations {
  totalDebits: number;
  totalCredits: number;
  higherTotal: number;
  difference: number;
  balanceAmount: number;
  balanceType: 'debit' | 'credit' | 'zero';
  isBalanced: boolean;
  statusLabelAr: string;
  statusLabelEn: string;
}

export interface TAccountProps {
  id?: string;
  accountName?: string;
  accountCode?: string;
  category?: AccountCategory;
  normalBalance?: 'debit' | 'credit';

  // Entry inputs: separate arrays, or a unified array, or both
  debitEntries?: TAccountEntryItem[];
  creditEntries?: TAccountEntryItem[];
  entries?: TAccountEntryItem[];

  // Display & formatting options
  currency?: string;
  showBalancingStep?: boolean;
  showBroughtForward?: boolean;
  showExplanation?: boolean;
  showTotalsBar?: boolean;
  compact?: boolean;
  readOnly?: boolean;
  emptyDebitPlaceholder?: string;
  emptyCreditPlaceholder?: string;
  className?: string;

  // Interaction handlers
  onDeleteEntry?: (entryId: string, side: 'debit' | 'credit') => void;
  onAddEntry?: (side: 'debit' | 'credit') => void;
  onBalanceCalculated?: (calculations: TAccountCalculations) => void;
}

/**
 * Pure calculation function for T-Account balancing.
 * Calculates total debits, total credits, difference, balancing figure, and resulting balance type.
 */
export function calculateTAccountBalance(
  debits: TAccountEntryItem[] = [],
  credits: TAccountEntryItem[] = []
): TAccountCalculations {
  const totalDebits = debits.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const totalCredits = credits.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const higherTotal = Math.max(totalDebits, totalCredits);
  const difference = Math.abs(totalDebits - totalCredits);

  let balanceType: 'debit' | 'credit' | 'zero' = 'zero';
  if (totalDebits > totalCredits) {
    balanceType = 'debit';
  } else if (totalCredits > totalDebits) {
    balanceType = 'credit';
  }

  const isBalanced = totalDebits === totalCredits;

  const statusLabelAr = isBalanced
    ? (totalDebits > 0 ? 'حساب مقفل (متوازن)' : 'حساب فارغ بدون قيود')
    : balanceType === 'debit'
    ? 'رصيد مدين'
    : 'رصيد دائن';

  const statusLabelEn = isBalanced
    ? (totalDebits > 0 ? 'Closed / Balanced' : 'Empty Account')
    : balanceType === 'debit'
    ? 'Debit Balance'
    : 'Credit Balance';

  return {
    totalDebits,
    totalCredits,
    higherTotal,
    difference,
    balanceAmount: difference,
    balanceType,
    isBalanced,
    statusLabelAr,
    statusLabelEn
  };
}

const CATEGORY_LABELS: Record<string, { ar: string; badgeClass: string }> = {
  asset: { ar: 'أصل (Asset)', badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
  liability: { ar: 'التزام / خصم (Liability)', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300' },
  equity: { ar: 'حقوق ملكية (Equity)', badgeClass: 'bg-indigo-100 text-indigo-900 border-indigo-300' },
  revenue: { ar: 'إيراد (Revenue)', badgeClass: 'bg-blue-100 text-blue-900 border-blue-300' },
  expense: { ar: 'مصروف (Expense)', badgeClass: 'bg-rose-100 text-rose-900 border-rose-300' }
};

/**
 * Reusable T-Account Component for General Ledger visual representation.
 * Supports auto-balancing, carried-forward (مرحل) and brought-forward (منقول) figures,
 * responsive dual-column display, and interactive entry manipulation.
 */
export const TAccount: React.FC<TAccountProps> = ({
  id,
  accountName = 'حساب الأستاذ',
  accountCode,
  category,
  normalBalance,
  debitEntries: propDebitEntries = [],
  creditEntries: propCreditEntries = [],
  entries = [],
  currency = 'ج.م',
  showBalancingStep = true,
  showBroughtForward = true,
  showExplanation = false,
  showTotalsBar = true,
  compact = false,
  readOnly = false,
  emptyDebitPlaceholder = '- لا توجد قيود مدينة -',
  emptyCreditPlaceholder = '- لا توجد قيود دائنة -',
  className = '',
  onDeleteEntry,
  onAddEntry,
  onBalanceCalculated
}) => {
  const [showPedagogicalNote, setShowPedagogicalNote] = React.useState(showExplanation);

  // Combine unified entries with side-specific props
  const resolvedDebits = useMemo(() => {
    const fromUnified = entries.filter(e => e.type === 'debit');
    return [...propDebitEntries, ...fromUnified];
  }, [propDebitEntries, entries]);

  const resolvedCredits = useMemo(() => {
    const fromUnified = entries.filter(e => e.type === 'credit');
    return [...propCreditEntries, ...fromUnified];
  }, [propCreditEntries, entries]);

  // Perform automatic balancing calculations
  const calculations = useMemo(() => {
    return calculateTAccountBalance(resolvedDebits, resolvedCredits);
  }, [resolvedDebits, resolvedCredits]);

  // Inform parent when calculations update
  React.useEffect(() => {
    if (onBalanceCalculated) {
      onBalanceCalculated(calculations);
    }
  }, [calculations, onBalanceCalculated]);

  const categoryMeta = category && CATEGORY_LABELS[category]
    ? CATEGORY_LABELS[category]
    : category
    ? { ar: category, badgeClass: 'bg-stone-100 text-stone-800 border-stone-300' }
    : null;

  return (
    <div 
      id={id}
      data-testid="t-account-component"
      className={`bg-[#FFFFFF] border-2 border-[#1D1D1B] shadow-xs flex flex-col font-serif ${className}`}
    >
      {/* 1. Account Header Banner */}
      <div className="bg-[#1D1D1B] text-[#F9F7F2] p-3 text-center border-b border-[#1D1D1B] relative">
        <div className="flex items-center justify-between gap-2">
          {/* Category Tag */}
          <div className="flex items-center gap-1.5 text-right">
            {categoryMeta && (
              <span className={`text-[10px] font-bold px-2 py-0.5 border ${categoryMeta.badgeClass}`}>
                {categoryMeta.ar}
              </span>
            )}
            {normalBalance && (
              <span className="text-[10px] bg-[#FFFFFF]/15 text-[#F9F7F2] px-1.5 py-0.5 font-sans">
                الطبيعة: {normalBalance === 'debit' ? 'مدين' : 'دائن'}
              </span>
            )}
          </div>

          {/* Account Title */}
          <div className="flex-1 px-2">
            <h4 className="font-extrabold text-sm sm:text-base tracking-tight text-[#F9F7F2]">
              {accountName}
            </h4>
            {accountCode && (
              <span className="text-[10px] text-[#C4A484] font-mono block mt-0.5">
                كود الحساب: {accountCode}
              </span>
            )}
          </div>

          {/* Explanatory Info Toggle */}
          <button
            type="button"
            onClick={() => setShowPedagogicalNote(!showPedagogicalNote)}
            className="text-[#F9F7F2]/70 hover:text-[#C4A484] p-1 transition cursor-pointer"
            title="شرح آلية الترصيد المحاسبي"
            aria-label="شرح آلية الترصيد"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Optional Pedagogical Note on Balancing */}
      {showPedagogicalNote && (
        <div className="bg-[#F4F8F4] border-b border-emerald-800/20 p-2.5 text-[11px] text-[#1B4D2E] leading-relaxed flex items-start gap-2">
          <Scale className="w-4 h-4 shrink-0 mt-0.5 text-[#1B4D2E]" />
          <div>
            <span className="font-bold">قاعدة الترصيد في الدفاتر (Balancing Rule):</span>{' '}
            يُجمع الجانبان، ويُسجل المجموع الأكبر في خانتي المجموع بالطرفين. يُستخرج الفرق (المتمم الحسابي)
            ويُسجل بالجانب الأقل كـ <span className="font-bold">«رصيد مرحل»</span> ليتساوى الطرفان، ثم يُنقل في بداية
            الفترة المحاسبية التالية كـ <span className="font-bold">«رصيد منقول»</span> إلى جانبه الأصلي الطبيعي.
          </div>
        </div>
      )}

      {/* 2. Column Headers (منه / له) */}
      <div className="grid grid-cols-2 bg-[#F9F7F2] border-b-2 border-[#1D1D1B] text-xs font-black text-[#1D1D1B] text-center divide-x-2 divide-[#1D1D1B] divide-x-reverse">
        {/* Debit Header (منه) - Right Column in RTL */}
        <div className="py-2 bg-[#F4F8F4] text-[#1B4D2E] flex items-center justify-between px-3">
          <div className="flex items-center gap-1.5">
            <ArrowUpRight className="w-3.5 h-3.5 text-[#1B4D2E]" />
            <span className="font-bold">منه (الجانب المدين)</span>
          </div>
          {!readOnly && onAddEntry && (
            <button
              type="button"
              onClick={() => onAddEntry('debit')}
              className="text-[#1B4D2E] hover:bg-[#1B4D2E]/10 p-0.5 rounded transition cursor-pointer"
              title="إضافة قيد مدين"
              aria-label="إضافة قيد مدين"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Credit Header (له) - Left Column in RTL */}
        <div className="py-2 bg-[#FDF3F2] text-[#8A1F1D] flex items-center justify-between px-3">
          <div className="flex items-center gap-1.5">
            <ArrowDownLeft className="w-3.5 h-3.5 text-[#8A1F1D]" />
            <span className="font-bold">له (الجانب الدائن)</span>
          </div>
          {!readOnly && onAddEntry && (
            <button
              type="button"
              onClick={() => onAddEntry('credit')}
              className="text-[#8A1F1D] hover:bg-[#8A1F1D]/10 p-0.5 rounded transition cursor-pointer"
              title="إضافة قيد دائن"
              aria-label="إضافة قيد دائن"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Main T-Account Body: Dual Column List */}
      <div className={`grid grid-cols-2 divide-x-2 divide-[#1D1D1B] divide-x-reverse flex-1 ${compact ? 'min-h-[120px]' : 'min-h-[160px]'} text-[11px]`}>
        
        {/* RIGHT COLUMN: Debit Side (منه) */}
        <div className="p-2 space-y-1.5 flex flex-col bg-[#FFFFFF]">
          {resolvedDebits.length === 0 ? (
            <div className="text-[10px] text-[#1D1D1B]/40 text-center py-4 italic">
              {emptyDebitPlaceholder}
            </div>
          ) : (
            resolvedDebits.map((entry, idx) => {
              const entryKey = entry.id || `debit-${idx}-${entry.amount}`;
              const label = entry.oppositeAccount 
                ? (entry.oppositeAccount.startsWith('إلى') || entry.oppositeAccount.startsWith('حـ/') 
                    ? entry.oppositeAccount 
                    : `إلى حـ/ ${entry.oppositeAccount}`)
                : entry.description || 'قيد مدين';

              return (
                <div 
                  key={entryKey} 
                  className="flex items-center justify-between bg-[#F9F7F2] p-1.5 border border-[#1D1D1B]/10 hover:bg-[#F4F8F4] transition group"
                >
                  <div className="truncate pr-1">
                    {entry.date && (
                      <span className="text-[9px] text-[#1D1D1B]/50 block font-mono">
                        {entry.date}
                      </span>
                    )}
                    <span className="font-bold text-[#1D1D1B] text-[10px] block truncate" title={label}>
                      {label}
                    </span>
                    {entry.note && (
                      <span className="text-[9px] text-[#1D1D1B]/60 block truncate">{entry.note}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 mr-1">
                    <span className="font-mono font-bold text-[#1B4D2E] text-xs">
                      {entry.amount.toLocaleString()}
                    </span>
                    {!readOnly && onDeleteEntry && entry.id && (
                      <button
                        type="button"
                        onClick={() => onDeleteEntry(entry.id!, 'debit')}
                        className="opacity-0 group-hover:opacity-100 p-0.5 text-rose-700 hover:bg-rose-100 transition cursor-pointer"
                        title="حذف القيد"
                        aria-label="حذف القيد"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}

          {/* Balancing Figure on DEBIT side if totalCredits > totalDebits (Credit Balance) */}
          {showBalancingStep && calculations.balanceType === 'credit' && calculations.balanceAmount > 0 && (
            <div 
              data-testid="balancing-figure-debit"
              className="mt-auto pt-2 border-t-2 border-dashed border-rose-800/40 bg-rose-50/70 p-1.5 text-[10px] text-rose-900 font-bold flex items-center justify-between"
            >
              <div className="flex items-center gap-1">
                <span className="bg-rose-800 text-white px-1 py-0.2 text-[9px]">متمم</span>
                <span>رصيد مرحل (دائن):</span>
              </div>
              <span className="font-mono text-xs font-black">
                {calculations.balanceAmount.toLocaleString()} {currency}
              </span>
            </div>
          )}
        </div>

        {/* LEFT COLUMN: Credit Side (له) */}
        <div className="p-2 space-y-1.5 flex flex-col bg-[#FFFFFF]">
          {resolvedCredits.length === 0 ? (
            <div className="text-[10px] text-[#1D1D1B]/40 text-center py-4 italic">
              {emptyCreditPlaceholder}
            </div>
          ) : (
            resolvedCredits.map((entry, idx) => {
              const entryKey = entry.id || `credit-${idx}-${entry.amount}`;
              const label = entry.oppositeAccount 
                ? (entry.oppositeAccount.startsWith('من') || entry.oppositeAccount.startsWith('حـ/') 
                    ? entry.oppositeAccount 
                    : `من حـ/ ${entry.oppositeAccount}`)
                : entry.description || 'قيد دائن';

              return (
                <div 
                  key={entryKey} 
                  className="flex items-center justify-between bg-[#F9F7F2] p-1.5 border border-[#1D1D1B]/10 hover:bg-[#FDF3F2] transition group"
                >
                  <div className="truncate pr-1">
                    {entry.date && (
                      <span className="text-[9px] text-[#1D1D1B]/50 block font-mono">
                        {entry.date}
                      </span>
                    )}
                    <span className="font-bold text-[#1D1D1B] text-[10px] block truncate" title={label}>
                      {label}
                    </span>
                    {entry.note && (
                      <span className="text-[9px] text-[#1D1D1B]/60 block truncate">{entry.note}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 mr-1">
                    <span className="font-mono font-bold text-[#8A1F1D] text-xs">
                      {entry.amount.toLocaleString()}
                    </span>
                    {!readOnly && onDeleteEntry && entry.id && (
                      <button
                        type="button"
                        onClick={() => onDeleteEntry(entry.id!, 'credit')}
                        className="opacity-0 group-hover:opacity-100 p-0.5 text-rose-700 hover:bg-rose-100 transition cursor-pointer"
                        title="حذف القيد"
                        aria-label="حذف القيد"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}

          {/* Balancing Figure on CREDIT side if totalDebits > totalCredits (Debit Balance) */}
          {showBalancingStep && calculations.balanceType === 'debit' && calculations.balanceAmount > 0 && (
            <div 
              data-testid="balancing-figure-credit"
              className="mt-auto pt-2 border-t-2 border-dashed border-emerald-800/40 bg-emerald-50/70 p-1.5 text-[10px] text-emerald-900 font-bold flex items-center justify-between"
            >
              <div className="flex items-center gap-1">
                <span className="bg-emerald-800 text-white px-1 py-0.2 text-[9px]">متمم</span>
                <span>رصيد مرحل (مدين):</span>
              </div>
              <span className="font-mono text-xs font-black">
                {calculations.balanceAmount.toLocaleString()} {currency}
              </span>
            </div>
          )}
        </div>

      </div>

      {/* 4. Totals Bar (سطر المجموع المتطابق - Double Rule) */}
      {showTotalsBar && (
        <div className="grid grid-cols-2 border-t-2 border-b-2 border-[#1D1D1B] bg-[#1D1D1B] text-[#F9F7F2] text-xs font-mono font-bold text-center divide-x-2 divide-[#F9F7F2]/20 divide-x-reverse">
          <div className="py-1.5 flex items-center justify-center gap-1">
            <span className="text-[10px] text-[#C4A484] font-sans">المجموع:</span>
            <span>{calculations.higherTotal.toLocaleString()} {currency}</span>
          </div>
          <div className="py-1.5 flex items-center justify-center gap-1">
            <span className="text-[10px] text-[#C4A484] font-sans">المجموع:</span>
            <span>{calculations.higherTotal.toLocaleString()} {currency}</span>
          </div>
        </div>
      )}

      {/* 5. Brought-Forward / Final Net Balance (الرصيد المنقول أول المدة التالية) */}
      {showBroughtForward && (
        <div 
          data-testid="brought-forward-bar"
          className={`p-2.5 text-xs font-bold text-center font-serif flex items-center justify-between ${
            calculations.balanceType === 'debit'
              ? 'bg-[#F4F8F4] text-[#1B4D2E] border-t border-[#1D1D1B]/15'
              : calculations.balanceType === 'credit'
              ? 'bg-[#FDF3F2] text-[#8A1F1D] border-t border-[#1D1D1B]/15'
              : 'bg-[#F9F7F2] text-[#1D1D1B]/70'
          }`}
        >
          <div className="flex items-center gap-1.5 text-right">
            {calculations.isBalanced ? (
              <CheckCircle2 className="w-4 h-4 text-stone-600" />
            ) : (
              <Scale className={`w-4 h-4 ${calculations.balanceType === 'debit' ? 'text-[#1B4D2E]' : 'text-[#8A1F1D]'}`} />
            )}
            <span>الرصيد المنقول (بداية الفترة):</span>
          </div>

          <div className="font-mono text-sm font-black flex items-center gap-2">
            {calculations.balanceAmount > 0 ? (
              <>
                <span>{calculations.balanceAmount.toLocaleString()} {currency}</span>
                <span className={`text-[10px] px-2 py-0.5 font-serif font-bold ${
                  calculations.balanceType === 'debit'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-rose-700 text-white'
                }`}>
                  {calculations.statusLabelAr}
                </span>
              </>
            ) : (
              <span className="text-[11px] text-[#1D1D1B]/70 font-serif">
                {calculations.totalDebits > 0 ? 'الحساب مقفل ومصفى (رصيد صفر)' : 'لا توجد حركات مسجلة'}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TAccount;
