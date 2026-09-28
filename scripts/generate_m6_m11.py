from pathlib import Path
import json,datetime,re
r=Path('/tmp/rowad_m3'); o=r/'docs'/'phases_m6_m11'; o.mkdir(parents=True,exist_ok=True)
features={
'authentication':('COMMON','Core','src/server/auth','existing shared auth services'),
'authorization':('COMMON','Core','src/server/auth','existing authorization service'),
'student-lms':('COMMON','Core','src/domains/business/components/StudentLmsView.tsx','Business implementation retained; accounting counterpart requires runtime verification'),
'assessment':('COMMON','Core + Domain','src/domain/assessment','Accounting canonical assessment + Business assessment adapter'),
'mastery':('COMMON','Core','src/domain/analytics/StudentMasteryEngine.ts','shared engine exists'),
'analytics':('COMMON','Core','src/domain/analytics','shared analytics engines exist'),
'jre':('GENERICIZABLE','Core + Domain','src/domain/assessment/jre; src/domains/business/components/JreLabView.tsx','shared rubric/engine plus Business UI'),
'smart-review':('GENERICIZABLE','Core + Domain','src/domains/business/components/SmartReviewBankView.tsx','Business source retained; generic engine contract required'),
'ai-tutor':('GENERICIZABLE','Core + Domain','src/domains/business/components/AiTutorModal.tsx','domain-aware context required'),
'glossary':('GENERICIZABLE','Core + Domain','src/data/glossary; src/domains/business/components/GlossaryView.tsx','domain-specific data with shared service/UI contract'),
'integrative-cases':('BUSINESS-SPECIFIC','Business Administration','src/domains/business/components/IntegrativeCasesView.tsx','retain'),
't-account-simulator':('ACCOUNTING-SPECIFIC','Accounting','src/components/simulator','retain'),
'pedagogical-stations':('BUSINESS-SPECIFIC','Business Administration','src/domains/business/components/PedagogicalStationsView.tsx','retain'),
}
(o/'FEATURE_REGISTRY_M6.json').write_text(json.dumps({'phase':'M6','generatedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'features':[{'featureId':k,'classification':v[0],'target':v[1],'source':v[2],'migrationNote':v[3]} for k,v in features.items()]},ensure_ascii=False,indent=2))
(o/'M6_FEATURE_CONSOLIDATION.md').write_text('''# M6 — Feature Consolidation\n\nFeatures are classified as COMMON, ACCOUNTING-SPECIFIC, BUSINESS-SPECIFIC, or GENERICIZABLE. No feature is deleted merely for consolidation. The machine-readable registry is `FEATURE_REGISTRY_M6.json`.\n\n**Gate:** static classification complete; runtime parity remains pending until the unified build/test suite completes.\n''')
(o/'M7_UNIFIED_IDENTITY_AUDIT.md').write_text('''# M7 — Unified Identity Audit\n\nExisting shared identity/authentication infrastructure was identified under `src/server/auth`, `src/context/AuthContext.tsx`, `src/domains/business/context/UserContext.tsx`, and related tests.\n\n## Required consolidation\n- one canonical user identity\n- one role/permission authority\n- domain access represented as authorization context, not duplicate users\n- preserve existing Business UI context through an adapter\n\n**Gate:** architecture/audit complete; runtime cross-domain identity regression is pending.\n''')
(o/'M8_UNIFIED_ASSESSMENT_PLAN.md').write_text('''# M8 — Unified Assessment\n\nTarget model:\n`STORED → ACADEMIC_REVIEW → ACADEMIC_VALIDATED → EXAM_ELIGIBLE`\n\nAccounting already has a canonical assessment registry and eligibility logic. Business retains its source assessment/question structures and must be adapted into the same contract without rewriting content.\n\n**Hard rule:** stored does not imply exam eligible.\n\n**Gate:** contract established; cross-domain runtime validation pending.\n''')
(o/'M9_SECURITY_AUTHORIZATION_GATE.md').write_text('''# M9 — Security & Authorization\n\nExisting Accounting security/auth tests and services are retained as the technical baseline. Business access must resolve through the same authorization authority.\n\nRequired checks: server-side authorization, protected mutation paths, session/JWT validation, role/domain authorization, answer-key protection, and auditability.\n\n**Gate:** static evidence present; full unified regression pending runtime execution.\n''')
(o/'M10_FULL_REGRESSION.md').write_text('''# M10 — Full Regression\n\nRequired suites:\n1. Accounting regression\n2. Business regression/validators\n3. Unified Core regression\n4. Cross-domain navigation and identity\n5. Assessment and grading regression\n\nCurrent environment blocker: dependency installation/build/test execution timed out. Therefore no PASS is asserted.\n''')
(o/'M11_CONTENT_FORENSIC_GATE.md').write_text('''# M11 — Content Forensic Gate\n\nRequired proof:\n- Accounting before = Accounting after by IDs, hashes, counts, relationships\n- Business before = Business after by IDs, hashes, counts, relationships\n- zero silent loss\n- zero required orphans\n- zero broken LO links\n- zero answer-key conflicts\n\nM4/M5 source manifests provide the current file-level hashes. A final content gate requires comparison against the original M0/M2 snapshots and must be executed before Golden Master.\n\nStatus: **PENDING FINAL FORENSIC COMPARISON**.\n''')
(o/'M12_GOLDEN_MASTER_GATE.md').write_text('''# M12 — Golden Master Gate\n\nNot yet declared. It requires successful M10 runtime regression and M11 forensic evidence plus zero critical security regressions and verified assessment eligibility.\n''')
print('generated',len(features))
