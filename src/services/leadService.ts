import { DiagnosticAnswers, DiagnosticResult, LeadRecord } from '../types';
import { analytics } from './analytics';

const STORAGE_KEY = 'shavi_crm_leads_v2';
const OFFICIAL_WHATSAPP_NUMBER = '201115042478';

export class LeadService {
  /**
   * Evaluates diagnostic input and computes a transparent lead score
   */
  public static calculateLeadScore(answers: Partial<DiagnosticAnswers>): { score: number; tier: 'HOT' | 'WARM' | 'NURTURE' } {
    let score = 50; // Baseline

    // Company Stage scoring
    if (answers.companyStage?.includes('مؤسسة') || answers.companyStage?.includes('25') || answers.companyStage?.includes('قائمة')) {
      score += 25;
    } else if (answers.companyStage?.includes('متوسطة') || answers.companyStage?.includes('6-25')) {
      score += 15;
    } else {
      score += 5;
    }

    // Lead Volume scoring
    if (answers.monthlyLeadVolume?.includes('1000') || answers.monthlyLeadVolume?.includes('كبير')) {
      score += 20;
    } else if (answers.monthlyLeadVolume?.includes('200')) {
      score += 15;
    } else if (answers.monthlyLeadVolume?.includes('50')) {
      score += 10;
    }

    // 90-day Goal urgency
    if (answers.ninetyDayGoal?.includes('مضاعفة') || answers.ninetyDayGoal?.includes('توسع')) {
      score += 15;
    } else if (answers.ninetyDayGoal?.includes('أتمتة') || answers.ninetyDayGoal?.includes('تقليص')) {
      score += 10;
    }

    // Cap score at 100
    score = Math.min(100, Math.max(20, score));

    let tier: 'HOT' | 'WARM' | 'NURTURE' = 'WARM';
    if (score >= 75) {
      tier = 'HOT';
    } else if (score < 50) {
      tier = 'NURTURE';
    }

    return { score, tier };
  }

  /**
   * Generates tailored Diagnostic Results based on user inputs
   */
  public static generateDiagnosticResult(answers: DiagnosticAnswers): DiagnosticResult {
    const { score, tier } = this.calculateLeadScore(answers);
    const sector = answers.sector || 'قطاع عام';
    const bottleneck = answers.coreBottleneck || '';

    let category: 'acquire' | 'convert' | 'automate' | 'scale' = 'convert';
    let bottleneckTitle = 'تسريب الفرص وضعف معدل التحويل';
    let situationAnalysis = 'تدفق الفرص والعملاء لديك يتعرض لتسرب ملحوظ بين مرحلة إبداء الاهتمام ومرحلة الشراء الفعلي، والسبب الأبرز هو بطء الاستجابة أو عدم تأهيل العميل قبل التواصل.';
    let recommendedSystem = 'نظام التحويل الذكي (CONVERT) مع أتمتة المتابعة';
    let priorityActions = [
      'تطبيق قمع تصفية وتأهيل مسبق (Lead Qualification) للتركيز على المشترين الجادين.',
      'تفعيل رسائل ترحيب ومعلومات فورية عبر WhatsApp Cloud API خلال أول 60 ثانية.',
      'إعادة هيكلة العرض التجاري وصفحة الهبوط لرفع نسبة إقناع الزائر بنسبة 40%.',
      'بناء تدفق تذكير تفاعلي للحالات المترددة لاستعادة المبيعات المفقودة.',
    ];

    if (bottleneck.includes('وصول') || bottleneck.includes('إعلانات') || bottleneck.includes('جلب') || bottleneck.includes('acquisition')) {
      category = 'acquire';
      bottleneckTitle = 'ارتفاع تكلفة الاستحواذ وضعف جودة الوصول';
      situationAnalysis = 'الحملات الإعلانية ومحتوى الوصول يجلب تفاعلات عامة لا تتحول إلى طلبات حقيقية، مما يرفع تكلفة اكتساب العميل ويهدر الميزانية التسويقية.';
      recommendedSystem = 'نظام الاستحواذ الاستراتيجي (ACQUIRE)';
      priorityActions = [
        'إعادة توجيه الاستهداف الإعلاني نحو متخذي القرار الفعليين في ' + sector + '.',
        'صناعة محتوى Reels وفيديو موجه يركز على إثبات النتائج وبناء الثقة الأولية.',
        'تصميم صفحات هبوط تركز على حل مشكلة واحدة واضحة وتبرز التميز التنافسي.',
        'تفعيل حملات إعادة استهداف (Retargeting) ديناميكية تستعيد المهتمين بتكلفة أقل.',
      ];
    } else if (bottleneck.includes('تشغيل') || bottleneck.includes('يدوي') || bottleneck.includes('رد') || bottleneck.includes('متابعة') || bottleneck.includes('operations')) {
      category = 'automate';
      bottleneckTitle = 'إرهاق العمليات اليدوية وتأخر الاستجابة للعملاء';
      situationAnalysis = 'فريق العمل يغرق في مهام يدوية مكررة (الرد المتكرر، إرسال العروض يدوياً، إدخال البيانات)، مما يؤخر الرد على العملاء لساعات ويهدر الصفقات الساخنة.';
      recommendedSystem = 'نظام أتمتة العمليات والـ CRM (AUTOMATE)';
      priorityActions = [
        'ربط حساب واتساب رسمي Cloud API للرد الفوري 24/7 على الاستفسارات المتكررة.',
        'توزيع العملاء المؤهلين تلقائياً على مسؤولي المبيعات مع تنبيهات لحظية.',
        'ربط قنوات التسجيل بنظام CRM مركزي وتحديث حالة كل عميل دون تدخل يدوي.',
        'أتمتة تسلسلات ما بعد البيع والتذكير بالمواعيد أو تجديد الاشتراكات.',
      ];
    } else if (bottleneck.includes('توسع') || bottleneck.includes('استراتيجية') || bottleneck.includes('scale')) {
      category = 'scale';
      bottleneckTitle = 'سقف النمو وصعوبة التوسع المستدام';
      situationAnalysis = 'الشركة تمتلك نموذج عمل جيد، لكن الاعتماد على القنوات الفردية يمنع التوسع دون مضاعفة المخاطر والتكاليف التشغيلية.';
      recommendedSystem = 'نظام التوسع واستراتيجية النمو (SCALE)';
      priorityActions = [
        'تحليل هوامش الربحية وقنوات التوزيع واكتشاف فرص البيع الإضافي (Upselling).',
        'بناء استراتيجية نمو شاملة تستهدف التوسع في أسواق جديدة (كالأسواق الخليجية والسعودية).',
        'تصميم لوحات تحكم متقدمة تدمج بيانات التسويق والمبيعات وتكلفة الاستحواذ الحقيقية.',
        'تأهيل وتمكين الفريق الداخلي لإدارة العمليات المستقرة باستقلالية.',
      ];
    }

    return {
      bottleneckTitle,
      bottleneckCategory: category,
      situationAnalysis,
      recommendedSystem,
      priorityActions,
      leadScore: score,
      leadTier: tier,
    };
  }

