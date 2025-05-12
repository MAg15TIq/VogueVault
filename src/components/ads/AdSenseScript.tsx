'use client';

import Script from 'next/script';
import { ADSENSE_PUBLISHER_ID } from './AdSense';

/**
 * AdSenseScript component
 * Loads the Google AdSense script once for the entire application
 * Should be included in the layout or a high-level component
 *
 * This is the single source of truth for AdSense integration
 */
const AdSenseScript = () => {
  return (
    <>
      {/* AdSense script */}
      <Script
        id="google-adsense-script"
        strategy="afterInteractive"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
        crossOrigin="anonymous"
        onError={(e) => {
          console.error('AdSense script failed to load:', e);
        }}
      />
    </>
  );
};

export default AdSenseScript;
