import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, Sparkles, Send, ShieldCheck, Clock, Check, CheckCheck, 
  Cpu, Megaphone, TrendingUp, GraduationCap, Phone, User, Building,
  HelpCircle, ChevronLeft, Volume2, VolumeX, ArrowLeft, RotateCcw, Award
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  type?: 'text' | 'roi_calc' | 'sector_selector' | 'lead_form' | 'testimonials';
  sectorId?: string;
  isCustom?: boolean;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  arabicRole: string;
  avatar: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
  tagline: string;
  introMessages: string[];
}

export default function ShaviChatOS() {
  const [activeAgentId, setActiveAgentId] = useState<string>('ai_automation');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Mini ROI calculator state
  const [roiVisitors, setRoiVisitors] = useState<number>(10000);
  const [roiConversion, setRoiConversion] = useState<number>(1.5);
  const [roiTicket, setRoiTicket] = useState<number>(1000);

  // Lead Form inside chat state
  const [leadName, setLeadName] = useState<string>('');
  const [leadPhone, setLeadPhone] = useState<string>('');
  const [leadSector, setLeadSector] = useState<string>('real_estate');
  const [leadSubmitted, setLeadSubmitted] = useState<boolean>(false);

  // Sound Synthesizers using Web Audio API (No network requests required!)
  const playPopSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      const now = ctx.currentTime;
      // High sweet bubble sound
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(1300, now + 0.12);
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);
      
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {}
  };

  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'triangle';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.04);
      
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      
      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {}
  };

  const agents: Agent[] = [
    {
      id: 'ai_automation',
      name: 'م. أنس',
      role: 'AI Automation Architect',
      arabicRole: 'مهندس حلول وأتمتة الذكاء الاصطناعي',
      avatar: '🤖',
      color: 'bg-emerald-600 text-white',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
      icon: <Cpu className="w-5 h-5 text-emerald-600" />,
      tagline: 'روبوتات مبيعات ومتابعة ذكية 24/7 دون أي تسريب للعملاء.',
      introMessages: [
        'أهلاً بك! أنا المهندس أنس، مسؤول أتمتة الأنظمة في Shavi OS. 🤖',
        'مهمتي هي تحويل عملياتك التقليدية إلى "آلة أتمتة فائقة السرعة". نقوم بربط إعلاناتك وبوتات الواتساب مع CRM لترد على العملاء في أقل من 5 ثوانٍ طوال الـ 24 ساعة.',
        'كيف يمكنني مساعدتك اليوم؟ يمكنك اختيار أحد الخيارات السريعة بالأسفل أو سؤالي مباشرة.'
      ]
    },
    {
      id: 'marketing_growth',
      name: 'أ. أمجد',
      role: 'Growth Marketing Director',
      arabicRole: 'مستشار التسويق الرقمي الاستراتيجي',
      avatar: '📢',
      color: 'bg-rose-600 text-white',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/20',
      icon: <Megaphone className="w-5 h-5 text-rose-600" />,
      tagline: 'قنوات تسويق مخصصة تضمن تدفق مستمر للعملاء المهتمين بالفعل.',
      introMessages: [
        'مرحباً بك شريكنا العزيز! أنا أمجد، مستشار التسويق والنمو في Shavi. 📢',
        'هنا لا نطلق حملات إعلانية عشوائية. نحن نصمم "مسار استحواذ ذكي" (Acquisition Funnel) يستهدف أصحاب القرار الفعليين، ونقوم بتصفية العملاء مسبقاً لضمان وصول المهتمين فقط لمبيعاتك.',
        'ما هي التحديات التي تواجه حملاتك التسويقية الحالية؟ دعنا نتحدث عنها.'
      ]
    },
    {
      id: 'cro_ux',
      name: 'م. فارس',
      role: 'CRO & UX Analyst',
      arabicRole: 'محلل تحسين معدل التحويل وسلوك الزوار',
      avatar: '📈',
      color: 'bg-blue-600 text-white',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
      tagline: 'مضاعفة الإيرادات من نفس حجم الزوار الحالي دون تضخيم الإعلانات.',
      introMessages: [
        'أهلاً بك! أنا فارس، خبير تحسين معدلات التحويل CRO. 📈',
        'تخيل أنك تدفع مئات الدولارات للإعلانات، لكن موقعك يسرب 98% من الزوار! وظيفتي هي تشريح سلوك المستخدمين وعلاج نقاط التسريب لتشتري النسبة الأكبر من زوارك الحاليين.',
        'هل تريد حساب العائد المتوقع لشركتك عند تحسين معدل التحويل؟ اختر "احسب عائدي المتوقع" بالأسفل!'
      ]
    },
    {
      id: 'training_enablement',
      name: 'أ. سليم',
      role: 'Corporate Enablement Specialist',
      arabicRole: 'أخصائي التدريب والتمكين المؤسسي',
      avatar: '🎓',
      color: 'bg-violet-600 text-white',
      bgColor: 'bg-violet-500/10',
      borderColor: 'border-violet-500/20',
      icon: <GraduationCap className="w-5 h-5 text-violet-600" />,
      tagline: 'تأهيل فريقك الداخلي بالكامل لضمان استمرارية عجلة المبيعات ذاتياً.',
      introMessages: [
        'مرحباً بك! أنا الأستاذ سليم، مسؤول التمكين المؤسسي في Shavi. 🎓',
        'نحن في Shavi لا نبقيك معتمداً علينا كوكالة خارجية للأبد. دوري هو تدريب فريق المبيعات والتسويق الداخلي لديك على أحدث برمجيات الأتمتة والـ CRM لتتحكم في نموك ذاتياً وبأعلى كفاءة.',
        'هل تبحث عن بناء قوة تشغيلية داخلية قوية ومستقلة لمشروعك؟'
      ]
    }
  ];

  const timeoutsRef = useRef<any[]>([]);

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];
  };

  const currentAgent = agents.find(a => a.id === activeAgentId) || agents[0];

  // Initialize chat history for the active agent
  const initializeAgentChat = (agentId: string) => {
    clearAllTimeouts();
    const selectedAgent = agents.find(a => a.id === agentId) || agents[0];
    setIsTyping(true);
    setMessages([]);

    let delay = 300;
    selectedAgent.introMessages.forEach((msg, index) => {
      const timeoutId = setTimeout(() => {
        setMessages(prev => {
          if (prev.some(m => m.id === `${agentId}-intro-${index}`)) {
            return prev;
          }
          return [
            ...prev,
            {
              id: `${agentId}-intro-${index}`,
              sender: 'agent',
              text: msg,
              timestamp: getFormattedTime()
            }
          ];
        });
        playPopSound();
        if (index === selectedAgent.introMessages.length - 1) {
          setIsTyping(false);
        }
      }, delay);
      
      timeoutsRef.current.push(timeoutId);
      delay += 1200;
    });
  };

  useEffect(() => {
    initializeAgentChat(activeAgentId);
    return () => {
      clearAllTimeouts();
    };
  }, [activeAgentId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getFormattedTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'م' : 'ص';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleSendMessage = (text: string, customType?: Message['type']) => {
    if (!text.trim()) return;

    playClickSound();

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: getFormattedTime()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate Agent response based on content
    setTimeout(() => {
      let replyText = '';
      let replyType: Message['type'] = 'text';

      const query = text.toLowerCase();

      if (customType === 'roi_calc' || query.includes('roi') || query.includes('احسب') || query.includes('عائد') || query.includes('حاسبة')) {
        replyText = 'رائع! إليك واجهة محاكاة الأرقام التفاعلية مباشرة في محادثتنا. يمكنك تحريك القيم لرؤية الفارق الضخم في مبيعاتك الإضافية شهرياً وسنوياً مع نظام Shavi OS:';
        replyType = 'roi_calc';
      } else if (customType === 'sector_selector' || query.includes('قطاع') || query.includes('قطاعات') || query.includes('عقار') || query.includes('عيادة') || query.includes('طبي') || query.includes('saas') || query.includes('متجر')) {
        replyText = 'بالتأكيد! نظام Shavi OS مصمم بحلول متكاملة لقطاعات محددة. اختر قطاعك الآن من البطاقة التفاعلية التالية لنستعرض معاً ثغرات هذا القطاع والحلول الآلية الذكية:';
        replyType = 'sector_selector';
      } else if (customType === 'lead_form' || query.includes('احجز') || query.includes('جلسة') || query.includes('تواصل') || query.includes('استشارة') || query.includes('طلب')) {
        replyText = 'يسعدني جداً اهتمامك بالنمو الذكي! دعنا نرتب جلسة تشخيص مجانية مدتها 30 دقيقة مع مستشار النمو لمشروعك. يرجى كتابة بياناتك في الاستمارة التفاعلية أدناه:';
        replyType = 'lead_form';
      } else if (customType === 'testimonials' || query.includes('نجاح') || query.includes('أراء') || query.includes('آراء') || query.includes('عملاء') || query.includes('سابق')) {
        replyText = 'نحن نفتخر دائماً بشركاء نجاحنا. إليك مراجعات حقيقية وموثقة من رواد أعمال قاموا بتطبيق نظام Shavi OS في مشاريعهم وعياداتهم:';
        replyType = 'testimonials';
      } else {
        // Keyword Matcher for generic texts
        if (query.includes('سعر') || query.includes('بكم') || query.includes('تكلفة') || query.includes('سعركم')) {
          replyText = `تكلفة برنامج النمو الاستثنائي والتحول الكلي الممتد لـ 6 أشهر تبدأ من 6,000 جنيه مصري شهرياً، وتغطي كافة تفاصيل الأتمتة وصناعة المحتوى وإدارة الإعلانات وتأسيس الـ CRM وتأهيل فريقك. هل ترغب بحجز جلسة استشارة لتأكيد ملاءمة النظام لميزانيتك؟`;
        } else if (query.includes('أتمتة') || query.includes('ذكاء') || query.includes('بوت') || query.includes('واتساب') || query.includes('chat')) {
          replyText = `نظام الأتمتة لدينا يربط حساب WhatsApp Cloud API الرسمي بأنظمة CRM مثل Hubspot أو Sheet. يقوم المساعد الذكي بالرد على العملاء فوراً، ويحفظ بياناتهم، ويصنفهم كمشترين جادين أو باردين لتسليمهم للمبيعات في ثوانٍ!`;
        } else if (query.includes('تسويق') || query.includes('إعلان') || query.includes('حملات')) {
          replyText = `التسويق لدينا استراتيجي بالكامل. نركز على صناعة فيديوهات قصيرة Reels جاذبة ونطلق إعلانات مخصصة بهدف التصفية الصارمة (Qualification) لضمان ألا يستلم فريق مبيعاتك إلا عملاء مؤهلين مهتمين فعلاً بالدفع.`;
        } else if (query.includes('مبيعات') || query.includes('تطوير') || query.includes('نمو')) {
          replyText = `النمو يتحقق بربط المبيعات مع التسويق والأتمتة. نحن لا نتوقف عند توفير عملاء محتملين، بل نتدخل في أسلوب الرد الاستشاري لضمان إغلاق أكبر نسبة من الصفقات.`;
        } else {
          replyText = `سؤال رائع جداً! في Shavi OS، ندمج هذه الحلول بدقة متناهية لتلائم طبيعة شركتك وأهداف مبيعاتك. ما رأيك أن نقوم بجدولة جلسة استشارية مجانية مدتها 30 دقيقة لنناقش التفاصيل بدقة؟`;
        }
      }

      setMessages(prev => [
        ...prev,
        {
          id: `agent-reply-${Date.now()}`,
          sender: 'agent',
          text: replyText,
          type: replyType,
          timestamp: getFormattedTime()
        }
      ]);
      setIsTyping(false);
      playPopSound();
    }, 1200);
  };

  // Pre-defined Quick Action Click Handlers
  const handleQuickAction = (actionLabel: string, type: Message['type']) => {
    handleSendMessage(actionLabel, type);
  };

  // Helper inside ROI Card to compute numbers
  const currentRevenue = Math.round(roiVisitors * (roiConversion / 100) * roiTicket);
  // Optimized CRO + AI rate typically multiplies conversion rate by 1.8 to 2.2x
  const optimizedRate = Math.min(12, parseFloat((roiConversion * 1.9 + 0.8).toFixed(2)));
  const optimizedRevenue = Math.round(roiVisitors * (optimizedRate / 100) * roiTicket);
  const revenueIncrease = optimizedRevenue - currentRevenue;

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    playClickSound();

    // Deliver the lead to the team via WhatsApp
    const waText = `مرحباً Shavi Agency، أرغب في حجز جلسة تشخيص مجانية.\nالاسم: ${leadName}\nرقم الهاتف (واتساب): ${leadPhone}\nالقطاع: ${leadSector}`;
    window.open(`https://wa.me/201115042478?text=${encodeURIComponent(waText)}`, '_blank');

    setLeadSubmitted(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `lead-success-${Date.now()}`,
          sender: 'agent',
          text: `🎉 تم إرسال بياناتك بنجاح يا ${leadName}! تم توجيه طلبك مباشرةً إلى فريق النمو عبر الواتساب. سيتواصل معك مهندس النمو هاتفياً أو عبر الواتساب خلال دقائق لترتيب موعد الاستشخاص التشخيصية. نحن متحمسون للعمل معك!`,
          timestamp: getFormattedTime()
        }
      ]);
      playPopSound();
    }, 1000);
  };

  // Predefined Sector Solutions data
  const sectorSolutionsData = [
    {
      id: 'real_estate',
      name: 'القطاع العقاري',
      pain: 'عملاء غير مهتمين وتأخر فادح في زمن تواصل المبيعات مع العميل.',
      solution: 'مسار تصفية ذكي (Lead Quiz) لاستبعاد غير الجادين، وأتمتة واتساب لتوزيع البيانات فوراً خلال 5 ثوانٍ.',
      impact: 'زيادة سرعة الإغلاق بنسبة 300% وتوفير 60% من وقت الوسطاء.'
    },
    {
      id: 'medical',
      name: 'القطاع الطبي والعيادات',
      pain: 'ارتفاع نسبة تغيب الحالات وإلغاء المواعيد (No-Shows) وضعف المتابعة.',
      solution: 'مساعد ذكي للواتساب يعرض المواعيد المتاحة ويحجزها تلقائياً، مع رسائل تذكير تفاعلية مؤتمتة.',
      impact: 'تقليص نسبة إلغاء المواعيد بـ 85% وزيادة تكرار زيارات المرضى.'
    },
    {
      id: 'saas',
      name: 'البرمجيات والتطبيقات SaaS',
      pain: 'ارتفاع تكلفة الاستحواذ (CAC) وتسرب المستخدمين في التجربة المجانية.',
      solution: 'تدفق تهيئة تفاعلي (Onboarding Flows) يبرز قيمة البرنامج للمشترك فوراً لإتمام الاشتراك المدفوع.',
      impact: 'تقليل Churn بنسبة 35% ورفع نسبة الترقية للمدفوع.'
    },
    {
      id: 'e_commerce',
      name: 'المتاجر الإلكترونية',
      pain: 'السلات المتروكة (Abandoned Carts) وانخفاض تكرار شراء العميل.',
      solution: 'حملات واتساب لإرسال عروض ترويجية تلقائية بعد ترك السلة بـ 15 دقيقة مع روابط دفع آمنة.',
      impact: 'استرجاع 22% من السلات الضائعة تلقائياً.'
    }
  ];

  if (isInitializing) {
    return (
      <div className="bg-gray-950 border border-white/5 rounded-[40px] shadow-3xl shadow-red-500/5 overflow-hidden text-right animate-pulse">
        {/* Header Skeleton */}
        <div className="bg-white/[0.02] border-b border-white/5 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10" />
            <div className="space-y-2 text-right">
              <div className="h-4 w-32 bg-white/10 rounded" />
              <div className="h-3 w-40 bg-white/5 rounded" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-32 bg-white/5 rounded-full hidden sm:block" />
            <div className="h-9 w-9 bg-white/5 rounded-xl" />
            <div className="h-9 w-9 bg-white/5 rounded-xl" />
          </div>
        </div>

        {/* Workspace Body Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
          {/* Chat Stream Skeleton (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-[#0b0c10] p-6 border-b lg:border-b-0 border-white/5">
            <div className="space-y-6 flex-1">
              {/* Agent Bubble Skeleton */}
              <div className="flex flex-col items-start space-y-1.5">
                <div className="h-2.5 w-16 bg-white/5 rounded" />
                <div className="flex items-end gap-2 max-w-[70%]">
                  <div className="w-7 h-7 rounded-lg bg-white/5" />
                  <div className="h-14 w-64 bg-white/[0.03] border border-white/5 rounded-3xl rounded-tl-none animate-pulse" />
                </div>
              </div>

              {/* User Bubble Skeleton */}
              <div className="flex flex-col items-end space-y-1.5">
                <div className="h-2.5 w-10 bg-white/5 rounded" />
                <div className="h-10 w-44 bg-accent-red/20 rounded-3xl rounded-tr-none animate-pulse" />
              </div>

              {/* Agent Bubble Skeleton 2 */}
              <div className="flex flex-col items-start space-y-1.5">
                <div className="h-2.5 w-16 bg-white/5 rounded" />
                <div className="flex items-end gap-2 max-w-[80%]">
                  <div className="w-7 h-7 rounded-lg bg-white/5" />
                  <div className="h-20 w-80 bg-white/[0.03] border border-white/5 rounded-3xl rounded-tl-none animate-pulse" />
                </div>
              </div>
            </div>

            {/* Bottom Actions and input line Skeleton */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              <div className="flex gap-2 justify-start overflow-x-auto">
                <div className="h-8 w-36 bg-red-500/10 border border-red-500/10 rounded-full flex-shrink-0" />
                <div className="h-8 w-32 bg-white/5 rounded-full flex-shrink-0" />
                <div className="h-8 w-40 bg-emerald-500/10 border border-emerald-500/10 rounded-full flex-shrink-0" />
              </div>
              <div className="flex gap-2">
                <div className="w-10 h-10 bg-white/5 rounded-xl" />
                <div className="flex-1 h-10 bg-white/[0.03] border border-white/10 rounded-xl" />
              </div>
            </div>
          </div>

          {/* Selector sidebar skeleton (4 cols) */}
          <div className="lg:col-span-4 bg-white/[0.01] border-l border-white/5 p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="border-b border-white/5 pb-3 space-y-2 text-right">
                <div className="h-3 w-32 bg-red-500/20 rounded ml-auto" />
                <div className="h-4.5 w-48 bg-white/10 rounded ml-auto" />
                <div className="h-3 w-56 bg-white/5 rounded ml-auto" />
              </div>

              {/* Agents menu list skeletons */}
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-3 border border-white/5 rounded-2xl flex items-center gap-3">
                    <div className="w-4 h-4 bg-white/5 rounded" />
                    <div className="flex-1 space-y-2 text-right">
                      <div className="h-3 w-16 bg-white/10 rounded ml-auto" />
                      <div className="h-2.5 w-24 bg-white/5 rounded ml-auto" />
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics cards skeletons */}
            <div className="pt-4 border-t border-white/5 space-y-2">
              <div className="h-3 w-36 bg-white/5 rounded ml-auto mb-2" />
              {[1, 2].map((i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 p-2.5 rounded-xl flex justify-between">
                  <div className="h-4 w-10 bg-white/10 rounded" />
                  <div className="h-4 w-36 bg-white/5 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 border border-white/5 rounded-[40px] shadow-3xl shadow-red-500/5 overflow-hidden text-right">
      
      {/* Simulation Notice Banner */}
      <div className="bg-white/[0.04] border-b border-white/5 px-6 py-2 flex items-center justify-between text-[11px] text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
          <span className="font-bold text-gray-200">محاكي منظومة الذكاء الاصطناعي والأتمتة</span>
          <span className="text-gray-500">·</span>
          <span className="font-en text-[10px] text-accent-red font-semibold uppercase tracking-wider">GROWTH AI SIMULATOR</span>
        </div>
        <span className="hidden sm:inline text-gray-500 text-[10px]">
          يوضح كيفية عمل روبوتات الرد والتأهيل السريع وحساب العائد التقديري
        </span>
      </div>
      
      {/* Visual Header Grid - 2027 beon.chat feel */}
      <div className="bg-white/[0.02] border-b border-white/5 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left header features: Agent identity */}
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-2xl relative border border-white/10 shadow-inner">
              {currentAgent.avatar}
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-gray-950 rounded-full animate-pulse" />
          </div>
          
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              {currentAgent.name} <span className="text-[10px] bg-red-500/15 text-accent-red font-semibold px-2 py-0.5 rounded-full font-en uppercase tracking-wider">{currentAgent.role}</span>
            </span>
            <span className="text-[11px] text-gray-400 font-medium">
              {currentAgent.arabicRole}
            </span>
          </div>
        </div>

        {/* Action icons & Sound control */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-white/[0.03] border border-white/5 px-3 py-1.5 rounded-full text-gray-400 text-xs">
            <Clock className="w-3.5 h-3.5 text-accent-red" />
            <span>متوسط الاستجابة: <span className="text-white font-bold font-en">0.3s</span></span>
          </div>

          <button
            onClick={() => { setSoundEnabled(!soundEnabled); playClickSound(); }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
              soundEnabled 
                ? 'bg-red-500/10 border-red-500/20 text-accent-red' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
            }`}
            title={soundEnabled ? "إيقاف المؤثرات الصوتية" : "تفعيل المؤثرات الصوتية"}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => { initializeAgentChat(activeAgentId); playClickSound(); }}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            title="إعادة بدء المحادثة"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Interactive Workspace Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px] max-h-[750px]">
        
        {/* RIGHT AREA: Active Chat View (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-[#0b0c10] relative">
          
          {/* Ambient inner glow */}
          <div className="absolute top-20 left-20 w-[200px] h-[200px] bg-red-500/[0.03] rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-20 right-20 w-[250px] h-[250px] bg-emerald-500/[0.015] rounded-full blur-3xl pointer-events-none" />

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4 custom-scrollbar">
            {messages.map((msg) => {
              const isAgent = msg.sender === 'agent';
              return (
                <div key={msg.id} className={`flex flex-col ${isAgent ? 'items-start' : 'items-end'} space-y-1 animate-fade-in`}>
                  
                  {/* Sender Name label */}
                  <span className="text-[10px] text-gray-500 font-bold px-1">
                    {isAgent ? currentAgent.name : 'أنت'}
                  </span>

                  {/* Bubble wrapper */}
                  <div className="flex items-end gap-2 max-w-[85%] md:max-w-[75%]">
                    
                    {isAgent && (
                      <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm flex-shrink-0">
                        {currentAgent.avatar}
                      </div>
                    )}

                    <div className="flex flex-col space-y-2">
                      <div className={`p-4 rounded-3xl text-sm leading-relaxed ${
                        isAgent
                          ? 'bg-white/[0.04] text-gray-100 border border-white/5 rounded-tr-sm'
                          : 'bg-accent-red text-white rounded-tl-sm font-medium shadow-md shadow-red-600/10'
                      }`}>
                        {msg.text}

                        {/* ================= SPECIAL INTERACTIVE TYPE: ROI CALCULATOR ================= */}
                        {msg.type === 'roi_calc' && (
                          <div className="mt-4 bg-gray-950/80 border border-white/10 rounded-2xl p-4 space-y-4 text-right">
                            <div className="border-b border-white/5 pb-2">
                              <span className="text-[10px] text-accent-red font-black block font-en uppercase tracking-wider">LIVE COMPUTATION GRAPH</span>
                              <span className="text-xs font-bold text-white">حاسبة النمو التفاعلية لشركتك</span>
                            </div>

                            {/* Sliders in bubble */}
                            <div className="space-y-3 text-xs">
                              <div className="space-y-1">
                                <div className="flex justify-between items-center text-[11px]">
                                  <span className="text-accent-red font-bold font-en">{roiVisitors.toLocaleString()}</span>
                                  <span className="text-gray-300">الزوار الشهريين:</span>
                                </div>
                                <input
                                  type="range"
                                  min="2000"
                                  max="50000"
                                  step="2000"
                                  value={roiVisitors}
                                  onChange={(e) => { setRoiVisitors(parseInt(e.target.value)); playClickSound(); }}
                                  className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer accent-accent-red"
                                />
                              </div>

                              <div className="space-y-1">
                                <div className="flex justify-between items-center text-[11px]">
                                  <span className="text-accent-red font-bold font-en">{roiConversion}%</span>
                                  <span className="text-gray-300">معدل التحويل الحالي:</span>
                                </div>
                                <input
                                  type="range"
                                  min="0.5"
                                  max="4.5"
                                  step="0.5"
                                  value={roiConversion}
                                  onChange={(e) => { setRoiConversion(parseFloat(e.target.value)); playClickSound(); }}
                                  className="w-full h-1 bg-white/10 rounded appearance-none cursor-pointer accent-accent-red"
                                />
                              </div>
                            </div>

                            {/* Result Display inside chat bubble */}
                            <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-center">
                              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-2">
                                <span className="text-[9px] text-gray-400 block">الإيراد الحالي</span>
                                <span className="text-xs font-bold text-white font-en">{currentRevenue.toLocaleString()} EGP</span>
                              </div>
                              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2">
                                <span className="text-[9px] text-emerald-400 font-bold block">مبيعات Shavi المتوقعة</span>
                                <span className="text-xs font-bold text-emerald-400 font-en">{optimizedRevenue.toLocaleString()} EGP</span>
                              </div>
                            </div>

                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-2.5 text-center">
                              <span className="text-[10px] text-gray-400 block">صافي الأرباح الإضافية شهرياً</span>
                              <span className="text-sm font-black text-accent-red font-en">+{revenueIncrease.toLocaleString()} EGP</span>
                              <span className="text-[9px] text-accent-red font-bold block mt-0.5">مضاعفة معدل التحويل إلى {optimizedRate}% آلياً</span>
                            </div>
                          </div>
                        )}

                        {/* ================= SPECIAL INTERACTIVE TYPE: SECTOR SOLUTIONS ================= */}
                        {msg.type === 'sector_selector' && (
                          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {sectorSolutionsData.map((sect) => (
                              <button
                                key={sect.id}
                                onClick={() => handleSendMessage(`كيف يخدم نظامكم قطاع: ${sect.name}؟`, 'text')}
                                className="bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 p-3 rounded-2xl text-right transition-all group flex flex-col justify-between cursor-pointer"
                              >
                                <div>
                                  <span className="text-xs font-bold text-white block group-hover:text-accent-red transition-colors">{sect.name}</span>
                                  <p className="text-[10px] text-gray-400 mt-1 leading-snug">{sect.pain}</p>
                                </div>
                                <div className="text-[9px] text-emerald-400 font-bold mt-2 pt-1.5 border-t border-white/5 w-full flex justify-between">
                                  <span>{sect.impact}</span>
                                  <span>الحل ←</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}

                        {/* ================= SPECIAL INTERACTIVE TYPE: LEAD FORM ================= */}
                        {msg.type === 'lead_form' && (
                          <div className="mt-4 bg-gray-950/80 border border-white/10 rounded-2xl p-4 text-right">
                            <div className="border-b border-white/5 pb-2 mb-3">
                              <span className="text-[10px] text-accent-red font-black block font-en uppercase tracking-wider">CRM LIVE SYNCING</span>
                              <span className="text-xs font-bold text-white">تأكيد حجز جلسة الاستشارة التشخيصية</span>
                            </div>

                            {leadSubmitted ? (
                              <div className="text-center py-4 space-y-2">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto animate-pulse">
                                  <Check className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold text-emerald-400 block">تم الاتصال بـ CRM بنجاح!</span>
                                <p className="text-[10px] text-gray-400">تابع المحادثة لاستكمال الخطوات.</p>
                              </div>
                            ) : (
                              <form onSubmit={handleLeadSubmit} className="space-y-3">
                                
                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-400 font-bold block">الاسم الكريم:</label>
                                  <div className="relative">
                                    <input 
                                      type="text" 
                                      required
                                      value={leadName}
                                      onChange={(e) => setLeadName(e.target.value)}
                                      placeholder="مثال: أحمد عبد الله"
                                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-red text-right"
                                    />
                                    <User className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-2.5" />
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-400 font-bold block">رقم الهاتف (واتساب):</label>
                                  <div className="relative">
                                    <input 
                                      type="tel" 
                                      required
                                      value={leadPhone}
                                      onChange={(e) => setLeadPhone(e.target.value)}
                                      placeholder="مثال: 01115042478"
                                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-accent-red text-right font-en"
                                    />
                                    <Phone className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-2.5" />
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] text-gray-400 font-bold block">القطاع المستهدف:</label>
                                  <div className="relative">
                                    <select
                                      value={leadSector}
                                      onChange={(e) => setLeadSector(e.target.value)}
                                      className="w-full bg-gray-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-accent-red text-right appearance-none"
                                    >
                                      <option value="real_estate">القطاع العقاري</option>
                                      <option value="medical">القطاع الطبي والعيادات</option>
                                      <option value="saas">البرمجيات والتطبيقات SaaS</option>
                                      <option value="e_commerce">متاجر إلكترونية</option>
                                      <option value="other">قطاع آخر</option>
                                    </select>
                                    <Building className="w-3.5 h-3.5 text-gray-500 absolute left-3.5 top-2.5" />
                                  </div>
                                </div>

                                <button
                                  type="submit"
                                  className="w-full py-2 bg-accent-red hover:bg-accent-red-hover text-white text-xs font-bold rounded-xl shadow-md shadow-red-500/10 hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                                >
                                  <span>تأكيد الحجز ومزامنة البيانات</span>
                                  <ArrowLeft className="w-3.5 h-3.5" />
                                </button>
                              </form>
                            )}
                          </div>
                        )}

                        {/* ================= SPECIAL INTERACTIVE TYPE: TESTIMONIALS ================= */}
                        {msg.type === 'testimonials' && (
                          <div className="mt-4 space-y-2">
                            <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-2xl text-right">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-[11px] font-bold text-white">م. أحمد خالد | CloudTask</span>
                                <span className="text-[10px] text-accent-red font-bold">★ ★ ★ ★ ★</span>
                              </div>
                              <p className="text-[10px] text-gray-400 italic">"بفضل أتمتة الواتساب ونظام Shavi OS قللنا نسبة تسرب المستخدمين بمعدل 35% وزادت مبيعات البرمجيات بشكل رائع."</p>
                            </div>
                            <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-2xl text-right">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-[11px] font-bold text-white">د. سارة عبد الرحمن | Derma Clinic</span>
                                <span className="text-[10px] text-accent-red font-bold">★ ★ ★ ★ ★</span>
                              </div>
                              <p className="text-[10px] text-gray-400 italic">"مساعد الحجوزات الآلي على واتساب قلل تغيب الحالات بنسبة 80%، وأصبحت مبيعات العيادة تعمل كالساعة السويسرية."</p>
                            </div>
                          </div>
                        )}

                      </div>

                      {/* Timestamp & Delivery status indicator */}
                      <div className="flex items-center gap-1 justify-end text-[9px] text-gray-500 px-1.5">
                        <span>{msg.timestamp}</span>
                        {!isAgent && <CheckCheck className="w-3.5 h-3.5 text-accent-red" />}
                        {isAgent && <Check className="w-3.5 h-3.5 text-gray-500" />}
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}

            {/* Simulated Typing Indicator */}
            {isTyping && (
              <div className="flex flex-col items-start space-y-1 animate-pulse">
                <span className="text-[10px] text-gray-500 font-bold px-1">{currentAgent.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm">
                    {currentAgent.avatar}
                  </div>
                  <div className="bg-white/[0.04] text-gray-400 border border-white/5 px-4 py-3 rounded-2xl rounded-tr-sm flex items-center gap-1.5">
                    <span className="text-xs">{currentAgent.name} يكتب</span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-accent-red rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-accent-red rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-accent-red rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Interactive Inputs & Suggestions */}
          <div className="p-4 border-t border-white/5 bg-white/[0.01] space-y-3.5 relative z-10">
            
            {/* Quick Action Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none justify-start flex-row-reverse">
              <button
                onClick={() => handleQuickAction('📊 احسب عائدي المتوقع (ROI)', 'roi_calc')}
                className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 text-accent-red text-[11px] font-bold px-3.5 py-1.5 rounded-full flex-shrink-0 transition-all cursor-pointer flex items-center gap-1"
              >
                <span>احسب عائدي المتوقع</span>
                <Sparkles className="w-3 h-3" />
              </button>

              <button
                onClick={() => handleQuickAction('💼 استكشف حلول قطاعي', 'sector_selector')}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 text-[11px] font-bold px-3.5 py-1.5 rounded-full flex-shrink-0 transition-all cursor-pointer"
              >
                حلول قطاعك المستهدف
              </button>

              <button
                onClick={() => handleQuickAction('📅 احجز استشارة مجانية الآن', 'lead_form')}
                className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 text-[11px] font-bold px-3.5 py-1.5 rounded-full flex-shrink-0 transition-all cursor-pointer"
              >
                احجز استشارة التشخيص
              </button>

              <button
                onClick={() => handleQuickAction('⭐ استعراض أراء العملاء', 'testimonials')}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 text-[11px] font-bold px-3.5 py-1.5 rounded-full flex-shrink-0 transition-all cursor-pointer"
              >
                آراء العملاء والشركاء
              </button>
            </div>

            {/* Custom Input Box Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!inputText.trim()) return;
                handleSendMessage(inputText, 'text');
              }}
              className="flex items-center gap-2"
            >
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  inputText.trim()
                    ? 'bg-accent-red text-white shadow-md shadow-red-500/20'
                    : 'bg-white/5 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="اسأل Shavi OS أي شيء (مثال: أتمتة، مبيعات، تسويق، أسعار)..."
                className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent-red focus:bg-white/[0.05] text-right transition-all"
              />
            </form>

            {/* Security disclaimer footer */}
            <div className="flex items-center justify-center gap-1.5 text-[9px] text-gray-600">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-red" />
              <span>محادثة آمنة ومشفرة بالكامل ومعتمدة من Shavi Agency 2027</span>
            </div>

          </div>

        </div>

        {/* LEFT AREA: Agent Select Workspace Menu (4 cols) */}
        <div className="lg:col-span-4 bg-white/[0.01] border-r lg:border-r-0 lg:border-l border-white/5 p-5 flex flex-col justify-between">
          
          <div className="space-y-4">
            {/* Sidebar title */}
            <div className="border-b border-white/5 pb-3">
              <span className="text-[10px] text-accent-red font-black font-en tracking-wider block uppercase">SYSTEM MULTI-AGENT HUB</span>
              <h4 className="text-sm font-bold text-white">اختر مهندس النمو المساعد لمشروعك</h4>
              <p className="text-[10px] text-gray-400 mt-0.5">يمكنك التنقل بين خبراء Shavi واستشارتهم في تخصصاتهم المختلفة:</p>
            </div>

            {/* Agents Buttons List */}
            <div className="space-y-2">
              {agents.map((agent) => {
                const isActive = activeAgentId === agent.id;
                return (
                  <button
                    key={agent.id}
                    onClick={() => {
                      if (isActive) return;
                      playClickSound();
                      setActiveAgentId(agent.id);
                    }}
                    className={`w-full text-right p-3 rounded-2xl border transition-all flex items-center gap-3 group cursor-pointer ${
                      isActive
                        ? 'bg-white/[0.05] border-white/10 shadow-lg shadow-black/30'
                        : 'bg-transparent border-transparent hover:bg-white/[0.02]'
                    }`}
                  >
                    {/* Agent Avatar */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all relative ${
                      isActive ? 'scale-105' : 'opacity-70 group-hover:opacity-100'
                    } ${agent.bgColor} border ${agent.borderColor}`}>
                      {agent.avatar}
                      {isActive && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent-red rounded-full animate-ping" />
                      )}
                    </div>

                    {/* Agent Information */}
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold transition-colors ${isActive ? 'text-accent-red font-black' : 'text-gray-300'}`}>
                          {agent.name}
                        </span>
                        <span className="text-[8px] text-gray-500 font-en">{agent.id.toUpperCase()}</span>
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium truncate max-w-[170px]">{agent.arabicRole}</p>
                    </div>

                    {/* Arrow hint indicator */}
                    <ChevronLeft className={`w-4 h-4 text-gray-600 transition-transform ${
                      isActive ? 'text-accent-red -translate-x-1' : 'group-hover:translate-x-0'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick interactive agency metrics */}
          <div className="pt-4 border-t border-white/5 space-y-3.5 mt-6 lg:mt-0">
            <span className="text-[10px] text-gray-400 font-bold block">مؤشرات أداء منظومة Shavi OS:</span>
            
            <div className="space-y-2">
              <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-xl flex items-center justify-between text-xs">
                <span className="text-white font-bold font-en">90%</span>
                <span className="text-gray-400">تقليل تكلفة خدمة العملاء</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-xl flex items-center justify-between text-xs">
                <span className="text-green-400 font-bold font-en">+40%</span>
                <span className="text-gray-400">نمو الإيرادات الشهريّة المستمر</span>
              </div>
              <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-xl flex items-center justify-between text-xs">
                <span className="text-white font-bold font-en">&lt; 5s</span>
                <span className="text-gray-400">زمن الاستجابة التلقائية للعميل</span>
              </div>
            </div>

            {/* Micro badge trust */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-3 text-center">
              <span className="text-[10px] text-accent-red font-bold block">★ ★ ★ ★ ★</span>
              <p className="text-[9px] text-gray-300 mt-1 leading-snug">موثوق ومثبت من كبرى العيادات والشركات العقارية والتطبيقات التقنية.</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
