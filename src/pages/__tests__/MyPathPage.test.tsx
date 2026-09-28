import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { MyPathPage } from '../MyPathPage';
import { apiClient } from '../../api/apiClient';
import { AuthContext, AuthContextType } from '../../context/AuthContext';

vi.mock('../../api/apiClient', () => ({
  apiClient: {
    request: vi.fn(),
  },
}));

const mockAuth: AuthContextType = {
  user: { id: 'u1', email: 'test@student.eb', role: 'STUDENT', status: 'ACTIVE', full_name: 'طالب اختباري' },
  role: 'STUDENT',
  isAuthenticated: true,
  isLoading: false,
  isAuthModalOpen: false,
  setIsAuthModalOpen: vi.fn(),
  login: vi.fn(),
  register: vi.fn(),
  quickSwitchRole: vi.fn(),
  logout: vi.fn(),
  refreshProfile: vi.fn(),
};

describe('Section 11 Gate 7: MyPathPage (Adaptive Mastery & Dashboard) Suite', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders MyPathPage header and all four essential subnavigation tabs', async () => {
    render(
      <AuthContext.Provider value={mockAuth}>
        <MemoryRouter initialEntries={['/my-path']}>
          <Routes>
            <Route path="/my-path/*" element={<MyPathPage />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/مركز تقدم وإتقان الطالب/i)).toBeInTheDocument();
    expect(screen.getByText('لوحة التقدم والرسوم البيانية')).toBeInTheDocument();
    expect(screen.getByText('مؤشرات الإتقان السيكومتري')).toBeInTheDocument();
    expect(screen.getByText('التوصيات العلاجية التكيفية')).toBeInTheDocument();
    expect(screen.getByText('مشروع التخرج وملف الإنجاز')).toBeInTheDocument();
  });

  it('renders student dashboard view by default at /my-path', async () => {
    render(
      <AuthContext.Provider value={mockAuth}>
        <MemoryRouter initialEntries={['/my-path']}>
          <Routes>
            <Route path="/my-path/*" element={<MyPathPage />} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/لوحة إتقان الطالب ومتابعة الدروس والاختبارات/i)).toBeInTheDocument();
    });
  });
});
