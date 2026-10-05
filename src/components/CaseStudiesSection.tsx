import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowLeft, 
  TrendingUp, 
  Sparkles, 
  Building2, 
  MapPin, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';
import { caseStudies } from '../data';
import { CaseStudy } from '../types';
import { analytics } from '../services/analytics';

interface CaseStudiesSectionProps {
  onStartDiagnostic: () => void;
  onBookCall: () => void;
}

export default function CaseStudiesSection({ onStartDiagnostic, onBookCall }: CaseStudiesSectionProps) {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(caseStudies[0].id);

  const selectedCase = caseStudies.find(c => c.id === selectedCaseId) || caseStudies[0];

  const handleSelectCase = (id: string, title: string) => {
    setSelectedCaseId(id);
    analytics.track('case_study_viewed', {
      caseId: id,
      title
    });
  };

  return (
    <section id="case-studies" className="py-24 bg-gray-50 border-t border-gray-200 text-right">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-red">
            <span>04.</span>
            <span>الأدلة ونتائج التشغيل</span>
            <span className="text-gray-300">·</span>
            <span className="font-en text-[11px] text-gray-500 uppercase tracking-wider">VERIFIED CASE STUDIES</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight">
            كيف تحولت التحديات إلى أنظمة نمو تعمل كالساعة
          </h2>

          <p className="text-base text-gray-600 leading-relaxed">
            نماذج حقيقية من قطاعات متنوعة قمنا بتشريح مشاكلها التشغيلية، وسد ثغرات تسريب العملاء لديها، وبناء أنظمة نمو مستدامة تعتمد على الأرقام.
          </p>
        </div>

        {/* Sector Tabs Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8">
          {caseStudies.map((c) => {
            const isSelected = selectedCaseId === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSelectCase(c.id, c.clientTitle)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-gray-950 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:text-gray-950 border border-gray-200 hover:border-gray-300'
                }`}
              >
                {c.clientSector}
              </button>
            );
          })}
        </div>

        {/* Selected Case Study Full Breakdown */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Cols: The Story (Challenge -> What Was Wrong -> What Was Implemented) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Case Header */}
              <div className="space-y-2 border-b border-gray-100 pb-6">
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span className="font-bold text-accent-red">{selectedCase.clientSector}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{selectedCase.location}</span>
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-950">
                  {selectedCase.clientTitle}
                </h3>
                <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg">
                  {selectedCase.shaviSystem}
                </div>
              </div>

              {/* Challenge vs What Was Wrong */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-red-50/50 border border-red-150 rounded-2xl space-y-1.5">
                  <span className="text-xs font-bold text-red-900 block">التحدي الرئيسي:</span>
                  <p className="text-xs md:text-sm text-red-950 leading-relaxed font-medium">
                    {selectedCase.challenge}
                  </p>
                </div>

                <div className="p-5 bg-amber-50/50 border border-amber-150 rounded-2xl space-y-1.5">
                  <span className="text-xs font-bold text-amber-900 block">أين كان الخلل الجذري؟</span>
                  <p className="text-xs md:text-sm text-amber-950 leading-relaxed font-medium">
                    {selectedCase.whatWasWrong}
                  </p>
                </div>
              </div>

              {/* What Shavi Implemented */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-950">ما الذي تم بناؤه وتنفيذه بواسطة Shavi؟</h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedCase.whatWasImplemented.map((item, idx) => (
                    <div key={idx} className="p-3.5 bg-gray-50 border border-gray-100 rounded-xl flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="text-xs md:text-sm text-gray-800 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Before vs After Comparison */}
              <div className="p-5 bg-gray-900 text-white rounded-2xl space-y-3 border border-white/5">
                <span className="text-xs font-bold text-gray-400 block font-en uppercase tracking-wider">
                  BEFORE VS AFTER COMPARISON
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
                    <span className="text-red-400 font-bold block">الوضع قبل المنظومة:</span>
                    <p className="text-gray-300 leading-relaxed">{selectedCase.beforeState}</p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 space-y-1">
                    <span className="text-emerald-400 font-bold block">الوضع بعد تفعيل Shavi OS:</span>
                    <p className="text-gray-200 leading-relaxed">{selectedCase.afterState}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right 4 Cols: Metrics & Lessons */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Highlight Metrics */}
              <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 space-y-4">
                <span className="text-xs font-bold text-gray-500 block">النتائج التشغيلية المحققة:</span>
                <div className="space-y-3">
                  {selectedCase.resultHighlights.map((r, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-2xl border border-gray-100 shadow-2xs space-y-1">
                      <span className="text-2xl font-black text-accent-red font-en block">{r.metric}</span>
                      <span className="text-xs text-gray-700 font-medium block leading-snug">{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Lesson */}
              <div className="p-5 bg-accent-red/5 border border-accent-red/15 rounded-2xl space-y-1.5">
                <span className="text-xs font-bold text-accent-red block">الدرس المستفاد من هذه الحالة:</span>
                <p className="text-xs text-gray-800 leading-relaxed">
                  "{selectedCase.keyLessons}"
                </p>
              </div>

              {/* CTA Button */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={onStartDiagnostic}
                  className="w-full py-3.5 bg-accent-red hover:bg-accent-red-hover text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>شخّص وضع شركتك على نفس المعايير</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <p className="text-[10px] text-gray-400 text-center leading-normal">
                  * النتائج مبنية على نشر منظومات تشغيل فعلية وتتفاوت النتائج الدقيقة بحسب حجم العرض ومرحلة الشركة.
                </p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
