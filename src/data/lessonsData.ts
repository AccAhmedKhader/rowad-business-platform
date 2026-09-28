import { LessonContent, UnitDefinition } from '../types';
import { lesson1 } from './lesson1';
import { lesson2 } from './lesson2';
import { lesson2_5 as unit1Lesson2_5 } from './lesson2_5';
import { lesson3 } from './lesson3';
import { lesson4 } from './lesson4';
import { lesson5 } from './lesson5';
import { lesson6 } from './lesson6';

import { lesson2_1 } from './unit2Lessons/lesson2_1';
import { lesson2_2 } from './unit2Lessons/lesson2_2';
import { lesson2_3 } from './unit2Lessons/lesson2_3';
import { lesson2_4 } from './unit2Lessons/lesson2_4';
import { lesson2_5 } from './unit2Lessons/lesson2_5';
import { lesson2_6 } from './unit2Lessons/lesson2_6';

import { lesson3_1, lesson3_2, lesson3_3, lesson3_4, lesson3_5, lesson3_6 } from './unit3Lessons';
import { lesson4_1, lesson4_2, lesson4_3, lesson4_4, lesson4_5, lesson4_6 } from './unit4Lessons';
import { lesson5_1, lesson5_2, lesson5_3, lesson5_4, lesson5_5, lesson5_6 } from './unit5Lessons';
import { lesson6_1, lesson6_2, lesson6_3, lesson6_4, lesson6_5, lesson6_6 } from './unit6Lessons';
import { lesson7_1, lesson7_2, lesson7_3, lesson7_4, lesson7_5 } from './unit7Lessons';
import { lesson8_1, lesson8_2, lesson8_3, lesson8_4, lesson8_5 } from './unit8Lessons';
import { lesson9_1, lesson9_2, lesson9_3, lesson9_4, lesson9_5, lesson9_6 } from './unit9Lessons';
import { lesson10_1, lesson10_2, lesson10_3, lesson10_4, lesson10_5, lesson10_6 } from './unit10Lessons';

export const unit1Lessons: LessonContent[] = [
  lesson1,
  lesson2,
  lesson3,
  lesson4,
  lesson5,
  lesson6
].map(l => ({ ...l, unitId: 'unit-1' as const }));

export const unit1EnrichmentLesson = { ...unit1Lesson2_5, unitId: 'unit-1' as const };

export const unit2Lessons: LessonContent[] = [
  lesson2_1,
  lesson2_2,
  lesson2_3,
  lesson2_4,
  lesson2_5,
  lesson2_6
].map(l => ({ ...l, unitId: 'unit-2' as const }));

export const unit3Lessons: LessonContent[] = [
  lesson3_1,
  lesson3_2,
  lesson3_3,
  lesson3_4,
  lesson3_5,
  lesson3_6
].map(l => ({ 
  ...l, 
  unitId: 'unit-3' as const,
  whatYouWillLearn: l.whatYouWillLearn || l.learningOutcomes || l.objectives || []
}));

export const unit4Lessons: LessonContent[] = [
  lesson4_1,
  lesson4_2,
  lesson4_3,
  lesson4_4,
  lesson4_5,
  lesson4_6
].map(l => ({ 
  ...l, 
  unitId: 'unit-4' as const,
  whatYouWillLearn: l.whatYouWillLearn || l.learningOutcomes || l.objectives || []
}));

export const unit5Lessons: LessonContent[] = [
  lesson5_1,
  lesson5_2,
  lesson5_3,
  lesson5_4,
  lesson5_5,
  lesson5_6
].map(l => ({ 
  ...l, 
  unitId: 'unit-5' as const,
  whatYouWillLearn: l.whatYouWillLearn || l.learningOutcomes || l.objectives || []
}));

export const unit6Lessons: LessonContent[] = [
  lesson6_1,
  lesson6_2,
  lesson6_3,
  lesson6_4,
  lesson6_5,
  lesson6_6
].map(l => ({ 
  ...l, 
  unitId: 'unit-6' as const,
  whatYouWillLearn: l.whatYouWillLearn || l.learningOutcomes || l.objectives || []
}));

