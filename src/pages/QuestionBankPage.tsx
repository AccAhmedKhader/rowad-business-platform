import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, ArrowRight, BookOpen, Layers, Award } from 'lucide-react';
import { QuestionBankViewer } from '../components/QuestionBankViewer';

export const QuestionBankPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 font-serif" dir="rtl">
      {/* Assessment Sub-Navigation Bar */}
      <div className="bg-white border-2 border-[#1D1D1B] p-3 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <NavLink
            to="/assessment"
            className="flex items-center gap-1.5 text-xs font-bold text-[#1D1D1B] hover:text-[#C4A484] transition"
            title="العودة لمركز التقييم الرئيسي"
          >
            <ArrowRight className="w-4 h-4" />
            <span>منظومة التقويم والقياس المعياري</span>
          </NavLink>
          <span className="text-[#1D1D1B]/30">•</span>
          <span className="bg-[#1D1D1B] text-[#C4A484] text-xs font-bold px-2.5 py-0.5">
            بنك الأسئلة المعتمد
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* 1. أولاً: المراجعة */}
          <NavLink
            to="/assessment/unit-tests"
            className="px-3 py-1.5 text-xs font-bold bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15 flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>1. المراجعة الشاملة</span>
          </NavLink>

          {/* 2. ثانياً: التقييمات */}
          <NavLink
            to="/assessment/ministry-assessments"
            className="px-3 py-1.5 text-xs font-bold bg-[#FFF5F5] text-[#8A1F1D] hover:bg-[#8A1F1D]/10 border border-[#8A1F1D]/30 flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#8A1F1D]" />
            <span>2. التقييمات والأداءات (ص۳-۸٤)</span>
          </NavLink>

          {/* 3. ثالثاً: بنك الأسئلة */}
          <NavLink
            to="/assessment/question-bank"
            className="px-3 py-1.5 text-xs font-bold bg-[#1D1D1B] text-[#F9F7F2] flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>3. بنك الأسئلة المعتمد</span>
          </NavLink>

          {/* 4. رابعاً: الامتحانات */}
          <NavLink
            to="/assessment/mock-exams"
            className="px-3 py-1.5 text-xs font-bold bg-[#F9F7F2] text-[#1D1D1B] hover:bg-[#C4A484]/20 border border-[#1D1D1B]/15 flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5 text-[#C4A484]" />
            <span>4. الامتحانات المحاكية</span>
          </NavLink>
        </div>
      </div>

      {/* Dedicated Question Bank Component */}
      <QuestionBankViewer />
    </div>
  );
};
