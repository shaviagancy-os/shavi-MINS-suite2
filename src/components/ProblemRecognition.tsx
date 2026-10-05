import React from 'react';
import { 
  ArrowLeft, 
  AlertTriangle, 
  CheckCircle2, 
  Target, 
  TrendingDown, 
  Clock, 
  BarChart3 
} from 'lucide-react';
import { bottleneckItems } from '../data';
import { analytics } from '../services/analytics';

interface ProblemRecognitionProps {
  onSelectBottleneck: (bottleneckId: string) => void;
}

export default function ProblemRecognition({ onSelectBottleneck }: ProblemRecognitionProps) {
  const getIcon = (id: string) => {
    switch (id) {
      case 'acquisition':
        return <Target className="w-5 h-5 text-accent-red" />;
      case 'conversion':
        return <TrendingDown className="w-5 h-5 text-accent-red" />;
      case 'operations':
        return <Clock className="w-5 h-5 text-accent-red" />;
      case 'scale':
        return <BarChart3 className="w-5 h-5 text-accent-red" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-accent-red" />;
    }
  };

  const handleCardClick = (id: string, title: string) => {
    analytics.track('diagnostic_start', {
      source: 'problem_recognition_card',
      bottleneckId: id,
      bottleneckTitle: title,
    });
    onSelectBottleneck(id);
  };

  return (
    <section id="bottlenecks" className="py-20 bg-gray-50 border-y border-gray-100 text-right">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-red">
            <span>02.</span>
            <span>تشخيص فجوات الأداء</span>
            <span className="text-gray-300">·</span>
            <span className="font-en text-[11px] text-gray-500 uppercase tracking-wider">PROBLEM RECOGNITION</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight">
            أين يتعطل نمو شركتك اليوم؟
          </h2>

          <p className="text-base text-gray-600 leading-relaxed">
            معظم الشركات لا تعاني من قلة الجهد، بل من وجود "ثغرة غير مرئية" تسرب الفرص أو تهدر الميزانيات. حدد أين يقع التحدي الأكبر لشركتك لنبدأ في علاجه:
          </p>
        </div>

        {/* 4 Bottlenecks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bottleneckItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.id, item.title)}
              className="bg-white rounded-3xl p-7 md:p-8 border border-gray-200 hover:border-accent-red/40 hover:shadow-xl hover:shadow-red-900/5 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-accent-red/5 border border-accent-red/10 flex items-center justify-center">
                    {getIcon(item.id)}
                  </div>
                  <span className="font-en text-sm font-bold text-gray-400 group-hover:text-accent-red transition-colors">
                    {item.number}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-gray-950 group-hover:text-accent-red transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Symptoms list */}
                <div className="pt-2 space-y-2 border-t border-gray-100">
                  <span className="text-[11px] font-bold text-gray-500 block">أبرز مؤشرات هذه المشكلة:</span>
                  {item.symptoms.map((symptom, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2 text-xs text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-red mt-1.5 flex-shrink-0" />
                      <span>{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action footer */}
              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-accent-red group-hover:translate-x-[-4px] transition-transform">
                <span className="text-gray-500 font-medium">المنظومة المقترحة: {item.pillarLabel}</span>
                <span className="flex items-center gap-1.5">
                  <span>{item.actionTitle}</span>
                  <ArrowLeft className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Global CTA Strip */}
        <div className="mt-12 p-6 md:p-8 bg-gray-950 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/5">
          <div className="space-y-1 text-center sm:text-right">
            <h4 className="text-lg font-bold text-white">غير متأكد أين تقع الثغرة تحديداً؟</h4>
            <p className="text-xs text-gray-400">
              أجب عن 8 أسئلة سريعة وسيقوم محرك Shavi بتشخيص نموذج عملك وعرض الحل المناسب في دقيقتين.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleCardClick('all', 'General Diagnostic')}
            className="px-6 py-3 bg-accent-red hover:bg-accent-red-hover text-white text-xs font-bold rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <span>ابدأ الفحص والتشخيص الآن</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
