'use client';

import { useEffect, useRef, useState } from 'react';
import AdErrorBoundary from './AdErrorBoundary';
import { ADSENSE_PUBLISHER_ID } from './AdSense';

interface AdSenseAdUnitProps {
  adSlot: string;
  adFormat?: 'auto' | 'horizontal' | 'vertical' | 'rectangle' | 'fluid';
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
  layout?: 'in-article' | 'in-feed';
  position?: 'top' | 'middle' | 'bottom';
  loadOnlyWhenVisible?: boolean;
}

/**
 * Enhanced AdSense Ad Unit component
 * Provides better control over ad loading and placement
 */
const AdSenseAdUnit: React.FC<AdSenseAdUnitProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = { display: 'block' },
  className = '',
  layout,
  position,
  loadOnlyWhenVisible = true
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!loadOnlyWhenVisible);
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [adError, setAdError] = useState<Error | null>(null);

  // Check if the ad is visible in the viewport
  useEffect(() => {
    if (!loadOnlyWhenVisible || !adRef.current) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 } // 10% of the ad must be visible
    );

    observer.observe(adRef.current);

    return () => {
      observer.disconnect();
    };
  }, [loadOnlyWhenVisible]);

  // Load the ad when it becomes visible
  useEffect(() => {
    if (!isVisible || isAdLoaded || adError) return;

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
        ref={adRef} 
        className={`ad-container ${className}`}
        data-ad-status={isAdLoaded ? 'loaded' : isVisible ? 'loading' : 'pending'}
      >
        {isVisible && (
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
