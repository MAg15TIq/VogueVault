'use client';

import AdSenseAdUnit from './AdSenseAdUnit';

/**
 * AutoRelaxedAd component
 * Displays an autorelaxed format ad unit
 * This is a special format that automatically adapts to the available space
 * and shows multiple ads in a relaxed, content-friendly format
 */
const AutoRelaxedAd = () => {
  return (
    <div className="my-8 text-center autorelaxed-ad-section">
      <AdSenseAdUnit
        adSlot="8367415889" // Auto relaxed ad slot
        adFormat="autorelaxed"
        style={{ display: 'block' }}
        loadOnlyWhenVisible={true}
      />
    </div>
  );
};

export default AutoRelaxedAd;
