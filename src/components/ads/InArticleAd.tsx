'use client';

import AdSenseAdUnit from './AdSenseAdUnit';

/**
 * InArticleAd component
 * Displays an ad within article content
 * Uses a dedicated ad slot for in-article ads
 */
const InArticleAd = () => {
  return (
    <div className="my-8 text-center">
      <AdSenseAdUnit
        adSlot="4567890123" // Replace with your actual in-article ad slot
        adFormat="fluid"
        layout="in-article"
        style={{ display: 'block' }}
        loadOnlyWhenVisible={true}
      />
    </div>
  );
};

export default InArticleAd;
