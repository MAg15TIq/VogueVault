'use client';

import { CustomCursor, MobileNavigation, TouchGestures } from "../components/ClientComponents";
import { ThemeProvider } from "../context/ThemeContext";
import ServiceWorkerRegistration from "./ServiceWorkerRegistration";
import { AdSenseScript, GrowByMediavine } from "../components/ads";
import { WebsiteStructuredData, LocalBusinessStructuredData } from "../components/seo";
import CookieConsent from "../components/ui/CookieConsent";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ServiceWorkerRegistration />
      <AdSenseScript />
      <GrowByMediavine />
      <WebsiteStructuredData
        siteName="VogueVault"
        siteUrl={typeof window !== 'undefined' ? window.location.origin : 'https://voguevault.com'}
      />
      <LocalBusinessStructuredData
        name="VogueVault"
        description="Your premier destination for fashion trends, lifestyle tips, and cultural insights."
        url={typeof window !== 'undefined' ? window.location.origin : 'https://voguevault.com'}
        logoUrl={typeof window !== 'undefined' ? `${window.location.origin}/images/logo.png` : 'https://voguevault.com/images/logo.png'}
        email="info@voguevault.com"
        sameAs={[
          'https://twitter.com/voguevault',
          'https://facebook.com/voguevault',
          'https://instagram.com/voguevault',
          'https://pinterest.com/voguevault'
        ]}
      />
      <CustomCursor />
      <TouchGestures>{children}</TouchGestures>
      <MobileNavigation />
      <CookieConsent />
    </ThemeProvider>
  );
}
