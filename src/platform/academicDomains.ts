export type AcademicDomainId = 'accounting' | 'business-administration';

export interface AcademicDomainDefinition {
  id: AcademicDomainId;
  nameAr: string;
  shortNameAr: string;
  brand: string;
  route: string;
  status: 'active';
}

/** Canonical domain registry for the unified Rowad platform. */
export const ACADEMIC_DOMAINS: readonly AcademicDomainDefinition[] = [
  {
    id: 'accounting',
    nameAr: 'المحاسبة ببساطة وإتقان',
    shortNameAr: 'المحاسبة',
    brand: 'رواد',
    route: '/curriculum',
    status: 'active',
  },
  {
    id: 'business-administration',
    nameAr: 'إدارة الأعمال ببساطة وإتقان',
    shortNameAr: 'إدارة الأعمال',
    brand: 'رواد',
    route: '/business',
    status: 'active',
  },
] as const;

export function getAcademicDomain(id: AcademicDomainId) {
  return ACADEMIC_DOMAINS.find(domain => domain.id === id);
}
