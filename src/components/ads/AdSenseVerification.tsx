'use client';

/**
 * AdSenseVerification component
 * This component is deprecated and no longer loads the AdSense script
 * to avoid duplicate script loading.
 *
 * The AdSenseScript component is now loaded directly in the layout.tsx file.
 * This component is kept for backward compatibility but doesn't render anything.
 */
export default function AdSenseVerification() {
  // Return null to avoid duplicate script loading
  return null;
}
