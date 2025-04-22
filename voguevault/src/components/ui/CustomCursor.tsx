'use client';

import { useState, useEffect } from 'react';

interface CustomCursorProps {
  color?: string;
  size?: number;
  showOnMobile?: boolean;
}

const CustomCursor = ({
  color = '#9c27b0',
  size = 20,
  showOnMobile = false,
}: CustomCursorProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Don't show custom cursor on mobile devices unless explicitly enabled
    if (!showOnMobile && window.matchMedia('(max-width: 768px)').matches) {
      return;
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.closest('a') ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('button')
      ) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = () => {
      setIsHovering(false);
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleHoverStart);
    document.addEventListener('mouseout', handleHoverEnd);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleHoverStart);
      document.removeEventListener('mouseout', handleHoverEnd);
    };
  }, [showOnMobile]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="fixed pointer-events-none z-50 rounded-full shadow-md"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${isHovering ? size * 1.5 : size}px`,
        height: `${isHovering ? size * 1.5 : size}px`,
        backgroundColor: isHovering ? 'rgba(156, 39, 176, 0.3)' : 'rgba(156, 39, 176, 0.15)',
        border: `2px solid ${color}`,
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s ease-out',
      }}
    />
  );
};

export default CustomCursor;
