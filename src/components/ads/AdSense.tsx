'use client';

import React from 'react';

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
 * This component has been modified to return null as Google AdSense has been removed.
 * Kept for backward compatibility to prevent import errors.
 */
const AdSense: React.FC<AdSenseProps> = ({
  className = ''
}) => {
  // Return an empty div to maintain layout but not load any ads
  return (
    <div className={`ad-container ${className}`} style={{ display: 'none' }}>
      {/* AdSense has been removed */}
    </div>
  );
};

export default AdSense;
