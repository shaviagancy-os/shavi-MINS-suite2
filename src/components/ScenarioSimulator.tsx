import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Sparkles, 
  ArrowLeft, 
  HelpCircle, 
  TrendingUp, 
  AlertCircle,
  Sliders,
  Calendar
} from 'lucide-react';
import { analytics } from '../services/analytics';

interface ScenarioSimulatorProps {
  onStartDiagnostic: () => void;
  onBookCall: () => void;
}

export default function ScenarioSimulator({ onStartDiagnostic, onBookCall }: ScenarioSimulatorProps) {
  const [visitors, setVisitors] = useState<number>(8000);
  const [conversionRate, setConversionRate] = useState<number>(1.5);
  const [ticketSize, setTicketSize] = useState<number>(1200);

  // Computed Values
  const [currentCustomers, setCurrentCustomers] = useState<number>(0);
  const [currentRevenue, setCurrentRevenue] = useState<number>(0);
  
  const [scenarioRate, setScenarioRate] = useState<number>(0);
  const [scenarioCustomers, setScenarioCustomers] = useState<number>(0);
  const [scenarioRevenue, setScenarioRevenue] = useState<number>(0);
  const [revenueDifference, setRevenueDifference] = useState<number>(0);

  useEffect(() => {
    // Current state
    const curCust = Math.round(visitors * (conversionRate / 100));
    const curRev = Math.round(curCust * ticketSize);
    setCurrentCustomers(curCust);
    setCurrentRevenue(curRev);

    // Realistic Growth Scenario with Shavi OS CRO + Fast Response + Qualification
    // Multiplies conversion by ~1.6 - 2.0x, capped rationally at 8%
    let calculatedRate = conversionRate * 1.8 + 0.5;
    if (calculatedRate > 8.0) calculatedRate = 8.0;
    calculatedRate = parseFloat(calculatedRate.toFixed(2));
    setScenarioRate(calculatedRate);

    const scenCust = Math.round(visitors * (calculatedRate / 100));
    const scenRev = Math.round(scenCust * ticketSize);
    setScenarioCustomers(scenCust);
    setScenarioRevenue(scenRev);

    setRevenueDifference(scenRev - curRev);
  }, [visitors, conversionRate, ticketSize]);

  const handleSliderChange = () => {
    analytics.track('scenario_simulator_interacted', {
      visitors,
      conversionRate,
      ticketSize,
    });
  };

  return (
    <section id="simulator" className="py-24 bg-white text-right">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-accent-red">
            <span>05.</span>
            <span>نمذجة سيناريوهات التحسين</span>
            <span className="text-gray-300">·</span>
            <span className="font-en text-[11px] text-gray-500 uppercase tracking-wider">GROWTH SCENARIO SIMULATOR</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 tracking-tight">
            محاكي سيناريوهات النمو التقديري
          </h2>

          <p className="text-base text-gray-600 leading-relaxed">
            حرك المؤشرات لرؤية الأثر التقديري عند سد ثغرات تسريب العملاء وتحسين معدل التحويل (CRO) والأتمتة لنفس حجم الزوار الحالي دون مضاعفة ميزانية الإعلانات.
          </p>
        </div>

        {/* Interactive Simulator Container */}
        <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders Input Panel (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border-b border-gray-200 pb-3">
                <span className="text-xs font-bold text-gray-950 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-accent-red" />
                  <span>الفرضيات والبيانات المدخلة:</span>
                </span>
                <span className="text-[11px] text-gray-500">حرك المؤشرات لتطابق أرقام شركتك التقريبية</span>
              </div>

              {/* Slider 1: Monthly Visitors / Traffic */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-accent-red font-en text-sm">{visitors.toLocaleString()} زائر</span>
                  <span className="text-gray-700 font-medium">الزيارات / الفرص الشهرية:</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={visitors}
                  onChange={(e) => { setVisitors(parseInt(e.target.value)); handleSliderChange(); }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-red"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-en">
                  <span>1,000</span>
                  <span>50,000</span>
                </div>
              </div>

              {/* Slider 2: Conversion Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-accent-red font-en text-sm">{conversionRate}%</span>
                  <span className="text-gray-700 font-medium">معدل التحويل الحالي التقريبي:</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="4.0"
                  step="0.1"
                  value={conversionRate}
                  onChange={(e) => { setConversionRate(parseFloat(e.target.value)); handleSliderChange(); }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-red"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-en">
                  <span>0.5%</span>
                  <span>4.0%</span>
                </div>
              </div>

              {/* Slider 3: Ticket Size */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-accent-red font-en text-sm">{ticketSize.toLocaleString()} ج.م / ر.س</span>
                  <span className="text-gray-700 font-medium">متوسط قيمة الصفقة أو العميل:</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="10000"
                  step="200"
                  value={ticketSize}
                  onChange={(e) => { setTicketSize(parseInt(e.target.value)); handleSliderChange(); }}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent-red"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-en">
                  <span>200</span>
                  <span>10,000</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-gray-200 text-[11px] text-gray-500 leading-normal">
                💡 <span className="font-semibold text-gray-700">ملاحظة ذكية:</span> تحسين نسبة التحويل من 1.5% إلى 3% يضاعف المبيعات دون زيادة جنيه واحد في ميزانية إعلاناتك.
              </div>
            </div>

            {/* Results Panel (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200 p-6 md:p-8 space-y-6 shadow-xs">
              
              {/* Comparative Matrix */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Current Baseline */}
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-150 space-y-2">
                  <span className="text-[11px] font-bold text-gray-500 block">الوضع الحالي المتوقع:</span>
                  <div className="space-y-1">
                    <span className="text-lg font-black text-gray-900 font-en block">
                      {currentRevenue.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-600 block">
                      ~{currentCustomers.toLocaleString()} عميل شهرياً
                    </span>
                    <span className="text-[10px] text-gray-400 font-en block">
                      معدل تحويل: {conversionRate}%
                    </span>
                  </div>
                </div>

                {/* Shavi Scenario */}
                <div className="p-4 bg-accent-red/5 rounded-2xl border border-accent-red/20 space-y-2">
                  <span className="text-[11px] font-bold text-accent-red block">سيناريو منظومة Shavi:</span>
                  <div className="space-y-1">
                    <span className="text-lg font-black text-accent-red font-en block">
                      {scenarioRevenue.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-800 font-semibold block">
                      ~{scenarioCustomers.toLocaleString()} عميل شهرياً
                    </span>
                    <span className="text-[10px] text-accent-red font-en font-bold block">
                      سيناريو تحويل: {scenarioRate}%
                    </span>
                  </div>
                </div>

              </div>

              {/* Net Potential Difference */}
              <div className="p-5 bg-gray-950 text-white rounded-2xl text-center space-y-1 border border-white/5">
                <span className="text-xs text-gray-400 block">الفارق التقديري الإضافي شهرياً في المبيعات:</span>
                <span className="text-2xl md:text-3xl font-black text-emerald-400 font-en block">
                  +{revenueDifference.toLocaleString()} EGP / SAR
                </span>
                <span className="text-[11px] text-gray-400 block">
                  يعادل تقريباً +{(scenarioCustomers - currentCustomers).toLocaleString()} عميل إضافي من نفس زوارك الحاليين
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onStartDiagnostic}
                  className="w-full sm:flex-1 py-3 bg-accent-red hover:bg-accent-red-hover text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>شخّص أين يتسرب هذا الفارق في شركتك</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onBookCall}
                  className="w-full sm:w-auto px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl transition-all cursor-pointer text-center"
                >
                  حجز استشارة
                </button>
              </div>

              {/* Crucial Ethical Transparency Disclaimer */}
              <div className="pt-3 border-t border-gray-100 flex items-start gap-2 text-[10px] text-gray-500 leading-normal">
                <AlertCircle className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>إخلاء مسؤولية وشفافية تجارية:</strong> هذا النموذج هو سيناريو تقديري استرشادي مبني على الفرضيات المدخلة. النتائج الفعلية تتفاوت بحسب جودة العرض التجاري، طبيعة السوق، ميزانيات الحملات، كفاءة فريق المبيعات، ومعدل الطلب.
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
