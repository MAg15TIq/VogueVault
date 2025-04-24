'use client';

import AdSense from './AdSense';

const HorizontalAd = () => {
  return (
    <div className="my-6 text-center">
      <AdSense 
        adSlot="7440692602" 
        adFormat="horizontal"
        style={{ display: 'block', textAlign: 'center' }}
      />
    </div>
  );
};

export default HorizontalAd;
