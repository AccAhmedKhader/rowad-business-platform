export type QualityStatus = 'PASS' | 'REVIEW' | 'BLOCKED';
export type ReviewLayer = 'OFFICIAL' | 'ENRICHMENT' | 'ASSESSMENT';

export interface AcademicQualityFinding {
  id: string;
  layer: ReviewLayer;
  severity: 'CRITICAL' | 'MAJOR' | 'MINOR' | 'INFO';
  status: QualityStatus;
  messageAr: string;
  sourceRef?: string;
}

export interface AcademicQualityItem {
  questionId: string;
  curriculumMapped: boolean;
  sourceTraceable: boolean;
  hasAnswerKey: boolean;
  hasDifficulty: boolean;
  hasObjective: boolean;
  status: QualityStatus;
  findings: AcademicQualityFinding[];
}

export interface AcademicQualityReport {
  generatedAt: string;
  totalQuestions: number;
  passCount: number;
  reviewCount: number;
  blockedCount: number;
  officialTraceabilityRate: number;
  answerKeyCoverageRate: number;
  objectiveCoverageRate: number;
  difficultyCoverageRate: number;
  items: AcademicQualityItem[];
}

export class AcademicQualityGate {
  inspectQuestion(q: any): AcademicQualityItem {
    const findings: AcademicQualityFinding[] = [];
    const curriculumMapped = Boolean(q.learningObjectiveId || q.learning_objective_id || q.lessonId || q.lesson_id);
    const sourceTraceable = Boolean(q.sourceMapping?.source_document || q.sourceMapping?.source_page || q.pageRef || q.source_page);
    const hasAnswerKey = q.correctAnswer !== undefined && q.correctAnswer !== null && String(q.correctAnswer).trim() !== '';
    const hasDifficulty = ['basic','intermediate','advanced','challenge'].includes(String(q.difficulty));
    const hasObjective = Boolean(q.learningObjectiveId || q.learning_objective_id);

    if (!curriculumMapped) findings.push({ id: 'M16-MAP-001', layer: 'OFFICIAL', severity: 'MAJOR', status: 'REVIEW', messageAr: 'السؤال غير مربوط بموقع/ناتج تعلم محدد في المصدر الحالي.' });
    if (!sourceTraceable) findings.push({ id: 'M16-SRC-001', layer: 'OFFICIAL', severity: 'MINOR', status: 'REVIEW', messageAr: 'لا توجد إحالة مصدرية كافية يمكن تتبعها من البيانات الحالية.' });
    if (!hasAnswerKey) findings.push({ id: 'M16-KEY-001', layer: 'ASSESSMENT', severity: 'CRITICAL', status: 'BLOCKED', messageAr: 'مفتاح الإجابة غير متاح؛ لا يُسمح باعتبار البند جاهزًا للاختبار.' });
    if (!hasDifficulty) findings.push({ id: 'M16-DIF-001', layer: 'ASSESSMENT', severity: 'MINOR', status: 'REVIEW', messageAr: 'مستوى الصعوبة غير مصنف.' });
    if (!hasObjective) findings.push({ id: 'M16-OBJ-001', layer: 'ASSESSMENT', severity: 'MAJOR', status: 'REVIEW', messageAr: 'ناتج التعلم غير محدد صراحة.' });

    const status: QualityStatus = findings.some(f => f.status === 'BLOCKED') ? 'BLOCKED' : findings.some(f => f.status === 'REVIEW') ? 'REVIEW' : 'PASS';
    return { questionId: String(q.id || 'unassigned'), curriculumMapped, sourceTraceable, hasAnswerKey, hasDifficulty, hasObjective, status, findings };
  }

  inspectBank(questions: any[]): AcademicQualityReport {
    const items = questions.map(q => this.inspectQuestion(q));
    const total = items.length || 1;
    const rate = (fn: (x: AcademicQualityItem) => boolean) => Math.round((items.filter(fn).length / total) * 100);
    return {
      generatedAt: new Date().toISOString(),
      totalQuestions: questions.length,
      passCount: items.filter(i => i.status === 'PASS').length,
      reviewCount: items.filter(i => i.status === 'REVIEW').length,
      blockedCount: items.filter(i => i.status === 'BLOCKED').length,
      officialTraceabilityRate: rate(i => i.curriculumMapped && i.sourceTraceable),
      answerKeyCoverageRate: rate(i => i.hasAnswerKey),
      objectiveCoverageRate: rate(i => i.hasObjective),
      difficultyCoverageRate: rate(i => i.hasDifficulty),
      items
    };
  }
}

export const academicQualityGate = new AcademicQualityGate();
