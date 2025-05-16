'use client';

import { useEffect, useRef } from 'react';
import AdErrorBoundary from './AdErrorBoundary';
import { ADSENSE_PUBLISHER_ID } from './AdSense';

/**
 * NewDisplayAd component
 * Displays a display ad unit using the exact code provided by Google AdSense
 */
const NewDisplayAd = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't try to load ads on the server side
    if (typeof window === 'undefined') return;

    // Wait a bit to ensure the ad script is loaded
    const timer = setTimeout(() => {
      try {
        // Initialize the ad
        // Use type assertion to avoid TypeScript errors
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense initialization error:', error);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <AdErrorBoundary>
      <div ref={adRef} className="my-8 text-center display-ad-section">
        {/* New Display Ad unit with the exact code provided by Google */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_PUBLISHER_ID}
          data-ad-slot="3084720492"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </AdErrorBoundary>
  );
};

export default NewDisplayAd;
