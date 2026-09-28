# M4 — Business Domain Migration

Status: **MIGRATION-READY / ADAPTER-BASED**

## Scope
- Business Administration remains an independent academic domain.
- Existing Business content is preserved under `src/domains/business`.
- No academic rewriting is performed.
- Existing Business services/components/data remain the source inputs for migration.
- Migration is represented by manifests + canonical domain boundary; legacy data is not deleted.

## Preserved feature families
Pedagogical Stations, Integrative Cases, JRE Lab, Smart Review Bank, Interactive Diagrams, Glossary, Textbook Questions, Assessments, Student LMS, AI Tutor, Library, Curriculum Map, Content Governance, Source Provenance, Teacher Guide, Textbook Lesson Enrichment, Content Validator.

## Gate
M4 is not declared runtime PASS until the unified build/test suite is executed successfully.
