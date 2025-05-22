'use client';

import Script from 'next/script';

/**
 * AdSenseScript component
 * Loads the Google AdSense script for the entire application
 * Should be included in the layout or a high-level component
 */
const AdSenseScript = () => {
  return (
    <Script
      id="google-adsense"
      strategy="afterInteractive"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5754219619080083"
      crossOrigin="anonymous"
    />
  );
};

export default AdSenseScript;
