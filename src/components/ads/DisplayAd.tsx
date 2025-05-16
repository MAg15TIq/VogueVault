'use client';

import { useEffect, useRef, useState } from 'react';
import { ADSENSE_PUBLISHER_ID } from './AdSense';
import AdErrorBoundary from './AdErrorBoundary';

/**
 * DisplayAd component
 * Displays a new display ad unit
 * Uses the exact code snippet provided by Google AdSense
 */
const DisplayAd = () => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [adError, setAdError] = useState<Error | null>(null);

  useEffect(() => {
    // Don't try to load ads on the server side
    if (typeof window === 'undefined') return;

    // Check if AdSense script is loaded
    const checkAdSenseLoaded = () => {
      return typeof (window as any).adsbygoogle !== 'undefined';
    };

    // Function to initialize the ad
    const initializeAd = () => {
      try {
        // Initialize the ad
        // Use type assertion to avoid TypeScript errors
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        setIsAdLoaded(true);
      } catch (error) {
        console.error('AdSense initialization error:', error);
        setAdError(error instanceof Error ? error : new Error('Failed to load ad'));
      }
    };

    // If AdSense is already loaded, initialize immediately
    if (checkAdSenseLoaded()) {
      initializeAd();
      return;
    }

    // Otherwise, wait for it to load with a longer timeout
    const timer = setTimeout(() => {
      if (checkAdSenseLoaded()) {
        initializeAd();
      } else {
        console.warn('AdSense script not loaded after timeout');
        // Try one more time after a longer delay
        const retryTimer = setTimeout(() => {
          if (checkAdSenseLoaded()) {
            initializeAd();
          } else {
            console.error('AdSense script failed to load');
            setAdError(new Error('AdSense script failed to load'));
          }
        }, 2000); // 2 second retry

        return () => {
          clearTimeout(retryTimer);
        };
      }
    }, 500); // Increased from 100ms to 500ms

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // If there's an error, return null or a fallback
  if (adError) {
    return (
      <div className="my-8 text-center">
        <div className="p-4 bg-muted/30 rounded-md">
          <p className="text-sm text-muted-foreground">Ad could not be loaded</p>
        </div>
      </div>
    );
  }

  return (
    <AdErrorBoundary>
      <div
        ref={adRef}
        className="my-8 text-center display-ad-section"
        data-ad-status={isAdLoaded ? 'loaded' : 'loading'}
      >
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
