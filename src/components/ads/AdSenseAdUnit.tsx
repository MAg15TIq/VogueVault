'use client';

import React from 'react';
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
 * This component has been modified to return null as Google AdSense has been removed.
 * Kept for backward compatibility to prevent import errors.
 */
const AdSenseAdUnit: React.FC<AdSenseAdUnitProps> = ({
  className = ''
}) => {
  // Return an empty div to maintain layout but not load any ads
  return (
    <div className={`ad-container ${className}`} style={{ display: 'none' }}>
      {/* AdSense has been removed */}
    </div>
  );
};

export default AdSenseAdUnit;
