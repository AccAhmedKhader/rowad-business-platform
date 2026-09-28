import React from 'react';
import { 
  Target, Lightbulb, Clock, CheckCircle2, AlertTriangle, 
  FileCheck, Sparkles, BookOpen, Layers, Users, HelpCircle,
  TrendingUp, Award, Compass, Eye
} from 'lucide-react';
import { getTeacherPedagogyForLesson, TeacherLessonPedagogy } from '../../data/teacherPedagogyData';

interface TeacherPedagogicalDossierProps {
  lessonId: string;
  unitNumber?: number;
  lessonNumber?: number;
  customTitle?: string;
  isCompactForPrint?: boolean;
}

export const TeacherPedagogicalDossier: React.FC<TeacherPedagogicalDossierProps> = ({
  lessonId,
  unitNumber = 1,
  lessonNumber = 1,
  customTitle,
  isCompactForPrint = false
}) => {
  const dossier: TeacherLessonPedagogy = getTeacherPedagogyForLesson(lessonId, unitNumber, lessonNumber);

  return (
    <div className="bg-[#FFFFFF] border-4 border-[#1E3A8A] shadow-md my-8 overflow-hidden font-serif">
      {/* Dossier Header Banner */}
      <div className="bg-[#1E3A8A] text-[#F9F7F2] p-4 sm:p-5 border-b-2 border-[#C5A059] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-[#C5A059] text-[#0C1E36] text-[10px] font-mono font-black px-2 py-0.5 uppercase tracking-wider">
              TEACHER'S PEDAGOGICAL DOSSIER
            </span>
            <span className="text-amber-300 text-xs font-bold font-sans">
              دليل المعلم الموجه وخطة التدريس المعتمدة
            </span>
          </div>
          <h4 className="text-base sm:text-xl font-black font-serif text-[#FFFFFF]">
            👨‍🏫 ملف التوجيه التربوي والخطط الصفية: {customTitle || dossier.title}
          </h4>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono bg-white/10 px-3 py-1.5 border border-white/20">
          <span className="text-amber-300 font-bold">زمن الحصة: 45 دقيقة</span>
          <span>•</span>
          <span className="text-white">وزن JRE: 20 درجة</span>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-7 text-[#1D1D1B] text-sm leading-relaxed">

        {/* =========================================================================
            1. FOCAL POINTS (يركز على إيه المعلم في هذا الدرس؟)
           ========================================================================= */}
        <section className="space-y-2.5">
          <div className="flex items-center gap-2 border-b-2 border-[#1E3A8A]/30 pb-1.5">
            <Target className="w-5 h-5 text-[#1E3A8A]" />
            <h5 className="font-black text-base text-[#1E3A8A] font-serif">
              ۱. محاور التركيز الجوهرية للمعلم (يركز على إيه بالتحديد؟)
            </h5>
          </div>
          <p className="text-xs text-[#1D1D1B]/70 font-sans">
            النقاط المفصلية التي يجب ألا تغيب عن ذهن المعلم أثناء الشرح، وتوجيه الطلاب للعمق المفاهيمي بدلاً من الحفظ الآلي:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {dossier.focalPoints.map((point, idx) => (
              <div 
                key={idx} 
                className="bg-[#EFF6FF] border-r-4 border-[#1E3A8A] p-3 text-xs sm:text-sm font-sans flex items-start gap-2 text-[#1E3A8A]"
              >
                <span className="font-mono font-bold bg-[#1E3A8A] text-white rounded-full w-4 h-4 flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-snug font-medium text-[#0C1E36]">{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            2. INSTRUCTIONAL METHODS & CLASSROOM ACTIONS (يستخدم أساليب إيه لتوضيح هذا الموضوع؟)
           ========================================================================= */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b-2 border-[#C5A059] pb-1.5">
            <Lightbulb className="w-5 h-5 text-[#C5A059]" />
            <h5 className="font-black text-base text-[#8A5D00] font-serif">
              ۲. الأساليب والاستراتيجيات التدريسية الفعالة (يستخدم أساليب إيه لتوضيح هذا الموضوع بالذات؟)
            </h5>
          </div>
          <p className="text-xs text-[#1D1D1B]/70 font-sans">
            استراتيجيات تدريسية نشطة تم تصميمها خصيصاً لتحويل المفاهيم المحاسبية المجردة إلى تفاعل واقعي محسوس:
          </p>
          <div className="space-y-3">
            {dossier.instructionalMethods.map((method, idx) => (
              <div 
                key={idx}
                className="border-2 border-[#C5A059]/40 bg-[#FAF7EE] p-3.5 sm:p-4 space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between border-b border-[#C5A059]/30 pb-1.5">
                  <span className="font-black text-sm text-[#0C1E36] font-serif flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>{method.methodName}</span>
                  </span>
                  <span className="text-[11px] font-bold text-[#8A5D00] bg-[#C5A059]/20 px-2 py-0.5">
                    استراتيجية نشطة
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-sans">
                  <div className="bg-white p-2.5 border border-[#C5A059]/20 space-y-1">
                    <strong className="text-[#8A5D00] block font-serif">💡 المبرر التربوي:</strong>
                    <p className="text-[#1D1D1B]/85 leading-relaxed">{method.rationale}</p>
                  </div>

                  <div className="bg-white p-2.5 border border-[#C5A059]/20 space-y-1">
                    <strong className="text-[#0C1E36] block font-serif">🎬 الإجراء الصفي الملموس:</strong>
                    <p className="text-[#1D1D1B]/85 leading-relaxed">{method.classroomAction}</p>
                  </div>

                  <div className="bg-white p-2.5 border border-[#C5A059]/20 space-y-1">
                    <strong className="text-[#1E3A8A] block font-serif">📦 الوسيلة البصرية أو اللمسية:</strong>
                    <p className="text-[#1D1D1B]/85 leading-relaxed">{method.visualOrTactileAid}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            3. DETAILED 45-MIN LESSON PLAN (خطة الدرس التفصيلية وتوزيع زمن الحصة)
           ========================================================================= */}
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b-2 border-[#1D1D1B] pb-1.5">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#1D1D1B]" />
              <h5 className="font-black text-base text-[#1D1D1B] font-serif">
                ۳. خطة الدرس التفصيلية وإدارة زمن الحصة (45 دقيقة معيارية)
              </h5>
            </div>
            <span className="text-xs font-mono font-bold bg-[#1D1D1B] text-white px-2.5 py-0.5">
              I DO • WE DO • YOU DO
            </span>
          </div>

          <div className="overflow-x-auto border border-[#1D1D1B]/20">
            <table className="w-full text-right border-collapse text-xs">
              <thead className="bg-[#1D1D1B] text-white font-serif">
                <tr>
                  <th className="p-2.5 border-l border-white/20 w-32">المرحلة والزمن</th>
                  <th className="p-2.5 border-l border-white/20">دور المعلم (Teacher Action)</th>
                  <th className="p-2.5 border-l border-white/20">دور الطالب (Student Action)</th>
                  <th className="p-2.5 w-44">توجيه التميز الصفي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1D1D1B]/15">
                {dossier.lessonPlan.phases.map((phase, pidx) => (
                  <tr key={pidx} className={pidx % 2 === 1 ? 'bg-[#FAF8F5]' : 'bg-white'}>
                    <td className="p-2.5 border-l border-[#1D1D1B]/10 font-bold font-sans">
                      <div className="text-[#1E3A8A] text-xs font-black">{phase.phaseName}</div>
                      <span className="inline-block bg-[#1E3A8A]/10 text-[#1E3A8A] px-1.5 py-0.2 rounded-xs font-mono text-[10px] mt-0.5">
                        {phase.durationMin} دقيقة
                      </span>
                    </td>
                    <td className="p-2.5 border-l border-[#1D1D1B]/10 font-sans text-[#1D1D1B]/90 leading-relaxed">
                      {phase.teacherAction}
                    </td>
                    <td className="p-2.5 border-l border-[#1D1D1B]/10 font-sans text-[#1D1D1B]/90 leading-relaxed">
                      {phase.studentAction}
                    </td>
                    <td className="p-2.5 font-sans text-xs bg-amber-50/50 text-[#8A5D00] leading-snug">
                      💡 {phase.pedagogicalTip}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            4. PERFORMANCE OBJECTIVES & SUCCESS CRITERIA (أهداف الأداء ومؤشرات النجاح)
           ========================================================================= */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b-2 border-[#14532D] pb-1.5">
            <CheckCircle2 className="w-5 h-5 text-[#14532D]" />
            <h5 className="font-black text-base text-[#14532D] font-serif">
              ٤. أهداف الأداء السلوكية ومؤشرات النجاح المقاسة (Performance Criteria)
            </h5>
          </div>

          <div className="space-y-2.5">
            {dossier.performanceObjectivesAndCriteria.map((obj, oidx) => (
              <div 
                key={oidx}
                className="bg-[#F0FDF4] border-r-4 border-[#14532D] p-3 text-xs font-sans space-y-1.5 shadow-2xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#14532D]/20 pb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold bg-[#14532D] text-white px-2 py-0.5 text-[10px]">
                      {obj.objectiveCode}
                    </span>
                    <strong className="text-[#14532D] font-serif text-sm">
                      {obj.behavioralStatement}
                    </strong>
                  </div>
                  <span className="text-[10px] text-[#14532D] font-bold bg-[#14532D]/10 px-2 py-0.5">
                    مستوى بلوم: {obj.bloomLevel}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-0.5">
                  <div className="bg-white p-2 border border-[#14532D]/20 text-[#1D1D1B]">
                    <strong className="text-[#14532D] block font-serif">🎯 مؤشر النجاح الملاحظ داخل الصف:</strong>
                    <span className="text-[#1D1D1B]/85">{obj.successIndicator}</span>
                  </div>
                  <div className="bg-white p-2 border border-[#14532D]/20 text-[#1D1D1B]">
                    <strong className="text-[#8A1F1D] block font-serif">❓ سؤال التحقق السريع من الفهم:</strong>
                    <span className="text-[#1D1D1B]/85 font-mono text-[11px]">{obj.classroomVerificationPrompt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            5. MISCONCEPTIONS & REMEDIATION (استراتيجيات معالجة صعوبات التعلم)
           ========================================================================= */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 border-b-2 border-[#8A1F1D] pb-1.5">
            <AlertTriangle className="w-5 h-5 text-[#8A1F1D]" />
            <h5 className="font-black text-base text-[#8A1F1D] font-serif">
              ٥. استراتيجيات معالجة صعوبات التعلم والمفاهيم البديلة الشائعة
            </h5>
          </div>

          <div className="space-y-3">
            {dossier.learningDifficultiesAndRemediation.map((diff, didx) => (
              <div 
                key={didx}
                className="bg-[#FEF2F2] border-2 border-[#8A1F1D]/30 p-3.5 space-y-2 shadow-2xs"
              >
                <div className="flex items-center justify-between border-b border-[#8A1F1D]/20 pb-1">
                  <span className="font-black text-sm text-[#8A1F1D] font-serif flex items-center gap-1.5">
                    <span>⚠️ الصعوبة / الفخ الشائع:</span>
                    <span>{diff.difficultyTitle}</span>
                  </span>
                  <span className="text-[10px] font-bold text-[#8A1F1D] bg-[#8A1F1D]/10 px-2 py-0.5">
                    تدخل علاجي فوري
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-sans">
                  <div className="bg-white p-2.5 border border-[#8A1F1D]/20 space-y-1">
                    <strong className="text-[#8A1F1D] block font-serif">🧠 الفخ الذهني للطالب:</strong>
                    <p className="text-[#1D1D1B]/85 leading-relaxed">{diff.studentMentalTrap}</p>
                  </div>
                  <div className="bg-white p-2.5 border border-[#8A1F1D]/20 space-y-1">
                    <strong className="text-[#1E3A8A] block font-serif">🛠️ استراتيجية المعلم العلاجية:</strong>
                    <p className="text-[#1D1D1B]/85 leading-relaxed">{diff.remediationStrategy}</p>
                  </div>
                  <div className="bg-white p-2.5 border border-[#8A1F1D]/20 space-y-1">
                    <strong className="text-[#14532D] block font-serif">🎯 النشاط العملي لإزالة اللبس:</strong>
                    <p className="text-[#1D1D1B]/85 leading-relaxed">{diff.handsOnActivity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            6. JRE ESSAY SCORING DIRECTIVES (موجهات تصحيح وتحكيم مقال الاستدلال JRE - 20 درجة)
           ========================================================================= */}
        <section className="space-y-3 bg-[#FAF8F5] border-2 border-[#1E3A8A] p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-[#1E3A8A] pb-2 gap-2">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#C5A059]" />
              <h5 className="font-black text-base text-[#1E3A8A] font-serif">
                ٦. موجهات تصحيح وتحكيم مقال الاستدلال المحاسبي JRE (سلم الـ 20 درجة الوزاري)
              </h5>
            </div>
            <span className="bg-[#1E3A8A] text-[#C5A059] px-3 py-1 font-mono font-black text-xs">
              EB JOURNALISTIC REASONING RUBRIC (20 MARKS)
            </span>
          </div>

          <div className="bg-white p-3 border border-[#1E3A8A]/20 text-xs font-sans space-y-1">
            <strong className="text-[#1E3A8A] block font-serif font-bold">
              📋 سيناريو ومحور القضية الاستدلالية لهذا الدرس:
            </strong>
            <p className="text-[#1D1D1B] leading-relaxed">
              {dossier.jreDirectives.scenarioFocus}
            </p>
          </div>

          {/* 4 Criteria Rubric Breakdown */}
          <div className="overflow-x-auto border border-[#1E3A8A]/20 bg-white">
            <table className="w-full text-right border-collapse text-xs">
              <thead className="bg-[#1E3A8A] text-white font-serif">
                <tr>
                  <th className="p-2.5 border-l border-white/20">معيار التحكيم الوزاري</th>
                  <th className="p-2.5 border-l border-white/20 text-center w-20">الدرجة</th>
                  <th className="p-2.5 border-l border-white/20">دليل استحقاق الدرجة النهائية (Full Marks)</th>
                  <th className="p-2.5 w-1/3">أبرز أسباب ومصائد خصم الدرجات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E3A8A]/15 font-sans">
                {dossier.jreDirectives.rubricBreakdown.map((item, ridx) => (
                  <tr key={ridx} className={ridx % 2 === 1 ? 'bg-[#FAF8F5]' : 'bg-white'}>
                    <td className="p-2.5 border-l border-[#1E3A8A]/10 font-bold text-[#1E3A8A]">
                      {item.criterion}
                    </td>
                    <td className="p-2.5 border-l border-[#1E3A8A]/10 text-center font-mono font-black text-sm text-[#8A1F1D]">
                      {item.maxMarks} د
                    </td>
                    <td className="p-2.5 border-l border-[#1E3A8A]/10 text-[#14532D] font-medium leading-relaxed">
                      ✓ {item.fullMarkEvidence}
                    </td>
                    <td className="p-2.5 text-[#8A1F1D] leading-relaxed">
                      ⚠️ {item.commonPenaltyReason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[#EFF6FF] border border-[#1E3A8A]/30 p-3 text-xs text-[#1E3A8A] font-sans flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span>
              <strong>توجيه إرشادي للمصححين:</strong> {dossier.jreDirectives.exemplarGuidance}
            </span>
          </div>
        </section>

      </div>
    </div>
  );
};
