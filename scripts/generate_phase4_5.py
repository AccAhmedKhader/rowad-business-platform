from pathlib import Path
import hashlib,json,datetime,os
root=Path('/tmp/rowad_m3')
out=root/'docs'/'phase4_5'
out.mkdir(parents=True,exist_ok=True)

def sha(p):
 h=hashlib.sha256(); h.update(p.read_bytes()); return h.hexdigest()
def inventory(base):
 rows=[]
 for p in sorted(base.rglob('*')):
  if p.is_file() and 'node_modules' not in p.parts and '.git' not in p.parts:
   rows.append({'path':str(p.relative_to(root)),'bytes':p.stat().st_size,'sha256':sha(p)})
 return rows
business=inventory(root/'src/domains/business')
accounting=inventory(root/'src/data')
(out/'BUSINESS_DOMAIN_M4_MANIFEST.json').write_text(json.dumps({'phase':'M4','domain':'business-administration','generatedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'fileCount':len(business),'files':business},ensure_ascii=False,indent=2))
(out/'ACCOUNTING_DOMAIN_M5_MANIFEST.json').write_text(json.dumps({'phase':'M5','domain':'accounting','generatedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'fileCount':len(accounting),'files':accounting},ensure_ascii=False,indent=2))

def md(name,body): (out/name).write_text(body,encoding='utf-8')
md('M4_BUSINESS_DOMAIN_MIGRATION.md', '''# M4 — Business Domain Migration\n\nStatus: **MIGRATION-READY / ADAPTER-BASED**\n\n## Scope\n- Business Administration remains an independent academic domain.\n- Existing Business content is preserved under `src/domains/business`.\n- No academic rewriting is performed.\n- Existing Business services/components/data remain the source inputs for migration.\n- Migration is represented by manifests + canonical domain boundary; legacy data is not deleted.\n\n## Preserved feature families\nPedagogical Stations, Integrative Cases, JRE Lab, Smart Review Bank, Interactive Diagrams, Glossary, Textbook Questions, Assessments, Student LMS, AI Tutor, Library, Curriculum Map, Content Governance, Source Provenance, Teacher Guide, Textbook Lesson Enrichment, Content Validator.\n\n## Gate\nM4 is not declared runtime PASS until the unified build/test suite is executed successfully.\n''')
md('M5_ACCOUNTING_DOMAIN_REBINDING.md', '''# M5 — Accounting Domain Rebinding\n\nStatus: **REBINDING CONTRACT ESTABLISHED**\n\n## Scope\n- Accounting remains the technical foundation while its academic domain identity is explicit.\n- Existing Accounting content and registries are preserved.\n- Canonical domain: `accounting`.\n- Existing `/curriculum` route is retained to avoid an unplanned route-contract break.\n- Accounting question data remains under the canonical assessment path and is not rewritten.\n\n## Required runtime verification\n- accounting curriculum deep links\n- accounting question deep links\n- registry-derived counts\n- grading and mastery regression\n- authentication/authorization regression\n\n## Gate\nNo runtime PASS until build/test evidence is available.\n''')
md('M4_M5_MIGRATION_GATE.md', '''# M4/M5 Migration Gate\n\n| Gate | Result | Evidence |\n|---|---|---|\n| Business domain isolated | PASS (static) | `BUSINESS_DOMAIN_M4_MANIFEST.json` |\n| Business content preserved as source inputs | PASS (static) | business source inventory |\n| Accounting domain identity explicit | PASS (static) | `src/platform/academicDomains.ts` |\n| Accounting source inventory | PASS (static) | `ACCOUNTING_DOMAIN_M5_MANIFEST.json` |\n| Academic rewrite during migration | NONE | source-preservation policy |\n| Runtime build | BLOCKED | execution environment timeout |\n| Runtime tests | BLOCKED | execution environment timeout |\n\nDecision: **CONDITIONAL / NOT FINAL PASS**.\n''')
print(len(business),len(accounting))
