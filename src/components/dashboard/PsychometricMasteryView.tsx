import React, { useState } from 'react';
import { 
  Award, 
  TrendingUp, 
  BarChart3, 
  Target, 
  Brain, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Zap, 
  BookOpen, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Activity,
  Filter,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface ConceptMasteryDisplay {
  id: string;
  conceptName: string;
  unitTitle: string;
  bloomLevel: 'KNOWLEDGE' | 'APPLICATION' | 'ANALYSIS';
  accuracy: number;
  masteryStatus: 'MASTERED' | 'PROFICIENT' | 'DEVELOPING' | 'NEEDS_WORK';
  attemptsCount: number;
  lastTested: string;
}

export const PsychometricMasteryView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedBloomFilter, setSelectedBloomFilter] = useState<'ALL' | 'KNOWLEDGE' | 'APPLICATION' | 'ANALYSIS'>('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('ALL');

  // Baseline psychometric matrix data aligned with Egyptian Curriculum
  const conceptsData: ConceptMasteryDisplay[] = [
    {
      id: 'c-1',
      conceptName: 'أثر المعاملات المالية على طرفي معادلة الميزانية',
      unitTitle: 'الوحدة 1: الإطار المفاهيمي',
      bloomLevel: 'APPLICATION',
      accuracy: 94,
      masteryStatus: 'MASTERED',
      attemptsCount: 16,
      lastTested: 'منذ يومين'
    },
    {
      id: 'c-2',
      conceptName: 'التمييز بين النفقات الإيرادية والنفقات الرأسمالية وأثرها',
      unitTitle: 'الوحدة 1: الإطار المفاهيمي',
      bloomLevel: 'ANALYSIS',
      accuracy: 88,
      masteryStatus: 'PROFICIENT',
      attemptsCount: 12,
      lastTested: 'منذ 3 أيام'
    },
    {
      id: 'c-3',
      conceptName: 'تحليل الفواتير وسندات الصرف والقبض واستخراج القيود',
      unitTitle: 'الوحدة 2: الدورة المستندية',
      bloomLevel: 'APPLICATION',
      accuracy: 92,
      masteryStatus: 'MASTERED',
      attemptsCount: 20,
      lastTested: 'منذ يوم'
    },
    {
      id: 'c-4',
      conceptName: 'التفرقة بين الخصم التجاري والخصم النقدي (تعجيل الدفع)',
      unitTitle: 'الوحدة 2: الدورة المستندية',
      bloomLevel: 'KNOWLEDGE',
      accuracy: 85,
      masteryStatus: 'PROFICIENT',
      attemptsCount: 14,
      lastTested: 'منذ 4 أيام'
    },
    {
      id: 'c-5',
      conceptName: 'الترحيل من اليوميات المساعدة إلى دفاتر الأستاذ العام والمساعد',
      unitTitle: 'الوحدة 3: اليوميات المساعدة',
      bloomLevel: 'APPLICATION',
      accuracy: 82,
      masteryStatus: 'PROFICIENT',
      attemptsCount: 18,
      lastTested: 'أمس'
    },
    {
      id: 'c-6',
      conceptName: 'كشف الأخطاء التي لا تؤثر على توازن ميزان المراجعة وتصحيحها',
      unitTitle: 'الوحدة 4: ميزان المراجعة والأخطاء',
      bloomLevel: 'ANALYSIS',
      accuracy: 62,
      masteryStatus: 'DEVELOPING',
      attemptsCount: 10,
      lastTested: 'منذ 5 أيام'
    },
    {
      id: 'c-7',
      conceptName: 'معالجة فروق ميزان المراجعة بالحساب المعلق وإقفاله',
      unitTitle: 'الوحدة 4: ميزان المراجعة والأخطاء',
      bloomLevel: 'APPLICATION',
      accuracy: 58,
      masteryStatus: 'NEEDS_WORK',
      attemptsCount: 11,
      lastTested: 'منذ 3 أيام'
    },
    {
      id: 'c-8',
      conceptName: 'التسويات الجردية للمصروفات والإيرادات المقدمة والمستحقة',
      unitTitle: 'الوحدة 5: التسويات الجردية',
      bloomLevel: 'APPLICATION',
      accuracy: 74,
      masteryStatus: 'DEVELOPING',
      attemptsCount: 15,
      lastTested: 'اليوم'
    },
    {
      id: 'c-9',
      conceptName: 'إعداد مذكرة تسوية البنك ومعالجة الإيداعات بالطريق والشيكات المعلقة',
      unitTitle: 'الوحدة 6: الرقابة والبنك',
      bloomLevel: 'ANALYSIS',
      accuracy: 69,
      masteryStatus: 'DEVELOPING',
      attemptsCount: 8,
      lastTested: 'منذ 6 أيام'
    }
  ];

  const filteredConcepts = conceptsData.filter(c => {
    if (selectedBloomFilter !== 'ALL' && c.bloomLevel !== selectedBloomFilter) return false;
    if (selectedStatusFilter !== 'ALL' && c.masteryStatus !== selectedStatusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8 font-serif" dir="rtl">
      
      {/* 1. Psychometric Benchmark Banner */}
      <div className="bg-[#1D1D1B] text-[#F9F7F2] p-6 sm:p-8 border-2 border-[#1D1D1B] space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#C4A484] text-[#1D1D1B] flex items-center justify-center font-black">
              <Activity className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#8A1F1D] text-white text-[11px] font-bold px-2 py-0.5">
                  المرحلة الرابعة للتطوير
                </span>
                <span className="text-xs text-[#C4A484] font-bold">
                  محرك التحليل والتقويم التراكمي (EB Mastery Engine)
                </span>
              </div>
              <h2 className="text-2xl font-black mt-2">
                مؤشرات الإتقان المعياري والنمو المعرفي التراكمي
              </h2>
              <p className="text-xs text-[#F9F7F2]/80 mt-1">
                قياس علمي متعدد الأبعاد لمستويات الاستيعاب المحاسبي وفق تصنيف بلوم ونموذج الاستجابة للمفردة الاختبارية (IRT).
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 border border-white/20 text-center shrink-0 min-w-[200px]">
            <span className="text-xs text-[#C4A484] font-bold block">مؤشر الإتقان المركب (Composite Mastery)</span>
            <div className="text-4xl font-mono font-black text-white mt-1">
              84.6<span className="text-lg text-[#C4A484]"> / 100</span>
            </div>
            <span className="inline-block mt-2 px-3 py-0.5 text-[11px] font-bold bg-emerald-700 text-emerald-100">
              إتقان متقدم (Proficient Band)
            </span>
          </div>
        </div>

        {/* 4 Components breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          
          <div className="bg-white/5 border border-white/10 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#C4A484] font-bold">1. معدل الدقة العام (40%)</span>
              <span className="font-mono text-white font-bold">86.2%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10">
              <div className="h-full bg-emerald-400" style={{ width: '86.2%' }} />
            </div>
            <p className="text-[10px] text-white/60">مبني على 146 إجابة موثقة في الأسئلة والتمارين</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#C4A484] font-bold">2. وزن صعوبة الأسئلة (30%)</span>
              <span className="font-mono text-white font-bold">81.0%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10">
              <div className="h-full bg-[#C4A484]" style={{ width: '81%' }} />
            </div>
            <p className="text-[10px] text-white/60">أداء مميز في الأسئلة المتقدمة ودراسات الحالة الشاملة</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#C4A484] font-bold">3. اتجاه التطور الزمني (20%)</span>
              <span className="font-mono text-white font-bold">88.5%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10">
              <div className="h-full bg-blue-400" style={{ width: '88.5%' }} />
            </div>
            <p className="text-[10px] text-white/60">منحنى تصاعدي إيجابي في المحاولات العشر الأخيرة</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#C4A484] font-bold">4. اتساع شمولية المنهج (10%)</span>
              <span className="font-mono text-white font-bold">83.3%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10">
              <div className="h-full bg-purple-400" style={{ width: '83.3%' }} />
            </div>
            <p className="text-[10px] text-white/60">تغطية 5 وحدات كاملة من أصل 6 مقررة حتى الآن</p>
          </div>

        </div>

      </div>

      {/* 2. Bloom's Taxonomy Cognitive Distribution */}
      <div className="bg-white border-2 border-[#1D1D1B] p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#1D1D1B]/15 pb-3">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-[#8A1F1D]" />
            <h3 className="font-extrabold text-base text-[#1D1D1B]">
              توزيع الإتقان حسب المستويات المعرفية لبلوم (Bloom's Taxonomy)
            </h3>
          </div>
          <span className="text-xs text-[#1D1D1B]/70 font-mono">
            المعايير المعتمدة من المركز القومي للامتحانات والتقويم التربوي
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          {/* Level 1: Knowledge & Recall */}
          <div className="p-4 bg-[#F9F7F2] border border-[#1D1D1B]/15 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#1D1D1B]">1. التذكر والمفاهيم (Knowledge)</span>
              <span className="text-xs font-mono font-bold bg-[#1D1D1B] text-[#C4A484] px-2 py-0.5">91%</span>
            </div>
            <p className="text-xs text-[#1D1D1B]/70 leading-relaxed">
              المصطلحات، المبادئ، الفروض المحاسبية (الاستمرارية، الدورية، الوحدة المحاسبية).
            </p>
            <div className="w-full h-2 bg-gray-200 overflow-hidden">
              <div className="h-full bg-emerald-600" style={{ width: '91%' }} />
            </div>
            <span className="text-[11px] text-emerald-800 font-bold block">إتقان تام ✓</span>
          </div>

          {/* Level 2: Practical Application */}
          <div className="p-4 bg-[#F9F7F2] border border-[#1D1D1B]/15 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#1D1D1B]">2. التطبيق العملي (Application)</span>
              <span className="text-xs font-mono font-bold bg-[#1D1D1B] text-[#C4A484] px-2 py-0.5">84%</span>
            </div>
            <p className="text-xs text-[#1D1D1B]/70 leading-relaxed">
              تسجيل قيود اليومية، الترحيل لحسابات الأستاذ، ترصيد ميزان المراجعة، والتسويات.
            </p>
            <div className="w-full h-2 bg-gray-200 overflow-hidden">
              <div className="h-full bg-emerald-600" style={{ width: '84%' }} />
            </div>
            <span className="text-[11px] text-emerald-800 font-bold block">إتقان متقدم ✓</span>
          </div>

          {/* Level 3: Analysis & Evaluation */}
          <div className="p-4 bg-[#F9F7F2] border border-[#1D1D1B]/15 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#1D1D1B]">3. التحليل والتقويم (Analysis & JRE)</span>
              <span className="text-xs font-mono font-bold bg-[#1D1D1B] text-[#C4A484] px-2 py-0.5">72%</span>
            </div>
            <p className="text-xs text-[#1D1D1B]/70 leading-relaxed">
              كشف أخطاء الترحيل، صياغة مذكرات الرقابة، وصياغة مقالات التفسير المحاسبي المنضبط.
            </p>
            <div className="w-full h-2 bg-gray-200 overflow-hidden">
              <div className="h-full bg-amber-500" style={{ width: '72%' }} />
            </div>
            <span className="text-[11px] text-amber-800 font-bold block">قيد التدعيم (موصى بالتدريب العلاجي)</span>
          </div>

        </div>
      </div>

      {/* 3. Detailed Concept Mastery Matrix */}
      <div className="bg-white border-2 border-[#1D1D1B] p-6 space-y-6 shadow-xs">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#1D1D1B]/15 pb-4">
          <div>
            <h3 className="font-extrabold text-base text-[#1D1D1B]">
              مصفوفة إتقان الكفايات والمفاهيم التفصيلية ({filteredConcepts.length} مفهوم)
            </h3>
            <p className="text-xs text-[#1D1D1B]/70 mt-0.5">
              بيان دقيق لكل كفاية محاسبية مع زر للانتقال الفوري للتدريب العلاجي الموجه
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 text-xs">
              <Filter className="w-3.5 h-3.5 text-[#1D1D1B]" />
              <span className="font-bold">المستوى:</span>
            </div>
            {(['ALL', 'KNOWLEDGE', 'APPLICATION', 'ANALYSIS'] as const).map(f => (
              <button
                key={f}
                onClick={() => setSelectedBloomFilter(f)}
                className={`px-2.5 py-1 text-[11px] font-bold transition cursor-pointer border ${
                  selectedBloomFilter === f
                    ? 'bg-[#1D1D1B] text-[#C4A484] border-[#1D1D1B]'
                    : 'bg-white text-[#1D1D1B] border-gray-300 hover:bg-gray-100'
                }`}
              >
                {f === 'ALL' ? 'الكل' : f === 'KNOWLEDGE' ? 'تذكر' : f === 'APPLICATION' ? 'تطبيق' : 'تحليل'}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Table */}
        <div className="divide-y divide-[#1D1D1B]/10">
          {filteredConcepts.map(concept => (
            <div key={concept.id} className="py-3.5 px-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-[#F9F7F2]/80 transition">
              
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-[#1D1D1B]/10 text-[#1D1D1B] px-2 py-0.5">
                    {concept.unitTitle}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 ${
                    concept.bloomLevel === 'KNOWLEDGE' ? 'bg-blue-100 text-blue-900' :
                    concept.bloomLevel === 'APPLICATION' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {concept.bloomLevel === 'KNOWLEDGE' ? 'تذكر ومفاهيم' : concept.bloomLevel === 'APPLICATION' ? 'تطبيق عملي' : 'تحليل وتركيب'}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-[#1D1D1B]">{concept.conceptName}</h4>
                <div className="text-[11px] text-[#1D1D1B]/60 flex items-center gap-3">
                  <span>عدد المحاولات: {concept.attemptsCount}</span>
                  <span>•</span>
                  <span>آخر تقييم: {concept.lastTested}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                
                {/* Accuracy Indicator */}
                <div className="text-right min-w-[90px]">
                  <div className="text-base font-mono font-black text-[#1D1D1B]">
                    {concept.accuracy}%
                  </div>
                  <span className={`text-[10px] font-bold ${
                    concept.masteryStatus === 'MASTERED' ? 'text-emerald-700' :
                    concept.masteryStatus === 'PROFICIENT' ? 'text-blue-700' :
                    concept.masteryStatus === 'DEVELOPING' ? 'text-amber-700' : 'text-rose-700'
                  }`}>
                    {concept.masteryStatus === 'MASTERED' ? 'متقن كلياً' :
                     concept.masteryStatus === 'PROFICIENT' ? 'إتقان جيد' :
                     concept.masteryStatus === 'DEVELOPING' ? 'قيد التطوير' : 'بحاجة لمعالجة'}
                  </span>
                </div>

                {/* Remedial Action Button */}
                <button
                  onClick={() => navigate('/my-path/recommendations')}
                  className="px-3 py-1.5 bg-[#8A1F1D] hover:bg-[#a12523] text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>التدريب العلاجي</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
