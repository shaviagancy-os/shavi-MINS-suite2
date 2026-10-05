import React, { useState, useEffect, useRef } from 'react';
import { Play, Sparkles, MessageSquare, Database, Users, CheckCircle, ArrowDown } from 'lucide-react';

interface Step {
  id: number;
  label: string;
  sub: string;
  icon: React.ReactNode;
}

export default function AIAutomationSimulator() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const steps: Step[] = [
    {
      id: 1,
      label: 'التقاط الاهتمام الذكي',
      sub: 'يسجل العميل بياناته في صفحة الهبوط أو يتفاعل مع إعلانات Meta.',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 2,
      label: 'التصفية والتأهيل الفوري',
      sub: 'يقوم نظام AI OS بفحص المدخلات، وتصنيف العميل حسب ميزانيته وقطاعه.',
      icon: <Sparkles className="w-5 h-5" />
    },
    {
      id: 3,
      label: 'الاستجابة الفورية (أقل من 5 ثوانٍ)',
      sub: 'يرسل بوت الواتساب الترحيب الرسمي، ومقاطع الفيديو التعريفية وملف العرض آلياً.',
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      id: 4,
      label: 'المزامنة مع CRM وتنبيه مستشار المبيعات',
      sub: 'يتم تسجيل العميل ببطاقة ذكية وتنبيه مستشار النمو بمكالمة الاستشارة.',
      icon: <Database className="w-5 h-5" />
    }
  ];

  const handleStartSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(1);
  };

  useEffect(() => {
    if (!isRunning || activeStep === 0) return;

    if (activeStep <= steps.length) {
      const timer = setTimeout(() => {
        setActiveStep(prev => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsRunning(false);
        setActiveStep(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [activeStep, isRunning]);

  const rootRef = useRef<HTMLDivElement>(null);

  // Auto-run the demo the moment it scrolls into view (no button click needed)
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleStartSimulation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-100/40 text-right space-y-6">
      {/* Intro */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-50 pb-4">
        <div>
          <h4 className="text-lg font-bold text-gray-900">محاكي أتمتة تدفق العملاء الذكي (AI OS flow)</h4>
          <p className="text-xs text-gray-500 mt-1">شاهد كيف يقوم نظامنا باستقبال العميل ومتابعته آلياً دون تدخل بشري في ثوانٍ معدودة.</p>
        </div>
        <button
          onClick={handleStartSimulation}
          disabled={isRunning}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 self-start md:self-auto cursor-pointer ${
            isRunning
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-accent-red hover:bg-accent-red-hover text-white shadow-md shadow-red-500/10 hover:shadow-lg'
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>{isRunning ? 'جاري المحاكاة...' : 'شغّل الأتمتة التوضيحية'}</span>
        </button>
      </div>

      {/* Steps Visual Layout */}
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isPending = activeStep === 0;
          const isCurrent = activeStep === step.id;
          const isCompleted = activeStep > step.id || (activeStep > steps.length && !isRunning);

          return (
            <div key={step.id} className="relative">
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="absolute right-6 top-12 bottom-[-16px] w-[2px] bg-gray-100 z-0">
                  <div
                    className="w-full bg-accent-red transition-all duration-1000"
                    style={{
                      height: isCompleted ? '100%' : '0%'
                    }}
                  />
                </div>
              )}

              {/* Step Card */}
              <div
                className={`relative z-10 flex items-start gap-4 p-4 rounded-2xl border transition-all duration-500 ${
                  isCurrent
                    ? 'bg-accent-light/50 border-accent-red/20 shadow-md shadow-red-500/5'
                    : isCompleted
                    ? 'bg-gray-50/50 border-gray-100'
                    : 'bg-white border-transparent opacity-60'
                }`}
              >
                {/* Step Icon Wrapper */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isCurrent
                      ? 'bg-accent-red text-white scale-105 shadow-md shadow-red-500/20'
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle className="w-5 h-5 animate-scale-up" /> : step.icon}
                </div>

                {/* Step Text Info */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400 font-en">STEP 0{step.id}</span>
                    <h5
                      className={`text-sm font-bold transition-all duration-300 ${
                        isCurrent ? 'text-accent-red' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </h5>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.sub}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulator Conclusion Alert */}
      {activeStep > steps.length && (
        <div className="bg-green-50/40 border border-green-100 rounded-2xl p-4 text-center animate-scale-up">
          <p className="text-xs font-bold text-green-700">
            ✔ اكتمل التدفق بنجاح! تم التقاط العميل وتصنيفه ومتابعته بالكتالوج وتنبيه المبيعات بمتوسط زمن كلي بلغ 4.2 ثوانٍ.
          </p>
        </div>
      )}
    </div>
  );
}
