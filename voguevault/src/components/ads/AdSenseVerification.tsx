'use client';

import { ADSENSE_PUBLISHER_ID } from './AdSense';
import AdSenseScript from './AdSenseScript';

/**
 * AdSenseVerification component
 * This is a wrapper around AdSenseScript for backward compatibility
 * New code should use AdSenseScript directly
 */
export default function AdSenseVerification() {
  return <AdSenseScript />;
}
