/**
 * Utility functions for ad management and tracking
 */

import { trackAdImpression as gaTrackAdImpression, trackAdClick as gaTrackAdClick } from './analytics';

/**
 * Track ad impressions
 * Sends data to Google Analytics and logs to console in development
 *
 * @param adType The type of ad that was displayed
 * @param adSlot The ad slot ID
 * @param location The location on the page where the ad was displayed
 */
export const trackAdImpression = (adType: string, adSlot: string, location: string) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Ad Impression: ${adType} (${adSlot}) at ${location}`);
  }

  // Send to Google Analytics
  gaTrackAdImpression(adType, adSlot, location);
};

/**
 * Track ad clicks
 * Sends data to Google Analytics and logs to console in development
 *
 * @param adType The type of ad that was clicked
 * @param adSlot The ad slot ID
 * @param location The location on the page where the ad was clicked
 */
export const trackAdClick = (adType: string, adSlot: string, location: string) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Ad Click: ${adType} (${adSlot}) at ${location}`);
  }

  // Send to Google Analytics
  gaTrackAdClick(adType, adSlot, location);
};

/**
 * Check if ad blockers are likely being used
 * This is a simple implementation that checks if the AdSense script loaded
 * 
 * @returns Promise that resolves to true if ad blockers are likely being used
 */
export const checkAdBlockers = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    
    // Set a timeout to check if the AdSense script loaded
    const timeout = setTimeout(() => {
      // If adsbygoogle is not defined after timeout, ad blockers are likely being used
      resolve(!(window as any).adsbygoogle);
    }, 2000);
    
    // If adsbygoogle is already defined, ad blockers are not being used
    if ((window as any).adsbygoogle) {
      clearTimeout(timeout);
      resolve(false);
    }
  });
};

/**
 * Get optimal ad density based on content length
 * This helps ensure you're not showing too many ads for the amount of content
 * 
 * @param contentLength The length of the content in characters
 * @returns The recommended number of ads to display
 */
export const getOptimalAdDensity = (contentLength: number): number => {
  // A simple algorithm to determine optimal ad density
  // Adjust these values based on your content and user experience goals
  if (contentLength < 1000) {
    return 1; // Very short content, just one ad
  } else if (contentLength < 3000) {
    return 2; // Medium content, two ads
  } else if (contentLength < 6000) {
    return 3; // Longer content, three ads
  } else {
    return 4; // Very long content, four ads
  }
};

/**
 * Calculate the optimal positions for ads within content
 * This helps distribute ads evenly throughout the content
 * 
 * @param contentLength The length of the content in characters
 * @param numAds The number of ads to display
 * @returns An array of positions (as percentages) where ads should be placed
 */
export const calculateAdPositions = (contentLength: number, numAds: number): number[] => {
  const positions: number[] = [];
  
  // Always place an ad at the end
  if (numAds === 1) {
    positions.push(100);
  } else {
    // Distribute ads evenly, but not at the very beginning
    const interval = 100 / (numAds + 1);
    for (let i = 1; i <= numAds; i++) {
      positions.push(interval * i);
    }
  }
  
  return positions;
};
