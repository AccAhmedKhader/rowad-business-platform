import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MethodologyReportModal } from '../MethodologyReportModal';

describe('MethodologyReportModal Component (10 Units Coverage)', () => {
  it('does not render when isOpen is false', () => {
    const { container } = render(
      <MethodologyReportModal isOpen={false} onClose={vi.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders correctly when open and displays 10 unit navigation pills', () => {
    render(
      <MethodologyReportModal isOpen={true} onClose={vi.fn()} initialUnitId="unit-1" />
    );

    expect(screen.getByText(/تقرير التحليل المنهجي وجدول المطابقة الرسمية/i)).toBeInTheDocument();
    expect(screen.getByText(/10 وحدات معتمدة 100%/i)).toBeInTheDocument();

    // Verify presence of unit pills
    for (let i = 1; i <= 10; i++) {
      expect(screen.getByText(`وحدة ${i}`)).toBeInTheDocument();
    }
  });

  it('switches between unit detail and master matrix view', () => {
    render(
      <MethodologyReportModal isOpen={true} onClose={vi.fn()} initialUnitId="unit-4" />
    );

    // Click on Master Matrix View
    const masterMatrixBtn = screen.getByRole('button', { name: /جدول المطابقة الشامل/i });
    fireEvent.click(masterMatrixBtn);

    expect(screen.getByText(/جدول المطابقة المنهجية الشامل لمنهاج المحاسبة المالية/i)).toBeInTheDocument();
    expect(screen.getByText(/مصفوفة الاعتماد الرسمية الكاملة/i)).toBeInTheDocument();

    // Should display Unit 10 and Unit 4 rows in table
    expect(screen.getByText(/تحليل القوائم المالية وتفسير النسب/i)).toBeInTheDocument();
    expect(screen.getByText(/ميزان المراجعة وتصحيح الأخطاء/i)).toBeInTheDocument();
  });

  it('allows navigating directly to any unit from unit 1 to unit 10', () => {
    render(
      <MethodologyReportModal isOpen={true} onClose={vi.fn()} initialUnitId="unit-1" />
    );

    // Switch to Unit 7
    const unit7Btn = screen.getByText('وحدة 7');
    fireEvent.click(unit7Btn);

    expect(screen.getByText(/الوحدة السابعة: الإهلاك والمخصصات/i)).toBeInTheDocument();
    expect(screen.getByText(/كتاب الطالب - المحاسبة - البكالوريا المصرية - الصف الثاني \(الصفحات 21 إلى 44\)/i)).toBeInTheDocument();

    // Switch to Unit 10
    const unit10Btn = screen.getByText('وحدة 10');
    fireEvent.click(unit10Btn);

    expect(screen.getByText(/الوحدة العاشرة: تحليل القوائم المالية وتفسير النسب/i)).toBeInTheDocument();
  });

  it('triggers onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <MethodologyReportModal isOpen={true} onClose={handleClose} />
    );

    const closeBtn = screen.getByLabelText(/إغلاق التقرير/i);
    fireEvent.click(closeBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
