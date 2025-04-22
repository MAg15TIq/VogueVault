'use client';

import { useRef, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSwipe } from '@/hooks/useSwipe';
import { articles } from '@/data/articles';

interface TouchGesturesProps {
  children: React.ReactNode;
  enableSwipeNavigation?: boolean;
  enablePullToRefresh?: boolean;
  enableDoubleTapZoom?: boolean;
}

const TouchGestures = ({
  children,
  enableSwipeNavigation = true,
  enablePullToRefresh = true,
  enableDoubleTapZoom = true,
}: TouchGesturesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [refreshing, setRefreshing] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const [zoomedIn, setZoomedIn] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // Handle swipe gestures
  const { direction } = useSwipe(containerRef, {
    threshold: 100,
    onSwipeLeft: () => {
      if (!enableSwipeNavigation) return;

      // Handle swipe left (next article)
      if (pathname.startsWith('/articles/')) {
        const slug = pathname.split('/').pop();
        const currentArticleIndex = articles.findIndex(article => article.slug === slug);

        if (currentArticleIndex !== -1 && currentArticleIndex < articles.length - 1) {
          const nextArticle = articles[currentArticleIndex + 1];
          router.push(`/articles/${nextArticle.slug}`);
        }
      }
    },
    onSwipeRight: () => {
      if (!enableSwipeNavigation) return;

      // Handle swipe right (previous article)
      if (pathname.startsWith('/articles/')) {
        const slug = pathname.split('/').pop();
        const currentArticleIndex = articles.findIndex(article => article.slug === slug);

        if (currentArticleIndex > 0) {
          const prevArticle = articles[currentArticleIndex - 1];
          router.push(`/articles/${prevArticle.slug}`);
        }
      }
    },
    onSwipeDown: () => {
      if (!enablePullToRefresh) return;

      // Only trigger pull-to-refresh if at the top of the page
      if (window.scrollY < 10) {
        handlePullToRefresh();
      }
    },
  });

  // Handle pull-to-refresh
  const handlePullToRefresh = () => {
    setRefreshing(true);

    // Simulate refresh
    setTimeout(() => {
      window.location.reload();
      setRefreshing(false);
    }, 1000);
  };

  // Handle double tap to zoom
  const handleTap = (e: React.TouchEvent) => {
    if (!enableDoubleTapZoom) return;

    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
      // Double tap detected
      e.preventDefault();

      if (!zoomedIn) {
        // Zoom in
        const touch = e.touches[0];
        setZoomPosition({
          x: touch.clientX,
          y: touch.clientY,
        });
        setZoomedIn(true);
      } else {
        // Zoom out
        setZoomedIn(false);
      }
    }

    setLastTap(currentTime);
  };

  // Reset zoom when navigating
  useEffect(() => {
    setZoomedIn(false);
  }, [pathname]);

  return (
    <div
      ref={containerRef}
      className={`touch-gestures-container relative ${zoomedIn ? 'overflow-hidden' : ''}`}
      onTouchStart={handleTap}
    >
      {/* Pull-to-refresh indicator */}
      {refreshing && (
        <div className="fixed top-0 left-0 right-0 flex justify-center items-center h-16 bg-white dark:bg-neutral-900 z-50">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
          <span className="ml-2 text-sm">Refreshing...</span>
        </div>
      )}

      {/* Swipe navigation indicators */}
      {direction === 'left' && enableSwipeNavigation && (
        <div className="fixed top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 z-50 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}

      {direction === 'right' && enableSwipeNavigation && (
        <div className="fixed top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-3 z-50 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      )}

      {/* Zoomed content */}
      {zoomedIn ? (
        <div
          className="fixed inset-0 bg-white dark:bg-neutral-900 z-50 overflow-auto"
          style={{
            transformOrigin: `${zoomPosition.x}px ${zoomPosition.y}px`,
            transform: 'scale(2)',
          }}
          onClick={() => setZoomedIn(false)}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default TouchGestures;
