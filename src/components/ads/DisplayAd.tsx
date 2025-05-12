'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { ADSENSE_PUBLISHER_ID } from './AdSense';
import AdErrorBoundary from './AdErrorBoundary';

/**
 * DisplayAd component
 * Displays a new display ad unit
 * Uses the exact code snippet provided by Google AdSense
 */
const DisplayAd = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't try to load ads on the server side
    if (typeof window === 'undefined') return;

    // Wait a bit to ensure the ad script is loaded
    const timer = setTimeout(() => {
      try {
        // Initialize the ad
        // @ts-ignore - adsbygoogle is added by the external script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
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
        {/* New Display Ad unit */}
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

export default DisplayAd;