export const unit7Lessons: LessonContent[] = [
  lesson7_1,
  lesson7_2,
  lesson7_3,
  lesson7_4,
  lesson7_5
].map(l => ({ 
  ...l, 
  unitId: 'unit-7' as const,
  whatYouWillLearn: l.whatYouWillLearn || l.learningOutcomes || l.objectives || []
}));

export const unit8Lessons: LessonContent[] = [
  lesson8_1,
  lesson8_2,
  lesson8_3,
  lesson8_4,
  lesson8_5
].map(l => ({ 
  ...l, 
  unitId: 'unit-8' as const,
  whatYouWillLearn: l.whatYouWillLearn || l.learningOutcomes || l.objectives || []
}));

export const unit10Lessons: LessonContent[] = [
  lesson10_1,
  lesson10_2,
  lesson10_3,
  lesson10_4,
  lesson10_5,
  lesson10_6
].map(l => ({ 
  ...l, 
  unitId: 'unit-10',
  whatYouWillLearn: l.whatYouWillLearn || l.learningOutcomes || l.objectives || []
}));

export const unit9Lessons: LessonContent[] = [
  lesson9_1,
  lesson9_2,
  lesson9_3,
  lesson9_4,
  lesson9_5,
  lesson9_6
].map(l => ({ 
  ...l, 
  unitId: 'unit-9' as const,
  whatYouWillLearn: l.whatYouWillLearn || l.learningOutcomes || l.objectives || []
}));

export const allLessons: LessonContent[] = [
  ...unit1Lessons,
  ...unit2Lessons,
  ...unit3Lessons,
  ...unit4Lessons,
  ...unit5Lessons,
  ...unit6Lessons,
  ...unit7Lessons,
  ...unit8Lessons,
  ...unit9Lessons,
  ...unit10Lessons
];

