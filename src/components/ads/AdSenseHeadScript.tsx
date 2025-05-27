'use client';

import Script from 'next/script';

/**
 * AdSenseHeadScript component
 * Loads the Google AdSense script in the head section
 * This is the official Google AdSense code that must be placed between the <head></head> tags
 * on each page of the site to enable Google AdSense ads.
 * Also includes Google Analytics tag (gtag.js)
 */
const AdSenseHeadScript = () => {
  return (
    <>
      {/* Google AdSense script */}
      <Script
        id="google-adsense-head"
        strategy="beforeInteractive"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5754219619080083"
        crossOrigin="anonymous"
      />
      
      {/* Google tag (gtag.js) */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-P2ESQDLDPG"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P2ESQDLDPG');
          `,
        }}
      />
    </>
  );
};

export default AdSenseHeadScript;
