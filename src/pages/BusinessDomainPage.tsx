import React from 'react';
import BusinessApp from '../domains/business/App';

/**
 * Unified Rowad Platform — Business Administration academic domain.
 *
 * The Business Administration source is mounted as a domain application
 * without rewriting or deleting its pedagogical components/data. This is
 * the first consolidation step; shared services will be wired in later
 * merge phases behind explicit adapters.
 */
export const BusinessDomainPage: React.FC = () => {
  return (
    <section
      data-rowad-domain="business-administration"
      aria-label="رواد — إدارة الأعمال ببساطة وإتقان"
      className="min-h-screen w-full"
      dir="rtl"
    >
      <BusinessApp />
    </section>
  );
};
