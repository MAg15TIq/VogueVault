'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function GrowByMediavine() {
  return (
    <Script
      id="grow-by-mediavine"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !(function(){
            window.growMe||((window.growMe=function(e){window.growMe._.push(e);}),(window.growMe._=[]));
            var e=document.createElement("script");
            (e.type="text/javascript"),
            (e.src="https://faves.grow.me/main.js"),
            (e.defer=!0),
            e.setAttribute("data-grow-faves-site-id","U2l0ZTo0OTU5ZjE0OC04NDJlLTRmZTctOTc5NS0wYjAwNTM4NWM2Yzk=");
            var t=document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e,t);
          })();
        `
      }}
    />
  );
}
