# M7 — Unified Identity Audit

Existing shared identity/authentication infrastructure was identified under `src/server/auth`, `src/context/AuthContext.tsx`, `src/domains/business/context/UserContext.tsx`, and related tests.

## Required consolidation
- one canonical user identity
- one role/permission authority
- domain access represented as authorization context, not duplicate users
- preserve existing Business UI context through an adapter

**Gate:** architecture/audit complete; runtime cross-domain identity regression is pending.
