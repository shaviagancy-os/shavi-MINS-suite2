export interface Benefit {
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export interface Feature {
  title: string;
  description: string;
  metric?: string;
}

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface Sector {
  id: string;
  name: string;
  englishName: string;
  icon: string;
  tagline: string;
  description: string;
  benefits?: Benefit[];
  painPoints: string[];
  solutions: string[];
  aiAutomation: {
    title: string;
    description: string;
    impact: string;
  };
  expectedRoi: string;
  features: Feature[];
  workflow: WorkflowStep[];
  faqs: FAQ[];
  testimonials: Testimonial[];
}

export interface GrowthPillar {
  id: 'acquire' | 'convert' | 'automate' | 'scale' | 'enable';
  nameAr: string;
  nameEn: string;
  tagline: string;
  description: string;
  icon: string;
  targetProblem: string;
  capabilities: {
    title: string;
    description: string;
  }[];
  outcomes: string[];
}

export interface BottleneckItem {
  id: 'acquisition' | 'conversion' | 'operations' | 'scale';
  number: string;
  title: string;
  description: string;
  symptoms: string[];
  recommendedPillar: 'acquire' | 'convert' | 'automate' | 'scale';
  pillarLabel: string;
  actionTitle: string;
}

export interface CaseStudy {
  id: string;
  clientSector: string;
  clientTitle: string;
  location: string;
  challenge: string;
  whatWasWrong: string;
  shaviSystem: string;
  systemPillars: ('acquire' | 'convert' | 'automate' | 'scale' | 'enable')[];
  whatWasImplemented: string[];
  beforeState: string;
  afterState: string;
  resultHighlights: {
    metric: string;
    label: string;
  }[];
  keyLessons: string;
}

export interface DiagnosticAnswers {
  sector: string;
  companyStage: string;
  primaryAcquisitionSource: string;
  monthlyLeadVolume: string;
  coreBottleneck: string;
  crmStatus: string;
  ninetyDayGoal: string;
  contactName: string;
  companyName: string;
  phone: string;
  email?: string;
}

export interface DiagnosticResult {
  bottleneckTitle: string;
  bottleneckCategory: 'acquire' | 'convert' | 'automate' | 'scale';
  situationAnalysis: string;
  recommendedSystem: string;
  priorityActions: string[];
  leadScore: number;
  leadTier: 'HOT' | 'WARM' | 'NURTURE';
}

export interface LeadRecord {
  id: string;
  name: string;
  email?: string;
  phone: string;
  company: string;
  sector: string;
  bottleneck?: string;
  leadScore?: number;
  leadTier?: 'HOT' | 'WARM' | 'NURTURE';
  source: string;
  campaign?: string;
  diagnosticAnswers?: Partial<DiagnosticAnswers>;
  createdAt: string;
}

export interface EcosystemService {
  id: string;
  title: string;
  description: string;
  icon: string;
  subServices: string[];
  storytelling: string;
}

export interface LeadSubmission {
  name: string;
  email: string;
  phone: string;
  company: string;
  sector: string;
  message: string;
}
