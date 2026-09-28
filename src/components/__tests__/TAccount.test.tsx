import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TAccount, calculateTAccountBalance } from '../TAccount';

describe('TAccount Reusable Component Suite', () => {
  describe('Pure calculateTAccountBalance logic', () => {
    it('correctly balances an empty account', () => {
      const calc = calculateTAccountBalance([], []);
      expect(calc.totalDebits).toBe(0);
      expect(calc.totalCredits).toBe(0);
      expect(calc.higherTotal).toBe(0);
      expect(calc.balanceAmount).toBe(0);
      expect(calc.balanceType).toBe('zero');
      expect(calc.isBalanced).toBe(true);
    });

    it('calculates a debit balance when debits exceed credits', () => {
      const debits = [{ amount: 10000 }, { amount: 5000 }];
      const credits = [{ amount: 3000 }];
      const calc = calculateTAccountBalance(debits, credits);

      expect(calc.totalDebits).toBe(15000);
      expect(calc.totalCredits).toBe(3000);
      expect(calc.higherTotal).toBe(15000);
      expect(calc.difference).toBe(12000);
      expect(calc.balanceAmount).toBe(12000);
      expect(calc.balanceType).toBe('debit');
      expect(calc.isBalanced).toBe(false);
      expect(calc.statusLabelAr).toBe('رصيد مدين');
    });

    it('calculates a credit balance when credits exceed debits', () => {
      const debits = [{ amount: 4000 }];
      const credits = [{ amount: 20000 }, { amount: 10000 }];
      const calc = calculateTAccountBalance(debits, credits);

      expect(calc.totalDebits).toBe(4000);
      expect(calc.totalCredits).toBe(30000);
      expect(calc.higherTotal).toBe(30000);
      expect(calc.balanceAmount).toBe(26000);
      expect(calc.balanceType).toBe('credit');
      expect(calc.isBalanced).toBe(false);
      expect(calc.statusLabelAr).toBe('رصيد دائن');
    });

    it('identifies a closed/balanced account when debits equal credits', () => {
      const debits = [{ amount: 50000 }];
      const credits = [{ amount: 20000 }, { amount: 30000 }];
      const calc = calculateTAccountBalance(debits, credits);

      expect(calc.totalDebits).toBe(50000);
      expect(calc.totalCredits).toBe(50000);
      expect(calc.higherTotal).toBe(50000);
      expect(calc.balanceAmount).toBe(0);
      expect(calc.balanceType).toBe('zero');
      expect(calc.isBalanced).toBe(true);
      expect(calc.statusLabelAr).toContain('مقفل');
    });
  });

  describe('Component Rendering & UI Calculations', () => {
    it('renders with account title, code and category metadata', () => {
      render(
        <TAccount
          accountName="حساب الصندوق (Cash)"
          accountCode="101"
          category="asset"
          normalBalance="debit"
        />
      );

      expect(screen.getByText('حساب الصندوق (Cash)')).toBeInTheDocument();
      expect(screen.getByText(/كود الحساب: 101/)).toBeInTheDocument();
      expect(screen.getByText(/أصل \(Asset\)/)).toBeInTheDocument();
      expect(screen.getByText(/الطبيعة: مدين/)).toBeInTheDocument();
    });

    it('handles debit and credit entries passed as separate props and displays balancing figure', () => {
      const debitEntries = [
        { id: 'd1', date: '2026/01/01', oppositeAccount: 'رأس المال', amount: 150000 }
      ];
      const creditEntries = [
        { id: 'c1', date: '2026/01/05', oppositeAccount: 'الأثاث', amount: 20000 }
      ];

      render(
        <TAccount
          accountName="حساب الصندوق / النقدية"
          debitEntries={debitEntries}
          creditEntries={creditEntries}
        />
      );

      // Debit side has 150,000
      expect(screen.getByText('150,000')).toBeInTheDocument();
      // Credit side has 20,000
      expect(screen.getByText('20,000')).toBeInTheDocument();

      // Since debits > credits, balancing figure (130,000) should appear in the credit column as carried forward
      const carriedForward = screen.getByTestId('balancing-figure-credit');
      expect(carriedForward).toBeInTheDocument();
      expect(carriedForward).toHaveTextContent('130,000');
      expect(carriedForward).toHaveTextContent('رصيد مرحل (مدين)');

      // Brought-down section at bottom
      const broughtForward = screen.getByTestId('brought-forward-bar');
      expect(broughtForward).toHaveTextContent('130,000');
      expect(broughtForward).toHaveTextContent('رصيد مدين');
    });

    it('handles unified entries prop with type "debit" | "credit"', () => {
      const entries = [
        { id: 'e1', date: '2026/02/01', oppositeAccount: 'المشتريات', amount: 5000, type: 'debit' as const },
        { id: 'e2', date: '2026/02/05', oppositeAccount: 'الصندوق', amount: 18000, type: 'credit' as const }
      ];

      render(
        <TAccount
          accountName="حساب الدائنين"
          category="liability"
          entries={entries}
        />
      );

      expect(screen.getByText('5,000')).toBeInTheDocument();
      expect(screen.getByText('18,000')).toBeInTheDocument();

      // Credit > Debit (18,000 > 5,000) -> Balancing figure in debit side (13,000)
      const debitBalancing = screen.getByTestId('balancing-figure-debit');
      expect(debitBalancing).toBeInTheDocument();
      expect(debitBalancing).toHaveTextContent('13,000');
      expect(debitBalancing).toHaveTextContent('رصيد مرحل (دائن)');
    });

    it('triggers onDeleteEntry callback when delete button is clicked', () => {
      const onDelete = vi.fn();
      const debitEntries = [
        { id: 'entry-to-delete', date: '2026/01/01', oppositeAccount: 'المبيعات', amount: 10000 }
      ];

      render(
        <TAccount
          accountName="حساب البنك"
          debitEntries={debitEntries}
          onDeleteEntry={onDelete}
        />
      );

      const deleteBtn = screen.getByTitle('حذف القيد');
      fireEvent.click(deleteBtn);

      expect(onDelete).toHaveBeenCalledWith('entry-to-delete', 'debit');
    });

    it('triggers onBalanceCalculated callback with accurate calculations object', () => {
      const onCalculated = vi.fn();
      const debitEntries = [{ amount: 40000 }];
      const creditEntries = [{ amount: 15000 }];

      render(
        <TAccount
          accountName="حساب السيارات"
          debitEntries={debitEntries}
          creditEntries={creditEntries}
          onBalanceCalculated={onCalculated}
        />
      );

      expect(onCalculated).toHaveBeenCalledWith(
        expect.objectContaining({
          totalDebits: 40000,
          totalCredits: 15000,
          higherTotal: 40000,
          difference: 25000,
          balanceAmount: 25000,
          balanceType: 'debit',
          isBalanced: false
        })
      );
    });

    it('toggles pedagogical explanation when info button is pressed', () => {
      render(<TAccount accountName="حساب الأستاذ العام" />);

      expect(screen.queryByText(/قاعدة الترصيد في الدفاتر/)).not.toBeInTheDocument();

      const infoBtn = screen.getByLabelText('شرح آلية الترصيد');
      fireEvent.click(infoBtn);

      expect(screen.getByText(/قاعدة الترصيد في الدفاتر/)).toBeInTheDocument();
    });
  });
});
