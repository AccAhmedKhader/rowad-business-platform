# M15 — Production Hardening

## Scope
Hardening layer added on top of M14 without rewriting academic content.

## Implemented
- Request correlation via `X-Request-ID`.
- Security headers and production HSTS.
- Controlled CORS via `CORS_ORIGIN` (no wildcard in production when configured).
- Reduced JSON/urlencoded payload limits.
- Global API rate limiting plus stricter login throttling.
- Centralized error boundary that avoids stack traces in client responses.
- Tamper-evident in-process security audit hash chain.
- Admin-only security-chain inspection endpoint.
- Graceful SIGTERM/SIGINT shutdown.
- Dedicated M15 unit test for audit-chain integrity.

## Verification status
Static implementation review: PASS.
Runtime verification: pending dependency installation (`npm ci`) in the execution environment.
M15 does not override the existing M10 runtime gate.
