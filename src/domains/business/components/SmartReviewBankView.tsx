import React, { useState } from 'react';
import { UnitData } from '../types';
import { HelpCircle, CheckCircle2, ChevronDown, ChevronUp, Sparkles, BookOpen, AlertCircle, FileText } from 'lucide-react';

interface SmartReviewBankViewProps {
  unit: UnitData;
  scale?: 'normal' | 'large' | 'xlarge';
  onAskAi?: (topic: string, prompt: string) => void;
}

export const SmartReviewBankView: React.FC<SmartReviewBankViewProps> = ({
  unit,
  scale = 'normal',
  onAskAi
}) => {
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  const toggleReveal = (idx: number) => {
    setRevealedAnswers(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const revealAll = () => {
    const all: Record<number, boolean> = {};
    const quizCount = unit.smartReviewBank?.selfQuiz.length || 8;
    for (let i = 0; i < quizCount; i++) all[i] = true;
    setRevealedAnswers(all);
  };

  const hideAll = () => {
    setRevealedAnswers({});
  };

  const reviewBank = unit.smartReviewBank;
  const textScaleClass = scale === 'xlarge' ? 'text-lg leading-relaxed' : scale === 'large' ? 'text-base leading-relaxed' : 'text-sm leading-relaxed';

  // Model answers mapped to the 8 official self-quiz questions from the textbook
  const officialAnswers: Record<number, { text: string; keywords: string[] }> = {
    0: {
      text: "تتحول الهواية إلى منظمة أعمال عندما: 1) تُمارس عن قصد لتقديم قيمة للآخرين، 2) تُمارس بانتظام واستمرارية، 3) تتضمن عملية تبادل (غالبًا مقابل المال)، 4) تتطلب اتخاذ قرارات وتحمل المسؤوليات المستمرة والمخاطر.",
      keywords: ["القصد", "الاستمرارية", "التبادل المالي", "تحمل المسؤولية"]
    },
    1: {
      text: "الاحتياجات ضرورية للبقاء على قيد الحياة (مثل الطعام الأساسي والماء والملابس)، بينما الرغبات تحسن جودة الحياة وتوفر الراحة والرفاهية والتميز (مثل الحلويات الفاخرة والماركات العالمية والترفيه).",
      keywords: ["ضرورية للبقاء", "تحسين جودة الحياة", "تفضيل البدائل"]
    },
    2: {
      text: "السلعة منتج مادي ملموس يمكن لمسه وتخزينه ونقله (مثل المخبوزات والملابس)، أما الخدمة فهي أداء أو منفعة غير ملموسة تُستهلك في لحظة تقديمها (مثل التوصيل والتعليم والاستشارات)، وقد يجتمعان معًا في عرض هجين.",
      keywords: ["مادي ملموس", "أداء أو منفعة", "تكامل السلعة والخدمة"]
    },
    3: {
      text: "خلق القيمة يعني تقديم منفعة يقدرها العميل وتجعله يفضل العرض على البدائل المتاحة. وتتولد القيمة من التخصيص والالتزام بالمواعيد والجودة والموثوقية، ولا تقتصر على السعر المجرد.",
      keywords: ["تفضيل البدائل", "المنفعة المدركة", "التخصيص والالتزام"]
    },
    4: {
      text: "أصحاب المصلحة هم: 1) العملاء (يريدون جودة وسعرًا مناسبًا)، 2) الأسرة (تريد التوازن والتركيز على الدراسة)، 3) العاملون/المساعدون (يريدون أجرًا عادلاً وعبئًا محتملاً)، 4) المقهى (يريد توريدًا منتظمًا وتكلفة أقل)، 5) المجتمع المحلي (يتأثر بالسمعة والعدالة).",
      keywords: ["العملاء", "الأسرة", "العاملون", "المقهى", "المجتمع"]
    },
    5: {
      text: "القطاعات الثلاثة: 1) القطاع الأولي/الاستخراجي (استخراج الموارد الطبيعية كالزراعة والتعدين)، 2) القطاع الثانوي/التحويلي (تحويل المواد الخام إلى سلع كالمصانع والمخابز)، 3) القطاع الثالثي/الخدمي (تقديم الخدمات كالمقاهي والتوصيل والتجزئة).",
      keywords: ["استخراجي", "تحويلي / صناعي", "خدمي وتوزيع"]
    },
    6: {
      text: "لا؛ السعر لا يساوي القيمة دائمًا. قد يكون العرض أعلى سعرًا ولكنه يقدم قيمة أعلى بسبب التخصيص أو الموثوقية العالية. كما أن مجرد رفع السعر دون تحسين حقيقي في المنفعة لا يخلق أي قيمة إضافية للعميل.",
      keywords: ["السعر لا يساوي القيمة", "المنفعة المدركة", "تفضيل العميل"]
    },
    7: {
      text: "لا؛ تحقيق الربح شرط للبقاء والنمو الاقتصادي، لكنه ليس الغاية الوحيدة المنعزلة. فالمنظمة الناجحة تهدف إلى خلق قيمة للمجتمع وتلبية احتياجاته ومراعاة حقوق العاملين والعملاء والبيئة لضمان استمراريتها وعدالتها.",
      keywords: ["الربح شرط بقاء", "خلق القيمة للمجتمع", "الاستدامة والمسؤولية"]
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-xs">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-black uppercase text-amber-700 tracking-wider">الاستراتيجيات الاختبارية الرسمية</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-['Cairo']">بنك المراجعة الذكي وخريطة حل الأسئلة</h2>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          دليل صانع القرار في تفكيك الأسئلة الموضوعية والمقالية بالمنهجية المعتمدة، مع اختبار ذاتي شامل يغطي محاور الوحدة الأولى.
        </p>
      </div>

      {/* Grid: MCQ Strategy vs Essay Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* خريطة السؤال الموضوعي */}
        <div className="bg-blue-50/70 rounded-3xl p-6 border border-blue-200 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2.5 text-blue-950 border-b border-blue-200/60 pb-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase text-blue-700">أسئلة الاختيار من متعدد</span>
              <h3 className="text-base sm:text-lg font-black font-['Cairo']">خريطة إجابة السؤال الموضوعي</h3>
            </div>
          </div>

          <ul className="space-y-2.5 text-xs sm:text-sm text-blue-950 font-medium">
            {(reviewBank?.mcqStrategy || [
              "1. حدد الكلمة المفتاحية في السؤال.",
              "2. استدع التعريف الرسمي للمفهوم.",
              "3. استبعد البدائل التي تنتمي إلى مفهوم آخر.",
              "4. اربط الإجابة بالحالة إذا طلب السؤال تعليلًا."
            ]).map((step, idx) => (
              <li key={idx} className="p-3 bg-white/90 rounded-xl border border-blue-100 flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* خريطة السؤال المقالي */}
        <div className="bg-purple-50/70 rounded-3xl p-6 border border-purple-200 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2.5 text-purple-950 border-b border-purple-200/60 pb-3">
            <div className="w-8 h-8 rounded-xl bg-purple-700 text-white flex items-center justify-center font-bold shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase text-purple-700">الأسئلة المقالية والتحليلية</span>
              <h3 className="text-base sm:text-lg font-black font-['Cairo']">خريطة إجابة السؤال المقالي</h3>
            </div>
          </div>

          <div className="p-4 bg-white/90 rounded-2xl border border-purple-100 space-y-2">
            <div className="flex items-center justify-between text-xs font-black text-purple-900 border-b border-purple-100 pb-2">
              <span>المسار المعياري الخماسي:</span>
              <span className="text-amber-700">5 خطوات للعلامة الكاملة</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm font-black text-purple-900">
              <span className="px-2.5 py-1 bg-purple-100 rounded-md">1. تعريف</span>
              <span>←</span>
              <span className="px-2.5 py-1 bg-purple-100 rounded-md">2. تفسير</span>
              <span>←</span>
              <span className="px-2.5 py-1 bg-purple-100 rounded-md">3. تطبيق</span>
              <span>←</span>
              <span className="px-2.5 py-1 bg-purple-100 rounded-md">4. أثر</span>
              <span>←</span>
              <span className="px-2.5 py-1 bg-amber-200 text-amber-950 rounded-md">5. حكم</span>
            </div>
            <p className="text-xs text-purple-800/90 leading-relaxed font-medium pt-2">
              {reviewBank?.essayStrategy || "مثال تطبيقي: عرّف صاحب المصلحة، ثم اشرح اختلاف مصالحه، ثم طبّق على حالة مريم، ثم وضح أثر القرار على الأطراف، ثم أصدر توصية مبررة بالدليل."}
            </p>
          </div>
        </div>
      </div>

      {/* الاختبار الذاتي المختصر (8 أسئلة) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-amber-600">التقييم الذاتي السريع</span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 font-['Cairo']">
              اختبار ذاتي مختصر (الأسئلة الـ 8 الرسمية المعتمدة)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={revealAll}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100"
            >
              كشف كل الإجابات
            </button>
            <button
              onClick={hideAll}
              className="text-xs font-bold text-slate-600 hover:text-slate-800 px-3 py-1.5 rounded-lg bg-slate-100"
            >
              إخفاء الكل
            </button>
          </div>
        </div>

        <div className="space-y-3.5">
          {(reviewBank?.selfQuiz || []).map((qText, idx) => {
            const isRevealed = revealedAnswers[idx];
            const answerData = officialAnswers[idx];

            return (
              <div key={idx} className="rounded-2xl border border-slate-200 overflow-hidden transition-all bg-slate-50/50">
                <button
                  onClick={() => toggleReveal(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-right hover:bg-slate-100/60 transition-colors select-none"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 font-['Cairo']">
                      {qText.replace(/^\d+\.\s*/, '')}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 shrink-0">
                    <span className="hidden sm:inline">{isRevealed ? 'إخفاء الإجابة' : 'كشف الإجابة'}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isRevealed ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isRevealed && answerData && (
                  <div className="p-4 sm:p-5 bg-white border-t border-slate-200 space-y-3 animate-in fade-in duration-150">
                    <p className={`text-slate-800 font-medium ${textScaleClass}`}>
                      {answerData.text}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] font-black text-slate-500">الكلمات المفتاحية المطلوبة في التصحيح:</span>
                      {answerData.keywords.map((kw, i) => (
                        <span key={i} className="text-[10px] font-bold bg-amber-100 text-amber-950 px-2 py-0.5 rounded-md border border-amber-200">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
