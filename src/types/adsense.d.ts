// Type definitions for Google AdSense and Google Analytics
interface Window {
  adsbygoogle: any[];
  gtag: (...args: any[]) => void;
  dataLayer: any[];
}
