import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  UserProfile, 
  UserRole, 
  UserBadge, 
  DailyQuestItem, 
  UserBookmarkItem, 
  UserNoteItem, 
  MistakeItem, 
  UserStudyPlan,
  AppPermission,
  UnitLockState,
  PrerequisiteStatus,
  AuditLogItem,
  UserStatus
} from '../types';
import { lmsService, calculateLevelFromXP, ALL_PRESET_USERS, ROLE_PERMISSION_RULES } from '../services/lmsService';

interface UserContextValue {
  user: UserProfile;
  allUsers: UserProfile[];
  auditLogs: AuditLogItem[];
  levelInfo: { level: number; title: string; nextLevelXP: number; progressPercent: number };
  openUserModal: boolean;
  setOpenUserModal: (open: boolean) => void;
  activeUserModalTab: 'overview' | 'analytics' | 'mistakes' | 'planner' | 'badges' | 'roles' | 'permissions';
  setActiveUserModalTab: (tab: 'overview' | 'analytics' | 'mistakes' | 'planner' | 'badges' | 'roles' | 'permissions') => void;
  
  // Permissions & Unit Locking
  unitLocks: Record<number, UnitLockState>;
  isPrerequisiteEnabled: boolean;
  setPrerequisiteEnabled: (enabled: boolean) => void;
  toggleUnitLock: (unitNumber: number, isLocked: boolean, reason?: string, minPassingScore?: number) => void;
  isUnitAccessible: (unitNumber: number) => { isAccessible: boolean; lockInfo?: UnitLockState; prereqStatus?: PrerequisiteStatus };
  checkUnitAccessStatus: (unitNumber: number) => PrerequisiteStatus;
  getBestQuizScoreForUnit: (unitNumber: number) => number;
  hasPermission: (permission: AppPermission, user?: UserProfile) => boolean;

