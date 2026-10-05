import React from 'react';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  ArrowLeft, 
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { trainingPrograms } from '../data';
import { analytics } from '../services/analytics';

interface TrainingSectionProps {
  onBookCall: () => void;
}

export default function TrainingSection({ onBookCall }: TrainingSectionProps) {
  const handleEnrollClick = (programTitle: string) => {
    analytics.track('training_pathway_opened', {
      programTitle
    });
    onBookCall();
  };

  return (
    <section id="training" className="py-20 bg-gray-50 border-t border-gray-200 text-right">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-red">
            <span>07.</span>
            <span>مسار التمكين المؤسسي المستقل</span>
            <span className="text-gray-300">·</span>
            <span className="font-en text-[11px] text-gray-500 uppercase tracking-wider">ENABLEMENT & TRAINING PATHWAY</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight">
            برامج تدريب وتأهيل الفرق والشركات
          </h2>

          <p className="text-base text-gray-600 leading-relaxed">
            لأننا نؤمن باستدامة النمو ونقل المعرفة؛ نقدم برامج تدريبية متخصصة لتأهيل فرق العمل الداخلية لديك في مجالات التسويق الحديث، إدارة الأعمال، وتكامل أدوات الذكاء الاصطناعي.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trainingPrograms.map((prog, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-7 border border-gray-200 hover:border-accent-red/30 transition-all flex flex-col justify-between shadow-2xs group"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-accent-red/5 flex items-center justify-center text-accent-red">
                  <GraduationCap className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-accent-red block">{prog.format}</span>
                  <h3 className="text-lg font-bold text-gray-950 leading-snug group-hover:text-accent-red transition-colors">
                    {prog.title}
                  </h3>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {prog.description}
                </p>

                <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-500">
                  <span className="font-bold text-gray-700">الفئة المستهدفة: </span>
                  <span>{prog.target}</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => handleEnrollClick(prog.title)}
                  className="w-full py-2.5 bg-gray-100 hover:bg-accent-red hover:text-white text-gray-900 text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>طلب برنامج تدريبي لشركتك</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Training Benefit Note */}
        <div className="mt-10 p-6 bg-white border border-gray-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span>
              جميع البرامج التدريبية تشتمل على حقائب تدريبية مفصلة، أوراق عمل تطبيقية، وجلسات متابعة لضمان التطبيق الفعلي داخل مؤسستك.
            </span>
          </div>

          <button
            type="button"
            onClick={onBookCall}
            className="text-xs font-bold text-accent-red hover:underline whitespace-nowrap cursor-pointer"
          >
            تواصل للاستفسار عن برامج التدريب ←
          </button>
        </div>

      </div>
    </section>
  );
}
