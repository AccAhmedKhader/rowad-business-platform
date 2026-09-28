import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  AlertCircle, 
  ExternalLink, 
  X, 
  CheckCircle2, 
  Info,
  Calendar,
  Building2,
  FileCode2
} from 'lucide-react';
import { ContentOrigin, VerificationStatus, SourceRecord } from '../types';
import { getSourceById, getContentOriginMeta, inferContentOrigin } from '../data/sourceRegistry';

interface SourceProvenanceBadgeProps {
  origin?: ContentOrigin;
  sourceId?: string;
  sourceTitle?: string;
  sourcePage?: string | number;
  unitId?: string | number;
  lessonId?: string | number;
  verificationStatus?: VerificationStatus;
  customNote?: string;
  className?: string;
  compact?: boolean;
}

export const SourceProvenanceBadge: React.FC<SourceProvenanceBadgeProps> = ({
  origin,
  sourceId,
  sourceTitle,
  sourcePage,
  unitId,
  lessonId,
  verificationStatus,
  customNote,
  className = '',
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Determine actual origin & metadata
  const computedOrigin = origin || (sourceId ? inferContentOrigin({ sourceId }) : 'UNVERIFIED');
  const originMeta = getContentOriginMeta(computedOrigin);
  const sourceRecord: SourceRecord | undefined = sourceId ? getSourceById(sourceId) : undefined;
  
  const finalStatus: VerificationStatus = verificationStatus || sourceRecord?.verificationStatus || (computedOrigin === 'MINISTRY_OFFICIAL' ? 'VERIFIED' : 'VERIFIED');

  const getOriginIcon = () => {
    switch (computedOrigin) {
      case 'MINISTRY_OFFICIAL':
        return <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-700" />;
      case 'PLATFORM_EXPLANATION':
        return <BookOpen className="w-3.5 h-3.5 shrink-0 text-sky-700" />;
      case 'ENRICHMENT':
        return <HelpCircle className="w-3.5 h-3.5 shrink-0 text-purple-700" />;
      case 'UNVERIFIED':
      default:
        return <AlertCircle className="w-3.5 h-3.5 shrink-0 text-slate-500" />;
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        title="انقر لعرض بطاقة توثيق المصدر وسلسلة الإسناد"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer shadow-2xs hover:shadow-sm hover:scale-102 border ${originMeta.badgeBg} ${originMeta.badgeBorder} ${className}`}
      >
        {getOriginIcon()}
        <span className={originMeta.badgeText}>
          {compact ? originMeta.shortLabel : originMeta.label}
        </span>
        {sourcePage && (
          <span className="text-[10px] opacity-75 font-mono px-1 rounded bg-black/5">
            صـ {sourcePage}
          </span>
        )}
      </button>

      {/* Detail Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 text-slate-900 space-y-5 relative text-right"
            dir="rtl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-2xl ${originMeta.badgeBg} border ${originMeta.badgeBorder}`}>
                  {getOriginIcon()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-lg text-slate-900">بطاقة توثيق المصدر والإسناد</h3>
                    <span className={`text-[11px] font-black px-2 py-0.5 rounded-full border ${originMeta.badgeBg} ${originMeta.badgeBorder}`}>
                      {originMeta.shortLabel}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    سلسلة التحقق التربوي وفق معايير الحوكمة الشفافة 2027
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Origin Notice */}
            <div className={`p-3.5 rounded-2xl text-xs leading-relaxed border ${originMeta.badgeBg} ${originMeta.badgeBorder}`}>
              <div className="font-bold flex items-center gap-1.5 mb-1 text-slate-900">
                <Info className="w-4 h-4" />
                <span>دلالة التصنيف التربوي:</span>
              </div>
              <p className="text-slate-700">{originMeta.description}</p>
            </div>

            {/* Source Details Grid */}
            <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div className="flex items-start justify-between gap-2 border-b border-slate-200/60 pb-2">
                <span className="font-bold text-slate-500 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  اسم المصدر المعتمد:
                </span>
                <span className="font-extrabold text-slate-900 text-left max-w-[65%]">
                  {sourceTitle || (sourceRecord ? sourceRecord.title : 'مرجع إداري وبنك تدريبات المنصة')}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                <span className="font-bold text-slate-500 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  الجهة المصدرة والمسؤولة:
                </span>
                <span className="font-bold text-slate-800">
                  {sourceRecord ? sourceRecord.authority : originMeta.authorityHint}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 border-b border-slate-200/60 pb-2">
                <div>
                  <span className="font-bold text-slate-500 block mb-0.5">الوحدة / الدرس:</span>
                  <span className="font-bold text-slate-800">
                    {unitId ? `الوحدة ${unitId}` : (sourceRecord?.unit ? `الوحدة ${sourceRecord.unit}` : 'عام')}
                    {lessonId ? ` • درس ${lessonId}` : ''}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 block mb-0.5">رقم الصفحة:</span>
                  <span className="font-mono font-bold text-slate-800">
                    {sourcePage ? `صـ ${sourcePage}` : (sourceRecord?.page ? `صـ ${sourceRecord.page}` : 'متاح بالوثيقة الإلكترونية')}
                  </span>
                </div>
              </div>

              {sourceRecord && (
                <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                  <span className="font-bold text-slate-500 flex items-center gap-1.5">
                    <FileCode2 className="w-3.5 h-3.5 text-slate-400" />
                    اسم الملف والنسخة:
                  </span>
                  <span className="font-mono text-[11px] text-slate-600 dir-ltr text-left">
                    {sourceRecord.sourceFile} ({sourceRecord.sourceVersion})
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="font-bold text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  حالة التدقيق والتحقق:
                </span>
                <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                  finalStatus === 'VERIFIED'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {finalStatus === 'VERIFIED' ? 'تم التحقق والربط ✓' : 'قيد التدقيق الداخلي'}
                </span>
              </div>
            </div>

            {/* Custom Educational Audit Note */}
            {(customNote || sourceRecord?.notes) && (
              <div className="bg-amber-50/70 border border-amber-200/80 p-3 rounded-xl text-xs text-amber-900 leading-relaxed">
                <strong className="block mb-1 text-amber-950">ملاحظة التدقيق الأكاديمي:</strong>
                {customNote || sourceRecord?.notes}
              </div>
            )}

            {/* Footer */}
            <div className="pt-2 flex items-center justify-between text-slate-400 text-xs">
              <span className="text-[11px]">معرّف الإسناد: {sourceId || 'SRC-PLAT-REF'}</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
