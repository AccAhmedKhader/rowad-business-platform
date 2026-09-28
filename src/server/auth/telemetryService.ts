import crypto from 'crypto';
import { db } from '../db/database';

export interface AuditEventEntity {
  id: string;
  actorUserId?: string;
  actorRole?: string;
  action: string;
  resourceType: string;
  resourceId?: string;
  result: 'SUCCESS' | 'REJECTED' | 'ERROR';
  occurredAt: string;
  requestId?: string;
  correlationId?: string;
  reason?: string;
  beforeState?: any;
  afterState?: any;
  metadata?: any;
}

export interface SecurityEventEntity {
  id: string;
  eventType: string; // LOGIN_SUCCESS, LOGIN_FAILURE, REFRESH_TOKEN_REUSE, ACCOUNT_LOCKED, PRIVILEGE_PROBE
  severity: 'INFO' | 'WARN' | 'CRITICAL';
  actorId?: string;
  identifier?: string;
  ipAddress?: string;
  userAgent?: string;
  details?: any;
  occurredAt: string;
}

class TelemetryService {
  // Append-only logs (Immutability guarantee: NO UPDATE, NO DELETE methods exposed)
  private auditEvents: AuditEventEntity[] = [];
  private securityEvents: SecurityEventEntity[] = [];

  /**
   * Log an audit event.
   */
  public logAudit(event: Omit<AuditEventEntity, 'id' | 'occurredAt'>): AuditEventEntity {
    const entry: AuditEventEntity = {
      ...event,
      id: `audit_${crypto.randomUUID()}`,
      occurredAt: new Date().toISOString()
    };
    this.auditEvents.push(entry);

    // Sync with existing database audit log
    db.recordAuditLog({
      actor_id: entry.actorUserId || 'ANONYMOUS',
      actor_role: (entry.actorRole as any) || 'SYSTEM',
      action: entry.action,
      resource: entry.resourceType,
      resource_id: entry.resourceId,
      result: entry.result === 'ERROR' ? 'FAILURE' : entry.result,
      metadata: { ...entry.metadata, reason: entry.reason }
    });

    return entry;
  }

  /**
   * Log a security telemetry event.
   */
  public logSecurity(event: Omit<SecurityEventEntity, 'id' | 'occurredAt'>): SecurityEventEntity {
    const entry: SecurityEventEntity = {
      ...event,
      id: `sec_${crypto.randomUUID()}`,
      occurredAt: new Date().toISOString()
    };
    this.securityEvents.push(entry);
    return entry;
  }

  public getAuditEvents(limit: number = 100): AuditEventEntity[] {
    return this.auditEvents.slice(-limit).reverse();
  }

  public getSecurityEvents(limit: number = 100): SecurityEventEntity[] {
    return this.securityEvents.slice(-limit).reverse();
  }
}

export const telemetryService = new TelemetryService();
