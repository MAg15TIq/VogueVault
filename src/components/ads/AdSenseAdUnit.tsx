'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import AdErrorBoundary from './AdErrorBoundary';
import { ADSENSE_PUBLISHER_ID } from './AdSense';

interface AdSenseAdUnitProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
  layout?: string;
  position?: string;
  loadOnlyWhenVisible?: boolean;
}

/**
 * AdSenseAdUnit component
 * Enhanced version of AdSense component with lazy loading capability
 * Only loads the ad when it becomes visible in the viewport
 */
const AdSenseAdUnit: React.FC<AdSenseAdUnitProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = { display: 'block' },
  className = '',
  layout,
  position,
  loadOnlyWhenVisible = false
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [adError, setAdError] = useState<Error | null>(null);

  // Use intersection observer to detect when ad is visible
  const { ref: inViewRef, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  // Merge refs
  const setRefs = (node: HTMLDivElement | null) => {
    // For react-intersection-observer
    inViewRef(node);
    // For our local ref - no need to set it manually as React handles this
  };

  // Determine if we should show the ad
  const isVisible = loadOnlyWhenVisible ? inView : true;

  // Load the ad when it becomes visible
  useEffect(() => {
    if (!isVisible || isAdLoaded || adError) return;

    // Don't try to load ads on the server side
    if (typeof window === 'undefined') return;

    // Check if AdSense script is loaded
    const checkAdSenseLoaded = () => {
      return typeof window.adsbygoogle !== 'undefined';
    };

    // Function to initialize the ad
    const initializeAd = () => {
      try {
        // Initialize the ad
        // @ts-ignore - adsbygoogle is added by the external script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
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
  }, [isVisible, isAdLoaded, adError]);

  // If there's an error, return null or a fallback
  if (adError) {
    return null;
  }

  // Prepare additional attributes based on layout
  const additionalAttributes: Record<string, string> = {};

  if (layout) {
    additionalAttributes['data-ad-layout'] = layout;
  }

  if (position) {
    additionalAttributes['data-ad-layout-position'] = position;
  }

  return (
    <AdErrorBoundary>
      <div
        ref={setRefs}
        className={`ad-container ${className}`}
        data-ad-status={isAdLoaded ? 'loaded' : isVisible ? 'loading' : 'pending'}
      >
        {isVisible && typeof window !== 'undefined' && (
          <ins
            className="adsbygoogle"
            style={style}
            data-ad-client={ADSENSE_PUBLISHER_ID}
            data-ad-slot={adSlot}
            data-ad-format={adFormat}
            data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
            {...additionalAttributes}
          />
        )}
      </div>
    </AdErrorBoundary>
  );
};

export default AdSenseAdUnit;
