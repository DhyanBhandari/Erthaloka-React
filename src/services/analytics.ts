// Google Analytics Integration
export interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export class AnalyticsService {
  private static instance: AnalyticsService;
  private isInitialized = false;

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  // Initialize Google Analytics
  init(measurementId: string) {
    if (this.isInitialized || typeof window === 'undefined') return;

    // Load gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = function() {
      (window as any).dataLayer.push(arguments);
    };

    (window as any).gtag('js', new Date());
    (window as any).gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
    });

    this.isInitialized = true;
    console.log('Google Analytics initialized');
  }

  // Track page views
  trackPageView(pagePath: string, pageTitle?: string) {
    if (!this.isInitialized || typeof window === 'undefined') return;

    (window as any).gtag('config', process.env.REACT_APP_GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle || document.title,
    });
  }

  // Track custom events
  trackEvent(event: GAEvent) {
    if (!this.isInitialized || typeof window === 'undefined') return;

    (window as any).gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
  }

  // Track user registration
  trackUserRegistration(method: 'email' | 'google' | 'phone') {
    this.trackEvent({
      action: 'sign_up',
      category: 'engagement',
      label: method,
    });
  }

  // Track subscription purchase
  trackSubscriptionPurchase(planId: string, amount: number) {
    this.trackEvent({
      action: 'purchase',
      category: 'ecommerce',
      label: planId,
      value: amount,
    });
  }

  // Track user login
  trackUserLogin(method: 'email' | 'google' | 'phone') {
    this.trackEvent({
      action: 'login',
      category: 'engagement',
      label: method,
    });
  }

  // Track navigation
  trackNavigation(destination: string) {
    this.trackEvent({
      action: 'navigate',
      category: 'navigation',
      label: destination,
    });
  }

  // Track form submissions
  trackFormSubmission(formName: string) {
    this.trackEvent({
      action: 'form_submit',
      category: 'engagement',
      label: formName,
    });
  }

  // Track file downloads
  trackDownload(fileName: string) {
    this.trackEvent({
      action: 'file_download',
      category: 'engagement',
      label: fileName,
    });
  }

  // Track search queries
  trackSearch(searchTerm: string) {
    this.trackEvent({
      action: 'search',
      category: 'engagement',
      label: searchTerm,
    });
  }

  // Track user engagement time
  trackEngagementTime(timeSpent: number) {
    this.trackEvent({
      action: 'engagement_time',
      category: 'engagement',
      value: timeSpent,
    });
  }
}

// Export singleton instance
export const analytics = AnalyticsService.getInstance();

// React Hook for Analytics
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';

export const useAnalytics = () => {
  const { user } = useAuth();

  useEffect(() => {
    // Initialize analytics on mount
    const measurementId = process.env.REACT_APP_GA_MEASUREMENT_ID;
    if (measurementId) {
      analytics.init(measurementId);
    }
  }, []);

  useEffect(() => {
    // Set user properties when user logs in
    if (user && typeof window !== 'undefined') {
      (window as any).gtag?.('config', process.env.REACT_APP_GA_MEASUREMENT_ID, {
        user_id: user.id,
        custom_map: {
          subscription_plan: user.subscriptionPlan || 'none',
          subscription_status: user.subscriptionStatus || 'inactive',
        },
      });
    }
  }, [user]);

  return analytics;
};