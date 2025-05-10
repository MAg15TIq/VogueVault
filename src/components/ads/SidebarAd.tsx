'use client';

import AdSense from './AdSense';

/**
 * SidebarAd component
 * Displays an ad in the sidebar
 * Uses a dedicated ad slot for sidebar ads
 */
const SidebarAd = () => {
  return (
    <div className="my-6 text-center">
      <AdSense
        adSlot="5678901234" // Replace with your actual sidebar ad slot
        adFormat="auto"
        style={{ display: 'block', minHeight: '250px' }}
      />
    </div>
  );
};

export default SidebarAd;
