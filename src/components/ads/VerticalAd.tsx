'use client';

import AdSense from './AdSense';

/**
 * VerticalAd component
 * Displays a vertical banner ad
 * Uses a dedicated ad slot for vertical banner ads
 */
const VerticalAd = () => {
  return (
    <div className="my-6 text-center">
      <AdSense
        adSlot="3456789012" // Vertical ad slot
        adFormat="vertical"
        style={{ display: 'block', minHeight: '600px' }}
      />
    </div>
  );
};

export default VerticalAd;
