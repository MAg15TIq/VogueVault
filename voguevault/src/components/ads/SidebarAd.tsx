'use client';

import AdSense from './AdSense';

/**
 * SidebarAd component
 * Displays a rectangular ad in the sidebar
 * Uses a dedicated ad slot for sidebar ads
 */
const SidebarAd = () => {
  return (
    <div className="my-4 text-center">
      <AdSense
        adSlot="3456789012" // Replace with your actual sidebar ad slot
        adFormat="rectangle"
        fullWidthResponsive={false}
        style={{ display: 'inline-block', width: '300px', height: '250px' }}
      />
    </div>
  );
};

export default SidebarAd;
