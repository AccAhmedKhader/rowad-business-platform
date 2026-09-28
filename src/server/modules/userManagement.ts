import { Response } from 'express';
import { z } from 'zod';
import { db } from '../db/database';
import { hashPassword } from '../auth/password';
import { authorizationService, RoleCode } from '../auth/authorizationService';
import { userLifecycleService, UserAccountStatus } from '../auth/userLifecycleService';
import { sessionService } from '../auth/sessionService';
import { telemetryService } from '../auth/telemetryService';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

const ROLE_CODES = ['SUPER_ADMIN','PLATFORM_ADMIN','ACADEMIC_ADMIN','TEACHER','ASSISTANT_TEACHER','CONTENT_MANAGER','QUESTION_BANK_MANAGER','EXAM_MANAGER','REVIEWER','SUPPORT_AGENT','ANALYST','STUDENT','GUARDIAN'] as const;
const STATUS_CODES = ['INVITED','PENDING_VERIFICATION','ACTIVE','LOCKED','SUSPENDED','DEACTIVATED','ARCHIVED'] as const;

const listSchema = z.object({
  q: z.string().trim().optional(),
  role: z.enum(ROLE_CODES).optional(),
  status: z.enum(STATUS_CODES).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(25)
});
const bulkSchema = z.object({
  userIds: z.array(z.string().min(1)).min(1).max(500),
  action: z.enum(['ACTIVATE','SUSPEND','DEACTIVATE','ARCHIVE','UNLOCK'])
});
const passwordSchema = z.object({ newPassword: z.string().min(8) });
const roleSchema = z.object({ role: z.enum(ROLE_CODES), scopeType: z.enum(['GLOBAL','ORGANIZATION','GROUP','ASSIGNED','SELF']).default('GLOBAL'), scopeId: z.string().optional() });

function rolesOf(userId: string) { return authorizationService.getUserRoles(userId); }
function publicUser(u: any) {
  return { id:u.id, email:u.email, full_name:u.full_name, first_name:u.first_name, last_name:u.last_name, role:u.role, roles:rolesOf(u.id), status:u.status, created_at:u.created_at, updated_at:u.updated_at };
}
function canManage(req: AuthenticatedRequest, action: string, targetId?: string, context?: any) {
  if (!req.user) return { allowed:false, reason:'UNAUTHORIZED' };
  return authorizationService.authorize({ actorUserId:req.user.userId, resource:'users', action, targetResourceId:targetId, context });
}

export function handleUserManagementSummary(req: AuthenticatedRequest, res: Response) {
  const check = canManage(req, 'view'); if (!check.allowed) return res.status(403).json({success:false,error:{code:'FORBIDDEN',message:check.reason}});
  const users = db.users;
  const byRole: Record<string,number> = {}; const byStatus: Record<string,number> = {};
  for (const u of users) { byRole[u.role]=(byRole[u.role]||0)+1; byStatus[u.status]=(byStatus[u.status]||0)+1; }
  return res.json({success:true, total:users.length, byRole, byStatus, activeSessions: users.reduce((n,u)=>n+sessionService.listUserSessions(u.id).filter(s=>s.status==='ACTIVE').length,0), roles: authorizationService.getAllRoles()});
}

export function handleManagedUsers(req: AuthenticatedRequest, res: Response) {
  const check = canManage(req, 'view'); if (!check.allowed) return res.status(403).json({success:false,error:{code:'FORBIDDEN',message:check.reason}});
  const parsed = listSchema.safeParse(req.query); if (!parsed.success) return res.status(400).json({success:false,error:{code:'VALIDATION_ERROR',message:'معايير البحث غير صالحة'}});
  const {q,role,status,page,pageSize}=parsed.data; const needle=q?.toLowerCase();
  const filtered=db.users.filter(u => (!needle || `${u.full_name} ${u.email}`.toLowerCase().includes(needle)) && (!role || rolesOf(u.id).includes(role as any) || u.role===role) && (!status || u.status===status));
  const start=(page-1)*pageSize; const items=filtered.slice(start,start+pageSize).map(publicUser);
  return res.json({success:true, page,pageSize,total:filtered.length,items});
}

export async function handleBulkUserAction(req: AuthenticatedRequest, res: Response) {
  const parsed=bulkSchema.safeParse(req.body); if(!parsed.success) return res.status(400).json({success:false,error:{code:'VALIDATION_ERROR',message:'عملية جماعية غير صالحة'}});
  const action=parsed.data.action; const authAction=action==='SUSPEND'?'suspend':action==='ARCHIVE'?'archive':'update';
  const check=canManage(req,authAction); if(!check.allowed) return res.status(403).json({success:false,error:{code:'FORBIDDEN',message:check.reason}});
  const result:{id:string;success:boolean;error?:string}[]=[];
  for(const id of parsed.data.userIds){
    const user=db.findUserById(id); if(!user){result.push({id,success:false,error:'USER_NOT_FOUND'});continue;}
    let target:UserAccountStatus|undefined;
    if(action==='ACTIVATE'||action==='UNLOCK') target=UserAccountStatus.ACTIVE;
    if(action==='SUSPEND') target=UserAccountStatus.SUSPENDED;
    if(action==='DEACTIVATE') target=UserAccountStatus.DEACTIVATED;
    if(action==='ARCHIVE') target=UserAccountStatus.ARCHIVED;
    const transition=userLifecycleService.transitionStatus(id,target!,`ADMIN_BULK_${action}`,req.user?.userId);
    if(transition.success){ result.push({id,success:true}); } else result.push({id,success:false,error:transition.error});
  }
  telemetryService.logAudit({actorUserId:req.user!.userId,action:'USER_BULK_ACTION',resourceType:'User',resourceId:'BULK',result:'SUCCESS',metadata:{action,userIds:parsed.data.userIds,result}});
  return res.json({success:true,action,result});
}

