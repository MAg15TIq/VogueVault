'use client';

import { useState, useEffect } from 'react';

interface ReadingProgressProps {
  targetRef?: React.RefObject<HTMLElement | null>;
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
  zIndex?: number;
}

const ReadingProgress = ({
  targetRef,
  color = 'var(--primary)',
  height = 4,
  position = 'top',
  zIndex = 100,
}: ReadingProgressProps) => {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const calculateReadingProgress = () => {
      if (!targetRef?.current) {
        // If no target is provided, use the entire document
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollY = window.scrollY;

        const progress = (scrollY / documentHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      } else {
        // If a target is provided, calculate progress based on the target element
        const element = targetRef.current;
        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        const elementHeight = element.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        // Calculate how much of the element is scrolled
        const scrolled = scrollY - elementTop + windowHeight;
        const progress = (scrolled / (elementHeight + windowHeight)) * 100;

        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    // Calculate initial progress
    calculateReadingProgress();

    // Add scroll event listener
    window.addEventListener('scroll', calculateReadingProgress);

    // Clean up
    return () => {
      window.removeEventListener('scroll', calculateReadingProgress);
    };
  }, [targetRef]);

  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        [position]: 0,
        height: `${height}px`,
        width: `${readingProgress}%`,
        backgroundColor: color,
        zIndex,
        transition: 'width 0.1s ease',
      }}
      role="progressbar"
      aria-valuenow={readingProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    />
  );
};

export default ReadingProgress;
