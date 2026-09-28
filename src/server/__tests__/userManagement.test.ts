import { describe, expect, it } from 'vitest';
import { authorizationService } from '../auth/authorizationService';

describe('Advanced user management authorization', () => {
  it('allows platform admins to manage users globally', () => {
    expect(authorizationService.authorize({ actorUserId:'usr-admin-1', resource:'users', action:'view' }).allowed).toBe(true);
    expect(authorizationService.authorize({ actorUserId:'usr-admin-1', resource:'users', action:'suspend' }).allowed).toBe(true);
  });
  it('keeps students self-scoped', () => {
    expect(authorizationService.authorize({ actorUserId:'usr-student-1', resource:'users', action:'view', targetResourceId:'usr-student-1' }).allowed).toBe(true);
    expect(authorizationService.authorize({ actorUserId:'usr-student-1', resource:'users', action:'view', targetResourceId:'other-student' }).allowed).toBe(false);
  });
  it('blocks lower roles from assigning elevated roles', () => {
    expect(authorizationService.authorize({ actorUserId:'usr-teacher-1', resource:'user_roles', action:'assign', context:{targetRolePriority:1} }).allowed).toBe(false);
  });
});
