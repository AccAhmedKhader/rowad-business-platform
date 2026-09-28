import React, { useState } from 'react';
import { UnitData } from '../types';
import { Briefcase, ChevronDown, ChevronUp, HelpCircle, CheckCircle2, MessageSquare, Lightbulb, Sparkles } from 'lucide-react';

interface IntegrativeCasesViewProps {
  unit: UnitData;
  scale?: 'normal' | 'large' | 'xlarge';
  onAskAiAboutCase?: (caseTitle: string, prompt: string) => void;
}

export const IntegrativeCasesView: React.FC<IntegrativeCasesViewProps> = ({
  unit,
  scale = 'normal',
  onAskAiAboutCase
}) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [studentNotes, setStudentNotes] = useState<Record<string, string>>({});
  const [showAnalysis, setShowAnalysis] = useState<Record<string, boolean>>({
    'case-salma': true,
    'case-mahmoud': true,
    'case-hassan': true
  });

  const cases = unit.integrativeCases || [];
  const textScaleClass = scale === 'xlarge' ? 'text-lg leading-relaxed' : scale === 'large' ? 'text-base leading-relaxed' : 'text-sm leading-relaxed';

  const handleNoteChange = (caseId: string, val: string) => {
    setStudentNotes(prev => ({ ...prev, [caseId]: val }));
  };

  const toggleAnalysis = (caseId: string) => {
    setShowAnalysis(prev => ({ ...prev, [caseId]: !prev[caseId] }));
  };

  if (cases.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
        <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
        <p className="text-sm font-bold text-slate-600">لا توجد حالات تكاملية مخصصة لهذه الوحدة حالياً.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-xs">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-black uppercase text-amber-700 tracking-wider">التطبيق التكاملي الواقعي</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Cairo']">ثلاث حالات رسمية معتمدة للتحليل واتخاذ القرار</h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          تم تصميم هذه الحالات الثلاث من واقع البيئة المصرية لتمكين الطالب من تطبيق مصفوفة التحول، ومربع العميل، وخريطة التأثير، وسلسلة القيمة على سيناريوهات معاصرة.
        </p>
      </div>

      {/* Case Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {cases.map((c, idx) => {
          const isActive = activeCaseIndex === idx;
          return (
            <button
              key={c.id}
              onClick={() => setActiveCaseIndex(idx)}
              className={`p-4 rounded-2xl border text-right transition-all flex items-center justify-between ${
                isActive
                  ? 'bg-amber-500 border-amber-600 text-slate-950 shadow-sm font-black'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 font-bold'
              }`}
            >
              <div className="space-y-1">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                  isActive ? 'bg-slate-950 text-amber-300' : 'bg-slate-100 text-slate-600'
                }`}>
                  الحالة {idx + 1}
                </span>
                <h4 className="text-sm font-['Cairo']">{c.name}</h4>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isActive ? 'rotate-180' : ''}`} />
            </button>
          );
        })}
      </div>

      {/* Active Case Content */}
      {cases[activeCaseIndex] && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-amber-600">
                دراسة تفصيلية — الحالة رقم {activeCaseIndex + 1} من {cases.length}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Cairo']">
                {cases[activeCaseIndex].name}
              </h3>
            </div>

            {onAskAiAboutCase && (
              <button
                onClick={() => onAskAiAboutCase(cases[activeCaseIndex].name, `أريد تحليلاً إدارياً ومناقشة تفصيلية لحالة "${cases[activeCaseIndex].name}": ${cases[activeCaseIndex].story}`)}
                className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl border border-indigo-200 flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>استشر معلم الذكاء الاصطناعي</span>
              </button>
            )}
          </div>

          {/* Case Narrative Box */}
          <div className="p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">وقائع الحالة:</span>
            <p className={`text-slate-800 font-medium ${textScaleClass}`}>
              {cases[activeCaseIndex].story}
            </p>
          </div>

          {/* Analysis Path */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2 font-['Cairo']">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>مسار التحليل المعتمد وصناعة القرار:</span>
              </h4>
              <button
                onClick={() => toggleAnalysis(cases[activeCaseIndex].id)}
                className="text-xs text-amber-700 font-bold hover:underline"
              >
                {showAnalysis[cases[activeCaseIndex].id] ? 'إخفاء المسار' : 'إظهار المسار'}
              </button>
            </div>

            {showAnalysis[cases[activeCaseIndex].id] && (
              <div className="p-5 bg-amber-50/80 rounded-2xl border border-amber-200/90 text-amber-950 font-medium text-xs sm:text-sm leading-loose">
                {cases[activeCaseIndex].analysisPath}
              </div>
            )}
          </div>

          {/* Student Practice Interactive Scratchpad */}
          <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-indigo-950 font-['Cairo'] flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                <span>ملاحظاتك وتحليلك الخاص للحالة (تدريب صانع القرار):</span>
              </label>
              <span className="text-[11px] text-indigo-600 font-bold">يُحفظ أثناء الجلسة</span>
            </div>
            <textarea
              rows={3}
              value={studentNotes[cases[activeCaseIndex].id] || ''}
              onChange={(e) => handleNoteChange(cases[activeCaseIndex].id, e.target.value)}
              placeholder="اكتب هنا إجابتك عن أسئلة مسار التحليل، وتوصيتك كمدير أعمال مسؤول..."
              className="w-full p-3.5 rounded-xl bg-white border border-indigo-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>
        </div>
      )}
    </div>
  );
};
