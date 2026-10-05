import React from 'react';
import { X, Cpu, Stethoscope, Home, ShoppingCart, GraduationCap, Briefcase, CheckCircle2, AlertCircle, TrendingUp, Sparkles, HelpCircle, Star, ArrowRight } from 'lucide-react';
import { Sector } from '../types';
import LeadForm from './LeadForm';

interface SectorModalProps {
  sector: Sector | null;
  onClose: () => void;
}

export default function SectorModal({ sector, onClose }: SectorModalProps) {
  if (!sector) return null;

  // Map icon name string to Lucide React component
  const renderIcon = (iconName: string) => {
    const props = { className: "w-8 h-8 md:w-10 md:h-10 text-accent-red animate-pulse-slow" };
    switch (iconName) {
      case 'Cpu':
        return <Cpu {...props} />;
      case 'Stethoscope':
        return <Stethoscope {...props} />;
      case 'Home':
        return <Home {...props} />;
      case 'ShoppingCart':
        return <ShoppingCart {...props} />;
      case 'GraduationCap':
        return <GraduationCap {...props} />;
      case 'Briefcase':
        return <Briefcase {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 md:p-6 animate-fade-in">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden h-full sm:h-auto max-h-[100vh] sm:max-h-[90vh] flex flex-col animate-scale-up border border-gray-100 z-10">
        
        {/* Header Bar */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-accent-light flex items-center justify-center">
              {renderIcon(sector.icon)}
            </div>
            <div>
              <h2 className="font-display font-bold text-lg md:text-xl text-gray-900 leading-tight">
                {sector.name}
              </h2>
              <p className="text-xs text-gray-400 font-medium tracking-wide uppercase font-en">
                Shavi OS for {sector.englishName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-100 hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12 no-scrollbar">
          
          {/* Hero Banner Section */}
          <div className="text-right space-y-4">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-red bg-accent-light px-3 py-1 rounded-full">
              <Sparkles className="w-3 h-3" />
              <span>نظام تشغيل وحلول نمو مخصصة لقطاعك</span>
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 leading-snug">
              {sector.tagline}
            </h3>
            <p className="text-sm md:text-base text-gray-600 max-w-3xl leading-relaxed">
              {sector.description}
            </p>
          </div>

          {/* Pain Points vs Solutions Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Pain Points */}
            <div className="bg-red-50/20 border border-red-100/50 rounded-2xl p-6 space-y-4 text-right">
              <div className="flex items-center gap-2 text-red-600 font-semibold text-base">
                <AlertCircle className="w-5 h-5" />
                <h4>التحديات الشائعة في السوق</h4>
              </div>
              <ul className="space-y-3.5">
                {sector.painPoints.map((pain, index) => (
                  <li key={index} className="flex gap-2.5 text-sm text-gray-700 leading-relaxed">
                    <span className="text-red-400 font-semibold text-xs mt-1">●</span>
                    <span>{pain}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Solutions */}
            <div className="bg-green-50/20 border border-green-100/50 rounded-2xl p-6 space-y-4 text-right">
              <div className="flex items-center gap-2 text-green-600 font-semibold text-base">
                <CheckCircle2 className="w-5 h-5" />
                <h4>حلول Shavi OS الذكية</h4>
              </div>
              <ul className="space-y-3.5">
                {sector.solutions.map((sol, index) => (
                  <li key={index} className="flex gap-2.5 text-sm text-gray-700 leading-relaxed">
                    <span className="text-green-500 font-bold text-xs mt-1">✔</span>
                    <span>{sol}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Automation Box */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between text-right">
            <div className="space-y-2 md:max-w-[70%]">
              <span className="text-xs font-bold text-accent-red uppercase tracking-wider font-en">
                AI & AUTOMATION ADVANTAGE
              </span>
              <h4 className="text-lg font-bold text-gray-900">
                {sector.aiAutomation.title}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {sector.aiAutomation.description}
              </p>
            </div>
            <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm text-center min-w-[200px]">
              <span className="text-xs text-gray-400 block mb-1">الأثر المقاس المتوقع</span>
              <span className="text-xl md:text-2xl font-black text-accent-red font-display block">
                {sector.aiAutomation.impact}
              </span>
            </div>
          </div>

          {/* Expected ROI Section */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-gray-900 to-gray-800 text-white p-6 md:p-8 text-right">
            <div className="absolute top-0 left-0 w-32 h-32 bg-accent-red/10 rounded-full blur-2xl" />
            <div className="relative flex flex-col md:flex-row gap-6 items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-accent-red font-semibold text-xs">
                  <TrendingUp className="w-4 h-4" />
                  <span>ROI METRICS</span>
                </div>
                <h4 className="text-xl font-bold">العائد المتوقع على الاستثمار (Expected ROI)</h4>
                <p className="text-sm text-gray-300 max-w-2xl">
                  نحن نضمن لك أرقاماً حقيقية وملموسة. نظامنا يسخر القنوات التسويقية وذكاء العمليات لتحقيق قفزة حقيقية في نمو أعمالك.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl text-center border border-white/5 min-w-[240px]">
                <p className="text-xs text-gray-400 mb-1">النمو خلال 90 يوم</p>
                <p className="text-md md:text-lg font-bold text-white leading-snug">
                  {sector.expectedRoi}
                </p>
              </div>
            </div>
          </div>

          {/* Steps / Workflow */}
          <div className="space-y-6 text-right">
            <div>
              <h4 className="text-lg font-bold text-gray-900">كيف ننتقل بقطاعك خطوة بخطوة؟</h4>
              <p className="text-xs text-gray-400 mt-0.5">منهجية عمل صارمة تضمن الجودة القصوى وسرعة الإطلاق</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sector.workflow.map((step, index) => (
                <div key={index} className="bg-white border border-gray-100 p-5 rounded-xl space-y-3 relative overflow-hidden">
                  <span className="absolute top-2 left-4 text-3xl font-black text-gray-50 font-en select-none">
                    {step.stepNumber}
                  </span>
                  <div className="w-7 h-7 bg-accent-light rounded-full flex items-center justify-center text-accent-red text-xs font-bold">
                    {index + 1}
                  </div>
                  <h5 className="font-bold text-gray-900 text-sm">{step.title}</h5>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features and Benefits Grid */}
          <div className="space-y-6 text-right">
            <h4 className="text-lg font-bold text-gray-900">ميزات تشغيل مضافة</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sector.features.map((feature, index) => (
                <div key={index} className="bg-gray-50/50 border border-gray-100 p-5 rounded-xl space-y-1">
                  <h5 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent-red rounded-full" />
                    {feature.title}
                  </h5>
                  <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Block */}
          <div className="bg-accent-light/30 border border-accent-red/5 p-6 rounded-2xl text-right space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            {sector.testimonials.map((test, index) => (
              <div key={index} className="space-y-3">
                <p className="text-sm italic text-gray-700 leading-relaxed font-display">
                  &quot;{test.content}&quot;
                </p>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">{test.name}</h5>
                  <p className="text-xs text-gray-400">{test.role} - {test.company}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Specific Lead Form Context */}
          <div className="pt-6 border-t border-gray-100">
            <div className="text-center mb-6">
              <span className="inline-block text-xs font-bold text-accent-red tracking-widest uppercase mb-1">
                SECURE YOUR DEMO
              </span>
              <h4 className="text-xl font-bold text-gray-900">احصل على نسختك من نظام Shavi OS الآن</h4>
              <p className="text-sm text-gray-500 max-w-lg mx-auto mt-1">
                تواصل مع مستشار نمو متخصص بقطاعك لتجربة محاكاة مباشرة لنظام التشغيل على مشروعك الفعلي.
              </p>
            </div>
            
            <LeadForm initialSector={sector.id} onSuccess={onClose} />
          </div>

        </div>

        {/* Modal Footer (Always stick to bottom on mobile) */}
        <div className="bg-gray-50 border-t border-gray-100 px-6 py-4 flex items-center justify-between sm:rounded-b-3xl">
          <span className="text-xs text-gray-400 hidden sm:inline-block">Shavi Agency - مستقبل الأعمال يبدأ بنظام</span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold rounded-full transition-all"
          >
            إغلاق نافذة القطاع
          </button>
        </div>

      </div>
    </div>
  );
}
