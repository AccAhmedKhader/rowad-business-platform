import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { BookCover } from '../BookCover';
import { BookTableOfContents, unitsTableOfContents } from '../BookTableOfContents';
import { PrintLessonContent } from '../PrintLessonContent';
import { PrintView } from '../../PrintView';
import { lesson1 } from '../../../data/lesson1';

describe('Print Publication & Book Structure (Al-Moasser / Al-Emtehan standard)', () => {
  it('renders the luxury front cover with ministerial credentials and EB curriculum titles', () => {
    render(
      <MemoryRouter>
        <BookCover selectedUnitId="all" editionTitle="نسخة الطالب الشاملة" />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/جمهورية مصر العربية/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/وزارة التربية والتعليم والتعليم الفني/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/المحاسبة المالية/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/ببساطة وإتقان/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/10 وحدات و 58 درساً/i)).toBeInTheDocument();
    expect(screen.getByText(/دليل استدلال JRE/i)).toBeInTheDocument();
  });

  it('renders the Table of Contents divided systematically into all 10 units', () => {
    expect(unitsTableOfContents).toHaveLength(10);

    render(
      <MemoryRouter>
        <BookTableOfContents selectedUnitId="all" />
      </MemoryRouter>
    );

    expect(screen.getByText(/فهرس المحتويات العام للمنهاج المعتمد/i)).toBeInTheDocument();
    
    // Validate each unit title is rendered
    unitsTableOfContents.forEach(unit => {
      expect(screen.getByText(unit.title)).toBeInTheDocument();
      expect(screen.getByText(unit.pageRange)).toBeInTheDocument();
    });
  });

  it('renders interactive lesson elements in print format: hook story, caution boxes, key insights, and solved examples', () => {
    render(
      <MemoryRouter>
        <PrintLessonContent 
          lesson={lesson1} 
          showSolutions={true} 
          isTeacherEdition={false} 
          unitTitle="الوحدة الأولى"
        />
      </MemoryRouter>
    );

    expect(screen.getByText(lesson1.title)).toBeInTheDocument();
    expect(screen.getByText(/مدخل واقعي من بيئة الأعمال/i)).toBeInTheDocument();
    expect(screen.getByText(/محطة مقال الاستدلال المحاسبي \(JRE\)/i)).toBeInTheDocument();
    expect(screen.getByText(/20 درجة كاملة/i)).toBeInTheDocument();
  });

  it('renders PrintView master page with toolbar and publication canvas', () => {
    render(
      <MemoryRouter>
        <PrintView onBack={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText(/طباعة \/ حفظ PDF/i)).toBeInTheDocument();
    expect(screen.getByText(/الكتاب كاملاً \(جميع الوحدات العشر 1 - 10\)/i)).toBeInTheDocument();
    expect(screen.getByText(/نسخة الطالب المتكاملة \(Student Edition\)/i)).toBeInTheDocument();
  });
});