export function handleAssignManagedRole(req: AuthenticatedRequest,res:Response){
  const parsed=roleSchema.safeParse(req.body); if(!parsed.success)return res.status(400).json({success:false,error:{code:'VALIDATION_ERROR',message:'بيانات الدور غير صالحة'}});
  const targetId=req.params.id; const target=db.findUserById(targetId); if(!target)return res.status(404).json({success:false,error:{code:'USER_NOT_FOUND'}});
  const check=authorizationService.authorize({actorUserId:req.user!.userId,resource:'user_roles',action:'assign',context:{targetRolePriority:authorizationService.getRolePriority(parsed.data.role)}});
  if(!check.allowed)return res.status(403).json({success:false,error:{code:'FORBIDDEN',message:check.reason}});
  authorizationService.assignRole(targetId,parsed.data.role,parsed.data.scopeType,parsed.data.scopeId);
  if(['SUPER_ADMIN','PLATFORM_ADMIN'].includes(parsed.data.role)) target.role='ADMIN'; else target.role=parsed.data.role as any;
  db.persist();
  telemetryService.logAudit({actorUserId:req.user!.userId,action:'USER_ROLE_ASSIGNED',resourceType:'User',resourceId:targetId,result:'SUCCESS',metadata:parsed.data});
  return res.json({success:true,user:publicUser(target)});
}

export async function handleAdminResetPassword(req: AuthenticatedRequest,res:Response){
  const target=db.findUserById(req.params.id); if(!target)return res.status(404).json({success:false,error:{code:'USER_NOT_FOUND'}});
  const check=canManage(req,'update',target.id); if(!check.allowed)return res.status(403).json({success:false,error:{code:'FORBIDDEN',message:check.reason}});
  const parsed=passwordSchema.safeParse(req.body); if(!parsed.success)return res.status(400).json({success:false,error:{code:'VALIDATION_ERROR',message:'كلمة المرور يجب ألا تقل عن 8 أحرف'}});
  target.password_hash=await hashPassword(parsed.data.newPassword); target.updated_at=new Date().toISOString(); db.persist();
  sessionService.revokeAllUserSessions(target.id,undefined,'ADMIN_PASSWORD_RESET');
  telemetryService.logAudit({actorUserId:req.user!.userId,action:'ADMIN_RESET_PASSWORD',resourceType:'User',resourceId:target.id,result:'SUCCESS',metadata:{sessionsRevoked:true}});
  return res.json({success:true,message:'تم تغيير كلمة المرور وإنهاء الجلسات الحالية.'});
}

export function handleManagedUserSessions(req: AuthenticatedRequest,res:Response){
  const target=db.findUserById(req.params.id); if(!target)return res.status(404).json({success:false,error:{code:'USER_NOT_FOUND'}});
  const check=authorizationService.authorize({actorUserId:req.user!.userId,resource:'sessions',action:'view',targetResourceId:target.id});
  if(!check.allowed)return res.status(403).json({success:false,error:{code:'FORBIDDEN',message:check.reason}});
  return res.json({success:true,userId:target.id,sessions:sessionService.listUserSessions(target.id).map(s=>({id:s.id,status:s.status,deviceType:s.deviceType,clientName:s.clientName,ipAddressMasked:s.ipAddressMasked,userAgent:s.userAgent,createdAt:s.createdAt,lastActiveAt:s.lastActiveAt,expiresAt:s.expiresAt}))});
}

export function handleRevokeManagedSessions(req: AuthenticatedRequest,res:Response){
  const target=db.findUserById(req.params.id); if(!target)return res.status(404).json({success:false,error:{code:'USER_NOT_FOUND'}});
  const check=authorizationService.authorize({actorUserId:req.user!.userId,resource:'sessions',action:'revoke',targetResourceId:target.id});
  if(!check.allowed)return res.status(403).json({success:false,error:{code:'FORBIDDEN',message:check.reason}});
  const count=sessionService.revokeAllUserSessions(target.id,undefined,'ADMIN_SESSION_REVOKE');
  telemetryService.logAudit({actorUserId:req.user!.userId,action:'ADMIN_REVOKE_USER_SESSIONS',resourceType:'User',resourceId:target.id,result:'SUCCESS',metadata:{count}});
  return res.json({success:true,revokedCount:count});
}