  /**
   * Persists lead to local CRM cache and dispatches tracking
   */
  public static saveLead(record: Omit<LeadRecord, 'id' | 'createdAt'>): LeadRecord {
    const fullRecord: LeadRecord = {
      ...record,
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };

    if (typeof window !== 'undefined') {
      try {
        const existingRaw = localStorage.getItem(STORAGE_KEY);
        const existing: LeadRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
        existing.unshift(fullRecord);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 50))); // Keep last 50
      } catch (e) {
        console.warn('[Shavi CRM] Local cache write error:', e);
      }
    }

    analytics.track('lead_submitted', {
      leadId: fullRecord.id,
      company: fullRecord.company,
      sector: fullRecord.sector,
      leadScore: fullRecord.leadScore,
      leadTier: fullRecord.leadTier,
      source: fullRecord.source,
    });

    return fullRecord;
  }

  /**
   * Generates a pre-filled, professionally structured WhatsApp message
   */
  public static generateWhatsAppUrl(options: {
    name: string;
    company: string;
    phone: string;
    sector: string;
    bottleneck?: string;
    recommendedSystem?: string;
    intentType: 'diagnostic' | 'strategy_call' | 'general';
  }): string {
    let headerText = 'طلب مناقشة تقرير تشخيص نمو الأعمال — Shavi OS';
    if (options.intentType === 'strategy_call') {
      headerText = 'طلب حجز جلسة استراتيجية نمو (30 دقيقة مجاناً) — Shavi OS';
    } else if (options.intentType === 'general') {
      headerText = 'استفسار حول حلول منظومة النمو المتكاملة — Shavi OS';
    }

    const messageLines = [
      `*${headerText}*`,
      '',
      `👤 *الاسم:* ${options.name}`,
      `🏢 *الشركة:* ${options.company}`,
      `🏷️ *القطاع:* ${options.sector}`,
      `📱 *رقم التواصل:* ${options.phone}`,
    ];

    if (options.bottleneck) {
      messageLines.push(`⚠️ *أبرز عقبة للنمو:* ${options.bottleneck}`);
    }

    if (options.recommendedSystem) {
      messageLines.push(`🎯 *المنظومة المقترحة:* ${options.recommendedSystem}`);
    }

    messageLines.push('');
    messageLines.push('_أرغب في مناقشة هذا التقرير مع مستشار النمو واستعراض خطة التنفيذ المخصصة لمضاعفة نتائجنا._');

    const fullMessage = messageLines.join('\n');
    return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
  }
}
