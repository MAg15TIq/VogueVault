'use client';

import AdSenseAdUnit from './AdSenseAdUnit';

const InArticleAd = () => {
  return (
    <div className="my-8 text-center">
      <AdSenseAdUnit
        adSlot="7440692602"
        adFormat="fluid"
        layout="in-article"
        style={{ display: 'block' }}
        loadOnlyWhenVisible={true}
      />
    </div>
  );
};

export default InArticleAd;
