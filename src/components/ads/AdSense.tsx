'use client';

import React, { useEffect } from 'react';

// Export the publisher ID for use in other components
export const ADSENSE_PUBLISHER_ID = 'ca-pub-5754219619080083';

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * AdSense component
 * Displays Google AdSense ads
 */
const AdSense: React.FC<AdSenseProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = { display: 'block' },
  className = ''
}) => {
  useEffect(() => {
    try {
      // Initialize the ad
      // Use type assertion to avoid TypeScript errors
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense initialization error:', error);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default AdSense;
