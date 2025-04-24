'use client';

import AdSense from './AdSense';

const SidebarAd = () => {
  return (
    <div className="my-4 text-center">
      <AdSense 
        adSlot="7440692602" 
        adFormat="rectangle"
        fullWidthResponsive={false}
        style={{ display: 'inline-block', width: '300px', height: '250px' }}
      />
    </div>
  );
};

export default SidebarAd;
