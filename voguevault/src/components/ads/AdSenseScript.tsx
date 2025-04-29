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
      {/* Meta tag for AdSense verification */}
      <meta name="google-adsense-account" content={ADSENSE_PUBLISHER_ID} />

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

      {/* AdSense Auto Ads - Enable this if you want to use Auto Ads */}
      {/*
      <Script
        id="adsense-auto-ads"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "${ADSENSE_PUBLISHER_ID}",
              enable_page_level_ads: true
            });
          `
        }}
      />
      */}
    </>
  );
};

export default AdSenseScript;
