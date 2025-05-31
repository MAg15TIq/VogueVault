/**
 * Google Analytics utility functions for VogueVault
 * Tracking ID: G-EL6CZ1FWSG
 */

// Google Analytics configuration
export const GA_TRACKING_ID = 'G-EL6CZ1FWSG';

// Check if Google Analytics is available
export const isGAAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

// Initialize Google Analytics (called automatically by gtag script in layout)
export const initGA = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (isGAAvailable()) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: title || document.title,
      page_location: url,
    });
  }
};

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (isGAAvailable()) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track ad impressions
export const trackAdImpression = (
  adType: string,
  adSlot: string,
  location: string
) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Ad Impression: ${adType} (${adSlot}) at ${location}`);
  }
  
  if (isGAAvailable()) {
    window.gtag('event', 'ad_impression', {
      event_category: 'ads',
      event_label: `${adType}_${adSlot}`,
      custom_parameters: {
        ad_type: adType,
        ad_slot: adSlot,
        location: location,
      },
    });
  }
};

// Track ad clicks
export const trackAdClick = (
  adType: string,
  adSlot: string,
  location: string
) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Ad Click: ${adType} (${adSlot}) at ${location}`);
  }
  
  if (isGAAvailable()) {
    window.gtag('event', 'ad_click', {
      event_category: 'ads',
      event_label: `${adType}_${adSlot}`,
      custom_parameters: {
        ad_type: adType,
        ad_slot: adSlot,
        location: location,
      },
    });
  }
};

// Track article views
export const trackArticleView = (
  articleId: string,
  articleTitle: string,
  category: string
) => {
  if (isGAAvailable()) {
    window.gtag('event', 'article_view', {
      event_category: 'content',
      event_label: articleId,
      custom_parameters: {
        article_title: articleTitle,
        article_category: category,
      },
    });
  }
};

// Track newsletter signups
export const trackNewsletterSignup = (source: string) => {
  if (isGAAvailable()) {
    window.gtag('event', 'newsletter_signup', {
      event_category: 'engagement',
      event_label: source,
    });
  }
};

// Track search queries
export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  if (isGAAvailable()) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      event_category: 'search',
      custom_parameters: {
        results_count: resultsCount,
      },
    });
  }
};

// Track user engagement
export const trackEngagement = (
  engagementType: 'scroll' | 'time_on_page' | 'click',
  value?: number
) => {
  if (isGAAvailable()) {
    window.gtag('event', 'engagement', {
      event_category: 'user_engagement',
      event_label: engagementType,
      value: value,
    });
  }
};

// Track errors
export const trackError = (errorMessage: string, errorType: string) => {
  if (isGAAvailable()) {
    window.gtag('event', 'exception', {
      description: errorMessage,
      fatal: false,
      custom_parameters: {
        error_type: errorType,
      },
    });
  }
};

// Debug function to check if tracking is working
export const debugGA = () => {
  if (typeof window !== 'undefined') {
    console.log('Google Analytics Debug Info:');
    console.log('- gtag available:', typeof window.gtag === 'function');
    console.log('- dataLayer available:', Array.isArray(window.dataLayer));
    console.log('- Tracking ID:', GA_TRACKING_ID);
    console.log('- Current URL:', window.location.href);
    console.log('- Page Title:', document.title);
    
    if (window.dataLayer) {
      console.log('- dataLayer contents:', window.dataLayer);
    }
  }
};
