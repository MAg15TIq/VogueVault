'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function AdSenseVerification() {
  useEffect(() => {
    // Create and inject the AdSense verification script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8215873816542659';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    // Create and inject the meta tag
    const meta = document.createElement('meta');
    meta.name = 'google-adsense-account';
    meta.content = 'ca-pub-8215873816542659';
    document.head.appendChild(meta);

    return () => {
      // Cleanup function
      document.head.removeChild(script);
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <>
      <Script
        id="google-adsense"
        strategy="afterInteractive"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8215873816542659"
        crossOrigin="anonymous"
      />
      <div style={{ display: 'none' }}>
        <meta name="google-adsense-account" content="ca-pub-8215873816542659" />
      </div>
    </>
  );
}
