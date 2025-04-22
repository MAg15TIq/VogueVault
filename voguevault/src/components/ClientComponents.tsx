'use client';

import dynamic from 'next/dynamic';

// Dynamically import components to avoid SSR issues
export const CustomCursor = dynamic(() => import("./ui/CustomCursor"), {
  ssr: false,
});

export const MobileNavigation = dynamic(() => import("./layout/MobileNavigation"), {
  ssr: false,
});

export const TouchGestures = dynamic(() => import("./features/TouchGestures"), {
  ssr: false,
});
