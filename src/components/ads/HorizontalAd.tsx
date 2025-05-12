'use client';

import AdSense from './AdSense';

/**
 * HorizontalAd component
 * Displays a horizontal banner ad
 * Uses a dedicated ad slot for horizontal banner ads
 */
const HorizontalAd = () => {
  return (
    <div className="my-6 text-center">
      <AdSense
        adSlot="2345678901" // Horizontal ad slot
        adFormat="horizontal"
        style={{ display: 'block', textAlign: 'center', minHeight: '90px' }}
      />
    </div>
  );
};

export default HorizontalAd;
