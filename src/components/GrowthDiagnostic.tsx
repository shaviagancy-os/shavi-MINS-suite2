import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Phone, 
  Building, 
  User, 
  Calendar, 
  RotateCcw,
  ShieldCheck,
  TrendingUp,
  Bot,
  Megaphone,
  Check
} from 'lucide-react';
import { DiagnosticAnswers, DiagnosticResult } from '../types';
import { LeadService } from '../services/leadService';
import { analytics } from '../services/analytics';

interface GrowthDiagnosticProps {
  onStrategyCallRequest?: (answers?: Partial<DiagnosticAnswers>) => void;
  initialSector?: string;
  isEmbedded?: boolean;
}

export default function GrowthDiagnostic({ 
  onStrategyCallRequest, 
  initialSector = '',
  isEmbedded = true 
}: GrowthDiagnosticProps) {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<DiagnosticAnswers>({
    sector: initialSector || 'القطاع العقاري والاستثماري',
    companyStage: 'شركة متوسطة (6 - 25 موظف)',
    primaryAcquisitionSource: 'إعلانات ممولة (Meta, Google, TikTok)',
    monthlyLeadVolume: '50 - 200 فرصة شهرياً',
    coreBottleneck: 'تسريب الفرص وضعف تحويل المستفسرين لمبيعات',
    crmStatus: 'نعتمد على واتساب العادي والإكسل (بدون نظام مركزي)',
    ninetyDayGoal: 'مضاعفة الإيرادات وتحسين نسبة إغلاق الصفقات',
    contactName: '',
    companyName: '',
    phone: '',
    email: '',
  });

  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>('');

  const questions = [
    {
      title: 'ما هو مجال أو قطاع عمل شركتك؟',
      subtitle: 'يساعدنا في مقارنة نموذجك مع بروتوكولات النمو الخاصة بكل قطاع.',
      field: 'sector' as const,
      options: [
        'القطاع العقاري والاستثماري',
        'القطاع الطبي والعيادات التخصصية',
        'المتاجر الإلكترونية والتجارة الرقمية',
        'البرمجيات وتطبيقات الأعمال (SaaS)',
        'المؤسسات التعليمية والأكاديميات التدريبية',
        'الشركات الاستشارية والخدمات المهنية (B2B)',
        'قطاع آخر'
      ]
    },
    {
      title: 'ما هو حجم الشركة ومرحلتها التشغيلية الحالية؟',
      subtitle: 'لتحديد حجم البنية التحتية والمنظومة الأنسب لك.',
      field: 'companyStage' as const,
      options: [
        'مشروع ناشئ / فريق صغير (1 - 5 أفراد)',
        'شركة متوسطة في مرحلة التوسع (6 - 25 موظف)',
        'مؤسسة كبرى قائمة (+25 موظف وفروع متعددة)'
      ]
    },
    {
      title: 'من أين تأتي معظم الفرص والعملاء لشركتك حالياً؟',
      subtitle: 'لفهم قناة الاستحواذ الرئيسية لديك ونقاط قوتها.',
      field: 'primaryAcquisitionSource' as const,
      options: [
        'إعلانات ممولة (Meta, Google, TikTok)',
        'صناعة المحتوى وشبكات التواصل العضوي',
        'التوصيات والعلاقات الشخصية (Word of Mouth)',
        'فريق مبيعات خارجية واتصالات مباشرة (Outbound)'
      ]
    },
    {
      title: 'كم عدد العملاء المحتملين (Leads) أو الاستفسارات التي تستقبلها شهرياً؟',
      subtitle: 'حجم التدفق يحدد ما إذا كانت الفجوة في الاستحواذ أو التحويل.',
      field: 'monthlyLeadVolume' as const,
      options: [
        'أقل من 50 فرصة شهرياً (بحاجة لزيادة الوصول)',
        '50 - 200 فرصة شهرياً (تدفق متوسط بحاجة لحماية)',
        '200 - 1000 فرصة شهرياً (تدفق كبير يضيع منه الكثير)',
        'أكثر من 1000 فرصة شهرياً (بحاجة لأتمتة فورية)'
      ]
    },
    {
      title: 'بصراحة وشفافية: أين يتعطل نمو شركتك أو تضيع الميزانية؟',
      subtitle: 'هذه هي النقطة المحورية التي سنبني عليها تشخيصك وتوصياتنا.',
      field: 'coreBottleneck' as const,
      options: [
        'ضعف جودة الوصول: الإعلانات تأتي بأشخاص غير جادين بتكلفة مرتفعة',
        'تسريب الفرص: استفسارات كثيرة لكن المبيعات ضعيفة ونسبة الإغلاق منخفضة',
        'إرهاق التشغيل: بطء الرد والمهام اليدوية المكررة تضيع الصفقات الساخنة',
        'سقف النمو: صعوبة التوسع وزيادة المبيعات دون مضاعفة التكاليف الثابتة'
      ]
    },
    {
      title: 'ما هي حالة أنظمة الـ CRM والأتمتة في شركتك حالياً؟',
      subtitle: 'هل يتم تسجيل كل عميل ومتابعته آلياً أم يدوياً؟',
      field: 'crmStatus' as const,
      options: [
        'نعتمد على واتساب العادي والإكسل (بدون نظام مركزي)',
        'نمتلك CRM لكنه غير مفعل ولا يرتبط بالإعلانات بشكل آلي',
        'لدينا أدوات متعددة مشتتة لا تعمل كمنظومة واحدة متكاملة',
        'نبحث عن نظام تشغيل متكامل يربط واتساب بالـ CRM تلقائياً'
      ]
    },
    {
      title: 'ما هو هدف النمو الأساسي لشركتك خلال الـ 90 يوماً القادمة؟',
      subtitle: 'النتيجة العملية التي تود تحقيقها أولاً مع شريك النمو.',
      field: 'ninetyDayGoal' as const,
      options: [
        'مضاعفة الإيرادات وتحسين نسبة إغلاق الصفقات',
        'تقليص هدر ميزانية الإعلانات وجلب عملاء ذوي ميزانيات مؤهلة',
        'أتمتة التشغيل وتقليص زمن الرد على العميل لأقل من دقيقة',
        'التوسع واختراق أسواق جديدة (مثل السوق السعودي والخليجي)'
      ]
    }
  ];

  const currentQ = questions[step];
  const isQuestionPhase = step < questions.length;
  const isContactPhase = step === questions.length;
  const isResultPhase = step > questions.length && result !== null;

  const handleOptionSelect = (value: string) => {
    if (!currentQ) return;
    const field = currentQ.field;
    setAnswers(prev => ({ ...prev, [field]: value }));
    setValidationError('');

    analytics.track('diagnostic_step', {
      stepIndex: step,
      question: currentQ.title,
      selectedAnswer: value
    });

    if (step < questions.length - 1) {
      setStep(prev => prev + 1);
    } else {
      setStep(questions.length); // Move to contact phase
    }
  };

  const handleNextClick = () => {
    if (step < questions.length - 1) {
      setStep(prev => prev + 1);
    } else {
      setStep(questions.length);
    }
  };

  const handlePrevClick = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
      setValidationError('');
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answers.contactName.trim() || !answers.companyName.trim() || !answers.phone.trim()) {
      setValidationError('يرجى كتابة الاسم، اسم الشركة، ورقم الواتساب للتواصل.');
      return;
    }

    setIsSubmitting(true);
    setValidationError('');

    // Generate calculated diagnostic result
    const diagnosticOutput = LeadService.generateDiagnosticResult(answers);
    setResult(diagnosticOutput);

    // Save lead into CRM cache
    LeadService.saveLead({
      name: answers.contactName,
      company: answers.companyName,
      phone: answers.phone,
      email: answers.email,
      sector: answers.sector,
      bottleneck: answers.coreBottleneck,
      leadScore: diagnosticOutput.leadScore,
      leadTier: diagnosticOutput.leadTier,
      source: 'Growth Diagnostic Engine',
      diagnosticAnswers: answers,
    });

    analytics.track('diagnostic_complete', {
      company: answers.companyName,
      sector: answers.sector,
      bottleneck: diagnosticOutput.bottleneckTitle,
      leadTier: diagnosticOutput.leadTier,
      leadScore: diagnosticOutput.leadScore
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setStep(questions.length + 1); // Move to Results Phase
    }, 600);
  };

  const handleBookCall = () => {
    analytics.track('strategy_call_opened', {
      source: 'diagnostic_result',
      company: answers.companyName,
      sector: answers.sector
    });

    if (onStrategyCallRequest) {
      onStrategyCallRequest(answers);
    } else {
      // Direct WhatsApp handoff as fallback
      const waUrl = LeadService.generateWhatsAppUrl({
        name: answers.contactName,
        company: answers.companyName,
        phone: answers.phone,
        sector: answers.sector,
        bottleneck: answers.coreBottleneck,
        recommendedSystem: result?.recommendedSystem,
        intentType: 'strategy_call'
      });
      window.open(waUrl, '_blank');
    }
  };

  const handleDirectWhatsApp = () => {
    analytics.track('whatsapp_initiated', {
      source: 'diagnostic_result',
      company: answers.companyName,
      sector: answers.sector
    });

    const waUrl = LeadService.generateWhatsAppUrl({
      name: answers.contactName,
      company: answers.companyName,
      phone: answers.phone,
      sector: answers.sector,
      bottleneck: answers.coreBottleneck,
      recommendedSystem: result?.recommendedSystem,
      intentType: 'diagnostic'
    });
    window.open(waUrl, '_blank');
  };

  const handleReset = () => {
    setStep(0);
    setResult(null);
    setValidationError('');
  };

  const progressPercent = Math.min(100, Math.round(((step + 1) / (questions.length + 1)) * 100));

  return (
    <div 
      id="growth-diagnostic-tool" 
      className={`w-full bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 overflow-hidden text-right transition-all duration-300 ${
        isEmbedded ? 'max-w-4xl mx-auto my-8' : 'w-full'
      }`}
    >
      {/* Header Bar */}
      <div className="bg-gray-950 px-6 py-5 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 mb-1">
            <span className="text-accent-red font-bold">01.</span>
            <span>محرك فحص وتشخيص نمو الشركات</span>
            <span className="text-gray-500">·</span>
            <span className="font-en text-[11px] text-gray-400">GROWTH DIAGNOSTIC ENGINE</span>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-white">
            {isResultPhase 
              ? `تقرير تشخيص النمو المخصص لـ "${answers.companyName}"` 
              : 'اكتشف أين يتعطل نمو شركتك وما المنظومة المناسبة لعلاجه'}
          </h3>
        </div>

        {!isResultPhase && (
          <div className="flex items-center gap-3">
            <div className="text-left">
              <span className="text-[11px] text-gray-400 block font-en">
                خطوة {Math.min(step + 1, questions.length + 1)} من {questions.length + 1}
              </span>
              <span className="text-xs font-bold text-accent-red font-en">{progressPercent}% مكتمل</span>
            </div>
            <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent-red transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Body Area */}
      <div className="p-6 md:p-10">
        
        {/* PHASE 1: Questions */}
        {isQuestionPhase && currentQ && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold mb-2">
                <span>سؤال {step + 1}</span>
                <span>·</span>
                <span>تشخيص نموذج العمل</span>
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-gray-950 leading-relaxed">
                {currentQ.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {currentQ.subtitle}
              </p>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = answers[currentQ.field] === opt;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleOptionSelect(opt)}
                    className={`p-4 rounded-2xl text-right transition-all duration-200 border flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'border-accent-red bg-accent-red/5 text-gray-950 shadow-sm font-semibold'
                        : 'border-gray-150 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-800'
                    }`}
                  >
                    <span className="text-sm md:text-base leading-relaxed">{opt}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mr-3 ${
                      isSelected 
                        ? 'border-accent-red bg-accent-red text-white' 
                        : 'border-gray-300 bg-white'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Stepper Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={handlePrevClick}
                disabled={step === 0}
                className="px-4 py-2.5 text-xs font-semibold text-gray-500 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>السابق</span>
              </button>

              <button
                type="button"
                onClick={handleNextClick}
                className="px-6 py-2.5 bg-gray-950 hover:bg-accent-red text-white text-xs font-bold rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>متابعة</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* PHASE 2: Contact Form to Bind Profile */}
        {isContactPhase && (
          <form onSubmit={handleContactSubmit} className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-accent-red font-semibold mb-1">
                <span>الخطوة النهائية</span>
                <span>·</span>
                <span>ربط التقرير بشركتك</span>
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-gray-950">
                أين نرسل لك تقرير التشخيص وخطة النمو المقترحة؟
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                سنقوم بحساب مؤشرات شركتك وعرض التوصيات الفورية الآن على الشاشة، مع إمكانية مناقشتها مع مستشار النمو.
              </p>
            </div>

            {validationError && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">الاسم الكريم *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="مثال: أحمد عبد الله"
                    value={answers.contactName}
                    onChange={(e) => setAnswers(prev => ({ ...prev, contactName: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-950 focus:bg-white focus:outline-none focus:border-accent-red text-right transition-colors"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">اسم الشركة أو المشروع *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="مثال: شركة النخبة للتطوير"
                    value={answers.companyName}
                    onChange={(e) => setAnswers(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-950 focus:bg-white focus:outline-none focus:border-accent-red text-right transition-colors"
                  />
                  <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">رقم الواتساب الرسمي (مع مفتاح الدولة) *</label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    placeholder="مثال: 00966500000000 أو 00201115042478"
                    value={answers.phone}
                    onChange={(e) => setAnswers(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-950 focus:bg-white focus:outline-none focus:border-accent-red text-left font-en transition-colors"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-700 block">البريد الإلكتروني للعمل (اختياري)</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={answers.email}
                  onChange={(e) => setAnswers(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-950 focus:bg-white focus:outline-none focus:border-accent-red text-left font-en transition-colors"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrevClick}
                className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
              >
                السابق
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 bg-accent-red hover:bg-accent-red-hover text-white text-sm font-bold rounded-xl shadow-lg shadow-red-900/10 transition-all duration-200 flex items-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>جاري تحليل البيانات وحساب المؤشرات...</span>
                ) : (
                  <>
                    <span>توليد تقرير تشخيص النمو</span>
                    <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* PHASE 3: Tailored Diagnostic Report & Next Commercial Step */}
        {isResultPhase && result && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Top Status Card */}
            <div className="bg-gray-950 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden border border-white/5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>تم التحليل وتوثيق الفجوة التشغيلية لـ {answers.companyName}</span>
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-white">
                    الثغرة الرئيسية: {result.bottleneckTitle}
                  </h4>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-center">
                    <span className="text-[10px] text-gray-400 block">تصنيف أولوية النمو</span>
                    <span className="text-sm font-black text-emerald-400 font-en">{result.leadTier}</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-center">
                    <span className="text-[10px] text-gray-400 block">مؤشر الجاهزية</span>
                    <span className="text-sm font-black text-white font-en">{result.leadScore}/100</span>
                  </div>
                </div>
              </div>

              {/* Situation Narrative */}
              <div className="pt-5 space-y-4">
                <div>
                  <span className="text-xs font-bold text-accent-red block mb-1">1. تشخيص الوضع الحالي والفجوة:</span>
                  <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                    {result.situationAnalysis}
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl">
                  <span className="text-xs font-bold text-emerald-400 block mb-1">2. المنظومة المقترحة من Shavi OS:</span>
                  <p className="text-sm font-semibold text-white">
                    {result.recommendedSystem}
                  </p>
                </div>
              </div>
            </div>

            {/* Actionable Priorities Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h5 className="text-base font-bold text-gray-950">
                  خطة العمل ذات الأولوية (أول 30 إلى 90 يوماً):
                </h5>
                <span className="text-xs text-gray-500 font-medium">مبنية على نموذج عمل {answers.sector}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {result.priorityActions.map((action, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-2xl bg-gray-50 border border-gray-150 flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-lg bg-accent-red/10 text-accent-red font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs md:text-sm text-gray-800 leading-relaxed font-medium">
                      {action}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Commercial CTAs */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8 space-y-5 text-center">
              <div>
                <h5 className="text-lg md:text-xl font-bold text-gray-950 mb-1">
                  ما هي الخطوة التالية لتحويل هذا التقرير إلى نتائج عملية؟
                </h5>
                <p className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  احجز جلسة استراتيجية مجانية مدتها 30 دقيقة مع مستشار النمو في Shavi لمراجعة هذه الأولويات، وتحديد العائد التقديري، ومعرفة آلية ربط المنظومة مع فريقك.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={handleBookCall}
                  className="w-full sm:w-auto px-8 py-3.5 bg-accent-red hover:bg-accent-red-hover text-white text-sm font-bold rounded-xl shadow-lg shadow-red-900/15 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>احجز جلسة استراتيجية النمو (30 دقيقة مجاناً)</span>
                </button>

                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-gray-100 border border-gray-300 text-gray-900 text-sm font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>إرسال التقرير ومناقشته عبر واتساب</span>
                </button>
              </div>

              <div className="pt-3 border-t border-gray-200 flex items-center justify-center gap-4 text-xs text-gray-500">
                <button
                  type="button"
                  onClick={handleReset}
                  className="hover:text-gray-950 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>بدء تشخيص لشركة أو قطاع آخر</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