export const availableUnits: UnitDefinition[] = [
  {
    id: 'unit-10',
    unitNumber: 10,
    title: 'الوحدة العاشرة: تحليل القوائم المالية وتفسيرها',
    shortTitle: 'الوحدة العاشرة',
    subtitle: 'نسب الربحية والسيولة والكفاءة • المقارنة واتخاذ القرار • القيود ومحددات التحليل • الحكم والاستدلال JRE',
    badge: 'الوحدة 10 (التحليل المالي - المنهج المعتمد)',
    bigIdea: 'القوائم المالية لا تتخذ القرارات؛ بل يتخذها المديرون والمستثمرون. التحليل المالي يحول الأرقام إلى نسب ومؤشرات لتسهيل المقارنة ودعم القرار مع الاعتراف بقيود التحليل.',
    essentialQuestion: 'هل يستطيع التحليل المالي أن يوفر إرشادًا موثوقًا للقرارات، أم ينبغي استخدامه دائمًا بحذر؟'
  },
  {
    id: 'unit-9',
    unitNumber: 9,
    title: 'الوحدة التاسعة: محاسبة شركات الأموال (المساهمة)',
    shortTitle: 'الوحدة التاسعة',
    subtitle: 'الأسهم والسندات • الأقساط والاكتتاب بزيادة • التوزيعات • قرارات التمويل',
    badge: 'الوحدة 9 (شركات الأموال - المنهج المعتمد)',
    bigIdea: 'في شركات الأموال، تنفصل الإدارة عن الملكية، ويصبح رأس المال مقسماً إلى وحدات متساوية قابلة للتداول، مما يفرض تنظيماً محاسبياً دقيقاً لضمان حقوق آلاف المساهمين والدائنين.',
    essentialQuestion: 'كيف تنظم المحاسبة العلاقة المعقدة بين الإدارة التي لا تملك والمساهم الذي لا يدير والدائن الذي يمول؟'
  },
  {
    id: 'unit-8',
    unitNumber: 8,
    title: 'الوحدة الثامنة: محاسبة شركات الأشخاص والتضامن',
    shortTitle: 'الوحدة الثامنة',
    subtitle: 'اتفاقية الشراكة وتوزيع الأرباح • فائدة رأس المال ورواتب الشركاء • الحسابات الجارية • الشهرة وانضمام وانفصال شريك • دراسة الحالة والـ JRE',
    badge: 'الوحدة 8 (شركات الأشخاص والتضامن - المنهج المعتمد)',
    bigIdea: 'في شركات التضامن، لا ينفصل المركز المالي عن العلاقات التعاقدية بين الشركاء؛ وتوزيع الأرباح يكافئ رأس المال والجهد الإداري والخبرة في ظل المسؤولية التضامنية غير المحدودة.',
    essentialQuestion: 'كيف تحقق المعالجة المحاسبية التوازن العادل بين حقوق الشركاء الممولين والتنفيذيين ومصالح الدائنين في شركة التضامن؟'
  },
  {
    id: 'unit-7',
    unitNumber: 7,
    title: 'الوحدة السابعة: الإهلاك والمخصصات واستبعاد الأصول',
    shortTitle: 'الوحدة السابعة',
    subtitle: 'الإهلاك (الثابت والمتناقص) • استبعاد الأصول وحساب الاستبعاد • المخصصات والديون المشكوك فيها • منشأة حسن • الحكم والاستدلال JRE',
    badge: 'الوحدة 7 (الإهلاك والمخصصات واستبعاد الأصول - المنهج المعتمد)',
    bigIdea: 'القوائم المالية لا تعرض فقط ما حدث من معاملات، بل تحتاج إلى تسويات تعكس أثر الزمن واستخدام الأصول والتحوط ضد الديون المشكوك في تحصيلها.',
    essentialQuestion: 'كيف تساعد التسويات المحاسبية في تقديم صورة أكثر واقعية عن الربح وقيمة الأصول، رغم اعتمادها على التقدير والحكم المهني؟'
  },
  {
    id: 'unit-6',
    unitNumber: 6,
    title: 'الوحدة السادسة: السجلات غير المكتملة ونظم الرقابة المحاسبية',
    shortTitle: 'الوحدة السادسة',
    subtitle: 'القيد المفرد • معادلة رأس المال وصافي الربح • حسابات المراقبة • تسوية البنك • التطبيق المتكامل والـ JRE',
    badge: 'الوحدة 6 (السجلات غير المكتملة ونظم الرقابة - المنهج المعتمد)',
    bigIdea: 'عندما تكون السجلات ناقصة، لا تتوقف المحاسبة عن العمل؛ بل تتحول إلى عملية إعادة بناء منظمة تعتمد على أدلة غير مباشرة وأدوات رقابية متكاملة.',
    essentialQuestion: 'هل تعد المعلومات المحاسبية المعاد تكوينها مقاييس موثوقة للأداء والمركز المالي، أم أنها مجرد تقديرات مستنيرة؟'
  },
  {
    id: 'unit-5',
    unitNumber: 5,
    title: 'الوحدة الخامسة: القوائم المالية للمنشأة الفردية',
    shortTitle: 'الوحدة الخامسة',
    subtitle: 'حساب المتاجرة • الأرباح والخسائر • تسويات نهاية الفترة • قائمة المركز المالي • تحليل النسب • دراسة الحالة والـ JRE',
    badge: 'الوحدة 5 (القوائم المالية للمنشأة الفردية - المنهج المعتمد)',
    bigIdea: 'القوائم المالية لا تصوّر الواقع الاقتصادي حرفيًا؛ بل تحوّل أرصدة الدفاتر إلى تفسير منظم لأداء المنشأة ومركزها المالي، يحكمه الاستحقاق والمقابلة والحيطة والحذر.',
    essentialQuestion: 'هل تعرض القوائم المالية بعدالة الوضع المالي للمنشأة، أم أنها تعرض تفسيرًا تحكمه السياسات والتقديرات المحاسبية؟'
  },
  {
    id: 'unit-4',
    unitNumber: 4,
    title: 'الوحدة الرابعة: ميزان المراجعة وتصحيح الأخطاء',
    shortTitle: 'الوحدة الرابعة',
    subtitle: 'ميزان المراجعة • الأخطاء المؤثرة وغير المؤثرة • الحساب المعلق • قيود التصحيح • دراسة حالة زيد والـ JRE',
    badge: 'الوحدة 4 (ميزان المراجعة وتصحيح الأخطاء - المنهج المعتمد)',
    bigIdea: 'الميزان المتوازن ليس بالضرورة نظاماً محاسبياً دقيقاً. تصحيح الأخطاء يعزز من الدقة المحاسبية، والتساوي الحسابي أداة رقابية أولية لا تضمن بمفردها التمثيل الصادق.',
    essentialQuestion: 'هل تصحيح الأخطاء المحاسبية يعيد المصداقية للقوائم المالية، أم أنه يعيد فقط التوازن الحسابي؟'
  },
  {
    id: 'unit-3',
    unitNumber: 3,
    title: 'الوحدة الثالثة: دفاتر اليومية المساعدة',
    shortTitle: 'الوحدة الثالثة',
    subtitle: 'الدفاتر المساعدة • المبيعات والمشتريات • المردودات والخصومات • دفتر النقدية • التطبيق المتكامل والـ JRE',
    badge: 'الوحدة 3 (الدفاتر المتخصصة - المنهج المعتمد)',
    bigIdea: 'عندما يتضاعف حجم المعاملات، يصبح دفتر اليومية العام غير كافٍ. تخصيص دفاتر لكل نوع من المعاملات المتكررة يزيد الكفاءة دون التضحية بالرقابة.',
    essentialQuestion: 'كيف نوازن بين كفاءة تقسيم العمل المحاسبي وبين استمرار دقة وموثوقية الأرصدة عبر الرقابة المزدوجة؟'
  },
  {
    id: 'unit-1',
    unitNumber: 1,
    title: 'الوحدة الأولى: أساسيات المحاسبة والتقارير المالية',
    shortTitle: 'الوحدة الأولى',
    subtitle: 'المبادئ الأساسية • معادلة الميزانية • أثر المعاملات المالية • القوائم المالية',
    badge: 'الوحدة 1 (الأساسيات المحاسبية)',
    bigIdea: 'المحاسبة هي لغة الأعمال ونظام لمعالجة البيانات المالية لتوفير معلومات ملائمة وموثوقة لاتخاذ القرارات.',
    essentialQuestion: 'كيف تترجم المعاملات المالية إلى قوائم مالية متوازنة تعكس المركز المالي والأداء الحقيقي للمنشأة؟'
  },
  {
    id: 'unit-2',
    unitNumber: 2,
    title: 'الوحدة الثانية: التسجيل المحاسبي والدورة المستندية',
    shortTitle: 'الوحدة الثانية',
    subtitle: 'القيد المزدوج • دفتر اليومية العام • دفتر الأستاذ والترصيد • ميزان المراجعة',
    badge: 'الوحدة 2 (التسجيل والترحيل)',
    bigIdea: 'كل عملية مالية لها طرفان متساويان في القيمة ومتعاكسان في الطبيعة، وتوثيقها يبدأ بمستند ثبوتي وينتهي بميزان مراجعة متوازن.',
    essentialQuestion: 'كيف تضمن الدورة المستندية والقيد المزدوج سلامة السجلات المالية واكتشاف الأخطاء المحاسبية؟'
  }
];

export function getLessonsForUnit(unitId: string): LessonContent[] {
  if (unitId === 'unit-1') return unit1Lessons;
  if (unitId === 'unit-2') return unit2Lessons;
  if (unitId === 'unit-3') return unit3Lessons;
  if (unitId === 'unit-4') return unit4Lessons;
  if (unitId === 'unit-5') return unit5Lessons;
  if (unitId === 'unit-6') return unit6Lessons;
  if (unitId === 'unit-7') return unit7Lessons;
  if (unitId === 'unit-8') return unit8Lessons;
  if (unitId === 'unit-9') return unit9Lessons;
  if (unitId === 'unit-10') return unit10Lessons;
  return unit8Lessons;
}
