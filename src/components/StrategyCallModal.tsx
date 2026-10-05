import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Phone, 
  Building, 
  User, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  HelpCircle
} from 'lucide-react';
import { LeadService } from '../services/leadService';
import { analytics } from '../services/analytics';
import { DiagnosticAnswers } from '../types';

interface StrategyCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillAnswers?: Partial<DiagnosticAnswers>;
}

export default function StrategyCallModal({ isOpen, onClose, prefillAnswers }: StrategyCallModalProps) {
  const [formData, setFormData] = useState({
    name: prefillAnswers?.contactName || '',
    company: prefillAnswers?.companyName || '',
    phone: prefillAnswers?.phone || '',
    sector: prefillAnswers?.sector || 'القطاع العقاري والاستثماري',
    goal: prefillAnswers?.ninetyDayGoal || 'مضاعفة الإيرادات وتحسين نسبة التحويل',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.company.trim()) {
      alert('يرجى كتابة الاسم، اسم الشركة، ورقم الواتساب.');
      return;
    }

    setIsSubmitting(true);

    // Save lead via LeadService
    LeadService.saveLead({
      name: formData.name,
      company: formData.company,
      phone: formData.phone,
      sector: formData.sector,
      bottleneck: formData.goal,
      leadScore: 85,
      leadTier: 'HOT',
      source: 'Strategy Call Modal',
    });

    analytics.track('strategy_call_submitted', {
      company: formData.company,
      sector: formData.sector,
      phone: formData.phone
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 500);
  };

  const handleOpenWhatsApp = () => {
    const waUrl = LeadService.generateWhatsAppUrl({
      name: formData.name,
      company: formData.company,
      phone: formData.phone,
      sector: formData.sector,
      bottleneck: formData.goal,
      intentType: 'strategy_call'
    });
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs text-right animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gray-950 text-white px-6 py-5 flex items-center justify-between border-b border-white/10">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-accent-red font-bold mb-0.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>GROWTH STRATEGY SESSION</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              حجز جلسة استراتيجية نمو (30 دقيقة مجاناً)
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {isSuccess ? (
            <div className="space-y-6 text-center py-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold text-gray-950">
                  تم تسجيل طلب الجلسة بنجاح، يا {formData.name}!
                </h4>
                <p className="text-xs md:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  تم حفظ بيانات شركتك في سجل Shavi، وسيقوم مستشار النمو بالتواصل معك عبر الواتساب أو الهاتف لتأكيد الموعد المناسب.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-150 text-xs text-gray-700 text-right space-y-1">
                <span className="font-bold block text-gray-950">ملخص الحجز:</span>
                <div>الشركة: {formData.company} ({formData.sector})</div>
                <div>رقم التواصل: {formData.phone}</div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>تأكيد موعد الجلسة فوراً عبر واتساب</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-gray-500 hover:text-gray-900 cursor-pointer"
                >
                  إغلاق هذه النافذة
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-3.5 rounded-xl border border-gray-150">
                جلسة استشارية متخصصة ومجانية بالكامل مع مهندس نمو؛ نقوم بمراجعة نموذج عملك، وتحديد أين يتسرب النمو، وبناء سيناريو الحل المناسب لك.
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">الاسم الكريم *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="مثال: م. أحمد عبد العزيز"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-950 focus:bg-white focus:outline-none focus:border-accent-red text-right"
                  />
                  <User className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">اسم الشركة أو المشروع *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="مثال: شركة التطوير الحديث"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-950 focus:bg-white focus:outline-none focus:border-accent-red text-right"
                  />
                  <Building className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">رقم الواتساب مع مفتاح الدولة *</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="00966500000000 أو 00201115042478"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-gray-950 focus:bg-white focus:outline-none focus:border-accent-red text-left font-en"
                  />
                  <Phone className="w-3.5 h-3.5 text-gray-400 absolute right-3.5 top-3" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 block">القطاع</label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData(prev => ({ ...prev, sector: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-gray-900 focus:bg-white focus:outline-none focus:border-accent-red text-right"
                >
                  <option value="القطاع العقاري والاستثماري">القطاع العقاري والاستثماري</option>
                  <option value="القطاع الطبي والعيادات التخصصية">القطاع الطبي والعيادات التخصصية</option>
                  <option value="المتاجر الإلكترونية والتجارة الرقمية">المتاجر الإلكترونية والتجارة الرقمية</option>
                  <option value="البرمجيات وتطبيقات الأعمال (SaaS)">البرمجيات وتطبيقات الأعمال (SaaS)</option>
                  <option value="المؤسسات التعليمية والأكاديميات">المؤسسات التعليمية والأكاديميات</option>
                  <option value="الشركات والخدمات المهنية (B2B)">الشركات والخدمات المهنية (B2B)</option>
                  <option value="قطاع آخر">قطاع آخر</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-accent-red hover:bg-accent-red-hover text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>جاري تأكيد الحجز...</span>
                  ) : (
                    <>
                      <span>تأكيد حجز الجلسة المجانية</span>
                      <ArrowLeft className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-[10px] text-gray-400 text-center">
                لا نبيع بياناتك لأي طرف خارجي. التواصل مخصص لترتيب الجلسة الاستشارية فقط.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
