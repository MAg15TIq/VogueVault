'use client';

import AdSense from './AdSense';

const InArticleAd = () => {
  return (
    <div className="my-8 text-center">
      <AdSense 
        adSlot="7440692602" 
        adFormat="fluid"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default InArticleAd;
