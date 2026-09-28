# PHASE M1 — FEATURE PARITY & CONSOLIDATION MATRIX

## Purpose
Establish a lossless target for every major capability before deeper code consolidation.

## Domain inventory
- Accounting source components: 55
- Business Administration source components: 24

## Consolidation rule
No feature is deleted because another platform has an apparently similar feature. Similar features are first mapped to a common contract; domain-specific behavior remains available through adapters/templates.

| Capability | Classification | Target architecture |
|---|---|---|
| Authentication / Identity | COMMON | Platform Core — Identity |
| Student LMS | COMMON | Platform Core — Learning/LMS |
| Assessment Engine | COMMON | Platform Core — Assessment |
| Question Registry | COMMON | Platform Core — Canonical Question Registry |
| Glossary | COMMON | Platform Core — Glossary service + domain datasets |
| AI Tutor | COMMON | Platform Core — AI Tutor with domain grounding |
| JRE | COMMON | Platform Core — JRE engine + domain rubrics |
| Smart Review | BUSINESS-SPECIFIC | Genericize into Smart Review Engine |
| Integrative Cases | BUSINESS-SPECIFIC | Business Administration domain |
| Pedagogical Stations | BUSINESS-SPECIFIC | Business Administration domain; genericizable later |
| Interactive Diagrams | BUSINESS-SPECIFIC | Domain learning component; genericizable later |
| Accounting Simulator | ACCOUNTING-SPECIFIC | Accounting domain |
| T-Account Simulator | ACCOUNTING-SPECIFIC | Accounting domain |
| Documentary Cycle Simulator | ACCOUNTING-SPECIFIC | Accounting domain |
| Accounting Errors Lab | ACCOUNTING-SPECIFIC | Accounting domain |
| Capstone / Portfolio | COMMON | Platform Core + domain templates |
| Teacher Dashboard | COMMON | Platform Core — Teacher Workspace |
| Content Governance | COMMON | Platform Core — Content Governance |
| Source Provenance | COMMON | Platform Core — Provenance / lineage |
| Library / Publications | COMMON | Platform Core — Library |
| Adaptive Mastery | COMMON | Platform Core — Mastery / Adaptive |

## Business Administration feature inventory (source-preservation list)

- `AiTutorModal`
- `AssessmentQuizModal`
- `AssessmentsView`
- `BookReaderView`
- `ContentGovernanceDashboard`
- `FinalConnectingCardView`
- `GlossaryView`
- `IntegrativeCasesView`
- `InteractiveDiagrams`
- `JreLabView`
- `LibraryView`
- `Navbar`
- `PedagogicalStationsView`
- `PhilosophyAndCurriculumMapView`
- `PresentationToolbar`
- `PrivacyAndGovernanceModal`
- `QuestionBankView`
- `SmartReviewBankView`
- `SourceProvenanceBadge`
- `StudentLmsView`
- `TextbookLessonEnrichment`
- `TextbookQuestionsView`
- `UserNavBadge`
- `UserProfileModal`

## Accounting feature inventory (source-preservation list)

- `AccountingCapstoneStudio`
- `AccountingCyclePipeline`
- `AccountingErrorsCorrectionLab`
- `AccountingGlossaryModal`
- `AccountingSimulator`
- `AdaptiveRemediationStudio`
- `AdjustingEntriesSandbox`
- `AppShell`
- `AuthModal`
- `BilateralMindMapCanvas`
- `BookCover`
- `BookTableOfContents`
- `ContentAnalyticsModal`
- `CoverPage`
- `CustomExamGeneratorStudio`
- `DetailedBalanceSheetView`
- `DocumentaryCycleSimulator`
- `ExamSimulator`
- `FocusModeToggle`
- `Header`
- `IntegratedExercisesStudio`
- `JRETalker`
- `LessonViewer`
- `MethodologyReportModal`
- `MindMapView`
- `MinistryAssessmentsViewer`
- `MobileNavigation`
- `PlatformBooksModal`
- `PostingChallengeView`
- `PrintAssessmentsBook`
- `PrintGlossaryBooklet`
- `PrintLessonContent`
- `PrintToPdfModal`
- `PrintToolbar`
- `PrintView`
- `PsychometricMasteryView`
- `QuestionBankViewer`
- `Sidebar`
- `StudentDashboardModal`
- `StudentDashboardView`
- `StudentProgressCharts`
- `SubsidiaryBooksView`
- `TAccount`
- `TAccountSimulator`
- `TeacherCohortCenter`
- `TeacherDashboardModal`
- `TeacherPedagogicalDossier`
- `ThanaweyaStudentBar`
- `ThemeSwitcher`
- `UnitBilateralMindMapCanvas`
- `UnitMapAndOutcomes`
- `UnitReviewViewer`
- `WeeklyCurriculumPacingView`
- `subsidiaryData`
- `types`

## Gate status
**M1 inventory:** PASS for initial source inventory and target classification.
**M1 implementation:** PARTIAL — the Business Administration domain is mounted at `/business`; shared contracts are being introduced incrementally.
**No feature-loss claim:** permitted only after M1 implementation tests and content parity gates pass.

## Next phase
PHASE M2 — CONTENT PARITY & FORENSIC RECONCILIATION.
