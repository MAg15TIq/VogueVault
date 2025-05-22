'use client';

import React from 'react';
import AdSense from './AdSense';

/**
 * NewDisplayAd component
 * Displays an enhanced display ad using Google AdSense
 * with improved styling and responsiveness
 */
const NewDisplayAd = () => {
  return (
    <div className="my-6 text-center">
      <AdSense
        adSlot="3084720492" // Display ad slot
        adFormat="auto"
        fullWidthResponsive={true}
        style={{ display: 'block', minHeight: '250px', margin: '0 auto' }}
        className="rounded-lg shadow-sm overflow-hidden"
      />
    </div>
  );
};

export default NewDisplayAd;
