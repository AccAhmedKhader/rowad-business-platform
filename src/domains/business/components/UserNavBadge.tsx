import React, { useState, useRef, useEffect } from 'react';
import { 
  Flame, 
  Sparkles, 
  ChevronDown, 
  UserCheck, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Users, 
  Award,
  Settings,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { UserRole } from '../types';

export const UserNavBadge: React.FC = () => {
  const { 
    user, 
    allUsers, 
    levelInfo, 
    switchUser, 
    switchRole, 
    setOpenUserModal, 
    setActiveUserModalTab 
  } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'teacher':
        return { label: 'معلم أول / موجه', bg: 'bg-amber-100 text-amber-800 border-amber-300', icon: Briefcase };
      case 'parent':
        return { label: 'ولي أمر متابع', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300', icon: Users };
      case 'auditor':
        return { label: 'مشرف جودة وحوكمة', bg: 'bg-purple-100 text-purple-800 border-purple-300', icon: ShieldCheck };
      case 'student':
      default:
        return { label: 'طالب البكالوريا', bg: 'bg-indigo-100 text-indigo-800 border-indigo-300', icon: GraduationCap };
    }
  };

  const roleInfo = getRoleBadge(user.role);
  const RoleIcon = roleInfo.icon;

  return (
    <div className="relative font-['Cairo']" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setDropdownOpen(prev => !prev)}
        className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 transition-all shadow-2xs hover:shadow-xs group cursor-pointer"
        title="الملف الشخصي ومركز المستخدم"
      >
        {/* Avatar with Level Ring */}
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-indigo-600 to-purple-600 p-[1.5px] shadow-xs">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-sm font-bold select-none">
              {user.avatar || '🎓'}
            </div>
          </div>
          <span className="absolute -bottom-1 -left-1 bg-amber-500 text-slate-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-2xs">
            {levelInfo.level}
          </span>
        </div>

        {/* User Details (Desktop) */}
        <div className="hidden lg:flex flex-col text-right leading-tight">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-slate-800 max-w-[110px] truncate">
              {user.name}
            </span>
            <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-sm border ${roleInfo.bg}`}>
              {roleInfo.label.split('/')[0]}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
            <span className="flex items-center gap-0.5 text-amber-600 font-bold">
              <Sparkles className="w-3 h-3 text-amber-500" />
              {user.gamification.xp} XP
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-0.5 text-orange-600 font-bold" title="أيام الحماسة المتواصلة">
              <Flame className="w-3 h-3 text-orange-500 animate-pulse" />
              {user.studyStreak.currentDays} يوم
            </span>
          </div>
        </div>

        {/* Streak Flame Only (Mobile / Tablet) */}
        <div className="flex lg:hidden items-center gap-1 text-[11px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-md">
          <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-400" />
          <span>{user.studyStreak.currentDays}</span>
        </div>

        <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform" />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          
          {/* Dropdown Header Card */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl shadow-inner">
                  {user.avatar}
                </div>
                <div>
                  <h4 className="font-black text-sm text-white">{user.name}</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[11px] text-amber-300 font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {levelInfo.title} (مستوى {levelInfo.level})
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-orange-400 font-black text-xs bg-orange-950/60 border border-orange-500/30 px-2 py-0.5 rounded-full">
                  <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-400" />
                  <span>{user.studyStreak.currentDays} أيام 🔥</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1">
                  درع التجميد: {user.studyStreak.freezeTokens} 🛡️
                </span>
              </div>
            </div>

            {/* Level XP Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-slate-300 font-bold mb-1">
                <span>التقدم للمستوى التالي</span>
                <span>{user.gamification.xp} / {levelInfo.nextLevelXP} XP ({levelInfo.progressPercent}%)</span>
              </div>
              <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden border border-slate-700">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${Math.min(100, Math.max(5, levelInfo.progressPercent))}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Actions List */}
          <div className="p-2 border-b border-slate-100">
            <button
              onClick={() => {
                setActiveUserModalTab('overview');
                setOpenUserModal(true);
                setDropdownOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-right group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    مركز التعلم الشامل للمستخدم
                  </div>
                  <div className="text-[10px] text-slate-500">
                    التحليلات، الأوسمة، وخطة المذاكرة الذكية
                  </div>
                </div>
              </div>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full">
                فتح
              </span>
            </button>

            <button
              onClick={() => {
                setActiveUserModalTab('mistakes');
                setOpenUserModal(true);
                setDropdownOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-right group mt-1"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 group-hover:text-rose-600 transition-colors">
                    دفتر الأخطاء الذكي
                  </div>
                  <div className="text-[10px] text-slate-500">
                    مراجعة وتصحيح المفاهيم التي تعثرت بها
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                user.mistakeNotebook.filter(m => !m.resolved).length > 0
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {user.mistakeNotebook.filter(m => !m.resolved).length} معلقة
              </span>
            </button>

            <button
              onClick={() => {
                setActiveUserModalTab('planner');
                setOpenUserModal(true);
                setDropdownOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-right group mt-1"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
                    المخطط الدراسي والمهام
                  </div>
                  <div className="text-[10px] text-slate-500">
                    جدول الوحدات والعد التنازلي لامتحانات 2027
                  </div>
                </div>
              </div>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                10 وحدات
              </span>
            </button>
          </div>

          {/* Quick Persona Switcher Section */}
          <div className="p-3 bg-slate-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black text-slate-600 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                تبديل الهوية والدور التعليمي:
              </span>
              <button
                onClick={() => {
                  setActiveUserModalTab('roles');
                  setOpenUserModal(true);
                  setDropdownOpen(false);
                }}
                className="text-[10px] text-indigo-600 hover:underline font-bold"
              >
                إدارة الحسابات
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {allUsers.slice(0, 4).map(u => {
                const isSelected = u.id === user.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => {
                      switchUser(u.id);
                      setDropdownOpen(false);
                    }}
                    className={`flex items-center gap-2 p-2 rounded-xl text-right transition-all border text-xs font-bold ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span className="text-base select-none shrink-0">{u.avatar}</span>
                    <div className="truncate">
                      <div className="text-[11px] truncate">{u.name}</div>
                      <div className={`text-[9px] truncate ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {u.role === 'teacher' ? 'معلم أول' : u.role === 'parent' ? 'ولي أمر' : u.role === 'auditor' ? 'مشرف جودة' : 'طالب'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dropdown Footer */}
          <div className="p-2.5 bg-white border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400 text-[10px]">
              نظام المستخدمين الموحد V2 • منصة رواد
            </span>
            <button
              onClick={() => {
                setActiveUserModalTab('roles');
                setOpenUserModal(true);
                setDropdownOpen(false);
              }}
              className="text-slate-600 hover:text-slate-900 font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Settings className="w-3 h-3" />
              <span>الإعدادات</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
