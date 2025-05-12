'use client';

import { useState, useEffect } from 'react';

const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isOverLink, setIsOverLink] = useState(false);

  // Only run after component has mounted on the client
  useEffect(() => {
    setMounted(true);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleLinkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink =
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button');

      setIsOverLink(!!isLink);
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousemove', handleLinkHover);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousemove', handleLinkHover);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Don't render anything on the server or before mounting
  if (!mounted) return null;

  return (
    <div>
      {/* Outer cursor */}
      <div
        className={`fixed pointer-events-none z-50 rounded-full mix-blend-difference transition-transform duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isClicking ? 'scale-90' : 'scale-100'} ${
          isOverLink ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '30px',
          height: '30px',
          backgroundColor: 'white',
          transform: `translate(-50%, -50%) ${
            isClicking ? 'scale(0.9)' : isOverLink ? 'scale(1.5)' : 'scale(1)'
          }`,
        }}
      />

      {/* Inner cursor */}
      <div
        className={`fixed pointer-events-none z-50 rounded-full bg-white mix-blend-difference transition-transform duration-150 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isOverLink ? 'opacity-0' : 'opacity-100'}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '5px',
          height: '5px',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};

export default CustomCursor;
