import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowLeft, Calendar, Sparkles } from 'lucide-react';
import { analytics } from '../services/analytics';

interface HeaderProps {
  onStartDiagnostic: () => void;
  onOpenConsultation: () => void;
  activeSection: string;
}

export default function Header({ onStartDiagnostic, onOpenConsultation, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'منظومة النمو', href: '#growth-system' },
    { label: 'أين يتعطل نموك؟', href: '#bottlenecks' },
    { label: 'القطاعات', href: '#sectors' },
    { label: 'دراسات الحالة', href: '#case-studies' },
    { label: 'بوابة السعودية', href: '#saudi-hub' },
    { label: 'آلية العمل', href: '#process' },
    { label: 'التدريب', href: '#training' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 85;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleDiagnosticClick = () => {
    setMobileMenuOpen(false);
    analytics.track('hero_diagnostic_click', { source: 'header_nav' });
    onStartDiagnostic();
  };

  const handleCallClick = () => {
    setMobileMenuOpen(false);
    analytics.track('strategy_call_opened', { source: 'header_nav' });
    onOpenConsultation();
  };

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/95 backdrop-blur-md border-b border-gray-150 shadow-xs'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo and Brand Identity */}
        <a href="#" id="header-logo-link" className="flex items-center gap-3 group relative">
          <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-105">
            <img
              src="/shavi-logo.png"
              alt="Shavi Agency Logo"
              className={`absolute inset-0 w-10 h-10 object-contain rounded-xl border border-gray-100 shadow-2xs transition-opacity duration-300 ${
                isScrolled ? 'opacity-100' : 'opacity-0'
              }`}
              referrerPolicy="no-referrer"
            />
            <img
              src="/shavi-logo-white.png"
              alt="Shavi Agency Logo"
              className={`absolute inset-0 w-10 h-10 object-contain rounded-xl drop-shadow-md transition-opacity duration-300 ${
                isScrolled ? 'opacity-0' : 'opacity-100'
              }`}
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col text-right">
            <span
              className={`font-bordeaux text-2xl font-normal tracking-wide flex items-center gap-1 select-none lowercase transition-colors duration-300 ${
                isScrolled ? 'text-gray-950' : 'text-white'
              }`}
            >
              shavi <span className="font-bordeaux font-normal text-xs tracking-wider uppercase text-accent-red">OS</span>
            </span>
            <span 
              className={`text-[9px] font-bold tracking-[0.12em] uppercase font-en transition-colors duration-300 ${
                isScrolled ? 'text-gray-400' : 'text-white/60'
              }`}
            >
              GROWTH SYSTEM
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav-menu" className="hidden xl:flex items-center gap-7">
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-[13px] font-medium transition-colors relative py-1 ${
                  isActive
                    ? 'text-accent-red font-bold'
                    : isScrolled
                      ? 'text-gray-700 hover:text-gray-950'
                      : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-red rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={handleCallClick}
            className={`text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer ${
              isScrolled 
                ? 'text-gray-700 hover:text-gray-950 hover:bg-gray-100' 
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            جلسة استراتيجية
          </button>

          <button
            type="button"
            onClick={handleDiagnosticClick}
            className="px-5 py-2.5 bg-accent-red hover:bg-accent-red-hover text-white text-xs font-bold rounded-xl shadow-md shadow-red-900/10 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ابدأ تشخيص النمو</span>
          </button>
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            type="button"
            onClick={handleDiagnosticClick}
            className="sm:hidden px-3 py-1.5 bg-accent-red text-white text-xs font-bold rounded-lg shadow-sm"
          >
            تشخيص النمو
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isScrolled
                ? 'border-gray-200 text-gray-800'
                : 'border-white/20 text-white'
            }`}
            aria-label="القائمة الرئيسية"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 px-6 py-6 space-y-4 shadow-xl text-right animate-fade-in">
          <nav className="space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block text-sm font-semibold text-gray-800 hover:text-accent-red py-1.5 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-gray-100 space-y-2">
            <button
              type="button"
              onClick={handleDiagnosticClick}
              className="w-full py-3 bg-accent-red text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>ابدأ تشخيص النمو مجاناً</span>
            </button>

            <button
              type="button"
              onClick={handleCallClick}
              className="w-full py-3 bg-gray-100 text-gray-900 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>حجز جلسة استراتيجية نمو</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
