import React from 'react';
import { UnitLesson } from '../types';
import { 
  Compass, 
  Wrench, 
  Heart, 
  Network, 
  AlertOctagon, 
  ListOrdered, 
  CheckCircle2, 
  Lightbulb,
  ArrowLeftRight
} from 'lucide-react';

interface TextbookLessonEnrichmentProps {
  lesson: UnitLesson;
  scale?: 'normal' | 'large' | 'xlarge';
}

export const TextbookLessonEnrichment: React.FC<TextbookLessonEnrichmentProps> = ({
  lesson,
  scale = 'normal'
}) => {
  const textScaleClass = scale === 'xlarge' ? 'text-lg leading-relaxed' : scale === 'large' ? 'text-base leading-relaxed' : 'text-sm leading-relaxed';

  return (
    <div className="space-y-6">
      {/* 1. الموقف التمهيدي */}
      {lesson.priorContext && (
        <div className="bg-amber-50/80 rounded-3xl p-5 sm:p-6 border border-amber-200/90 shadow-2xs space-y-3">
          <div className="flex items-center gap-2.5 text-amber-900 border-b border-amber-200/60 pb-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-2xs">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 block">مدخل الدرس الاستكشافي</span>
              <h3 className="text-base sm:text-lg font-black font-['Cairo'] text-slate-900">الموقف التمهيدي: انطلاق الفكرة والقرار</h3>
            </div>
          </div>
          <p className={`whitespace-pre-line text-slate-800 ${textScaleClass}`}>
            {lesson.priorContext}
          </p>
        </div>
      )}

      {/* 2. أداة التحليل الرسمية */}
      {lesson.analysisTool && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-indigo-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-indigo-100 pb-3">
            <div className="flex items-center gap-2.5 text-indigo-900">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0 shadow-2xs">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 block">أداة اتخاذ القرار والتحليل</span>
                <h3 className="text-base sm:text-lg font-black font-['Cairo'] text-slate-900">{lesson.analysisTool.title}</h3>
              </div>
            </div>
            <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-3 py-1 rounded-full border border-indigo-200">
              أداة معتمدة
            </span>
          </div>

          <p className={`text-slate-700 font-medium ${textScaleClass}`}>
            {lesson.analysisTool.description}
          </p>

          {/* Table if available */}
          {lesson.analysisTool.table && (
            <div className="overflow-x-auto rounded-2xl border border-indigo-100 shadow-2xs">
              <table className="w-full text-right text-xs sm:text-sm">
                <thead className="bg-indigo-50 text-indigo-950 font-black border-b border-indigo-100">
                  <tr>
                    {lesson.analysisTool.table.headers.map((h, i) => (
                      <th key={i} className="p-3.5 sm:p-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-indigo-50 bg-white">
                  {lesson.analysisTool.table.rows.map((row, i) => (
                    <tr key={i} className="hover:bg-indigo-50/40 transition-colors">
                      <td className="p-3.5 sm:p-4 font-bold text-slate-900 bg-slate-50/50 w-1/3">
                        {row.label}
                      </td>
                      {row.values.map((v, idx) => (
                        <td key={idx} className="p-3.5 sm:p-4 text-slate-700 leading-relaxed">
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Steps if available */}
          {lesson.analysisTool.steps && (
            <div className="bg-indigo-50/60 p-4 sm:p-5 rounded-2xl border border-indigo-100 space-y-2">
              <h4 className="text-xs font-black text-indigo-950 font-['Cairo']">خطوات تطبيق الأداة في التحليل:</h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-indigo-900 font-medium">
                {lesson.analysisTool.steps.map((st, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold shrink-0">•</span>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Application */}
          {lesson.analysisTool.application && (
            <div className="p-4 sm:p-5 bg-amber-50/60 rounded-2xl border border-amber-200/70 text-xs sm:text-sm space-y-1">
              <strong className="text-amber-900 font-black block font-['Cairo']">التطبيق العملي للأداة:</strong>
              <p className="text-slate-800 leading-relaxed">{lesson.analysisTool.application}</p>
            </div>
          )}
        </div>
      )}

      {/* 3. البعد السلوكي والتربوي + الرابط المنهجي */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {lesson.behavioralDimension && (
          <div className="bg-emerald-50/70 rounded-3xl p-5 border border-emerald-200 space-y-3 shadow-2xs">
            <div className="flex items-center gap-2.5 text-emerald-950 border-b border-emerald-200/60 pb-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4" />
              </div>
              <h4 className="text-sm sm:text-base font-black font-['Cairo']">البعد السلوكي والتربوي</h4>
            </div>
            <p className={`text-emerald-950 font-medium ${textScaleClass}`}>
              {lesson.behavioralDimension}
            </p>
          </div>
        )}

        {lesson.curriculumLinks && lesson.curriculumLinks.length > 0 && (
          <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 space-y-3 shadow-md">
            <div className="flex items-center gap-2.5 text-amber-400 border-b border-slate-800 pb-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold">
                <Network className="w-4 h-4" />
              </div>
              <h4 className="text-sm sm:text-base font-black font-['Cairo'] text-white">الرابط المنهجي بالوحدات اللاحقة</h4>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 font-medium">
              {lesson.curriculumLinks.map((link, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">←</span>
                  <span className="leading-relaxed">{link}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 4. فخ الاختبار والتقييم (Exam Traps) */}
      {lesson.examTrapsList && lesson.examTrapsList.length > 0 && (
        <div className="bg-rose-50/70 rounded-3xl p-5 sm:p-6 border border-rose-200 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 text-rose-900 border-b border-rose-200/60 pb-3">
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold shrink-0 shadow-2xs">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-rose-700 block">التحصين ضد الأخطاء الشائعة</span>
              <h3 className="text-base sm:text-lg font-black font-['Cairo'] text-slate-900">فخ الاختبار والتقييم (مغالطات شائعة وتصحيحها المعتمد)</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lesson.examTrapsList.map((trapItem, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-rose-100 shadow-2xs space-y-2">
                <div className="flex items-start gap-2 text-rose-700 text-xs sm:text-sm font-bold">
                  <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-2 py-0.5 rounded shrink-0">خطأ شائع</span>
                  <span>{trapItem.trap}</span>
                </div>
                <div className="flex items-start gap-2 text-emerald-800 text-xs sm:text-sm font-medium pt-1 border-t border-slate-100">
                  <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-2 py-0.5 rounded shrink-0">التصحيح المعتمد</span>
                  <span className="leading-relaxed">{trapItem.correction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. التدريب المتدرج (المستويات الأربعة) */}
      {lesson.tieredTraining && lesson.tieredTraining.length > 0 && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 text-slate-900 border-b border-slate-100 pb-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0 shadow-2xs">
              <ListOrdered className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 block">بناء المهارات تدريجيًا</span>
              <h3 className="text-base sm:text-lg font-black font-['Cairo'] text-slate-900">تدريب متدرج (الفهم • التطبيق • التحليل • الحكم)</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {lesson.tieredTraining.map((item, idx) => {
              const badgeColors = [
                'bg-blue-100 text-blue-800 border-blue-200',
                'bg-emerald-100 text-emerald-800 border-emerald-200',
                'bg-purple-100 text-purple-800 border-purple-200',
                'bg-rose-100 text-rose-800 border-rose-200'
              ];
              return (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <span className={`text-[11px] font-black px-2.5 py-1 rounded-md border inline-block ${badgeColors[idx % badgeColors.length]}`}>
                    {item.level}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                    {item.task}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. خلاصة الدرس */}
      {lesson.lessonSummary && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-3xl p-5 sm:p-6 shadow-md flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-950 text-amber-400 flex items-center justify-center font-black shrink-0 shadow-xs">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-amber-950/80 block">خلاصة الدرس في جملة حاسمة</span>
            <p className="text-sm sm:text-base font-bold text-slate-950 font-['Cairo'] leading-relaxed">
              {lesson.lessonSummary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
