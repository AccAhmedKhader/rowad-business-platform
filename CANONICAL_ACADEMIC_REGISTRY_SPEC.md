# CANONICAL ACADEMIC REGISTRY — M3

## Purpose
Single Source of Truth for academic identity across Accounting and Business Administration. The registry is domain-aware and position-independent.

## Identity
`canonicalId` is deterministic, stable, unique, domain-aware, and independent of array position. Display text, labels, titles, and indexes are never primary identity.

## Entry contract
```ts
{ canonicalId, entityType, domainId, curriculumId, parentCanonicalId, sourceIds, title, status, version, metadata }
```

## Question lifecycle
`STORED → ACADEMIC_REVIEW → ACADEMIC_VALIDATED → EXAM_ELIGIBLE`, with `REJECTED`, `BLOCKED`, `DUPLICATE`, and `NEEDS_REVIEW` as non-eligible states.

## Source of truth
Domain/Curriculum/Unit/Lesson/LO/Concept/Skill/ContentBlock: Canonical Academic Registry. Question identity: Canonical Question Registry wrapped by this registry. Academic status: validation state; exam eligibility: eligibility state. UI/navigation/reporting must consume registry-derived identity.

## M2 question baseline
697 canonical questions are preserved from the M2 forensic manifest; no question text was regenerated.
