'use client';

import { useEffect, useState } from 'react';
import { debugGA, isGAAvailable, trackEvent, GA_TRACKING_ID } from '@/lib/analytics';

interface AnalyticsStatus {
  gtagAvailable: boolean;
  dataLayerAvailable: boolean;
  trackingId: string;
  currentUrl: string;
  pageTitle: string;
  dataLayerLength: number;
}

/**
 * AnalyticsDebugger component
 * Only shows in development mode to help debug Google Analytics implementation
 */
const AnalyticsDebugger = () => {
  const [status, setStatus] = useState<AnalyticsStatus | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    const checkStatus = () => {
      if (typeof window !== 'undefined') {
        setStatus({
          gtagAvailable: typeof window.gtag === 'function',
          dataLayerAvailable: Array.isArray(window.dataLayer),
          trackingId: GA_TRACKING_ID,
          currentUrl: window.location.href,
          pageTitle: document.title,
          dataLayerLength: window.dataLayer ? window.dataLayer.length : 0,
        });
      }
    };

    // Check immediately and then every 2 seconds
    checkStatus();
    const interval = setInterval(checkStatus, 2000);

    return () => clearInterval(interval);
  }, []);

  // Don't render in production
  if (process.env.NODE_ENV !== 'development' || !status) {
    return null;
  }

  const testEvent = () => {
    trackEvent('test_event', 'debug', 'analytics_debugger');
    alert('Test event sent! Check your browser console and Google Analytics Real-Time reports.');
  };

  const runDebug = () => {
    debugGA();
    alert('Debug info logged to console. Check your browser developer tools.');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isVisible ? (
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-sm"
          title="Google Analytics Debug Info"
        >
          GA Debug
        </button>
      ) : (
        <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-4 max-w-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-semibold text-gray-800">GA Debug</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span>gtag:</span>
              <span className={status.gtagAvailable ? 'text-green-600' : 'text-red-600'}>
                {status.gtagAvailable ? '✓' : '✗'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>dataLayer:</span>
              <span className={status.dataLayerAvailable ? 'text-green-600' : 'text-red-600'}>
                {status.dataLayerAvailable ? `✓ (${status.dataLayerLength})` : '✗'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Tracking ID:</span>
              <span className="text-blue-600 font-mono">{status.trackingId}</span>
            </div>
            
            <div className="border-t pt-2 mt-2">
              <div className="text-gray-600 mb-1">Current Page:</div>
              <div className="text-gray-800 font-mono text-xs break-all">
                {status.pageTitle}
              </div>
            </div>
            
            <div className="border-t pt-2 mt-2 space-y-1">
              <button
                onClick={testEvent}
                className="w-full bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700"
              >
                Send Test Event
              </button>
              
              <button
                onClick={runDebug}
                className="w-full bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700"
              >
                Log Debug Info
              </button>
            </div>
            
            <div className="text-xs text-gray-500 mt-2">
              Check Real-Time reports in GA4 dashboard
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDebugger;
