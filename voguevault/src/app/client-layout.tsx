'use client';

import { CustomCursor, MobileNavigation, TouchGestures } from "../components/ClientComponents";
import { ThemeProvider } from "../context/ThemeContext";
import ServiceWorkerRegistration from "./ServiceWorkerRegistration";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ServiceWorkerRegistration />
      <CustomCursor />
      <TouchGestures>{children}</TouchGestures>
      <MobileNavigation />
    </ThemeProvider>
  );
}
