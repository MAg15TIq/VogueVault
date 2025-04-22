'use client';

import { useEffect, useState } from 'react';
import { registerServiceWorker, isOffline, useOnlineStatus } from '@/utils/serviceWorker';

export default function ServiceWorkerRegistration() {
  const [offlineMode, setOfflineMode] = useState(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);

  useEffect(() => {
    // Register service worker
    registerServiceWorker();
    
    // Check initial offline status
    setOfflineMode(isOffline());
    
    // Listen for service worker updates
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setShowUpdatePrompt(true);
      });
    }
  }, []);
  
  // Set up online/offline status listeners
  useOnlineStatus(
    () => setOfflineMode(false),
    () => setOfflineMode(true)
  );
  
  // Handle update prompt confirmation
  const handleUpdateConfirm = () => {
    setShowUpdatePrompt(false);
    window.location.reload();
  };

  return (
    <>
      {/* Offline notification */}
      {offlineMode && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-yellow-100 dark:bg-yellow-900 p-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-medium text-yellow-800 dark:text-yellow-200">You're offline</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">Some content may be unavailable</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Update prompt */}
      {showUpdatePrompt && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-primary-light dark:bg-primary-dark p-4 rounded-lg shadow-lg z-50 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <div>
                <h3 className="font-medium">Update available</h3>
                <p className="text-sm">Refresh to see the latest version</p>
              </div>
            </div>
            <button
              onClick={handleUpdateConfirm}
              className="ml-4 px-3 py-1 bg-white text-primary rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
}
