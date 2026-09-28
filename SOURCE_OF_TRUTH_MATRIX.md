# SOURCE OF TRUTH MATRIX — M3

| Entity | Source of Truth | Legacy / consumer policy |
|---|---|---|
| Domain | CanonicalAcademicRegistry | UI-derived |
| Curriculum | CanonicalAcademicRegistry | UI-derived |
| Unit | CanonicalAcademicRegistry | Legacy data may be adapted, not authoritative |
| Lesson | CanonicalAcademicRegistry | Deep links resolve by canonical identity |
| Learning Objective | CanonicalAcademicRegistry | No display text identity |
| Concept / Skill | CanonicalAcademicRegistry | Explicit IDs |
| Content Block | CanonicalAcademicRegistry | Derived from source content |
| Question Identity | CanonicalQuestionRegistry + CanonicalAcademicRegistry | No array/index identity |
| Question Academic Status | Academic Validation Registry | Separate from storage |
| Exam Eligibility | Exam Eligibility state | Never inferred from storage |
| UI | Registry-derived | No competing academic source |
| Navigation | Canonical IDs | No index-based routes as identity |
| Reports | Registry-derived | Recomputable evidence |
