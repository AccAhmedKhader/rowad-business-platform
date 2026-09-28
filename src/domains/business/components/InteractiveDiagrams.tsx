import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Layers, 
  Globe, 
  ShieldCheck, 
  Flame, 
  AlertTriangle, 
  Sparkles,
  DollarSign
} from 'lucide-react';

// ==========================================
// 1. Break-Even Interactive Simulator
// ==========================================
export const BreakEvenSimulator: React.FC = () => {
  const [fixedCosts, setFixedCosts] = useState<number>(6000);
  const [unitPrice, setUnitPrice] = useState<number>(25);
  const [unitVariableCost, setUnitVariableCost] = useState<number>(10);

  const contributionMargin = Math.max(1, unitPrice - unitVariableCost);
  const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
  const breakEvenRevenue = breakEvenUnits * unitPrice;

  // Sample production levels for mini-chart
  const sampleUnits = [
    Math.floor(breakEvenUnits * 0.5),
    breakEvenUnits,
    Math.floor(breakEvenUnits * 1.5)
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-6 rounded-2xl border border-slate-700 shadow-xl">
      <div className="flex items-center justify-between mb-4 border-b border-slate-700/80 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-base text-white">حاسبة ومحاكي نقطة التعادل التفاعلي (Break-Even Analysis)</h4>
            <p className="text-xs text-slate-400">تطبيق تفاعلي لمعادلة: نقطة التعادل = التكاليف الثابتة ÷ (سعر البيع - التكلفة المتغيرة)</p>
          </div>
        </div>
        <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30">
          الوحدة 9: التمويل وأداء الأعمال
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sliders Input */}
        <div className="space-y-4 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-300">التكاليف الثابتة الشهرية (إيجار، أفران، رواتب)</span>
              <span className="text-amber-400 font-mono font-bold">{fixedCosts.toLocaleString()} ج.م</span>
            </div>
            <input
              type="range"
              min={1000}
              max={20000}
              step={500}
              value={fixedCosts}
              onChange={(e) => setFixedCosts(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-300">سعر بيع القطعة للعميل (Unit Selling Price)</span>
              <span className="text-emerald-400 font-mono font-bold">{unitPrice} ج.م</span>
            </div>
            <input
              type="range"
              min={unitVariableCost + 1}
              max={150}
              step={1}
              value={unitPrice}
              onChange={(e) => setUnitPrice(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-300">التكلفة المتغيرة للقطعة (خامات، دقيق، تغليف)</span>
              <span className="text-rose-400 font-mono font-bold">{unitVariableCost} ج.م</span>
            </div>
            <input
              type="range"
              min={2}
              max={unitPrice - 1}
              step={1}
              value={unitVariableCost}
              onChange={(e) => setUnitVariableCost(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          <div className="pt-2 border-t border-slate-700/80 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>حرّك المؤشرات لتشاهد تأثير رفع السعر أو خفض التكاليف على نقطة التعادل فورًا.</span>
          </div>
        </div>

        {/* Calculated Results */}
        <div className="space-y-3">
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">هامش المساهمة للقطعة (Contribution Margin)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-amber-300 font-mono">{contributionMargin}</span>
              <span className="text-xs text-slate-400">ج.م / وحدة</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              المبلغ المتبقي من بيع كل قطعة للمساهمة في تغطية التكاليف الثابتة.
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-950/80 to-slate-800 p-4 rounded-xl border border-emerald-500/40">
            <span className="text-xs text-emerald-300 font-bold block mb-1">نقطة التعادل بالوحدات (Break-Even Units)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-400 font-mono">{breakEvenUnits.toLocaleString()}</span>
              <span className="text-xs text-emerald-200">قطعة شهريًا</span>
            </div>
            <p className="text-[11px] text-slate-300 mt-1">
              يجب بيع {breakEvenUnits.toLocaleString()} قطعة لمجرد تغطية التكاليف بدون ربح أو خسارة.
            </p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">إيرادات التعادل النقدية الإجمالية</span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white font-mono">{breakEvenRevenue.toLocaleString()}</span>
              <span className="text-xs text-slate-400">جنيه مصري</span>
            </div>
          </div>
        </div>

        {/* Visual Profit & Loss Interpretation */}
        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 flex flex-col justify-between">
          <h5 className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>خريطة الربح والخسارة عند مستويات إنتاج مختلفة:</span>
          </h5>

          <div className="space-y-2 text-xs">
            {sampleUnits.map((units, idx) => {
              const rev = units * unitPrice;
              const totalCost = fixedCosts + (units * unitVariableCost);
              const profit = rev - totalCost;
              const isBE = units === breakEvenUnits;
              const isProfit = profit > 0;

              return (
                <div 
                  key={idx} 
                  className={`p-2 rounded-lg border flex items-center justify-between ${
                    isBE 
                      ? 'bg-amber-500/10 border-amber-500/30' 
                      : isProfit 
                        ? 'bg-emerald-500/10 border-emerald-500/30' 
                        : 'bg-rose-500/10 border-rose-500/30'
                  }`}
                >
                  <div>
                    <span className="font-bold text-white block">{units.toLocaleString()} قطعة</span>
                    <span className="text-[10px] text-slate-400">
                      إيراد: {rev.toLocaleString()} | تكلفة: {totalCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`font-mono font-bold block ${
                      isBE ? 'text-amber-400' : isProfit ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {profit === 0 ? 'نقطة تعادل (0)' : profit > 0 ? `+${profit.toLocaleString()} ج.م ربح` : `${profit.toLocaleString()} ج.م خسارة`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 p-2 rounded bg-slate-900/60 text-[11px] text-amber-300/90 border border-amber-500/20">
            <strong>نصيحة وتوجيه اختباري:</strong> كل قطعة تُباع بعد القطعة رقم {breakEvenUnits.toLocaleString()} تحقق ربحًا صافيًا مقداره {contributionMargin} جنيه مباشرة!
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. Interactive Maslow Hierarchy of Needs
// ==========================================
export const MaslowPyramidInteractive: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<number>(4);

  const levels = [
    {
      level: 5,
      name: "5. تحقيق الذات (Self-Actualization)",
      color: "from-purple-600 to-indigo-600",
      workplaceNeeds: "فرص التعلم والابتكار، خوض تحديات جديدة، والمشاركة في رسم مستقبل المنظمة.",
      example: "تفويض دينا لابتكار وتطوير خط مخبوزات صحية جديد بالكامل باسمها."
    },
    {
      level: 4,
      name: "4. حاجات التقدير والاحترام (Esteem Needs)",
      color: "from-blue-600 to-cyan-600",
      workplaceNeeds: "الاعتراف بالإنجازات، الثناء العلني، الترقية، والشعور بالمكانة والمسؤولية.",
      example: "توجيه شكر علني لدينا أمام زميلاتها الجدد ومنحها لقب مسؤولة الجودة."
    },
    {
      level: 3,
      name: "3. الحاجات الاجتماعية والانتماء (Social Needs)",
      color: "from-emerald-600 to-teal-600",
      workplaceNeeds: "العمل الجماعي الودود، الأجواء الإيجابية، الشعور بالقبول والصداقة في العمل.",
      example: "تناول وجبة إفطار جماعية بين مريم ولينا ودينا وتجنب العزلة والعداء."
    },
    {
      level: 2,
      name: "2. حاجات الأمان والاستقرار (Safety Needs)",
      color: "from-amber-600 to-orange-600",
      workplaceNeeds: "الأمان الوظيفي (عقد مستقر)، بيئة عمل آمنة، والتأمين الصحي ومعدات الحماية.",
      example: "توفير قفازات حرارية عازلة لأفران الخَبز وضمان استمرار صرف الراتب في موعده."
    },
    {
      level: 1,
      name: "1. الحاجات الفسيولوجية الأساسية (Physiological Needs)",
      color: "from-rose-600 to-red-600",
      workplaceNeeds: "أجر مالي عادل يكفي للطعام والمسكن والملبس وفترات راحة كافية وبيئة صحية.",
      example: "دفع راتب شهري عادل يكفي مصاريف دينا المعيشية الأساسية."
    }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <h4 className="font-bold text-slate-900 text-base">هرم ماسلو للاحتياجات في بيئة العمل (Maslow's Hierarchy)</h4>
        </div>
        <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2.5 py-1 rounded-full border border-indigo-200">
          الوحدة 8: إدارة الموارد البشرية
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Visual Interactive Pyramid */}
        <div className="flex flex-col gap-2">
          {levels.map((item) => {
            const isSelected = activeLevel === item.level;
            return (
              <button
                key={item.level}
                onClick={() => setActiveLevel(item.level)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-white transition-all transform flex items-center justify-between shadow-xs ${
                  isSelected 
                    ? `bg-gradient-to-r ${item.color} ring-4 ring-indigo-200 scale-102` 
                    : 'bg-slate-700 hover:bg-slate-800 opacity-80'
                }`}
              >
                <span>{item.name}</span>
                {isSelected && <Sparkles className="w-4 h-4 text-amber-300 animate-bounce" />}
              </button>
            );
          })}
          <p className="text-[11px] text-slate-400 text-center mt-1">
            اضغط على أي مستوى في الهرم لرؤية تطبيقه في مكان العمل والمثال الواقعي.
          </p>
        </div>

        {/* Selected Level Details */}
        {(() => {
          const current = levels.find(l => l.level === activeLevel);
          if (!current) return null;
          return (
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                <span>المستوى {current.name}</span>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-700 block mb-1">المعنى في بيئة الأعمال:</span>
                <p className="text-xs text-slate-600 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200">
                  {current.workplaceNeeds}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-700 block mb-1">مثال تطبيقي من دراسة حالة مطبخ مريم:</span>
                <p className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                  {current.example}
                </p>
              </div>

              <div className="text-[11px] text-slate-500 pt-1">
                <strong>ربط هيرزبرج:</strong> المستويان 1 و2 يمثلان عوامل وقاية (Hygiene)، بينما المستويات 3 و4 و5 تمثل عوامل تحفيز حقيقية (Motivators).
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

// ==========================================
// 3. Interactive PESTEL Wheel
// ==========================================
export const PestelWheelInteractive: React.FC = () => {
  const [selectedDimension, setSelectedDimension] = useState<'P' | 'E' | 'S' | 'T' | 'ENV' | 'L'>('E');

  const dimensions = {
    P: {
      title: "العامل السياسي (Political)",
      badge: "P",
      color: "rose",
      definition: "الاستقرار السياسي، السياسات الحكومية العامة، ونظام الحكم والعلاقات الدولية.",
      egyptianExample: "استقرار الدولة وتوفير مناطق صناعية جديدة وتشجيع الدولة لرواد الأعمال والمشروعات الصغيرة."
    },
    E: {
      title: "العامل الاقتصادي (Economic)",
      badge: "E",
      color: "amber",
      definition: "معدلات التضخم، أسعار الفائدة على القروض، سعر صرف العملات الأجنبية، ومستوى القوة الشرائية.",
      egyptianExample: "ارتفاع أسعار الدقيق والزبدة المستوردة بنسبة 40% نتيجة تراجع سعر الصرف والتضخم، مما ضغط هوامش ربح المخابز."
    },
    S: {
      title: "العامل الاجتماعي (Social)",
      badge: "S",
      color: "emerald",
      definition: "القيم الثقافية، أنماط الحياة، التوزيع الديموغرافي للسكان، والاهتمام بالصحة والرياضة.",
      egyptianExample: "تزايد إقبال الشباب وأولياء الأمور على تناول مخبوزات عضوية قليلة السكر وخالية من الجلوتين."
    },
    T: {
      title: "العامل التكنولوجي (Technological)",
      badge: "T",
      color: "blue",
      definition: "الابتكارات الرقمية، تطبيقات التوصيل الذكية، منصات الدفع الإلكتروني، والأتمتة والذكاء الاصطناعي.",
      egyptianExample: "ظهور تطبيقات التوصيل السريع ونظم المحافظ الإلكترونية التي تتيح الدفع الفوري عبر الهاتف."
    },
    ENV: {
      title: "العامل البيئي / الإيكولوجي (Environmental)",
      badge: "E",
      color: "teal",
      definition: "الاستدامة البيئية، وفرة الموارد والمياه، إدارة النفايات، والتغيرات المناخية وترشيد الطاقة.",
      egyptianExample: "التوجه لمنع الأكياس البلاستيكية واستبدالها بعبوات كرتونية قابلة للتحلل الحيوي في تغليف الحلوى."
    },
    L: {
      title: "العامل القانوني / التشريعي (Legal)",
      badge: "L",
      color: "purple",
      definition: "القوانين والتشريعات الصادرة الملزمة، لوائح سلامة الغذاء، قانون العمل، والضرائب وحماية المستهلك.",
      egyptianExample: "صدور لائحة حكومية ملزمة بتدوين السعرات والقيمة الغذائية وتواريخ الصالحية الصارمة على المنتجات الغذائية."
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-amber-600" />
          <h4 className="font-bold text-slate-900 text-base">مختبر تحليل البيئة الخارجية الكلية (PESTEL Framework)</h4>
        </div>
        <span className="text-xs bg-amber-50 text-amber-700 font-bold px-2.5 py-1 rounded-full border border-amber-200">
          الوحدة 4: البيئة الداخلية والخارجية
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
        {(Object.keys(dimensions) as Array<keyof typeof dimensions>).map((key) => {
          const dim = dimensions[key];
          const isSelected = selectedDimension === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedDimension(key)}
              className={`p-3 rounded-xl font-bold text-xs transition-all flex flex-col items-center gap-1 border ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <span className="text-lg font-mono font-black">{dim.badge}</span>
              <span className="text-[11px] truncate w-full text-center">{dim.title.split(' ')[1]}</span>
            </button>
          );
        })}
      </div>

      {/* Detail Panel */}
      {(() => {
        const active = dimensions[selectedDimension];
        return (
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-bold text-slate-900 text-sm">{active.title}</h5>
              <span className="text-xs bg-white text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-mono font-bold">
                البعد: {active.badge}
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              <strong>المفهوم العلمي: </strong>{active.definition}
            </p>

            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <span className="text-xs font-bold text-amber-800 block mb-1">
                تطبيق واقعي من السوق المصري:
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {active.egyptianExample}
              </p>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

// ==========================================
// 4. Interactive Diagram Master Component
// ==========================================
export interface InteractiveDiagramProps {
  type: string;
}

export const InteractiveDiagram: React.FC<InteractiveDiagramProps> = ({ type }) => {
  switch (type) {
    case 'break-even':
      return <BreakEvenSimulator />;
    case 'maslow':
      return <MaslowPyramidInteractive />;
    case 'pestel':
      return <PestelWheelInteractive />;
    case 'leadership':
      return (
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border border-indigo-700/50 shadow-md">
          <div className="flex items-center justify-between mb-4 border-b border-indigo-700/50 pb-3">
            <h4 className="font-bold text-sm text-indigo-300">محاكي أساليب القيادة الموقفية (Situational Leadership)</h4>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-400/30">
              تفاعلي
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-indigo-500/30">
              <span className="font-bold text-rose-400 block mb-1">أوتوقراطي</span>
              <p className="text-[10px] text-slate-300">قرارات حازمة فورية، ملائم للطوارئ والحرائق والأزمات.</p>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-indigo-500/30">
              <span className="font-bold text-emerald-400 block mb-1">ديمقراطي</span>
              <p className="text-[10px] text-slate-300">مشاركة وتشاور، ملائم للتخطيط وبناء الفرق وتطوير المنتجات.</p>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-indigo-500/30">
              <span className="font-bold text-sky-400 block mb-1">تفويضي (حر)</span>
              <p className="text-[10px] text-slate-300">حرية تامة، ملائم للعلماء والخبراء والمصممين المحترفين.</p>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-amber-500/40 bg-amber-500/10">
              <span className="font-bold text-amber-400 block mb-1">موقفي (الأنسب)</span>
              <p className="text-[10px] text-slate-300">تكييف الأسلوب وفق كفاءة الفريق ونوع المهمة والوقت.</p>
            </div>
          </div>
        </div>
      );
    case 'swot':
      return (
        <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-700 shadow-md">
          <h4 className="font-bold text-sm text-amber-400 mb-3">مصفوفة التحليل الرباعي SWOT</h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40">
              <strong className="text-emerald-400 block">نقاط القوة (S - داخلية)</strong>
              <p className="text-slate-300 text-[11px] mt-1">كفاءة العاملين، جودة السلعة، تميز الوصفات، السيولة.</p>
            </div>
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40">
              <strong className="text-rose-400 block">نقاط الضعف (W - داخلية)</strong>
              <p className="text-slate-300 text-[11px] mt-1">أفران متهالكة، نقص التسويق، ديون مرتفعة، قلة المساحة.</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-950/60 border border-blue-500/40">
              <strong className="text-blue-400 block">الفرص (O - خارجية)</strong>
              <p className="text-slate-300 text-[11px] mt-1">تزايد طلب التوصيل، عقود شركات كبرى، دعم المشروعات الصغيرة.</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/40">
              <strong className="text-amber-400 block">التهديدات (T - خارجية)</strong>
              <p className="text-slate-300 text-[11px] mt-1">غلاء الخامات المستوردة، دخول منافس جديد، ضرائب جديدة.</p>
            </div>
          </div>
        </div>
      );
    default:
      return <PestelWheelInteractive />;
  }
};

