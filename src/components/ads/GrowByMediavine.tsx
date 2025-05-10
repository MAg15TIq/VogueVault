'use client';

import Script from 'next/script';

/**
 * GrowByMediavine component
 * Loads the Grow by Mediavine script for additional ad monetization
 * Should be included in the layout or a high-level component
 */
const GrowByMediavine = () => {
  return (
    <Script
      id="grow-by-mediavine-script"
      strategy="afterInteractive"
      async
      src="https://growbymediavine.com/embedder/embedder.js?v=1.0.0"
      data-grow-id="voguevault"
      onError={(e) => {
        console.error('Grow by Mediavine script failed to load:', e);
      }}
    />
  );
};

export default GrowByMediavine;
