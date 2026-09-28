import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { FocusModeProvider } from './context/FocusModeContext';
import { CurriculumFilterProvider } from './context/CurriculumFilterContext';
import { AppRoutes } from './app/AppRoutes';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FocusModeProvider>
          <CurriculumFilterProvider>
            <AppRoutes />
          </CurriculumFilterProvider>
        </FocusModeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

