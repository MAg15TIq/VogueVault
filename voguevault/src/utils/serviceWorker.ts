/**
 * Service Worker Registration Utility
 * 
 * This utility handles the registration and management of the service worker
 * for caching and offline support.
 */

export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
}

export function unregisterServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}

/**
 * Check if the app is currently running in offline mode
 * @returns {boolean} True if the app is offline
 */
export function isOffline(): boolean {
  return typeof navigator !== 'undefined' && !navigator.onLine;
}

/**
 * Add event listeners for online/offline status changes
 * @param onOnline Callback for when the app goes online
 * @param onOffline Callback for when the app goes offline
 * @returns A cleanup function to remove the event listeners
 */
export function useOnlineStatus(
  onOnline: () => void,
  onOffline: () => void
): () => void {
  if (typeof window === 'undefined') {
    return () => {};
  }

  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);

  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
}

/**
 * Update the service worker when a new version is available
 */
export function updateServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.update();
      })
      .catch(error => {
        console.error('Service Worker update failed:', error);
      });
  }
}
