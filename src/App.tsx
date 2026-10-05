import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  TrendingUp, 
  Cpu, 
  Stethoscope, 
  Home, 
  ShoppingCart, 
  GraduationCap, 
  Briefcase, 
  Phone, 
  ChevronDown, 
  ChevronUp,
  MapPin,
  Bot
} from 'lucide-react';

// Import Types & Data
import { Sector } from './types';
import { 
  sectorsData, 
  companyProcessSteps, 
  whyShaviBenefits, 
  faqData 
} from './data';
import { analytics } from './services/analytics';

// Sub-components
import Header from './components/Header';
import AnimatedCounter from './components/AnimatedCounter';
import ClientLogosMarquee from './components/ClientLogosMarquee';
import ProblemRecognition from './components/ProblemRecognition';
import GrowthSystemSection from './components/GrowthSystemSection';
import GrowthDiagnostic from './components/GrowthDiagnostic';
import CaseStudiesSection from './components/CaseStudiesSection';
import ScenarioSimulator from './components/ScenarioSimulator';
import SaudiHubSection from './components/SaudiHubSection';
import TrainingSection from './components/TrainingSection';
import StrategyCallModal from './components/StrategyCallModal';
import Footer from './components/Footer';

// Lazy loaded secondary components
const SectorModal = React.lazy(() => import('./components/SectorModal'));
const TeamSection = React.lazy(() => import('./components/TeamSection'));
const ShaviChatOS = React.lazy(() => import('./components/ShaviChatOS'));
const AIDiagnosticOS = React.lazy(() => import('./components/AIDiagnosticOS'));

