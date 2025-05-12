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

    // Wait a bit to ensure the ad script is loaded
    const timer = setTimeout(() => {
      try {
        // Initialize the ad
        // @ts-ignore - adsbygoogle is added by the external script
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setIsAdLoaded(true);
      } catch (error) {
        console.error('AdSense initialization error:', error);
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
