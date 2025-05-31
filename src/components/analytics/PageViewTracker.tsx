'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView, isGAAvailable } from '@/lib/analytics';

/**
 * PageViewTracker component
 * Automatically tracks page views when the route changes
 * Should be included in the layout to track all page navigation
 */
const PageViewTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Wait a bit to ensure GA is loaded
    const timer = setTimeout(() => {
      if (isGAAvailable()) {
        const url = window.location.href;
        const title = document.title;
        trackPageView(url, title);
        
        // Debug log in development
        if (process.env.NODE_ENV === 'development') {
          console.log('Page view tracked:', { url, title, pathname });
        }
      } else {
        // Retry after a longer delay if GA isn't available yet
        setTimeout(() => {
          if (isGAAvailable()) {
            const url = window.location.href;
            const title = document.title;
            trackPageView(url, title);
            
            if (process.env.NODE_ENV === 'development') {
              console.log('Page view tracked (delayed):', { url, title, pathname });
            }
          } else if (process.env.NODE_ENV === 'development') {
            console.warn('Google Analytics not available for page view tracking');
          }
        }, 2000);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  // This component doesn't render anything
  return null;
};

export default PageViewTracker;