export default function App() {
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isStrategyCallOpen, setIsStrategyCallOpen] = useState<boolean>(false);
  const [isDiagnosticModalOpen, setIsDiagnosticModalOpen] = useState<boolean>(false);
  const [diagnosticInitialSector, setDiagnosticInitialSector] = useState<string>('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showAiSimulator, setShowAiSimulator] = useState<boolean>(false);

  // Scroll section tracking for navigation highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home', 
        'bottlenecks', 
        'growth-system', 
        'growth-diagnostic', 
        'case-studies', 
        'sectors', 
        'simulator', 
        'saudi-hub', 
        'process', 
        'why-shavi', 
        'training', 
        'faq'
      ];
      const scrollPosition = window.scrollY + 130;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SEO & Truthful Schema.org Injection
  useEffect(() => {
    // 1. Meta Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Shavi Agency تبني منظومة نمو متكاملة تجمع بين التسويق الموجه، تحسين المبيعات، أتمتة العمليات والذكاء الاصطناعي لتحويل الفرص إلى نتائج قابلة للقياس.');
    }

    // 2. OpenGraph Protocol
    const ogTags = [
      { property: 'og:title', content: 'Shavi OS | منظومة تشغيل متكاملة لنمو الأعمال' },
      { property: 'og:description', content: 'نساعد الشركات على بناء منظومة نمو متكاملة تجمع بين التسويق، تحسين المبيعات، أتمتة العمليات والذكاء الاصطناعي.' },
      { property: 'og:image', content: '/shavi-logo.png' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'ar_AR' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Shavi OS | Integrated Growth Operating System' },
      { name: 'twitter:description', content: 'Shavi builds growth systems that turn attention and opportunities into measurable, predictable business growth.' },
      { name: 'twitter:image', content: '/shavi-logo.png' }
    ];

    ogTags.forEach(tag => {
      const selector = tag.property ? `meta[property="${tag.property}"]` : `meta[name="${tag.name}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (tag.property) el.setAttribute('property', tag.property);
        if (tag.name) el.setAttribute('name', tag.name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', tag.content);
    });

    // 3. Schema.org ProfessionalService structured data (truthful facts from Company Profile)
    const schemaId = 'shavi-structured-data-ld';
    let scriptEl = document.getElementById(schemaId) as HTMLScriptElement;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = schemaId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Shavi Agency | Smart Growth Solutions",
      "alternateName": "منظومة شافي لنظم النمو والأتمتة",
      "description": "منظومة تشغيل متكاملة لنمو الأعمال تقدم حلولاً ذكية تربط بين التسويق الرقمي، تطوير العمليات، تحسين المبيعات، وأتمتة الأنظمة بالذكاء الاصطناعي.",
      "url": window.location.href,
      "logo": window.location.origin + "/shavi-logo.png",
      "email": "info@shaviagency.me",
      "telephone": "+201115042478",
      "sameAs": [
        "https://www.facebook.com/shaviagency",
        "https://www.linkedin.com/company/shaviagency",
        "https://www.instagram.com/shaviagency"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "EG",
        "addressLocality": "Cairo",
        "streetAddress": "Cairo, Egypt"
      },
      "areaServed": [
        { "@type": "Country", "name": "Egypt" },
        { "@type": "Country", "name": "Saudi Arabia" },
        { "@type": "Country", "name": "United Arab Emirates" }
      ]
    };

    scriptEl.textContent = JSON.stringify(schemaData);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 85;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  const handleStartDiagnostic = (sector?: string) => {
    if (sector) {
      setDiagnosticInitialSector(sector);
    }
    scrollToSection('growth-diagnostic');
    analytics.track('diagnostic_start', { source: 'cta_button', sector });
  };

  const handleOpenStrategyModal = () => {
    setIsStrategyCallOpen(true);
    analytics.track('strategy_call_opened', { source: 'page_cta' });
  };

  const handleSectorCardClick = (sector: Sector) => {
    setSelectedSector(sector);
    analytics.track('industry_selected', { sectorId: sector.id, sectorName: sector.name });
  };

  const renderSectorIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-accent-red" };
    switch (iconName) {
      case 'Cpu': return <Cpu {...props} />;
      case 'Stethoscope': return <Stethoscope {...props} />;
      case 'Home': return <Home {...props} />;
      case 'ShoppingCart': return <ShoppingCart {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  return (
    <div className="min-h-screen text-right font-sans bg-white text-gray-900 selection:bg-accent-red/10 selection:text-accent-red antialiased">
      
      {/* Primary Fixed Navigation */}
      <Header 
        onStartDiagnostic={() => handleStartDiagnostic()}
        onOpenConsultation={handleOpenStrategyModal}
        activeSection={activeSection}
      />

      <main className="space-y-0">
        
        {/* ================= 1. HERO SECTION ================= */}
        <section 
          id="home"
          className="relative pt-32 md:pt-40 pb-20 md:pb-28 bg-[#070709] text-white overflow-hidden border-b border-white/5 isolate"
        >
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute inset-0 bg-radial-gradient from-accent-red/15 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-red-600/[0.08] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-red-600/[0.05] rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
            
            {/* Slogan from Company Profile */}
            <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold text-gray-300 mb-6 bg-white/[0.04] border border-white/10 px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-accent-red" />
              <span>مستقبل بلا حدود... Shavi معاك دايماً</span>
              <span className="text-gray-500">·</span>
              <span className="font-en text-[11px] text-gray-400">Smart Growth Solutions</span>
            </div>

            {/* Core Headline (P0 Positioning) */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.2] max-w-4xl mb-6">
              حوّل النمو من مجهود متقطع <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-accent-red to-red-500">
                إلى نظام تشغيل يشتغل معاك
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10">
              نساعد الشركات الطموحة على بناء منظومة نمو متكاملة تجمع بين التسويق، تحسين المبيعات، أتمتة العمليات والذكاء الاصطناعي لتحويل الفرص إلى نتائج قابلة للقياس.
            </p>

            {/* Dominant Primary Conversion CTA + Secondary Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
              <button
                type="button"
                onClick={() => handleStartDiagnostic()}
                id="hero-primary-diagnostic-cta"
                className="w-full sm:w-auto px-8 py-4 bg-accent-red hover:bg-accent-red-hover text-white text-sm font-bold rounded-xl shadow-lg shadow-red-950/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>اكتشف أين يتعطل نمو شركتك (تشخيص فوري)</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('growth-system')}
                className="w-full sm:w-auto px-6 py-4 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-xl border border-white/15 transition-all text-center cursor-pointer"
              >
                شوف كيف تعمل المنظومة ←
              </button>
            </div>

            {/* Grounded Proof Strip from Company Profile */}
            <div className="w-full max-w-3xl pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <span className="text-2xl md:text-3xl font-black text-white font-en block">
                  <AnimatedCounter value={10} suffix="M+" />
                </span>
                <span className="text-xs text-gray-400">وصول حقيقي مستهدف</span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl md:text-3xl font-black text-white font-en block">
                  <AnimatedCounter value={200} suffix="M" prefix="+" />
                </span>
                <span className="text-xs text-gray-400">حجم السوق المستهدف</span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl md:text-3xl font-black text-emerald-400 font-en block">
                  <AnimatedCounter value={14} suffix="K+" />
                </span>
                <span className="text-xs text-gray-400">عملية أتمتة ناجحة</span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl md:text-3xl font-black text-accent-red font-en block">
                  <AnimatedCounter value={90} suffix=" يوماً" />
                </span>
                <span className="text-xs text-gray-400">لبناء المنظومة المستقرة</span>
              </div>
            </div>

          </div>
        </section>

        {/* ================= 2. VERIFIED CLIENT LOGOS MARQUEE ================= */}
        <section className="bg-white py-6 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 text-center mb-3">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider font-en">
              PARTNERS & ENTERPRISES SERVED ACROSS KEY SECTORS
            </span>
          </div>
          <ClientLogosMarquee />
        </section>

        {/* ================= 3. PROBLEM RECOGNITION (أين يتعطل نموك؟) ================= */}
        <ProblemRecognition 
          onSelectBottleneck={(bottleneckId) => {
            scrollToSection('growth-diagnostic');
          }}
        />

        {/* ================= 4. THE SHAVI GROWTH SYSTEM (5 Pillars) ================= */}
        <GrowthSystemSection 
          onStartDiagnostic={(pillarId) => handleStartDiagnostic(pillarId)}
          onBookCall={handleOpenStrategyModal}
        />

        {/* ================= 5. CENTRAL GROWTH DIAGNOSTIC ENGINE ================= */}
        <section id="growth-diagnostic" className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <GrowthDiagnostic 
              onStrategyCallRequest={(answers) => {
                setIsStrategyCallOpen(true);
              }}
              initialSector={diagnosticInitialSector}
              isEmbedded={true}
            />
          </div>
        </section>

        {/* ================= 6. AUTHENTIC CASE STUDIES ================= */}
        <CaseStudiesSection 
          onStartDiagnostic={() => handleStartDiagnostic()}
          onBookCall={handleOpenStrategyModal}
        />

        {/* ================= 7. SECTOR / INDUSTRY PATHWAYS ================= */}
        <section id="sectors" className="py-24 bg-white text-right border-t border-gray-150">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-red">
                <span>حلول مصممة لطبيعة مجالك</span>
                <span className="text-gray-300">·</span>
                <span className="font-en text-[11px] text-gray-500 uppercase tracking-wider">SECTOR SPECIALIZATION</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight">
                أنظمة نمو جاهزة لأهم القطاعات الحيوية
              </h2>

              <p className="text-base text-gray-600 leading-relaxed">
                لا نطبق قالباً واحداً على الجميع؛ لكل قطاع سلوك عملاء مختلف وتحديات تشغيلية خاصة. اختر قطاعك لاستعراض المنظومة المخصصة له:
              </p>
            </div>

            {/* Sectors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sectorsData.map((sector) => (
                <div
                  key={sector.id}
                  onClick={() => handleSectorCardClick(sector)}
                  className="p-7 rounded-3xl bg-gray-50 border border-gray-200 hover:border-accent-red/30 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-150 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {renderSectorIcon(sector.icon)}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-en block">
                        {sector.englishName}
                      </span>
                      <h3 className="text-lg font-bold text-gray-950 group-hover:text-accent-red transition-colors">
                        {sector.name}
                      </h3>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {sector.tagline}
                    </p>

                    <div className="p-3 bg-white rounded-xl border border-gray-150 text-[11px] text-gray-700 space-y-1">
                      <span className="font-bold text-accent-red block">الأثر التشغيلي المستهدف:</span>
                      <p>{sector.aiAutomation.impact}</p>
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-gray-150 flex items-center justify-between text-xs font-bold text-accent-red">
                    <span>استعراض حلول القطاع بالتفصيل</span>
                    <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-3px] transition-transform" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= 8. GROWTH SCENARIO SIMULATOR ================= */}
        <ScenarioSimulator 
          onStartDiagnostic={() => handleStartDiagnostic()}
          onBookCall={handleOpenStrategyModal}
        />

        {/* ================= 9. SAUDI ARABIA GROWTH GATEWAY ================= */}
        <SaudiHubSection 
          onStartDiagnostic={(sector) => handleStartDiagnostic(sector)}
          onBookCall={handleOpenStrategyModal}
        />

        {/* ================= 10. HOW WE WORK (Our Process from Company Profile) ================= */}
        <section id="process" className="py-24 bg-gray-50 border-t border-gray-200 text-right">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-red">
                <span>08.</span>
                <span>منهجية العمل المعتمدة</span>
                <span className="text-gray-300">·</span>
                <span className="font-en text-[11px] text-gray-500 uppercase tracking-wider">OUR 4-STEP PROCESS</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight">
                كيف نبني ونشغل منظومة النمو لشركتك؟
              </h2>

              <p className="text-base text-gray-600 leading-relaxed">
                منهجية واضحة وموثقة في ملف الشركة الرسمي؛ ننتقل بك خطوة بخطوة من التشخيص حتى الاستقرار والتوسع.
              </p>
            </div>

            {/* 4 Process Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {companyProcessSteps.map((step, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl p-7 border border-gray-200 hover:border-accent-red/30 transition-all flex flex-col justify-between shadow-2xs"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <span className="text-2xl font-black text-accent-red font-en">{step.number}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-en">{step.title}</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-950">
                      {step.titleAr}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= 11. WHY SHAVI (Benefits from Company Profile) ================= */}
        <section id="why-shavi" className="py-24 bg-white text-right border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-red">
                <span>09.</span>
                <span>لماذا يختارنا الشركاء؟</span>
                <span className="text-gray-300">·</span>
                <span className="font-en text-[11px] text-gray-500 uppercase tracking-wider">BENEFITS OF WORKING WITH US</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight">
                أربعة أسباب تجعل Shavi شريك نموك الأنسب
              </h2>

              <p className="text-base text-gray-600 leading-relaxed">
                لسنا مجرد مزود خدمة خارجي؛ نبني شراكات قائمة على الشفافية والنتائج الملموسة.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whyShaviBenefits.map((b, idx) => (
                <div 
                  key={idx}
                  className="p-8 rounded-3xl bg-gray-50 border border-gray-200 flex items-start gap-4 hover:border-accent-red/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-2xl bg-accent-red/10 text-accent-red font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                    {b.number}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-gray-950">{b.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= 12. TRAINING & ENABLEMENT PATHWAY ================= */}
        <TrainingSection onBookCall={handleOpenStrategyModal} />

        {/* ================= 13. MANAGEMENT & GROWTH TEAM ================= */}
        <section className="py-20 bg-white border-t border-gray-150">
          <div className="max-w-7xl mx-auto px-6">
            <React.Suspense fallback={<div className="h-40 animate-pulse bg-gray-100 rounded-3xl" />}>
              <TeamSection />
            </React.Suspense>
          </div>
        </section>

        {/* ================= 14. GROWTH AI SIMULATOR (Honest Interactive Experience) ================= */}
        <section className="py-20 bg-gray-950 text-white text-right border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6 space-y-8">
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-red">
                <Bot className="w-4 h-4" />
                <span>محاكي وكلاء وأنظمة الأتمتة</span>
                <span className="text-gray-600">·</span>
                <span className="font-en text-[11px] text-gray-400 uppercase tracking-wider">GROWTH AI SIMULATOR</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                جرّب كيف تعمل روبوتات الرد والتأهيل السريع
              </h2>

              <p className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto leading-relaxed">
                هذا المحاكي التفاعلي يوضح نموذج عمل شات بوتات الواتساب الرسمية (WhatsApp Cloud API) وتدفقات تأهيل الفرص التي نبرمجها لشركائنا.
              </p>

              <button
                type="button"
                onClick={() => setShowAiSimulator(!showAiSimulator)}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold rounded-xl transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>{showAiSimulator ? 'إخفاء واجهة المحاكي' : 'فتح واجهة المحاكي التفاعلي'}</span>
                {showAiSimulator ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {showAiSimulator && (
              <React.Suspense fallback={<div className="h-[500px] bg-white/5 rounded-3xl animate-pulse" />}>
                <div className="max-w-5xl mx-auto">
                  <ShaviChatOS />
                </div>
              </React.Suspense>
            )}
          </div>
        </section>

        {/* ================= 15. FAQ SECTION ================= */}
        <section id="faq" className="py-24 bg-gray-50 border-t border-gray-200 text-right">
          <div className="max-w-4xl mx-auto px-6 space-y-12">
            
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-red">
                <span>الأسئلة الشائعة</span>
                <span className="text-gray-300">·</span>
                <span className="font-en text-[11px] text-gray-500 uppercase tracking-wider">FAQ</span>
              </div>
              <h2 className="text-3xl font-extrabold text-gray-950">
                إجابات مباشرة على استفساراتك
              </h2>
            </div>

            <div className="space-y-3">
              {faqData.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-right font-bold text-sm md:text-base text-gray-950 flex items-center justify-between gap-4 cursor-pointer hover:text-accent-red transition-colors"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-accent-red flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ================= 16. FINAL HIGH-IMPACT CONVERSION CTA ================= */}
        <section className="py-24 bg-gray-950 text-white text-right relative overflow-hidden border-t border-white/10">
          <div className="absolute top-0 left-0 w-80 h-80 bg-accent-red/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6">
            <span className="inline-block px-3 py-1 bg-red-500/15 text-accent-red text-xs font-bold rounded-full font-en">
              NEXT STEP FOR YOUR BUSINESS
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              مستعد تعرف فين فرصة النمو الحقيقية في شركتك؟
            </h2>

            <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
              ابدأ بفحص سريع لنموذج عملك، واكتشف أين يتعطل النمو وما الذي يمكن تحسينه أولاً في أول 30 يوماً.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => handleStartDiagnostic()}
                className="w-full sm:w-auto px-8 py-4 bg-accent-red hover:bg-accent-red-hover text-white text-sm font-bold rounded-xl shadow-xl shadow-red-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>ابدأ تشخيص النمو (مجاناً في دقيقتين)</span>
              </button>

              <button
                type="button"
                onClick={handleOpenStrategyModal}
                className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl border border-white/15 transition-all text-center cursor-pointer"
              >
                تحدث مع مستشار النمو
              </button>
            </div>

            <div className="pt-4 text-xs text-gray-500">
              جلسة استراتيجية وتشخيص أولي مجاني ومخصص · بدون التزامات تعاقدية مسبقة
            </div>
          </div>
        </section>

      </main>

      {/* ================= 17. FOOTER ================= */}
      <Footer 
        onStartDiagnostic={() => handleStartDiagnostic()}
        onBookCall={handleOpenStrategyModal}
      />

      {/* ================= MODALS & OVERLAYS ================= */}
      {/* 1. Strategy Call Booking Modal */}
      <StrategyCallModal 
        isOpen={isStrategyCallOpen}
        onClose={() => setIsStrategyCallOpen(false)}
      />

      {/* 2. Interactive Diagnostic Pop-up (when opened from Header or quick links) */}
      {isDiagnosticModalOpen && (
        <React.Suspense fallback={null}>
          <AIDiagnosticOS 
            onClose={() => setIsDiagnosticModalOpen(false)}
            onStrategyCallRequest={(answers) => {
              setIsDiagnosticModalOpen(false);
              setIsStrategyCallOpen(true);
            }}
            initialSector={diagnosticInitialSector}
          />
        </React.Suspense>
      )}

      {/* 3. Deep Sector Details Modal */}
      {selectedSector && (
        <React.Suspense fallback={null}>
          <SectorModal 
            sector={selectedSector}
            onClose={() => setSelectedSector(null)}
          />
        </React.Suspense>
      )}

    </div>
  );
}
