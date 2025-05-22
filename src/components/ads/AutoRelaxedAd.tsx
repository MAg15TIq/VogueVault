'use client';

import React from 'react';

/**
 * AutoRelaxedAd component
 * This component has been modified to return null as Google AdSense has been removed.
 * Kept for backward compatibility to prevent import errors.
 */
const AutoRelaxedAd = () => {
  // Return an empty div to maintain layout but not load any ads
  return (
    <div style={{ display: 'none' }}>
      {/* AdSense has been removed */}
    </div>
  );
};

export default AutoRelaxedAd;
