import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from '../HomePage';

describe('Section 11 Gate 2: HomePage Suite', () => {
  it('renders the official EB Accounting Platform hero cover successfully', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/الكفاءة تعزّز الدقة|ببساطة وإتقان/i)).toBeInTheDocument();
    expect(screen.getByText(/المحاسبة المالية للبكالوريا المصرية/i)).toBeInTheDocument();
  });

  it('provides accessible call-to-action buttons', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const startButton = screen.getByRole('button', { name: /ابدأ (دراسة|تصفح)/i });
    expect(startButton).toBeInTheDocument();
    expect(startButton).toBeEnabled();
  });
});
