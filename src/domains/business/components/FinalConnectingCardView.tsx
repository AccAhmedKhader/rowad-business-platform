import React from 'react';
import { UnitData } from '../types';
import { Scale, Link2, BookMarked, Sparkles, CheckCircle2, ChevronLeft, ShieldCheck } from 'lucide-react';

interface FinalConnectingCardViewProps {
  unit: UnitData;
  scale?: 'normal' | 'large' | 'xlarge';
  onOpenJreModal?: (unit: UnitData) => void;
}

export const FinalConnectingCardView: React.FC<FinalConnectingCardViewProps> = ({
  unit,
  scale = 'normal',
  onOpenJreModal
}) => {
  const textScaleClass = scale === 'xlarge' ? 'text-lg leading-relaxed' : scale === 'large' ? 'text-base leading-relaxed' : 'text-sm leading-relaxed';

  return (
    <div className="space-y-6">
      {/* 1. بطاقة الربط النهائي للوحدة */}
      {unit.finalConnectingCard && (
        <div className="bg-gradient-to-br from-amber-500 via-amber-400 to-amber-600 text-slate-950 rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
          <div className="flex items-center gap-3 border-b border-amber-600/30 pb-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center font-black shadow-xs">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-slate-950/70 tracking-wider">الربط الشامل والمخرجات</span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 font-['Cairo']">بطاقة الربط النهائي للوحدة الأولى</h2>
            </div>
          </div>

          <p className="text-sm sm:text-base font-bold text-slate-950 leading-loose whitespace-pre-line font-['Cairo']">
            {unit.finalConnectingCard}
          </p>
        </div>
      )}

      {/* 2. الحكم والاستدلال الختامي (JRE) — بناء الإجابة المتقدمة */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-700 text-white flex items-center justify-center font-black shadow-xs">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-purple-700 tracking-wider">التقييم الوزاري الختامي للوحدة الأولى</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Cairo']">الحكم والاستدلال (Judgment & Reasoning Evidence)</h3>
            </div>
          </div>

          {onOpenJreModal && (
            <button
              onClick={() => onOpenJreModal(unit)}
              className="px-4 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-black text-xs rounded-xl shadow-xs flex items-center gap-2 transition-colors"
            >
              <span>فتح مختبر JRE التفاعلي</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* السؤال الرسمي */}
        <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
          <span className="text-xs font-black text-purple-900 uppercase">السؤال الرسمي المعتمد:</span>
          <p className="text-base sm:text-lg font-black text-purple-950 font-['Cairo']">
            «{unit.jreQuestion.prompt}»
          </p>
        </div>

        {/* بناء الإجابة المتقدمة (5 أركان) */}
        <div className="space-y-3.5">
          <h4 className="text-sm font-black text-slate-900 font-['Cairo'] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-700" />
            <span>هيكل الإجابة النموذجية المتقدمة وفق سلم التصحيح:</span>
          </h4>

          <div className="grid grid-cols-1 gap-3">
            {/* الحكم */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-purple-800 bg-purple-100 px-2 py-0.5 rounded">1. الحكم الصريح (Judgment)</span>
              </div>
              <p className={`text-slate-800 font-bold ${textScaleClass}`}>
                {unit.jreQuestion.modelAnswer.judgment}
              </p>
            </div>

            {/* التبرير */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-blue-800 bg-blue-100 px-2 py-0.5 rounded">2. التبرير الاقتصادي والسببي (Reasoning)</span>
              </div>
              <p className={`text-slate-800 font-medium ${textScaleClass}`}>
                {unit.jreQuestion.modelAnswer.reasoning}
              </p>
            </div>

            {/* الدليل */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">3. الدليل والبرهان من واقع الحالات (Evidence)</span>
              </div>
              <p className={`text-slate-800 font-medium ${textScaleClass}`}>
                {unit.jreQuestion.modelAnswer.evidence}
              </p>
            </div>

            {/* الموازنة */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded">4. الموازنة ووجهة النظر البديلة (Counter Argument / Balance)</span>
              </div>
              <p className={`text-slate-800 font-medium ${textScaleClass}`}>
                {unit.jreQuestion.modelAnswer.counterArgument}
              </p>
            </div>

            {/* الخاتمة */}
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-purple-900 bg-purple-200 px-2 py-0.5 rounded">5. الخاتمة والتوصية المبررة (Conclusion)</span>
              </div>
              <p className={`text-purple-950 font-bold ${textScaleClass}`}>
                {unit.jreQuestion.modelAnswer.conclusion}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. المراجع المعتمدة */}
      {unit.references && unit.references.length > 0 && (
        <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200 space-y-2.5">
          <div className="flex items-center gap-2 text-slate-700 text-xs font-black font-['Cairo']">
            <BookMarked className="w-4 h-4 text-slate-500" />
            <span>المراجع والمصادر الرسمية:</span>
          </div>
          <ul className="space-y-1 text-xs text-slate-600 font-mono">
            {unit.references.map((ref, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="text-amber-600 font-bold">[{idx + 1}]</span>
                <span>{ref}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
