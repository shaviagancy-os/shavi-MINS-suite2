/**
 * Shavi Growth OS - Analytics Architecture
 * Standardized event tracking for funnel measurement
 */

export type AnalyticsEventName =
  | 'hero_diagnostic_click'
  | 'hero_strategy_click'
  | 'hero_explore_click'
  | 'diagnostic_start'
  | 'diagnostic_step'
  | 'diagnostic_complete'
  | 'diagnostic_result_viewed'
  | 'strategy_call_opened'
  | 'strategy_call_submitted'
  | 'scenario_simulator_interacted'
  | 'saudi_hub_opened'
  | 'saudi_sector_selected'
  | 'industry_selected'
  | 'ai_simulator_opened'
  | 'whatsapp_initiated'
  | 'case_study_viewed'
  | 'training_pathway_opened'
  | 'lead_submitted';

export interface AnalyticsPayload {
  eventName: AnalyticsEventName;
  properties?: Record<string, any>;
  timestamp: string;
}

class AnalyticsService {
  private isDevelopment = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname.includes('run.app'));

  public track(eventName: AnalyticsEventName, properties: Record<string, any> = {}): void {
    const payload: AnalyticsPayload = {
      eventName,
      properties: {
        ...properties,
        url: typeof window !== 'undefined' ? window.location.href : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
      },
      timestamp: new Date().toISOString(),
    };

    // 1. Dispatch custom DOM event for any parent or embedded container listener
    if (typeof window !== 'undefined') {
      try {
        const customEvent = new CustomEvent('shavi:analytics', { detail: payload });
        window.dispatchEvent(customEvent);
      } catch (e) {
        // Ignore event dispatch errors
      }

      // 2. Push to dataLayer if available (e.g., GTM integration)
      const win = window as any;
      if (Array.isArray(win.dataLayer)) {
        win.dataLayer.push({
          event: eventName,
          ...payload.properties,
        });
      }

      // 3. Optional Facebook Pixel event forward if present
      if (typeof win.fbq === 'function') {
        win.fbq('trackCustom', eventName, payload.properties);
      }
    }

    if (this.isDevelopment) {
      console.log(`[Shavi Analytics] [${eventName}]`, payload.properties);
    }
  }
}

export const analytics = new AnalyticsService();
