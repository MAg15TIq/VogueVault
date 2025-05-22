'use client';

import Script from 'next/script';

/**
 * AdSenseScript component
 * Loads the Google AdSense script for the entire application
 * Should be included in the layout or a high-level component
 *
 * This script must be placed between the <head></head> tags on each page of the site
 * to enable Google AdSense ads.
 */
const AdSenseScript = () => {
  return (
    <Script
      id="google-adsense"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (adsbygoogle = window.adsbygoogle || []).push({});
        `,
      }}
    />
  );
};

export default AdSenseScript;
