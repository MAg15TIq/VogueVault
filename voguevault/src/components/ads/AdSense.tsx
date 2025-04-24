'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
}

const AdSense: React.FC<AdSenseProps> = ({
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true,
  style = { display: 'block' }
}) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add meta tag for verification
    const meta = document.createElement('meta');
    meta.name = 'google-adsense-account';
    meta.content = 'ca-pub-8215873816542659';
    document.head.appendChild(meta);

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }

    return () => {
      // Cleanup
      if (document.head.contains(meta)) {
        document.head.removeChild(meta);
      }
    };
  }, []);

  return (
    <>
      <Script
        id="google-adsense-script"
        strategy="afterInteractive"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8215873816542659"
        crossOrigin="anonymous"
        onLoad={() => {
          console.log('AdSense script loaded successfully');
        }}
      />
      <div ref={adRef}>
        <ins
          className="adsbygoogle"
          style={style}
          data-ad-client="ca-pub-8215873816542659"
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
        />
      </div>
    </>
  );
};

export default AdSense;
