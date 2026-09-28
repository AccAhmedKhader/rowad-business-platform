# LEGACY ACADEMIC SOURCE MAP — M3

| Source | Classification | Action |
|---|---|---|
| `src/domain/curriculum/CurriculumRegistry.ts` | KEEP / ADAPTER | Preserve existing Accounting APIs; canonical registry becomes identity authority |
| `src/domain/assessment/canonical/CanonicalQuestionRegistry.ts` | KEEP / WRAP | Preserve 697-question canonical assessment registry; expose through M3 academic registry |
| `src/domains/business/data/units/*.ts` | WRAP | Preserve Business content; canonical IDs are registry identities |
| `src/domain/curriculum/canonicalUnit*.ts` | WRAP | Preserve Accounting canonical unit content |
| `src/domains/business/data/questionBanks/*` | MIGRATE / WRAP | Preserve as source content; do not treat array position as identity |
| hard-coded counts / index navigation | DEPRECATE | Replace with registry-derived values where used as academic identity |

No source is deleted by M3 solely for consolidation.
