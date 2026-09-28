/**
 * Normalization utilities for User Identifiers (Email, Phone, Student Code)
 * Compliant with RFC 5322, E.164, and Egyptian Baccalaureate naming standards.
 */

export function normalizeEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    throw new Error('البريد الإلكتروني غير صالح');
  }
  return email.trim().toLowerCase();
}

export function normalizeStudentCode(code: string): string {
  if (!code || typeof code !== 'string') {
    throw new Error('كود الطالب غير صالح');
  }
  // Remove whitespace and convert to uppercase e.g. EB-2026-STU-001
  return code.trim().toUpperCase().replace(/\s+/g, '');
}

export function normalizePhone(phone: string): string {
  if (!phone || typeof phone !== 'string') {
    return '';
  }
  // Retain only + and digits
  const cleaned = phone.trim().replace(/[^\d+]/g, '');
  // Normalize Egyptian numbers: 010... -> +2010...
  if (cleaned.startsWith('01') && cleaned.length === 11) {
    return `+2${cleaned}`;
  }
  return cleaned;
}

export interface SplitName {
  firstName: string;
  secondName?: string;
  thirdName?: string;
  lastName: string;
  displayName: string;
}

export function parseEgyptianFullName(rawFullName: string): SplitName {
  const parts = rawFullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { firstName: '', lastName: '', displayName: '' };
  }
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: parts[0], displayName: parts[0] };
  }
  if (parts.length === 2) {
    return { firstName: parts[0], lastName: parts[1], displayName: `${parts[0]} ${parts[1]}` };
  }
  if (parts.length === 3) {
    return {
      firstName: parts[0],
      secondName: parts[1],
      lastName: parts[2],
      displayName: rawFullName.trim()
    };
  }
  return {
    firstName: parts[0],
    secondName: parts[1],
    thirdName: parts.slice(2, parts.length - 1).join(' '),
    lastName: parts[parts.length - 1],
    displayName: rawFullName.trim()
  };
}
