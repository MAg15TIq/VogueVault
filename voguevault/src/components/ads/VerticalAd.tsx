'use client';

import AdSense from './AdSense';

const VerticalAd = () => {
  return (
    <div className="my-6 text-center">
      <AdSense 
        adSlot="7440692602" 
        adFormat="vertical"
        style={{ display: 'block', minHeight: '600px' }}
      />
    </div>
  );
};

export default VerticalAd;
