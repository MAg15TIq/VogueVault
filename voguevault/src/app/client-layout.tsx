'use client';

import { CustomCursor, MobileNavigation, TouchGestures } from "../components/ClientComponents";
import { ThemeProvider } from "../context/ThemeContext";
import ServiceWorkerRegistration from "./ServiceWorkerRegistration";
import AdSenseVerification from "../components/ads/AdSenseVerification";
import GrowByMediavine from "../components/ads/GrowByMediavine";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ServiceWorkerRegistration />
      <AdSenseVerification />
      <GrowByMediavine />
      <CustomCursor />
      <TouchGestures>{children}</TouchGestures>
      <MobileNavigation />
    </ThemeProvider>
  );
}
