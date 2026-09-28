import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ReferenceLine
} from 'recharts';

export interface UnitProgressMetric {
  unitId: string;
  unitNumber: number;
  shortName: string;
  fullName: string;
  totalLessons: number;
  completedLessons: number;
  completionPercentage: number;
  quizScore: number; // 0 - 100
  quizAttempts: number;
  masteryStatus: 'DISTINCTION' | 'MASTERY' | 'DEVELOPING' | 'NEEDS_WORK' | 'NOT_STARTED';
}

interface StudentProgressChartsProps {
  unitMetrics: UnitProgressMetric[];
  overallAccuracy: number;
}

export const StudentProgressCharts: React.FC<StudentProgressChartsProps> = ({
  unitMetrics,
  overallAccuracy
}) => {
  // Chart 1 Data: Lessons Completion
  const completionData = unitMetrics.map((u) => ({
    name: u.shortName,
    unitNum: u.unitNumber,
    fullName: u.fullName,
    'الدروس المكتملة': u.completedLessons,
    'الدروس المتبقية': Math.max(0, u.totalLessons - u.completedLessons),
    'نسبة الإنجاز': u.completionPercentage,
    total: u.totalLessons
  }));

  // Chart 2 Data: Quiz Scores with Color Coding
  const quizScoresData = unitMetrics.map((u) => ({
    name: u.shortName,
    fullName: u.fullName,
    'درجة الاختبار': u.quizScore,
    'المحاولات': u.quizAttempts,
    threshold: 75 // Benchmark pass standard
  }));

  // Chart 3: Pie Chart for Lesson Completion Status
  const totalCompleted = unitMetrics.reduce((acc, u) => acc + u.completedLessons, 0);
  const totalLessons = unitMetrics.reduce((acc, u) => acc + u.totalLessons, 0);
  const totalRemaining = Math.max(0, totalLessons - totalCompleted);

  const pieData = [
    { name: 'دروس مكتملة ومتقنة', value: totalCompleted, color: '#1D1D1B' },
    { name: 'دروس قيد الدراسة والمتبقية', value: totalRemaining, color: '#C4A484' }
  ];

  // Chart 4: Radar Chart for Core Accounting Competencies
  const competencyRadarData = [
    { subject: 'القيد والتوجيه المحاسبي', score: unitMetrics[1]?.quizScore || 85, fullMark: 100 },
    { subject: 'الدفاتر والترحيل وميزان المراجعة', score: unitMetrics[2]?.quizScore || 82, fullMark: 100 },
    { subject: 'التسويات والحيطة والحذر', score: unitMetrics[3]?.quizScore || 78, fullMark: 100 },
    { subject: 'القوائم الختامية والمركز المالي', score: unitMetrics[4]?.quizScore || 90, fullMark: 100 },
    { subject: 'استدلالات JRE والتقويم المهني', score: Math.round(overallAccuracy) || 84, fullMark: 100 },
    { subject: 'الشركات والتحليل المالي', score: unitMetrics[8]?.quizScore || 76, fullMark: 100 }
  ];

  return (
    <div className="space-y-6 font-serif" dir="rtl">
      
      {/* Grid of Two Primary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Unit Lessons Progress Bar Chart */}
        <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-5 shadow-xs flex flex-col justify-between">
          <div className="border-b border-[#1D1D1B]/15 pb-3 mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#1D1D1B]">
                إنجاز الدروس عبر الوحدات المحاسبية العشر
              </h3>
              <p className="text-xs text-[#1D1D1B]/60">
                مقارنة الدروس المكتملة مقابل المتبقية لكل وحدة في المنهج
              </p>
            </div>
            <span className="text-xs font-mono font-bold bg-[#F9F7F2] border border-[#1D1D1B]/20 px-2.5 py-1">
              {totalCompleted} / {totalLessons} درس ({Math.round((totalCompleted / (totalLessons || 1)) * 100)}%)
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={completionData}
                margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE6DF" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#1D1D1B', fontSize: 11, fontWeight: 'bold' }}
                />
                <YAxis 
                  tick={{ fill: '#1D1D1B', fontSize: 11 }}
                  allowDecimals={false}
                />
                <Tooltip
                  formatter={(value: any, name: any) => [value, name]}
                  labelFormatter={(label) => {
                    const item = completionData.find(d => d.name === label);
                    return item ? item.fullName : label;
                  }}
                  contentStyle={{ backgroundColor: '#1D1D1B', color: '#F9F7F2', borderRadius: '0px', border: '1px solid #C4A484', fontSize: '12px' }}
                />
                <Legend 
                  verticalAlign="top"
                  wrapperStyle={{ paddingBottom: '10px', fontSize: '12px' }}
                />
                <Bar 
                  dataKey="الدروس المكتملة" 
                  stackId="a" 
                  fill="#1D1D1B" 
                  name="مكتمل"
                />
                <Bar 
                  dataKey="الدروس المتبقية" 
                  stackId="a" 
                  fill="#C4A484" 
                  name="متبقٍ"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Quiz & Assessment Scores by Unit */}
        <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-5 shadow-xs flex flex-col justify-between">
          <div className="border-b border-[#1D1D1B]/15 pb-3 mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#1D1D1B]">
                متوسط درجات الاختبارات والتقييمات القصيرة (%)
              </h3>
              <p className="text-xs text-[#1D1D1B]/60">
                مؤشر جودة الفهم المحاسبي لكل وحدة مقارنة بحد الإتقان الوزاري (75%)
              </p>
            </div>
            <span className="text-xs font-mono font-bold bg-[#1D1D1B] text-[#F9F7F2] px-2.5 py-1">
              المتوسط: {Math.round(unitMetrics.reduce((a, b) => a + b.quizScore, 0) / (unitMetrics.length || 1))}%
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={quizScoresData}
                margin={{ top: 10, right: 10, left: -15, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE6DF" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#1D1D1B', fontSize: 11, fontWeight: 'bold' }}
                />
                <YAxis 
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
                  tick={{ fill: '#1D1D1B', fontSize: 11 }}
                />
                <Tooltip
                  formatter={(value: any) => [`${value}%`, 'متوسط درجة الاختبار']}
                  labelFormatter={(label) => {
                    const item = quizScoresData.find(d => d.name === label);
                    return item ? item.fullName : label;
                  }}
                  contentStyle={{ backgroundColor: '#1D1D1B', color: '#F9F7F2', borderRadius: '0px', border: '1px solid #C4A484', fontSize: '12px' }}
                />
                <ReferenceLine 
                  y={75} 
                  stroke="#8A1F1D" 
                  strokeDasharray="4 4" 
                  label={{ value: 'حد الإتقان 75%', fill: '#8A1F1D', position: 'top', fontSize: 10, fontWeight: 'bold' }} 
                />
                <Bar 
                  dataKey="درجة الاختبار" 
                  name="درجة الوحدة (%)"
                >
                  {quizScoresData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry['درجة الاختبار'] >= 85 ? '#1D1D1B' : entry['درجة الاختبار'] >= 75 ? '#8A1F1D' : '#C4A484'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Grid of Secondary Diagnostic Charts (Radar & Pie) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 3: Radar Chart for Accounting Competencies (Takes 2 cols on lg) */}
        <div className="lg:col-span-2 bg-[#FFFFFF] border-2 border-[#1D1D1B] p-5 shadow-xs flex flex-col justify-between">
          <div className="border-b border-[#1D1D1B]/15 pb-3 mb-2 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#1D1D1B]">
                مخطط الكفاءات المحاسبية والقدرة التحليلية (Competency Radar)
              </h3>
              <p className="text-xs text-[#1D1D1B]/60">
                توزيع مستويات الإتقان عبر المحاور الستة للمنهج المصري المعتمد
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#8A1F1D] bg-[#8A1F1D]/10 px-2 py-0.5">
              نموذج معتمد JRE
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={competencyRadarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                <PolarGrid stroke="#EAE6DF" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#1D1D1B', fontSize: 11, fontWeight: 'bold' }} 
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ fill: '#1D1D1B', fontSize: 10 }}
                />
                <Radar
                  name="مستوى إتقان الطالب (%)"
                  dataKey="score"
                  stroke="#1D1D1B"
                  fill="#C4A484"
                  fillOpacity={0.5}
                />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'مستوى الإتقان']}
                  contentStyle={{ backgroundColor: '#1D1D1B', color: '#F9F7F2', borderRadius: '0px', border: '1px solid #C4A484', fontSize: '12px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Donut / Ratio Progress Gauge */}
        <div className="bg-[#FFFFFF] border-2 border-[#1D1D1B] p-5 shadow-xs flex flex-col justify-between">
          <div className="border-b border-[#1D1D1B]/15 pb-3 mb-2">
            <h3 className="font-extrabold text-sm sm:text-base text-[#1D1D1B]">
              حالة إكمال المنهج العام
            </h3>
            <p className="text-xs text-[#1D1D1B]/60">
              نسبة تغطية دروس البكالوريا المصرية
            </p>
          </div>

          <div className="h-48 sm:h-52 w-full flex items-center justify-center relative" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-pie-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val: any) => [`${val} درس`, 'العدد']}
                  contentStyle={{ backgroundColor: '#1D1D1B', color: '#F9F7F2', borderRadius: '0px', border: '1px solid #C4A484', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Label inside donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none font-mono">
              <span className="text-2xl font-black text-[#1D1D1B]">
                {Math.round((totalCompleted / (totalLessons || 1)) * 100)}%
              </span>
              <span className="text-[10px] text-[#1D1D1B]/60 font-sans font-bold">إنجاز كلي</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-[#1D1D1B]/10 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#1D1D1B] inline-block" />
                <span>مكتمل ومتقن:</span>
              </span>
              <span className="font-bold font-mono">{totalCompleted} درس</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#C4A484] inline-block" />
                <span>قيد الدراسة أو قادم:</span>
              </span>
              <span className="font-bold font-mono">{totalRemaining} درس</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
