'use client';

import Script from 'next/script';
import { ADSENSE_PUBLISHER_ID } from './AdSense';

/**
 * AdSenseScript component
 * Loads the Google AdSense script once for the entire application
 * Should be included in the layout or a high-level component
 *
 * This is the single source of truth for AdSense integration
 * Modified to prevent hydration errors
 */
const AdSenseScript = () => {
  return (
    <>
      {/* AdSense script - loaded in head as recommended by Google */}
      <Script
        id="google-adsense-script"
        strategy="lazyOnload" // Changed from beforeInteractive to lazyOnload to prevent hydration issues
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`}
        crossOrigin="anonymous"
        onError={(e) => {
          console.error('AdSense script failed to load:', e);
        }}
      />
      {/* AdSense auto ads code - enables automatic ad placement if configured in AdSense */}
      <Script
        id="google-adsense-auto-ads"
        strategy="lazyOnload" // Changed from afterInteractive to lazyOnload
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              if (typeof window !== 'undefined') {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
              }
            })();
          `
        }}
      />
    </>
  );
};

export default AdSenseScript;
