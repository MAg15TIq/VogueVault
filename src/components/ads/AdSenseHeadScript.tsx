'use client';

import Script from 'next/script';

/**
 * AdSenseHeadScript component
 * Loads the Google AdSense script in the head section
 * This is the official Google AdSense code that must be placed between the <head></head> tags
 * on each page of the site to enable Google AdSense ads.
 */
const AdSenseHeadScript = () => {
  return (
    <Script
      id="google-adsense-head"
      strategy="beforeInteractive"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5754219619080083"
      crossOrigin="anonymous"
    />
  );
};

export default AdSenseHeadScript;
