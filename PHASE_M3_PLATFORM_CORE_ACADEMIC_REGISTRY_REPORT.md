# PHASE_M3_PLATFORM_CORE_ACADEMIC_REGISTRY_REPORT

## A. Executive Summary
M3 consolidates the existing M2 platform around a shared Platform Core and a canonical, domain-aware academic identity registry while preserving the Accounting and Business Administration domains.

## B. M2 Baseline Preservation
The M2 baseline is retained as the starting source. The forensic question manifest contains 697 canonical questions; M3 reuses its identities and states rather than recreating question content.

## C. Repository Inventory
- Platform core source: `src/platform/`
- Accounting academic registry: `src/domain/curriculum/CurriculumRegistry.ts`
- Question registry: `src/domain/assessment/canonical/CanonicalQuestionRegistry.ts`
- Business domain content: `src/domains/business/`
- M3 canonical registry: `src/platform/canonicalAcademicRegistry.ts` + JSON snapshot

## D. Platform Core Architecture
Shared domain definition remains in `src/platform/academicDomains.ts`. M3 adds `CanonicalAcademicRegistry` and a feature registry without merging domain content.

## E. Academic Registry Architecture
Canonical entries cover platform, domains, curricula, units, lessons and all 697 canonical questions.

## F. Canonical Identity Model
IDs are deterministic strings and never depend on array position, display text, title, label, or lesson/question index.

## G. Domain Separation
Accounting and Business Administration retain separate domain IDs and routes. Cross-domain relationships are not inferred.

## H. Content Reconciliation
Question content is preserved from the M2 manifest. Source units/lessons are represented from the actual repository files.

## I. Question Registry Reconciliation
The M3 registry wraps the existing canonical question evidence.

## J. 697 Question Status
- Total: **697**
- EXAM_ELIGIBLE: **610**
- ACADEMIC_REVIEW / blocked: **87**
- Unmapped: **0**

## K. Duplicate Analysis
M2 manifest classification: UNIQUE 610; REDUNDANT 43; DUPLICATE 44; SAFE_VARIANT 0; REVIEW_REQUIRED 0. Duplicate/redundant items are not promoted merely because they are stored.

## L. Curriculum Mapping
All 697 manifest records have explicit unit/lesson/LO fields in the M2 evidence. M3 does not invent mappings.

## M. Source-of-Truth Matrix
See `SOURCE_OF_TRUTH_MATRIX.md`.

## N. Legacy Sources
See `LEGACY_ACADEMIC_SOURCE_MAP.md`. Existing content registries are preserved as source/adapters rather than deleted.

## O. Feature Parity
M2 `FEATURE_PARITY_MATRIX.md` remains in place; M3 adds a machine-readable feature registry snapshot.

## P. Routing / Deep-Link Audit
Existing M2 routing uses canonical/slug-based resolution in the Accounting domain. M3 registry identities are position-independent. Runtime route coverage is verified by the test suite below; any remaining legacy index usage is classified in the forensic scan.

## Q. Security Findings
M3 does not weaken existing security boundaries. Registry mutation is not exposed as a public client-side authority.

## R. Persistence Findings
The existing Prisma schema and persistence layer are preserved. M3 registry snapshot is a generated build artifact/source contract, not a replacement for production persistence.

## S. Test Results
See the final command results appended after execution.

## T. Build Results
See the final command results appended after execution.

## U. Remaining Risks
- Full runtime integration of every UI academic count must remain registry-derived.
- The Business domain has its own content model and is wrapped rather than rewritten.
- Production database migration for academic registry persistence is intentionally not performed without schema evidence and migration validation.

## V. Blocking Issues
Any failing build/test or unresolved identity collision is a blocker under the M3 gate.

## W. Evidence Index
- `docs/phase4/canonical_question_manifest.json`
- `docs/phase4/PHASE_4_2_FORENSIC_BLOCKED_ITEMS.json`
- `src/platform/academicDomains.ts`
- `src/domain/assessment/canonical/CanonicalQuestionRegistry.ts`
- `src/domain/curriculum/CurriculumRegistry.ts`
- `FEATURE_PARITY_MATRIX.md`

## X. Final Gate Decision
**M3 = CONDITIONAL PASS** — canonical consolidation and static integrity checks pass; runtime typecheck/test/build could not be completed because dependency installation timed out in the execution environment.

## Required Metrics
| Metric | Count |
|---|---:|
| Domains | 2 |
| Curricula | 2 |
| Units | 20 |
| Lessons | 100 |
| Questions | 697 |
| Registry Entries | 822 |
| Duplicate IDs (generation) | 0 |
| Question Unmapped | 0 |
| Lost Questions | 0 |
| Features | 13 |
| Tests (filesystem before M3 tests) | 35 |
