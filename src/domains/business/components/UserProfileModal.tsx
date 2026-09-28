import React, { useState } from 'react';
import { 
  X, 
  User, 
  GraduationCap, 
  Flame, 
  Sparkles, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  BarChart3, 
  Calendar, 
  Target, 
  Layers, 
  Bookmark, 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  ShieldCheck, 
  Users, 
  Briefcase, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Lock,
  Unlock,
  Download,
  Share2,
  Search,
  Filter,
  UserPlus,
  UserCheck,
  UserX,
  FileSpreadsheet,
  ShieldAlert,
  History,
  Key,
  Check,
  AlertCircle
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { UserRole, UserBadge, MistakeItem } from '../types';
import { ALL_UNITS } from '../data/unitsData';
import { lmsService, ROLE_PERMISSION_RULES } from '../services/lmsService';

interface UserProfileModalProps {
  onNavigateToTab?: (tab: any) => void;
  onSelectUnit?: (unitNumber: number) => void;
}

const AVATAR_OPTIONS = ['🎓', '👨‍🏫', '👨‍👩‍👧', '🛡️', '💼', '🚀', '🌟', '🧠', '🏛️', '💡', '📊', '🦁'];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  onNavigateToTab,
  onSelectUnit
}) => {
  const { 
    user, 
    allUsers, 
    levelInfo, 
    openUserModal, 
    setOpenUserModal,
    activeUserModalTab,
    setActiveUserModalTab,
    unitLocks,
    isPrerequisiteEnabled,
    setPrerequisiteEnabled,
    toggleUnitLock,
    checkUnitAccessStatus,
    getBestQuizScoreForUnit,
    hasPermission,
    switchUser,
    createUser,
    deleteUser,
    updateUserStatus,
    updateUserRole,
    updateUserCustomPermissions,
    exportEnterpriseRosterJson,
    importEnterpriseRosterJson,
    auditLogs,
    updateProfile,
    switchRole,
    claimDailyQuest,
    savePersonalNote,
    deletePersonalNote,
    resolveMistake,
    updateStudyPlan
  } = useUser();

  // Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'mistakes' | 'notes_bookmarks' | 'planner' | 'badges' | 'roles' | 'permissions'>(
    activeUserModalTab === 'badges' ? 'badges' : 
    activeUserModalTab === 'mistakes' ? 'mistakes' : 
    activeUserModalTab === 'planner' ? 'planner' : 
    activeUserModalTab === 'roles' ? 'roles' : 
    activeUserModalTab === 'permissions' ? 'permissions' :
    activeUserModalTab === 'analytics' ? 'analytics' : 'overview'
  );

  // Note creation form state
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteUnit, setNewNoteUnit] = useState(1);
  const [newNoteTag, setNewNoteTag] = useState('');

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editSchool, setEditSchool] = useState(user.school || '');
  const [editTrack, setEditTrack] = useState(user.track);
  const [editAvatar, setEditAvatar] = useState(user.avatar);
  const [editDailyGoal, setEditDailyGoal] = useState(user.dailyGoalQuestions || 10);

  // New Profile Form State
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [createName, setCreateName] = useState('');
  const [createRole, setCreateRole] = useState<UserRole>('student');
  const [createAvatar, setCreateAvatar] = useState('🎓');
  const [createEmail, setCreateEmail] = useState('');
  const [createPhone, setCreatePhone] = useState('');
  const [createTag, setCreateTag] = useState('شعبة 2/1 المتفوقين');

  // Enterprise Roster Search & Filter State
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | UserRole>('all');
  const [userStatusFilter, setUserStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [editingPermissionsUserId, setEditingPermissionsUserId] = useState<string | null>(null);

  // Mistake Filter State
  const [mistakeFilter, setMistakeFilter] = useState<'all' | 'unresolved' | 'resolved'>('unresolved');

  // Mastery & Analytics Calculations
  const masteryItems = lmsService.calculateMastery();
  const bloomStats = lmsService.getCognitiveBloomStats();
  const progress = lmsService.getProgress();
  const totalAnswered = Object.keys(progress.answeredQuestions).length;
  const correctCount = Object.values(progress.answeredQuestions).filter(a => a.isCorrect).length;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  if (!openUserModal) return null;

  const handleSaveProfile = () => {
    updateProfile({
      name: editName.trim() || user.name,
      school: editSchool.trim() || user.school,
      track: editTrack.trim() || user.track,
      avatar: editAvatar,
      dailyGoalQuestions: Number(editDailyGoal) || 10
    });
    setIsEditingProfile(false);
  };

  const handleCreateNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createName.trim()) return;
    createUser({
      name: createName.trim(),
      role: createRole,
      avatar: createAvatar,
      email: createEmail.trim() || undefined,
      phone: createPhone.trim() || undefined,
      tags: createTag.trim() ? [createTag.trim()] : ['دفعة 2027']
    });
    setIsCreatingUser(false);
    setCreateName('');
    setCreateEmail('');
    setCreatePhone('');
  };

  const filteredUsers = allUsers.filter(u => {
    if (userRoleFilter !== 'all' && u.role !== userRoleFilter) return false;
    if (userStatusFilter !== 'all' && (u.status || 'active') !== userStatusFilter) return false;
    if (userSearchQuery.trim()) {
      const q = userSearchQuery.trim().toLowerCase();
      const matchName = u.name.toLowerCase().includes(q);
      const matchUsername = u.username.toLowerCase().includes(q);
      const matchEmail = (u.email || '').toLowerCase().includes(q);
      const matchSchool = (u.school || '').toLowerCase().includes(q);
      const matchTag = (u.tags || []).some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchUsername && !matchEmail && !matchSchool && !matchTag) return false;
    }
    return true;
  });

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    savePersonalNote({
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      unitNumber: newNoteUnit,
      tags: newNoteTag ? [newNoteTag.trim()] : ['ملاحظة دراسية']
    });
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteTag('');
    setIsAddingNote(false);
  };

  const filteredMistakes = user.mistakeNotebook.filter(m => {
    if (mistakeFilter === 'unresolved') return !m.resolved;
    if (mistakeFilter === 'resolved') return m.resolved;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 font-['Cairo'] animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden my-auto">
        
        {/* Modal Top Bar */}
        <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 border-b border-indigo-500/20">
          <button
            onClick={() => setOpenUserModal(false)}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pr-2">
            
            {/* User Identity Info */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-indigo-500 to-purple-600 p-[2.5px] shadow-lg">
                  <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center text-3xl sm:text-4xl shadow-inner select-none">
                    {user.avatar}
                  </div>
                </div>
                <span className="absolute -bottom-2 -left-2 bg-amber-500 text-slate-950 font-black text-xs px-2 py-0.5 rounded-full border-2 border-slate-900 shadow-md">
                  مستوى {levelInfo.level}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black text-white">{user.name}</h2>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    user.role === 'teacher' ? 'bg-amber-500/20 text-amber-300 border-amber-400/40' :
                    user.role === 'parent' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' :
                    user.role === 'auditor' ? 'bg-purple-500/20 text-purple-300 border-purple-400/40' :
                    'bg-indigo-500/20 text-indigo-300 border-indigo-400/40'
                  }`}>
                    {user.role === 'teacher' ? '👨‍🏫 معلم أول / موجه' :
                     user.role === 'parent' ? '👨‍👩‍👧 ولي أمر متابع' :
                     user.role === 'auditor' ? '🛡️ مشرف جودة وحوكمة' :
                     '🎓 طالب البكالوريا 2027'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300">
                  {user.grade} • {user.school || 'مدرسة المتفوقين'}
                </p>

                <div className="flex items-center gap-3 text-xs text-slate-300 pt-1">
                  <span className="flex items-center gap-1 text-amber-400 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    {levelInfo.title}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-orange-400 font-bold">
                    <Flame className="w-3.5 h-3.5 fill-orange-400" />
                    {user.studyStreak.currentDays} أيام متواصلة 🔥
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Pills & Level XP Bar */}
            <div className="flex flex-col sm:items-end justify-center gap-2 bg-white/5 border border-white/10 rounded-2xl p-3.5 min-w-[240px]">
              <div className="flex items-center justify-between w-full text-xs font-bold text-slate-200">
                <span className="text-amber-400">نقاط الخبرة (XP)</span>
                <span>{user.gamification.xp} / {levelInfo.nextLevelXP} XP</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
                <div 
                  className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(5, levelInfo.progressPercent))}%` }}
                />
              </div>
              <div className="flex items-center justify-between w-full text-[11px] text-slate-400 mt-1">
                <span>المستوى القادم: {levelInfo.level + 1}</span>
                <span className="text-emerald-400 font-bold">متبقي {Math.max(0, levelInfo.nextLevelXP - user.gamification.xp)} XP</span>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2">
          {[
            { id: 'overview', label: 'نظرة عامة والمسار', icon: Target },
            { id: 'analytics', label: 'مصفوفة الإتقان والتحليلات', icon: BarChart3 },
            { id: 'mistakes', label: 'دفتر الأخطاء الذكي', icon: AlertTriangle, badge: user.mistakeNotebook.filter(m => !m.resolved).length },
            { id: 'notes_bookmarks', label: 'الملاحظات والمحفوظات', icon: Bookmark },
            { id: 'planner', label: 'المخطط الدراسي 2027', icon: Calendar },
            { id: 'badges', label: 'قاعة الأوسمة والشارات', icon: Award, badge: user.gamification.badges.filter(b => b.unlockedAt).length },
            { id: 'roles', label: 'إدارة الأدوار والحسابات', icon: Users },
            { id: 'permissions', label: 'مصفوفة الصلاحيات وحجب الوحدات 🔐', icon: ShieldCheck }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs font-black'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Daily Quests Banner */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 sm:p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold">
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-amber-950">
                        المهام اليومية وتحديات الإنجاز (Daily Quests)
                      </h3>
                      <p className="text-xs text-amber-800">
                        أكمل المهام التعليمية اليومية لكسب نقاط الخبرة XP وتسريع تقدمك
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-900 bg-amber-200/70 px-2.5 py-1 rounded-full">
                    تتجدد يومياً ⚡
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {user.dailyQuests.map(quest => (
                    <div 
                      key={quest.id}
                      className="bg-white rounded-xl p-3.5 border border-amber-200/80 shadow-2xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-bold mb-1">
                          <span className="text-slate-800">{quest.title}</span>
                          <span className="text-amber-600 flex items-center gap-0.5">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            +{quest.rewardXp} XP
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mb-2">{quest.description}</p>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                        <div className="text-[11px] text-slate-500">
                          التقدم: <strong>{quest.current}</strong> / {quest.target}
                        </div>
                        {quest.claimed ? (
                          <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> تم الاستلام
                          </span>
                        ) : quest.isCompleted ? (
                          <button
                            onClick={() => claimDailyQuest(quest.id)}
                            className="text-[11px] bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold px-3 py-1 rounded-lg shadow-xs transition-transform active:scale-95 cursor-pointer"
                          >
                            استلام المكافأة 🎉
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              if (quest.actionTab && onNavigateToTab) {
                                onNavigateToTab(quest.actionTab);
                                setOpenUserModal(false);
                              }
                            }}
                            className="text-[11px] text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-0.5"
                          >
                            <span>ابدأ الآن</span>
                            <ChevronLeft className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>الأسئلة المنجزة</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900">{totalAnswered}</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-1">
                    {correctCount} إجابة صحيحة ({accuracy}%)
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span>أيام الحماسة</span>
                  </div>
                  <div className="text-2xl font-black text-orange-600">{user.studyStreak.currentDays} أيام</div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    أفضل وتيرة: {user.studyStreak.bestDays} أيام
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-1">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>الأوسمة المكتسبة</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {user.gamification.badges.filter(b => b.unlockedAt).length} / {user.gamification.badges.length}
                  </div>
                  <div className="text-[11px] text-amber-700 font-bold mt-1">
                    أوسمة الإتقان الأكاديمي
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-1">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                    <span>دفتر الأخطاء</span>
                  </div>
                  <div className="text-2xl font-black text-rose-600">
                    {user.mistakeNotebook.filter(m => !m.resolved).length}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    مفاهيم بانتظار التصحيح
                  </div>
                </div>
              </div>

              {/* Next Recommended Learning Step */}
              <div className="bg-gradient-to-r from-indigo-900 to-indigo-950 text-white rounded-2xl p-5 border border-indigo-700/50 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="bg-indigo-500/30 text-indigo-200 text-xs font-bold px-2.5 py-0.5 rounded-full border border-indigo-400/30">
                      💡 الخطوة التالية الموصى بها أكاديمياً
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-white pt-1">
                      {user.mistakeNotebook.some(m => !m.resolved)
                        ? 'مراجعة المفاهيم المعلقة في دفتر الأخطاء الذكي'
                        : 'إتمام مراجعة أسئلة الوحدة 4 (البيئة الداخلية والخارجية) ونموذج التقييم الأسبوعي'}
                    </h4>
                    <p className="text-xs text-indigo-200">
                      بناء على مستوى إتقانك الحالي ومصفوفة نواتج التعلم لمقرر إدارة الأعمال 2026/2027.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (user.mistakeNotebook.some(m => !m.resolved)) {
                        setActiveTab('mistakes');
                      } else if (onNavigateToTab) {
                        onNavigateToTab('question_bank');
                        setOpenUserModal(false);
                      }
                    }}
                    className="bg-white text-indigo-950 hover:bg-indigo-50 font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
                  >
                    الانتقال للمهمة الآن 🚀
                  </button>
                </div>
              </div>

              {/* Role-Specific Perspective Card */}
              <div className="border border-slate-200 bg-slate-50/70 rounded-2xl p-4 sm:p-5">
                <h4 className="font-bold text-sm text-slate-800 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>منظور الحساب الحالي ({user.role === 'teacher' ? 'المعلم الأول' : user.role === 'parent' ? 'ولي الأمر' : user.role === 'auditor' ? 'مشرف الجودة' : 'طالب البكالوريا'}):</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {user.role === 'teacher' ? (
                    'يمكنك من خلال هذا الحساب مراجعة تقارير صعوبة الأسئلة ومتابعة تدرج مستويات بلوم ونواتج التعلم، مع استخراج خطط التدريس ونماذج التقييم الأسبوعي الثلاثة (أ، ب، ج) المعتمدة رسمياً.'
                  ) : user.role === 'parent' ? (
                    'يوفر لك هذا الحساب متابعة شفافة ودقيقة لنسبة إنجاز المهام، ومعدل إتقان نواتج التعلم، مع رصد مباشر للدرجات في التقييمات الأسبوعية وتوصيات الدعم المنزلي المقترحة.'
                  ) : user.role === 'auditor' ? (
                    'يتيح هذا الحساب تدقيق مصفوفة مطابقة نصوص كتاب الوزارة بدقة 100%، والتأكد من توافق كافة بنود التقييم وأسئلة JRE مع القرار الوزاري لنظام البكالوريا 2027.'
                  ) : (
                    'صُممت لوحة الطالب لتمنحك تحكماً كاملاً في رحلة المذاكرة وفق أحدث نظم Gamification العالمية، لتشجيع الالتزام اليومي وإتقان مهارات التفكير العليا وحل أسئلة كتاب الوزارة والاختبارات والتقييمات.'
                  )}
                </p>
              </div>

            </div>
          )}

          {/* TAB 2: ANALYTICS & MASTERY */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              
              {/* Cognitive Bloom Taxonomy Breakdown */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
                <h3 className="font-black text-sm sm:text-base text-slate-900 mb-3 flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-indigo-600" />
                  <span>مصفوفة المستويات الإدراكية والمعرفية (Bloom's Taxonomy):</span>
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {Object.entries(bloomStats).map(([levelName, stat]) => (
                    <div key={levelName} className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
                      <div className="text-xs font-bold text-slate-600 mb-1">{levelName}</div>
                      <div className="text-xl font-black text-indigo-700">{stat.percentage}%</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {stat.correct} / {stat.total} سؤال
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div 
                          className="bg-indigo-600 h-full rounded-full"
                          style={{ width: `${stat.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Units Mastery Radar / Progress */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-sm sm:text-base text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-amber-600" />
                    <span>مؤشر إتقان الوحدات الدراسية (Mastery Model 0 - 4):</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-bold">10 وحدات منهجية</span>
                </div>

                <div className="space-y-3">
                  {ALL_UNITS.map(unit => {
                    const unitMasteries = masteryItems.filter(m => m.unitNumber === unit.number);
                    const avgScore = unitMasteries.length > 0
                      ? unitMasteries.reduce((acc, m) => acc + m.score, 0) / unitMasteries.length
                      : 0;
                    const percent = Math.round((avgScore / 4) * 100);

                    return (
                      <div 
                        key={unit.id}
                        className="p-3 rounded-xl border border-slate-200 hover:border-indigo-300 bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                              الوحدة 0{unit.number}
                            </span>
                            <span className="font-bold text-sm text-slate-800">{unit.title}</span>
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {unit.learningOutcomes?.length || 3} نواتج تعلم أساسية
                          </div>
                        </div>

                        <div className="flex items-center gap-3 min-w-[200px]">
                          <div className="flex-1">
                            <div className="flex justify-between text-[11px] font-bold mb-1">
                              <span className="text-slate-600">نسبة الإتقان</span>
                              <span className="text-indigo-600 font-black">{percent}%</span>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                              <div 
                                className={`h-full rounded-full transition-all duration-500 ${
                                  percent >= 80 ? 'bg-emerald-500' :
                                  percent >= 50 ? 'bg-amber-500' :
                                  percent > 0 ? 'bg-blue-500' : 'bg-slate-300'
                                }`}
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              if (onSelectUnit) onSelectUnit(unit.number);
                              if (onNavigateToTab) onNavigateToTab('book');
                              setOpenUserModal(false);
                            }}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold shrink-0 transition-colors"
                            title="الانتقال للوحدة"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: SMART ERROR NOTEBOOK */}
          {activeTab === 'mistakes' && (
            <div className="space-y-5">
              
              {/* Header & Filter Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-rose-50/70 border border-rose-200 rounded-2xl p-4">
                <div>
                  <h3 className="font-black text-base text-rose-950 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                    <span>دفتر الأخطاء والمفاهيم الذكي (Error Notebook)</span>
                  </h3>
                  <p className="text-xs text-rose-800 mt-0.5">
                    المنصة تقوم تلقائياً بأرشفة أي سؤال أو مفهوم أخطأت به لتمكينك من إعادة حله وتثبيته.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-white border border-rose-200 p-1 rounded-xl shrink-0">
                  <button
                    onClick={() => setMistakeFilter('unresolved')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      mistakeFilter === 'unresolved' ? 'bg-rose-600 text-white font-black' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    معلقة ({user.mistakeNotebook.filter(m => !m.resolved).length})
                  </button>
                  <button
                    onClick={() => setMistakeFilter('resolved')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      mistakeFilter === 'resolved' ? 'bg-emerald-600 text-white font-black' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    تم تجاوزها ({user.mistakeNotebook.filter(m => m.resolved).length})
                  </button>
                  <button
                    onClick={() => setMistakeFilter('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      mistakeFilter === 'all' ? 'bg-slate-800 text-white font-black' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    الكل ({user.mistakeNotebook.length})
                  </button>
                </div>
              </div>

              {/* Mistakes List */}
              {filteredMistakes.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl">
                    ✓
                  </div>
                  <h4 className="font-bold text-slate-800">لا توجد أخطاء في هذا التبويب</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    ممتاز! لم يتم رصد مفاهيم متعثرة غير محلولة. استمر في التدرب وحل النماذج الوزارية.
                  </p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {filteredMistakes.map(item => (
                    <div 
                      key={item.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        item.resolved 
                          ? 'bg-emerald-50/30 border-emerald-200' 
                          : 'bg-white border-rose-200 shadow-2xs hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                            الوحدة 0{item.unitNumber}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {item.questionId}
                          </span>
                        </div>

                        {item.resolved ? (
                          <span className="text-xs font-black text-emerald-700 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> تم تثبيت المفهوم (+30 XP)
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
                            قيد التدريب ({item.attempts} محاولة)
                          </span>
                        )}
                      </div>

                      <div className="font-bold text-sm sm:text-base text-slate-900 mb-3 leading-relaxed">
                        {item.questionText}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                        <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-2.5">
                          <strong className="text-rose-700 block mb-1">❌ إجابتك السابقة:</strong>
                          <span className="text-slate-800">{item.studentWrongAnswer}</span>
                        </div>
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5">
                          <strong className="text-emerald-700 block mb-1">✅ الإجابة النموذجية المعتمدة:</strong>
                          <span className="text-emerald-950 font-bold">{item.correctAnswer}</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 mb-3">
                        <strong className="text-slate-900 block mb-0.5">💡 التبرير العلمي والشرح البيداغوجي:</strong>
                        <p className="leading-relaxed">{item.explanation}</p>
                      </div>

                      {!item.resolved && (
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                          <button
                            onClick={() => resolveMistake(item.id)}
                            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>فهمت المفهوم واعتمدت الحل (+30 XP)</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* TAB 4: NOTES & BOOKMARKS */}
          {activeTab === 'notes_bookmarks' && (
            <div className="space-y-6">
              
              {/* Personal Notes Section */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    <div>
                      <h3 className="font-black text-sm sm:text-base text-slate-900">
                        مفكرة الملاحظات الدراسية الشخصية ({user.personalNotes.length})
                      </h3>
                      <p className="text-xs text-slate-500">سجل استنتاجاتك وقواعد الحل الذهبية لكل وحدة</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsAddingNote(prev => !prev)}
                    className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ملاحظة جديدة</span>
                  </button>
                </div>

                {isAddingNote && (
                  <form onSubmit={handleCreateNote} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الملاحظة:</label>
                        <input
                          type="text"
                          value={newNoteTitle}
                          onChange={e => setNewNoteTitle(e.target.value)}
                          placeholder="مثال: قاعدة تمييز تكاليف الإنتاج..."
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">الوحدة الدراسية:</label>
                        <select
                          value={newNoteUnit}
                          onChange={e => setNewNoteUnit(Number(e.target.value))}
                          className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                        >
                          {ALL_UNITS.map(u => (
                            <option key={u.number} value={u.number}>الوحدة {u.number}: {u.title}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">نص الملاحظة والاستنتاج:</label>
                      <textarea
                        rows={3}
                        value={newNoteContent}
                        onChange={e => setNewNoteContent(e.target.value)}
                        placeholder="اكتب ملاحظاتك بأسلوبك الخاص..."
                        className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <input
                        type="text"
                        value={newNoteTag}
                        onChange={e => setNewNoteTag(e.target.value)}
                        placeholder="وسم اختياري (مثال: فخ امتحاني)"
                        className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 w-48"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingNote(false)}
                          className="text-xs text-slate-500 hover:text-slate-800 px-3 py-1.5"
                        >
                          إلغاء
                        </button>
                        <button
                          type="submit"
                          className="bg-indigo-600 text-white font-bold text-xs px-4 py-1.5 rounded-xl hover:bg-indigo-700 shadow-xs"
                        >
                          حفظ الملاحظة
                        </button>
                      </div>
                    </div>
                  </form>
                )}

                {user.personalNotes.length === 0 ? (
                  <div className="text-center py-6 text-slate-400 text-xs">
                    لم تدون أي ملاحظات بعد. اضغط على "ملاحظة جديدة" لتدوين خلاصاتك.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {user.personalNotes.map(n => (
                      <div key={n.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] font-black text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-md">
                              الوحدة 0{n.unitNumber}
                            </span>
                            <button
                              onClick={() => deletePersonalNote(n.id)}
                              className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                              title="حذف الملاحظة"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 mb-1">{n.title}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed mb-3 whitespace-pre-line">{n.content}</p>
                        </div>
                        <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-200 text-[10px]">
                          {n.tags?.map((t, idx) => (
                            <span key={idx} className="bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md font-bold">
                              #{t}
                            </span>
                          ))}
                          <span className="text-slate-400 mr-auto">
                            {new Date(n.updatedAt).toLocaleDateString('ar-EG')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bookmarked Items Section */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
                <div className="flex items-center gap-2 mb-4">
                  <Bookmark className="w-5 h-5 text-amber-600" />
                  <div>
                    <h3 className="font-black text-sm sm:text-base text-slate-900">
                      العناصر والبطاقات المحفوظة بالمفضلة ({user.bookmarks.length})
                    </h3>
                    <p className="text-xs text-slate-500">وصول سريع للمفاهيم والشواهد الرسمية التي حددتها</p>
                  </div>
                </div>

                {user.bookmarks.length === 0 ? (
                  <div className="text-center py-6 text-slate-400 text-xs">
                    لم تحفظ أي بطاقات بعد. يمكنك الضغط على أيقونة الإشارة المرجعية داخل الدروس لحفظ أي بطاقة هنا.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {user.bookmarks.map(bm => (
                      <div key={bm.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                              الوحدة 0{bm.unitNumber}
                            </span>
                            <span className="text-xs font-bold text-slate-800">{bm.title}</span>
                          </div>
                          {bm.details && <p className="text-[11px] text-slate-500">{bm.details}</p>}
                        </div>

                        <button
                          onClick={() => {
                            if (onSelectUnit) onSelectUnit(bm.unitNumber);
                            if (onNavigateToTab) onNavigateToTab('book');
                            setOpenUserModal(false);
                          }}
                          className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 transition-colors shadow-2xs shrink-0"
                          title="عرض العنصر"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 5: STUDY PLANNER 2027 */}
          {activeTab === 'planner' && (
            <div className="space-y-6">
              
              {/* Planner Header & Pace Selector */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 border border-indigo-500/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-amber-300 bg-amber-500/20 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                      البكالوريا المصرية 2027
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white mt-1">
                      الخطة الزمنية الذكية لاجتياز المنهج والاختبارات النهائية
                    </h3>
                    <p className="text-xs text-slate-300">
                      موزعة على 10 وحدات دراسية بما يغطي الفصلين الدراسيين الأول والثاني
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl border border-white/20 shrink-0">
                    <span className="text-xs font-bold text-slate-300 px-2">الوتيرة:</span>
                    {(['light', 'moderate', 'intensive'] as const).map(pace => (
                      <button
                        key={pace}
                        onClick={() => {
                          updateStudyPlan({
                            ...user.studyPlan,
                            dailyStudyPace: pace,
                            weeklyTargetHours: pace === 'light' ? 5 : pace === 'moderate' ? 8 : 12
                          });
                        }}
                        className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-all ${
                          user.studyPlan.dailyStudyPace === pace
                            ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {pace === 'light' ? 'هادئة (5 س/أسبوع)' : pace === 'moderate' ? 'متوازنة (8 س/أسبوع)' : 'مكثفة (12 س/أسبوع)'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Units Roadmap */}
              <div className="space-y-3">
                {user.studyPlan.unitGoals.map((ug, idx) => (
                  <div 
                    key={ug.unitNumber}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      ug.status === 'completed' ? 'bg-emerald-50/40 border-emerald-200' :
                      ug.status === 'in_progress' ? 'bg-amber-50/40 border-amber-300 shadow-2xs' :
                      'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ${
                        ug.status === 'completed' ? 'bg-emerald-600 text-white' :
                        ug.status === 'in_progress' ? 'bg-amber-500 text-slate-950 animate-pulse' :
                        'bg-slate-200 text-slate-700'
                      }`}>
                        0{ug.unitNumber}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900">{ug.title}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                            ug.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                            ug.status === 'in_progress' ? 'bg-amber-100 text-amber-900' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {ug.status === 'completed' ? 'تم الإنجاز ✓' :
                             ug.status === 'in_progress' ? 'قيد المذاكرة ⏳' : 'بانتظار البدء'}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          الزمن المقترح للمذاكرة: {ug.estimatedHours} ساعات • {ug.unitNumber <= 5 ? 'الترم الأول' : 'الترم الثاني'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={ug.status}
                        onChange={e => {
                          const newGoals = [...user.studyPlan.unitGoals];
                          newGoals[idx] = { ...ug, status: e.target.value as any };
                          updateStudyPlan({ ...user.studyPlan, unitGoals: newGoals });
                        }}
                        className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 cursor-pointer"
                      >
                        <option value="pending">بانتظار البدء</option>
                        <option value="in_progress">قيد المذاكرة</option>
                        <option value="completed">تم الإنجاز</option>
                      </select>

                      <button
                        onClick={() => {
                          if (onSelectUnit) onSelectUnit(ug.unitNumber);
                          if (onNavigateToTab) onNavigateToTab('book');
                          setOpenUserModal(false);
                        }}
                        className="px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors"
                      >
                        فتح الوحدة
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 6: BADGES & AWARDS */}
          {activeTab === 'badges' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-black text-base sm:text-lg text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-600" />
                    <span>سجل الإنجازات والأوسمة التكريمية ({user.gamification.badges.filter(b => b.unlockedAt).length} / {user.gamification.badges.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500">شارات مستحقة تثبت كفاءتك المنهجية والاستدلالية</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {user.gamification.badges.map(badge => {
                  const isUnlocked = !!badge.unlockedAt;
                  const progressPct = Math.round((badge.progress / badge.maxProgress) * 100);

                  return (
                    <div 
                      key={badge.id}
                      className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                        isUnlocked 
                          ? 'bg-gradient-to-b from-white to-amber-50/30 border-amber-300 shadow-xs' 
                          : 'bg-slate-50/60 border-slate-200 opacity-70'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs border ${
                            isUnlocked 
                              ? 'bg-gradient-to-tr from-amber-400 to-amber-200 border-amber-300' 
                              : 'bg-slate-200 border-slate-300 grayscale'
                          }`}>
                            {badge.icon}
                          </div>

                          {isUnlocked ? (
                            <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> تم الفتح
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Lock className="w-3 h-3" /> قيد القفل
                            </span>
                          )}
                        </div>

                        <h4 className="font-black text-sm text-slate-900 mb-1">{badge.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed mb-3">{badge.description}</p>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                          <span>التقدم</span>
                          <span>{badge.progress} / {badge.maxProgress} ({progressPct}%)</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              isUnlocked ? 'bg-amber-500' : 'bg-indigo-500'
                            }`}
                            style={{ width: `${Math.min(100, progressPct)}%` }}
                          />
                        </div>
                        {badge.unlockedAt && (
                          <div className="text-[9px] text-slate-400 mt-2 text-left">
                            تاريخ الاكتساب: {new Date(badge.unlockedAt).toLocaleDateString('ar-EG')}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* TAB 7: ROLES & ACCOUNTS ENGINE (المستوى القياسي لإدارة المستخدمين والحوكمة) */}
          {activeTab === 'roles' && (
            <div className="space-y-6">
              
              {/* Enterprise Header Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 shadow-sm border border-slate-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> مركز إدارة المستخدمين والحوكمة القياسية (Enterprise Directory v2.5)
                      </span>
                      <span className="text-xs text-slate-300">
                        إجمالي الحسابات: <strong className="text-amber-400 font-black">{allUsers.length}</strong> مستخدم مسجل
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black text-white">
                      إدارة هويات منظومة البكالوريا المصرية 2027
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                      إدارة شاملة لجميع أطراف العملية التعليمية (طلاب، معلمون، أولياء أمور، مشرفو جودة). تشمل تعليق الحسابات، ضبط الصلاحيات الفردية، وتوثيق كافة العمليات في سجل التدقيق الأمني المعتمد.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => setShowAuditModal(true)}
                      className="flex items-center gap-1.5 bg-purple-600/90 hover:bg-purple-600 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer shadow-xs border border-purple-400/30"
                      title="سجل التدقيق والحوكمة"
                    >
                      <History className="w-4 h-4" />
                      <span>سجل التدقيق ({auditLogs.length})</span>
                    </button>

                    <button
                      onClick={() => setIsCreatingUser(prev => !prev)}
                      className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black px-4 py-2 rounded-xl transition-all cursor-pointer shadow-md"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>{isCreatingUser ? 'إغلاق النموذج' : 'إضافة مستخدم جديد'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Roster Controls: Search, Filters & Bulk Operations */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  {/* Search Input */}
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={userSearchQuery}
                      onChange={e => setUserSearchQuery(e.target.value)}
                      placeholder="بحث بالاسم، المعرّف، المدرسة أو الوسم..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                    />
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
                      {(['all', 'student', 'teacher', 'parent', 'auditor'] as const).map(role => (
                        <button
                          key={role}
                          onClick={() => setUserRoleFilter(role)}
                          className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer whitespace-nowrap ${
                            userRoleFilter === role
                              ? 'bg-white text-indigo-700 shadow-2xs font-black'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {role === 'all' ? 'الكل' : role === 'student' ? 'طلاب' : role === 'teacher' ? 'معلمون' : role === 'parent' ? 'أولياء أمور' : 'مشرفون'}
                        </button>
                      ))}
                    </div>

                    <select
                      value={userStatusFilter}
                      onChange={e => setUserStatusFilter(e.target.value as any)}
                      className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl px-2.5 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                    >
                      <option value="all">كل الحالات</option>
                      <option value="active">الحسابات النشطة فقط</option>
                      <option value="suspended">الحسابات الموقوفة</option>
                    </select>
                  </div>
                </div>

                {/* Sub-bar with quick stats */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex-wrap gap-2">
                  <span>
                    يتم عرض <strong className="text-slate-900 font-bold">{filteredUsers.length}</strong> من إجمالي <strong className="text-slate-900 font-bold">{allUsers.length}</strong> مستخدم
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      نشط: {allUsers.filter(u => (u.status || 'active') === 'active').length}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      موقوف: {allUsers.filter(u => u.status === 'suspended').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Create Custom Profile Form Modal/Block */}
              {isCreatingUser && (
                <form onSubmit={handleCreateNewUser} className="bg-slate-50 border border-slate-300 rounded-2xl p-5 space-y-4 shadow-sm animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                      <UserPlus className="w-4 h-4 text-indigo-600" />
                      <span>إضافة حساب مستخدم جديد وفق المعايير القياسية:</span>
                    </h4>
                    <span className="text-[11px] text-slate-500">الحساب الجديد سيتم تفعيله فوراً مع منحه 100 XP ووسام البداية</span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">الاسم الكامل رباعياً: <span className="text-rose-500">*</span></label>
                      <input
                        type="text"
                        value={createName}
                        onChange={e => setCreateName(e.target.value)}
                        placeholder="مثال: ياسمين طارق السعدني"
                        className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">الدور التعليمي / الوظيفي: <span className="text-rose-500">*</span></label>
                      <select
                        value={createRole}
                        onChange={e => {
                          const r = e.target.value as UserRole;
                          setCreateRole(r);
                          setCreateAvatar(r === 'teacher' ? '👨‍🏫' : r === 'parent' ? '👨‍👩‍👧' : r === 'auditor' ? '🛡️' : '🎓');
                        }}
                        className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 cursor-pointer font-medium"
                      >
                        <option value="student">🎓 طالب البكالوريا المصرية 2027</option>
                        <option value="teacher">👨‍🏫 معلم أول / موجه تخصصي</option>
                        <option value="parent">👨‍👩‍👧 ولي أمر ومتابع أكاديمي</option>
                        <option value="auditor">🛡️ مشرف جودة وحوكمة المناهج</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">الوسم / الشعبة الدراسية:</label>
                      <input
                        type="text"
                        value={createTag}
                        onChange={e => setCreateTag(e.target.value)}
                        placeholder="مثال: شعبة المتفوقين أو دفعة 2027"
                        className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">البريد الإلكتروني المؤسسي (اختياري):</label>
                      <input
                        type="email"
                        value={createEmail}
                        onChange={e => setCreateEmail(e.target.value)}
                        placeholder="student@rowad-bac2027.edu.eg"
                        className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-left"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">رقم هاتف المتابعة / واتساب (اختياري):</label>
                      <input
                        type="tel"
                        value={createPhone}
                        onChange={e => setCreatePhone(e.target.value)}
                        placeholder="01xxxxxxxxx"
                        className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-left"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">الرمز التعبيري المخصص (Avatar):</label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {AVATAR_OPTIONS.map(emoji => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setCreateAvatar(emoji)}
                          className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center border transition-all cursor-pointer ${
                            createAvatar === emoji
                              ? 'bg-indigo-100 border-indigo-500 shadow-xs ring-2 ring-indigo-400'
                              : 'bg-white border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setIsCreatingUser(false)}
                      className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      إلغاء
                    </button>
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs px-6 py-2.5 rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>تأكيد إنشاء الحساب وحفظه</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Enterprise Users Roster Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.length === 0 ? (
                  <div className="col-span-full bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center space-y-2">
                    <Users className="w-8 h-8 text-slate-400 mx-auto" />
                    <h5 className="font-bold text-slate-700 text-sm">لا توجد نتائج تطابق معايير البحث الحالية</h5>
                    <p className="text-xs text-slate-400">جرب تعديل كلمة البحث أو فلتر الدور التعليمي</p>
                  </div>
                ) : (
                  filteredUsers.map(u => {
                    const isCurrent = u.id === user.id;
                    const isSuspended = u.status === 'suspended';

                    return (
                      <div 
                        key={u.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between relative ${
                          isCurrent
                            ? 'bg-gradient-to-b from-indigo-50/80 via-white to-white border-indigo-500 shadow-sm ring-2 ring-indigo-400/30'
                            : isSuspended
                            ? 'bg-slate-50/90 border-slate-200 opacity-75'
                            : 'bg-white hover:bg-slate-50/70 border-slate-200 shadow-2xs'
                        }`}
                      >
                        {/* Top Badges & Status */}
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2.5">
                              <span className="text-3xl select-none w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
                                {u.avatar}
                              </span>
                              <div>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <h4 className="font-black text-sm text-slate-900 leading-tight">
                                    {u.name}
                                  </h4>
                                  {isCurrent && (
                                    <span className="text-[10px] bg-indigo-600 text-white font-bold px-1.5 py-0.2 rounded-md">
                                      أنت
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-slate-400 font-mono block" dir="ltr">
                                  @{u.username}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${
                                u.role === 'teacher' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                                u.role === 'parent' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                                u.role === 'auditor' ? 'bg-purple-100 text-purple-800 border-purple-300' :
                                'bg-indigo-100 text-indigo-800 border-indigo-300'
                              }`}>
                                {u.role === 'teacher' ? '👨‍🏫 معلم أول' : u.role === 'parent' ? '👨‍👩‍👧 ولي أمر' : u.role === 'auditor' ? '🛡️ مشرف جودة' : '🎓 طالب'}
                              </span>

                              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md flex items-center gap-1 ${
                                isSuspended
                                  ? 'bg-rose-100 text-rose-700'
                                  : 'bg-emerald-50 text-emerald-700'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${isSuspended ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                                {isSuspended ? 'حساب موقوف' : 'نشط ومفعل'}
                              </span>
                            </div>
                          </div>

                          {/* Profile Metadata */}
                          <div className="space-y-1.5 text-xs text-slate-600 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-400">المدرسة / الصف:</span>
                              <span className="font-bold text-slate-700 truncate max-w-[160px]" title={u.school || u.grade}>
                                {u.school || u.grade}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-400">المسار الأكاديمي:</span>
                              <span className="font-bold text-indigo-700 truncate max-w-[160px]" title={u.track}>
                                {u.track}
                              </span>
                            </div>
                            {u.phone && (
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="text-slate-400">رقم الهاتف:</span>
                                <span className="font-mono text-slate-700" dir="ltr">{u.phone}</span>
                              </div>
                            )}
                            <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-200/60">
                              <span className="text-amber-600 font-bold">{u.gamification.xp} XP</span>
                              <span className="text-orange-600 font-bold">{u.studyStreak.currentDays} أيام متواصلة 🔥</span>
                              <span className="text-slate-400 text-[10px]">
                                {u.gamification.badges.filter(b => b.unlockedAt).length} أوسمة
                              </span>
                            </div>
                          </div>

                          {/* Tags if any */}
                          {u.tags && u.tags.length > 0 && (
                            <div className="flex items-center gap-1 flex-wrap mb-3">
                              {u.tags.map(t => (
                                <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                                  #{t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Administrative Actions */}
                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          {/* Main Switch button */}
                          <button
                            onClick={() => switchUser(u.id)}
                            className={`w-full py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-indigo-600 text-white shadow-xs'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                            }`}
                          >
                            {isCurrent ? '✓ الحساب الحالي قيد الاستخدام' : 'التبديل واستخدام هذا الحساب'}
                          </button>

                          {/* Quick Admin Actions (Role update, Suspend/Activate, Delete) */}
                          <div className="flex items-center justify-between gap-1 text-[11px]">
                            {/* Change Role Select */}
                            <select
                              value={u.role}
                              onChange={e => updateUserRole(u.id, e.target.value as UserRole)}
                              className="bg-white border border-slate-200 text-slate-700 text-[11px] font-bold rounded-lg px-2 py-1 focus:outline-hidden cursor-pointer"
                              title="تغيير الدور الوظيفي"
                            >
                              <option value="student">🎓 طالب</option>
                              <option value="teacher">👨‍🏫 معلم</option>
                              <option value="parent">👨‍👩‍👧 ولي أمر</option>
                              <option value="auditor">🛡️ مشرف</option>
                            </select>

                            <div className="flex items-center gap-1">
                              {/* Toggle Status (Suspend / Activate) */}
                              <button
                                onClick={() => updateUserStatus(u.id, isSuspended ? 'active' : 'suspended')}
                                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                  isSuspended
                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100'
                                    : 'bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100'
                                }`}
                                title={isSuspended ? 'تفعيل الحساب' : 'إيقاف الحساب مؤقتاً'}
                              >
                                {isSuspended ? <UserCheck className="w-3.5 h-3.5" /> : <UserX className="w-3.5 h-3.5" />}
                              </button>

                              {/* Delete User (disabled if current) */}
                              {!isCurrent && (
                                <button
                                  onClick={() => {
                                    if (window.confirm(`هل أنت متأكد من حذف حساب (${u.name}) نهائياً؟ هذا الإجراء لا يمكن التراجع عنه.`)) {
                                      const res = deleteUser(u.id);
                                      if (!res.success) alert(res.message);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                                  title="حذف المستخدم نهائياً"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })
                )}
              </div>

              {/* Edit Current Profile Details */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-black text-sm sm:text-base text-slate-900">
                      تعديل بيانات الملف الحالي ({user.name})
                    </h3>
                    <p className="text-xs text-slate-400">تحديث البيانات التعريفية والشخصية للحساب النشط</p>
                  </div>
                  <button
                    onClick={() => setIsEditingProfile(prev => !prev)}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditingProfile ? 'إغلاق التعديل' : 'تعديل البيانات'}</span>
                  </button>
                </div>

                {isEditingProfile ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">الاسم:</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={e => setEditName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">المدرسة / الإدارة:</label>
                        <input
                          type="text"
                          value={editSchool}
                          onChange={e => setEditSchool(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">المسار / التخصص:</label>
                        <input
                          type="text"
                          value={editTrack}
                          onChange={e => setEditTrack(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">الهدف اليومي (سؤال/يوم):</label>
                        <input
                          type="number"
                          value={editDailyGoal}
                          onChange={e => setEditDailyGoal(Number(e.target.value))}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">تغيير الأفاتار:</label>
                      <div className="flex items-center gap-2 flex-wrap">
                        {AVATAR_OPTIONS.map(emoji => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => setEditAvatar(emoji)}
                            className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border transition-all cursor-pointer ${
                              editAvatar === emoji ? 'bg-indigo-100 border-indigo-500 ring-2 ring-indigo-400' : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={handleSaveProfile}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        حفظ التعديلات
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[10px]">الاسم:</span>
                      <strong className="text-slate-800">{user.name}</strong>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[10px]">المدرسة:</span>
                      <strong className="text-slate-800 truncate block">{user.school || 'مدرسة المتفوقين'}</strong>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[10px]">المسار:</span>
                      <strong className="text-slate-800 truncate block">{user.track}</strong>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[10px]">الهدف اليومي:</span>
                      <strong className="text-slate-800">{user.dailyGoalQuestions} أسئلة / يوم</strong>
                    </div>
                  </div>
                )}
              </div>

              {/* Enterprise Roster Import / Export & Data Governance */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>استيراد وتصدير قاعدة بيانات المستخدمين (Enterprise Backup & Migration):</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      تصدير كشف كامل للمستخدمين، الصلاحيات، وحالات الأقفال بصيغة JSON مؤسسية أو استيراد دفعة جديدة.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    <button
                      onClick={() => {
                        const jsonStr = exportEnterpriseRosterJson();
                        const blob = new Blob([jsonStr], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `rowad_enterprise_roster_${new Date().toISOString().split('T')[0]}.json`;
                        a.click();
                        URL.revokeObjectURL(a.href);
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5 text-indigo-600" />
                      <span>تصدير المنظومة (JSON)</span>
                    </button>

                    <label className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-indigo-300 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-colors cursor-pointer shadow-2xs">
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>استيراد ملف قاعدة مستخدمين</span>
                      <input
                        type="file"
                        accept=".json"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = ev => {
                            const content = ev.target?.result as string;
                            if (content) {
                              const res = importEnterpriseRosterJson(content);
                              alert(res.message);
                            }
                          };
                          reader.readAsText(file);
                        }}
                      />
                    </label>

                    <button
                      onClick={() => {
                        if (window.confirm('هل أنت متأكد من رغبتك في تصفير سجل التدريبات لهذا الحساب؟ سيتم مسح بيانات الإجابات المحلية.')) {
                          lmsService.resetStudentData(user.id);
                          alert('تم تصفير سجل التدريبات بنجاح.');
                        }
                      }}
                      className="flex items-center gap-1 px-3 py-2 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>تصفير التدريبات</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* AUDIT LOG MODAL DRAWER */}
              {showAuditModal && (
                <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <History className="w-5 h-5 text-purple-400" />
                        <div>
                          <h4 className="font-black text-sm sm:text-base">سجل التدقيق والأمان المؤسسي (Audit Trail Log)</h4>
                          <p className="text-[11px] text-slate-300">تسجيل غير قابل للتلاعب لجميع عمليات تغيير الأدوار، قفل الوحدات، وإنشاء الحسابات</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowAuditModal(false)}
                        className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="p-4 flex-1 overflow-y-auto space-y-2.5">
                      {auditLogs.map(log => (
                        <div key={log.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                          <div className="flex items-center justify-between text-slate-400 text-[10px]">
                            <span className="font-mono" dir="ltr">{new Date(log.timestamp).toLocaleString('ar-EG')}</span>
                            <span className={`px-2 py-0.5 rounded-full font-bold ${
                              log.action === 'suspend_user' ? 'bg-rose-100 text-rose-700' :
                              log.action === 'activate_user' ? 'bg-emerald-100 text-emerald-700' :
                              log.action === 'create_user' ? 'bg-indigo-100 text-indigo-700' :
                              log.action === 'toggle_unit_lock' ? 'bg-amber-100 text-amber-800' :
                              'bg-purple-100 text-purple-700'
                            }`}>
                              {log.action === 'suspend_user' ? 'إيقاف حساب' :
                               log.action === 'activate_user' ? 'تنشيط حساب' :
                               log.action === 'create_user' ? 'إنشاء حساب' :
                               log.action === 'toggle_unit_lock' ? 'تعديل قفل وحدة' :
                               log.action === 'switch_role' ? 'تغيير دور' :
                               log.action === 'delete_user' ? 'حذف حساب' : log.action}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 font-bold text-slate-800">
                            <span>الفاعل: {log.actorName} ({log.actorRole})</span>
                          </div>
                          <p className="text-slate-600 text-[11px] leading-relaxed">
                            {log.details}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-slate-100 border-t border-slate-200 flex justify-end">
                      <button
                        onClick={() => setShowAuditModal(false)}
                        className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800"
                      >
                        إغلاق السجل
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 8: PERMISSIONS MATRIX & UNIT GATING (مصفوفة الصلاحيات وحجب الوحدات) */}
          {activeTab === 'permissions' && (
            <div className="space-y-6">

              {/* Header Context Banner */}
              <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-5 shadow-sm border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="bg-indigo-500/30 text-indigo-300 border border-indigo-400/40 text-[11px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> محرك الحوكمة والتحكم بالوصول (RBAC & Gating Engine)
                      </span>
                      <span className="text-xs text-slate-300">
                        دورك الحالي: <strong className="text-amber-400 font-black">{user.role === 'teacher' ? '👨‍🏫 معلم أول / موجه' : user.role === 'auditor' ? '🛡️ مشرف جودة وحوكمة' : user.role === 'parent' ? '👨‍👩‍👧 ولي أمر ومتابع' : '🎓 طالب البكالوريا'}</strong>
                      </span>
                    </div>
                    <h3 className="font-extrabold text-base sm:text-lg text-white">
                      مصفوفة الصلاحيات وحجب الوحدات الدراسية
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                      نظام مستقل لإدارة صلاحيات الأدوار الأربعة (طالب، معلم، ولي أمر، مشرف جودة)، مع إمكانية تحكم المعلم والمشرف في حجب أو إتاحة الوحدات الدراسية والاختبارات للطلاب بناءً على الخطة المدرسية أو شروط الإتقان.
                    </p>
                  </div>

                  <div className="shrink-0 flex sm:flex-col items-center sm:items-end gap-2">
                    {hasPermission('manage_unit_locks') ? (
                      <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        صلاحية التحكم بالحجب: مفعلة لديك
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold px-3 py-1 rounded-xl">
                        <Lock className="w-4 h-4 text-amber-400" />
                        وضع الاستعراض (صلاحيات مقيدة)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 1: UNIT GATING / LOCKING MATRIX */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
                
                {/* Mode Controller & Sub-header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h4 className="font-black text-sm sm:text-base text-slate-900 flex items-center gap-2">
                      <Lock className="w-4 h-4 text-indigo-600" />
                      <span>نظام حجب وإتاحة الوحدات الدراسية (الخيار ج التتابعي + الخيار ب المباشر):</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 max-w-2xl leading-relaxed">
                      الوحدة الأولى مفتوحة دائماً كمدخل أساسي للمنهج. الوحدات اللاحقة (2-10) تُفتح تلقائياً عند تحقيق 70% في تقييم الوحدة السابقة (الخيار ج)، مع احتفاظ المعلم والمشرف بالصلاحية الكاملة لحجب أو فتح أي وحدة استثنائياً (الخيار ب).
                    </p>
                  </div>

                  {/* Option C Toggle Switch for Teachers / Auditors */}
                  {hasPermission('manage_unit_locks') ? (
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0 bg-slate-50 border border-slate-200 p-2 rounded-2xl">
                      <div className="flex items-center gap-2 px-2">
                        <span className="text-xs font-bold text-slate-800">
                          ⚡ نظام القفل التتابعي المشروط (الخيار ج):
                        </span>
                        <button
                          onClick={() => setPrerequisiteEnabled(!isPrerequisiteEnabled)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                            isPrerequisiteEnabled ? 'bg-indigo-600' : 'bg-slate-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              isPrerequisiteEnabled ? 'translate-x-1' : 'translate-x-6'
                            }`}
                          />
                        </button>
                        <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${
                          isPrerequisiteEnabled ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {isPrerequisiteEnabled ? 'مفعل (70%)' : 'معطل'}
                        </span>
                      </div>

                      <div className="h-4 w-px bg-slate-200 hidden sm:block" />

                      <button
                        onClick={() => {
                          ALL_UNITS.forEach(u => toggleUnitLock(u.number, false));
                        }}
                        className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                        title="إلغاء أي حجب يدوي للمعلم"
                      >
                        🔓 إتاحة يدوية للكل
                      </button>
                    </div>
                  ) : (
                    <div className="shrink-0">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${
                        isPrerequisiteEnabled 
                          ? 'bg-amber-50 text-amber-800 border-amber-300' 
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        ⚡ نظام القفل التتابعي المشروط: {isPrerequisiteEnabled ? 'مفعل (شرط 70% في الوحدة السابقة)' : 'غير مفعل'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Units Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {ALL_UNITS.map(unit => {
                    const lockInfo = unitLocks[unit.number];
                    const accessStatus = checkUnitAccessStatus(unit.number);
                    const isLocked = accessStatus.isLocked;
                    const canManage = hasPermission('manage_unit_locks');
                    const isUnitOne = unit.number === 1;
                    const studentBestScore = getBestQuizScoreForUnit(unit.number);

                    return (
                      <div
                        key={unit.number}
                        className={`rounded-2xl border p-4 transition-all ${
                          isUnitOne
                            ? 'bg-emerald-50/30 border-emerald-200'
                            : isLocked
                            ? accessStatus.lockType === 'prerequisite'
                              ? 'bg-amber-50/40 border-amber-300'
                              : 'bg-rose-50/40 border-rose-200'
                            : 'bg-slate-50/50 border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                                الوحدة 0{unit.number}
                              </span>
                              <span className="text-[11px] text-slate-400 font-bold">
                                {unit.number <= 5 ? 'الترم الأول (الجزء 1)' : 'الترم الثاني (الجزء 2)'}
                              </span>
                              {isUnitOne && (
                                <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                                  👑 المدخل التأسيسي (مفتوحة دائماً)
                                </span>
                              )}
                            </div>
                            <h5 className="font-bold text-sm text-slate-900 leading-snug">
                              {unit.title}
                            </h5>
                          </div>

                          <div className="shrink-0">
                            {isUnitOne ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> مفتوحة دائماً
                              </span>
                            ) : isLocked ? (
                              accessStatus.lockType === 'prerequisite' ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                                  <Lock className="w-3 h-3 text-amber-700" /> قفل تتابعي (متطلب 70%)
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 border border-rose-300">
                                  <Lock className="w-3 h-3 text-rose-700" /> حجب يدوي من المعلم
                                </span>
                              )
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> مفتوحة ومتاحة
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Lock details / reason */}
                        {!isUnitOne && isLocked && (
                          <div className={`border rounded-xl p-2.5 text-xs mb-3 space-y-1.5 ${
                            accessStatus.lockType === 'prerequisite'
                              ? 'bg-amber-100/60 border-amber-300 text-amber-900'
                              : 'bg-white/80 border-rose-200 text-rose-800'
                          }`}>
                            <div className="font-bold flex items-start gap-1">
                              <span>⚠️ شرط الإتاحة:</span>
                              <span className="font-normal leading-relaxed">{accessStatus.reason}</span>
                            </div>

                            {accessStatus.lockType === 'prerequisite' && (
                              <div className="flex items-center justify-between text-[11px] bg-white/80 p-1.5 rounded-lg border border-amber-200">
                                <span>درجتك الحالية في الوحدة 0{accessStatus.previousUnitNumber}:</span>
                                <strong className="font-black text-amber-950">{accessStatus.studentBestScore || 0}% / {accessStatus.requiredScore || 70}%</strong>
                              </div>
                            )}

                            {lockInfo?.lockedBy && accessStatus.lockType === 'manual' && (
                              <div className="text-[10px] text-slate-400">
                                تم الضبط بواسطة: {lockInfo.lockedBy}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Student Progress Badge */}
                        <div className="flex items-center justify-between text-[11px] text-slate-500 py-1.5 px-2 bg-white/70 rounded-lg border border-slate-100 mb-2">
                          <span>أعلى نتيجة تقييم حققتها في هذه الوحدة:</span>
                          <span className={`font-bold ${studentBestScore >= 70 ? 'text-emerald-700' : studentBestScore > 0 ? 'text-amber-700' : 'text-slate-400'}`}>
                            {studentBestScore > 0 ? `${studentBestScore}%` : 'لم تُختبر بعد'}
                          </span>
                        </div>

                        {/* Controls for Teacher / Auditor */}
                        {canManage && !isUnitOne ? (
                          <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between gap-2">
                            <span className="text-[11px] text-slate-500 font-medium">
                              إدارة استثناء المعلم:
                            </span>

                            {isLocked ? (
                              <button
                                onClick={() => toggleUnitLock(unit.number, false, 'تم الفتح باستثناء تربوي خاص من المعلم الأول')}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                                title="فتح الوحدة وتجاوز شرط الـ 70%"
                              >
                                <Unlock className="w-3.5 h-3.5" />
                                <span>فتح استثنائي للطلاب (Override)</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  const reason = prompt('أدخل سبب حجب هذه الوحدة يدوياً عن الطلاب:', 'محجوبة بقرار مباشر من المعلم الأول للأسبوع الدراسي القادم');
                                  if (reason !== null) {
                                    toggleUnitLock(unit.number, true, reason);
                                  }
                                }}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                              >
                                <Lock className="w-3.5 h-3.5" />
                                <span>حجب يدوي مباشر عن الطلاب</span>
                              </button>
                            )}
                          </div>
                        ) : isUnitOne ? (
                          <div className="pt-2 border-t border-emerald-200/70 text-[11px] text-emerald-700 font-bold">
                            ✅ الوحدة التأسيسية محمية ومتاحة للجميع دائماً ولا تخضع للحجب.
                          </div>
                        ) : (
                          <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
                            {isLocked ? '🔒 راجع شروط الإتقان أو راجع معلمك لفتحها استثنائياً.' : '✅ مسموح لك بالمذاكرة وحل الأسئلة.'}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: RBAC PERMISSIONS MATRIX TABLE */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <h4 className="font-black text-sm sm:text-base text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>مصفوفة الصلاحيات حسب الأدوار الأربعة (Role-Based Access Control - RBAC):</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    جدول مقارن يوضح الاختصاصات البرمجية الدقيقة لكل فئة من مستخدمي المنصة:
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                        <th className="p-3 font-black rounded-tr-xl">الوظيفة / الصلاحية البرمجية</th>
                        <th className={`p-3 font-black text-center ${user.role === 'student' ? 'bg-indigo-100 text-indigo-900 font-black' : ''}`}>
                          🎓 طالب
                        </th>
                        <th className={`p-3 font-black text-center ${user.role === 'teacher' ? 'bg-indigo-100 text-indigo-900 font-black' : ''}`}>
                          👨‍🏫 معلم أول
                        </th>
                        <th className={`p-3 font-black text-center ${user.role === 'parent' ? 'bg-indigo-100 text-indigo-900 font-black' : ''}`}>
                          👨‍👩‍👧 ولي أمر
                        </th>
                        <th className={`p-3 font-black text-center rounded-tl-xl ${user.role === 'auditor' ? 'bg-indigo-100 text-indigo-900 font-black' : ''}`}>
                          🛡️ مشرف جودة
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {ROLE_PERMISSION_RULES.map(rule => (
                        <tr key={rule.permission} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-3">
                            <strong className="text-slate-900 block font-bold text-xs">{rule.label}</strong>
                            <span className="text-[11px] text-slate-500">{rule.description}</span>
                          </td>
                          {(['student', 'teacher', 'parent', 'auditor'] as UserRole[]).map(r => {
                            const isAllowed = rule.allowedRoles.includes(r);
                            const isCurrent = user.role === r;

                            return (
                              <td 
                                key={r} 
                                className={`p-3 text-center align-middle ${
                                  isCurrent ? 'bg-indigo-50/50 font-bold' : ''
                                }`}
                              >
                                {isAllowed ? (
                                  <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full font-bold text-[11px]">
                                    ✓ متاح
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full text-[10px]">
                                    ✕ مقيد
                                  </span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SECTION 3: ARCHITECTURAL INDEPENDENCE (استقلالية موديول المستخدمين) */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-indigo-600" />
                  <span>هل طبقة المستخدمين مستقلة أم متداخلة؟ (Architecture & Decoupling Analysis):</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs pt-1">
                  <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-2xs space-y-1">
                    <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md inline-block">
                      1. Domain Layer
                    </span>
                    <h5 className="font-bold text-slate-800 text-xs">نماذج البيانات (types.ts)</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      عقود نقية تماماً دون أي تبعية للمكتبات البصرية أو محتوى الكتاب المدرسي، مما يمنع التداخل الدائري.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-2xs space-y-1">
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
                      2. Service Layer
                    </span>
                    <h5 className="font-bold text-slate-800 text-xs">محرك الأعمال (lmsService.ts)</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      موديول خدمات معزول مسؤول عن الحفظ، حسابات الـ XP، التحليلات، وقفل الوحدات، ويمكن استبداله بـ API سحابي بسهولة.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-2xs space-y-1">
                    <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md inline-block">
                      3. State & IoC Provider
                    </span>
                    <h5 className="font-bold text-slate-800 text-xs">حقن التبعيات (UserContext)</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      يتحكم في تدفق الحالة عبر Inversion of Control، ويوفر خطافات UseUser دون أن تعرف المكونات تفاصيل التخزين.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-2xs space-y-1">
                    <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md inline-block">
                      4. Presentation Layer
                    </span>
                    <h5 className="font-bold text-slate-800 text-xs">المكونات البصرية (UI)</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      مكونات مستهلكة نقية (Loose Coupling) تستقبل الأوامر وتطلق الأحداث دون تشابك مع ملفات الدروس أو الأسئلة.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>المنصة متصلة بالنظام الموحد للبكالوريا 2027</span>
          </div>

          <button
            onClick={() => setOpenUserModal(false)}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
