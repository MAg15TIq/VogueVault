'use client';

import React, { useEffect, useRef, useState } from 'react';
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
 * Enhanced version of AdSense component with additional features
 * like lazy loading and layout options
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
  const [isVisible, setIsVisible] = useState(!loadOnlyWhenVisible);

  useEffect(() => {
    if (loadOnlyWhenVisible && adRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(adRef.current);
      return () => observer.disconnect();
    }
  }, [loadOnlyWhenVisible]);

  useEffect(() => {
    if (isVisible) {
      try {
        // Initialize the ad
        // Use type assertion to avoid TypeScript errors
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense initialization error:', error);
      }
    }
  }, [isVisible]);

  return (
    <div ref={adRef} className={`ad-container ${className}`}>
      {isVisible && (
        <ins
          className="adsbygoogle"
          style={style}
          data-ad-client={ADSENSE_PUBLISHER_ID}
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-ad-layout={layout}
          data-ad-layout-key={position}
          data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
        />
      )}
    </div>
  );
};

export default AdSenseAdUnit;
