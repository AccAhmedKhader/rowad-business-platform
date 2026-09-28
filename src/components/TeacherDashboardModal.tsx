import React from 'react';
import { X } from 'lucide-react';
import { TeacherCohortCenter } from './teacher/TeacherCohortCenter';

interface TeacherDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherDashboardModal: React.FC<TeacherDashboardModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#1D1D1B]/75 backdrop-blur-xs font-serif animate-in fade-in duration-200">
      <div className="bg-[#F9F7F2] border-2 border-[#1D1D1B] w-full max-w-7xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="bg-[#1D1D1B] text-[#F9F7F2] px-6 py-3 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="bg-[#C4A484] text-[#1D1D1B] font-black text-xs px-2 py-0.5">
              EB TEACHER v2.0
            </span>
            <span className="text-sm font-bold text-white">
              نافذة تحليلات المعلم والأداء المعياري الصفي
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 transition text-white cursor-pointer rounded-xs"
            title="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Center Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <TeacherCohortCenter />
        </div>

      </div>
    </div>
  );
};

