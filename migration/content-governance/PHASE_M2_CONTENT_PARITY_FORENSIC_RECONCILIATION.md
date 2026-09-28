# PHASE M2 — CONTENT PARITY & FORENSIC RECONCILIATION

**Project:** ROWAD Unified Platform  
**Domains:** Accounting / Business Administration  
**Gate:** M2 — Content Parity & Forensic Reconciliation  
**Status:** PASS — Content Preservation Gate  
**Build status:** NOT CLAIMED (dependency installation/build remains a separate gate)

---

## 1. Objective

Prove, before deep platform consolidation, that neither source platform loses educational, pedagogical, assessment, governance, or traceability material.

The rule for this phase is:

> **Migration is not allowed to modify academic source content.**

The merged platform therefore preserves source material byte-for-byte where it is mounted as a domain, while source-level academic governance artifacts are preserved separately under `migration/content-governance`.

---

## 2. Source Baseline

| Domain | Original files | Primary content area | Result |
|---|---:|---|---|
| Accounting | 473 | `src/data`, `src/domain/curriculum`, `src/domain/assessment` | Preserved |
| Business Administration | 189 | `src/data` + academic QA/Governance artifacts | Preserved |

Original ZIP snapshots remain immutable under:

`migration/snapshots/original_inputs/`

with the original SHA-256 inventory retained in `SHA256SUMS.txt`.

---

## 3. Business Administration — Exact Source Parity

The complete original Business `src` tree was compared with its mounted destination:

`original/src/*` → `merged/src/domains/business/*`

### Result

- **154 / 154 source files exact SHA-256 parity**
- **0 changed content files**
- **0 missing source files**
- **0 content-file substitutions**

This is the strongest available evidence that the Business educational runtime source was not rewritten during M0/M1 mounting.

---

## 4. Business Academic Content Inventory

The source contains:

| Asset | Count |
|---|---:|
| Unit source files | 10 |
| Lesson records/markers | 42 |
| Teacher-guide files | 41 |
| Question-bank source files | 23 |
| Question IDs in question-bank sources | 361 |
| Unique question IDs | 361 |
| Duplicate question IDs | 0 |
| Textbook-question IDs | 191 |
| Unit-assessment source files | 25 |
| Assessment IDs in unit-assessment sources | 361 |
| Unique assessment IDs | 361 |
| Golden/master question matrices | 4 |

The four available question-level master matrices contain, excluding CSV headers:

- U01: 220 rows
- U02: 213 rows
- U03: 116 rows
- U04: 72 rows

These matrix counts are **not summed with question-bank/textbook/assessment counts**, because the sources overlap by design and doing so would double-count assessment material.

---

## 5. Business Golden-Master / Pedagogical Evidence Preserved

The following source-level QA and academic-governance artifacts were not part of the runtime `src` tree. They were therefore explicitly preserved under:

`migration/content-governance/business/original-root/`

A total of **25 non-runtime academic/governance files** were identified and preserved, including Golden Master QA reports, LO matrices, assessment traceability matrices, duplication analyses, official-assessment performance reports, and textbook-question golden dumps.

No such file is treated as disposable documentation.

---

## 6. Business Question Identity Gate

A forensic scan of the Business question-bank sources found:

- Total question-ID occurrences: **361**
- Unique question IDs: **361**
- Duplicate IDs inside Business question banks: **0**

A cross-domain comparison against Accounting source IDs found:

- Cross-domain question-ID collisions: **0**

Therefore Business question IDs can remain stable during the next migration phase without requiring forced renumbering solely because of an Accounting ID collision.

---

## 7. Accounting Content Parity

The following Accounting content-bearing areas were compared between the original source and the unified platform:

| Area | Files checked | Missing | Changed | Exact |
|---|---:|---:|---:|---:|
| `src/data` | 137 | 0 | 0 | 137 |
| `src/domain/curriculum` | 19 | 0 | 0 | 19 |
| `src/domain/assessment` | 14 | 0 | 0 | 14 |

### Accounting source evidence

The retained Accounting Phase 1/3 audit reports document:

- 12 curriculum lessons across Units 1–2 in the verified Phase 1 scope.
- 130 question references mapped to lessons without loss or duplication.
- Structural parity checks for lesson content.
- Registry-based curriculum consumption.
- Deep-linking and UI-registry binding in the subsequent Phase 3 gate.

These claims are retained as source audit evidence; this M2 phase does **not** reinterpret them as a new independent academic validation.

---

## 8. Content Lineage

M2 introduces a content-parity manifest:

`migration/content-governance/M2_CONTENT_PARITY_MANIFEST.json`

It records source and destination SHA-256 values for Business domain files and the key forensic reconciliation results.

This establishes a traceability chain:

```text
Original ZIP
    ↓
Immutable Snapshot
    ↓
Source File
    ↓
Mounted Academic Domain
    ↓
SHA-256 Parity
    ↓
Canonicalization / Consolidation (future phase)
```

The canonicalization stage has **not** been allowed to modify source academic material in M2.

---

## 9. Verification Script

A repeatable verifier was added:

`scripts/forensic/verifyM2ContentParity.cjs`

Current result:

```text
M2 CONTENT PARITY PASS
Business src exact parity: 154/154
Business question IDs unique: 361
Cross-domain ID collisions: 0
```

---

## 10. Important Boundary

This PASS means:

> **Content preservation and reconciliation passed.**

It does **not** mean:

- the final unified platform builds successfully;
- all Business routes are already integrated into the unified navigation model;
- all duplicate services have been consolidated;
- the two assessment engines have been unified;
- identity/LMS/mastery have been unified;
- the final production database has been migrated;
- final security regression has passed.

Those are later gates.

---

## 11. M2 Gate Decision

### `PHASE M2 — CONTENT PARITY & FORENSIC RECONCILIATION: PASS`

**Reason:**

1. Business runtime source content: **154/154 exact**.
2. Accounting content-bearing areas: **170/170 exact** across the audited content directories.
3. Business question-bank IDs: **361 unique / 0 duplicates**.
4. Cross-domain question-ID collision: **0**.
5. 25 previously unmounted Business academic/governance artifacts were identified and preserved.
6. Original ZIP snapshots remain available for rollback and forensic comparison.
7. A repeatable parity verifier is present and passes.

### Next permitted phase

# PHASE M3 — PLATFORM CORE & ACADEMIC REGISTRY CONSOLIDATION

The next phase may consolidate Identity, Curriculum, Question, Assessment, Learning, Mastery, Analytics, AI, Audit, and shared platform services **without altering the preserved academic source material**.
