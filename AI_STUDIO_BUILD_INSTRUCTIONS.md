# ROWAD BUSINESS — Google AI Studio Build Instructions

## Purpose
This repository is an existing production-oriented Full-Stack educational platform. It is **not** a greenfield prototype.

Domains:
- `accounting` — المحاسبة ببساطة وإتقان
- `business-administration` — إدارة الأعمال ببساطة وإتقان

## Non-negotiable preservation rules
1. Do not delete existing features, academic files, IDs, answer keys, or source mappings.
2. Do not rewrite official curriculum content.
3. Do not silently merge Accounting and Business academic sources.
4. Treat canonical academic registries and source provenance as authoritative.
5. Reuse the existing authentication, authorization, lifecycle, assessment, mastery, adaptive-learning, and audit layers.
6. New AI functionality must be additive and must not become the source of truth for academic answers.
7. Never place Gemini/API secrets in client-side code.
8. Server-side Gemini calls only; use environment variables for secrets.
9. Before modifying a file, inspect its imports, dependents, and related tests.
10. Preserve backward-compatible routes unless a migration is explicitly requested.

## Required validation after every significant change
```text
npm ci
npm run lint
npm test
npm run build
```

If any command fails, report the exact failure and fix it before claiming completion.

## AI Studio workflow
1. Import this repository/project from GitHub.
2. First run a read-only architecture audit.
3. Do not modify code during the audit.
4. Create a change plan with affected files and regression risks.
5. Apply one phase at a time.
6. Run the validation commands after each phase.
7. Keep secrets in AI Studio/Cloud Run environment configuration, never in source.

## Gemini integration policy
Gemini is allowed for:
- tutoring and explanations
- remediation suggestions
- teacher-facing analytics summaries
- content-quality assistance
- non-authoritative drafting

Gemini is not authoritative for:
- official curriculum truth
- answer keys
- exam eligibility
- grading authority
- user authorization
- academic source provenance

## First task after import
Do not code immediately. Produce:
- Architecture Map
- Domain Map
- Auth/RBAC Map
- Academic Content Map
- Assessment Map
- Student/Teacher/Admin Map
- API Map
- Data Model Map
- Runtime dependency status
- Security risks
- Migration risks

Then wait for the next implementation instruction.
