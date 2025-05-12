'use client';

import Script from 'next/script';

/**
 * GrowMeScript component
 * Loads the Grow by Mediavine script once for the entire application
 * Should be included in the layout or a high-level component
 */
const GrowMeScript = () => {
  return (
    <>
      {/* Grow by Mediavine script */}
      <Script
        id="grow-me-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !(function(){
              window.growMe||((window.growMe=function(e){window.growMe._.push(e);}),(window.growMe._=[]));
              var e=document.createElement("script");
              (e.type="text/javascript"),
              (e.src="https://faves.grow.me/main.js"),
              (e.defer=!0),
              e.setAttribute("data-grow-faves-site-id","U2l0Z");
              document.head.appendChild(e);
            })();
          `,
        }}
      />
    </>
  );
};

export default GrowMeScript;