  // Enterprise User Management
  switchUser: (userId: string) => void;
  createUser: (params: { name: string; role: UserRole; avatar?: string; grade?: string; school?: string; track?: string; email?: string; phone?: string; tags?: string[] }) => void;
  deleteUser: (userId: string) => { success: boolean; message: string };
  updateUserStatus: (userId: string, status: UserStatus) => void;
  updateUserRole: (userId: string, role: UserRole) => void;
  updateUserCustomPermissions: (userId: string, permissions: AppPermission[]) => void;
  exportEnterpriseRosterJson: () => string;
  importEnterpriseRosterJson: (json: string) => { success: boolean; count: number; message: string };
  updateProfile: (updates: Partial<UserProfile>) => void;
  switchRole: (role: UserRole) => void;
  addXP: (amount: number, reason: string) => { leveledUp: boolean; newLevel: number };
  claimDailyQuest: (questId: string) => boolean;
  toggleBookmark: (item: Omit<UserBookmarkItem, 'id' | 'savedAt'>) => boolean;
  savePersonalNote: (note: Omit<UserNoteItem, 'id' | 'updatedAt'> & { id?: string }) => void;
  deletePersonalNote: (noteId: string) => void;
  recordMistake: (mistake: Omit<MistakeItem, 'id' | 'recordedAt' | 'resolved' | 'attempts'>) => void;
  resolveMistake: (mistakeId: string) => void;
  updateStudyPlan: (plan: UserStudyPlan) => void;
  refreshUserData: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => lmsService.getCurrentUser());
  const [allUsers, setAllUsers] = useState<UserProfile[]>(() => lmsService.getAllUsers());
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => lmsService.getAuditLogs());
  const [unitLocks, setUnitLocks] = useState<Record<number, UnitLockState>>(() => lmsService.getUnitLocks());
  const [isPrerequisiteEnabled, setIsPrerequisiteEnabledState] = useState<boolean>(() => lmsService.isPrerequisiteGatingEnabled());
  const [openUserModal, setOpenUserModal] = useState<boolean>(false);
  const [activeUserModalTab, setActiveUserModalTab] = useState<'overview' | 'analytics' | 'mistakes' | 'planner' | 'badges' | 'roles' | 'permissions'>('overview');

  const refreshUserData = useCallback(() => {
    setUser(lmsService.getCurrentUser());
    setAllUsers(lmsService.getAllUsers());
    setAuditLogs(lmsService.getAuditLogs());
    setUnitLocks(lmsService.getUnitLocks());
    setIsPrerequisiteEnabledState(lmsService.isPrerequisiteGatingEnabled());
  }, []);

  useEffect(() => {
    // Listen for custom cross-event updates
    const handleUpdate = (e: any) => {
      if (e.detail) {
        setUser(e.detail);
        setAllUsers(lmsService.getAllUsers());
      }
    };
    const handleLocksUpdate = (e: any) => {
      if (e.detail) {
        setUnitLocks(e.detail);
        setIsPrerequisiteEnabledState(lmsService.isPrerequisiteGatingEnabled());
      }
    };
    const handleLogsUpdate = (e: any) => {
      if (e.detail) {
        setAuditLogs(e.detail);
      }
    };
    window.addEventListener('rowad_user_updated', handleUpdate);
    window.addEventListener('rowad_unit_locks_updated', handleLocksUpdate);
    window.addEventListener('rowad_audit_logs_updated', handleLogsUpdate);
    return () => {
      window.removeEventListener('rowad_user_updated', handleUpdate);
      window.removeEventListener('rowad_unit_locks_updated', handleLocksUpdate);
      window.removeEventListener('rowad_audit_logs_updated', handleLogsUpdate);
    };
  }, []);

  const setPrerequisiteEnabled = useCallback((enabled: boolean) => {
    lmsService.setPrerequisiteGatingEnabled(enabled);
    setIsPrerequisiteEnabledState(enabled);
  }, []);

  const toggleUnitLock = useCallback((unitNumber: number, isLocked: boolean, reason?: string, minPassingScore: number = 70) => {
    lmsService.toggleUnitLock(unitNumber, isLocked, reason, user.name, minPassingScore);
    setUnitLocks(lmsService.getUnitLocks());
    setAuditLogs(lmsService.getAuditLogs());
  }, [user.name]);

  const isUnitAccessible = useCallback((unitNumber: number) => {
    return lmsService.isUnitAccessible(unitNumber, user.role);
  }, [user.role]);

  const checkUnitAccessStatus = useCallback((unitNumber: number) => {
    return lmsService.checkUnitAccessStatus(unitNumber, user.role);
  }, [user.role]);

  const getBestQuizScoreForUnit = useCallback((unitNumber: number) => {
    return lmsService.getBestQuizScoreForUnit(unitNumber, user.id);
  }, [user.id]);

  const hasPermission = useCallback((permission: AppPermission, targetUser?: UserProfile) => {
    const u = targetUser || user;
    return lmsService.hasPermission(u.role, permission, u);
  }, [user]);

  const switchUser = useCallback((userId: string) => {
    const switched = lmsService.switchUser(userId);
    setUser(switched);
    setAllUsers(lmsService.getAllUsers());
  }, []);

  const createUser = useCallback((params: { name: string; role: UserRole; avatar?: string; grade?: string; school?: string; track?: string; email?: string; phone?: string; tags?: string[] }) => {
    const created = lmsService.createUser(params);
    setUser(created);
    setAllUsers(lmsService.getAllUsers());
    setAuditLogs(lmsService.getAuditLogs());
  }, []);

  const deleteUser = useCallback((userId: string) => {
    const res = lmsService.deleteUser(userId);
    setAllUsers(lmsService.getAllUsers());
    setAuditLogs(lmsService.getAuditLogs());
    return res;
  }, []);

  const updateUserStatus = useCallback((userId: string, status: UserStatus) => {
    lmsService.updateUserStatus(userId, status);
    setUser(lmsService.getCurrentUser());
    setAllUsers(lmsService.getAllUsers());
    setAuditLogs(lmsService.getAuditLogs());
  }, []);

  const updateUserRole = useCallback((userId: string, role: UserRole) => {
    lmsService.updateUserRole(userId, role);
    setUser(lmsService.getCurrentUser());
    setAllUsers(lmsService.getAllUsers());
    setAuditLogs(lmsService.getAuditLogs());
  }, []);

  const updateUserCustomPermissions = useCallback((userId: string, permissions: AppPermission[]) => {
    lmsService.updateUserCustomPermissions(userId, permissions);
    setUser(lmsService.getCurrentUser());
    setAllUsers(lmsService.getAllUsers());
    setAuditLogs(lmsService.getAuditLogs());
  }, []);

  const exportEnterpriseRosterJson = useCallback(() => {
    return lmsService.exportEnterpriseRosterJson();
  }, []);

  const importEnterpriseRosterJson = useCallback((json: string) => {
    const res = lmsService.importEnterpriseRosterJson(json);
    refreshUserData();
    return res;
  }, [refreshUserData]);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    const currentUser = lmsService.getCurrentUser();
    const updated: UserProfile = { ...currentUser, ...updates };
    lmsService.saveCurrentUser(updated);
    setUser(updated);
    setAllUsers(lmsService.getAllUsers());
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    const updated = lmsService.switchRole(role);
    setUser(updated);
    setAllUsers(lmsService.getAllUsers());
  }, []);

  const addXP = useCallback((amount: number, reason: string) => {
    const res = lmsService.addXP(amount, reason);
    setUser(lmsService.getCurrentUser());
    return { leveledUp: res.leveledUp, newLevel: res.newLevel };
  }, []);

  const claimDailyQuest = useCallback((questId: string) => {
    const success = lmsService.claimDailyQuest(questId);
    if (success) {
      setUser(lmsService.getCurrentUser());
    }
    return success;
  }, []);

  const toggleBookmark = useCallback((item: Omit<UserBookmarkItem, 'id' | 'savedAt'>) => {
    const added = lmsService.toggleBookmark(item);
    setUser(lmsService.getCurrentUser());
    return added;
  }, []);

  const savePersonalNote = useCallback((note: Omit<UserNoteItem, 'id' | 'updatedAt'> & { id?: string }) => {
    lmsService.savePersonalNote(note);
    setUser(lmsService.getCurrentUser());
  }, []);

  const deletePersonalNote = useCallback((noteId: string) => {
    lmsService.deletePersonalNote(noteId);
    setUser(lmsService.getCurrentUser());
  }, []);

  const recordMistake = useCallback((mistake: Omit<MistakeItem, 'id' | 'recordedAt' | 'resolved' | 'attempts'>) => {
    lmsService.recordMistakeItem(mistake);
    setUser(lmsService.getCurrentUser());
  }, []);

  const resolveMistake = useCallback((mistakeId: string) => {
    lmsService.resolveMistakeItem(mistakeId);
    setUser(lmsService.getCurrentUser());
  }, []);

  const updateStudyPlan = useCallback((plan: UserStudyPlan) => {
    lmsService.updateStudyPlan(plan);
    setUser(lmsService.getCurrentUser());
  }, []);

  const levelInfo = calculateLevelFromXP(user.gamification.xp);

  return (
    <UserContext.Provider
      value={{
        user,
        allUsers,
        auditLogs,
        levelInfo,
        openUserModal,
        setOpenUserModal,
        activeUserModalTab,
        setActiveUserModalTab,
        unitLocks,
        isPrerequisiteEnabled,
        setPrerequisiteEnabled,
        toggleUnitLock,
        isUnitAccessible,
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
        updateProfile,
        switchRole,
        addXP,
        claimDailyQuest,
        toggleBookmark,
        savePersonalNote,
        deletePersonalNote,
        recordMistake,
        resolveMistake,
        updateStudyPlan,
        refreshUserData
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
