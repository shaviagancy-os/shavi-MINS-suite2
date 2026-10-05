import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  PhoneCall, 
  Layers,
  ChevronRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { saudiHubData } from '../data';
import { analytics } from '../services/analytics';

interface SaudiHubSectionProps {
  onStartDiagnostic: (sector?: string) => void;
  onBookCall: () => void;
}

export default function SaudiHubSection({ onStartDiagnostic, onBookCall }: SaudiHubSectionProps) {
  const [selectedSaudiSector, setSelectedSaudiSector] = useState<string>(saudiHubData.sectors[0].id);

  const activeSector = saudiHubData.sectors.find(s => s.id === selectedSaudiSector) || saudiHubData.sectors[0];

  const handleSelectSector = (id: string, title: string) => {
    setSelectedSaudiSector(id);
    analytics.track('saudi_sector_selected', {
      sectorId: id,
      title
    });
  };

  return (
    <section id="saudi-hub" className="py-24 bg-gray-950 text-white text-right relative overflow-hidden border-t border-white/5">
      {/* Background Subtle Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-red">
            <span>06.</span>
            <span>بوابة التوسع والنمو في المملكة</span>
            <span className="text-gray-600">·</span>
            <span className="font-en text-[11px] text-gray-400 uppercase tracking-wider">SAUDI ARABIA GROWTH GATEWAY</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {saudiHubData.title}
          </h2>

          <p className="text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {saudiHubData.subtitle}
          </p>

          {/* Cities Tags */}
          <div className="flex items-center justify-center gap-2 pt-2 text-xs text-gray-400">
            <span>تغطية متكاملة لمدن:</span>
            {saudiHubData.cities.map((city, idx) => (
              <span key={idx} className="flex items-center gap-1">
                <span className="text-white font-medium">{city}</span>
                {idx < saudiHubData.cities.length - 1 && <span className="text-gray-600">·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Sectors Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sectors Selection (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold text-gray-400 block px-2">اختر قطاع عملك في السوق السعودي:</span>
            
            {saudiHubData.sectors.map((s) => {
              const isSelected = selectedSaudiSector === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectSector(s.id, s.title)}
                  className={`w-full p-4 rounded-2xl text-right transition-all flex items-center justify-between border cursor-pointer ${
                    isSelected
                      ? 'bg-white/10 border-accent-red text-white shadow-lg shadow-red-950/30 font-bold'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/20 text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="text-sm">{s.title}</span>
                  <ChevronRight className={`w-4 h-4 transform transition-transform ${isSelected ? 'text-accent-red -rotate-180' : 'text-gray-600'}`} />
                </button>
              );
            })}

            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl text-xs text-gray-400 space-y-2 mt-4">
              <span className="text-accent-red font-bold block">✓ توافق كامل مع الأنظمة الرسمية:</span>
              <p className="text-[11px] leading-relaxed">
                أنظمتنا تدعم التكامل مع منصات سلة (Salla) وزد (Zid)، وربط واتساب Cloud API الرسمي المعتمد، وبوابات الدفع الإلكترونية الخليجية.
              </p>
            </div>
          </div>

          {/* Active Sector Detailed Blueprint (8 cols) */}
          <div className="lg:col-span-8 bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10 space-y-6">
            <div className="border-b border-white/10 pb-5">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>بروتوكول تشغيل جاهز ومخصص لبيئة الأعمال السعودية</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {activeSector.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl space-y-1.5">
                <span className="text-xs font-bold text-red-400 block">عقبة النمو الشائعة في هذا القطاع:</span>
                <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-medium">
                  {activeSector.pain}
                </p>
              </div>

              <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl space-y-1.5">
                <span className="text-xs font-bold text-emerald-400 block">حل ومنظومة Shavi المقترحة:</span>
                <p className="text-xs md:text-sm text-gray-100 leading-relaxed font-medium">
                  {activeSector.shaviSolution}
                </p>
              </div>
            </div>

            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-accent-red block">الأثر التشغيلي المستهدف:</span>
                <p className="text-sm font-semibold text-white mt-0.5">{activeSector.impact}</p>
              </div>
              <div className="hidden sm:block text-2xl font-en font-black text-gray-500">2030</div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-4">
              <button
                type="button"
                onClick={() => onStartDiagnostic(activeSector.title)}
                className="w-full sm:flex-1 py-3.5 bg-accent-red hover:bg-accent-red-hover text-white text-xs font-bold rounded-xl shadow-lg shadow-red-950/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>تشخيص احتياجات شركتك في السوق السعودي</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onBookCall}
                className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/15 transition-all text-center cursor-pointer"
              >
                احجز جلسة استراتيجية للمملكة
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
