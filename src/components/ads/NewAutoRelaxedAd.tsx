'use client';

import React from 'react';
import AdSenseAdUnit from './AdSenseAdUnit';

/**
 * NewAutoRelaxedAd component
 * Enhanced version of AutoRelaxedAd with improved styling and responsiveness
 */
const NewAutoRelaxedAd = () => {
  return (
    <div className="my-8 text-center">
      <AdSenseAdUnit
        adSlot="8367415889" // Auto-relaxed ad slot
        adFormat="autorelaxed"
        style={{ display: 'block', margin: '0 auto' }}
        className="rounded-lg shadow-sm overflow-hidden"
        loadOnlyWhenVisible={true}
      />
    </div>
  );
};

export default NewAutoRelaxedAd;
