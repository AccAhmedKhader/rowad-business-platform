import React from 'react';
import { UnitData } from '../types';
import { BookOpen, Compass, Layers, ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';

interface PhilosophyAndCurriculumMapViewProps {
  unit: UnitData;
  scale?: 'normal' | 'large' | 'xlarge';
}

export const PhilosophyAndCurriculumMapView: React.FC<PhilosophyAndCurriculumMapViewProps> = ({
  unit,
  scale = 'normal'
}) => {
  const textScaleClass = scale === 'xlarge' ? 'text-lg leading-relaxed' : scale === 'large' ? 'text-base leading-relaxed' : 'text-sm leading-relaxed';

  return (
    <div className="space-y-6">
      {/* فلسفة هذا الكتاب */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-black uppercase text-amber-700 tracking-wider">المنطلق التربوي للكتاب الخارجي المتقدم</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Cairo']">فلسفة هذا الشرح وبناء عقلية صانع القرار</h2>
          </div>
        </div>

        <div className="space-y-4 text-slate-800">
          <p className={`whitespace-pre-line ${textScaleClass} font-medium leading-loose`}>
            {unit.philosophy || "لا تُدرس الوحدة الأولى باعتبارها مجموعة تعريفات منفصلة، بل باعتبارها نقطة البداية في بناء عقلية صانع القرار. يبدأ الطالب من نشاط مريم البسيط، ثم يكتشف بالتدرج أن منظمة الأعمال لا تُعرَّف بحجمها، وأن القيمة ليست هي السعر، وأن القرار لا يؤثر في طرف واحد، وأن المنتج يصل إلى العميل عبر سلسلة اقتصادية مترابطة."}
          </p>
        </div>

        {/* المستويات الأربعة الثابتة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-3">
          {[
            { num: "1", title: "الفهم", desc: "ماذا يعني المفهوم في لغة إدارة الأعمال؟", color: "bg-blue-50 border-blue-200 text-blue-900" },
            { num: "2", title: "التحليل", desc: "كيف نستخدم المفهوم في تفسير حالة أو قرار؟", color: "bg-emerald-50 border-emerald-200 text-emerald-900" },
            { num: "3", title: "التطبيق", desc: "كيف نصنف ونقارن ونبرر؟", color: "bg-purple-50 border-purple-200 text-purple-900" },
            { num: "4", title: "الحكم", desc: "كيف نوازن بين المصالح ونصل إلى نتيجة مدعومة بالدليل؟", color: "bg-amber-50 border-amber-200 text-amber-950" }
          ].map((lvl, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border ${lvl.color} space-y-1.5`}>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-white/90 font-black text-xs flex items-center justify-center shadow-2xs">
                  {lvl.num}
                </span>
                <h4 className="font-black text-sm font-['Cairo']">{lvl.title}</h4>
              </div>
              <p className="text-xs leading-relaxed font-medium">
                {lvl.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* خريطة المنهج في فكرة واحدة */}
      {unit.curriculumMap && (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-700 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider">البوصلة الكلية للوحدة الأولى</span>
              <h2 className="text-xl sm:text-2xl font-black text-white font-['Cairo']">خريطة المنهج في فكرة واحدة</h2>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-100 font-bold text-base sm:text-lg leading-relaxed font-['Cairo']">
            «{unit.curriculumMap.singleIdea}»
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-black text-slate-300 font-['Cairo']">
              تربط هذه الجملة أقسام الوحدة الأربعة الأساسية:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {unit.curriculumMap.coreSections.map((sec, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-white font-['Cairo']">{sec.title}</h4>
                    <p className="text-xs text-amber-300/90 font-medium mt-0.5">{sec.question}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700/80 text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-2.5">
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p>
              {unit.curriculumMap.futureConnections}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
