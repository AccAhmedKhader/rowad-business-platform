# ROWAD — PHASE M0 FORENSIC BASELINE & INITIAL DOMAIN MOUNT

## Status
**M0 BASELINE:** PASS for inventory generation and source preservation.
**Build verification:** BLOCKED by local dependency installation (`vite: not found` after `npm ci` transport timeout). This is an environment/dependency verification limitation, not a claim of source correctness.
**Production status:** NOT CLAIMED.

## Source inventory
| Metric | Accounting | Business Administration |
|---|---:|---:|
| Total source archive files | 473 | 189 |
| TS/TSX files | 348 | 155 |
| Markdown reports/docs | 79 | 22 |
| Data files (src/data) | 137 | 121 |
| Component source files | 60 | 24 |
| Test files detected | 37 | 0 |

## Initial consolidation
- Accounting is the technical foundation.
- Business Administration is mounted unchanged in concept under `src/domains/business`.
- Business-specific imports that assumed the old project root were adapted only for the new physical location; educational data/content was not rewritten.
- A unified `/business` route was added.
- A navigation entry was added to the Accounting platform's More menu.
- Original input ZIPs are preserved under `migration/snapshots/original_inputs/` with SHA-256 hashes.

## Non-loss controls
1. Original ZIPs preserved.
2. File manifests with SHA-256 hashes generated for both source projects.
3. Business domain remains isolated rather than flattening files into Accounting directories.
4. No educational question/lesson source files were intentionally deleted.
5. Later phases must reconcile IDs, content lineage, feature parity, and assessment registries before claiming merge completion.

## Critical observation
The two projects use different dependency baselines and application architectures. Therefore a direct file-level merge would be unsafe. The current mount is deliberately reversible and domain-isolated.

## Next gate
**PHASE M1 — FEATURE PARITY & CONSOLIDATION MATRIX**

M1 must inventory every feature from both platforms and classify it as `COMMON`, `ACCOUNTING-SPECIFIC`, `BUSINESS-SPECIFIC`, `GENERICIZABLE`, or `DUPLICATE`, with an explicit target location and verification test.
