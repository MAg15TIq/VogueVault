'use client';

import React from 'react';
import AdSense from './AdSense';

/**
 * DisplayAd component
 * Displays a standard display ad using Google AdSense
 */
const DisplayAd = () => {
  return (
    <div className="my-6 text-center">
      <AdSense
        adSlot="3084720492" // Display ad slot
        adFormat="auto"
        style={{ display: 'block', minHeight: '250px' }}
      />
    </div>
  );
};

export default DisplayAd;
