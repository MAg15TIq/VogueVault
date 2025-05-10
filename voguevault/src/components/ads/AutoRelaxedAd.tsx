'use client';

import { useEffect, useRef, useState } from 'react';
import AdErrorBoundary from './AdErrorBoundary';
import { ADSENSE_PUBLISHER_ID } from './AdSense';

/**
 * AutoRelaxedAd component
 * Displays an autorelaxed format ad unit
 * This is a special format that automatically adapts to the available space
 * and shows multiple ads in a relaxed, content-friendly format
 */
const AutoRelaxedAd = () => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [adError, setAdError] = useState<Error | null>(null);

  useEffect(() => {
    // Don't try to load ads on the server side
    if (typeof window === 'undefined') return;

    // Wait a bit to ensure the ad script is loaded
    const timer = setTimeout(() => {
      try {
        // Initialize the ad
        // @ts-ignore - adsbygoogle is added by the external script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setIsAdLoaded(true);
      } catch (error) {
        console.error('AutoRelaxedAd initialization error:', error);
        setAdError(error instanceof Error ? error : new Error('Failed to load ad'));
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // If there's an error, return null or a fallback
  if (adError) {
    return null;
  }

  return (
    <AdErrorBoundary>
      <div ref={adRef} className="ad-container autorelaxed-container my-8 text-center">
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

export default AutoRelaxedAd;
