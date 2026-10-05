import React, { useState } from 'react';
import { 
  Megaphone, 
  TrendingUp, 
  Bot, 
  Award, 
  GraduationCap, 
  ArrowLeft, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { growthPillars } from '../data';
import { GrowthPillar } from '../types';
import { analytics } from '../services/analytics';

interface GrowthSystemSectionProps {
  onStartDiagnostic: (pillarId?: string) => void;
  onBookCall: () => void;
}

export default function GrowthSystemSection({ onStartDiagnostic, onBookCall }: GrowthSystemSectionProps) {
  const [activePillarId, setActivePillarId] = useState<string>('acquire');

  const activePillar = growthPillars.find(p => p.id === activePillarId) || growthPillars[0];

  const getPillarIcon = (id: string) => {
    switch (id) {
      case 'acquire':
        return <Megaphone className="w-5 h-5" />;
      case 'convert':
        return <TrendingUp className="w-5 h-5" />;
      case 'automate':
        return <Bot className="w-5 h-5" />;
      case 'scale':
        return <Award className="w-5 h-5" />;
      case 'enable':
        return <GraduationCap className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  const handleSelectPillar = (id: string) => {
    setActivePillarId(id);
    analytics.track('industry_selected', {
      pillarId: id,
    });
  };

  return (
    <section id="growth-system" className="py-24 bg-white text-right">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-red">
            <span>03.</span>
            <span>المنظومة المتكاملة</span>
            <span className="text-gray-300">·</span>
            <span className="font-en text-[11px] text-gray-500 uppercase tracking-wider">THE SHAVI GROWTH SYSTEM</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight">
            نظام تشغيل واحد يربط أطراف النمو ببعضها
          </h2>

          <p className="text-base text-gray-600 leading-relaxed">
            النمو المستدام لا يتحقق بخدمات منفصلة أو إعلانات منعزلة. نبني لك منظومة تشغيل خماسية مترابطة تحول الفرص والوصول إلى أرباح قابلة للتنبؤ والقياس.
          </p>
        </div>

        {/* 5-Step System Architecture Visual Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 p-2 bg-gray-100 rounded-3xl mb-12">
          {growthPillars.map((p) => {
            const isActive = activePillarId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectPillar(p.id)}
                className={`py-3.5 px-3 rounded-2xl transition-all duration-200 text-center flex flex-col items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-white text-gray-950 shadow-md shadow-gray-200/50 font-bold border border-gray-200/80'
                    : 'text-gray-600 hover:text-gray-950 hover:bg-white/50'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  isActive ? 'bg-accent-red text-white' : 'bg-gray-200/70 text-gray-700'
                }`}>
                  {getPillarIcon(p.id)}
                </div>
                <span className="text-xs font-bold font-en uppercase tracking-wider">{p.nameEn}</span>
                <span className="text-[11px] font-medium leading-none text-gray-600">{p.nameAr}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pillar Showcase Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-12 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left/Main Column: Overview & Capabilities */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-accent-red/10 text-accent-red text-xs font-bold rounded-full font-en">
                    {activePillar.nameEn} SYSTEM
                  </span>
                  <span className="text-xs text-gray-400">·</span>
                  <span className="text-xs text-gray-600 font-semibold">{activePillar.nameAr}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-950">
                  {activePillar.tagline}
                </h3>

                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {activePillar.description}
                </p>
              </div>

              {/* Target Problem */}
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                <span className="text-xs font-bold text-amber-900 block mb-1">المشكلة التي يحلها هذا النظام:</span>
                <p className="text-xs md:text-sm text-amber-950 font-medium">{activePillar.targetProblem}</p>
              </div>

              {/* 4 Capabilities Grid */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-gray-950">القدرات والحلول المضمنة داخل المنظومة:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activePillar.capabilities.map((cap, idx) => (
                    <div 
                      key={idx} 
                      className="p-5 bg-white rounded-2xl border border-gray-200/80 shadow-xs space-y-1.5"
                    >
                      <span className="text-xs font-bold text-accent-red block font-en">0{idx + 1}.</span>
                      <h5 className="text-sm font-bold text-gray-950">{cap.title}</h5>
                      <p className="text-xs text-gray-600 leading-relaxed">{cap.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right/Secondary Column: Tangible Outcomes & Direct Action */}
            <div className="lg:col-span-4 bg-white border border-gray-200 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-[11px] font-bold text-gray-400 block font-en uppercase tracking-wider">
                  BUSINESS OUTCOMES
                </span>
                <h4 className="text-base font-bold text-gray-950 mt-1">النتائج التشغيلية المتوقعة:</h4>
              </div>

              <div className="space-y-3">
                {activePillar.outcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed font-medium">{outcome}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-100 space-y-3">
                <button
                  type="button"
                  onClick={() => onStartDiagnostic(activePillar.id)}
                  className="w-full py-3.5 bg-accent-red hover:bg-accent-red-hover text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>شخّص مدى احتياجك لـ {activePillar.nameEn}</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onBookCall}
                  className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-semibold rounded-xl transition-all text-center cursor-pointer"
                >
                  حجز جلسة استراتيجية لمناقشة التنفيذ
                </button>
              </div>

              <div className="text-[10px] text-gray-400 text-center leading-normal">
                جميع الحلول مبرمجة ومعدة للتكامل مع نموذج عملك خلال 30 إلى 90 يوماً.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
