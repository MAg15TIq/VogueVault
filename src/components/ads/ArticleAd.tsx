'use client';

import AdSense from './AdSense';

/**
 * ArticleAd component
 * Displays an ad at the bottom of articles
 * Uses a dedicated ad slot for article bottom ads
 */
const ArticleAd = () => {
  return (
    <div className="my-6 text-center">
      <AdSense
        adSlot="1234567890" // Article bottom ad slot
        adFormat="auto"
        style={{ display: 'block', minHeight: '250px' }}
      />
    </div>
  );
};

export default ArticleAd;
