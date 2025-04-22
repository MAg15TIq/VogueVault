'use client';

import { useState, useEffect, RefObject } from 'react';

interface SwipeOptions {
  threshold?: number;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

interface SwipeState {
  swiping: boolean;
  direction: string | null;
  startX: number;
  startY: number;
  startTime: number;
}

/**
 * A hook to detect swipe gestures on touch devices
 * @param ref Reference to the element to detect swipes on
 * @param options Configuration options for swipe detection
 * @returns An object with the current swipe state
 */
export function useSwipe(
  ref: RefObject<HTMLElement | null>,
  options: SwipeOptions = {}
) {
  const {
    threshold = 50,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  } = options;

  const [swipeState, setSwipeState] = useState<SwipeState>({
    swiping: false,
    direction: null,
    startX: 0,
    startY: 0,
    startTime: 0,
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      setSwipeState({
        swiping: true,
        direction: null,
        startX: touch.clientX,
        startY: touch.clientY,
        startTime: Date.now(),
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!swipeState.swiping) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - swipeState.startX;
      const deltaY = touch.clientY - swipeState.startY;
      const timeDiff = Date.now() - swipeState.startTime;

      // Only detect swipes that are fast enough (less than 300ms)
      if (timeDiff > 300) return;

      // Determine swipe direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (Math.abs(deltaX) > threshold) {
          const direction = deltaX > 0 ? 'right' : 'left';
          setSwipeState(prev => ({ ...prev, direction }));
        }
      } else {
        // Vertical swipe
        if (Math.abs(deltaY) > threshold) {
          const direction = deltaY > 0 ? 'down' : 'up';
          setSwipeState(prev => ({ ...prev, direction }));
        }
      }
    };

    const handleTouchEnd = () => {
      if (!swipeState.swiping) return;

      // Trigger the appropriate callback based on swipe direction
      if (swipeState.direction === 'left' && onSwipeLeft) {
        onSwipeLeft();
      } else if (swipeState.direction === 'right' && onSwipeRight) {
        onSwipeRight();
      } else if (swipeState.direction === 'up' && onSwipeUp) {
        onSwipeUp();
      } else if (swipeState.direction === 'down' && onSwipeDown) {
        onSwipeDown();
      }

      // Reset swipe state
      setSwipeState({
        swiping: false,
        direction: null,
        startX: 0,
        startY: 0,
        startTime: 0,
      });
    };

    // Add event listeners
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchmove', handleTouchMove);
    element.addEventListener('touchend', handleTouchEnd);

    // Clean up event listeners
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [ref, swipeState.swiping, swipeState.startX, swipeState.startY, swipeState.startTime, threshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);

  return {
    swiping: swipeState.swiping,
    direction: swipeState.direction,
  };
}
