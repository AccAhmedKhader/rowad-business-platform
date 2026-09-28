/**
 * M3 Canonical Academic Registry — generated from the verified M2 baseline.
 * Do not hand-edit generated entries; regenerate from the M2 manifest when source evidence changes.
 */
import registryData from './canonicalAcademicRegistry.json';

export type CanonicalEntityType = 'Platform'|'Domain'|'Curriculum'|'Unit'|'Lesson'|'LearningObjective'|'Concept'|'Skill'|'ContentBlock'|'Question'|'Assessment'|'Reference';
export type RegistryStatus = 'ACTIVE'|'STORED'|'ACADEMIC_REVIEW'|'ACADEMIC_VALIDATED'|'EXAM_ELIGIBLE'|'REJECTED'|'BLOCKED'|'DUPLICATE'|'NEEDS_REVIEW';
export interface CanonicalRegistryEntry {
  canonicalId: string; entityType: CanonicalEntityType; domainId: string; curriculumId: string; parentCanonicalId: string|null; sourceIds: string[]; title: string; status: RegistryStatus; version: number; metadata: Record<string, unknown>;
}

const entries = registryData.entries as CanonicalRegistryEntry[];
const byId = new Map(entries.map(e => [e.canonicalId, e]));

export const CanonicalAcademicRegistry = {
  all(): readonly CanonicalRegistryEntry[] { return entries; },
  get(canonicalId: string): CanonicalRegistryEntry | undefined { return byId.get(canonicalId); },
  byType(entityType: CanonicalEntityType): CanonicalRegistryEntry[] { return entries.filter(e => e.entityType === entityType); },
  byDomain(domainId: string): CanonicalRegistryEntry[] { return entries.filter(e => e.domainId === domainId); },
  children(parentCanonicalId: string): CanonicalRegistryEntry[] { return entries.filter(e => e.parentCanonicalId === parentCanonicalId); },
  questionStatus(canonicalId: string): RegistryStatus | undefined { const e=byId.get(canonicalId); return e?.entityType === 'Question' ? e.status : undefined; },
  validate(): { duplicateIds:string[]; orphanIds:string[]; invalidDomainIds:string[]; sourceLessIds:string[]; pass:boolean } {
    const seen = new Set<string>(), duplicateIds:string[]=[];
    for (const e of entries) { if (seen.has(e.canonicalId)) duplicateIds.push(e.canonicalId); seen.add(e.canonicalId); }
    const domainIds = new Set(entries.filter(e=>e.entityType==='Domain').map(e=>e.canonicalId));
    const orphanIds = entries.filter(e=>e.parentCanonicalId && !byId.has(e.parentCanonicalId)).map(e=>e.canonicalId);
    const invalidDomainIds = entries.filter(e=>e.entityType!=='Platform' && e.entityType!=='Domain' && !domainIds.has(`ruwad:domain:${e.domainId}`)).map(e=>e.canonicalId);
    const sourceLessIds = entries.filter(e=>e.entityType!=='Platform' && e.sourceIds.length===0).map(e=>e.canonicalId);
    return {duplicateIds,orphanIds,invalidDomainIds,sourceLessIds,pass:!duplicateIds.length&&!orphanIds.length&&!invalidDomainIds.length&&!sourceLessIds.length};
  }
};

export const M3_QUESTION_SUMMARY = registryData.questionSummary;
