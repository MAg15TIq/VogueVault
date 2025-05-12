'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import AdErrorBoundary from './AdErrorBoundary';
import { ADSENSE_PUBLISHER_ID } from './AdSense';
import { trackAdImpression } from '@/lib/adUtils';

interface EnhancedDisplayAdProps {
  adSlot?: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
  location?: string;
  loadDelay?: number;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

/**
 * EnhancedDisplayAd component
 * An improved version of the DisplayAd component with additional features:
 * - Impression tracking
 * - Configurable load delay
 * - Customizable ad slot
 * - Load/error callbacks
 * - Intersection observer for viewport detection
 */
const EnhancedDisplayAd = ({
  adSlot = "3084720492", // Default to the display ad slot
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = { display: 'block' },
  className = '',
  location = 'unknown',
  loadDelay = 100,
  onLoad,
  onError
}: EnhancedDisplayAdProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [adError, setAdError] = useState<Error | null>(null);
  const [hasTrackedImpression, setHasTrackedImpression] = useState(false);

  // Use intersection observer to detect when ad is visible
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.5, // Consider ad viewed when 50% visible
    triggerOnce: true,
  });

  // Merge refs
  const setRefs = (node: HTMLDivElement | null) => {
    // For react-intersection-observer
    inViewRef(node);
    // For our local ref
    if (node) {
      adRef.current = node;
    }
  };

  // Load the ad
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
        onLoad?.();
      } catch (error) {
        console.error('AdSense initialization error:', error);
        const err = error instanceof Error ? error : new Error('Failed to load ad');
        setAdError(err);
        onError?.(err);
      }
    }, loadDelay);

    return () => {
      clearTimeout(timer);
    };
  }, [loadDelay, onLoad, onError]);

  // Track impression when ad becomes visible
  useEffect(() => {
    if (inView && isAdLoaded && !hasTrackedImpression) {
      trackAdImpression('display', adSlot, location);
      setHasTrackedImpression(true);
    }
  }, [inView, isAdLoaded, hasTrackedImpression, adSlot, location]);

  // If there's an error, return null or a fallback
  if (adError) {
    return null;
  }

  return (
    <AdErrorBoundary>
      <div 
        ref={setRefs} 
        className={`my-8 text-center display-ad-section ${className}`}
        data-ad-status={isAdLoaded ? 'loaded' : 'loading'}
        data-ad-location={location}
      >
        {/* New Display Ad unit */}
        <ins
          className="adsbygoogle"
          style={style}
          data-ad-client={ADSENSE_PUBLISHER_ID}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
        />
      </div>
    </AdErrorBoundary>
  );
};

export default EnhancedDisplayAd;
