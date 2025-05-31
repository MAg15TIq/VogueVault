'use client';

import Script from 'next/script';

/**
 * GoogleAnalytics component
 * Properly loads Google Analytics using Next.js Script component
 * This ensures the script loads and executes correctly in both development and production
 */
const GoogleAnalytics = () => {
  const GA_TRACKING_ID = 'G-P2ESQDLDPG';

  return (
    <>
      {/* Google Analytics gtag script */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="google-analytics-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics;
