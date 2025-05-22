'use client';

import React from 'react';
import AdSenseAdUnit from './AdSenseAdUnit';

/**
 * AutoRelaxedAd component
 * Displays an auto-relaxed format ad using Google AdSense
 * This format is optimized for in-content placement
 */
const AutoRelaxedAd = () => {
  return (
    <div className="my-8 text-center">
      <AdSenseAdUnit
        adSlot="8367415889" // Auto-relaxed ad slot
        adFormat="autorelaxed"
        style={{ display: 'block' }}
        loadOnlyWhenVisible={true}
      />
    </div>
  );
};

export default AutoRelaxedAd;
