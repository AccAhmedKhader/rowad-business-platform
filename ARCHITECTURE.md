# ROWAD BUSINESS — Architecture

## 1. Product boundary
ROWAD BUSINESS is a unified platform with two independent academic domains:

| Domain | ID | Route |
|---|---|---|
| Accounting | `accounting` | `/curriculum` |
| Business Administration | `business-administration` | `/business` |

The domains share platform services but retain independent academic source boundaries.

## 2. Major layers
```text
Presentation / Routes
        ↓
Domain Applications
        ↓
Platform Services
        ↓
Academic / Assessment / Mastery Engines
        ↓
Persistence / Server APIs
```

## 3. Core platform areas
- Authentication and identity
- RBAC / authorization
- User lifecycle and sessions
- Academic registry and source provenance
- Assessment and grading authority
- Student mastery
- Adaptive learning
- Teacher/student management
- Academic quality governance
- Security audit chain
- Platform command center
- Gemini-assisted educational features

## 4. Academic source rule
Official academic content remains domain-owned. Platform services may index, analyze, assess, or recommend against it, but must not silently rewrite it.

## 5. Assessment rule
Stored questions are not automatically exam-eligible. Eligibility follows the existing academic review/validation contract.

## 6. Security rule
Authorization is server-side. UI visibility is not a security boundary. Answer keys and privileged mutations must remain protected by the existing authorization layer.

## 7. AI rule
Gemini is an assistive layer. Canonical registries, academic source snapshots, grading authority, and authorization remain deterministic platform authorities.

## 8. Key directories
- `src/platform` — shared platform primitives
- `src/domain` — shared domain services and academic engines
- `src/domains/business` — Business Administration domain
- `src/data` — academic/platform data sources
- `src/server` — server APIs, auth, repositories, security
- `src/pages` — application pages
- `docs` — phase and governance documentation
- `migration` — source maps, snapshots, adapters, and migration evidence
- `prisma` — persistence schema/migrations

## 9. Runtime commands
```bash
npm ci
npm run lint
npm test
npm run build
npm run dev
```
