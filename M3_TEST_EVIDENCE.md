# M3 TEST EVIDENCE

This file records the M3 validation performed against the shipped project snapshot.

## Registry static validation
- Canonical registry entries generated from actual M2 source files and the 697-question forensic manifest.
- Duplicate canonical IDs checked during generation.
- Parent references, domain references, and source references are validated by the registry API.
- Question states are represented separately from storage and eligibility.

## Baseline question reconciliation
- Canonical questions: 697
- Exam eligible in M2 manifest: 610
- Academic review / blocked: 87
- Unmapped: 0

## Required distinction
`STORED`, `ACADEMIC_VALIDATED`, and `EXAM_ELIGIBLE` are distinct registry states; stored does not imply exam eligibility.

## Runtime build/test
The final report records the actual results of the verification commands. A green install is not treated as a build pass.
