import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  RefreshCw, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle,
  BrainCircuit,
  GraduationCap
} from 'lucide-react';

interface AiTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  initialContext?: string;
  unitTitle?: string;
}

interface Message {
  sender: 'user' | 'tutor';
  text: string;
}

export const AiTutorModal: React.FC<AiTutorModalProps> = ({
  isOpen,
  onClose,
  initialPrompt,
  initialContext,
  unitTitle
}) => {
  const [inputPrompt, setInputPrompt] = useState<string>(initialPrompt || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'tutor',
      text: `أهلاً بك يا بطل! أنا "مستشار رواد الأعمال"، المساعد التعليمي لمنصة رواد الأعمال (مسترشد بمنهج البكالوريا المصرية 2027 والمصادر المتاحة). 🎓✨

أنا هنا لمساعدتك في:
1. شرح وتيسير أي مفهوم أو مسألة حسابية (نقطة التعادل، التدفق النقدي، هيرزبرج، PESTEL...).
2. تدريبك على صياغة سؤال الحكم والاستدلال (JRE) وفق سلم تقييم تدريبي من تصميم المنصة (20 درجة).
3. كشف أفخاخ أسئلة الاختيار من متعدد وتحليل المشتتات والخيارات الخاطئة.
4. إعطاؤك نصائح واستراتيجيات استدلالية للمذاكرة والمراجعة.

بماذا نبدأ اليوم؟`
    }
  ]);

  useEffect(() => {
    if (isOpen && initialPrompt) {
      setInputPrompt(initialPrompt);
    }
  }, [isOpen, initialPrompt]);

  if (!isOpen) return null;

  const handleSend = async (customPrompt?: string) => {
    const promptToSend = customPrompt || inputPrompt;
    if (!promptToSend.trim() || loading) return;

    // Add user message
    const newMessages: Message[] = [...messages, { sender: 'user', text: promptToSend }];
    setMessages(newMessages);
    setInputPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          unitTitle: unitTitle || "إدارة الأعمال - بكالوريا مصر 2027",
          caseContext: initialContext || "",
          type: "explain_concept"
        })
      });

      const data = await res.json();
      if (data.reply) {
        setMessages(prev => [...prev, { sender: 'tutor', text: data.reply }]);
      } else if (data.fallback) {
        setMessages(prev => [
          ...prev, 
          { 
            sender: 'tutor', 
            text: `💡 إرشاد دراسي معتمد: ${promptToSend}

وفقًا لكتاب المدرسة المعتمد وكتاب الأداءات والتقييمات:
• احرص دائمًا على ربط المفاهيم بالأثر المالي والإداري على أصحاب المصلحة.
• في أسئلة المقال، التزم بالهيكلية الخماسية: (الحكم الصريح -> التبرير السببي -> الدليل من الحالة ومصطلحات المنهج -> الموازنة والحجة المقابلة -> الاستنتاج المشروط).
• راجع بطاقات المنهج في "الكتاب الخارجي" ونماذج الأداءات والتقييمات للتعرف على صياغة الإجابات النموذجية.` 
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev, 
          { 
            sender: 'tutor', 
            text: data.error || 'عذرًا، حدث خطأ أثناء الاتصال بالخادم. يمكنك مراجعة الإجابة النموذجية المباشرة في تبويب بنك الأسئلة أو كتاب التقييمات.' 
          }
        ]);
      }
    } catch (err: any) {
      setMessages(prev => [
        ...prev, 
        { 
          sender: 'tutor', 
          text: 'عذرًا، تعذر الوصول إلى خدمة المستشار الآن. يمكنك مراجعة الشروحات المرفقة في التطبيق أو تجربة الاتصال مرة أخرى.' 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const presetQuestions = [
    "كيف أضمن 20 درجة في سؤال الحكم والاستدلال (JRE)؟",
    "ما الفرق الحاسم بين الربح والتدفق النقدي؟",
    "اشرح لي كيفية حساب نقطة التعادل بالمعادلة",
    "كيف أفرق بين أسلوب القيادة الأوتوقراطي والديمقراطي؟"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-slate-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <Bot className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base">مستشار رواد الأعمال الذكي</h3>
                <span className="text-[10px] bg-amber-400/30 text-amber-200 font-bold px-2 py-0.5 rounded-full border border-amber-300/30">
                  ذكاء اصطناعي تربوي
                </span>
              </div>
              <p className="text-xs text-amber-100">
                مستشارك التربوي التفاعلي لإدارة الأعمال - بكالوريا مصر 2027
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Governance Disclaimer Strip */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-1.5 text-[11px] text-amber-900 flex items-center justify-between">
          <span>💡 <strong>إشعار حوكمة:</strong> إجابات الذكاء الاصطناعي استرشادية لتيسير الفهم وتستند للمصادر المسجلة.</span>
          <span className="text-amber-800 font-bold">RAG Pipeline V2</span>
        </div>

        {/* Preset Questions Chips */}
        <div className="p-3 bg-amber-50/70 border-b border-amber-100 overflow-x-auto no-scrollbar flex items-center gap-2">
          <span className="text-[11px] font-black text-amber-900 shrink-0 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            أسئلة شائعة:
          </span>
          {presetQuestions.map((pq, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(pq)}
              disabled={loading}
              className="text-[11px] font-bold bg-white hover:bg-amber-100/70 text-slate-700 hover:text-amber-950 px-2.5 py-1 rounded-lg border border-amber-200 shrink-0 transition-colors shadow-2xs"
            >
              {pq}
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((m, idx) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={idx}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                    isUser
                      ? 'bg-amber-600 text-white rounded-br-none shadow-xs font-medium'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                  }`}
                >
                  {m.text}
                </div>
                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />
                <span>المستشار يقوم بتحليل السؤال ومقارنته بالمقرر الوزاري...</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Input */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="اكتب سؤالك أو اطلب شرح مفهوم أو مسألة..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 text-xs sm:text-sm px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium text-slate-800"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputPrompt.trim() || loading}
            className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all disabled:opacity-50 shadow-xs"
          >
            <span>إرسال</span>
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
