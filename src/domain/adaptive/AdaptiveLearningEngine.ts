export type AdaptiveAction = 'REVIEW_LESSON' | 'PRACTICE' | 'CHALLENGE' | 'ASSESSMENT';

export interface AdaptiveLearningStep {
  priority: number;
  action: AdaptiveAction;
  lessonId: string;
  reasonAr: string;
  masteryScore: number;
  targetScore: number;
  questionCount: number;
}

export interface AdaptiveLearningPlan {
  userId: string;
  status: 'INSUFFICIENT_DATA' | 'RECOVERY' | 'GROWTH' | 'MASTERY';
  confidence: number;
  steps: AdaptiveLearningStep[];
  generatedAt: string;
}

export class AdaptiveLearningEngine {
  buildPlan(params: { userId: string; attempts: Array<{ lesson_id: string; is_correct: boolean; difficulty?: string; timestamp?: string }>; lessons: Array<{ id: string }> }): AdaptiveLearningPlan {
    const groups = new Map<string, { attempts: number; correct: number; recentCorrect: number }>();
    for (const a of params.attempts) {
      const g = groups.get(a.lesson_id) || { attempts: 0, correct: 0, recentCorrect: 0 };
      g.attempts += 1; if (a.is_correct) g.correct += 1;
      groups.set(a.lesson_id, g);
    }
    if (!params.attempts.length) return { userId: params.userId, status: 'INSUFFICIENT_DATA', confidence: 0, steps: [], generatedAt: new Date().toISOString() };
    const steps = [...groups.entries()].map(([lessonId, g]) => {
      const score = Math.round((g.correct / g.attempts) * 100);
      const action: AdaptiveAction = score < 60 ? 'REVIEW_LESSON' : score < 75 ? 'PRACTICE' : score >= 90 ? 'CHALLENGE' : 'ASSESSMENT';
      const reasonAr = score < 60 ? 'أداء منخفض؛ ابدأ بمراجعة الدرس ثم تدريب موجّه.' : score < 75 ? 'الإتقان في طور النمو؛ زد التدريب قبل الانتقال.' : score >= 90 ? 'إتقان مرتفع؛ يمكن الانتقال إلى أسئلة التحدي.' : 'الإتقان مقبول؛ استخدم اختبار تحقق قصير.';
      return { priority: score < 60 ? 1 : score < 75 ? 2 : 3, action, lessonId, reasonAr, masteryScore: score, targetScore: score < 75 ? 80 : 90, questionCount: score < 60 ? 5 : 8 };
    }).sort((a,b) => a.priority - b.priority || a.masteryScore - b.masteryScore).slice(0, 8);
    const avg = Math.round(steps.reduce((s,x)=>s+x.masteryScore,0) / Math.max(steps.length,1));
    const status = avg < 60 ? 'RECOVERY' : avg < 85 ? 'GROWTH' : 'MASTERY';
    return { userId: params.userId, status, confidence: Math.min(1, params.attempts.length / 25), steps, generatedAt: new Date().toISOString() };
  }
}
export const adaptiveLearningEngine = new AdaptiveLearningEngine();
