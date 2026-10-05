import React, { useState, useEffect } from 'react';
import { Calculator, Sparkles, ArrowUpRight, TrendingUp, HelpCircle, CheckCircle, Percent } from 'lucide-react';

export default function ROICalculator() {
  const [visitors, setVisitors] = useState<number>(10000);
  const [conversionRate, setConversionRate] = useState<number>(1.5);
  const [ticketSize, setTicketSize] = useState<number>(1200);

  // Computed Values
  const [currentRevenue, setCurrentRevenue] = useState<number>(0);
  const [optimizedRate, setOptimizedRate] = useState<number>(0);
  const [optimizedRevenue, setOptimizedRevenue] = useState<number>(0);
  const [revenueIncrease, setRevenueIncrease] = useState<number>(0);
  const [annualGrowth, setAnnualGrowth] = useState<number>(0);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Current Monthly revenue
    const currentRev = Math.round(visitors * (conversionRate / 100) * ticketSize);
    setCurrentRevenue(currentRev);

    // Optimized Conversion Rate with Shavi OS CRO & AI Automation
    // E.g., Typically multiplies conversion rate by ~1.8 to 2.5 times, up to a max logical cap of 12%
    let optRate = conversionRate * 1.9 + 0.8;
    if (optRate > 12) optRate = 12;
    optRate = parseFloat(optRate.toFixed(2));
    setOptimizedRate(optRate);

    // Optimized revenue
    const optRev = Math.round(visitors * (optRate / 100) * ticketSize);
    setOptimizedRevenue(optRev);

    // net increase
    const diff = optRev - currentRev;
    setRevenueIncrease(diff);

    // annual projection
    setAnnualGrowth(diff * 12);
  }, [visitors, conversionRate, ticketSize]);

  if (isInitializing) {
    return (
      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-100/40 text-right space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="border-b border-gray-50 pb-5 space-y-3">
          <div className="flex items-center gap-2 justify-end">
            <div className="h-4 w-40 bg-gray-100 rounded-md" />
            <div className="h-4 w-4 bg-gray-100 rounded-full" />
          </div>
          <div className="h-7 w-3/4 bg-gray-200 rounded-lg ml-auto" />
          <div className="h-4 w-11/12 bg-gray-150 rounded-md ml-auto" />
        </div>
        
        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sliders Skeleton */}
          <div className="lg:col-span-5 space-y-6">
            <div className="h-5 w-44 bg-gray-200 rounded-md ml-auto" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2 border border-gray-50 p-4 rounded-2xl">
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-12 bg-gray-200 rounded" />
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full mt-2" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Results Skeleton */}
          <div className="lg:col-span-7 bg-gray-50/50 border border-gray-50 rounded-3xl p-6 space-y-6">
            <div className="h-5 w-36 bg-gray-200 rounded-md ml-auto" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white border border-gray-100 p-4 rounded-2xl space-y-2">
                  <div className="h-3 w-20 bg-gray-100 rounded ml-auto" />
                  <div className="h-6 w-28 bg-gray-200 rounded ml-auto" />
                </div>
              ))}
            </div>
            
            <div className="bg-accent-red/5 border border-accent-red/10 p-5 rounded-2xl flex justify-between items-center">
              <div className="h-10 w-24 bg-accent-red/20 rounded-full" />
              <div className="space-y-2 text-right">
                <div className="h-3 w-32 bg-gray-200 rounded ml-auto" />
                <div className="h-6 w-40 bg-gray-300 rounded ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-100/40 text-right space-y-8">
      {/* Tool Intro */}
      <div className="border-b border-gray-50 pb-5">
        <div className="flex items-center gap-2 text-accent-red font-bold text-xs uppercase tracking-wider mb-1">
          <Sparkles className="w-4 h-4 animate-pulse-slow" />
          <span>SHAVI OS GROWTH SIMULATOR</span>
        </div>
        <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900">
          حاسبة العائد التفاعلية ومحاكي النمو الاستراتيجي
        </h3>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
          قم بتحريك المؤشرات أدناه بناءً على أرقام مشروعك الحالية، لترى التغيير الفوري الذي يحدثه تحسين واجهات الاستخدام (CRO) وتكامل الأتمتة والذكاء الاصطناعي مع Shavi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Input (Left side on desktop - 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <h4 className="font-bold text-sm text-gray-800 border-r-2 border-accent-red pr-2.5 mb-4">
            المدخلات الحالية لشركتك
          </h4>

          {/* Visitors Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-gray-400 font-en font-medium">
                {visitors.toLocaleString()} زائر
              </span>
              <span className="text-gray-700">عدد زوار موقعك / منصاتك شهرياً</span>
            </div>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={visitors}
              onChange={(e) => setVisitors(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-accent-red"
            />
            <div className="flex justify-between text-[10px] text-gray-300 font-en">
              <span>100K</span>
              <span>50K</span>
              <span>1K</span>
            </div>
          </div>

          {/* Current Conversion Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-gray-400 font-en font-medium">
                {conversionRate}%
              </span>
              <span className="text-gray-700">معدل التحويل الحالي (Conversion Rate)</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={conversionRate}
              onChange={(e) => setConversionRate(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-accent-red"
            />
            <div className="flex justify-between text-[10px] text-gray-300 font-en">
              <span>5%</span>
              <span>2.5%</span>
              <span>0.1%</span>
            </div>
          </div>

          {/* Ticket Size / Average Order Value */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-gray-400 font-en font-medium">
                {ticketSize.toLocaleString()} EGP
              </span>
              <span className="text-gray-700">متوسط قيمة الصفقة أو الطلب الواحد</span>
            </div>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={ticketSize}
              onChange={(e) => setTicketSize(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-accent-red"
            />
            <div className="flex justify-between text-[10px] text-gray-300 font-en">
              <span>10K</span>
              <span>5K</span>
              <span>100</span>
            </div>
          </div>
        </div>

        {/* Outputs (Right side on desktop - 7 cols) */}
        <div className="lg:col-span-7 bg-gray-50/50 border border-gray-100 rounded-2xl p-6 space-y-6">
          <h4 className="font-bold text-sm text-gray-800 border-r-2 border-green-500 pr-2.5">
            التحليلات والمقارنة الفورية
          </h4>

          {/* Rate Comparison Pills */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
              <span className="text-[10px] text-gray-400 block mb-1">معدل التحويل الحالي</span>
              <span className="text-lg font-bold text-gray-600 font-en">{conversionRate}%</span>
            </div>
            <div className="bg-green-50/30 border border-green-100/50 rounded-xl p-4 text-center relative overflow-hidden">
              <span className="text-[10px] text-green-600 font-bold block mb-1 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 animate-pulse" />
                تحسين Shavi المتوقع
              </span>
              <span className="text-lg font-black text-green-600 font-en">{optimizedRate}%</span>
            </div>
          </div>

          {/* Revenue Comparison Card */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex justify-between items-center text-xs text-gray-400 pb-3 border-b border-gray-50">
              <span className="font-en">COMPUTED MONTHLY REVENUE</span>
              <span>الإيرادات الشهرية المقارنة</span>
            </div>
            
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-sm">
                <span className="font-en font-medium text-gray-500">{currentRevenue.toLocaleString()} EGP</span>
                <span className="text-gray-500">الوضع الحالي المتوقع:</span>
              </div>
              <div className="flex justify-between items-center text-base font-bold text-green-600">
                <span className="font-en text-lg">{optimizedRevenue.toLocaleString()} EGP</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4.5 h-4.5 text-green-500" />
                  الوضع بعد تفعيل Shavi OS:
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic Growth Callouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-l from-gray-900 to-gray-800 text-white rounded-xl p-4">
              <span className="text-[10px] text-gray-400 block mb-1">الزيادة الصافية المتوقعة شهرياً</span>
              <span className="text-xl font-black font-en text-accent-red block">
                +{revenueIncrease.toLocaleString()} EGP
              </span>
            </div>
            <div className="bg-accent-red text-white rounded-xl p-4 shadow-lg shadow-red-500/15">
              <span className="text-[10px] text-red-100 block mb-1">النمو الإضافي المتراكم سنوياً</span>
              <span className="text-xl font-black font-en block">
                +{annualGrowth.toLocaleString()} EGP
              </span>
            </div>
          </div>

          {/* Strategic Insight */}
          <p className="text-[11px] text-gray-400 text-center leading-normal">
            * هذه المحاكاة مبنية على نسب تحويل حقيقية تم قياسها في دراسات حالة سابقة لشركائنا بعد تحسين صفحات الهبوط وتطبيق أنظمة الرد التلقائي وإعادة الاستهداف الفوري.
          </p>
        </div>
      </div>
    </div>
  );
}
