import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Brain, Target, Award, BarChart2, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { StudentDashboardView } from '../components/dashboard/StudentDashboardView';
import { PsychometricMasteryView } from '../components/dashboard/PsychometricMasteryView';
import { AdaptiveRemediationStudio } from '../components/dashboard/AdaptiveRemediationStudio';
import { AccountingCapstoneStudio } from '../components/capstone/AccountingCapstoneStudio';

export const MyPathPage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  const activeSubTab = path.includes('/mastery')
    ? 'mastery'
    : path.includes('/recommendations')
    ? 'recommendations'
    : path.includes('/capstone')
    ? 'capstone'
    : 'progress';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 font-serif" dir="rtl">
      {/* Subnav Pills */}
      <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-4 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1D1D1B] text-[#C4A484] flex items-center justify-center font-bold">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-extrabold text-base text-[#1D1D1B]">
              مركز تقدم وإتقان الطالب (Student Progress & Mastery Hub)
            </h2>
            <p className="text-xs text-[#1D1D1B]/60">
              متابعة الدروس المكتملة، درجات الاختبارات، وتوصيات التعلم التكيفي ومشروع التخرج
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <NavLink
            to="/my-path"
            className={({ isActive }) => 
              `px-3.5 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isActive && !path.includes('/mastery') && !path.includes('/recommendations') && !path.includes('/capstone')
                  ? 'bg-[#1D1D1B] text-[#F9F7F2]'
                  : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15'
              }`
            }
          >
            <Target className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>لوحة التقدم والرسوم البيانية</span>
          </NavLink>

          <NavLink
            to="/my-path/mastery"
            className={({ isActive }) => 
              `px-3.5 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-[#1D1D1B] text-[#F9F7F2]'
                  : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15'
              }`
            }
          >
            <Award className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>مؤشرات الإتقان السيكومتري</span>
          </NavLink>

          <NavLink
            to="/my-path/recommendations"
            className={({ isActive }) => 
              `px-3.5 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-[#1D1D1B] text-[#F9F7F2]'
                  : 'bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15'
              }`
            }
          >
            <Brain className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>التوصيات العلاجية التكيفية</span>
          </NavLink>

          <NavLink
            to="/my-path/capstone"
            className={({ isActive }) => 
              `px-3.5 py-1.5 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-[#8A1F1D] text-white shadow-xs'
                  : 'bg-[#C4A484]/20 text-[#1D1D1B] hover:bg-[#C4A484]/40 border border-[#C4A484]'
              }`
            }
          >
            <Building2 className="w-3.5 h-3.5 text-[#C4A484]" />
            <span className="font-extrabold">مشروع التخرج وملف الإنجاز</span>
          </NavLink>
        </div>
      </div>

      {/* Primary Content Switched Based on Active SubTab */}
      {activeSubTab === 'mastery' ? (
        <PsychometricMasteryView />
      ) : activeSubTab === 'recommendations' ? (
        <AdaptiveRemediationStudio />
      ) : activeSubTab === 'capstone' ? (
        <AccountingCapstoneStudio />
      ) : (
        <StudentDashboardView />
      )}
    </div>
  );
};
