'use client';

import { useEffect, useRef } from 'react';
import AdErrorBoundary from './AdErrorBoundary';
import { ADSENSE_PUBLISHER_ID } from './AdSense';

/**
 * NewAutoRelaxedAd component
 * Displays an autorelaxed format ad unit using the exact code provided by Google AdSense
 * This format automatically adapts to the available space and shows multiple ads in a content-friendly format
 */
const NewAutoRelaxedAd = () => {
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
      <div ref={adRef} className="my-8 text-center autorelaxed-ad-section">
        {/* AutoRelaxed Ad unit with the exact code provided by Google */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="autorelaxed"
          data-ad-client={ADSENSE_PUBLISHER_ID}
          data-ad-slot="8367415889"
        />
      </div>
    </AdErrorBoundary>
  );
};

export default NewAutoRelaxedAd;
