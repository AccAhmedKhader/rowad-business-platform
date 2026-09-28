import React from 'react';
import { 
  ShieldCheck, 
  X, 
  Lock, 
  Eye, 
  BrainCircuit, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import { lmsService } from '../services/lmsService';

interface PrivacyAndGovernanceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyAndGovernanceModal: React.FC<PrivacyAndGovernanceModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900 space-y-6 text-right"
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">سياسة الخصوصية وحوكمة البيانات واستخدام الذكاء الاصطناعي</h2>
              <p className="text-xs text-slate-500 font-medium">منصة رواد الأعمال — نظام البكالوريا المصرية 2027</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Data Classification Policy */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>1. مصفوفة تصنيف البيانات (Data Classification)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
              <strong className="text-emerald-800 block font-bold">🟢 بيانات عامة (PUBLIC):</strong>
              <p className="text-slate-600">نصوص المناهج، أسئلة كتاب الوزارة، كراسات التقييمات، الشروحات البيداغوجية، وبنك الأسئلة.</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
              <strong className="text-sky-800 block font-bold">🔵 بيانات تشغيلية داخلية (INTERNAL):</strong>
              <p className="text-slate-600">سجل المصادر المركزي (Source Registry)، وسجلات التدقيق التربوي (Audit Logs).</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
              <strong className="text-purple-800 block font-bold">🟣 بيانات الطالب التعليمية (STUDENT_DATA):</strong>
              <p className="text-slate-600">سجل الإجابات، درجات الاختبارات، ومؤشرات إتقان نواتج التعلم. تُخزن محلياً فقط على متصفحك.</p>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1">
              <strong className="text-rose-800 block font-bold">🔴 بيانات حساسة (SENSITIVE):</strong>
              <p className="text-slate-600">لا تطلب المنصة ولا تخزن إطلاقاً أي أرقام قومية أو معلومات دفع بنكي أو كلمات مرور.</p>
            </div>
          </div>
        </div>

        {/* Section 2: AI Safety & Governance */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-indigo-600" />
            <span>2. إشعار استخدام الذكاء الاصطناعي (AI Governance Notice)</span>
          </h3>
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950 space-y-2 leading-relaxed">
            <p>
              • <strong>دور المساعد الذكي:</strong> تم تصميم مستشار رواد الأعمال لتقديم الإرشاد التربوي التفاعلي وتسهيل المذاكرة وفق نموذج الاسترجاع المقيد (RAG).
            </p>
            <p>
              • <strong>إخلاء مسؤولية واستقلالية المحتوى:</strong> هذا المشروع والموقع والمنصة بالكامل عمل تعليمي وبحثي مستقل غير تابع لأي جهة حكومية أو لوزارة التربية والتعليم، ويهدف لتيسير دراسة مقرر إدارة الأعمال لطلاب المرحلة الثانوية وفق المعايير التربوية المعتمدة.
            </p>
            <p>
              • <strong>منع الهلوسة:</strong> يحظر على النظام تلقائياً اختلاق أي قرارات وزارية أو درجات رسمية خارج نطاق المصادر المسجلة في الـ Source Registry.
            </p>
          </div>
        </div>

        {/* Section 3: Student Privacy Rights (Right to be Forgotten) */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <Eye className="w-4 h-4 text-amber-600" />
            <span>3. حقوق الطالب وحق الحذف التام (Right to Be Forgotten)</span>
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            احتراماً لخصوصيتك الكاملة، لا يتم رفع سجل إجاباتك لأي خوادم خارجية بغرض الإعلانات أو التتبع التجاري. يمكنك في أي لحظة النقر على خيار "إعادة ضبط وتصفير سجل التقدم" في لوحة (مستواي) لمسح كافة بيانات التدريب المخزنة في متصفحك فورياً وبشكل نهائي لا رجعة فيه.
          </p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-[11px] text-slate-400">
            وثيقة الحوكمة رقم: GOV-2027-V2 • سارية للعام الدراسي 2026/2027
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            فهمت وأوافق
          </button>
        </div>
      </div>
    </div>
  );
};
