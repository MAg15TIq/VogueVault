import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google AdSense Verification Code */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8215873816542659"
          crossOrigin="anonymous"
        />
        {/* Inline AdSense verification code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8215873816542659"
              crossorigin="anonymous"></script>
            `
          }}
        />
        {/* Grow by Mediavine Script */}
        <script
          data-grow-initializer=""
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
        {/* Google Analytics Tag */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-20N2457PQ" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-20N2457PQ');
            `
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
