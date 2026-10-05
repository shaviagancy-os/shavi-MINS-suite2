import React from 'react';
import { Mail, Phone, MapPin, Globe, Sparkles } from 'lucide-react';

interface FooterProps {
  onStartDiagnostic: () => void;
  onBookCall: () => void;
}

export default function Footer({ onStartDiagnostic, onBookCall }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white border-t border-white/10 pt-16 pb-10 text-right">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        
        {/* Brand Column (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src="/shavi-logo-white.png"
              alt="Shavi Agency Logo"
              className="w-10 h-10 object-contain rounded-xl border border-white/10"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col text-right">
              <span className="font-bordeaux text-2xl font-normal tracking-wide text-white lowercase">
                shavi <span className="font-bordeaux font-normal text-xs text-accent-red uppercase">OS</span>
              </span>
              <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase font-en">
                SMART GROWTH SOLUTIONS
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
            منظومة تشغيل متكاملة لنمو الأعمال تقدم حلولاً ذكية تربط بين التسويق الرقمي، تطوير العمليات، تحسين المبيعات، وأتمتة الأنظمة بالذكاء الاصطناعي، إلى جانب برامج تدريب احترافية.
          </p>

          <div className="text-[11px] text-gray-500 font-en">
            Future Without Limits... Shavi Is Always With You
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onStartDiagnostic}
              className="px-4 py-2 bg-accent-red hover:bg-accent-red-hover text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>فحص وتشخيص نمو شركتك</span>
            </button>
          </div>
        </div>

        {/* Growth System (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="font-bold text-xs text-white uppercase tracking-wider border-b border-white/10 pb-2">
            أركان منظومة النمو
          </h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li>
              <a href="#growth-system" className="hover:text-white transition-colors">
                ACQUIRE · الاستحواذ وجذب الفرص
              </a>
            </li>
            <li>
              <a href="#growth-system" className="hover:text-white transition-colors">
                CONVERT · تحويل الفرص إلى مبيعات (CRO)
              </a>
            </li>
            <li>
              <a href="#growth-system" className="hover:text-white transition-colors">
                AUTOMATE · أتمتة التشغيل والـ CRM
              </a>
            </li>
            <li>
              <a href="#growth-system" className="hover:text-white transition-colors">
                SCALE · استراتيجية التوسع والنمو
              </a>
            </li>
            <li>
              <a href="#training" className="hover:text-white transition-colors">
                ENABLE · التدريب والتمكين المؤسسي
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Pathways (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-bold text-xs text-white uppercase tracking-wider border-b border-white/10 pb-2">
            مسارات سريعة
          </h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li>
              <a href="#bottlenecks" className="hover:text-white transition-colors">
                أين يتعطل نموك؟
              </a>
            </li>
            <li>
              <a href="#sectors" className="hover:text-white transition-colors">
                حلول القطاعات
              </a>
            </li>
            <li>
              <a href="#case-studies" className="hover:text-white transition-colors">
                دراسات الحالة
              </a>
            </li>
            <li>
              <a href="#saudi-hub" className="hover:text-white transition-colors">
                بوابة نمو السعودية
              </a>
            </li>
            <li>
              <a href="#simulator" className="hover:text-white transition-colors">
                محاكي سيناريو النمو
              </a>
            </li>
            <li>
              <a href="#process" className="hover:text-white transition-colors">
                آلية العمل (Our Process)
              </a>
            </li>
          </ul>
        </div>

        {/* Contact info (3 cols) */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="font-bold text-xs text-white uppercase tracking-wider border-b border-white/10 pb-2">
            بيانات الاتصال الرسمية
          </h4>
          <ul className="space-y-2.5 text-xs text-gray-300">
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-accent-red flex-shrink-0" />
              <a href="mailto:info@shaviagency.me" className="font-en hover:text-white transition-colors">
                info@shaviagency.me
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-accent-red flex-shrink-0" />
              <a href="https://wa.me/201115042478" target="_blank" rel="noopener noreferrer" className="font-en hover:text-white transition-colors" dir="ltr">
                +20 111 504 24 78
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-accent-red flex-shrink-0" />
              <span className="font-en text-gray-400">@Shaviagency</span>
            </li>
            <li className="flex items-start gap-2 pt-1 text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0 mt-0.5" />
              <span>القاهرة، جمهورية مصر العربية · تغطية مخصصة للسوق السعودي ودول الخليج العربي</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
        <p>
          &copy; {currentYear} Shavi Agency (Smart Growth Solutions). جميع الحقوق محفوظة.
        </p>

        <div className="flex items-center gap-4 text-gray-400">
          <button 
            type="button" 
            onClick={onBookCall} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            حجز جلسة استراتيجية (30 دقيقة)
          </button>
          <span>·</span>
          <span>منظومة تشغيل متكاملة لنمو الأعمال</span>
        </div>
      </div>
    </footer>
  );
}
