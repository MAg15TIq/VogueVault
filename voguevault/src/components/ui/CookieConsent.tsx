'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CookieConsentProps {
  className?: string;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ className = '' }) => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('cookie-consent');
    if (!hasConsent) {
      // Show the consent banner after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    setShowConsent(false);

    // Enable Google Analytics and AdSense cookies
    window.gtag?.('consent', 'update', {
      'ad_storage': 'granted',
      'analytics_storage': 'granted',
      'personalization_storage': 'granted',
      'functionality_storage': 'granted',
      'security_storage': 'granted'
    });

    // Notify AdSense that consent has been granted
    // This helps ensure ads are properly personalized
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        // @ts-ignore - adsbygoogle is added by the external script
        (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 0;
      }
    } catch (e) {
      console.error('Error updating AdSense consent:', e);
    }
  };

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary');
    setShowConsent(false);

    // Disable Google Analytics and AdSense cookies
    window.gtag?.('consent', 'update', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
      'personalization_storage': 'denied',
      'functionality_storage': 'granted', // Necessary cookies still allowed
      'security_storage': 'granted' // Security cookies still allowed
    });

    // Notify AdSense to use non-personalized ads
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        // @ts-ignore - adsbygoogle is added by the external script
        (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;
      }
    } catch (e) {
      console.error('Error updating AdSense consent:', e);
    }
  };

  const customizeSettings = () => {
    // For a more advanced implementation, you could show a modal with detailed cookie settings
    // For now, we'll just link to the privacy policy
    window.open('/privacy-policy', '_blank');
  };

  if (!showConsent) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 shadow-lg z-50 p-4 md:p-6 ${className}`}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">We Value Your Privacy</h3>
            <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-2">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>
            <p className="text-sm">
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Read our Privacy Policy
              </Link>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={customizeSettings}
              className="px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-600 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              Customize
            </button>
            <button
              onClick={acceptNecessary}
              className="px-4 py-2 text-sm border border-primary text-primary rounded-md hover:bg-primary-light hover:text-white transition-colors"
            >
              Necessary Only
            </button>
            <button
              onClick={acceptAll}
              className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

// Add this to the global window object for TypeScript
declare global {
  interface Window {
    gtag?: (command: string, action: string, config: any) => void;
    adsbygoogle?: any[];
  }
}
