'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import AdErrorBoundary from './AdErrorBoundary';

// Publisher ID should be defined as a constant for easy updates
export const ADSENSE_PUBLISHER_ID = 'ca-pub-8215873816542659';

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * AdSense component for displaying Google AdSense ads
 * Includes error handling and performance optimizations
 */
const AdSense: React.FC<AdSenseProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = { display: 'block' },
  className = ''
}) => {
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
        // adsbygoogle is added by the external script
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
    return null;
  }

  return (
    <AdErrorBoundary>
      <div ref={adRef} className={`ad-container ${className}`}>
        {typeof window !== 'undefined' && (
          <ins
            className="adsbygoogle"
            style={style}
            data-ad-client={ADSENSE_PUBLISHER_ID}
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
          />
        )}
      </div>
    </AdErrorBoundary>
  );
};

export default AdSense;
